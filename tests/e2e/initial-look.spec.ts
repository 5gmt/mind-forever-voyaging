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

test("Japanese history retains localized turns when an unsupported turn falls back to English", async ({ page }, testInfo) => {
  await page.goto("/");

  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  if (await introduction.isVisible()) {
    await introduction.getByRole("button", { name: /^Begin/ }).click();
  }

  await expect(page.getByRole("button", { name: /Begin the original story/i })).toBeEnabled({ timeout: 20_000 });

  await page.getByTitle("Reading and play settings").click();
  const settings = page.getByRole("region", { name: "Reading and play settings" });
  await settings.getByRole("button", { name: "日本語" }).click();

  const frame = canonicalFrame(page);
  const presentation = frame.getByRole("log", { name: "日本語ストーリー表示" });
  await expect(presentation).toContainText("明日という日はまだ");
  const openingPayload = await attachPayload(testInfo, "opening-presentation-v3", frame) as { lines?: Array<{ text: string }> } | null;
  const partOneObserved = openingPayload?.lines?.some((line) => /\*\s*PART I\s*\*/i.test(line.text));
  if (partOneObserved) await expect(presentation).toContainText("* PART I *");
  await expect(presentation.locator(".story-presentation-spacer")).not.toHaveCount(0);
  const openingBody = await presentation.boundingBox();
  const canonicalBuffer = await frame.locator(".BufferWindow").boundingBox();
  if (openingBody && canonicalBuffer) {
    expect(openingBody.x).toBeGreaterThanOrEqual(canonicalBuffer.x);
    expect(openingBody.y).toBeGreaterThanOrEqual(canonicalBuffer.y);
    expect(openingBody.x + openingBody.width).toBeLessThanOrEqual(canonicalBuffer.x + canonicalBuffer.width);
    expect(openingBody.y + openingBody.height).toBeLessThanOrEqual(canonicalBuffer.y + canonicalBuffer.height);
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
  const canonicalStatus = frame.locator(".GridWindow");
  await expect(canonicalStatus).toBeVisible();
  await expect(canonicalStatus).toContainText(/Communications Mode/i);
  await expect(canonicalStatus.locator(".reverse")).not.toHaveCount(0);
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("aria-hidden", "true");
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("inert", "");
  await expect(frame.getByLabel("Current game prompt")).toHaveText(">");

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
  await expect(canonicalStatus).toContainText(/Communications Mode/i);
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
  await expect(canonicalIframe).toHaveAttribute("aria-hidden", "false");

  // The Japanese surface owns its scroll state inside the canonical window.
  for (let turn = 0; turn < 10; turn += 1) {
    await commandInput.fill("INVENTORY");
    await page.getByRole("button", { name: /送信/ }).click();
    await expect(presentation.locator(".story-presentation-command")).toHaveCount(3 + turn);
  }
  const scrollSurface = presentation.locator(".story-presentation-scroll");
  await expect.poll(async () => scrollSurface.evaluate((node) => node.scrollHeight > node.clientHeight)).toBe(true);
  await expect.poll(async () => scrollSurface.evaluate((node) => node.scrollHeight - node.scrollTop - node.clientHeight < 48)).toBe(true);

  // Tail-following survives a semantic locale round-trip.
  await settings.getByRole("button", { name: "English" }).click();
  await expect(presentation).toBeHidden();
  await expect(frame.locator(".BufferWindowInner")).not.toHaveAttribute("inert", "");
  const canonicalScroll = frame.locator(".BufferWindow");
  await expect.poll(async () => canonicalScroll.evaluate((node) => node.scrollHeight - node.scrollTop - node.clientHeight < 48)).toBe(true);
  await settings.getByRole("button", { name: "日本語" }).click();
  await expect(presentation).toContainText(/You have no appendages/i);

  // A canonical English viewport that was intentionally moved upward keeps
  // that semantic position across an EN → JA → EN round-trip.
  await settings.getByRole("button", { name: "English" }).click();
  await canonicalScroll.evaluate((node) => { node.scrollTop = 0; });
  await expect.poll(async () => canonicalScroll.evaluate((node) => node.scrollTop)).toBe(0);
  await settings.getByRole("button", { name: "日本語" }).click();
  await scrollSurface.evaluate((node) => { node.scrollTop = 0; });
  await expect(presentation).toContainText("明日という日はまだ");
  await expect.poll(async () => scrollSurface.evaluate((node) => node.scrollTop < node.scrollHeight - node.clientHeight)).toBe(true);
  await settings.getByRole("button", { name: "English" }).click();
  await expect(presentation).toBeHidden();
  await expect.poll(async () => canonicalScroll.evaluate((node) => node.scrollTop)).toBe(0);
  await settings.getByRole("button", { name: "日本語" }).click();

  await settings.getByRole("button", { name: "XL" }).click();
  await page.setViewportSize({ width: 900, height: 760 });
  const resizedHost = await presentation.boundingBox();
  const resizedBuffer = await frame.locator(".BufferWindow").boundingBox();
  if (resizedHost && resizedBuffer) {
    expect(resizedHost.x).toBeGreaterThanOrEqual(resizedBuffer.x);
    expect(resizedHost.y).toBeGreaterThanOrEqual(resizedBuffer.y);
    expect(resizedHost.x + resizedHost.width).toBeLessThanOrEqual(resizedBuffer.x + resizedBuffer.width);
    expect(resizedHost.y + resizedHost.height).toBeLessThanOrEqual(resizedBuffer.y + resizedBuffer.height);
  }
  await testInfo.attach("localized-history-with-english-fallback", { body: await page.screenshot(), contentType: "image/png" });

  // RESTORE opens Parchment's canonical file interaction, which has no safe
  // structured transcript representation. The accumulated display cache must
  // not strand that canonical interaction behind the Japanese surface.
  await commandInput.fill("RESTORE");
  await page.getByRole("button", { name: /送信/ }).click();
  await expect(canonicalIframe).toHaveAttribute("aria-hidden", "false");
  await expect(frame.locator(".BufferWindowInner")).not.toHaveAttribute("inert", "");
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
  const frame = canonicalFrame(page);
  const presentation = frame.getByRole("log", { name: "日本語ストーリー表示" });
  await expect(presentation).toContainText("明日という日はまだ");
  await page.getByRole("button", { name: /原作を始める/ }).click();
  await expect(page.locator("#command-input")).toBeEnabled();

  // Switch to English so the canonical iframe is intentionally interactive,
  // then submit RESTORE through Parchment rather than the wrapper controls.
  await settings.getByRole("button", { name: "English" }).click();
  const canonicalInput = frame.locator("textarea.Input.LineInput");
  await canonicalInput.fill("RESTORE");
  await canonicalInput.press("Enter");

  // Returning to Japanese must not resurrect the pre-RESTORE display cache.
  await settings.getByRole("button", { name: "日本語" }).click();
  await expect(presentation).toBeHidden();
  const canonicalIframe = page.locator('iframe[title*="canonical Release 79 story"]');
  await expect(canonicalIframe).toHaveAttribute("aria-hidden", "false");
  await expect(canonicalIframe).not.toHaveAttribute("inert", "");
});
