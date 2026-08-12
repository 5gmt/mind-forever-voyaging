import { expect, test, type FrameLocator, type TestInfo } from "@playwright/test";

const canonicalFrame = (page: import("@playwright/test").Page) =>
  page.frameLocator('iframe[title*="canonical Release 79 story"]');

const presentationPayload = async (frame: FrameLocator) => frame.locator("body").evaluate(() => {
  const bridge = (window as typeof window & {
    AMFVPresentationBridge?: { extract: (documentRoot: Document, getStyle: typeof getComputedStyle) => unknown };
  }).AMFVPresentationBridge;
  return bridge?.extract(document, (element) => getComputedStyle(element)) ?? null;
});

const attachPayload = async (testInfo: TestInfo, name: string, frame: FrameLocator) => {
  const payload = await presentationPayload(frame);
  await testInfo.attach(name, {
    body: Buffer.from(JSON.stringify(payload, null, 2)),
    contentType: "application/json",
  });
  return payload;
};

const expectNear = (actual: number, expected: number, tolerance = 2) =>
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);

test("Japanese history retains localized turns when an unsupported turn falls back to English", async ({ page }, testInfo) => {
  await page.goto("/");

  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  if (await introduction.isVisible()) {
    await introduction.getByRole("button", { name: /^Begin/ }).click();
  }

  await expect(page.getByRole("button", { name: /Begin the original story/i })).toBeEnabled({ timeout: 20_000 });

  await page.getByTitle("Reading and play settings").click();
  await page.getByRole("region", { name: "Reading and play settings" })
    .getByRole("button", { name: "日本語" }).click();

  const presentation = page.getByRole("log", { name: "日本語ストーリー表示" });
  const frame = canonicalFrame(page);
  await expect(presentation).toContainText("明日という日はまだ");
  const openingPayload = await attachPayload(testInfo, "opening-presentation-v3", frame) as { lines?: Array<{ text: string }> } | null;
  const partOneObserved = openingPayload?.lines?.some((line) => /\*\s*PART I\s*\*/i.test(line.text));
  if (partOneObserved) await expect(presentation).toContainText("* PART I *");
  await expect(presentation.locator(".story-presentation-spacer")).not.toHaveCount(0);
  if (partOneObserved) {
    const openingHeading = await presentation.locator(".story-presentation-heading").boundingBox();
    const canonicalHeading = await frame.locator(".BufferLine", { hasText: /\*\s*PART I\s*\*/i }).boundingBox();
    if (openingHeading && canonicalHeading) expectNear(openingHeading.x + openingHeading.width / 2, canonicalHeading.x + canonicalHeading.width / 2);
  }
  const openingBody = await presentation.boundingBox();
  const canonicalOpeningLine = await frame.locator(".BufferLine", { hasText: /Tomorrow never yet/i }).boundingBox();
  if (openingBody && canonicalOpeningLine) {
    expectNear(openingBody.x, canonicalOpeningLine.x);
    expectNear(openingBody.width, canonicalOpeningLine.width);
  }

  await page.getByRole("button", { name: /原作を始める/ }).click();
  await expect(page.locator("#command-input")).toBeEnabled();
  await attachPayload(testInfo, "initial-line-presentation-v3", frame);
  await expect(presentation).toContainText("公式メッセージ回線");
  await expect(presentation).toContainText("通信モードに入りました");
  await expect(presentation.locator(".story-presentation-title")).toContainText("A Mind Forever Voyaging");
  await expect(presentation.locator(".story-presentation-list li")).toHaveCount(6);
  await expect(presentation.locator(".story-presentation-list")).not.toContainText("特定のアウトレットを起動するには");
  await expect(presentation.locator(".story-presentation-prose", { hasText: "特定のアウトレットを起動するには" })).toHaveCount(1);
  const canonicalStatus = await frame.locator(".GridWindow").innerText();
  const wrapperStatus = page.getByLabel("Canonical game status");
  await expect(wrapperStatus).toBeVisible();
  expect((await wrapperStatus.innerText()).replace(/\s+/g, " ").trim()).toBe(canonicalStatus.replace(/\s+/g, " ").trim());
  const wrapperStatusBox = await wrapperStatus.boundingBox();
  const canonicalStatusBox = await frame.locator(".GridWindow").boundingBox();
  if (wrapperStatusBox && canonicalStatusBox) {
    expectNear(wrapperStatusBox.x, canonicalStatusBox.x);
    expectNear(wrapperStatusBox.width, canonicalStatusBox.width);
    expectNear(wrapperStatusBox.height, canonicalStatusBox.height);
  }
  const canonicalStatusChrome = await frame.locator(".GridWindow").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      backgroundColor: style.backgroundColor,
      borderColor: style.borderTopColor,
      borderStyle: style.borderTopStyle,
      borderWidth: style.borderTopWidth,
    };
  });
  await expect(wrapperStatus).toHaveCSS("background-color", canonicalStatusChrome.backgroundColor);
  await expect(wrapperStatus).toHaveCSS("border-top-color", canonicalStatusChrome.borderColor);
  await expect(wrapperStatus).toHaveCSS("border-top-style", canonicalStatusChrome.borderStyle);
  await expect(wrapperStatus).toHaveCSS("border-top-width", canonicalStatusChrome.borderWidth);
  const wrapperBodyBox = await presentation.boundingBox();
  const canonicalBodyBox = await frame.locator(".BufferLine", { hasText: /You have entered Communications Mode/ }).last().boundingBox();
  if (wrapperBodyBox && canonicalBodyBox) {
    expectNear(wrapperBodyBox.x, canonicalBodyBox.x);
    expectNear(wrapperBodyBox.width, canonicalBodyBox.width);
  }
  const wrapperPrompt = page.getByLabel("Current game prompt");
  await expect(wrapperPrompt).toHaveText(">");
  const wrapperPromptBox = await wrapperPrompt.boundingBox();
  const canonicalPromptBox = await frame.locator(".BufferLine", { has: frame.locator("textarea.LineInput") }).boundingBox();
  if (wrapperPromptBox && canonicalPromptBox) expectNear(wrapperPromptBox.x, canonicalPromptBox.x);

  const commandInput = page.locator("#command-input");
  await commandInput.fill("LOOK");
  await page.getByRole("button", { name: /送信/ }).click();

  await expect.poll(async () => frame.locator("#gameport .BufferLine").allTextContents())
    .toEqual(expect.arrayContaining([expect.stringMatching(/LOOK/i)]));
  await expect(presentation.locator(".story-presentation-command")).toHaveText(/LOOK/);
  await expect(presentation.locator(".story-presentation-command")).toHaveAttribute("lang", "en");
  await expect(presentation).toContainText("通信モードに入りました");
  await expect(presentation.locator(".story-presentation-list")).toHaveCount(2);
  await expect(presentation.locator(".story-presentation-list").last().locator("li")).toHaveCount(6);
  await attachPayload(testInfo, "look-presentation-v3", frame);
  const lookCanonicalStatus = await frame.locator(".GridWindow").innerText();
  expect((await wrapperStatus.innerText()).replace(/\s+/g, " ").trim()).toBe(lookCanonicalStatus.replace(/\s+/g, " ").trim());
  await testInfo.attach("localized-look", { body: await page.screenshot(), contentType: "image/png" });

  await commandInput.fill("INVENTORY");
  await page.getByRole("button", { name: /送信/ }).click();
  await expect(frame.locator("#gameport")).toContainText(/You have no appendages|INVENTORY/i);
  await attachPayload(testInfo, "unsupported-fallback-presentation-v2", frame);
  await expect(presentation).toContainText("明日という日はまだ");
  await expect(presentation).toContainText("通信モードに入りました");
  await expect(presentation).toContainText(/INVENTORY/i);
  await expect(presentation).toContainText(/You have no appendages/i);

  const canonicalIframe = page.locator('iframe[title*="canonical Release 79 story"]');
  await expect(canonicalIframe).toHaveAttribute("aria-hidden", "true");
  await expect(canonicalIframe).toHaveAttribute("inert", "");
  await testInfo.attach("localized-history-with-english-fallback", { body: await page.screenshot(), contentType: "image/png" });

  // RESTORE opens Parchment's canonical file interaction, which has no safe
  // structured transcript representation. The accumulated display cache must
  // not strand that canonical interaction behind the Japanese surface.
  await commandInput.fill("RESTORE");
  await page.getByRole("button", { name: /送信/ }).click();
  await expect(canonicalIframe).toHaveAttribute("aria-hidden", "false");
  await expect(canonicalIframe).not.toHaveAttribute("inert", "");
});

test("RESTORE entered directly in the canonical iframe invalidates Japanese display history", async ({ page }) => {
  await page.goto("/");
  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  if (await introduction.isVisible()) await introduction.getByRole("button", { name: /^Begin/ }).click();

  const continueButton = page.getByRole("button", { name: /Begin the original story/i });
  await expect(continueButton).toBeEnabled({ timeout: 20_000 });
  await page.getByTitle("Reading and play settings").click();
  const settings = page.getByRole("region", { name: "Reading and play settings" });
  await settings.getByRole("button", { name: "日本語" }).click();
  const presentation = page.getByRole("log", { name: "日本語ストーリー表示" });
  await expect(presentation).toContainText("明日という日はまだ");
  await page.getByRole("button", { name: /原作を始める/ }).click();
  await expect(page.locator("#command-input")).toBeEnabled();

  // Switch to English so the canonical iframe is intentionally interactive,
  // then submit RESTORE through Parchment rather than the wrapper controls.
  await settings.getByRole("button", { name: "English" }).click();
  const frame = canonicalFrame(page);
  const canonicalInput = frame.locator("textarea.Input.LineInput");
  await canonicalInput.fill("RESTORE");
  await canonicalInput.press("Enter");

  // Returning to Japanese must not resurrect the pre-RESTORE display cache.
  await settings.getByRole("button", { name: "日本語" }).click();
  await expect(presentation).toHaveCount(0);
  const canonicalIframe = page.locator('iframe[title*="canonical Release 79 story"]');
  await expect(canonicalIframe).toHaveAttribute("aria-hidden", "false");
  await expect(canonicalIframe).not.toHaveAttribute("inert", "");
});
