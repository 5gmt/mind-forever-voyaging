import { expect, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";

test("Parchment measurement windows cannot take the localized host or enter canonical observations", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    localStorage.setItem("amfv:locale", "ja");
    localStorage.setItem("amfv:interaction-level", "classic");
  });
  await page.goto("/");
  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  const begin = page.getByRole("button", { name: /原作を始める/ });
  await expect(introduction.or(begin)).toBeVisible();
  if (!(await begin.isVisible())) await introduction.getByRole("button", { name: /始める · クラシック/ }).click();
  await expect(begin).toBeEnabled();
  await begin.click();
  const frame = page.frameLocator('iframe[src="/player.html"]');
  const host = frame.locator("#amfv-localized-presentation-host");
  const surface = host.locator(".story-presentation-scroll");
  const canonical = frame.locator("#windowport .BufferWindowInner");
  await expect(host).toContainText("通信モードに入りました");
  await expect(page.locator("#command-input")).toBeEnabled();
  await expect.poll(() => surface.evaluate((node) => node.scrollHeight - node.clientHeight)).toBeGreaterThan(200);
  await surface.evaluate((node) => { node.scrollTop = 100; });
  await expect(surface).toHaveJSProperty("scrollTop", 100);
  const parentId = await host.evaluate((node) => node.parentElement!.id);
  const transcript = await canonical.innerText();
  const snapshot = () => frame.locator("body").evaluate(() => {
    const bridge = (window as typeof window & { AMFVPresentationBridge: { extract: (root: Document, style: typeof getComputedStyle) => unknown } }).AMFVPresentationBridge;
    return bridge.extract(document, getComputedStyle);
  });
  const before = await snapshot();
  const report = () => page.evaluate(() => new Promise((resolve) => {
    const player = document.querySelector<HTMLIFrameElement>('iframe[src="/player.html"]')!.contentWindow!;
    const receive = (event: MessageEvent) => {
      if (event.source !== player || event.origin !== location.origin || event.data?.channel !== "amfv:bridge" || event.data.type !== "transcript") return;
      window.removeEventListener("message", receive);
      resolve(event.data);
    };
    window.addEventListener("message", receive);
    player.postMessage({ channel: "amfv:bridge", type: "request-state" }, location.origin);
  }));
  const beforeReport = await report();
  // Parchment's async font/size measurement appends this sibling of
  // #windowport under #gameport. Hold that real DOM shape open across reports;
  // this is a lifecycle probe, not invented VM transcript or game state.
  await frame.locator("#gameport").evaluate((gameport) => {
    const pane = document.createElement("div");
    pane.id = "layout_test_pane";
    pane.innerHTML = '<div class="WindowFrame BufferWindow"><div class="BufferWindowInner"><div class="BufferLine"><span class="Style_normal">12345678</span></div><div class="BufferLine"><span class="Style_normal">12345678</span><span class="InvisibleCursor"></span></div></div></div><div class="WindowFrame GridWindow"><div class="GridLine">12345678</div></div>';
    gameport.append(pane);
  });
  try {
    await expect(host.locator("..")).toHaveAttribute("id", parentId);
    expect(await snapshot()).toEqual(before);
    await expect(host).toBeVisible();
    await expect(canonical).toHaveAttribute("aria-hidden", "true");
    await expect(canonical).toHaveAttribute("inert", "");
    await expect(surface).toHaveJSProperty("scrollTop", 100);
    // Exercise the actual report path while the measurement pane is present.
    // Transcript, recent text, status/grid, presentation and input stay equal.
    const duringReport = await report();
    expect(duringReport).toEqual(beforeReport);
    await expect(host).toBeVisible();
    await expect(page.locator("#command-input")).toBeEnabled();
    await expect(canonical).toHaveText(transcript, { useInnerText: true });
    const record = testInfo.outputPath("measurement-window-isolation.json");
    await writeFile(record, JSON.stringify({ parentId, before, during: await snapshot(), beforeReport, duringReport, readingTop: await surface.evaluate((node) => node.scrollTop) }));
    await testInfo.attach("measurement-window-isolation", { path: record, contentType: "application/json" });
    const screenshot = testInfo.outputPath("measurement-window-reading.png");
    await page.screenshot({ path: screenshot });
    await testInfo.attach("measurement-window-reading", { path: screenshot, contentType: "image/png" });
  } finally {
    await frame.locator("#layout_test_pane").evaluate((pane) => pane.remove());
  }
  await expect(host.locator("..")).toHaveAttribute("id", parentId);
  await expect(surface).toHaveJSProperty("scrollTop", 100);
});
