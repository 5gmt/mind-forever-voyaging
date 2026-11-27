import { expect, type FrameLocator, type Locator, type Page, type TestInfo } from "@playwright/test";
import { readFile } from "node:fs/promises";
import type { BridgePresentation } from "../../app/story-presentation";
import { acceptCinemaMilestone } from "./cinema-acceptance";
import { attachEvidence } from "./evidence-attachments";
import { clickRouteStep } from "./navigation-acceptance";
import { readingTrace } from "./reading-observations";

type Controls = "classic" | "guided" | "actions";
type RawTurn = { command: string; previousInputId: string; inputId: string; status: string; presentation: BridgePresentation };
type HomeFixture = {
  sessions: [{ submittedCommands: string[]; startup: { before: { presentation: BridgePresentation } }; observations: RawTurn[] }];
  lockedDoorProbe: { observations: RawTurn[] };
};
const homeFixture = async (): Promise<HomeFixture> => JSON.parse(await readFile(new URL("../fixtures/parchment-home-runtime-observed.json", import.meta.url), "utf8"));
const frameSelector = 'iframe[src="/player.html"]';
const destination = "パークビュー・アパートの入口";
const assignment = "自分の家、または居住区を訪れること";
const keyCommand = "OPEN DOOR WITH KEY";
const locations = {
  "Elm & Park": "エルム通りとパーク通り",
  "Southway & Park": "サウスウェイ通りとパーク通り",
  "Parkview Apartments": "パークビュー・アパート",
  "Hall Near Your Apartment": "自宅前の廊下",
  "Living Room": "居間",
  "Kennedy Park": "ケネディ公園",
} as const;
type Location = keyof typeof locations;
const directions: Record<string, string> = { N: "NORTH", S: "SOUTH", E: "EAST", W: "WEST" };
const shorts: Record<string, string> = { NORTH: "N", SOUTH: "S", EAST: "E", WEST: "W" };
const normalize = (command: string) => shorts[command.trim().toUpperCase()] ?? command.trim().toUpperCase();
const rawLocation = (status: string) => status.match(/Location:\s*([\s\S]*?)(?:Date:|$)/i)?.[1].trim();
const capacityFailure = /record buffer (?:is )?full|auto-deactivation|deactivating record feature|not currently active/i;
const readCopy = async () => {
  const packet = await readFile(new URL("../../docs/home-copy-packet.md", import.meta.url), "utf8");
  return new Map(packet.split("\n").filter(line => /^\| \x60[\w-]+\x60 \| \x60(?:S1|S2|P):/.test(line)).flatMap(line => {
    const [, , , english, japanese] = line.split("|").map(cell => cell.trim());
    return japanese.startsWith("\x60") ? [[english.slice(1, -1), japanese.slice(1, -1)] as const] : [];
  }));
};

const keyLabel = (room: "building" | "apartment", language: "日本語" | "English") => language === "日本語"
  ? room === "building" ? "建物入口の扉を鍵で開ける" : "住居の扉を鍵で開ける"
  : room === "building" ? "Open the building entrance door with a key" : "Open the apartment door with a key";
const keyPanel = (page: Page, other = false) => page.locator(other ? ".companion-panel" : ".command-deck").locator(".scene-home");
const settingsButton = (page: Page) => page.getByTitle(/Reading and play settings|読書とプレイの設定/);
const mapButton = (page: Page) => page.locator(".compact-map-button");
const drawer = (page: Page) => page.locator(".fieldwork-drawer");
const sendButton = (page: Page) => page.getByRole("button", { name: /^(送信|SEND)/ });
const quickAction = (page: Page, name: string) => page.locator(".quick-actions").getByRole("button", { name, exact: true });

async function readLivePlace(page: Page, place: string, lang: "en" | "ja", year: number) {
  const announcement = page.locator('.screen-reader-status[aria-live="polite"][aria-hidden="false"]');
  await expect(announcement).toHaveText(`Simulation Mode. ${place} ${year}`);
  await expect(announcement.locator(":scope > span")).toHaveAttribute("lang", "en");
  await expect(announcement.getByText(place, { exact: true })).toHaveAttribute("lang", lang);
  return announcement.evaluate(element => element.outerHTML);
}

async function openCompanion(page: Page, explore: boolean) {
  await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
  if (explore) await page.getByRole("tab", { name: /^(探索|Explore)$/ }).click();
}
async function closeCompanion(page: Page) {
  await page.locator(".close-context").click();
  const panel = page.locator(".companion-panel");
  await expect(panel).toHaveAttribute("aria-hidden", "true");
  await expect(panel).toHaveCSS("opacity", "0");
  await panel.evaluate(async el => { await Promise.all(el.getAnimations().map(animation => animation.finished.catch(() => {}))); });
}

async function assertBrief(page: Page, count: number, preservePrior: boolean) {
  const brief = drawer(page).locator(".fieldwork-checklist");
  if (page.viewportSize()!.width < 500) await drawer(page).getByRole("tab", { name: /^要項/ }).click();
  await expect(brief.locator(".checklist-heading strong")).toHaveText(`9件中${count}件を録画`);
  const tasks = brief.locator("li");
  const home = tasks.nth(8);
  await expect(home.locator("strong")).toHaveText(assignment);
  await expect(home.locator("small span")).toHaveText(destination);
  await expect(home.locator("small span")).toHaveAttribute("lang", "ja");
  await expect(tasks.nth(4)).not.toHaveClass(/complete/);
  if (preservePrior) for (const i of [0, 1, 2, 3, 5, 6, 7]) await expect(tasks.nth(i)).toHaveClass(/complete/);
  if (count === 8) await expect(home).toHaveClass(/complete/);
  else await expect(home).not.toHaveClass(/complete/);
  await home.scrollIntoViewIfNeeded();
  await expect(home).toBeInViewport({ ratio: 1 });
  await expect.poll(async () => (await readingLine(home.locator("strong"))).visible).toBe(true);
  return readingLine(home.locator("strong"));
}

const readingLine = (anchor: Locator) => anchor.evaluate(element => {
  const range = document.createRange(); range.selectNodeContents(element);
  const last = [...range.getClientRects()].at(-1);
  const clip = { top: 0, bottom: innerHeight, left: 0, right: innerWidth };
  for (let node: Element | null = element; node; node = node.parentElement) {
    const css = getComputedStyle(node), rect = node.getBoundingClientRect();
    if (/hidden|clip|auto|scroll/.test(css.overflowY)) {
      clip.top = Math.max(clip.top, rect.top + node.clientTop);
      clip.bottom = Math.min(clip.bottom, rect.top + node.clientTop + node.clientHeight);
    }
    if (/hidden|clip|auto|scroll/.test(css.overflowX)) {
      clip.left = Math.max(clip.left, rect.left + node.clientLeft);
      clip.right = Math.min(clip.right, rect.left + node.clientLeft + node.clientWidth);
    }
  }
  const { fontSize, lineHeight } = getComputedStyle(element);
  return { visible: Boolean(last && last.top >= clip.top && last.bottom <= clip.bottom && last.left >= clip.left && last.right <= clip.right),
    last: last?.toJSON(), clip, fontSize, lineHeight };
});

const activeId = (p: BridgePresentation) => p.activeInput?.kind === "line" && p.activeInput.line !== null ? p.lines[p.activeInput.line]?.id : undefined;
function sliceTurn(command: string, previousInputId: string, p: BridgePresentation, status: string): RawTurn {
  const first = p.lines.findIndex(line => line.id === previousInputId);
  const inputId = activeId(p);
  expect(first).toBeGreaterThanOrEqual(0);
  expect(inputId).toBeTruthy();
  expect(inputId).not.toBe(previousInputId);
  expect(p.activeInput!.line).toBe(p.terminalLine);
  return { command, previousInputId, inputId: inputId!, status, presentation: { ...p, lines: p.lines.slice(first),
    terminalLine: p.terminalLine - first, activeInput: { ...p.activeInput!, line: p.activeInput!.line! - first } } };
}

export async function acceptHomeMilestone(page: Page, controls: Controls, testInfo: TestInfo, recordHome = true) {
  const startedAt = new Date().toISOString();
  const { frame, presentation, canonical, input, blocks, send, locale, snapshot, rawTrace } = await acceptCinemaMilestone(page, controls, testInfo, true);
  const fixture = await homeFixture(), copy = await readCopy(), assisted = controls !== "classic";
  const turns: RawTurn[] = [];
  const beforeHome = await rawTrace();
  expect(beforeHome.requests).toHaveLength(97);
  const prefixInputId = activeId((await snapshot()).presentation)!;

  const act = async (command: string, place: Location, recording: boolean, trigger?: () => Promise<void>) => {
    const prior = activeId((await snapshot()).presentation)!;
    const requestCount = (await rawTrace()).requests.length;
    const blockStart = await send(command, trigger);
    const { presentation: p, status } = await snapshotProbe(frame);
    const actual = (await rawTrace()).requests;
    expect(actual).toHaveLength(requestCount + 1);
    expect(actual.at(-1)!.toUpperCase()).toBe(command.toUpperCase());
    const turn = sliceTurn(actual.at(-1)!, prior, p, status);
    expect(turn.presentation.lines[0].text.toUpperCase()).toBe(`>${command.toUpperCase()}`);
    expect(rawLocation(status)).toBe(place);
    expect(/\(recording\)/i.test(status)).toBe(recording);
    expect(turn.presentation.lines.at(-1)!.text.trim()).toBe(">");
    await expect(page.locator(".location-block strong")).toHaveText(locations[place]);
    await expect(page.locator(".location-block strong")).toHaveAttribute("lang", "ja");
    const response = turn.presentation.lines.slice(1, -1);
    const responseText = response.map(line => line.text);
    expect(responseText.join("\n")).not.toMatch(capacityFailure);
    const acknowledgement = { [keyCommand]: "The door opens.", RECORD: "Record feature activated.", "RECORD OFF": "Record feature deactivated." }[command];
    if (acknowledgement) expect(responseText).toContain(acknowledgement);
    for (const [i, line] of response.entries()) {
      const block = blocks.nth(blockStart + i + 1), translated = copy.get(line.text);
      if (translated) {
        await expect(block).toHaveText(translated);
        expect(await block.evaluate(el => el.closest("[lang]")?.getAttribute("lang"))).toBe("ja");
      } else if (!line.text.trim()) await expect(block).toHaveClass("story-presentation-spacer");
      else { await expect(block).toHaveText(line.text); await expect(block).toHaveAttribute("lang", "en"); }
    }
    turns.push(turn);
    return { turn, blockStart };
  };

  const inspectMap = async (atEntrance: boolean, count: number, stage: string) => {
    if (!assisted) {
      await expect(page.locator(".compact-map-button, .fieldwork-checklist, .scene-home")).toHaveCount(0);
      return;
    }
    const { requests } = await rawTrace(), id = activeId((await snapshot()).presentation);
    await expect(mapButton(page).locator("small")).toHaveText(`${count}/9 録画`);
    await mapButton(page).click();
    const map = drawer(page).locator(".rockvil-navigator");
    const hotspot = map.getByRole("button", { name: `${destination}、調査目的地${atEntrance ? "、現在地" : ""}`, exact: true });
    await expect(hotspot).toHaveAttribute("lang", "ja");
    await hotspot.click();
    await expect(map.locator(".navigator-route strong")).toHaveText(destination);
    if (atEntrance) await expect(map.locator(".navigator-route small")).toHaveText("建物の入口に着きました。");
    if (stage === "entrance") {
      await attachEvidence(testInfo, "home-entrance-map-accessibility", await drawer(page).ariaSnapshot(), "text/plain");
      await attachEvidence(testInfo, "home-entrance-map", await page.screenshot(), "image/png");
    }
    const finalTask = await assertBrief(page, count, true);
    const open = await drawer(page).evaluate(el => ({ view: el.getAttribute("data-fieldwork-view"),
      focusInside: el.contains(document.activeElement), focusedText: document.activeElement?.getAttribute("aria-label") }));
    if (stage === "return") {
      await attachEvidence(testInfo, "home-return-brief-accessibility", await drawer(page).ariaSnapshot(), "text/plain");
      await attachEvidence(testInfo, "home-return-brief", await page.screenshot(), "image/png");
    }
    await drawer(page).locator(".fieldwork-close").click();
    await expect(mapButton(page)).toBeFocused();
    expect((await rawTrace()).requests).toEqual(requests);
    expect(activeId((await snapshot()).presentation)).toBe(id);
    return { open, finalTask, launcherFocusedAfterClose: true };
  };

  const inspectKeys = async (room: "building" | "apartment") => {
    if (!assisted) { await expect(page.locator(".scene-home")).toHaveCount(0); return; }
    const id = activeId((await snapshot()).presentation), { requests } = await rawTrace();
    for (const language of ["English", "日本語"] as const) {
      await locale(language);
      for (const other of [false, true]) {
        if (other) await openCompanion(page, true);
        const region = keyPanel(page, other);
        await expect(region).toHaveAttribute("lang", language === "English" ? "en" : "ja");
        await expect(region.getByRole("button", { name: keyLabel(room, language), exact: true })).toBeEnabled();
        await expect(region.getByRole("button")).toHaveCount(1);
        const instructions = controls === "guided"
          ? language === "English" ? "Choose an action to draft a command you can edit before sending." : "操作を選ぶと英語のコマンドを入力欄に用意します。編集してから送信できます。"
          : language === "English" ? "Choose an action to send its command once." : "操作を選ぶと、そのコマンドを1回送信します。";
        await expect(region.locator(".scene-actions-heading small")).toHaveText(instructions);
        await attachEvidence(testInfo, `home-${room}-${language === "English" ? "en" : "ja"}-${other ? "companion" : "main"}-accessibility`, await region.ariaSnapshot(), "text/plain");
        if (other) await closeCompanion(page);
      }
    }
    expect(activeId((await snapshot()).presentation)).toBe(id);
    expect((await rawTrace()).requests).toEqual(requests);
  };

  const operateKey = (room: "building" | "apartment") => assisted ? async () => {
    const other = room === "apartment";
    const { requests } = await rawTrace(), id = activeId((await snapshot()).presentation);
    if (other) await openCompanion(page, true);
    await keyPanel(page, other).getByRole("button", { name: keyLabel(room, "日本語"), exact: true }).click();
    if (controls === "guided") {
      await expect(input).toHaveValue(keyCommand);
      await expect(input).toBeFocused();
      expect((await rawTrace()).requests).toEqual(requests);
      expect(activeId((await snapshot()).presentation)).toBe(id);
      if (other) await closeCompanion(page);
      await input.fill(keyCommand + " ");
      await expect(input).toHaveValue(keyCommand + " ");
      await sendButton(page).click();
    } else if (other) await closeCompanion(page);
  } : undefined;

  const quick = (name: string) => assisted ? () => quickAction(page, name).click() : undefined;
  const compass = (short: string) => assisted ? () => page.locator(".compass-exit").filter({ has: page.getByText(short, { exact: true }) }).click() : undefined;
  const direction = (short: string) => assisted ? directions[short] ?? short : short;
  for (const [short, place] of [["SW", "Elm & Park"], ["S", "Southway & Park"], ["W", "Parkview Apartments"]] as const) {
    const command = direction(short);
    await act(command, place, false, assisted ? () => clickRouteStep(page, input, controls, command, destination) : undefined);
    if (controls === "actions") await expect(mapButton(page)).toBeFocused();
  }
  await inspectMap(true, 7, "entrance");
  await inspectKeys("building");
  if (assisted) {
    await page.getByTitle("オリジナルの付属資料を開く").click();
    const originalMap = page.locator(".package-overlay");
    await expect(originalMap.getByRole("img")).toBeVisible();
    await expect(originalMap.locator(".map-hotspots")).toHaveCount(0);
    await originalMap.getByRole("button", { name: "付属資料を閉じる", exact: true }).click();
  }
  await act(keyCommand, "Parkview Apartments", false, operateKey("building"));
  await act("IN", "Hall Near Your Apartment", false, compass("IN"));
  await inspectKeys("apartment");
  await act(keyCommand, "Hall Near Your Apartment", false, operateKey("apartment"));
  await act(direction("N"), "Living Room", false, compass("N"));
  if (recordHome) await act("RECORD", "Living Room", true, quick("録画開始"));
  const read = await act("LOOK", "Living Room", recordHome, quick("見る"));
  const requiredLiving = fixture.sessions[0].observations[103].presentation.lines.slice(1, 5).map(line => line.text);
  expect(read.turn.presentation.lines.slice(1, 5).map(line => line.text)).toEqual(requiredLiving);
  const lastBody = read.turn.presentation.lines.findLastIndex((line, i, all) => i < all.length - 1 && Boolean(line.text.trim()));
  const lastHomeLine = read.turn.presentation.lines[lastBody].text;
  await expect(page.locator(".scene-home")).toHaveCount(0);

  const recoverReading = async (stage: "living-room" | "return", anchor: Locator, english: string, count: number) => {
    const { requests } = await rawTrace(), id = activeId((await snapshot()).presentation);
    const raw = await canonical.innerText(), historyCount = await blocks.count();
    const evidence: unknown[] = [];
    await input.fill("LOOK");
    const localized = copy.get(english) ?? english;
    const englishLine = canonical.locator(".BufferLine").filter({ hasText: english }).last();

    // Compare the actual metrics of the existing reading sizes at each checkpoint.
    await settingsButton(page).click();
    const settings = page.locator(".access-panel");
    await settings.getByRole("button", { name: "S", exact: true }).click();
    await expect.poll(async () => (await readingLine(anchor)).fontSize).toBe("15px");
    const small = await readingLine(anchor);
    await settings.getByRole("button", { name: "L", exact: true }).click();
    await expect.poll(async () => (await readingLine(anchor)).fontSize).toBe("20px");
    const large = await readingLine(anchor);
    expect(parseFloat(large.fontSize)).toBeGreaterThan(parseFloat(small.fontSize));
    expect(parseFloat(large.lineHeight)).toBeGreaterThan(parseFloat(small.lineHeight));
    await settings.getByRole("button", { name: "M", exact: true }).click();
    await settingsButton(page).click();

    for (const language of ["English", "日本語", "English", "日本語"] as const) {
      await locale(language);
      await expect(input).toHaveValue("LOOK");
      const japanese = language === "日本語";
      const end = japanese ? anchor : englishLine;
      const surface = japanese ? presentation.locator(".story-presentation-scroll") : frame.locator("#windowport .BufferWindow");
      const measure = async () => ({
        lastLine: await readingLine(end),
        scroll: await surface.evaluate(el => ({ top: el.scrollTop, height: el.clientHeight, total: el.scrollHeight })),
        input: await input.evaluate(el => ({ focused: document.activeElement === el, box: el.getBoundingClientRect().toJSON() })),
        panels: await page.locator(".companion-panel").evaluate(el => ({ hidden: el.getAttribute("aria-hidden"),
          opacity: getComputedStyle(el).opacity, animations: el.getAnimations().filter(a => a.playState !== "finished").length })),
      });
      const follow = async () => {
        await surface.evaluate(el => { el.scrollTop = el.scrollHeight; });
        await expect.poll(async () => (await readingLine(end)).visible).toBe(true);
      };
      await follow();
      const before = await measure();
      await surface.evaluate(el => { el.scrollTop = Math.max(0, el.scrollTop - el.clientHeight); });
      await expect.poll(() => surface.evaluate(el => el.scrollTop)).toBeLessThan(before.scroll.top);
      const manual = await measure();
      await openCompanion(page, assisted);
      const companionOpen = await page.locator(".companion-panel").ariaSnapshot();
      await closeCompanion(page);
      const drawerObservation = japanese ? await inspectMap(false, count, stage === "return" && evidence.length === 3 ? "return" : "reading") : null;
      const afterPanels = await measure();
      await follow();
      await input.click();
      await expect(input).toBeFocused();
      await expect(input).toBeInViewport({ ratio: 1 });
      if (japanese) {
        await expect(presentation).toHaveAttribute("lang", "ja");
        await expect(canonical).toHaveAttribute("aria-hidden", "true");
        await expect(canonical).toHaveAttribute("inert", "");
        await expect(blocks).toHaveCount(historyCount);
        await expect(presentation.locator(".story-presentation-active-prompt")).toHaveCount(1);
      } else {
        await expect(presentation).toBeHidden();
        await expect(canonical).not.toHaveAttribute("aria-hidden", "true");
      }
      const checkpoint: string = `home-${stage}-reading-${evidence.length + 1}`;
      const beforeScreenshot = await measure();
      expect(beforeScreenshot.lastLine.visible).toBe(true);
      expect(beforeScreenshot.input.focused).toBe(true);
      expect(beforeScreenshot.panels).toEqual({ hidden: "true", opacity: "0", animations: 0 });
      const aria = await frame.locator("body").ariaSnapshot();
      // The native status grid remains English in either locale. Compare
      // owners within the story buffer while retaining full frame evidence.
      const storyAria = await frame.locator("#windowport .BufferWindow").ariaSnapshot();
      const accessible = storyAria.replace(/\\"/g, '"');
      expect(accessible).toContain(japanese ? localized : english);
      if (english !== localized) expect(accessible).not.toContain(japanese ? english : localized);
      const lifecycle = await readingTrace(frame, checkpoint), png = await page.screenshot(), afterScreenshot = await measure();
      expect(afterScreenshot).toEqual(beforeScreenshot);
      expect((await rawTrace()).requests).toEqual(requests);
      expect(activeId((await snapshot()).presentation)).toBe(id);
      expect(await canonical.innerText()).toBe(raw);
      evidence.push({ checkpoint, language, id, before, manual, companionOpen, drawerObservation, afterPanels, beforeScreenshot, afterScreenshot, lifecycle });
      await attachEvidence(testInfo, checkpoint + "-accessibility", aria, "text/plain");
      await attachEvidence(testInfo, checkpoint, png, "image/png");
    }
    await attachEvidence(testInfo, `home-${stage}-reading`, JSON.stringify({ small, large, evidence }));
    await input.fill("");
  };

  await recoverReading("living-room", blocks.nth(read.blockStart + lastBody), lastHomeLine, 7);
  if (recordHome) await act("RECORD OFF", "Living Room", false, quick("録画停止"));
  await inspectMap(false, recordHome ? 8 : 7, "living-room-after-off");
  for (const [short, place] of [["S", "Hall Near Your Apartment"], ["E", "Parkview Apartments"], ["E", "Southway & Park"], ["N", "Elm & Park"], ["NE", "Kennedy Park"]] as const) {
    await act(direction(short), place, false, compass(short));
    await expect(presentation).toContainText(copy.get(requiredLiving[3])!);
  }
  const final = turns.at(-1)!;
  const finalLeaf = final.presentation.lines.findLastIndex((line, i, array) => i < array.length - 1 && Boolean(line.text.trim()));
  await recoverReading("return", blocks.nth(await blocks.count() - (final.presentation.lines.length - 1 - finalLeaf)), final.presentation.lines[finalLeaf].text, recordHome ? 8 : 7);

  const trace = await rawTrace(), actual = trace.requests.slice(1);
  const expected = fixture.sessions[0].submittedCommands.filter((_, i) => recordHome || (i !== 103 && i !== 105));
  expect(actual).toHaveLength(recordHome ? 111 : 109);
  expect(actual.map((command, i) => i === 6 ? "<decoder>" : normalize(command)))
    .toEqual(expected.map((command, i) => i === 6 ? "<decoder>" : normalize(command)));
  expect(trace.requests[0]).toBe(" ");
  expect(turns[0].previousInputId).toBe(prefixInputId);
  const inputs = trace.inputs.slice(2);
  expect(inputs).toHaveLength(actual.length);
  for (const [i, output] of inputs.entries()) {
    expect(output.previousInputId).toBe(trace.inputs[i + 1].inputId);
    expect(output.presentation.lines[0].id).toBe(output.previousInputId);
    expect(output.inputId).not.toBe(output.previousInputId);
    if (i === 6) expect(output.presentation.lines[0].runs.some(run => run.classes.includes("Style_input") && run.text === actual[i])).toBe(true);
    else expect(output.presentation.lines[0].text.toUpperCase()).toBe(`>${actual[i].toUpperCase()}`);
  }
  const warnings = inputs.flatMap(({ presentation }) => presentation.lines.filter(line => /^WARNING:/i.test(line.text)).map(line => line.text));
  expect(warnings).toContain("WARNING: Record buffer is now half-full.");
  expect(JSON.stringify(inputs)).not.toMatch(capacityFailure);
  const narrow = page.viewportSize()!.width < 500;
  if (narrow) expect(turns.every(turn => !/Time:|Date:/i.test(turn.status))).toBe(true);
  await attachEvidence(testInfo, "home-runtime-observations", JSON.stringify({ provenance: "fresh Release 79, observed live bridge v3 and actual commands", startedAt,
    finishedAt: new Date().toISOString(), controls, viewport: page.viewportSize(), recordHome, prefixInputId, trace, turns, warnings,
    clock: narrow ? "The narrow window emits no time or date." : "Raw time/date in turn status.", checklist: assisted ? recordHome ? 8 : 7 : null }));
}


async function beginHomeProbe(page: Page) {
  await page.goto("/");
  await page.getByRole("dialog", { name: /A Mind Forever Voyaging/i }).getByRole("button", { name: /^Begin/ }).click();
  const begin = page.getByRole("button", { name: /Begin the original story/ });
  await expect(begin).toBeEnabled();
  await settingsButton(page).click();
  const settings = page.locator(".access-panel");
  await settings.getByRole("button", { name: "Action menus", exact: true }).click();
  await settings.getByRole("button", { name: "日本語", exact: true }).click();
  await settingsButton(page).click();
  await page.getByRole("button", { name: /原作を始める/ }).click();
  await expect(page.locator("#command-input")).toBeEnabled();
  return page.frameLocator(frameSelector);
}

const snapshotProbe = (frame: FrameLocator) => frame.locator("body").evaluate(() => {
  const bridge = (window as typeof window & { AMFVPresentationBridge: { extract: (doc: Document, style: typeof getComputedStyle) => BridgePresentation } }).AMFVPresentationBridge;
  return { presentation: bridge.extract(document, getComputedStyle),
    status: [...document.querySelectorAll<HTMLElement>("#windowport .GridWindow")].map(grid => grid.textContent ?? "").join("\n") };
});

export async function probeUnrecordedLivingRoom(page: Page, testInfo: TestInfo) {
  await page.addInitScript(() => {
    const state = window as typeof window & { homeRequests?: string[] }; state.homeRequests = [];
    window.addEventListener("message", event => {
      if (window !== parent && event.source === parent && event.origin === location.origin
        && event.data?.channel === "amfv:bridge" && event.data.type === "command") state.homeRequests!.push(event.data.command);
    });
  });
  const frame = await beginHomeProbe(page);
  const input = page.locator("#command-input");
  const turns: RawTurn[] = [];
  const requests = () => frame.locator("body").evaluate(() => (window as typeof window & { homeRequests: string[] }).homeRequests);
  const send = async (command: string, trigger?: () => Promise<void>, decoder = false) => {
    await expect.poll(async () => activeId((await snapshotProbe(frame)).presentation)).toBeTruthy();
    const prior = activeId((await snapshotProbe(frame)).presentation)!;
    const count = (await requests()).length;
    if (trigger) await trigger();
    else { await input.fill(command); await sendButton(page).click(); }
    await expect.poll(async () => { const id = activeId((await snapshotProbe(frame)).presentation); return Boolean(id && id !== prior); }).toBe(true);
    await expect.poll(async () => (await requests()).length).toBe(count + 1);
    const snap = await snapshotProbe(frame);
    const turn = sliceTurn(command, prior, snap.presentation, snap.status);
    expect((await requests()).at(-1)!.toUpperCase()).toBe(command.toUpperCase());
    const echo = turn.presentation.lines[0];
    if (decoder) expect(echo.runs.some(run => run.classes.includes("Style_input") && run.text === command)).toBe(true);
    else expect(echo.text.toUpperCase()).toBe(`>${command.toUpperCase()}`);
    turns.push(turn);
    return turn;
  };
  const fixture = await homeFixture();
  for (const command of fixture.sessions[0].submittedCommands.slice(0, 6)) await send(command);
  const button = page.locator(".security-decoder").getByRole("button", { name: /コード \d+ を送信/ });
  const number = (await button.innerText()).match(/\b\d+\b/)![0];
  await send(number, () => button.click(), true);

  const bridge = [
    ["SW", "Elm & Park", false],
    ["S", "Southway & Park", false],
    ["W", "Parkview Apartments", false],
    ["IN", "Parkview Apartments", false, "The door to the inner lobby is locked."],
    ["RECORD", "Parkview Apartments", true, "Record feature activated."],
    [keyCommand, "Parkview Apartments", true, "The door opens."],
    ["IN", "Hall Near Your Apartment", true],
    ["LOOK", "Hall Near Your Apartment", true],
    ["RECORD OFF", "Hall Near Your Apartment", false, "Record feature deactivated."],
    ["N", "Hall Near Your Apartment", false, "The door is closed."],
    [keyCommand, "Hall Near Your Apartment", false, "The door opens."],
    ["N", "Living Room", false],
    ["LOOK", "Living Room", false],
  ] as const;
  for (const [command, place, recording, expectedText] of bridge) {
    let trigger: (() => Promise<void>) | undefined;
    if (command === keyCommand) {
      const room = place === "Parkview Apartments" ? "building" : "apartment";
      trigger = () => keyPanel(page).getByRole("button", { name: keyLabel(room, "日本語"), exact: true }).click();
    }
    const turn = await send(command, trigger), raw = turn.presentation.lines.map(line => line.text);
    expect(rawLocation(turn.status)).toBe(place);
    expect(/\(recording\)/i.test(turn.status)).toBe(recording);
    expect(raw.at(-1)?.trim()).toBe(">");
    expect(raw.join("\n")).not.toMatch(capacityFailure);
    if (expectedText) expect(raw).toContain(expectedText);
  }
  const expectedLiving = fixture.sessions[0].observations[103].presentation.lines.slice(1, 5).map(line => line.text);
  expect(turns.at(-1)!.presentation.lines.slice(1, 5).map(line => line.text)).toEqual(expectedLiving);
  const liveAnnouncements = [await readLivePlace(page, "居間", "ja", 2041)];
  for (const [language, place, lang] of [["English", "Living Room", "en"], ["日本語", "居間", "ja"]] as const) {
    await settingsButton(page).click();
    await page.locator(".access-panel").getByRole("button", { name: language, exact: true }).click();
    await settingsButton(page).click();
    liveAnnouncements.push(await readLivePlace(page, place, lang, 2041));
    expect(rawLocation((await snapshotProbe(frame)).status)).toBe("Living Room");
  }
  const commands = await requests();
  expect(commands).toEqual([" ", ...turns.map(turn => turn.command)]);
  for (const [i, turn] of turns.entries()) if (i > 0) expect(turn.previousInputId).toBe(turns[i - 1].inputId);
  await expect(mapButton(page).locator("small")).toHaveText("0/9 録画");
  await mapButton(page).click();
  await assertBrief(page, 0, false);
  await attachEvidence(testInfo, "home-entry-hall-only", JSON.stringify({ provenance: "fresh canonical Release 79, short negative with two actual closed-door refusals", commands, turns, liveAnnouncements }));
  await attachEvidence(testInfo, "home-entry-hall-only-accessibility", await drawer(page).ariaSnapshot(), "text/plain");
  await attachEvidence(testInfo, "home-entry-hall-only", await page.screenshot(), "image/png");
  await drawer(page).locator(".fieldwork-close").click();
  await expect(mapButton(page)).toBeFocused();
}

export async function probeHomeBoundary(page: Page, testInfo: TestInfo, scenario: "history" | "guards" | "recording") {
  const frame = await beginHomeProbe(page);
  await frame.locator("body").evaluate(() => {
    const w = window as typeof window & { homePost?: typeof window.parent.postMessage };
    const native = window.parent.postMessage.bind(window.parent);
    w.homePost = native;
    window.parent.postMessage = ((message: { type?: string }, origin: string) => {
      if (message.type !== "transcript") native(message, origin);
    }) as typeof window.parent.postMessage;
  });
  const post = (payload: Record<string, unknown>) => frame.locator("body").evaluate((_body, data) => {
    (window as typeof window & { homePost?: typeof window.parent.postMessage }).homePost?.({ channel: "amfv:bridge", ...data }, location.origin);
  }, payload);
  const fixture = await homeFixture(), copy = await readCopy();
  const observed = fixture.sessions[0].observations;
  const [entrance, firstDoor, hall, secondDoor, entry, on, look, off, , , , , park] = observed.slice(97, 110).map(turn => turn.presentation);
  const host = frame.locator("#amfv-localized-presentation-host");
  const input = page.locator("#command-input");
  const rawBody = look.lines[2].text, jaBody = copy.get(rawBody)!;
  let sequence = 0;
  const reports: unknown[] = [];
  const liveAnnouncements: string[] = [];
  const unique = (p: BridgePresentation) => {
    const observation = structuredClone(p); sequence++;
    observation.lines.forEach((line, index) => { line.id = `home-probe-${sequence}-${index}`; });
    return observation;
  };
  type ReportOptions = { place?: Location; year?: number; recording?: boolean; kind?: string; ready?: boolean; status?: string; noPresentation?: boolean; reuse?: boolean; prefix?: string };
  const report = async (p: BridgePresentation, options: ReportOptions = {}) => {
    const current = options.reuse ? p : unique(p);
    const raw = current.lines.map(line => line.text).join("\n");
    const payload = { type: "transcript", text: (options.prefix ?? "") + raw, recentText: raw,
      statusText: options.status ?? `Mode: Simulation Mode${options.recording ? " (recording)" : ""} Location: ${options.place ?? "Living Room"} Date: 6/2/${options.year ?? 2041}`,
      presentation: options.noPresentation ? undefined : current, inputKind: options.kind ?? "line", acceptsInput: options.ready ?? true };
    await post({ type: "command", command: current.lines[0].text.slice(1) });
    await post(payload);
    reports.push(payload);
    return current;
  };
  const fresh = async () => {
    const opening = { type: "transcript", text: "Tomorrow never yet.\nHit any key to continue", recentText: "Tomorrow never yet.\nHit any key to continue",
      statusText: "", inputKind: "char", acceptsInput: true, presentation: unique(fixture.sessions[0].startup.before.presentation) };
    await post(opening);
    reports.push(opening);
    await report(entrance, { place: "Parkview Apartments", prefix: "This simulation is based 10 years hence.\n" });
  };
  const settings = async (language: "English" | "日本語", mode?: Controls) => {
    await settingsButton(page).click();
    const panel = page.locator(".access-panel");
    await panel.getByRole("button", { name: language, exact: true }).click();
    if (mode) await panel.locator(".interaction-segments button").nth(["classic", "guided", "actions"].indexOf(mode)).click();
    await settingsButton(page).click();
  };
  const verifyKeys = async (room: "building" | "apartment" | null, disabled = false, explore = true) => {
    for (const other of [false, true]) {
      if (other) await openCompanion(page, explore);
      const keys = keyPanel(page, other);
      await expect(keys).toHaveCount(room ? 1 : 0);
      if (room) {
        const button = keys.getByRole("button", { name: keyLabel(room, "日本語"), exact: true });
        if (disabled) await expect(button).toBeDisabled(); else await expect(button).toBeEnabled();
      }
      if (other) await closeCompanion(page);
    }
  };
  const progress = async (count: number) => {
    await expect(mapButton(page).locator("small")).toHaveText(new RegExp(`^${count}/9 (録画|recorded)$`));
    await mapButton(page).click();
    const task = drawer(page).locator(".fieldwork-checklist li").nth(8);
    if (count === 1) await expect(task).toHaveClass(/complete/); else await expect(task).not.toHaveClass(/complete/);
    await drawer(page).locator(".fieldwork-close").click();
  };
  const qualifiedProse = () => host.getByText(jaBody, { exact: true });

  await fresh();
  if (scenario === "history") {
    await report(firstDoor, { place: "Parkview Apartments" });
    await expect(host.getByText("扉が開く。", { exact: true })).toHaveCount(1);
    await report(secondDoor, { place: "Hall Near Your Apartment" });
    await expect(host.getByText("扉が開く。", { exact: true })).toHaveCount(2);
    await report(look);
    await expect(qualifiedProse()).toHaveCount(1);
    await report(look, { place: "Kennedy Park" });
    await expect(qualifiedProse()).toHaveCount(1);
    await expect(host.getByText(rawBody, { exact: false })).toHaveAttribute("lang", "en");
    await report(look, { year: 2051 });
    await expect(qualifiedProse()).toHaveCount(1);
    liveAnnouncements.push(await readLivePlace(page, "Living Room", "en", 2051));
    const surface = host.locator(".story-presentation-scroll");
    const tail = unique(park);
    tail.lines.splice(1, 0, ...Array.from({ length: 90 }, (_, i) => ({ ...tail.lines[1], id: `rolling-${i}`, text: "Time passes..." })));
    tail.terminalLine = tail.activeInput!.line = tail.lines.length - 1;
    await report(tail, { place: "Kennedy Park" });
    await expect(qualifiedProse()).toHaveCount(1);
    await surface.evaluate(el => { el.scrollTop = 0; el.dispatchEvent(new Event("scroll")); });
    await report(park, { place: "Kennedy Park" });
    await expect.poll(() => surface.evaluate(el => el.scrollTop)).toBe(0);
    for (const language of ["English", "日本語", "English", "日本語"] as const) await settings(language);
    await expect(qualifiedProse()).toHaveCount(1);
    await post({ type: "command", command: "RESTORE" });
    await report(look);
    await expect(qualifiedProse()).toHaveCount(0);
    await expect(host.getByText(rawBody, { exact: false })).toHaveAttribute("lang", "en");
    liveAnnouncements.push(await readLivePlace(page, "Living Room", "en", 2041));
    await fresh(); await report(entry); await expect(qualifiedProse()).toHaveCount(1);
    await report(look, { prefix: "* PART II *\n" }); await expect(qualifiedProse()).toHaveCount(1);
  } else if (scenario === "guards") {
    for (const mode of ["guided", "actions"] as const) {
      await settings("日本語", mode);
      await fresh(); await verifyKeys("building");
      await report(hall, { place: "Hall Near Your Apartment" }); await verifyKeys("apartment");
      const generic = page.locator(".command-deck").getByRole("button", { name: mode === "guided" ? /^door\s*Open$/ : "Open", exact: true });
      await expect(generic.first()).toBeVisible();
      await report(hall, { place: "Hall Near Your Apartment", ready: false }); await verifyKeys("apartment", true);
      await report(hall, { place: "Hall Near Your Apartment", kind: "char" }); await verifyKeys(null);
      await report(hall, { place: "Hall Near Your Apartment", kind: "unknown" }); await verifyKeys(null);
      await report(hall, { place: "Hall Near Your Apartment", noPresentation: true }); await verifyKeys(null);
      await report(hall, { status: "Mode: Simulation Mode Date: 6/2/2041" }); await verifyKeys(null);
      await report(hall, { place: "Kennedy Park" }); await verifyKeys(null);
      await report(hall, { place: "Hall Near Your Apartment", year: 2051 }); await verifyKeys(null, false, true);
    }
    await settings("日本語", "classic"); await fresh(); await verifyKeys(null, false, false);
    await settings("日本語", "actions"); await verifyKeys("building");
    await openCompanion(page, false);
    await page.getByRole("tab", { name: /About|この作品について/, exact: true }).click();
    await page.getByRole("button", { name: "Open spoiler/debug tools" }).click();
    await page.getByRole("button", { name: "Enable spoilers & load QA build" }).click();
    const qa = page.frameLocator('iframe[src*="qa=1"]');
    await expect(qa.locator(".BufferWindowInner")).toContainText("Tomorrow never yet", { timeout: 60_000 });
    await qa.locator("body").evaluate((_body, p) => {
      const raw = p.lines.map(line => line.text).join("\n");
      parent.postMessage({ channel: "amfv:bridge", type: "transcript", text: "This simulation is based 10 years hence.\n" + raw,
        recentText: raw, statusText: "Mode: Simulation Mode Location: Parkview Apartments Date: 6/2/2041", inputKind: "line", acceptsInput: true, presentation: p }, location.origin);
    }, unique(entrance));
    await expect(page.locator(".scene-home")).toHaveCount(0);
    await expect(qa.locator("#amfv-localized-presentation-host")).toBeHidden();
  } else {
    await report(on, { place: "Parkview Apartments", recording: true });
    await report(look, { place: "Hall Near Your Apartment", recording: true });
    await report(off); await progress(0);
    const old = await report(look);
    await report(on, { recording: true });
    await report(old, { reuse: true, recording: true });
    await report(off); await progress(0);
    const headingOnly = structuredClone(look);
    headingOnly.lines = [look.lines[0], look.lines[1], look.lines.at(-1)!];
    headingOnly.terminalLine = headingOnly.activeInput!.line = 2;
    await report(on, { recording: true }); await report(headingOnly, { recording: true }); await report(off); await progress(0);
    await report(on, { recording: true }); await report(look, { recording: false }); await report(off); await progress(0);
    await report(on, { recording: true }); await report(look, { recording: true }); await progress(0);
    await report(off); await progress(1);
    await report(park, { place: "Kennedy Park" }); await progress(1);
    await post({ type: "command", command: "RESTORE" });
    await report(look); await progress(0);
    await fresh(); await report(look); await progress(0);
    await expect(input).toBeEnabled();
  }
  await attachEvidence(testInfo, `home-controlled-${scenario}`, JSON.stringify({ provenance: "controlled bridge reports, synthetic, separate from fresh natural sessions", scenario, reports, ...(liveAnnouncements.length ? { liveAnnouncements } : {}) }));
  await attachEvidence(testInfo, `home-controlled-${scenario}-accessibility`, await page.locator("body").ariaSnapshot(), "text/plain");
  await attachEvidence(testInfo, `home-controlled-${scenario}`, await page.screenshot(), "image/png");
}
