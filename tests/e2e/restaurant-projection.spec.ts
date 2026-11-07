import { expect, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { acceptRestaurantMilestone } from "./restaurant-acceptance";

// Controlled delivery timing, separate from the seven natural Cinema sessions.
// Delay only stable bridge reports to the wrapper; the canonical VM is unchanged.
test("Restaurant helper waits for delayed Japanese projection after canonical input advances", async ({ page }, testInfo) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    if (window.parent === window) return;
    const observed = window as typeof window & { projectionDelay: { delayMs: number; reports: number } };
    observed.projectionDelay = { delayMs: 400, reports: 0 };
    const post = window.parent.postMessage.bind(window.parent);
    window.parent.postMessage = ((data: { channel?: string; type?: string; acceptsInput?: boolean }, origin: string) => {
      if (data?.channel === "amfv:bridge" && data.type === "transcript" && data.acceptsInput) {
        observed.projectionDelay.reports++;
        setTimeout(() => post(data, origin), observed.projectionDelay.delayMs);
      } else post(data, origin);
    }) as typeof window.parent.postMessage;
  });
  await acceptRestaurantMilestone(page, "actions", testInfo, { courtRecording: "cinema-on-site" });
  const timing = await page.frameLocator('iframe[src="/player.html"]').locator("body").evaluate(() =>
    (window as typeof window & { projectionDelay: { delayMs: number; reports: number } }).projectionDelay);
  expect(timing.delayMs).toBe(400);
  expect(timing.reports).toBeGreaterThan(0);
  const path = testInfo.outputPath("restaurant-projection-delay.json");
  await writeFile(path, JSON.stringify(timing, null, 2) + "\n");
  await testInfo.attach("restaurant-projection-delay", { path, contentType: "application/json" });
});
