import { expect, type FrameLocator, type Page, type TestInfo } from "@playwright/test";

// Controlled bridge boundary probes after the real route. These are not VM
// runtime observations or evidence of restoring an actual saved game.
export async function acceptMealScope(page: Page, testInfo: TestInfo) {
  const frame = page.frameLocator('iframe[src="/player.html"]');
  const intercept = async (target: FrameLocator) => target.locator("body").evaluate(() => {
    const state = window as typeof window & { AMFVScopePost?: typeof window.parent.postMessage };
    state.AMFVScopePost = window.parent.postMessage.bind(window.parent);
    window.parent.postMessage = ((message: unknown, origin: string) => {
      const m = message as { channel?: string; type?: string };
      if (m.channel === "amfv:bridge" && m.type === "transcript") return;
      state.AMFVScopePost?.(message, origin);
    }) as typeof window.parent.postMessage;
  });
  const post = async (payload: Record<string, unknown>, target = frame) => target.locator("body").evaluate((_body, message) => {
    (window as typeof window & { AMFVScopePost?: typeof window.parent.postMessage }).AMFVScopePost?.({ channel: "amfv:bridge", ...message }, window.location.origin);
  }, payload);
  const report = (text: string, location = "Roy's Pagoda", year = 2041, inputKind = "line", target = frame) => post({ type: "transcript", text, recentText: text, statusText: `Mode: Simulation Mode Location: ${location} Date: 3/10/${year} Time: 1:29pm`, inputKind, acceptsInput: true }, target);
  const meal = page.locator(".scene-actions").filter({ hasText: /Choose the meal|コマンドを1回送信/ });
  const observed: string[] = [];
  await intercept(frame);
  await report(`${"Routine observation.\n".repeat(1200)}>S\nRoy's Pagoda\nThis is a small Chinese restaurant, crowded with students. There is an exit to the north.\n>`);
  await expect(meal.getByRole("button", { name: "食事を注文する", exact: true })).toBeEnabled();
  observed.push("long first-session history retains eligible meal UI without an entry marker in the rolling window");
  await post({ type: "busy" });
  await expect(meal.getByRole("button")).toBeDisabled();
  await page.getByTitle("読書とプレイの設定").click();
  await page.getByRole("region", { name: "読書とプレイの設定" }).getByRole("button", { name: "English", exact: true }).click();
  await page.getByTitle("Reading and play settings").click();
  await expect(page.getByRole("region", { name: "Meal at Roy's Pagoda", exact: true }).getByRole("button")).toBeDisabled();
  await page.getByTitle("Reading and play settings").click();
  await page.getByRole("region", { name: "Reading and play settings" }).getByRole("button", { name: "日本語", exact: true }).click();
  await page.getByTitle("読書とプレイの設定").click();
  await expect(meal.getByRole("button")).toBeDisabled();
  observed.push("busy disables the single meal action in JA and EN");
  await report(">S\nRoy's Pagoda\n>", "Roy's Pagoda", 2041, "char");
  await expect(meal).toHaveCount(0);
  observed.push("character input excludes meal");
  await report(">LOOK\nUnknown Room\n>", "Unknown Room");
  await expect(meal).toHaveCount(0);
  await expect(page.locator(".location-block strong")).toHaveText("Unknown Room");
  observed.push("unknown room and place remain English, no meal");
  await report(">S\nRoy's Pagoda\n>", "Roy's Pagoda", 2051);
  await expect(meal).toHaveCount(0);
  await expect(page.locator(".location-block strong")).toHaveText("Roy's Pagoda");
  observed.push("later year excludes meal and uses English place");
  await report(">S\nRoy's Pagoda\n>");
  await expect(meal.getByRole("button")).toBeEnabled();
  await post({ type: "command", command: "RESTORE" });
  await report(">S\nRoy's Pagoda\n>");
  await expect(meal).toHaveCount(0);
  await expect(page.locator(".location-block strong")).toHaveText("Roy's Pagoda");
  observed.push("RESTORE notification invalidates initial state; unknown recovered state has no meal");
  await post({ type: "transcript", text: "Tomorrow never yet.\nHit any key to continue", recentText: "Tomorrow never yet.\nHit any key to continue", statusText: "", inputKind: "char", acceptsInput: true });
  await report("This simulation is based 10 years hence.\n>S\nRoy's Pagoda\n>");
  await expect(meal.getByRole("button")).toBeEnabled();
  await post({ type: "transcript", text: ">ABORT\nCommunications Mode\n>", recentText: ">ABORT\nCommunications Mode\n>", statusText: "Mode: Communications Mode", inputKind: "line", acceptsInput: true });
  await report("This simulation is based 10 years hence.\n>S\nRoy's Pagoda\n>");
  await expect(meal).toHaveCount(0);
  await expect(page.locator(".location-block strong")).toHaveText("Roy's Pagoda");
  observed.push("simulation re-entry excludes meal and uses English place");
  await page.getByRole("button", { name: "ガイドの表示を切り替える" }).click();
  await page.getByRole("tab", { name: "この作品について" }).click();
  await page.getByRole("button", { name: "Open spoiler/debug tools" }).click();
  await page.getByRole("button", { name: "Enable spoilers & load QA build" }).click();
  const qa = page.frameLocator('iframe[src*="qa=1"]');
  await expect(qa.locator(".BufferWindowInner")).toContainText("Tomorrow never yet", { timeout: 60_000 });
  await intercept(qa);
  await report("This simulation is based 10 years hence.\n>S\nRoy's Pagoda\n>", "Roy's Pagoda", 2041, "line", qa);
  await expect(meal).toHaveCount(0);
  observed.push("QA active with Roy's/2041/line input excludes meal");
  await testInfo.attach("restaurant-controlled-scope-probes", { body: JSON.stringify({ provenance: "controlled bridge messages, not VM outputs or actual saved-game RESTORE", observed }), contentType: "application/json" });
}
