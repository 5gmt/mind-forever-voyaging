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
  await expect(settings.getByRole("button", { name: "English" })).toHaveAttribute("lang", "en");
  await expect(settings.getByRole("button", { name: "日本語" })).toHaveAttribute("lang", "ja");
  await expect(page.locator("main")).not.toHaveAttribute("lang");
  await expect(page.getByRole("button", { name: "読書とプレイの設定" })).toHaveAttribute("title", "読書とプレイの設定");
  await expect(page.getByRole("button", { name: "ガイドの表示を切り替える" })).toContainText("ガイド");
  await expect(page.getByRole("button", { name: "オリジナルの付属資料を開く" })).toContainText("付属資料");
  const shareButton = page.getByRole("button", { name: "このエディションを共有" });
  await expect(shareButton).toContainText("共有");
  await expect(page.getByRole("button", { name: "全画面表示を切り替える" })).toContainText("全画面");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => undefined } });
  });
  await shareButton.click();
  await expect(page.getByRole("status")).toHaveText("リンクをコピーしました");
  await expect(settings).toContainText("プレイ操作");
  await expect(settings).toContainText("文字サイズ");
  await expect(settings.getByText("ストーリーを等幅フォントで表示")).toBeVisible();
  await settings.getByRole("button", { name: "English" }).click();
  await expect(settings).toHaveAccessibleName("Reading and play settings");
  await expect(page.getByRole("button", { name: "Share this edition" })).toContainText("Share");
  await expect(page.getByRole("status")).toHaveText("Link copied");
  await expect(settings).toContainText("Play controls");
  await settings.getByRole("button", { name: "日本語" }).click();

  await page.getByRole("button", { name: "ガイドの表示を切り替える" }).click();
  const companion = page.getByRole("complementary", { name: "読者ガイド" });
  await expect(companion).toHaveAttribute("lang", "ja");
  await expect(companion.getByRole("heading", { name: "受信中の通信" })).toBeVisible();
  await expect(companion).toContainText("LOOK で周囲を再表示し、HELP で役立つコマンドを確認できます。");
  await expect(companion.getByRole("button", { name: "ガイドを閉じる" })).toBeVisible();
  await companion.getByRole("button", { name: /クラシック/ }).click();
  await expect(companion).toContainText("コマンドはすべて自分で入力します。");
  await expect(companion.getByRole("tab", { name: "通信" })).toHaveCount(0);
  await companion.getByRole("button", { name: /ガイド付き/ }).click();
  await companion.getByRole("tab", { name: "付属資料" }).click();
  await expect(companion.getByRole("heading", { name: "地図、デコーダー、マニュアル" })).toBeVisible();
  await expect(companion).toContainText("ロックヴィル地図");
  await companion.getByRole("tab", { name: "この作品について" }).click();
  await expect(companion).toContainText("私たちに何を感じさせうるかを探究しています。");
  await companion.getByRole("tab", { name: "ガイド" }).click();

  const frame = page.frameLocator('iframe[src="/player.html"]');
  const presentation = frame.getByRole("log", { name: "日本語ストーリー表示" });
  await expect(presentation).toHaveAttribute("lang", "ja");
  await expect(presentation).toContainText("［いずれかのキーを押して続けてください。］");
  await expect(presentation).toContainText("明日という日はまだ");
  await expect(presentation).toContainText("William Marsden");

  const canonicalStory = page.locator('iframe[src="/player.html"]');
  await expect(canonicalStory).toHaveAttribute("aria-hidden", "false");
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("aria-hidden", "true");
  await expect(frame.locator(".BufferWindowInner")).toHaveAttribute("inert", "");

  await page.getByRole("button", { name: /原作を始める/ }).click();

  await expect(presentation).toContainText("公式メッセージ回線");
  await expect(canonicalStory).toHaveAttribute("aria-hidden", "false");

  const commandInput = page.locator("#command-input");
  await expect(commandInput).toBeVisible();
  await expect(commandInput).toBeEnabled();
  await expect(companion.getByRole("tab", { name: "通信" })).toBeVisible();
  await companion.getByRole("tab", { name: "通信" }).click();
  await expect(companion.getByRole("heading", { name: "アウトレット一覧" })).toBeVisible();
  await expect(companion).toContainText("ペレルマン博士のオフィス");
  await expect(companion).toContainText("接続 →");
  await expect(page.getByLabel(/物語に応答する|コマンドを入力/)).toHaveAttribute("placeholder", "英語でコマンドを入力…");
  await expect(page.locator("#command-help")).toContainText("以前のコマンドを呼び出せます");
  await expect(page.locator(".command-deck")).not.toHaveAttribute("lang");
  await expect(page.locator(".command-form")).toHaveAttribute("lang", "ja");
  await expect(commandInput).toHaveAttribute("lang", "en");
  const peofOutlet = page.locator(".outlet-switcher").getByRole("button", { name: /ペレルマン博士のオフィス/ });
  await expect(peofOutlet).toContainText("PEOF");
  expect(await peofOutlet.evaluate((element) => element.closest("[lang]")?.getAttribute("lang"))).toBe("ja");
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
  await expect(page.locator("#command-help")).toContainText("recalls your previous commands");
  await expect(page.locator(".outlet-switcher").getByRole("button", { name: /Dr. Perelman's Office/ })).toContainText("PEOF");
  await expect(replacementInner).not.toHaveAttribute("aria-hidden", "true");
  await expect(replacementInner).not.toHaveAttribute("inert", "");
});

test("fresh Japanese Classic session reaches Communications and PEOF with canonical input", async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => {
    localStorage.setItem("amfv:locale", "ja");
    localStorage.setItem("amfv:interaction-level", "classic");
  });
  await page.goto("/");

  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  const continueButton = page.getByRole("button", { name: /原作を始める/ });
  await expect(introduction.or(continueButton)).toBeVisible({ timeout: 20_000 });
  if (!(await continueButton.isVisible())) {
    await introduction.getByRole("button", { name: /始める · クラシック/ }).click();
  }
  await expect(continueButton).toBeEnabled({ timeout: 20_000 });

  await page.getByRole("button", { name: "ガイドの表示を切り替える" }).click();
  const companion = page.getByRole("complementary", { name: "読者ガイド" });
  await expect(companion).toHaveAttribute("lang", "ja");
  await expect(companion.getByRole("tab", { name: "通信" })).toHaveCount(0);
  await expect(page.locator(".outlet-switcher")).toHaveCount(0);
  await companion.getByRole("button", { name: "ガイドを閉じる" }).click();
  await continueButton.click();

  const commandInput = page.locator("#command-input");
  await expect(commandInput).toBeEnabled();
  await commandInput.focus();
  await expect(commandInput).toBeFocused();
  await expect(commandInput).toHaveAttribute("lang", "en");
  await expect(page.locator(".system-state")).toHaveAttribute("lang", "ja");
  await expect(page.locator(".system-state")).toHaveAccessibleName("物語は入力を受け付けています");
  await expect(page.locator(".system-state").getByText("入力待機中")).not.toHaveAttribute("lang", /.+/);
  await expect(companion.getByRole("tab", { name: "通信" })).toHaveCount(0);
  await expect(page.locator(".outlet-switcher")).toHaveCount(0);

  await commandInput.fill("PEOF");
  await page.getByRole("button", { name: /送信/ }).click();
  await expect(page.locator(".location-block")).toContainText("ペレルマン博士のオフィス");
  await expect(page.locator(".location-block strong")).toHaveAttribute("lang", "ja");
  await expect(commandInput).toBeEnabled();
  await expect(commandInput).toBeFocused();
  await expect(page.locator(".outlet-switcher")).toHaveCount(0);
});
