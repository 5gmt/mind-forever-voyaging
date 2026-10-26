import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { acceptRestaurantMilestone } from "./restaurant-acceptance";
import { clickRouteStep } from "./navigation-acceptance";
import { observeReadingLifecycle, readingTrace } from "./reading-observations";
import type { BridgePresentation } from "../../app/story-presentation";

const PRESENCE = "A government official is sitting on a bench in the center of the lobby, eating a snack.";
const DEPARTURE = "You have a brief chat with the government official, who cheerily comments on how well things in the city are running, and how rewarding his job has been lately. Suddenly he glances at his watch, mumbles a polite parting message, and hurries away.";

// Wrapper-boundary probes only. The canonical VM stays at its real startup
// location; these reports are never presented as runtime route evidence.
export async function probeCityHallBoundary(page: Page, testInfo: TestInfo, scenario: "history" | "input-scope") {
  await page.goto("/");
  const intro = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
  await intro.getByRole("button", { name: /^Begin/ }).click();
  await page.getByRole("button", { name: /Begin the original story/i }).click();
  await expect(page.locator("#command-input")).toBeEnabled();
  const frame = page.frameLocator('iframe[src="/player.html"]');
  await frame.locator("body").evaluate(() => {
    const scope = window as typeof window & { cityHallPost?: typeof window.parent.postMessage };
    scope.cityHallPost = window.parent.postMessage.bind(window.parent);
    window.parent.postMessage = ((message: unknown, origin: string) => {
      if ((message as { type?: string }).type === "transcript") return;
      scope.cityHallPost?.(message, origin);
    }) as typeof window.parent.postMessage;
  });
  const post = (payload: Record<string, unknown>) => frame.locator("body").evaluate((_body, message) => {
    (window as typeof window & { cityHallPost?: typeof window.parent.postMessage }).cityHallPost?.({ channel: "amfv:bridge", ...message }, window.location.origin);
  }, payload);
  const arrival = `>W\nCity Hall\n${PRESENCE}\n>`;
  const report = async (text: string, recentText = text, location = "City Hall", year = 2041, kind = "line") => {
    const command = [...recentText.matchAll(/^>[^\S\r\n]*([^\r\n]+)$/gm)].at(-1)?.[1];
    if (command) await post({ type: "command", command });
    await post({ type: "transcript", text, recentText,
      statusText: `Mode: Simulation Mode Time: 1:00pm Location: ${location} Date: 3/6/${year}`, inputKind: kind, acceptsInput: true });
  };
  const fresh = async () => {
    await post({ type: "transcript", text: "Tomorrow never yet.\nHit any key to continue", recentText: "Tomorrow never yet.\nHit any key to continue", statusText: "", inputKind: "char", acceptsInput: true });
    await report(`This simulation is based 10 years hence.\n${arrival}`);
  };
  const talk = () => page.getByRole("button", { name: /^(?:(?:government official|政府職員)\s*)?(?:Talk|話す)$/ });
  const settings = async (locale: "English" | "日本語", mode: "guided" | "actions" = "actions") => {
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
    const panel = page.locator(".access-panel");
    await panel.getByRole("button", { name: locale, exact: true }).click();
    await panel.locator(".interaction-segments button").nth(mode === "guided" ? 1 : 2).click();
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
  };
  const companion = async (open: boolean) => {
    if (open) {
      await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
      await page.locator(".companion-tabs").getByRole("tab").nth(1).click();
    } else await page.locator(".close-context").click();
  };
  const observed: string[] = [];
  await settings("English");
  await report(`This simulation is based 10 years hence.\n${arrival}`);
  await expect(talk()).toHaveCount(1);
  if (scenario === "history") {
    const chat = `>GOVERNMENT OFFICIAL, HELLO\n${DEPARTURE}\n>`;
    await report(`${arrival}\n${chat}`, chat);
    await expect(talk()).toHaveCount(0);
    const tail = `${">WAIT\nTime passes.\n".repeat(100)}>`;
    await report(`${arrival}\n${chat}\n${tail}`, tail.slice(-500));
    await expect(talk()).toHaveCount(0);
    observed.push("departure remains effective after the recent 18-line window loses it");
    for (const locale of ["日本語", "English", "日本語"] as const) {
      await settings(locale); await companion(true); await expect(talk()).toHaveCount(0); await companion(false);
    }
    await report(`${arrival}\n${chat}\n>LOOK\nCity Hall\nThe only exit is east.\n>`, ">LOOK\nCity Hall\nThe only exit is east.\n>");
    await expect(talk()).toHaveCount(0);
    // A cached establishing passage must not reverse the observed departure.
    await report(arrival);
    await expect(talk()).toHaveCount(0);
    observed.push("locale/drawer/LOOK and an old arrival do not revive Talk");
  } else {
    for (const mode of ["guided", "actions"] as const) for (const locale of ["English", "日本語"] as const) {
      await settings(locale, mode);
      await post({ type: "busy" });
      await expect(talk()).toBeDisabled();
      await companion(true); await expect(talk()).toHaveCount(2);
      for (const button of await talk().all()) await expect(button).toBeDisabled();
      await companion(false);
    }
    await report(arrival, arrival, "City Hall", 2041, "char");
    await companion(true); await expect(talk()).toHaveCount(0); await companion(false);
    observed.push("main and companion exclude char input; busy disables both");
    await fresh(); await expect(talk()).toHaveCount(1);
    await report(">LOOK\nUnknown Room\n>", ">LOOK\nUnknown Room\n>", "Unknown Room");
    await expect(talk()).toHaveCount(0);
    await report(">W\nCity Hall\n>"); await expect(talk()).toHaveCount(0);
    observed.push("unknown room invalidates presence; old room cache alone is insufficient");
    await fresh();
    await report(arrival, arrival, "City Hall", 2051); await expect(talk()).toHaveCount(0);
    await expect(page.locator(".location-block strong")).toHaveText("City Hall");
    await fresh();
    await post({ type: "command", command: "RESTORE" });
    await report(arrival); await expect(talk()).toHaveCount(0);
    observed.push("later year and RESTORE unknown state fail closed");
    await fresh();
    await post({ type: "transcript", text: ">ABORT\nCommunications Mode\n>", recentText: ">ABORT\nCommunications Mode\n>", statusText: "Mode: Communications Mode", inputKind: "line", acceptsInput: true });
    await report(`This simulation is based 10 years hence.\n${arrival}`); await expect(talk()).toHaveCount(0);
    await fresh();
    await report(`* PART II *\n${arrival}`); await expect(talk()).toHaveCount(0);
    observed.push("simulation re-entry and Part II do not inherit the first-session actor");
    await fresh();
    await report(">LOOK\nCity Hall\nA church official is waiting here.\n>");
    await expect(page.locator(".scene-object").filter({ hasText: /government official|政府職員/ })).toHaveCount(0);
    await post({ type: "transcript", text: "Tomorrow never yet.\nHit any key to continue", recentText: "Tomorrow never yet.\nHit any key to continue", statusText: "", inputKind: "char", acceptsInput: true });
    await report("This simulation is based 10 years hence.\n>W\nCity Hall\n>"); await expect(talk()).toHaveCount(0);
    observed.push("a different official does not expose the government-official action; a fresh session has no inherited presence");
    await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
    await page.getByRole("tab", { name: /About|この作品について/, exact: true }).click();
    await page.getByRole("button", { name: "Open spoiler/debug tools" }).click();
    await page.getByRole("button", { name: "Enable spoilers & load QA build" }).click();
    const qa = page.frameLocator('iframe[src*="qa=1"]');
    await expect(qa.locator(".BufferWindowInner")).toContainText("Tomorrow never yet", { timeout: 60_000 });
    await qa.locator("body").evaluate((_body, raw) => window.parent.postMessage({ channel: "amfv:bridge", type: "transcript", text: raw, recentText: raw,
      statusText: "Mode: Simulation Mode Time: 1:00pm Location: City Hall Date: 3/6/2041", inputKind: "line", acceptsInput: true }, window.location.origin), `This simulation is based 10 years hence.\n${arrival}`);
    await expect(talk()).toHaveCount(0);
    observed.push("QA never offers the canonical-only official action");
  }
  await testInfo.attach(`city-hall-controlled-${scenario}`, { body: JSON.stringify({ provenance: "controlled wrapper bridge reports, not VM mutations, runtime route or actual saved-game RESTORE", observed }), contentType: "application/json" });
}

const PLAZA_EN = "The name of this plaza tells it all. The well-maintained portico of City Hall stretches along the west side of the plaza, and Dunbar's lies on the southeast corner. Park Street leads north and south. Main Street and Centre Street both begin here, leading eastward and northeastward, respectively. The street is bustling with lunchtime crowds.";
const PLAZA_JA = "この広場は、その名のとおり街の中心だ。市役所の手入れが行き届いた柱廊が広場の西側に延び、南東の角にはダンバーズがある。パーク通りは北と南へ延びている。メイン通りとセンター通りはいずれもここを起点とし、それぞれ東と北東へ延びている。通りは昼食時の人々でにぎわっている。";
const BUILDING_JA = "市政の拠点となっているのは、20世紀末に建てられた古いコンクリート板造りの建物だ。出口は東に一つだけある。";
const PRESENCE_JA = "政府職員が一人、ロビー中央のベンチに腰掛け、軽食を食べている。";
const CHAT_JA = "政府職員と短い会話を交わす。職員は、市の物事が順調に進んでいることや、最近は自分の仕事に大いにやりがいを感じていることを、上機嫌で話す。突然、時計にちらりと目をやり、丁寧な別れの言葉をぼそぼそと口にすると、足早に去っていく。";

type RawInput = { inputId: string; previousInputId: string | null; inputKind: string; status: string; presentation: BridgePresentation };
type RuntimeTrace = { inputs: RawInput[]; requests: string[] };

const canonicalSnapshot = (page: Page) => page.frameLocator('iframe[src="/player.html"]').locator("body").evaluate(() => {
  const p = (window as typeof window & { AMFVPresentationBridge: { extract: (root: Document, style: typeof getComputedStyle) => BridgePresentation } }).AMFVPresentationBridge.extract(document, getComputedStyle);
  return { presentation: p, status: [...document.querySelectorAll<HTMLElement>("#windowport .GridWindow")].map((el) => el.innerText).join("\n") };
});

const paragraphEndVisible = (paragraph: Locator) => paragraph.evaluate((element) => {
  const range = document.createRange(); range.selectNodeContents(element);
  const last = [...range.getClientRects()].at(-1);
  if (!last) return false;
  const bounds = { top: 0, bottom: innerHeight, left: 0, right: innerWidth };
  for (let node: Element | null = element; node; node = node.parentElement) {
    const css = getComputedStyle(node), box = node.getBoundingClientRect();
    if (/hidden|clip|auto|scroll/.test(css.overflowY)) { bounds.top = Math.max(bounds.top, box.top + node.clientTop); bounds.bottom = Math.min(bounds.bottom, box.top + node.clientTop + node.clientHeight); }
    if (/hidden|clip|auto|scroll/.test(css.overflowX)) { bounds.left = Math.max(bounds.left, box.left); bounds.right = Math.min(bounds.right, box.right); }
  }
  return last.top >= bounds.top && last.bottom <= bounds.bottom && last.left >= bounds.left && last.right <= bounds.right;
});

export async function acceptCityHallMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordConversation = true) {
  const startedAt = new Date().toISOString();
  // Observe the existing protocol. No interpreter state is read or written.
  await page.addInitScript(() => {
    const state = window as typeof window & { cityHallRequests: string[]; cityHallInputs: RawInput[] };
    state.cityHallRequests = []; state.cityHallInputs = [];
    window.addEventListener("message", (event) => {
      if (event.origin !== location.origin || event.data?.channel !== "amfv:bridge") return;
      if (window.parent !== window) {
        if (event.source === window.parent && event.data.type === "command") state.cityHallRequests.push(event.data.command);
        return;
      }
      const frame = document.querySelector<HTMLIFrameElement>('iframe[src="/player.html"]');
      if (event.source !== frame?.contentWindow || event.data.type !== "transcript" || !event.data.acceptsInput) return;
      const p = event.data.presentation as BridgePresentation | null;
      const active = p?.activeInput;
      if (!p || !active || active.line === null) return;
      const inputId = p.lines[active.line]?.id;
      if (!inputId) return;
      const prior = state.cityHallInputs.at(-1);
      const repeated = prior?.inputId === inputId && prior?.inputKind === active.kind;
      const previousInputId = repeated ? prior.previousInputId : prior?.inputId ?? null;
      const anchor = previousInputId ? p.lines.findIndex((line) => line.id === previousInputId) : 0;
      const start = anchor >= 0 ? anchor : 0;
      const observation: RawInput = { inputId, previousInputId, inputKind: active.kind, status: event.data.statusText,
        presentation: { ...p, lines: p.lines.slice(start), terminalLine: p.terminalLine - start, activeInput: { ...active, line: active.line - start } } };
      if (repeated) state.cityHallInputs[state.cityHallInputs.length - 1] = observation;
      else state.cityHallInputs.push(observation);
    });
  });
  const prior = await acceptRestaurantMilestone(page, controls, testInfo);
  const { frame, presentation, canonical, input, status, blocks, send, locale, attach } = prior;
  await observeReadingLifecycle(frame);
  await input.fill("");
  const requests = () => frame.locator("body").evaluate(() => (window as typeof window & { cityHallRequests: string[] }).cityHallRequests);
  const rawTrace = async (): Promise<RuntimeTrace> => ({
    inputs: await page.evaluate(() => (window as typeof window & { cityHallInputs: RawInput[] }).cityHallInputs), requests: await requests(),
  });
  const turns: { command: string; submittedInputId: string; nextInputId: string; status: string; presentation: BridgePresentation }[] = [];
  const act = async (command: string, trigger?: () => Promise<void>) => {
    const before = await canonicalSnapshot(page), previous = before.presentation.lines[before.presentation.activeInput!.line!].id!;
    const requestCount = (await requests()).length;
    const blockStart = await send(command, trigger);
    const after = await canonicalSnapshot(page), p = after.presentation;
    const start = p.lines.findIndex((line) => line.id === previous);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(p.lines[start].text.toUpperCase()).toBe(`>${command.toUpperCase()}`);
    const nextInputId = p.lines[p.activeInput!.line!].id!;
    expect(nextInputId).not.toBe(previous);
    await expect.poll(async () => (await requests()).length).toBe(requestCount + 1);
    turns.push({ command, submittedInputId: previous, nextInputId, status: after.status,
      presentation: { ...p, lines: p.lines.slice(start), terminalLine: p.terminalLine - start, activeInput: { ...p.activeInput!, line: p.activeInput!.line! - start } } });
    return blockStart;
  };
  const route = (command: string, destination: string) => controls === "classic" ? undefined : () => clickRouteStep(page, input, controls, command, destination);
  const optionalFallback: string[] = [];
  for (const [short, full, place] of [["NE", "NE", "メイン通りとケネディ通り"], ["W", "WEST", "ロックヴィル中央広場"], ["W", "WEST", "市役所"]]) {
    const start = await act(controls === "classic" ? short : full, route(full, "市役所"));
    await expect(page.locator(".location-block strong")).toHaveText(place);
    await expect(blocks.nth(start + 1)).toHaveText(place);
    await expect(status).not.toContainText("(recording)");
    if (place === "ロックヴィル中央広場") {
      const raw = turns.at(-1)!.presentation.lines[2].text;
      if (raw === PLAZA_EN) await expect(blocks.nth(start + 2)).toHaveText(PLAZA_JA);
      else {
        optionalFallback.push(raw);
        await expect(blocks.nth(start + 2)).toHaveText(raw);
        await expect(blocks.nth(start + 2)).toHaveAttribute("lang", "en");
      }
    }
    if (place === "市役所") {
      await expect(blocks.nth(start + 2)).toHaveText(BUILDING_JA);
      await expect(blocks.nth(start + 3)).toHaveText(PRESENCE_JA);
    }
  }
  const actorButtons = () => page.getByRole("button", { name: controls === "guided" ? /^(政府職員\s*話す|government official\s*Talk)$/ : /^(話す|Talk)$/ });
  const inputIdBeforeLocale = turns.at(-1)!.nextInputId;
  for (const name of ["English", "日本語"] as const) {
    await locale(name);
    if (controls === "classic") await expect(page.locator(".scene-actions, .compact-map-button, .movement-compass")).toHaveCount(0);
    else {
      await expect(actorButtons()).toHaveCount(1);
      await expect(actorButtons()).toBeEnabled();
      await expect(page.locator(".scene-official-help").first()).toHaveText(name === "English"
        ? controls === "guided" ? "Draft a command to talk to the government official. You can edit it before sending." : "Choose Talk to send the command once."
        : controls === "guided" ? "政府職員と話すコマンドを下書きします。編集してから送信できます。" : "「話す」を押すと、コマンドを1回送信します。");
      await expect(page.locator(".scene-official-help").first()).toBeVisible();
    }
    const p = (await canonicalSnapshot(page)).presentation;
    expect(p.lines[p.activeInput!.line!].id).toBe(inputIdBeforeLocale);
  }
  if (controls !== "classic") {
    await page.locator(".compact-map-button").click();
    const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
    await drawer.locator(".rockvil-navigator").getByRole("button", { name: "市役所、調査目的地、現在地", exact: true }).click();
    await expect(drawer.locator(".navigator-route")).toContainText("目的地に到着しました。");
    await expect(drawer.locator(".fieldwork-checklist li").nth(1).locator("strong")).toHaveText("政府職員と話すこと");
    const place = drawer.locator(".fieldwork-checklist li").nth(1).locator("small span").first();
    await expect(place).toHaveText("市役所"); await expect(place).toHaveAttribute("lang", "ja");
    await attach("city-hall-map-entry", await page.screenshot(), "image/png");
    await attach("city-hall-map-entry-accessibility", await drawer.ariaSnapshot(), "text/plain");
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
    await expect(page.locator(".compact-map-button")).toBeFocused();
  }
  const recordTrigger = (stop = false) => controls === "classic" ? undefined : () => page.locator(".quick-actions").getByRole("button", { name: stop ? "録画停止" : "録画開始", exact: true }).click();
  if (recordConversation) await act("RECORD", recordTrigger());
  const beforeTalk = await status.innerText();
  expect(/\(recording\)/i.test(beforeTalk)).toBe(recordConversation);
  const countBeforeDraft = await blocks.count(), requestCount = (await requests()).length;
  if (controls === "guided") {
    await actorButtons().click();
    await expect(input).toHaveValue("government official, hello"); await expect(input).toBeFocused();
    await expect(blocks).toHaveCount(countBeforeDraft);
    expect((await requests()).length).toBe(requestCount);
    await input.fill("government official, hello "); await expect(input).toHaveValue("government official, hello ");
  }
  if (controls !== "classic") {
    await actorButtons().scrollIntoViewIfNeeded(); await expect(actorButtons()).toBeInViewport({ ratio: 1 });
    await attach("city-hall-talk-controls", await page.screenshot(), "image/png");
  }
  await attach("city-hall-talk-ui", await page.locator(".story-controls").count() ? await page.locator(".story-controls").ariaSnapshot() : await page.locator("main").ariaSnapshot(), "text/plain");
  const chatStart = await act("GOVERNMENT OFFICIAL, HELLO", controls === "classic" ? undefined : controls === "guided"
    ? () => page.getByRole("button", { name: /^送信/ }).click()
    : () => actorButtons().click());
  const chatTurn = turns.at(-1)!;
  expect(chatTurn.presentation.lines.slice(1,-1).map((line) => line.text)).toEqual([DEPARTURE, " "]);
  await expect(blocks.nth(chatStart + 1)).toHaveText(CHAT_JA);
  await expect(blocks.nth(chatStart + 2)).toHaveClass("story-presentation-spacer");
  await expect(input).toBeFocused();
  await expect(actorButtons()).toHaveCount(0);
  expect(/\(recording\)/i.test(chatTurn.status)).toBe(recordConversation);
  const clock = (raw: string) => { const m = raw.match(/Time:\s*(\d+):(\d+)(am|pm)/i); return m ? Number(m[1]) % 12 * 60 + Number(m[2]) + (m[3].toLowerCase() === "pm" ? 720 : 0) : null; };
  const beforeMinutes = clock(beforeTalk), afterMinutes = clock(chatTurn.status);
  const elapsedMinutes = beforeMinutes !== null && afterMinutes !== null ? (afterMinutes - beforeMinutes + 1440) % 1440 : null;
  if (page.viewportSize()!.width >= 500) expect(elapsedMinutes).toBe(8);
  else { expect(elapsedMinutes).toBeNull(); expect(beforeTalk).not.toMatch(/Time:|Date:/i); expect(chatTurn.status).not.toMatch(/Time:|Date:/i); }
  if (controls !== "classic") {
    await expect(page.locator(".compact-map-button small")).toHaveText(recordConversation ? "4/9 録画" : "3/9 録画");
    await page.locator(".compact-map-button").click();
    const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
    if (recordConversation) await expect(drawer.locator(".fieldwork-checklist li").nth(1)).toHaveClass(/complete/);
    else await expect(drawer.locator(".fieldwork-checklist li").nth(1)).not.toHaveClass(/complete/);
    await attach("city-hall-assignment-inference", await drawer.ariaSnapshot(), "text/plain");
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
  }
  const surface = presentation.locator(".story-presentation-scroll"), paragraph = blocks.nth(chatStart + 1);
  await surface.hover();
  await surface.evaluate((el) => { el.scrollTop = Math.max(0, el.scrollHeight - el.clientHeight * 2); });
  const scrollStart = await surface.evaluate((el) => el.scrollTop);
  await page.mouse.wheel(0, await surface.evaluate((el) => el.scrollHeight));
  await expect.poll(() => surface.evaluate((el) => el.scrollTop)).toBeGreaterThan(scrollStart);
  await expect.poll(() => paragraphEndVisible(paragraph)).toBe(true);
  await expect(input).toBeInViewport({ ratio: 1 });
  await attach("city-hall-conversation-ja", await page.screenshot(), "image/png");
  const rawBeforeRecovery = await canonical.innerText(), historyCount = await blocks.count();
  await input.fill("LOOK");
  const recovery = [];
  for (const name of ["English", "日本語", "English", "日本語"] as const) {
    await locale(name);
    await expect(input).toHaveValue("LOOK");
    const p = (await canonicalSnapshot(page)).presentation;
    expect(p.lines[p.activeInput!.line!].id).toBe(chatTurn.nextInputId);
    await expect(canonical).toHaveText(rawBeforeRecovery, { useInnerText: true });
    const aria = await frame.locator("body").ariaSnapshot();
    if (name === "English") {
      await expect(presentation).toBeHidden(); await expect(canonical).not.toHaveAttribute("aria-hidden", "true");
      expect(aria.split(DEPARTURE)).toHaveLength(2); expect(aria).not.toContain(CHAT_JA);
      const original = frame.locator(".BufferWindow"); await original.hover(); await page.mouse.wheel(0, await original.evaluate((el) => el.scrollHeight));
      await expect.poll(() => paragraphEndVisible(canonical.locator(".BufferLine", { hasText: DEPARTURE }))).toBe(true);
    } else {
      await expect(presentation).toHaveAttribute("lang", "ja"); await expect(canonical).toHaveAttribute("aria-hidden", "true"); await expect(canonical).toHaveAttribute("inert", "");
      expect(aria.split(CHAT_JA)).toHaveLength(2); expect(aria).not.toContain(DEPARTURE); await expect(blocks).toHaveCount(historyCount);
      await surface.hover(); await page.mouse.wheel(0, await surface.evaluate((el) => el.scrollHeight)); await expect.poll(() => paragraphEndVisible(paragraph)).toBe(true);
    }
    await expect(actorButtons()).toHaveCount(0); await expect(input).toBeInViewport({ ratio: 1 });
    recovery.push({ locale: name, inputId: chatTurn.nextInputId, singleOwner: true, paragraphEndVisible: true });
    await attach(`city-hall-recovery-${recovery.length}-accessibility`, aria, "text/plain");
  }
  await attach("city-hall-reading", JSON.stringify({ scrollStart, scrollEnd: await surface.evaluate((el) => el.scrollTop), lastTextVisible: await paragraphEndVisible(paragraph), recovery, lifecycle: await readingTrace(frame, "city-hall-recovery") }));
  if (recordConversation) {
    const start = await act("RECORD OFF", recordTrigger(true)); await expect(blocks.nth(start + 1)).toHaveText("記録機能を停止しました。");
  }
  const look = await act("LOOK", controls === "classic" ? undefined : () => page.locator(".quick-actions").getByRole("button", { name: "見る", exact: true }).click());
  await expect(blocks.nth(look + 1)).toHaveText("市役所"); await expect(blocks.nth(look + 2)).toHaveText(BUILDING_JA);
  expect(turns.at(-1)!.presentation.lines.map((line) => line.text).join("\n")).not.toContain(PRESENCE);
  await expect(actorButtons()).toHaveCount(0);
  for (const name of ["English", "日本語"] as const) {
    await locale(name);
    if (controls !== "classic") {
      await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
      await page.locator(".companion-tabs").getByRole("tab").nth(1).click(); await expect(actorButtons()).toHaveCount(0);
      await page.locator(".close-context").click();
    }
  }
  await attach("city-hall-after-look", await page.screenshot(), "image/png");
  for (const [short, full, place] of [["E", "EAST", "ロックヴィル中央広場"], ["E", "EAST", "メイン通りとケネディ通り"], ["SW", "SW", "ケネディ公園"]]) {
    const start = await act(controls === "classic" ? short : full, route(full, "ケネディ公園"));
    await expect(blocks.nth(start + 1)).toHaveText(place); await expect(page.locator(".location-block strong")).toHaveText(place); await expect(status).not.toContainText("(recording)");
  }
  await expect(status).toContainText("Location: Kennedy Park"); await expect(actorButtons()).toHaveCount(0);
  await input.fill("LOOK"); await input.click(); await expect(input).toBeFocused(); await expect(input).toBeInViewport({ ratio: 1 }); await expect(page.getByRole("button", { name: /^送信/ })).toBeEnabled();
  const trace = await rawTrace();
  expect(trace.requests[0]).toBe(" ");
  const accepted = JSON.parse(await readFile(new URL("../fixtures/parchment-city-hall-runtime-observed.json", import.meta.url), "utf8"));
  const aliases: Record<string, string> = { NORTH: "N", SOUTH: "S", EAST: "E", WEST: "W" };
  const normalize = (command: string) => aliases[command.trim().toUpperCase()] ?? command.trim().toUpperCase();
  expect(trace.requests.slice(1,41).map((command, index) => index === 6 ? "<decoder>" : normalize(command))).toEqual(accepted.sessions[0].submittedCommands.slice(0,40).map((command: string, index: number) => index === 6 ? "<decoder>" : normalize(command)));
  expect(trace.requests).toHaveLength(recordConversation ? 51 : 49);
  expect(trace.inputs[0].inputKind).toBe("char");
  expect(trace.inputs[1].inputKind).toBe("line");
  const delivered = trace.inputs.slice(2);
  expect(delivered).toHaveLength(trace.requests.length - 1);
  for (const [index, output] of delivered.entries()) {
    expect(output.previousInputId).toBe(trace.inputs[index + 1].inputId);
    expect(output.presentation.lines[0].id).toBe(output.previousInputId);
    expect(output.inputId).not.toBe(output.previousInputId);
    if (index === 6) expect(output.presentation.lines[0].runs.some((run) => run.classes.includes("Style_input") && run.text === trace.requests[index + 1])).toBe(true);
    else expect(output.presentation.lines[0].text.toUpperCase()).toBe(`>${trace.requests[index + 1].toUpperCase()}`);
  }
  expect(trace.inputs.at(-1)!.inputId).toBe(turns.at(-1)!.nextInputId);
  expect(turns.map(({ command }) => normalize(command))).toEqual(recordConversation ? ["NE", "W", "W", "RECORD", "GOVERNMENT OFFICIAL, HELLO", "RECORD OFF", "LOOK", "E", "E", "SW"] : ["NE", "W", "W", "GOVERNMENT OFFICIAL, HELLO", "LOOK", "E", "E", "SW"]);
  for (let i = 1; i < turns.length; i++) expect(turns[i].submittedInputId).toBe(turns[i-1].nextInputId);
  for (const raw of trace.inputs) expect(JSON.stringify(raw.presentation)).not.toMatch(/Record buffer full|Auto-deactivation|WARNING: Deactivating record feature/i);
  await attach("city-hall-runtime-observations", JSON.stringify({ provenance: "fresh canonical Release 79; live existing bridge observations and parent-to-player requests, no VM state edits", startedAt, finishedAt: new Date().toISOString(), controls, viewport: page.viewportSize(), recordConversation, trace, cityHallTurns: turns, beforeTalk, afterTalk: chatTurn.status, elapsedMinutes, timeLimitation: elapsedMinutes === null ? "narrow canonical status emits no clock/date; no inferred time" : null, optionalFallback, finalInputId: turns.at(-1)!.nextInputId, checklist: controls === "classic" ? "not displayed in Classic" : recordConversation ? "4/9 auxiliary inference, not original assignment evaluation" : "3/9; government assignment not inferred" }));
  await attach("city-hall-return", await page.screenshot(), "image/png");
}
