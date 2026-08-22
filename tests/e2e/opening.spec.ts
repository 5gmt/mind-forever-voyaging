import { expect, test } from "@playwright/test";

test("Japanese opening continues into the canonical line input", async ({ page }) => {
  await page.goto("/");

  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  if (await introduction.isVisible()) {
    await introduction.getByRole("button", { name: /^Begin/ }).click();
  }

  const continueButton = page.getByRole("button", { name: /Begin the original story/i });
  await expect(continueButton).toBeEnabled({ timeout: 20_000 });

  await page.getByTitle("Reading and play settings").click();
  const settings = page.getByRole("region", { name: "Reading and play settings" });
  await settings.getByRole("button", { name: "日本語" }).click();

  const frame = page.frameLocator('iframe[title*="canonical Release 79 story"]');
  const presentation = frame.getByRole("log", { name: "日本語ストーリー表示" });
  await expect(presentation).toHaveAttribute("lang", "ja");
  await expect(presentation).toContainText("［いずれかのキーを押して続けてください。］");
  await expect(presentation).toContainText("明日という日はまだ");
  await expect(presentation).toContainText("William Marsden");

  const canonicalStory = page.locator('iframe[title*="canonical Release 79 story"]');
  await expect(canonicalStory).toHaveAttribute("aria-hidden", "false");
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("aria-hidden", "true");
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("inert", "");

  await page.getByRole("button", { name: /原作を始める/ }).click();

  await expect(presentation).toContainText("公式メッセージ回線");
  await expect(canonicalStory).toHaveAttribute("aria-hidden", "false");

  const commandInput = page.locator("#command-input");
  await expect(commandInput).toBeVisible();
  await expect(commandInput).toBeEnabled();
  await commandInput.fill("inventory");
  await expect(commandInput).toHaveValue("inventory");

  // Parchment can replace only BufferWindowInner while retaining its window.
  // The accessibility handoff must follow the new inner and release it again.
  await frame.locator(".BufferWindowInner").evaluate((inner) => {
    inner.replaceWith(inner.cloneNode(true));
  });
  const replacementInner = frame.locator(".BufferWindowInner");
  await expect(replacementInner).toHaveAttribute("aria-hidden", "true");
  await expect(replacementInner).toHaveAttribute("inert", "");
  await settings.getByRole("button", { name: "English" }).click();
  await expect(replacementInner).not.toHaveAttribute("aria-hidden", "true");
  await expect(replacementInner).not.toHaveAttribute("inert", "");
});
