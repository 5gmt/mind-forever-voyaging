import { expect, test } from "@playwright/test";

test("the introduction switches exact copy in both directions without changing its behavior", async ({ page }) => {
  await page.goto("/");

  let introduction = page.getByRole("dialog", { name: "A Mind Forever Voyaging" });
  await expect(introduction).toHaveAttribute("aria-modal", "true");
  await expect(introduction).toHaveAttribute("lang", "en");
  await expect(introduction.locator(".intro-art, .intro-grid")).toHaveCount(2);
  await expect(introduction.locator(".intro-art")).toHaveAttribute("aria-hidden", "true");
  await expect(introduction.locator(".intro-grid")).toHaveAttribute("aria-hidden", "true");
  await expect(introduction).toContainText("Read closely. Wander. Talk to people. Notice the ordinary things.");
  await expect(introduction.getByRole("button", { name: "Begin · Guided" })).toBeVisible();

  await introduction.getByRole("button", { name: "Begin · Guided" }).click();
  await page.getByRole("button", { name: "Reading and play settings" }).click();
  const settings = page.getByRole("region", { name: "Reading and play settings" });
  await settings.getByRole("button", { name: "日本語" }).click();
  await page.getByRole("button", { name: "Open title and edition information" }).click();

  introduction = page.getByRole("dialog", { name: "A Mind Forever Voyaging" });
  await expect(introduction).toHaveAttribute("lang", "ja");
  await expect(introduction).toContainText("完全収録・1985年のインタラクティブ小説 · Release 79");
  await expect(introduction).toContainText("よく読み、歩き回り、人と話し、ありふれたものに目を留めてください。");
  await expect(introduction).toContainText("著：Steve Meretzky · オリジナル版：Infocom · インタープリター：Parchment");

  const classic = introduction.getByRole("button", { name: /クラシック/ });
  await classic.click();
  await expect(introduction.getByRole("button", { name: "始める · クラシック" })).toBeVisible();
  const guided = introduction.getByRole("button", { name: /ガイド付き/ });
  await guided.click();
  await expect(introduction.getByRole("button", { name: "始める · ガイド付き" })).toBeVisible();
  const actions = introduction.getByRole("button", { name: /アクションメニュー/ });
  await actions.click();
  await expect(introduction.getByRole("button", { name: "始める · アクションメニュー" })).toBeVisible();

  await introduction.getByRole("button", { name: "オリジナル版の付属資料を開く" }).click();
  await expect(page.getByRole("dialog", { name: "AMFV package" })).toBeVisible();
  await expect(page.locator(".intro-overlay")).toHaveAttribute("aria-hidden", "true");
  await page.getByRole("button", { name: "Close package materials" }).click();

  await page.evaluate(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => undefined } });
  });
  await introduction.getByRole("button", { name: "このエディションを共有" }).click();
  await expect(page.getByRole("status")).toHaveText("リンクをコピーしました");

  await introduction.getByRole("button", { name: "始める · アクションメニュー" }).click();
  await page.getByRole("region", { name: "読書とプレイの設定" }).getByRole("button", { name: "English" }).click();
  await page.getByRole("button", { name: "Open title and edition information" }).click();

  introduction = page.getByRole("dialog", { name: "A Mind Forever Voyaging" });
  await expect(introduction).toHaveAttribute("lang", "en");
  await expect(introduction).toContainText("THE COMPLETE 1985 INTERACTIVE NOVEL · RELEASE 79");
  await expect(introduction).toContainText("Read closely. Wander. Talk to people. Notice the ordinary things.");
  await expect(introduction).toContainText("Written by Steve Meretzky · Original release by Infocom · Interpreter by Parchment");
  await expect(introduction.getByRole("button", { name: "Begin · Action menus" })).toBeVisible();
});
