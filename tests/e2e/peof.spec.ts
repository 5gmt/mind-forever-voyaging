import { expect, test, type FrameLocator, type TestInfo } from "@playwright/test";

const canonicalFrame = (page: import("@playwright/test").Page) =>
  page.frameLocator('iframe[title*="canonical Release 79 story"]');

const attachPayload = async (testInfo: TestInfo, frame: FrameLocator) => {
  const payload = await frame.locator("body").evaluate(() => {
    const bridge = (window as typeof window & {
      AMFVPresentationBridge?: { extract: (documentRoot: Document, getStyle: typeof getComputedStyle) => unknown };
    }).AMFVPresentationBridge;
    return bridge?.extract(document, (element) => getComputedStyle(element)) ?? null;
  });
  await testInfo.attach("peof-presentation-v3", {
    body: Buffer.from(JSON.stringify(payload, null, 2)),
    contentType: "application/json",
  });
};

test("fresh Japanese session presents the observed PEOF office scene and recovers input", async ({ page }, testInfo) => {
  await page.goto("/");
  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  const continueButton = page.getByRole("button", { name: /Begin the original story/i });
  await expect(introduction.or(continueButton)).toBeVisible({ timeout: 20_000 });
  if (!(await continueButton.isVisible())) {
    await expect(introduction).toBeVisible();
    await introduction.getByRole("button", { name: /^Begin/ }).click();
  }
  await expect(continueButton).toBeEnabled({ timeout: 20_000 });
  await page.getByTitle("Reading and play settings").click();
  const settings = page.getByRole("region", { name: /Reading and play settings|読書とプレイの設定/ });
  await settings.getByRole("button", { name: "日本語" }).click();

  const frame = canonicalFrame(page);
  const presentation = frame.getByRole("log", { name: "日本語ストーリー表示" });
  await expect(presentation).toContainText("明日という日はまだ");
  await page.getByRole("button", { name: /原作を始める/ }).click();
  await expect(presentation).toContainText("通信モードに入りました");

  const commandInput = page.locator("#command-input");
  await expect(commandInput).toBeEnabled();
  await frame.locator("body").evaluate(() => {
    const state = { exposedFrames: 0, sampledFrames: 0, raf: 0 };
    const sample = () => {
      state.sampledFrames += 1;
      const inner = document.querySelector<HTMLElement>("#gameport .BufferWindowInner");
      if (inner) {
        const style = getComputedStyle(inner);
        if (style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0) state.exposedFrames += 1;
      }
      state.raf = requestAnimationFrame(sample);
    };
    state.raf = requestAnimationFrame(sample);
    (window as typeof window & { AMFVExposureSampler?: typeof state }).AMFVExposureSampler = state;
  });
  await commandInput.fill("PEOF");
  await page.getByRole("button", { name: /送信/ }).click();

  await expect(presentation.locator(".story-presentation-command")).toHaveText(/PEOF/);
  await expect(presentation.locator(".story-presentation-command")).toHaveAttribute("lang", "en");
  await expect(presentation.locator(".story-presentation-title", { hasText: "ペレルマン博士のオフィス" }).last()).toHaveText("ペレルマン博士のオフィス");
  await expect(presentation.locator(".story-presentation-prose", { hasText: "エイブラハム・ペレルマン博士" })).toHaveCount(1);
  await expect(presentation).toContainText("ペレルマン博士は机に向かい、仕事をしている。");
  await expect(presentation).toContainText("通信モードに入りました");
  const deferredSceneActions = page.locator(".scene-actions").first();
  await expect(deferredSceneActions).toBeVisible();
  expect(await deferredSceneActions.evaluate((element) => element.closest("[lang]")?.getAttribute("lang"))).toBe("en");
  await expect(frame.getByLabel("Current game prompt")).toHaveText(">");
  await expect(frame.locator(".GridWindow")).toContainText(/Dr\. Perelman's Office/i);
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("aria-hidden", "true");
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("inert", "");
  const exposure = await frame.locator("body").evaluate(() => {
    const state = (window as typeof window & { AMFVExposureSampler?: { exposedFrames: number; sampledFrames: number; raf: number } }).AMFVExposureSampler;
    if (!state) return null;
    cancelAnimationFrame(state.raf);
    return { exposedFrames: state.exposedFrames, sampledFrames: state.sampledFrames };
  });
  expect(exposure?.sampledFrames).toBeGreaterThan(0);
  expect(exposure?.exposedFrames).toBe(0);
  await attachPayload(testInfo, frame);

  await commandInput.fill("SCORE");
  await page.getByRole("button", { name: /送信/ }).click();
  await expect(presentation).toContainText(/I don't know the word "score\."/i);
  await expect(presentation.locator(".story-presentation-command")).toContainText(["PEOF", "SCORE"]);

  await settings.getByRole("button", { name: "English" }).click();
  await expect(presentation).toBeHidden();
  await expect(frame.locator(".BufferWindowInner")).not.toHaveAttribute("inert", "");
  const canonicalInput = frame.locator("textarea.Input.LineInput");
  await canonicalInput.fill("LOOK");
  await canonicalInput.press("Enter");
  await expect.poll(async () => frame.locator("#gameport .BufferLine").allTextContents())
    .toEqual(expect.arrayContaining([expect.stringMatching(/LOOK/i)]));
  await settings.getByRole("button", { name: "日本語" }).click();
  await expect(presentation.locator(".story-presentation-title", { hasText: "ペレルマン博士のオフィス" }).last()).toHaveText("ペレルマン博士のオフィス");
  await expect(presentation).toContainText(/LOOK/i);
  await settings.getByRole("button", { name: "English" }).click();
  await expect(presentation).toBeHidden();
  await expect(frame.locator(".BufferWindowInner")).not.toHaveAttribute("inert", "");
  await expect(canonicalInput).toBeVisible();
  await expect(canonicalInput).toBeEnabled();

  await testInfo.attach("localized-peof-scene", { body: await page.screenshot(), contentType: "image/png" });
});
