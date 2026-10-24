import { expect, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";

test("recovers canonical startup notifications delivered before wrapper hydration", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  // The iframe is server-rendered and can finish booting before the client
  // wrapper's message effect. Delay only that chunk, never the VM or bridge.
  await page.addInitScript(() => {
    const observed = window as typeof window & { AMFVStartupObserved?: boolean };
    observed.AMFVStartupObserved = false;
    window.addEventListener("message", (event) => {
      if (event.data?.channel === "amfv:bridge" && event.data.type === "transcript"
        && event.data.inputKind === "char" && event.data.acceptsInput
        && event.data.text.includes("Tomorrow never yet")) observed.AMFVStartupObserved = true;
    });
  });
  let delayed = false;
  await page.route("**/_next/static/chunks/app_PrismEdition*", async (route) => {
    delayed = true;
    await expect.poll(async () => {
      const frame = page.frames().find((candidate) => candidate.url().endsWith("/player.html"));
      return frame ? frame.locator("textarea.Input:not([disabled])").count() : 0;
    }).toBe(1);
    await expect.poll(async () => {
      const frame = page.frames().find((candidate) => candidate.url().endsWith("/player.html"));
      return frame ? frame.locator("#amfv-localized-presentation-host").count() : 0;
    }).toBe(1);
    // Prove the complete initial transcript was delivered before hydration.
    await expect.poll(() => page.evaluate(() =>
      (window as typeof window & { AMFVStartupObserved?: boolean }).AMFVStartupObserved,
    )).toBe(true);
    await route.continue();
  });
  await page.goto("/");
  expect(delayed).toBe(true);
  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  await introduction.getByRole("button", { name: /^Begin/ }).click();
  const begin = page.getByRole("button", { name: /Begin the original story/ });
  await expect(begin).toBeEnabled();
  await expect(page.locator(".system-state")).toContainText("KEY REQUESTED");
  const frame = page.frameLocator('iframe[src="/player.html"]');
  await expect(frame.locator(".BufferWindowInner")).toContainText("Tomorrow never yet");
  await begin.click();
  await expect(frame.locator(".BufferWindowInner")).toContainText("Communications Mode");
  await expect(page.locator("#command-input")).toBeEnabled();
  const record = testInfo.outputPath("startup-before-hydration.json");
  await writeFile(record, JSON.stringify({ delayedWrapperChunk: delayed, canonicalInputRecovered: true, currentStatus: await page.locator(".system-state").innerText() }));
  await testInfo.attach("startup-before-hydration", { path: record, contentType: "application/json" });
});
