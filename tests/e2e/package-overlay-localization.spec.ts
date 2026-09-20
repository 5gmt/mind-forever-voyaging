import { expect, test } from "@playwright/test";

const expectJapanesePackage = async (page: import("@playwright/test").Page) => {
  const dialog = page.getByRole("dialog", { name: "AMFV 付属資料" });
  await expect(dialog).toHaveAttribute("lang", "ja");
  await expect(dialog).toContainText("オリジナル版の箱に同梱");
  await expect(dialog.getByRole("navigation", { name: "付属資料" })).toBeVisible();
  await expect(dialog.getByAltText("ランドマークと案内情報を掲載した、サウスダコタ州ロックヴィル中心街の1985年オリジナル販促用街路地図")).toBeVisible();
  await expect(dialog).toContainText("原作ゲームに同梱された2031年の街路地図です。");
  await expect(dialog.getByRole("link", { name: "原寸で開く ↗" })).toHaveAttribute("href", "/package/rockvil-map-back.jpg");

  await dialog.getByRole("button", { name: "セキュリティ・デコーダー" }).click();
  await expect(dialog.getByAltText("オリジナルの PRISM Project Facility クラス1セキュリティモード用アクセス・デコーダー・ホイール")).toBeVisible();
  await expect(dialog).toContainText("1985年に同梱された実物のデコーダーです。");

  await dialog.getByRole("button", { name: "雑誌とマニュアル" }).click();
  await expect(dialog.getByRole("heading", { name: "Dakota Online · 2031年4月" })).toBeVisible();
  await expect(dialog).toContainText("オリジナルの雑誌、短編小説、広告、操作マニュアルを、このスキャンにまとめて収録しています。");
  await expect(dialog.getByRole("link", { name: "オリジナルPDFを読む ↗" })).toHaveAttribute("href", "/package/amfv-manual.pdf");
  await expect(dialog.locator("footer")).toHaveText("スキャン資料は The Infocom Gallery および Museum of Computer Adventure Game History により保存されています。");
  await expect(dialog.getByRole("link", { name: "The Infocom Gallery" })).toHaveAttribute("href", "https://gallery.guetech.org/amfv/amfv.html");
  await expect(dialog.getByRole("link", { name: "Museum of Computer Adventure Game History" })).toHaveAttribute("href", "https://www.mocagh.org/loadpage.php?getgame=amfv");
  return dialog;
};

test("the introduction opens the fully localized original-package viewer", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("amfv:locale", "ja"));
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "オリジナル版の付属資料を開く" });
  await trigger.click();
  const dialog = await expectJapanesePackage(page);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("the companion Package panel opens the same localized viewer and English remains exact", async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => localStorage.setItem("amfv:locale", "ja"));
  await page.goto("/");
  await page.getByRole("button", { name: /始める ·/ }).click();
  await page.getByRole("button", { name: "ガイドの表示を切り替える" }).click();
  const companion = page.getByRole("complementary", { name: "読者ガイド" });
  await companion.getByRole("tab", { name: "付属資料" }).click();
  const trigger = companion.getByRole("button", { name: "ロックヴィル地図" });
  await trigger.click();
  let dialog = await expectJapanesePackage(page);
  await dialog.getByRole("button", { name: "付属資料を閉じる" }).click();
  await expect(trigger).toBeFocused();

  await page.getByRole("button", { name: "読書とプレイの設定" }).click();
  await page.getByRole("region", { name: "読書とプレイの設定" }).getByRole("button", { name: "English" }).click();
  const englishCompanion = page.getByRole("complementary", { name: "Reader companion" });
  await englishCompanion.getByRole("tab", { name: "Package" }).click();
  await englishCompanion.getByRole("button", { name: "Rockvil map" }).click();
  dialog = page.getByRole("dialog", { name: "AMFV package" });
  await expect(dialog).toHaveAttribute("lang", "en");
  await expect(dialog).toContainText("In the original box");
  await expect(dialog.getByRole("navigation", { name: "Package materials" })).toBeVisible();
  await expect(dialog.getByAltText("Original 1985 promotional street map of downtown Rockvil, South Dakota, with landmarks and a visitor guide")).toBeVisible();
  await expect(dialog).toContainText("The 2031 street map supplied with the original game. Zoom your browser or open the image directly for fine print.");
  await expect(dialog.getByRole("link", { name: "Open full size ↗" })).toHaveAttribute("href", "/package/rockvil-map-back.jpg");
});
