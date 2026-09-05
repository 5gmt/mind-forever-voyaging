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
  const settings = page.getByRole("region", { name: /Reading and play settings|読書とプレイの設定/ });
  await settings.getByRole("button", { name: "日本語" }).click();
  await expect(settings).toHaveAccessibleName("読書とプレイの設定");
  await expect(page.getByRole("button", { name: "読書とプレイの設定" })).toHaveAttribute("title", "読書とプレイの設定");
  await expect(page.getByRole("button", { name: "ガイドの表示を切り替える" })).toContainText("ガイド");
  await expect(page.getByRole("button", { name: "オリジナルの付属資料を開く" })).toContainText("付属資料");
  await expect(page.getByRole("button", { name: "このエディションを共有" })).toContainText("共有");
  await expect(page.getByRole("button", { name: "全画面表示を切り替える" })).toContainText("全画面");
  await expect(settings).toContainText("プレイ操作");
  await expect(settings).toContainText("文字サイズ");
  await expect(settings.getByText("ストーリーを等幅フォントで表示")).toBeVisible();
  await settings.getByRole("button", { name: "English" }).click();
  await expect(settings).toHaveAccessibleName("Reading and play settings");
  await expect(page.getByRole("button", { name: "Share this edition" })).toContainText("Share");
  await expect(settings).toContainText("Play controls");
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
  await expect(page.getByLabel(/物語に応答する|コマンドを入力/)).toHaveAttribute("placeholder", "英語でコマンドを入力…");
  await expect(page.getByRole("button", { name: /送信/ })).toBeDisabled();
  await commandInput.fill("inventory");
  await expect(page.getByRole("button", { name: /送信/ })).toBeEnabled();
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
