import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { acceptCityHallMilestone } from "./city-hall-acceptance";
import { clickRouteStep } from "./navigation-acceptance";
import { attachEvidence } from "./evidence-attachments";
import { readingTrace } from "./reading-observations";
import type { BridgePresentation } from "../../app/story-presentation";

const PLACES = ["Elm & Kennedy", "Elm & River", "Southway & River", "Bend", "Wicker & River", "Power Station Entrance", "Power Station"];
const NAMES = ["エルム通りとケネディ通り", "エルム通りとリバー通り", "サウスウェイ通りとリバー通り", "曲がり角", "ウィッカー通りとリバー通り", "発電所入口", "発電所"];
const OUT = ["SE", "E", "S", "S", "SE", "SE", "S"];
const BACK = ["N", "NW", "NW", "N", "N", "W", "NW"];
const ALIASES: Record<string, string> = { E: "EAST", S: "SOUTH", N: "NORTH", W: "WEST" };
const SHORT_ALIASES: Record<string, string> = { EAST: "E", SOUTH: "S", NORTH: "N", WEST: "W" };
const normalize = (command: string) => SHORT_ALIASES[command.trim().toUpperCase()] ?? command.trim().toUpperCase();
const rawLocation = (status: string) => status.match(/Location:\s*([\s\S]*?)(?:Date:|$)/i)?.[1].trim();

async function approvedCopy() {
  const packet = await readFile(new URL("../../docs/power-station-copy-packet.md", import.meta.url), "utf8");
  return new Map(packet.split("\n").filter((line) => /^\| [HD]\d;/.test(line)).map((line) => {
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

type PowerTurn = { command: string; submittedInputId: string; nextInputId: string; status: string; presentation: BridgePresentation };

export async function acceptPowerStationMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordFacility = true) {
  const startedAt = new Date().toISOString();
  // Reuse every assertion and all fifty sends; the default records City Hall.
  const prior = await acceptCityHallMilestone(page, controls, testInfo);
  const { frame, presentation, canonical, input, status, blocks, send, locale, snapshot, rawTrace } = prior;
  const attach = (name: string, body: string | Buffer, contentType = "application/json") => attachEvidence(testInfo, name, body, contentType);
  const copy = await approvedCopy();
  await input.fill(""); // City Hall deliberately leaves an unsent LOOK draft.
  const turns: PowerTurn[] = [];
  const requestCount = () => frame.locator("body").evaluate(() => (window as typeof window & { cityHallRequests: string[] }).cityHallRequests.length);
  const act = async (command: string, trigger?: () => Promise<void>, focus: "input" | "map" = "input") => {
    const before = await snapshot(), p0 = before.presentation;
    const previous = p0.lines[p0.activeInput!.line!].id!;
    const count = await requestCount();
    const startBlock = await send(command, trigger);
    await expect.poll(requestCount).toBe(count + 1);
    const actual = await frame.locator("body").evaluate(() => (window as typeof window & { cityHallRequests: string[] }).cityHallRequests.at(-1)!);
    expect(actual.toUpperCase()).toBe(command.toUpperCase());
    const after = await snapshot(), p = after.presentation;
    const start = p.lines.findIndex((line) => line.id === previous);
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
    if (on) await expect(status).toContainText("Simulation Mode (recording)");
    else { await expect(status).toContainText("Simulation Mode"); await expect(status).not.toContainText("(recording)"); }
  };
  const checkPlace = async (index: number, start: number) => {
    expect(rawLocation(turns.at(-1)!.status)).toBe(PLACES[index]);
    await expect(page.locator(".location-block strong")).toHaveText(NAMES[index]);
    await expect(page.locator(".location-block strong")).toHaveAttribute("lang", "ja");
    await expect(blocks.nth(start + 1)).toHaveText(NAMES[index]);
    await expect(blocks.nth(start + 1)).toHaveClass("story-presentation-title");
    const raw = turns.at(-1)!.presentation.lines;
    for (let line = 2; line < raw.length - 1; line++) {
      if (copy.has(raw[line].text)) await expect(blocks.nth(start + line)).toHaveText(copy.get(raw[line].text)!);
      else if (!raw[line].text.trim()) await expect(blocks.nth(start + line)).toHaveClass("story-presentation-spacer");
      else { await expect(blocks.nth(start + line)).toHaveText(raw[line].text); await expect(blocks.nth(start + line)).toHaveAttribute("lang", "en"); }
    }
  };
  const map = async (atFacility: boolean, count: number, name: string) => {
    if (controls === "classic") { await expect(page.locator(".compact-map-button, .movement-compass, .scene-actions, .fieldwork-checklist")).toHaveCount(0); return; }
    await expect(page.locator(".compact-map-button small")).toHaveText(`${count}/9 録画`);
    await page.locator(".compact-map-button").click();
    const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
    const hotspot = drawer.locator(".rockvil-navigator").getByRole("button", { name: `発電所、調査目的地${atFacility ? "、現在地" : ""}`, exact: true });
    await expect(hotspot).toHaveAttribute("lang", "ja");
    await hotspot.click();
    await expect(drawer.locator(".navigator-route")).toContainText("発電所");
    if (atFacility) await expect(drawer.locator(".navigator-route")).toContainText("目的地に到着しました。");
    await attach(`${name}-route`, await drawer.ariaSnapshot(), "text/plain");
    await attach(`${name}-route`, await page.screenshot(), "image/png");
    if (page.viewportSize()!.width < 500) await drawer.getByRole("tab", { name: /^要項/ }).click();
    const item = drawer.locator(".fieldwork-checklist li").nth(2);
    await expect(item.locator("strong")).toHaveText("発電施設を訪れること");
    await expect(item.locator("small span").first()).toHaveText("発電所");
    await expect(item.locator("small span").first()).toHaveAttribute("lang", "ja");
    if (count === 5) await expect(item).toHaveClass(/complete/); else await expect(item).not.toHaveClass(/complete/);
    await expect(drawer.locator(".rockvil-navigator button[lang=en]").filter({ hasText: "Cinema" })).toHaveAttribute("lang", "en");
    await attach(name, await drawer.ariaSnapshot(), "text/plain");
    await attach(name, await page.screenshot(), "image/png");
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
    await expect(page.locator(".compact-map-button")).toBeFocused();
  };
  const outbound = async (index: number) => {
    const command = controls === "classic" ? OUT[index] : ALIASES[OUT[index]] ?? OUT[index];
    const start = await act(command, controls === "classic" ? undefined : () => clickRouteStep(page, input, controls, command, "発電所"), controls === "actions" ? "map" : "input");
    await checkPlace(index, start); await recording(false);
    if (index === 4) {
      const scroll = presentation.locator(".story-presentation-scroll");
      await scroll.hover(); await page.mouse.wheel(0, await scroll.evaluate((el) => el.scrollHeight));
      await expect.poll(() => lastTextVisible(blocks.nth(start + 2))).toBe(true);
      await expect(input).toBeInViewport({ ratio: 1 });
      await attach("power-station-wicker-reading", JSON.stringify({ raw: turns.at(-1)!.presentation.lines[2].text, lastTextVisible: true, inputVisible: true }));
      await attach("power-station-wicker-reading", await page.screenshot(), "image/png");
    }
    return start;
  };
  for (let i = 0; i < 6; i++) await outbound(i);
  await map(false, 4, "power-station-entrance");
  const quick = (name: string) => controls === "classic" ? undefined : () => page.locator(".quick-actions").getByRole("button", { name, exact: true }).click();
  if (!recordFacility) {
    await act("RECORD", quick("録画開始")); await recording(true);
    const look = await act("LOOK", quick("見る")); await recording(true);
    const rawLook = turns.at(-1)!.presentation.lines.slice(1, -1).map(({ text }) => text.trim()).filter(Boolean).join("\n");
    await expect(blocks.nth(look + 1)).toHaveText(rawLook);
    await expect(blocks.nth(look + 1)).toHaveAttribute("lang", "en");
    await map(false, 4, "power-station-negative-recorded-entrance");
    await act("RECORD OFF", quick("録画停止")); await recording(false);
  }
  const arrivalStart = await outbound(6);
  await map(true, 4, "power-station-facility-off");
  const facilityEnglish = turns.at(-1)!.presentation.lines[2].text;
  const facilityJapanese = copy.get(facilityEnglish)!;
  expect(facilityJapanese).toContain("核融合炉"); expect(facilityJapanese).toContain("マイクロ波");
  if (controls !== "classic") await expect(page.locator(".scene-actions").filter({ hasText: /power station|発電所/ })).toHaveCount(0);
  if (recordFacility) {
    const start = await act("RECORD", controls === "actions"
      ? () => page.locator(".record-reminder").getByRole("button", { name: "録画を開始", exact: true }).click() : quick("録画開始"));
    await expect(blocks.nth(start + 1)).toHaveText("記録機能を起動しました。"); await recording(true);
  }
  const lookStart = await act("LOOK", quick("見る"));
  await checkPlace(6, lookStart); await recording(recordFacility);
  await expect(blocks.nth(lookStart + 2)).toHaveText(facilityJapanese);
  await map(true, recordFacility ? 5 : 4, "power-station-inference");
  const surface = presentation.locator(".story-presentation-scroll"), paragraph = blocks.nth(lookStart + 2);
  await surface.evaluate((el) => { el.scrollTop = Math.max(0, el.scrollHeight - el.clientHeight * 2); });
  const top = await surface.evaluate((el) => el.scrollTop);
  await surface.hover(); await page.mouse.wheel(0, await surface.evaluate((el) => el.scrollHeight));
  await expect.poll(() => surface.evaluate((el) => el.scrollTop)).toBeGreaterThan(top);
  await expect.poll(() => lastTextVisible(paragraph)).toBe(true);
  await expect(input).toBeInViewport({ ratio: 1 });
  await attach("power-station-reading-ja", await page.screenshot(), "image/png");
  const rawBefore = await canonical.innerText(), countBefore = await requestCount();
  const idBefore = turns.at(-1)!.nextInputId, historyCount = await blocks.count();
  await input.fill("LOOK");
  const recovery = [];
  for (const name of ["English", "日本語", "English", "日本語"] as const) {
    await locale(name); await expect(input).toHaveValue("LOOK");
    expect(await requestCount()).toBe(countBefore);
    const current = (await snapshot()).presentation; expect(current.lines[current.activeInput!.line!].id).toBe(idBefore);
    expect(await canonical.innerText()).toBe(rawBefore);
    const aria = await frame.locator("body").ariaSnapshot();
    if (name === "English") {
      await expect(presentation).toBeHidden(); await expect(canonical).not.toHaveAttribute("aria-hidden", "true");
      expect(aria.split(facilityEnglish).length).toBe(3); expect(aria).not.toContain(facilityJapanese);
    } else {
      await expect(canonical).toHaveAttribute("aria-hidden", "true"); await expect(canonical).toHaveAttribute("inert", "");
      await expect(blocks).toHaveCount(historyCount);
      expect(aria.split(facilityJapanese).length).toBe(3); expect(aria).not.toContain(facilityEnglish);
      await surface.hover(); await page.mouse.wheel(0, await surface.evaluate((el) => el.scrollHeight)); await expect.poll(() => lastTextVisible(paragraph)).toBe(true);
    }
    await expect(input).toBeInViewport({ ratio: 1 });
    recovery.push({ locale: name, inputId: idBefore, requests: countBefore, singleOwner: true });
    await attach(`power-station-recovery-${recovery.length}-accessibility`, aria, "text/plain");
    await attach(`power-station-recovery-${recovery.length}`, await page.screenshot(), "image/png");
  }
  await input.fill("");
  await attach("power-station-reading", JSON.stringify({ arrivalStart, lookStart, scrollStart: top, scrollEnd: await surface.evaluate((el) => el.scrollTop), lastTextVisible: await lastTextVisible(paragraph), recovery, lifecycle: await readingTrace(frame, "power-station-recovery") }));
  if (recordFacility) {
    const start = await act("RECORD OFF", quick("録画停止")); await recording(false);
    await expect(blocks.nth(start + 1)).toHaveText("記録機能を停止しました。");
  }
  for (const [index, short] of BACK.entries()) {
    const command = controls === "classic" ? short : ALIASES[short] ?? short;
    const placeIndex = 5 - index;
    const destination = placeIndex >= 0 ? NAMES[placeIndex] : "ケネディ公園";
    const start = await act(command, controls === "classic" ? undefined : () => page.locator(".compass-exit").filter({ has: page.getByText(short, { exact: true }) }).click());
    if (placeIndex >= 0) await checkPlace(placeIndex, start);
    else await expect(blocks.nth(start + 1)).toHaveText(destination);
    await expect(page.locator(".location-block strong")).toHaveText(destination); await recording(false);
    await expect(presentation).toContainText(facilityJapanese);
  }
  await map(false, recordFacility ? 5 : 4, "power-station-return-map");
  await input.fill("LOOK"); await input.click(); await expect(input).toBeFocused(); await expect(input).toBeInViewport({ ratio: 1 });
  const returnRaw = await canonical.innerText(), returnRequests = await requestCount();
  const returnInputId = turns.at(-1)!.nextInputId, returnHistoryCount = await blocks.count();
  // The revisited park emits its heading only; the last prose is still the
  // earlier facility paragraph. Use the actual final response as the anchor.
  const returnHeading = presentation.locator(".story-presentation-title").last();
  const returnRecovery = [];
  for (const name of ["English", "日本語", "English", "日本語"] as const) {
    await locale(name); await expect(input).toHaveValue("LOOK");
    expect(await requestCount()).toBe(returnRequests);
    const current = (await snapshot()).presentation;
    expect(current.lines[current.activeInput!.line!].id).toBe(returnInputId);
    expect(await canonical.innerText()).toBe(returnRaw);
    const aria = await frame.locator("body").ariaSnapshot();
    if (name === "English") {
      await expect(presentation).toBeHidden(); await expect(canonical).not.toHaveAttribute("aria-hidden", "true");
      expect(aria.split(facilityEnglish).length).toBe(3); expect(aria).not.toContain(facilityJapanese);
      await expect(page.locator(".location-block strong")).toHaveText("Kennedy Park");
    } else {
      await expect(canonical).toHaveAttribute("aria-hidden", "true"); await expect(canonical).toHaveAttribute("inert", "");
      await expect(blocks).toHaveCount(returnHistoryCount);
      expect(aria.split(facilityJapanese).length).toBe(3); expect(aria).not.toContain(facilityEnglish);
      await expect(page.locator(".location-block strong")).toHaveText("ケネディ公園");
      await expect(returnHeading).toHaveText("ケネディ公園");
      await surface.hover(); await page.mouse.wheel(0, await surface.evaluate((el) => el.scrollHeight));
      await expect.poll(() => lastTextVisible(returnHeading)).toBe(true);
    }
    await input.click(); await expect(input).toBeFocused(); await expect(input).toBeInViewport({ ratio: 1 });
    returnRecovery.push({ locale: name, inputId: returnInputId, requests: returnRequests, singleOwner: true });
    await attach(`power-station-return-recovery-${returnRecovery.length}-accessibility`, aria, "text/plain");
    await attach(`power-station-return-recovery-${returnRecovery.length}`, await page.screenshot(), "image/png");
  }
  await attach("power-station-return-reading", JSON.stringify({ recovery: returnRecovery, lastResponse: await returnHeading.innerText(), lastTextVisible: await lastTextVisible(returnHeading), lifecycle: await readingTrace(frame, "power-station-return-recovery") }));
  const trace = await rawTrace();
  const fixture = JSON.parse(await readFile(new URL("../fixtures/parchment-power-station-runtime-observed.json", import.meta.url), "utf8"));
  const requests = trace.requests.slice(1);
  expect(trace.requests[0]).toBe(" ");
  expect(requests.slice(0, 50).map((command, index) => index === 6 ? "<decoder>" : normalize(command))).toEqual(fixture.sessions[0].submittedCommands.slice(0, 50).map((command: string, index: number) => index === 6 ? "<decoder>" : normalize(command)));
  expect(requests).toHaveLength(recordFacility ? 67 : 68);
  expect(turns.map(({ command }) => normalize(command))).toEqual(recordFacility ? [...OUT, "RECORD", "LOOK", "RECORD OFF", ...BACK] : [...OUT.slice(0, 6), "RECORD", "LOOK", "RECORD OFF", "S", "LOOK", ...BACK]);
  const delivered = trace.inputs.slice(2);
  expect(delivered).toHaveLength(requests.length);
  for (const [index, output] of delivered.entries()) {
    expect(output.previousInputId).toBe(trace.inputs[index + 1].inputId);
    expect(output.presentation.lines[0].id).toBe(output.previousInputId);
    expect(output.inputId).not.toBe(output.previousInputId);
    if (index === 6) expect(output.presentation.lines[0].runs.some((run) => run.classes.includes("Style_input") && run.text === requests[index])).toBe(true);
    else expect(output.presentation.lines[0].text.toUpperCase()).toBe(`>${requests[index].toUpperCase()}`);
  }
  for (let i = 1; i < turns.length; i++) expect(turns[i].submittedInputId).toBe(turns[i - 1].nextInputId);
  expect(trace.inputs.at(-1)!.inputId).toBe(turns.at(-1)!.nextInputId);
  expect(JSON.stringify(trace.inputs)).not.toMatch(/Record buffer full|Auto-deactivation|WARNING: Deactivating record feature/i);
  const warnings = trace.inputs.filter(({ presentation: p }) => p.lines.some(({ text }) => text === "WARNING: Record buffer is now half-full."));
  expect(warnings).toHaveLength(1);
  const narrow = page.viewportSize()!.width < 500;
  for (const turn of turns) {
    if (narrow) expect(turn.status).not.toMatch(/Time:|Date:/i);
    else expect(turn.status).toMatch(/Time:[\s\S]*Date:/i);
  }
  await attach("power-station-runtime-observations", JSON.stringify({ provenance: "fresh canonical Release79, existing live bridge observations and actual parent-to-player requests; no VM edits/restores", startedAt, finishedAt: new Date().toISOString(), controls, viewport: page.viewportSize(), recordFacility, trace, powerTurns: turns, warnings, clockLimitation: narrow ? "canonical narrow status emits no clock/date; no time synthesized" : null, finalInputId: turns.at(-1)!.nextInputId, checklist: controls === "classic" ? "not displayed" : recordFacility ? "5/9 auxiliary inference, not original assignment evaluation" : "4/9; entrance recording and unrecorded facility LOOK add no task" }));
  await attach("power-station-return", await page.screenshot(), "image/png");
}

// Synthetic wrapper reports only. Parchment remains at its actual startup;
// none of these messages is a route capture or a saved-game RESTORE.
export async function probePowerStationBoundary(page: Page, testInfo: TestInfo, scenario: "history" | "scope") {
  await page.goto("/");
  await page.getByRole("dialog", { name: /A Mind Forever Voyaging/i }).getByRole("button", { name: /^Begin/ }).click();
  await page.getByRole("button", { name: /Begin the original story/i }).click();
  await expect(page.locator("#command-input")).toBeEnabled();
  const frame = page.frameLocator('iframe[src="/player.html"]');
  await frame.locator("body").evaluate(() => {
    const w = window as typeof window & { powerPost?: typeof window.parent.postMessage };
    w.powerPost = window.parent.postMessage.bind(window.parent);
    window.parent.postMessage = ((data: { type?: string }, origin: string) => {
      if (data.type !== "transcript") w.powerPost?.(data, origin);
    }) as typeof window.parent.postMessage;
  });
  const post = (payload: Record<string, unknown>) => frame.locator("body").evaluate((_body, data) => {
    (window as typeof window & { powerPost?: typeof window.parent.postMessage }).powerPost?.({ channel: "amfv:bridge", ...data }, window.location.origin);
  }, payload);
  const fixture = JSON.parse(await readFile(new URL("../fixtures/parchment-power-station-runtime-observed.json", import.meta.url), "utf8"));
  const english = fixture.sessions[0].observations[55].presentation.lines[2].text as string;
  const japanese = (await approvedCopy()).get(english)!;
  const presentation = frame.locator("#amfv-localized-presentation-host");
  const prose = (text: string) => presentation.locator(".story-presentation-prose").filter({ hasText: text });
  let sequence = 0;
  const unique = (p: BridgePresentation) => {
    const result = structuredClone(p); sequence++;
    result.lines.forEach((line, index) => { line.id = `controlled-power-${sequence}-${index}`; });
    return result;
  };
  const reports: unknown[] = [];
  const report = async (location = "Power Station", year = 2041, prefix = "", p = fixture.sessions[0].observations[55].presentation as BridgePresentation) => {
    const observed = unique(p), raw = observed.lines.map(({ text }) => text).join("\n");
    const command = observed.lines[0].text.replace(/^>/, "");
    await post({ type: "command", command });
    const statusText = `Mode: Simulation Mode Time: 1:00pm Location: ${location} Date: 3/6/${year}`;
    await post({ type: "transcript", text: `${prefix}${raw}`, recentText: raw, statusText, inputKind: "line", acceptsInput: true, presentation: observed });
    reports.push({ location, year, prefix, statusText, presentation: observed });
  };
  const fresh = async (enter = true) => {
    const p = structuredClone(fixture.sessions[0].startup.before.presentation) as BridgePresentation;
    await post({ type: "transcript", text: "Tomorrow never yet.\nHit any key to continue", recentText: "Tomorrow never yet.\nHit any key to continue", statusText: "", inputKind: "char", acceptsInput: true, presentation: p });
    if (enter) { await report("Power Station", 2041, "This simulation is based 10 years hence.\n"); await expect(prose(japanese)).toHaveCount(1); }
  };
  const locale = async (name: "English" | "日本語") => {
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
    await page.locator(".access-panel").getByRole("button", { name, exact: true }).click();
    await page.locator(".interaction-segments button").nth(2).click();
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
  };
  const observed: string[] = [];
  await locale("日本語"); await fresh();
  if (scenario === "history") {
    await report("Power Station", 2051); await expect(prose(english)).toHaveCount(1); await expect(prose(japanese)).toHaveCount(1);
    const long = structuredClone(fixture.sessions[0].observations[55].presentation) as BridgePresentation;
    const template = long.lines[1];
    long.lines = [...Array.from({ length: 100 }, () => [">WAIT", "Time passes..."]).flat().map((text) => ({ ...structuredClone(template), text, runs: [{ text, classes: ["Style_normal"], tag: "span" }] })), long.lines.at(-1)!];
    long.terminalLine = long.lines.length - 1; long.activeInput!.line = long.terminalLine;
    await report("Kennedy Park", 2041, "", long);
    await expect(presentation.locator(".story-presentation-command").last()).toHaveText(/^>\s*WAIT$/);
    await expect(prose("時間が過ぎていく……")).toHaveCount(1);
    await expect(page.locator(".location-block strong")).toHaveText("ケネディ公園");
    await expect(prose(japanese)).toHaveCount(1); await expect(prose(english)).toHaveCount(1);
    for (const name of ["English", "日本語", "English", "日本語"] as const) {
      await locale(name);
      if (name === "日本語") {
        await expect(prose(japanese)).toHaveCount(1);
        await expect(prose(english)).toHaveCount(1);
      } else {
        expect(await frame.locator("body").ariaSnapshot()).not.toContain(japanese);
      }
    }
    observed.push("valid Japanese retained after later-year same leaf, room change, long tail without old passage, locale round trips");
    await post({ type: "command", command: "RESTORE" }); await report();
    await expect(prose(japanese)).toHaveCount(0); await expect(prose(english)).toHaveCount(1);
    await expect(page.locator(".location-block strong")).toHaveText("Power Station");
    observed.push("RESTORE drops old timeline; unknown recovered state receives no new Japanese");
    await fresh(false); await report();
    await expect(prose(japanese)).toHaveCount(0); await expect(prose(english)).toHaveCount(1);
    observed.push("fresh session without observed initial entry does not inherit scope");
  } else {
    for (const [location, year] of [["Unknown Room", 2041], ["Power Station Entrance", 2041], ["Power Station", 2051]] as const) {
      await fresh(); await report(location, year);
      await expect(prose(japanese)).toHaveCount(1); await expect(prose(english)).toHaveCount(1);
      observed.push(`same facility leaf remains English for ${location}/${year}; prior valid entry retained`);
    }
    await fresh();
    await post({ type: "busy" });
    for (const name of ["English", "日本語"] as const) {
      await locale(name);
      for (const button of await page.locator(".quick-actions button, .compass-exit").all()) await expect(button).toBeDisabled();
    }
    await post({ type: "transcript", text: ">LOOK\nPower Station\n>", recentText: ">LOOK\nPower Station\n>", statusText: "Mode: Simulation Mode Location: Power Station Date: 3/6/2041", inputKind: "char", acceptsInput: true });
    await expect(page.locator(".movement-compass, .quick-actions")).toHaveCount(0);
    observed.push("busy disables main controls in EN/JA; character input excludes normal command controls");
    await fresh();
    await post({ type: "transcript", text: ">ABORT\nCommunications Mode\n>", recentText: ">ABORT\nCommunications Mode\n>", statusText: "Mode: Communications Mode", inputKind: "line", acceptsInput: true });
    await report("Power Station", 2041, "This simulation is based 10 years hence.\n");
    await expect(prose(english)).toHaveCount(1); await expect(prose(japanese)).toHaveCount(1);
    await expect(page.locator(".location-block strong")).toHaveText("Power Station");
    observed.push("re-entry does not reactivate initial-2041 copy");
    await fresh(); await report("Power Station", 2041, "* PART II *\n");
    await expect(prose(english)).toHaveCount(1); await expect(prose(japanese)).toHaveCount(1);
    observed.push("Part II receives no new Japanese despite matching year/room/leaf");
    // Restore the real transport before replacing the iframe with QA. Its
    // reports must reach the wrapper from the new active frame, not be dropped
    // by this canonical frame's transcript interceptor.
    await frame.locator("body").evaluate(() => {
      const saved = (window as typeof window & { powerPost?: typeof window.parent.postMessage }).powerPost;
      if (saved) window.parent.postMessage = saved;
    });
    await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
    await page.getByRole("tab", { name: /About|この作品について/, exact: true }).click();
    await page.getByRole("button", { name: "Open spoiler/debug tools" }).click();
    await page.getByRole("button", { name: "Enable spoilers & load QA build" }).click();
    const qa = page.frameLocator('iframe[src*="qa=1"]');
    await expect(qa.locator(".BufferWindowInner")).toContainText("Tomorrow never yet", { timeout: 60_000 });
    // Startup's debounced real report can arrive after the synthetic report.
    // Switch this new active frame to the same controlled-report transport;
    // leave VM output untouched and forward ready/host lifecycle notifications.
    const qaPresentation = unique(fixture.sessions[0].observations[55].presentation);
    await qa.locator("body").evaluate((_body, p) => {
      const nativePost = window.parent.postMessage.bind(window.parent);
      window.parent.postMessage = ((data: { type?: string }, origin: string) => {
        if (data.type !== "transcript") nativePost(data, origin);
      }) as typeof window.parent.postMessage;
      nativePost({ channel: "amfv:bridge", type: "transcript", text: "This simulation is based 10 years hence.\n" + p.lines.map(({ text }) => text).join("\n"), recentText: p.lines.map(({ text }) => text).join("\n"), statusText: "Mode: Simulation Mode Location: Power Station Date: 3/6/2041", inputKind: "line", acceptsInput: true, presentation: p }, window.location.origin);
    }, qaPresentation);
    reports.push({ frame: "noncanonical QA", presentation: qaPresentation });
    await expect(page.locator(".location-block strong")).toHaveText("Power Station");
    expect(await qa.locator("body").ariaSnapshot()).not.toContain(japanese);
    observed.push("noncanonical QA never adopts new canonical-only copy");
  }
  await attachEvidence(testInfo, `power-station-controlled-${scenario}`, JSON.stringify({ provenance: "synthetic controlled wrapper bridge reports only; no VM state/output edits or actual saved-game RESTORE; not natural route evidence", observed, reports }));
  await attachEvidence(testInfo, `power-station-controlled-${scenario}-accessibility`, await page.locator("body").ariaSnapshot(), "text/plain");
  await attachEvidence(testInfo, `power-station-controlled-${scenario}`, await page.screenshot(), "image/png");
}
