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
  await page.getByRole("region", { name: "Reading and play settings" })
    .getByRole("button", { name: "日本語" }).click();

  const presentation = page.getByRole("log", { name: "日本語ストーリー表示" });
  const frame = canonicalFrame(page);
  await expect(presentation).toContainText("明日という日はまだ");
  await attachPayload(testInfo, "opening-presentation-v2", frame);

  await page.getByRole("button", { name: /原作を始める/ }).click();
  await expect(page.locator("#command-input")).toBeEnabled();
  await attachPayload(testInfo, "initial-line-presentation-v2", frame);
  await expect(presentation).toContainText("公式メッセージ回線");
  await expect(presentation).toContainText("通信モードに入りました");

  const commandInput = page.locator("#command-input");
  await commandInput.fill("LOOK");
  await page.getByRole("button", { name: /送信/ }).click();

  await expect.poll(async () => frame.locator("#gameport .BufferLine").allTextContents())
    .toEqual(expect.arrayContaining([expect.stringMatching(/LOOK/i)]));
  await expect(presentation.locator(".story-presentation-command")).toHaveText(/LOOK/);
  await expect(presentation.locator(".story-presentation-command")).toHaveAttribute("lang", "en");
  await expect(presentation).toContainText("通信モードに入りました");
  await attachPayload(testInfo, "look-presentation-v2", frame);
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
});
