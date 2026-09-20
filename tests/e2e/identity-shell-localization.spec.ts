import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("amfv:locale", "ja");
    localStorage.setItem("amfv:interaction-level", "guided");
  });
});

test("a persisted Japanese fresh state localizes the inert identity rail and shared shell", async ({ page }) => {
  await page.goto("/");

  const introduction = page.getByRole("dialog", { name: "A Mind Forever Voyaging" });
  await expect(introduction).toBeVisible();

  const rail = page.locator(".identity-rail");
  const shell = page.locator(".experience-shell");
  await expect(rail).toHaveAttribute("aria-label", "作品情報");
  await expect(rail).toHaveAttribute("aria-hidden", "true");
  await expect(rail).toHaveAttribute("inert", "");
  await expect(shell).toHaveAttribute("aria-label", "インタラクティブな物語");
  await expect(shell).toHaveAttribute("aria-hidden", "true");
  await expect(shell).toHaveAttribute("inert", "");

  const wordmark = rail.locator(".wordmark");
  await expect(wordmark).toHaveAttribute("aria-label", "作品名と版の情報を開く");
  await expect(wordmark.locator("span")).toHaveCount(3);
  expect(await wordmark.locator("span").evaluateAll((elements) => elements.map((element) => element.getAttribute("lang")))).toEqual(["en", "en", "en"]);
  await expect(rail.locator(".edition-mark")).toHaveText("インタラクティブ小説 · Release 79");
  await expect(rail.locator(".era-caption")).toHaveText("通信チャンネル");
  await expect(rail.locator(".carrier-readout")).toContainText("搬送波");
  await expect(rail.locator(".carrier-readout")).toContainText("受信中");
  await expect(rail.locator(".rail-footer > span")).toHaveText("RELEASE 79 · SERIAL 851122");
  await expect(rail.locator(".rail-footer > span")).toHaveAttribute("lang", "en");
  await expect(rail.getByRole("button", { name: "この版について", includeHidden: true })).toHaveCount(1);
  await expect(page.locator(".skip-link")).toHaveText("ストーリー操作へスキップ");
  await expect(page.locator(".skip-link")).toHaveAttribute("href", "#command-input");
  await expect(page.locator(".system-state")).toHaveText(/初期化中|キー入力待機中|入力待機中|処理中/);
  await expect(page.locator('iframe[src="/player.html"]')).toHaveAttribute("title", "A Mind Forever Voyaging — オリジナル版 Release 79");
  expect(await rail.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect(await page.locator(".console-header").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test("Japanese opening, Communications, and PEOF copy restores exactly to English", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await page.getByRole("dialog", { name: "A Mind Forever Voyaging" }).getByRole("button", { name: "始める · ガイド付き" }).click();

  const rail = page.getByRole("complementary", { name: "作品情報" });
  const continueButton = page.getByRole("button", { name: /原作を始める/ });
  await expect(continueButton).toBeEnabled({ timeout: 30_000 });
  await expect(page.locator(".system-state")).toContainText("キー入力待機中");
  await continueButton.click();

  const commandInput = page.locator("#command-input");
  await expect(commandInput).toBeEnabled({ timeout: 30_000 });
  await expect(rail).toContainText("識別名");
  await expect(rail).toContainText("PRISM");
  await expect(rail).toContainText(/通信機能稼働中|認知システム稼働中/);
  await expect(rail).toContainText("現在のモード");
  await expect(rail.locator(".mode-readout")).toHaveText("通信");
  await expect(page.locator(".system-state")).toContainText("入力待機中");

  await commandInput.fill("PEOF");
  await page.getByRole("button", { name: /送信/ }).click();
  const location = page.locator(".location-block");
  await expect(location).toContainText("アウトレット PEOF");
  await expect(location.getByText("PEOF", { exact: true })).toHaveAttribute("lang", "en");
  await expect(page.frameLocator('iframe[src="/player.html"]').getByLabel("現在のゲームプロンプト")).toHaveText(">");

  const aboutRelease = rail.getByRole("button", { name: "この版について" });
  await aboutRelease.focus();
  await aboutRelease.press("Enter");
  await expect(page.getByRole("complementary", { name: "読者ガイド" })).toBeVisible();
  await page.getByRole("button", { name: "読書とプレイの設定" }).click();
  await page.getByRole("region", { name: "読書とプレイの設定" }).getByRole("button", { name: "English" }).click();

  const englishRail = page.getByRole("complementary", { name: "Story context" });
  await expect(englishRail.getByRole("button", { name: "Open title and edition information" })).toBeVisible();
  await expect(englishRail.locator(".edition-mark")).toHaveText("INTERACTIVE NOVEL · RELEASE 79");
  await expect(englishRail.locator(".mode-readout")).toHaveText("Communications");
  await expect(page.locator(".experience-shell")).toHaveAttribute("aria-label", "Interactive story");
  await expect(page.locator(".skip-link")).toHaveText("Skip to interaction controls");
  await expect(page.locator('iframe[src="/player.html"]')).toHaveAttribute("title", "A Mind Forever Voyaging — canonical Release 79 story");
});
