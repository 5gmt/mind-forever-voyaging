import { expect, test, type FrameLocator, type Page, type TestInfo } from "@playwright/test";

const canonicalFrame = (page: Page) => page.frameLocator('iframe[title*="canonical Release 79 story"]');

test.setTimeout(120_000);

const startFreshJapanesePeof = async (page: Page) => {
  let storyReady = false;
  for (let attempt = 0; attempt < 3 && !storyReady; attempt += 1) {
    await page.goto("/");
    const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
    const continueButton = page.locator("button.continue-button");
    await expect.poll(async () => await introduction.isVisible() || await continueButton.isVisible(), { timeout: 20_000 }).toBe(true);
    if (await introduction.isVisible()) {
      await introduction.getByRole("button", { name: /^Begin/ }).click();
    }
    storyReady = await continueButton.waitFor({ state: "attached", timeout: 20_000 }).then(() => true, () => false);
  }
  const continueButton = page.locator("button.continue-button");
  expect(storyReady).toBe(true);
  await expect(continueButton).toBeEnabled({ timeout: 40_000 });
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
  await commandInput.fill("PEOF");
  await page.getByRole("button", { name: /送信/ }).click();
  await expect(presentation).toContainText("ペレルマン博士は机に向かい、仕事をしている。");
  return { commandInput, frame, presentation };
};

const submitAndExpect = async (
  page: Page,
  commandInput: ReturnType<Page["locator"]>,
  presentation: ReturnType<FrameLocator["getByRole"]>,
  command: string,
  japanese: string,
) => {
  const commandCount = await presentation.locator(".story-presentation-command").count();
  const spacerCount = await presentation.locator(".story-presentation-spacer").count();
  await commandInput.fill(command);
  await page.getByRole("button", { name: /送信/ }).click();
  const echo = presentation.locator(".story-presentation-command").nth(commandCount);
  await expect(echo).toHaveText(`> ${command}`);
  await expect(echo).toHaveAttribute("lang", "en");
  await expect(presentation).toContainText(japanese);
  await expect(presentation.locator(".story-presentation-spacer")).toHaveCount(spacerCount + 1);
};

const attachObservation = async (testInfo: TestInfo, frame: FrameLocator, name: string) => {
  const payload = await frame.locator("body").evaluate(() => {
    const bridge = (window as typeof window & {
      AMFVPresentationBridge?: { extract: (documentRoot: Document, getStyle: typeof getComputedStyle) => unknown };
    }).AMFVPresentationBridge;
    return bridge?.extract(document, (element) => getComputedStyle(element)) ?? null;
  });
  await testInfo.attach(name, { body: Buffer.from(JSON.stringify(payload, null, 2)), contentType: "application/json" });
};

test("localizes LOOK, desk, and Perelman inspection from a fresh PEOF session", async ({ page }, testInfo) => {
  const { commandInput, frame, presentation } = await startFreshJapanesePeof(page);
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

  await submitAndExpect(page, commandInput, presentation, "LOOK", "ここは、あなたの創造者であるエイブラハム・ペレルマン博士のオフィスだ。");
  await expect(presentation.locator(".story-presentation-title").last()).toHaveText("ペレルマン博士のオフィス");
  await submitAndExpect(page, commandInput, presentation, "EXAMINE DESK", "ペレルマンの机の上には、デコーダー、街の地図、ボールペン、雑誌記事のプリントアウトなど、さまざまな品が置かれている。");
  await submitAndExpect(page, commandInput, presentation, "EXAMINE DR PERELMAN", "ペレルマンは50代後半の年配の男性で、白い山羊ひげをたくわえている。");

  await expect(frame.getByLabel("Current game prompt")).toHaveText(">");
  await expect(frame.locator(".GridWindow")).toContainText(/Communications Mode[\s\S]*Dr\. Perelman's Office/i);
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
  await attachObservation(testInfo, frame, "peof-look-desk-perelman-v3");
  await testInfo.attach("peof-look-desk-perelman-ja", { body: await page.screenshot(), contentType: "image/png" });
});

for (const { command, japanese, artifact } of [
  { command: "EXAMINE DECODER", japanese: "［これは、あなたの『A Mind Forever Voyaging』パッケージに入っているデコーダーです。］", artifact: "decoder" },
  { command: "EXAMINE MAP", japanese: "［これは、あなたの『A Mind Forever Voyaging』パッケージに入っている地図です。］", artifact: "map" },
  { command: "EXAMINE PEN", japanese: "［これは、あなたの『A Mind Forever Voyaging』パッケージに入っているペンです。］", artifact: "pen" },
]) {
  test(`localizes the ${artifact} package notice from an isolated fresh PEOF session`, async ({ page }, testInfo) => {
    const { commandInput, frame, presentation } = await startFreshJapanesePeof(page);
    await submitAndExpect(page, commandInput, presentation, command, japanese);
    await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("aria-hidden", "true");
    await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("inert", "");
    await attachObservation(testInfo, frame, `peof-${artifact}-v3`);
  });
}

test("localizes the magazine article, preserves SCORE fallback, and restores canonical input", async ({ page }, testInfo) => {
  const { commandInput, frame, presentation } = await startFreshJapanesePeof(page);
  await commandInput.fill("SCORE");
  await page.getByRole("button", { name: /送信/ }).click();
  await expect(presentation).toContainText(/I don't know the word "score\."/i);
  await expect(presentation.locator(".story-presentation-prose", { hasText: /I don't know the word "score\."/i })).toHaveAttribute("lang", "en");
  await submitAndExpect(page, commandInput, presentation, "EXAMINE MAGAZINE ARTICLE", "［これは、あなたの『A Mind Forever Voyaging』パッケージに入っている雑誌記事です。］");
  await page.getByRole("button", { name: "Close package materials" }).click();

  await page.locator(".access-panel button[lang='en']").click();
  await expect(presentation).toBeHidden();
  await expect(frame.locator(".BufferWindowInner")).not.toHaveAttribute("inert", "");
  const canonicalInput = frame.locator("textarea.Input.LineInput");
  await canonicalInput.fill("LOOK");
  await canonicalInput.press("Enter");
  await expect.poll(async () => frame.locator("#gameport .BufferLine").allTextContents())
    .toEqual(expect.arrayContaining([expect.stringMatching(/^>LOOK$/i)]));
  await page.locator(".access-panel button[lang='ja']").click();
  await expect(presentation).toContainText("［これは、あなたの『A Mind Forever Voyaging』パッケージに入っている雑誌記事です。］");
  await expect(presentation.locator(".story-presentation-title").last()).toHaveText("ペレルマン博士のオフィス");
  await page.locator(".access-panel button[lang='en']").click();
  await expect(presentation).toBeHidden();
  await expect(canonicalInput).toBeVisible();
  await expect(canonicalInput).toBeEnabled();
  await canonicalInput.focus();
  await expect(canonicalInput).toBeFocused();
  await attachObservation(testInfo, frame, "peof-magazine-score-recovery-v3");
  await testInfo.attach("peof-inspection-recovery", { body: await page.screenshot(), contentType: "image/png" });
});
