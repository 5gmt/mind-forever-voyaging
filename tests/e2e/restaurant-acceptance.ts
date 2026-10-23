import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { acceptNewspaperFieldwork } from "./newspaper-acceptance";
import { clickRouteStep } from "./navigation-acceptance";
import { readingTrace } from "./reading-observations";

const MEAL_EN = 'You order a bowl of Hot and Sour soup and some assorted appetizers. The food arrives promptly, steaming hot, delicately spiced, delicious. Afterward, your check arrives with a typical fortune cookie and a plate of lychee nuts. The fortune reads: "Prosperity does not equal happiness." You pay with your credit card. After a moment, the waiter returns your card, informing you that your account has been debited for $30 and that your new balance is $569.';
const MEAL_JA = '酸辣湯を一杯と、前菜を何品か注文する。料理はすぐに運ばれてくる。湯気が立つほど熱く、香辛料が繊細に利いていて、おいしい。食後には勘定書きが、よくあるフォーチュンクッキーと、ライチの実をのせた皿とともに届く。おみくじには「繁栄は幸福と同じではない。」とある。クレジットカードで支払う。少しして、ウェイターがカードを返し、口座から$30が引き落とされ、新しい残高は$569になったと告げる。';
const COLORS = ["WHITE", "DARK GREEN", "DARK BLUE", "PINK", "ORANGE", "PURPLE", "TAN", "AQUA", "LIGHT BLUE", "LIGHT GREEN", "LIGHT GRAY", "YELLOW", "BLACK", "DARK GRAY", "BROWN", "RED"];
const INNER = [89, 61, 50, 18, 29, 82, 46, 77, 27, 68, 22, 95, 40, 58, 15, 86, 28, 33, 94, 11, 64, 98, 34, 49, 60, 16, 85, 52, 37, 53, 93, 91];
const OUTER = [12, 66, 73, 36, 90, 41, 19, 48, 62, 92, 55, 23, 84, 99, 57, 20, 78, 67, 51, 88, 17, 31, 70, 39, 96, 25, 81, 83, 47, 54, 13, 43];

export async function acceptRestaurantMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo) {
  const attach = async (name: string, body: string | Buffer, contentType = "application/json") => {
    const path = testInfo.outputPath(`${name}.${contentType === "image/png" ? "png" : contentType === "text/plain" ? "txt" : "json"}`);
    await writeFile(path, body);
    await testInfo.attach(name, { path, contentType });
  };
  await page.goto("/");
  await page.addStyleTag({ content: "nextjs-portal { display: none; }" });
  const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  const begin = page.getByRole("button", { name: /Begin the original story|原作を始める/i });
  await expect(introduction.or(begin)).toBeVisible({ timeout: 60_000 });
  if (!(await begin.isVisible())) await introduction.getByRole("button", { name: /^Begin/ }).click();
  await expect(begin).toBeEnabled();
  await page.getByTitle("Reading and play settings").click();
  const settings = page.getByRole("region", { name: /Reading and play settings|読書とプレイの設定/ });
  await settings.getByRole("button", { name: controls === "classic" ? "Classic" : controls === "guided" ? "Guided" : "Action menus", exact: true }).click();
  await settings.getByRole("button", { name: "日本語", exact: true }).click();
  await page.getByTitle("読書とプレイの設定").click();
  await begin.click();
  const frame = page.frameLocator('iframe[src="/player.html"]');
  const presentation = frame.getByRole("log", { name: "日本語ストーリー表示" });
  const canonical = frame.locator(".BufferWindowInner");
  const input = page.locator("#command-input");
  const status = frame.locator(".GridWindow");
  const blocks = presentation.locator(".story-presentation-content > *");
  await expect(presentation).toContainText("通信モードに入りました");
  const snapshot = () => frame.locator("body").evaluate(() => {
    const bridge = (window as typeof window & { AMFVPresentationBridge: { extract: (root: Document, style: typeof getComputedStyle) => { activeInput: { kind: string; line: number } | null; lines: { id: string; text: string }[] } } }).AMFVPresentationBridge;
    const p = bridge.extract(document, getComputedStyle);
    return { id: p.activeInput?.kind === "line" ? p.lines[p.activeInput.line].id : null, lines: p.lines };
  });
  const turns: { command: string; previousInput: string; nextInput: string; status: string; lines: { id: string; text: string }[] }[] = [];
  const send = async (command: string, trigger?: () => Promise<void>) => {
    await expect.poll(async () => (await snapshot()).id).not.toBeNull();
    const previous = (await snapshot()).id!;
    const count = await blocks.count();
    if (trigger) await trigger();
    else { await input.fill(command); await page.getByRole("button", { name: /^(送信|SEND)/ }).click(); }
    await expect.poll(async () => { const id = (await snapshot()).id; return id !== null && id !== previous; }).toBe(true);
    if (command !== "ENTER SIMULATION MODE") await expect(input).toBeEnabled();
    const next = await snapshot();
    const start = next.lines.findIndex((line) => line.id === previous);
    expect(start).toBeGreaterThanOrEqual(0);
    const lines = next.lines.slice(start, next.lines.findIndex((line) => line.id === next.id));
    expect(lines[0].text.trim().toUpperCase()).toContain(command.toUpperCase());
    turns.push({ command, previousInput: previous, nextInput: next.id!, status: await status.innerText(), lines });
    return count;
  };
  const locale = async (name: "English" | "日本語") => {
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
    await settings.getByRole("button", { name, exact: true }).click();
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
  };
  for (const cmd of ["PEOF", "WAIT", "WAIT", "WAIT", "WAIT", "ENTER SIMULATION MODE"]) await send(cmd);
  const prompt = presentation.locator(".story-presentation-prompt").last();
  const challengePattern = /(WHITE|DARK GREEN|DARK BLUE|PINK|ORANGE|PURPLE|TAN|AQUA|LIGHT BLUE|LIGHT GREEN|LIGHT GRAY|YELLOW|BLACK|DARK GRAY|BROWN|RED) (\d+)$/;
  // The VM input can advance before React presents its new prompt. Wait on
  // that exact current challenge rather than reading a previous prompt.
  await expect(prompt).toContainText(challengePattern);
  const match = (await prompt.innerText()).match(challengePattern)!;
  expect(match).not.toBeNull();
  const answer = OUTER[(2 * COLORS.indexOf(match[1]) + INNER.indexOf(Number(match[2]))) % OUTER.length];
  await send(String(answer), controls === "classic" ? undefined : () => page.locator(".security-decoder").getByRole("button", { name: `コード ${answer} を送信` }).click());
  for (const cmd of ["LOOK", "RECORD", "WAIT", "RECORD OFF", "RECORD", "SW", "NW", "LOOK", "SE", "NE", "RECORD OFF"]) {
    const count = await send(cmd);
    if (cmd === "LOOK" && turns.length > 10) {
      await expect(status).toContainText(/Location:\s*Courthouse/i);
      await expect(blocks.nth(count + 1)).toHaveText("裁判所");
      await expect(status).toContainText("(recording)");
    }
  }
  const newspaperTurns = await acceptNewspaperFieldwork(page, frame, presentation, input, controls, testInfo, "on-site");
  await expect(status).not.toContainText("(recording)");
  for (const [short, full, place] of [["SW", "sw", "エルム通りとパーク通り"], ["W", "west", "エルム通りとユニバーシティ大通り"], ["W", "west", "エルム通りの高架下"], ["S", "south", "ロイズ・パゴダ"]]) {
    const command = controls === "classic" ? short : full.toUpperCase();
    await send(command, controls === "classic" ? undefined : short === "W" ? async () => {
      const compass = page.getByRole("region", { name: "移動できる方角" });
      await compass.getByRole("button", { name: new RegExp(`^W ${place}`) }).click();
    } : () => clickRouteStep(page, input, controls, command, "レストラン"));
    await expect(page.locator(".location-block strong")).toHaveText(place);
  }
  const mealSection = page.getByRole("region", { name: "ロイズ・パゴダでの食事", exact: true });
  if (controls === "classic") {
    await expect(page.locator(".scene-actions, .compact-map-button, .travel-compass")).toHaveCount(0);
  } else {
    await expect(mealSection).toHaveAttribute("lang", "ja");
    await expect(mealSection.locator(".scene-actions-heading small")).toBeVisible();
    await expect(mealSection).toContainText("食事を注文する");
    await expect(mealSection).not.toContainText("言及された");
    await expect(mealSection.locator(".scene-actions-heading small")).toHaveText(controls === "guided" ? "食事を選ぶと、注文のコマンドを下書きします。編集してから送信できます。" : "「食事を注文する」を押すと、コマンドを1回送信します。");
    await expect(mealSection.getByRole("button")).toHaveCount(1);
    await page.locator(".compact-map-button").click();
    const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
    await expect(drawer.getByRole("button", { name: "レストラン、調査目的地、現在地", exact: true })).toBeVisible();
    await expect(drawer.locator(".navigator-route")).toContainText("目的地に到着しました。");
    if (page.viewportSize()!.width < 500) await drawer.getByRole("tab", { name: /^要項/ }).click();
    const mealAssignment = drawer.locator(".fieldwork-checklist li").first();
    await expect(mealAssignment).not.toHaveClass(/complete/);
    await expect(mealAssignment.locator("small span").first()).toHaveText("レストラン");
    await expect(mealAssignment.locator("small span").first()).toHaveAttribute("lang", "ja");
    await attach("restaurant-drawer", await page.screenshot(), "image/png");
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
    await expect(page.locator(".compact-map-button")).toBeFocused();
  }
  await locale("English");
  const englishSection = page.getByRole("region", { name: "Meal at Roy's Pagoda", exact: true });
  if (controls !== "classic") {
    await expect(englishSection.getByRole("button", { name: controls === "guided" ? /Meal\s*Order/ : "Order meal", exact: true })).toBeEnabled();
    await expect(englishSection.locator(".scene-actions-heading small")).toBeVisible();
    await expect(englishSection.locator(".scene-actions-heading small")).toHaveText(controls === "guided" ? "Choose the meal to draft an order you can edit before sending." : "Choose Order meal to send the command once.");
  } else await expect(englishSection).toHaveCount(0);
  await locale("日本語");
  await send("RECORD");
  await expect(status).toContainText("(recording)");
  const warning = presentation.getByText("WARNING: Record buffer is now half-full.", { exact: true });
  await expect(warning).toHaveAttribute("lang", "en");
  const beforeMeal = await status.innerText();
  const countBeforeDraft = await blocks.count();
  const mealInput = (await snapshot()).id;
  if (controls === "guided") {
    await mealSection.getByRole("button", { name: /食事\s*注文する/, exact: true }).click();
    await expect(input).toHaveValue("BUY MEAL");
    await expect(input).toBeFocused();
    await expect(blocks).toHaveCount(countBeforeDraft);
    expect((await snapshot()).id).toBe(mealInput);
    await input.fill("BUY MEAL ");
    await expect(input).toHaveValue("BUY MEAL ");
  }
  if (controls !== "classic") await attach("restaurant-meal-ui-accessibility", await mealSection.ariaSnapshot(), "text/plain");
  const mealStart = await send("BUY MEAL", controls === "actions" ? () => mealSection.getByRole("button", { name: "食事を注文する", exact: true }).click() : controls === "guided" ? () => page.getByRole("button", { name: /^送信/ }).click() : undefined);
  const mealTurn = turns.at(-1)!;
  expect(mealTurn.lines.map((line) => line.text.trim())).toEqual([">BUY MEAL", MEAL_EN, ""]);
  await expect(blocks.nth(mealStart + 1)).toHaveText(MEAL_JA);
  await expect(blocks.nth(mealStart + 2)).toHaveClass("story-presentation-spacer");
  await expect(blocks).toHaveCount(mealStart + 3);
  await expect(status).toContainText("(recording)");
  const minutes = (text: string) => { const m = text.match(/Time:\s*(\d+):(\d+)(am|pm)/i); return m ? Number(m[1]) % 12 * 60 + Number(m[2]) + (m[3].toLowerCase() === "pm" ? 720 : 0) : null; };
  const beforeMinutes = minutes(beforeMeal), afterMinutes = minutes(mealTurn.status);
  const elapsedMinutes = beforeMinutes !== null && afterMinutes !== null ? (afterMinutes - beforeMinutes + 1440) % 1440 : null;
  if (page.viewportSize()!.width >= 500) expect(elapsedMinutes).toBe(22);
  else {
    // At 390px the original status prints mode/location only. Do not infer a
    // clock from the meal prose, the wide sessions, or historical source.
    expect(beforeMinutes).toBeNull();
    expect(afterMinutes).toBeNull();
    expect(beforeMeal).not.toMatch(/Time:|Date:/i);
    expect(mealTurn.status).not.toMatch(/Time:|Date:/i);
  }
  await attach("restaurant-meal-status", JSON.stringify({ beforeMeal, afterMeal: mealTurn.status, elapsedMinutes, limitation: elapsedMinutes === null ? "Canonical narrow status emits no clock/date; elapsed time unobserved in this session" : null }));
  if (controls !== "classic") await expect(page.locator(".compact-map-button small")).toHaveText("3/9 録画");
  const surface = presentation.locator(".story-presentation-scroll");
  await readingTrace(frame, "meal-scroll-start");
  const mealParagraph = blocks.nth(mealStart + 1);
  await surface.hover();
  await surface.evaluate((element) => { element.scrollTop = Math.max(0, element.scrollHeight - element.clientHeight * 2); });
  const startTop = await surface.evaluate((element) => element.scrollTop);
  await page.mouse.wheel(0, await surface.evaluate((element) => element.scrollHeight));
  try { await expect.poll(() => surface.evaluate((element) => element.scrollTop)).toBeGreaterThan(startTop); }
  catch (error) { console.log("READING_LIFECYCLE", JSON.stringify(await readingTrace(frame, "meal-scroll-failure"))); throw error; }
  const lastTextVisible = (paragraph: Locator = mealParagraph) => paragraph.evaluate((element) => {
    const range = document.createRange(); range.selectNodeContents(element);
    const end = [...range.getClientRects()].at(-1)!;
    const bounds = { top: 0, bottom: innerHeight, left: 0, right: innerWidth };
    for (let node: Element | null = element; node; node = node.parentElement) {
      const css = getComputedStyle(node), box = node.getBoundingClientRect();
      if (/hidden|clip|auto|scroll/.test(css.overflowY)) { bounds.top = Math.max(bounds.top, box.top + node.clientTop); bounds.bottom = Math.min(bounds.bottom, box.top + node.clientTop + node.clientHeight); }
      if (/hidden|clip|auto|scroll/.test(css.overflowX)) { bounds.left = Math.max(bounds.left, box.left); bounds.right = Math.min(bounds.right, box.right); }
    }
    return end.top >= bounds.top && end.bottom <= bounds.bottom && end.left >= bounds.left && end.right <= bounds.right;
  });
  await expect.poll(() => lastTextVisible()).toBe(true);
  await expect(input).toBeInViewport({ ratio: 1 });
  const historyCount = await blocks.count();
  const transcript = await canonical.innerText();
  await input.fill("LOOK");
  for (const name of ["English", "日本語", "English", "日本語"] as const) {
    await locale(name);
    await expect(input).toHaveValue("LOOK");
    expect((await snapshot()).id).toBe(mealTurn.nextInput);
    await expect(canonical).toHaveText(transcript, { useInnerText: true });
    const a11y = await frame.locator("body").ariaSnapshot();
    if (name === "English") {
      await expect(presentation).toBeHidden();
      await expect(canonical).not.toHaveAttribute("aria-hidden", "true");
      expect(a11y.replace(/\\"/g, '"').split(MEAL_EN)).toHaveLength(2);
      expect(a11y).not.toContain(MEAL_JA);
      const canonicalWindow = frame.locator(".BufferWindow");
      await canonicalWindow.hover();
      await page.mouse.wheel(0, await canonicalWindow.evaluate((el) => el.scrollHeight));
      await expect.poll(() => lastTextVisible(canonical.locator(".BufferLine", { hasText: MEAL_EN }))).toBe(true);
    } else {
      await expect(presentation).toHaveAttribute("lang", "ja");
      await expect(canonical).toHaveAttribute("aria-hidden", "true");
      await expect(canonical).toHaveAttribute("inert", "");
      await expect(blocks).toHaveCount(historyCount);
      expect(a11y.split(MEAL_JA)).toHaveLength(2);
      expect(a11y).not.toContain(MEAL_EN);
      await surface.hover();
      await page.mouse.wheel(0, await surface.evaluate((el) => el.scrollHeight));
      await expect.poll(() => lastTextVisible()).toBe(true);
    }
    await expect(input).toBeInViewport({ ratio: 1 });
    await attach(`restaurant-${name}-${Date.now()}-accessibility`, a11y, "text/plain");
  }
  await input.click(); await expect(input).toBeFocused();
  await attach("restaurant-meal", await page.screenshot(), "image/png");
  await attach("restaurant-scroll", JSON.stringify({ startTop, ...(await surface.evaluate((el) => ({ endTop: el.scrollTop, clientHeight: el.clientHeight, scrollHeight: el.scrollHeight }))), lastTextVisible: await lastTextVisible(), inputId: mealTurn.nextInput }));
  const stop = await send("RECORD OFF");
  await expect(blocks.nth(stop + 1)).toHaveText("記録機能を停止しました。");
  await expect(status).not.toContainText("(recording)");
  for (const [short, full, place] of [["N", "NORTH", "エルム通りの高架下"], ["E", "EAST", "エルム通りとユニバーシティ大通り"], ["E", "EAST", "エルム通りとパーク通り"], ["NE", "NE", "ケネディ公園"]]) {
    await send(controls === "classic" ? short : full, controls === "classic" ? undefined : async () => {
      if (short === "N") {
        await page.getByRole("button", { name: "ガイドの表示を切り替える" }).click();
        await page.getByRole("tab", { name: "探索", exact: true }).click();
        await page.locator(".exit-list").getByRole("button", { name: new RegExp(`^N ${place}`) }).click();
        await page.locator(".close-context").click();
      } else await clickRouteStep(page, input, controls, full, "ケネディ公園");
    });
    await expect(page.locator(".location-block strong")).toHaveText(place);
    await expect(status).not.toContainText("(recording)");
  }
  await expect(status).toContainText("Location: Kennedy Park");
  expect(await canonical.innerText()).not.toMatch(/Record buffer full|Auto-deactivation|WARNING:\s*Deactivating record feature/i);
  await expect(mealSection).toHaveCount(0);
  await input.fill("LOOK"); await input.click(); await expect(input).toBeFocused();
  await expect(input).toBeInViewport({ ratio: 1 });
  await expect(page.getByRole("button", { name: /^送信/ })).toBeEnabled();
  await attach("restaurant-return", await page.screenshot(), "image/png");
  await attach("restaurant-turns", JSON.stringify({ controls, viewport: page.viewportSize(), turns, newspaperTurns, beforeMeal, mealTurn, currentInput: (await snapshot()).id }));
}
