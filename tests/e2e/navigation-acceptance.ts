import { expect, type Locator, type Page } from "@playwright/test";

// Exercise the live controls; no command is submitted by this helper in actions mode.
export const clickRouteStep = async (
  page: Page, input: Locator, controls: string, command: string, destination?: string,
) => {
  await page.locator(".compact-map-button").click();
  const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
  const navigator = drawer.locator(".rockvil-navigator");
  if (destination) await navigator.getByRole("button", { name: new RegExp(`^${destination}(、|$)`) }).click();
  await expect(navigator.locator(".navigator-route small")).toContainText(`次は ${command}`);
  const commands = page.frameLocator('iframe[src="/player.html"]').locator(".story-presentation-command");
  const previousCount = await commands.count();
  if (controls === "guided") {
    await navigator.getByRole("button", { name: "次の移動を入力欄へ" }).click();
    await expect(drawer).toBeHidden();
    await expect(input).toHaveValue(command.toLowerCase());
    await expect(input).toBeFocused();
    await expect(commands).toHaveCount(previousCount);
    if (destination === "新聞") {
      const toggle = async (locale: "English" | "日本語") => {
        await page.getByTitle(/読書とプレイの設定|Reading and play settings/).click();
        await page.getByRole("region", { name: /読書とプレイの設定|Reading and play settings/ }).getByRole("button", { name: locale, exact: true }).click();
        await page.getByTitle(/読書とプレイの設定|Reading and play settings/).click();
      };
      await toggle("English");
      await expect(page.locator("#command-help")).toContainText("Route to Newspaper:");
      await expect(input).toHaveValue(command.toLowerCase());
      await toggle("日本語");
      await expect(page.locator("#command-help")).toContainText("新聞 への経路");
      await expect(commands).toHaveCount(previousCount);
      await input.click();
      await expect(input).toBeFocused();
    }
    // Preserve editing and draft-only behavior before deliberately submitting.
    await input.fill(`${command.toLowerCase()} `);
    await expect(input).toHaveValue(`${command.toLowerCase()} `);
    await page.getByRole("button", { name: /^送信/ }).click();
  } else {
    await navigator.getByRole("button", { name: "次の移動を実行" }).click();
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
  }
};
