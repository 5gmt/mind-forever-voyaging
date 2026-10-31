import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { acceptPowerStationMilestone } from "./power-station-acceptance";
import { clickRouteStep } from "./navigation-acceptance";
import { attachEvidence } from "./evidence-attachments";
import { readingTrace } from "./reading-observations";
import type { BridgePresentation } from "../../app/story-presentation";

const OUT = ["NE", "E", "E", "N", "W"];
const BACK = ["E", "S", "W", "W", "SW"];
const PLACES = ["Main & Kennedy", "Main & River", "Main & Church", "Church Entrance", "St. Michael's"];
const NAMES = ["メイン通りとケネディ通り", "メイン通りとリバー通り", "メイン通りとチャーチ通り", "教会入口", "聖ミカエル教会"];
const ALIASES: Record<string, string> = { E: "EAST", S: "SOUTH", N: "NORTH", W: "WEST" };
const SHORT: Record<string, string> = { EAST: "E", SOUTH: "S", NORTH: "N", WEST: "W" };
const normalize = (command: string) => SHORT[command.trim().toUpperCase()] ?? command.trim().toUpperCase();
const rawLocation = (status: string) => status.match(/Location:\s*([\s\S]*?)(?:Date:|$)/i)?.[1].trim();
const PRESENCE = "You suddenly notice a church elder, pacing around at the other end of the building.";
const DEPARTURE = "You have a brief chat with the church elder, who smiles and comments on how happy he is about the recent increase in church attendance, which he attributes to an improving national moral climate. Suddenly he glances at his watch, mumbles a polite parting message, and hurries away.";
const TIME_DEPARTURE = "The church official wanders off.";
const talkPattern = /^(?:(?:church elder|教会の長老)\s*)?(?:Talk|話す)$/;
type ChurchTurn = { command: string; submittedInputId: string; nextInputId: string; status: string; presentation: BridgePresentation };

async function approvedCopy() {
  const packet = await readFile(new URL("../../docs/church-copy-packet.md", import.meta.url), "utf8");
  return new Map(packet.split("\n").filter((line) => /^\| [HDPRT]\d;/.test(line)).map((line) => {
    const cells = line.split("|"); return [cells[2].trim().slice(1, -1), cells[3].trim().slice(1, -1)];
  }));
}

const lastTextVisible = (paragraph: Locator) => paragraph.evaluate((element) => {
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

export async function acceptChurchMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordConversation = true) {
  const startedAt = new Date().toISOString();
  // Preserve every prior assertion, recording window, attachment and 67 sends.
  const prior = await acceptPowerStationMilestone(page, controls, testInfo);
  const { frame, presentation, canonical, input, status, blocks, send, locale, snapshot, rawTrace } = prior;
  await input.fill(""); // Power Station deliberately leaves an unsent LOOK draft.
  const attach = (name: string, body: string | Buffer, contentType = "application/json") => attachEvidence(testInfo, name, body, contentType);
  const copy = await approvedCopy(), turns: ChurchTurn[] = [];
  const requestCount = () => frame.locator("body").evaluate(() => (window as typeof window & { cityHallRequests: string[] }).cityHallRequests.length);
  const inputId = async () => { const p = (await snapshot()).presentation; return p.lines[p.activeInput!.line!].id!; };
  const actor = (container = page.locator(".command-deck")) => container.getByRole("button", { name: talkPattern });
  const companion = async (open: boolean) => {
    if (open) {
      await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
      await page.locator(".companion-tabs").getByRole("tab").nth(1).click();
    } else await page.locator(".close-context").click();
  };
  const act = async (command: string, trigger?: () => Promise<void>, focus: "input" | "map" = "input") => {
    const previous = await inputId(), count = await requestCount();
    const startBlock = await send(command, trigger);
    await expect.poll(requestCount).toBe(count + 1);
    const actual = await frame.locator("body").evaluate(() => (window as typeof window & { cityHallRequests: string[] }).cityHallRequests.at(-1)!);
    expect(actual.trim().toUpperCase()).toBe(command.toUpperCase());
    const p = (await snapshot()).presentation, start = p.lines.findIndex((line) => line.id === previous);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(p.lines[start].text.toUpperCase()).toBe(`>${actual.toUpperCase()}`);
    expect(p.activeInput!.kind).toBe("line");
    const nextInputId = p.lines[p.activeInput!.line!].id!;
    expect(nextInputId).not.toBe(previous);
    const rawStatus = await frame.locator("body").evaluate(() => [...document.querySelectorAll("#windowport .GridWindow")].map((node) => node.textContent ?? "").join("\n"));
    const turn = { command: actual, submittedInputId: previous, nextInputId, status: rawStatus,
      presentation: { ...p, lines: p.lines.slice(start), terminalLine: p.terminalLine - start, activeInput: { ...p.activeInput!, line: p.activeInput!.line! - start } } };
    turns.push(turn);
    expect(JSON.stringify(turn)).not.toMatch(/Record buffer full|Auto-deactivation|WARNING: Deactivating record feature|not currently active/i);
    await expect(focus === "map" ? page.locator(".compact-map-button") : input).toBeFocused();
    return startBlock;
  };
  const recording = async (on: boolean) => {
    await expect(status).toContainText("Simulation Mode");
    if (on) await expect(status).toContainText("(recording)");
    else await expect(status).not.toContainText("(recording)");
    expect(/\(recording\)/i.test(turns.at(-1)!.status)).toBe(on);
  };
  const checkLeaves = async (start: number) => {
    for (const [index, line] of turns.at(-1)!.presentation.lines.entries()) {
      if (index === 0 || index === turns.at(-1)!.presentation.activeInput!.line) continue;
      if (copy.has(line.text)) {
        await expect(blocks.nth(start + index)).toHaveText(copy.get(line.text)!);
        expect(await blocks.nth(start + index).evaluate((element) => element.closest("[lang]")?.getAttribute("lang"))).toBe("ja");
        if (PLACES.includes(line.text) || line.text === "Kennedy Park") await expect(blocks.nth(start + index)).toHaveClass("story-presentation-title");
      } else if (!line.text.trim()) await expect(blocks.nth(start + index)).toHaveClass("story-presentation-spacer");
      else { await expect(blocks.nth(start + index)).toHaveText(line.text); await expect(blocks.nth(start + index)).toHaveAttribute("lang", "en"); }
    }
  };
  const place = async (index: number, start: number) => {
    expect(rawLocation(turns.at(-1)!.status)).toBe(index < 0 ? "Kennedy Park" : PLACES[index]);
    await expect(page.locator(".location-block strong")).toHaveText(index < 0 ? "ケネディ公園" : NAMES[index]);
    await expect(page.locator(".location-block strong")).toHaveAttribute("lang", "ja");
    await checkLeaves(start);
  };
  const map = async (atChurch: boolean, count: number, name: string) => {
    if (controls === "classic") { await expect(page.locator(".compact-map-button, .movement-compass, .scene-actions, .fieldwork-checklist")).toHaveCount(0); return; }
    const before = await requestCount(), id = await inputId();
    await expect(page.locator(".compact-map-button small")).toHaveText(`${count}/9 録画`);
    await page.locator(".compact-map-button").click();
    const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
    const hotspot = drawer.locator(".rockvil-navigator").getByRole("button", { name: `聖ミカエル教会${atChurch ? "、現在地" : ""}`, exact: true });
    await expect(hotspot).toHaveAttribute("lang", "ja"); await hotspot.click();
    await expect(drawer.locator(".navigator-route")).toContainText("聖ミカエル教会");
    if (atChurch) await expect(drawer.locator(".navigator-route")).toContainText("目的地に到着しました。");
    await attach(`${name}-route-accessibility`, await drawer.ariaSnapshot(), "text/plain");
    await attach(`${name}-route`, await page.screenshot(), "image/png");
    if (page.viewportSize()!.width < 500) await drawer.getByRole("tab", { name: /^要項/ }).click();
    const items = drawer.locator(".fieldwork-checklist li");
    // Preserve Courthouse, Newspaper, Restaurant, City Hall and Power Station.
    for (const index of [0, 1, 2, 3, 5]) await expect(items.nth(index)).toHaveClass(/complete/);
    const church = items.nth(6);
    await expect(church.locator("strong")).toHaveText("教会関係者と話すこと");
    await expect(church.locator("small span").first()).toHaveText("聖ミカエル教会");
    await expect(church.locator("small span").first()).toHaveAttribute("lang", "ja");
    if (count === 6) await expect(church).toHaveClass(/complete/); else await expect(church).not.toHaveClass(/complete/);
    // The seventh checklist item is near the drawer bottom on 390px.
    await church.scrollIntoViewIfNeeded(); await expect(church.locator("strong")).toBeInViewport({ ratio: 1 });
    await expect.poll(() => lastTextVisible(church.locator("strong"))).toBe(true);
    if (page.viewportSize()!.width < 500) {
      await items.last().scrollIntoViewIfNeeded();
      await expect(items.last()).toBeInViewport({ ratio: 1 });
      await expect.poll(() => lastTextVisible(items.last().locator("strong"))).toBe(true);
      await attach(`${name}-drawer-bottom`, JSON.stringify({ viewport: page.viewportSize(), lastItem: await items.last().innerText(), lastItemVisible: true, lastTextVisible: true }));
    }
    await attach(`${name}-checklist-accessibility`, await drawer.ariaSnapshot(), "text/plain");
    await attach(`${name}-checklist`, await page.screenshot(), "image/png");
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
    await expect(page.locator(".compact-map-button")).toBeFocused();
    expect(await requestCount()).toBe(before); expect(await inputId()).toBe(id);
  };
  await map(false, 5, "church-before-route");
  for (const [index, short] of OUT.entries()) {
    const command = controls === "classic" ? short : ALIASES[short] ?? short;
    const start = await act(command, controls === "classic" ? undefined : () => clickRouteStep(page, input, controls, command, "聖ミカエル教会"), controls === "actions" ? "map" : "input");
    await place(index, start); await recording(false);
    if (index < 4) await expect(actor()).toHaveCount(0);
  }
  expect(turns.at(-1)!.presentation.lines.map(({ text }) => text)).toContain(PRESENCE);
  await map(true, 5, "church-arrival-off");
  let actorAudit = 0;
  const assertActors = async (present: boolean, name: "English" | "日本語") => {
    if (controls === "classic") { await expect(page.locator(".scene-actions")).toHaveCount(0); return; }
    const audit = ++actorAudit;
    await expect(actor()).toHaveCount(present ? 1 : 0);
    if (present) {
      await expect(actor()).toBeEnabled();
      const scene = page.locator(".command-deck .scene-actions").filter({ has: page.getByRole("button", { name: talkPattern }) });
      await expect(scene).toHaveAttribute("lang", name === "English" ? "en" : "ja");
      await expect(scene).toContainText(name === "English" ? "church elder" : "教会の長老");
      const actorName = (controls === "guided" ? actor().locator("span") : scene.locator(".scene-object strong span"))
        .filter({ hasText: /^(?:church elder|教会の長老)$/ });
      await expect(actorName).toHaveAttribute("lang", name === "English" ? "en" : "ja");
      const building = scene.getByText("church", { exact: true });
      if (await building.count()) await expect(building).toHaveAttribute("lang", "en");
      await expect(scene.locator(".scene-official-help")).toHaveText(name === "English"
        ? controls === "guided" ? "Draft a command to talk to the church elder. You can edit it before sending." : "Choose Talk to send the command once."
        : controls === "guided" ? "教会の長老と話すコマンドを下書きします。編集してから送信できます。" : "「話す」を押すと、コマンドを1回送信します。");
      await expect(scene.locator(".scene-official-help")).toBeVisible();
    }
    await attach(`church-main-actor-${audit}-${present ? "present" : "departed"}-${name}-accessibility`, await page.locator(".command-deck").ariaSnapshot(), "text/plain");
    await companion(true);
    const other = actor(page.locator(".companion-panel"));
    await expect(other).toHaveCount(present ? 1 : 0);
    if (present) {
      await expect(other).toBeEnabled();
      if (controls === "guided") {
        const count = await requestCount(), id = await inputId();
        await other.click(); await expect(input).toHaveValue("church elder, hello");
        expect(await requestCount()).toBe(count); expect(await inputId()).toBe(id);
        await input.fill("");
      }
    }
    await attach(`church-companion-actor-${audit}-${present ? "present" : "departed"}-${name}-accessibility`, await page.locator(".companion-panel").ariaSnapshot(), "text/plain");
    await companion(false);
  };
  const arrivalId = await inputId(), arrivalRequests = await requestCount();
  for (const name of ["English", "日本語", "English", "日本語"] as const) {
    await locale(name); await assertActors(true, name);
    expect(await inputId()).toBe(arrivalId); expect(await requestCount()).toBe(arrivalRequests);
    await expect(page.locator(".location-block strong")).toHaveText(name === "English" ? "St. Michael's" : "聖ミカエル教会");
  }
  const quick = (name: string) => controls === "classic" ? undefined : () => page.locator(".quick-actions").getByRole("button", { name, exact: true }).click();
  if (recordConversation) { const start = await act("RECORD", quick("録画開始")); await checkLeaves(start); await recording(true); }
  const beforeTalkStatus = await status.innerText(), beforeDraft = await requestCount(), beforeDraftId = await inputId(), countBeforeDraft = await blocks.count();
  if (controls === "guided") {
    await actor().click(); await expect(input).toHaveValue("church elder, hello"); await expect(input).toBeFocused();
    await expect(blocks).toHaveCount(countBeforeDraft); expect(await requestCount()).toBe(beforeDraft); expect(await inputId()).toBe(beforeDraftId);
    await input.fill("church elder, hello "); await expect(input).toHaveValue("church elder, hello ");
  }
  if (controls !== "classic") { await actor().scrollIntoViewIfNeeded(); await expect(actor()).toBeInViewport({ ratio: 1 }); }
  await attach("church-talk-controls-accessibility", await page.locator(".command-deck").ariaSnapshot(), "text/plain");
  await attach("church-talk-controls", await page.screenshot(), "image/png");
  const chatStart = await act("CHURCH ELDER, HELLO", controls === "classic" ? undefined : controls === "guided"
    ? () => page.getByRole("button", { name: /^送信/ }).click() : () => actor().click());
  const chatTurn = turns.at(-1)!;
  expect(chatTurn.presentation.lines.slice(1, -1).map(({ text }) => text)).toEqual([DEPARTURE, " "]);
  await checkLeaves(chatStart); await recording(recordConversation); await assertActors(false, "日本語");
  const clock = (raw: string) => { const m = raw.match(/Time:\s*(\d+):(\d+)(am|pm)/i); return m ? Number(m[1]) % 12 * 60 + Number(m[2]) + (m[3].toLowerCase() === "pm" ? 720 : 0) : null; };
  const beforeMinutes = clock(beforeTalkStatus), afterMinutes = clock(chatTurn.status);
  const elapsedMinutes = beforeMinutes !== null && afterMinutes !== null ? (afterMinutes - beforeMinutes + 1440) % 1440 : null;
  if (page.viewportSize()!.width >= 500) expect(elapsedMinutes).toBe(8); else expect(elapsedMinutes).toBeNull();
  await map(true, recordConversation ? 6 : 5, "church-conversation-inference");
  const surface = presentation.locator(".story-presentation-scroll"), paragraph = blocks.nth(chatStart + 1), chatJapanese = copy.get(DEPARTURE)!;
  await surface.evaluate((el) => { el.scrollTop = Math.max(0, el.scrollHeight - el.clientHeight * 2); });
  const scrollStart = await surface.evaluate((el) => el.scrollTop);
  await surface.hover(); await page.mouse.wheel(0, await surface.evaluate((el) => el.scrollHeight));
  await expect.poll(() => surface.evaluate((el) => el.scrollTop)).toBeGreaterThan(scrollStart);
  await expect.poll(() => lastTextVisible(paragraph)).toBe(true);
  await expect(input).toBeInViewport({ ratio: 1 });
  const recover = async (stage: "conversation" | "return", anchor: Locator) => {
    const raw = await canonical.innerText(), requests = await requestCount(), id = await inputId(), historyCount = await blocks.count();
    await input.fill("LOOK"); const recovery = [];
    for (const name of ["English", "日本語", "English", "日本語"] as const) {
      await locale(name); await expect(input).toHaveValue("LOOK");
      expect(await requestCount()).toBe(requests); expect(await inputId()).toBe(id); expect(await canonical.innerText()).toBe(raw);
      const aria = await frame.locator("body").ariaSnapshot();
      if (name === "English") {
        await expect(presentation).toBeHidden(); await expect(canonical).not.toHaveAttribute("aria-hidden", "true");
        expect(aria.split(DEPARTURE)).toHaveLength(2); expect(aria).not.toContain(chatJapanese);
        const original = frame.locator(".BufferWindow"); await original.hover(); await page.mouse.wheel(0, await original.evaluate((el) => el.scrollHeight));
        const end = stage === "conversation" ? canonical.locator(".BufferLine", { hasText: DEPARTURE }) : canonical.locator(".BufferLine").filter({ hasText: /^Kennedy Park$/ }).last();
        await expect.poll(() => lastTextVisible(end)).toBe(true);
      } else {
        await expect(presentation).toHaveAttribute("lang", "ja"); await expect(canonical).toHaveAttribute("aria-hidden", "true"); await expect(canonical).toHaveAttribute("inert", "");
        await expect(blocks).toHaveCount(historyCount); expect(aria.split(chatJapanese)).toHaveLength(2); expect(aria).not.toContain(DEPARTURE);
        await surface.hover(); await page.mouse.wheel(0, await surface.evaluate((el) => el.scrollHeight));
        await expect.poll(() => lastTextVisible(anchor)).toBe(true);
      }
      await assertActors(false, name); await input.click(); await expect(input).toBeFocused(); await expect(input).toBeInViewport({ ratio: 1 });
      recovery.push({ locale: name, inputId: id, requests, singleOwner: true, lastTextVisible: true });
      await attach(`church-${stage}-recovery-${recovery.length}-accessibility`, aria, "text/plain");
      await attach(`church-${stage}-recovery-${recovery.length}`, await page.screenshot(), "image/png");
    }
    await attach(`church-${stage}-reading`, JSON.stringify({ recovery, lifecycle: await readingTrace(frame, `church-${stage}-recovery`) }));
  };
  await recover("conversation", paragraph); await input.fill("");
  if (recordConversation) { const start = await act("RECORD OFF", quick("録画停止")); await checkLeaves(start); await recording(false); }
  const look = await act("LOOK", quick("見る")); await place(4, look); await recording(false);
  expect(turns.at(-1)!.presentation.lines.map(({ text }) => text)).not.toContain(PRESENCE);
  await assertActors(false, "日本語");
  for (const [index, short] of BACK.entries()) {
    const command = controls === "classic" ? short : ALIASES[short] ?? short;
    const start = await act(command, controls === "classic" ? undefined : () => page.locator(".compass-exit").filter({ has: page.getByText(short, { exact: true }) }).click());
    await place(3 - index, start); await recording(false); await expect(actor()).toHaveCount(0);
    await expect(presentation).toContainText(chatJapanese);
  }
  await map(false, recordConversation ? 6 : 5, "church-return-map");
  await recover("return", presentation.locator(".story-presentation-title").last());
  const trace = await rawTrace(), requests = trace.requests.slice(1);
  const fixture = JSON.parse(await readFile(new URL("../fixtures/parchment-church-runtime-observed.json", import.meta.url), "utf8"));
  expect(trace.requests[0]).toBe(" "); expect(requests).toHaveLength(recordConversation ? 81 : 79);
  expect(requests.slice(0, 67).map((command, index) => index === 6 ? "<decoder>" : normalize(command))).toEqual(fixture.sessions[0].submittedCommands.slice(0, 67).map((command: string, index: number) => index === 6 ? "<decoder>" : normalize(command)));
  expect(turns.map(({ command }) => normalize(command))).toEqual([...OUT, ...(recordConversation ? ["RECORD"] : []), "CHURCH ELDER, HELLO", ...(recordConversation ? ["RECORD OFF"] : []), "LOOK", ...BACK]);
  expect(turns[0].submittedInputId).toBe(prior.powerTurns.at(-1)!.nextInputId);
  for (let i = 1; i < turns.length; i++) expect(turns[i].submittedInputId).toBe(turns[i - 1].nextInputId);
  const delivered = trace.inputs.slice(2); expect(delivered).toHaveLength(requests.length);
  for (const [index, output] of delivered.entries()) {
    expect(output.previousInputId).toBe(trace.inputs[index + 1].inputId);
    expect(output.presentation.lines[0].id).toBe(output.previousInputId); expect(output.inputId).not.toBe(output.previousInputId);
    if (index === 6) expect(output.presentation.lines[0].runs.some((run) => run.classes.includes("Style_input") && run.text === requests[index])).toBe(true);
    else expect(output.presentation.lines[0].text.toUpperCase()).toBe(`>${requests[index].toUpperCase()}`);
  }
  expect(trace.inputs.at(-1)!.inputId).toBe(turns.at(-1)!.nextInputId);
  expect(JSON.stringify(trace.inputs)).not.toMatch(/Record buffer full|Auto-deactivation|WARNING: Deactivating record feature/i);
  const warnings = trace.inputs.filter(({ presentation: p }) => p.lines.some(({ text }) => text === "WARNING: Record buffer is now half-full.")); expect(warnings).toHaveLength(1);
  const narrow = page.viewportSize()!.width < 500;
  for (const turn of turns) { if (narrow) expect(turn.status).not.toMatch(/Time:|Date:/i); else expect(turn.status).toMatch(/Time:[\s\S]*Date:/i); }
  await attach("church-runtime-observations", JSON.stringify({ provenance: "fresh canonical Release 79; live bridge-v3 output and actual parent-to-player requests; no VM edits, injected route reports or saved-game RESTORE", startedAt, finishedAt: new Date().toISOString(), controls, viewport: page.viewportSize(), recordConversation, trace, churchTurns: turns, warnings, elapsedMinutes, scrollStart, clockLimitation: narrow ? "canonical narrow status emits no clock/date; no time synthesized" : null, checklist: controls === "classic" ? "not displayed" : recordConversation ? "6/9 auxiliary inference, not original assignment evaluation" : "5/9; unrecorded church conversation adds no task", finalInputId: await inputId() }));
  await attach("church-return", await page.screenshot(), "image/png");
}

// These probes replace only wrapper reports. Parchment stays at its actual
// startup, and no synthetic report is counted as a canonical route or RESTORE.
export async function probeChurchBoundary(page: Page, testInfo: TestInfo, scenario: "history" | "input-scope" | "recording") {
  await page.goto("/");
  await page.getByRole("dialog", { name: /A Mind Forever Voyaging/i }).getByRole("button", { name: /^Begin/ }).click();
  await page.getByRole("button", { name: /Begin the original story/i }).click();
  await expect(page.locator("#command-input")).toBeEnabled();
  const frame = page.frameLocator('iframe[src="/player.html"]');
  await frame.locator("body").evaluate(() => {
    const w = window as typeof window & { churchPost?: typeof window.parent.postMessage };
    w.churchPost = window.parent.postMessage.bind(window.parent);
    window.parent.postMessage = ((data: { type?: string }, origin: string) => {
      if (data.type !== "transcript") w.churchPost?.(data, origin);
    }) as typeof window.parent.postMessage;
  });
  const post = (payload: Record<string, unknown>) => frame.locator("body").evaluate((_body, data) => {
    (window as typeof window & { churchPost?: typeof window.parent.postMessage }).churchPost?.({ channel: "amfv:bridge", ...data }, window.location.origin);
  }, payload);
  const fixture = JSON.parse(await readFile(new URL("../fixtures/parchment-church-runtime-observed.json", import.meta.url), "utf8"));
  const arrival = fixture.sessions[0].observations[70].presentation as BridgePresentation;
  const chat = fixture.sessions[0].observations[72].presentation as BridgePresentation;
  const copy = await approvedCopy(), presenceJapanese = copy.get(PRESENCE)!, chatJapanese = copy.get(DEPARTURE)!;
  const presentation = frame.locator("#amfv-localized-presentation-host");
  const prose = (text: string) => presentation.locator(".story-presentation-prose").filter({ hasText: text });
  const talk = () => page.getByRole("button", { name: talkPattern });
  const settings = async (name: "English" | "日本語", mode: "guided" | "actions" = "actions") => {
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
    const panel = page.locator(".access-panel");
    await panel.getByRole("button", { name, exact: true }).click();
    await panel.locator(".interaction-segments button").nth(mode === "guided" ? 1 : 2).click();
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
  };
  const companion = async (open: boolean) => {
    if (open) {
      await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
      await page.locator(".companion-tabs").getByRole("tab").nth(1).click();
    } else await page.locator(".close-context").click();
  };
  const both = async (present: boolean) => {
    await expect(talk()).toHaveCount(present ? 1 : 0);
    await companion(true); await expect(talk()).toHaveCount(present ? 2 : 0);
    await companion(false);
  };
  let sequence = 0;
  const unique = (p: BridgePresentation) => {
    const result = structuredClone(p); sequence++;
    result.lines.forEach((line, index) => { line.id = `controlled-church-${sequence}-${index}`; });
    return result;
  };
  const make = (command: string, output: string[], kind: "line" | "char" = "line") => {
    const p = structuredClone(arrival), normal = arrival.lines[1], blank = arrival.lines[3];
    p.lines = [
      { ...structuredClone(arrival.lines[0]), text: `>${command}`, runs: [{ text: ">", classes: ["Style_normal"], tag: "span" }, { text: command, classes: ["Style_input"], tag: "span" }] },
      ...output.map((text) => text.trim() ? { ...structuredClone(normal), text, runs: [{ text, classes: ["Style_normal"], tag: "span" }] } : structuredClone(blank)),
      structuredClone(arrival.lines.at(-1)!),
    ];
    p.terminalLine = p.lines.length - 1;
    p.activeInput = { ...p.activeInput!, kind, line: p.terminalLine };
    return p;
  };
  type ReportOptions = {
    location?: string; year?: number; recording?: boolean; prefix?: string; history?: string;
    inputKind?: "line" | "char"; acceptsInput?: boolean; statusText?: string;
    omit?: Array<"statusText" | "inputKind" | "acceptsInput" | "presentation">; reuseIds?: boolean;
  };
  const reports: unknown[] = [], observed: string[] = [];
  const report = async (p: BridgePresentation = arrival, options: ReportOptions = {}) => {
    const current = options.reuseIds ? structuredClone(p) : unique(p);
    const raw = current.lines.map(({ text }) => text).join("\n"), command = current.lines[0].text.replace(/^>/, "");
    await post({ type: "command", command });
    const payload: Record<string, unknown> = { type: "transcript", text: `${options.prefix ?? ""}${options.history ?? ""}${raw}`, recentText: raw,
      statusText: options.statusText ?? `Mode: Simulation Mode${options.recording ? " (recording)" : ""} Time: 1:00pm Location: ${options.location ?? "St. Michael's"} Date: 3/6/${options.year ?? 2041}`,
      inputKind: options.inputKind ?? "line", acceptsInput: options.acceptsInput ?? true, presentation: current };
    for (const key of options.omit ?? []) delete payload[key];
    await post(payload); reports.push({ command, ...payload }); return current;
  };
  const fresh = async (enter: "present" | "heading" | "none" = "present") => {
    await post({ type: "transcript", text: "Tomorrow never yet.\nHit any key to continue", recentText: "Tomorrow never yet.\nHit any key to continue", statusText: "", inputKind: "char", acceptsInput: true, presentation: unique(fixture.sessions[0].startup.before.presentation) });
    if (enter !== "none") {
      await report(enter === "present" ? arrival : make("W", ["St. Michael's", " "]), { prefix: "This simulation is based 10 years hence.\n" });
      await both(enter === "present");
    }
  };
  const progress = async (count: number) => {
    await expect(page.locator(".compact-map-button small")).toHaveText(`${count}/9 録画`);
    await page.locator(".compact-map-button").click();
    const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
    const item = drawer.locator(".fieldwork-checklist li").nth(6);
    if (count) await expect(item).toHaveClass(/complete/); else await expect(item).not.toHaveClass(/complete/);
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
  };
  await settings("日本語");
  if (scenario === "history") {
    await fresh(); await expect(prose(presenceJapanese)).toHaveCount(1);
    const oldPresence = reports.at(-1) as { presentation: BridgePresentation };
    await report(chat); await both(false); await expect(prose(chatJapanese)).toHaveCount(1);
    const tail = make("WAIT", Array.from({ length: 350 }, () => [">WAIT", `Time passes...${" ".repeat(60)}`]).flat());
    expect(tail.lines.map(({ text }) => text).join("\n").length).toBeGreaterThan(20_000);
    const oldRaw = [...arrival.lines, ...chat.lines].map(({ text }) => text).join("\n") + "\n";
    await report(tail, { history: oldRaw }); await both(false);
    await report(oldPresence.presentation, { reuseIds: true }); await both(false);
    await report(arrival); await both(false);
    observed.push("conversation completion survives long rolling history, cached presence IDs and a newly reported presence; neither main nor companion revives Talk");
    for (const name of ["English", "日本語", "English", "日本語"] as const) { await settings(name); await both(false); }
    await expect(prose(chatJapanese)).toHaveCount(1);
    await report(chat, { year: 2051 }); await both(false);
    await expect(prose(chatJapanese)).toHaveCount(1); await expect(prose(DEPARTURE)).toHaveCount(1); await expect(prose(DEPARTURE)).toHaveAttribute("lang", "en");
    await report(tail, { location: "Kennedy Park" });
    await expect(prose(chatJapanese)).toHaveCount(1); await expect(prose(DEPARTURE)).toHaveCount(1);
    observed.push("valid observed-room Japanese conversation remains after 2051 same leaf, other room and long tail with no church text; later-year copy falls back to lang=en");
    await post({ type: "command", command: "RESTORE" }); await report(); await both(false);
    await expect(prose(chatJapanese)).toHaveCount(0); await expect(prose(presenceJapanese)).toHaveCount(0); await expect(prose(PRESENCE)).toHaveCount(1);
    await fresh("none"); await report(); await both(false); await expect(prose(presenceJapanese)).toHaveCount(0);
    await fresh("heading"); await both(false);
    observed.push("RESTORE clears timeline scope; fresh session without initial entry and a church heading without fresh presence fail closed");
    await fresh();
    const timedPresence = reports.at(-1) as { presentation: BridgePresentation };
    await report(make("WAIT", [TIME_DEPARTURE, " "])); await both(false);
    await expect(prose(TIME_DEPARTURE)).toHaveText(TIME_DEPARTURE); await expect(prose(TIME_DEPARTURE)).toHaveAttribute("lang", "en");
    await report(timedPresence.presentation, { reuseIds: true }); await both(false);
    await report(make("LOOK", ["St. Michael's", " "]), { history: arrival.lines.map(({ text }) => text).join("\n") + "\n" }); await both(false);
    await report(arrival); await both(true);
    observed.push("source-only time departure removes both Talk controls without marking conversation completed; only genuinely new valid presence permits Talk again");
    await report(make("E", ["Church Entrance", " "]), { location: "Church Entrance" }); await both(false);
    await report(make("W", ["St. Michael's", " "])); await both(false);
    await report(arrival); await both(true);
    observed.push("leaving invalidates visit presence; returning with heading or old scene cache cannot revive Talk; new raw presence can establish the new visit");
  } else if (scenario === "recording") {
    await fresh("heading"); await progress(0);
    await report(arrival, { recording: true }); await both(true); await progress(0);
    observed.push("recorded church heading and actor presence alone infer no task");
    await fresh(); await report(chat); await both(false); await progress(0);
    const oldChat = [...arrival.lines, ...chat.lines].map(({ text }) => text).join("\n") + "\n";
    await report(fixture.sessions[0].observations[71].presentation, { recording: true, history: oldChat }); await progress(0);
    await report(make("LOOK", ["St. Michael's", " "]), { recording: true, history: oldChat }); await progress(0);
    observed.push("unrecorded chat does not infer the task; later RECORD and LOOK do not count old chat from a previous recording window");
    await fresh();
    const recordedStart = await report(fixture.sessions[0].observations[71].presentation, { recording: true }); await progress(0);
    const recordHistory = recordedStart.lines.map(({ text }) => text).join("\n") + "\n";
    const recordedChat = await report(chat, { recording: true, history: recordHistory }); await both(false); await progress(1);
    const recordedHistory = recordHistory + recordedChat.lines.map(({ text }) => text).join("\n") + "\n";
    await report(fixture.sessions[0].observations[73].presentation, { history: recordedHistory }); await progress(1);
    observed.push("only the fresh exact successful conversation in its current active recording window infers the auxiliary church task; explicit OFF preserves it");
    await fresh("heading");
    await report(make("LOOK", ["St. Michael's", "A church official is waiting here.", " "])); await both(false);
    observed.push("generic official wording does not establish the approved church elder");
  } else {
    await fresh();
    await report(arrival, { statusText: "MODE: SIMULATION MODE TIME: 1:00PM LOCATION: ST. MICHAEL'S DATE: 3/6/2041" });
    await both(true);
    observed.push("canonical status displayed in uppercase still resolves the same St. Michael's room; both Talk controls remain available");
    for (const mode of ["guided", "actions"] as const) for (const name of ["English", "日本語"] as const) {
      await settings(name, mode); await fresh(); await post({ type: "busy" });
      await expect(talk()).toBeDisabled(); await companion(true); await expect(talk()).toHaveCount(2);
      for (const button of await talk().all()) await expect(button).toBeDisabled();
      await companion(false);
      await report(make("W", ["St. Michael's", PRESENCE, " "], "char"), { inputKind: "char" }); await both(false);
    }
    observed.push("busy disables both Talk controls in Guided/Actions and EN/JA; character input removes both");
    await settings("日本語");
    for (const location of ["Kennedy Park", "First Methodist Church", "Unknown Room", "Church Entrance"]) {
      await fresh(); await report(arrival, { location }); await both(false);
      await expect(prose(PRESENCE)).toHaveCount(1); await expect(prose(PRESENCE)).toHaveAttribute("lang", "en");
      await report(make("W", ["St. Michael's", " "])); await both(false);
    }
    observed.push("other room, First Methodist, unknown room and church entrance do not gain actor or new Japanese; a return heading does not reuse their presence");
    for (const omit of [["statusText"], ["inputKind"], ["acceptsInput"], ["presentation"]] as const) {
      await fresh(); await report(arrival, { omit: [...omit] }); await both(false);
      await report(make("W", ["St. Michael's", " "])); await both(false);
    }
    await fresh(); await report(arrival, { statusText: "" }); await both(false);
    await fresh(); await report(arrival, { acceptsInput: false }); await expect(talk()).toBeDisabled();
    await companion(true); await expect(talk()).toHaveCount(2);
    for (const button of await talk().all()) await expect(button).toBeDisabled();
    await companion(false);
    observed.push("missing or empty status and missing input kind/readiness/presentation fail closed; a complete busy report retains disabled same-visit controls");
    await fresh(); await report(arrival, { year: 2051 }); await both(false);
    await expect(prose(PRESENCE)).toHaveCount(1); await expect(page.locator(".location-block strong")).toHaveText("St. Michael's");
    await fresh(); await post({ type: "command", command: "RESTORE" }); await report(); await both(false);
    await fresh();
    await post({ type: "command", command: "ABORT" });
    await post({ type: "transcript", text: ">ABORT\nCommunications Mode\n>", recentText: ">ABORT\nCommunications Mode\n>", statusText: "Mode: Communications Mode", inputKind: "line", acceptsInput: true, presentation: unique(make("ABORT", ["Communications Mode", " "])) });
    await report(arrival, { prefix: "This simulation is based 10 years hence.\n" }); await both(false);
    await expect(prose(PRESENCE)).toHaveCount(1);
    await fresh(); await report(arrival, { prefix: "* PART II *\n" }); await both(false); await expect(prose(PRESENCE)).toHaveCount(1);
    observed.push("2051, RESTORE unknown state, simulation re-entry and Part II reject new canonical-only translation and actor assistance");
    await frame.locator("body").evaluate(() => {
      const saved = (window as typeof window & { churchPost?: typeof window.parent.postMessage }).churchPost;
      if (saved) window.parent.postMessage = saved;
    });
    await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
    await page.getByRole("tab", { name: /About|この作品について/, exact: true }).click();
    await page.getByRole("button", { name: "Open spoiler/debug tools" }).click();
    await page.getByRole("button", { name: "Enable spoilers & load QA build" }).click();
    const qa = page.frameLocator('iframe[src*="qa=1"]');
    await expect(qa.locator(".BufferWindowInner")).toContainText("Tomorrow never yet", { timeout: 60_000 });
    const qaPresentation = unique(arrival);
    await qa.locator("body").evaluate((_body, p) => {
      const nativePost = window.parent.postMessage.bind(window.parent);
      window.parent.postMessage = ((data: { type?: string }, origin: string) => { if (data.type !== "transcript") nativePost(data, origin); }) as typeof window.parent.postMessage;
      nativePost({ channel: "amfv:bridge", type: "command", command: "W" }, window.location.origin);
      nativePost({ channel: "amfv:bridge", type: "transcript", text: "This simulation is based 10 years hence.\n" + p.lines.map(({ text }) => text).join("\n"), recentText: p.lines.map(({ text }) => text).join("\n"), statusText: "Mode: Simulation Mode Location: St. Michael's Date: 3/6/2041", inputKind: "line", acceptsInput: true, presentation: p }, window.location.origin);
    }, qaPresentation);
    await expect(talk()).toHaveCount(0); await expect(page.locator(".location-block strong")).toHaveText("St. Michael's");
    expect(await qa.locator("body").ariaSnapshot()).not.toContain(presenceJapanese);
    reports.push({ frame: "noncanonical QA", presentation: qaPresentation }); observed.push("active noncanonical QA frame receives no church-specific assistance or Japanese");
  }
  await attachEvidence(testInfo, `church-controlled-${scenario}`, JSON.stringify({ provenance: "synthetic controlled wrapper bridge reports only; canonical VM output/state unchanged at real startup; not natural route evidence or actual saved-game RESTORE", observed, reports }));
  await attachEvidence(testInfo, `church-controlled-${scenario}-accessibility`, await page.locator("body").ariaSnapshot(), "text/plain");
  await attachEvidence(testInfo, `church-controlled-${scenario}`, await page.screenshot(), "image/png");
}
