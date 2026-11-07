import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { acceptChurchMilestone } from "./church-acceptance";
import { clickRouteStep } from "./navigation-acceptance";
import { attachEvidence } from "./evidence-attachments";
import { readingTrace } from "./reading-observations";
import type { BridgePresentation } from "../../app/story-presentation";

const OUT = ["NE", "N", "NE", "E", "NW"], BACK = ["SE", "W", "SW", "S", "SW"];
const PLACES = ["Main & Kennedy", "Centre & Kennedy", "Bodanski Square", "Museum Entrance", "Cinema"];
const NAMES = ["メイン通りとケネディ通り", "センター通りとケネディ通り", "ボダンスキー広場", "博物館入口", "映画館"];
const ALIASES: Record<string, string> = { N: "NORTH", S: "SOUTH", E: "EAST", W: "WEST" };
const SHORT: Record<string, string> = { NORTH: "N", SOUTH: "S", EAST: "E", WEST: "W" };
const normalize = (command: string) => SHORT[command.trim().toUpperCase()] ?? command.trim().toUpperCase();
const rawLocation = (status: string) => status.match(/Location:\s*([\s\S]*?)(?:Date:|$)/i)?.[1].trim();
const clock = (raw: string) => { const m = raw.match(/Time:\s*(\d+):(\d+)(am|pm)/i); return m ? Number(m[1]) % 12 * 60 + Number(m[2]) + (m[3].toLowerCase() === "pm" ? 720 : 0) : null; };
type Turn = { command: string; submittedInputId: string; nextInputId: string; status: string; presentation: BridgePresentation };

async function approvedCopy() {
  const packet = await readFile(new URL("../../docs/cinema-copy-packet.md", import.meta.url), "utf8");
  return new Map(packet.split("\n").filter(line => /^\| [HDNR]\d;/.test(line)).map(line => {
    const cells = line.split("|"); return [cells[2].trim().slice(1, -1), cells[3].trim().slice(1, -1)];
  }));
}

// Read the last rendered line against every clipping ancestor, not only its box.
const lastTextPosition = (paragraph: Locator) => paragraph.evaluate(element => {
  const range = document.createRange(); range.selectNodeContents(element);
  const last = [...range.getClientRects()].at(-1);
  const bounds = { top: 0, bottom: innerHeight, left: 0, right: innerWidth };
  for (let node: Element | null = element; node; node = node.parentElement) {
    const css = getComputedStyle(node), box = node.getBoundingClientRect();
    if (/hidden|clip|auto|scroll/.test(css.overflowY)) { bounds.top = Math.max(bounds.top, box.top + node.clientTop); bounds.bottom = Math.min(bounds.bottom, box.top + node.clientTop + node.clientHeight); }
    if (/hidden|clip|auto|scroll/.test(css.overflowX)) { bounds.left = Math.max(bounds.left, box.left + node.clientLeft); bounds.right = Math.min(bounds.right, box.left + node.clientLeft + node.clientWidth); }
  }
  return { lastTextVisible: Boolean(last && last.top >= bounds.top && last.bottom <= bounds.bottom && last.left >= bounds.left && last.right <= bounds.right),
    lastTextRect: last ? { top: last.top, bottom: last.bottom, left: last.left, right: last.right } : null, visibleBounds: bounds, coordinates: window.parent === window ? "parent viewport" : "iframe viewport" };
});

export async function acceptCinemaMilestone(page: Page, controls: "classic" | "guided" | "actions", testInfo: TestInfo, recordMovie = true) {
  const startedAt = new Date().toISOString();
  const prior = await acceptChurchMilestone(page, controls, testInfo, true, { courtRecording: "cinema-on-site" });
  const { frame, presentation, canonical, input, blocks, send, locale, snapshot, rawTrace } = prior;
  await input.fill("");
  const attach = (name: string, body: string | Buffer, contentType = "application/json") => attachEvidence(testInfo, name, body, contentType);
  const copy = await approvedCopy(), turns: Turn[] = [], audits: unknown[] = [];
  const rawStatus = () => frame.locator("body").evaluate(() => [...document.querySelectorAll("#windowport .GridWindow")].map(node => node.textContent ?? "").join("\n"));
  const requestCount = () => frame.locator("body").evaluate(() => (window as typeof window & { cityHallRequests: string[] }).cityHallRequests.length);
  const inputId = async () => { const p = (await snapshot()).presentation; return p.lines[p.activeInput!.line!].id!; };
  const companion = async (open: boolean) => {
    if (open) { await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click(); await page.locator(".companion-tabs").getByRole("tab").nth(1).click(); }
    else {
      await page.locator(".close-context").click();
      const panel = page.locator(".companion-panel"); await expect(panel).toHaveAttribute("aria-hidden", "true"); await expect(panel).toHaveCSS("opacity", "0");
      await panel.evaluate(async element => { await Promise.all(element.getAnimations().map(animation => animation.finished.catch(() => {}))); });
    }
  };
  const cinema = (other = false) => page.locator(other ? ".companion-panel" : ".command-deck").getByRole("region", { name: /^(Cinema visit|映画館での体験)$/ });
  const act = async (command: string, trigger?: () => Promise<void>) => {
    const previous = await inputId(), count = await requestCount(), startBlock = await send(command, trigger);
    await expect.poll(requestCount).toBe(count + 1);
    const actual = await frame.locator("body").evaluate(() => (window as typeof window & { cityHallRequests: string[] }).cityHallRequests.at(-1)!);
    expect(actual.trim().toUpperCase()).toBe(command.toUpperCase());
    const p = (await snapshot()).presentation, start = p.lines.findIndex(line => line.id === previous);
    expect(start).toBeGreaterThanOrEqual(0); expect(p.lines[start].text.toUpperCase()).toBe(`>${actual.toUpperCase()}`);
    expect(p.activeInput!.kind).toBe("line"); const next = p.lines[p.activeInput!.line!].id!; expect(next).not.toBe(previous);
    const turn = { command: actual, submittedInputId: previous, nextInputId: next, status: await rawStatus(),
      presentation: { ...p, lines: p.lines.slice(start), terminalLine: p.terminalLine - start, activeInput: { ...p.activeInput!, line: p.activeInput!.line! - start } } };
    turns.push(turn); expect(JSON.stringify(turn)).not.toMatch(/Record buffer full|Auto-deactivation|WARNING: Deactivating record feature|not currently active/i);
    for (const [i, line] of turn.presentation.lines.slice(1, -1).entries()) {
      const block = blocks.nth(startBlock + i + 1);
      if (copy.has(line.text)) { await expect(block).toHaveText(copy.get(line.text)!); expect(await block.evaluate(el => el.closest("[lang]")?.getAttribute("lang"))).toBe("ja"); }
      else if (!line.text.trim()) await expect(block).toHaveClass("story-presentation-spacer");
      else { await expect(block).toHaveText(line.text); await expect(block).toHaveAttribute("lang", "en"); }
    }
    return startBlock;
  };
  const recording = async (on: boolean) => { expect(/\(recording\)/i.test(await rawStatus())).toBe(on); };
  const quick = (name: string) => controls === "classic" ? undefined : () => page.locator(".quick-actions").getByRole("button", { name, exact: true }).click();
  const auditControls = async (atCinema: boolean, language: "English" | "日本語", stage: string) => {
    const count = await requestCount(), id = await inputId(), draft = await input.inputValue();
    for (const other of [false, true]) {
      if (other) await companion(true);
      const scene = cinema(other), expected = atCinema && controls !== "classic";
      await expect(scene).toHaveCount(expected ? 1 : 0);
      if (expected) {
        await expect(scene).toHaveAttribute("lang", language === "English" ? "en" : "ja");
        await expect(scene.locator(".scene-actions-heading > span")).toHaveText(language === "English" ? "Ticket purchase and theatre entry" : "入場券の購入と上映室への入場");
        const instruction = controls === "guided" ? language === "English" ? "Choose an action to draft a command you can edit before sending." : "操作を選ぶと英語のコマンドを入力欄に用意します。編集してから送信できます。" : language === "English" ? "Choose an action to send its command once." : "操作を選ぶと、そのコマンドを1回送信します。";
        await expect(scene.locator(".scene-actions-heading small")).toHaveText(instruction);
        await expect(scene.locator(".scene-actions-heading small")).toBeVisible();
        const labels = controls === "guided" ? language === "English" ? ["Ticket Buy", "Theatre Enter"] : ["入場券 購入する", "上映室 入る"] : language === "English" ? ["Buy ticket", "Enter theatre"] : ["入場券を購入する", "上映室に入る"];
        await expect(scene.getByRole("button")).toHaveCount(2);
        for (const [i, label] of labels.entries()) {
          const button = scene.getByRole("button", { name: label, exact: true }); await expect(button).toBeEnabled();
          if (controls === "guided") { await button.click(); await expect(input).toHaveValue(i === 0 ? "BUY TICKET" : "IN"); await expect(input).toBeFocused(); await input.fill(""); }
        }
      }
      await attach(`cinema-${stage}-${language}-${other ? "companion" : "main"}-accessibility`, await page.locator(other ? ".companion-panel" : ".command-deck").ariaSnapshot(), "text/plain");
      if (other) await companion(false);
    }
    await input.fill(draft);
    expect(await requestCount()).toBe(count); expect(await inputId()).toBe(id);
    audits.push({ stage, language, atCinema, count, inputId: id, draftOnly: controls === "guided" });
  };
  const map = async (atCinema: boolean, count: number, stage: string) => {
    if (controls === "classic") { await expect(page.locator(".compact-map-button, .movement-compass, .scene-actions, .fieldwork-checklist")).toHaveCount(0); return; }
    const before = await requestCount(), id = await inputId();
    await expect(page.locator(".compact-map-button small")).toHaveText(`${count}/9 録画`);
    await page.locator(".compact-map-button").click(); const drawer = page.getByRole("dialog", { name: "地図と録画要項" });
    const movie = drawer.locator(".rockvil-navigator").getByRole("button", { name: `映画館、調査目的地${atCinema ? "、現在地" : ""}`, exact: true });
    await expect(movie).toHaveAttribute("lang", "ja"); await movie.click();
    await expect(drawer.locator(".navigator-route")).toContainText("映画館");
    if (atCinema) await expect(drawer.locator(".navigator-route")).toContainText("目的地に到着しました。");
    await attach(`cinema-${stage}-route-accessibility`, await drawer.ariaSnapshot(), "text/plain"); await attach(`cinema-${stage}-route`, await page.screenshot(), "image/png");
    if (page.viewportSize()!.width < 500) await drawer.getByRole("tab", { name: /^要項/ }).click();
    const items = drawer.locator(".fieldwork-checklist li");
    for (const i of [0, 1, 2, 3, 5, 6]) await expect(items.nth(i)).toHaveClass(/complete/);
    const item = items.nth(7); await expect(item.locator("strong")).toHaveText("映画を見に行くこと");
    if (count === 7) await expect(item).toHaveClass(/complete/); else await expect(item).not.toHaveClass(/complete/);
    await item.scrollIntoViewIfNeeded(); await expect(item.locator("strong")).toBeInViewport({ ratio: 1 });
    await items.last().scrollIntoViewIfNeeded(); await expect(items.last()).toBeInViewport({ ratio: 1 });
    const bottom = await lastTextPosition(items.last().locator("strong")); expect(bottom.lastTextVisible).toBe(true);
    await attach(`cinema-${stage}-drawer-bottom`, JSON.stringify({ viewport: page.viewportSize(), lastItem: await items.last().innerText(), ...bottom }));
    await attach(`cinema-${stage}-brief-accessibility`, await drawer.ariaSnapshot(), "text/plain"); await attach(`cinema-${stage}-brief`, await page.screenshot(), "image/png");
    await drawer.getByRole("button", { name: "地図と現地調査要項を閉じる" }).click();
    expect(await requestCount()).toBe(before); expect(await inputId()).toBe(id);
  };
  const visit = async (index: number) => {
    expect(rawLocation(await rawStatus())).toBe(index < 0 ? "Kennedy Park" : PLACES[index]);
    await expect(page.locator(".location-block strong")).toHaveText(index < 0 ? "ケネディ公園" : NAMES[index]);
    await expect(page.locator(".location-block strong")).toHaveAttribute("lang", "ja");
  };
  for (const [i, short] of OUT.entries()) {
    const command = controls === "classic" ? short : ALIASES[short] ?? short;
    await act(command, controls === "classic" ? undefined : () => clickRouteStep(page, input, controls, command, "映画館"));
    await visit(i); await recording(false);
  }
  for (const language of ["English", "日本語"] as const) { await locale(language); await auditControls(true, language, "arrival"); }
  await map(true, 6, "before-purchase");
  const cinemaAction = async (command: "BUY TICKET" | "IN", other: boolean) => {
    if (other) await companion(true);
    const scene = cinema(other), label = controls === "guided" ? command === "IN" ? "上映室 入る" : "入場券 購入する" : command === "IN" ? "上映室に入る" : "入場券を購入する";
    await scene.getByRole("button", { name: label, exact: true }).click();
    if (controls === "guided") {
      await expect(input).toHaveValue(command); await expect(input).toBeFocused();
      // On 390px the companion covers the command form. Close it through
      // its actual control before editing and explicitly submitting the draft.
      if (other) await companion(false);
      await input.fill(`${command} `); await expect(input).toHaveValue(`${command} `);
      await page.getByRole("button", { name: /^送信/ }).click();
    }
    if (other && controls !== "guided") await companion(false);
  };
  await act("BUY TICKET", controls === "classic" ? undefined : () => cinemaAction("BUY TICKET", false)); await recording(false); await map(true, 6, "purchase-only");
  if (recordMovie) { await act("RECORD", quick("録画開始")); await recording(true); }
  const beforeMovie = await rawStatus();
  const movieStart = await act("IN", controls === "classic" ? undefined : () => cinemaAction("IN", true)); await recording(recordMovie);
  await visit(4); await expect(blocks.nth(movieStart + 3)).toHaveText("上映室"); await expect(blocks.nth(movieStart + 3)).toHaveClass("story-presentation-title");
  const movieEnglish = turns.at(-1)!.presentation.lines[4].text, movieJapanese = copy.get(movieEnglish)!;
  const beforeMinutes = clock(beforeMovie), afterMinutes = clock(turns.at(-1)!.status);
  const elapsedMinutes = beforeMinutes !== null && afterMinutes !== null ? (afterMinutes - beforeMinutes + 1440) % 1440 : null;
  expect(elapsedMinutes).toBe(page.viewportSize()!.width < 500 ? null : 15);
  const recover = async (stage: "movie" | "return", anchor: Locator) => {
    const requests = await requestCount(), id = await inputId(), raw = await canonical.innerText(), historyCount = await blocks.count(), recovery = [];
    let verifiedPNG: Buffer | undefined;
    await input.fill("LOOK");
    for (const language of ["English", "日本語", "English", "日本語"] as const) {
      await locale(language); await expect(input).toHaveValue("LOOK");
      const surface = language === "English" ? frame.locator(".BufferWindow") : presentation.locator(".story-presentation-scroll");
      const end = language === "日本語" ? anchor : stage === "movie" ? canonical.locator(".BufferLine", { hasText: movieEnglish }) : canonical.locator(".BufferLine").filter({ hasText: /^Kennedy Park$/ }).last();
      const readingState = async () => ({ ...await lastTextPosition(end),
        scroll: await surface.evaluate(el => ({ top: el.scrollTop, height: el.clientHeight, total: el.scrollHeight, width: el.clientWidth })),
        input: await input.evaluate(el => { const r = el.getBoundingClientRect(); return { focused: document.activeElement === el, visible: r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth, bounds: { top: r.top, bottom: r.bottom, left: r.left, right: r.right }, coordinates: "parent viewport" }; }),
        companion: await page.locator(".companion-panel").evaluate(el => ({ ariaHidden: el.getAttribute("aria-hidden"), opacity: getComputedStyle(el).opacity, transform: getComputedStyle(el).transform, activeAnimations: el.getAnimations().filter(a => a.playState !== "finished").length })),
      });
      const tail = async () => { await surface.hover(); await page.mouse.wheel(0, await surface.evaluate(el => el.scrollHeight)); await expect.poll(async () => (await lastTextPosition(end)).lastTextVisible).toBe(true); };
      await tail(); const beforePanels = await readingState();
      await auditControls(stage === "movie", language, `${stage}-recovery-${recovery.length + 1}`);
      if (language === "日本語") await map(stage === "movie", recordMovie ? 7 : 6, `${stage}-recovery-${recovery.length + 1}`);
      const afterPanels = await readingState();
      await tail(); await input.click(); await expect(input).toBeFocused(); await expect(input).toBeInViewport({ ratio: 1 });
      await expect.poll(async () => (await lastTextPosition(end)).lastTextVisible).toBe(true);
      if (language === "English") { await expect(presentation).toBeHidden(); await expect(canonical).not.toHaveAttribute("aria-hidden", "true"); }
      else { await expect(presentation).toHaveAttribute("lang", "ja"); await expect(canonical).toHaveAttribute("aria-hidden", "true"); await expect(canonical).toHaveAttribute("inert", ""); await expect(blocks).toHaveCount(historyCount); }
      const beforeScreenshot = await readingState(); expect(beforeScreenshot.lastTextVisible).toBe(true); expect(beforeScreenshot.input).toMatchObject({ focused: true, visible: true }); expect(beforeScreenshot.companion).toMatchObject({ ariaHidden: "true", opacity: "0", activeAnimations: 0 });
      const checkpoint: string = `cinema-${stage}-recovery-${recovery.length + 1}`, aria = await frame.locator("body").ariaSnapshot();
      // ariaSnapshot is YAML; quoted film titles escape their double quotes.
      const accessibleText = aria.replace(/\\"/g, '"');
      const singleOwner = language === "English" ? accessibleText.split(movieEnglish).length === 2 && !accessibleText.includes(movieJapanese) : accessibleText.split(movieJapanese).length === 2 && !accessibleText.includes(movieEnglish); expect(singleOwner).toBe(true);
      const lifecycle = await readingTrace(frame, checkpoint), png = await page.screenshot(), afterScreenshot = await readingState();
      expect(afterScreenshot).toEqual(beforeScreenshot); expect(await requestCount()).toBe(requests); expect(await inputId()).toBe(id); expect(await canonical.innerText()).toBe(raw);
      recovery.push({ checkpoint, language, inputId: id, requests, singleOwner, panelAudit: { before: beforePanels, after: afterPanels }, beforeScreenshot, afterScreenshot, lifecycle });
      await attach(`${checkpoint}-accessibility`, aria, "text/plain"); await attach(checkpoint, png, "image/png"); verifiedPNG = png;
    }
    await attach(`cinema-${stage}-reading`, JSON.stringify({ recovery })); await input.fill(""); return verifiedPNG!;
  };
  await recover("movie", blocks.nth(movieStart + 4));
  if (recordMovie) { await act("RECORD OFF", quick("録画停止")); await recording(false); }
  await act("LOOK", quick("見る")); await recording(false); await visit(4);
  for (const [i, short] of BACK.entries()) {
    const command = controls === "classic" ? short : ALIASES[short] ?? short;
    await act(command, controls === "classic" ? undefined : () => page.locator(".compass-exit").filter({ has: page.getByText(short, { exact: true }) }).click());
    await visit(3 - i); await recording(false); await expect(presentation).toContainText(movieJapanese);
    if (i === 0) expect(turns.at(-1)!.presentation.lines.map(line => line.text)).not.toContain([...copy.keys()].find(text => text.startsWith("Standing on the south side")));
  }
  const returnPNG = await recover("return", presentation.locator(".story-presentation-title").last());
  const trace = await rawTrace(), requests = trace.requests.slice(1), fixture = JSON.parse(await readFile(new URL("../fixtures/parchment-cinema-recording-a-observed.json", import.meta.url), "utf8"));
  expect(trace.requests[0]).toBe(" "); expect(requests).toHaveLength(recordMovie ? 96 : 94);
  const expected = fixture.sessions[0].submittedCommands.filter((_: string, i: number) => recordMovie || ![87, 89].includes(i));
  expect(requests.map((command, i) => i === 6 ? "<decoder>" : normalize(command))).toEqual(expected.map((command: string, i: number) => i === 6 ? "<decoder>" : normalize(command)));
  expect(turns.map(({ command }) => normalize(command))).toEqual([...OUT, "BUY TICKET", ...(recordMovie ? ["RECORD"] : []), "IN", ...(recordMovie ? ["RECORD OFF"] : []), "LOOK", ...BACK]);
  expect(turns[0].submittedInputId).toBe(prior.finalInputId);
  const delivered = trace.inputs.slice(2); expect(delivered).toHaveLength(requests.length);
  for (const [i, output] of delivered.entries()) {
    expect(output.previousInputId).toBe(trace.inputs[i + 1].inputId); expect(output.presentation.lines[0].id).toBe(output.previousInputId); expect(output.inputId).not.toBe(output.previousInputId);
    if (i === 6) expect(output.presentation.lines[0].runs.some(run => run.classes.includes("Style_input") && run.text === requests[i])).toBe(true);
    else expect(output.presentation.lines[0].text.toUpperCase()).toBe(`>${requests[i].toUpperCase()}`);
  }
  for (let i = 1; i < turns.length; i++) expect(turns[i].submittedInputId).toBe(turns[i - 1].nextInputId);
  expect(trace.inputs.at(-1)!.inputId).toBe(await inputId()); expect(JSON.stringify(trace.inputs)).not.toMatch(/Record buffer full|Auto-deactivation|WARNING: Deactivating record feature/i);
  const warnings = trace.inputs.filter(({ presentation: p }) => p.lines.some(line => line.text === "WARNING: Record buffer is now half-full.")); expect(warnings).toHaveLength(1);
  await attach("cinema-runtime-observations", JSON.stringify({ provenance: "fresh canonical Release 79; live bridge-v3 output and actual parent-to-player requests; no VM edits, injected route reports or RESTORE", routeCandidate: "A / cinema-on-site courthouse", startedAt, finishedAt: new Date().toISOString(), controls, viewport: page.viewportSize(), recordMovie, trace, cinemaTurns: turns, audits, warnings, elapsedMinutes, clockLimitation: page.viewportSize()!.width < 500 ? "canonical narrow status emits no clock/date; no time synthesized" : null, checklist: controls === "classic" ? "not displayed" : `${recordMovie ? 7 : 6}/9 auxiliary inference, not original assignment evaluation`, finalInputId: await inputId() }));
  await attach("cinema-return", returnPNG, "image/png");
}

// Controlled wrapper reports; these never stand in for a natural VM session.
export async function probeCinemaBoundary(page: Page, testInfo: TestInfo, scenario: "history" | "input-scope" | "recording") {
  await page.goto("/");
  await page.getByRole("dialog", { name: /A Mind Forever Voyaging/i }).getByRole("button", { name: /^Begin/ }).click();
  await page.getByRole("button", { name: /Begin the original story/i }).click(); await expect(page.locator("#command-input")).toBeEnabled();
  const frame = page.frameLocator('iframe[src="/player.html"]');
  await frame.locator("body").evaluate(() => {
    const w = window as typeof window & { cinemaPost?: typeof window.parent.postMessage };
    w.cinemaPost = window.parent.postMessage.bind(window.parent);
    window.parent.postMessage = ((data: { type?: string }, origin: string) => { if (data.type !== "transcript") w.cinemaPost?.(data, origin); }) as typeof window.parent.postMessage;
  });
  const post = (payload: Record<string, unknown>) => frame.locator("body").evaluate((_body, data) => {
    (window as typeof window & { cinemaPost?: typeof window.parent.postMessage }).cinemaPost?.({ channel: "amfv:bridge", ...data }, window.location.origin);
  }, payload);
  const fixture = JSON.parse(await readFile(new URL("../fixtures/parchment-cinema-recording-a-observed.json", import.meta.url), "utf8"));
  const arrival = fixture.sessions[0].observations[84].presentation as BridgePresentation, movie = fixture.sessions[0].observations[87].presentation as BridgePresentation;
  const purchase = fixture.sessions[0].observations[85].presentation as BridgePresentation;
  const copy = await approvedCopy(), movieEnglish = movie.lines[4].text, movieJapanese = copy.get(movieEnglish)!;
  const presentation = frame.locator("#amfv-localized-presentation-host"), input = page.locator("#command-input");
  const prose = (text: string) => presentation.locator(".story-presentation-prose").filter({ hasText: text });
  const settings = async (language: "English" | "日本語", mode: "classic" | "guided" | "actions" = "actions") => {
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click(); const panel = page.locator(".access-panel");
    await panel.getByRole("button", { name: language, exact: true }).click(); await panel.locator(".interaction-segments button").nth(mode === "classic" ? 0 : mode === "guided" ? 1 : 2).click();
    await page.getByTitle(/Reading and play settings|読書とプレイの設定/).click();
  };
  const both = async (present: boolean, disabled = false) => {
    for (const other of [false, true]) {
      if (other) { await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click(); await page.locator(".companion-tabs").getByRole("tab").nth(1).click(); }
      const scene = page.locator(other ? ".companion-panel" : ".command-deck").locator(".scene-cinema");
      await expect(scene).toHaveCount(present ? 1 : 0);
      if (present) for (const button of await scene.getByRole("button").all()) { if (disabled) await expect(button).toBeDisabled(); else await expect(button).toBeEnabled(); }
      if (other) await page.locator(".close-context").click();
    }
  };
  let sequence = 0;
  const unique = (p: BridgePresentation) => { const result = structuredClone(p); sequence++; result.lines.forEach((line, i) => { line.id = `controlled-cinema-${sequence}-${i}`; }); return result; };
  const make = (command: string, output: string[], kind: "line" | "char" = "line") => {
    const p = structuredClone(arrival);
    p.lines = [{ ...structuredClone(arrival.lines[0]), text: `>${command}`, runs: [{ text: ">", classes: ["Style_normal"], tag: "span" }, { text: command, classes: ["Style_input"], tag: "span" }] },
      ...output.map(text => ({ ...structuredClone(arrival.lines[2]), text, runs: [{ text, classes: ["Style_normal"], tag: "span" }] })), structuredClone(arrival.lines.at(-1)!)];
    p.terminalLine = p.lines.length - 1; p.activeInput = { ...p.activeInput!, kind, line: p.terminalLine }; return p;
  };
  type Options = { location?: string; year?: number; recording?: boolean; prefix?: string; history?: string; inputKind?: "line" | "char" | "unknown"; acceptsInput?: boolean; omit?: string[]; reuseIds?: boolean; statusText?: string };
  const reports: unknown[] = [], observed: string[] = [];
  const report = async (p: BridgePresentation = arrival, options: Options = {}) => {
    const current = options.reuseIds ? structuredClone(p) : unique(p), raw = current.lines.map(line => line.text).join("\n");
    await post({ type: "command", command: current.lines[0].text.replace(/^>/, "") });
    const payload: Record<string, unknown> = { type: "transcript", text: `${options.prefix ?? ""}${options.history ?? ""}${raw}`, recentText: raw,
      statusText: options.statusText ?? `Mode: Simulation Mode${options.recording ? " (recording)" : ""} Time: 1:00pm Location: ${options.location ?? "Cinema"} Date: 3/6/${options.year ?? 2041}`,
      inputKind: options.inputKind ?? "line", acceptsInput: options.acceptsInput ?? true, presentation: current };
    for (const key of options.omit ?? []) delete payload[key]; await post(payload); reports.push(payload); return current;
  };
  const fresh = async (enter = true) => {
    await post({ type: "transcript", text: "Tomorrow never yet.\nHit any key to continue", recentText: "Tomorrow never yet.\nHit any key to continue", statusText: "", inputKind: "char", acceptsInput: true, presentation: unique(fixture.sessions[0].startup.before.presentation) });
    if (enter) await report(arrival, { prefix: "This simulation is based 10 years hence.\n" });
  };
  const progress = async (count: number, known = true) => {
    await expect(page.locator(".compact-map-button small")).toHaveText(known ? `${count}/9 録画` : `${count}/9 recorded`); await page.locator(".compact-map-button").click();
    const drawer = page.getByRole("dialog", { name: /^(地図と録画要項|Map & recording brief)$/ }), item = drawer.locator(".fieldwork-checklist li").nth(7);
    if (count) await expect(item).toHaveClass(/complete/); else await expect(item).not.toHaveClass(/complete/);
    await drawer.getByRole("button", { name: /^(地図と現地調査要項を閉じる|Close map and fieldwork brief)$/ }).click();
  };
  await settings("日本語"); await fresh();
  if (scenario === "history") {
    await report(movie); await expect(prose(movieJapanese)).toHaveCount(1);
    await report(movie, { location: "Kennedy Park" }); await expect(prose(movieJapanese)).toHaveCount(1); await expect(prose(movieEnglish)).toHaveAttribute("lang", "en");
    await report(movie, { year: 2051 }); await expect(prose(movieJapanese)).toHaveCount(1);
    const tail = make("WAIT", Array.from({ length: 400 }, () => `Time passes...${" ".repeat(60)}`));
    await report(tail, { location: "Kennedy Park" }); await expect(prose(movieJapanese)).toHaveCount(1); await both(false);
    for (const name of ["English", "日本語", "English", "日本語"] as const) await settings(name);
    await expect(prose(movieJapanese)).toHaveCount(1);
    await post({ type: "command", command: "RESTORE" }); await report(movie); await both(false);
    await expect(prose(movieJapanese)).toHaveCount(0); await expect(prose(movieEnglish)).toHaveAttribute("lang", "en");
    await fresh(false); await report(movie); await both(false); await expect(prose(movieJapanese)).toHaveCount(0);
    await fresh(); await report(movie, { prefix: "* PART II *\n" }); await both(false); await expect(prose(movieJapanese)).toHaveCount(0);
    await fresh(); await report(make("ABORT", ["You have entered Communications Mode."]), { statusText: "Mode: Communications Mode" }); await report(movie, { prefix: "This simulation is based 10 years hence.\n" }); await both(false); await expect(prose(movieJapanese)).toHaveCount(0);
    await fresh(); await report(movie); await expect(prose(movieJapanese)).toHaveCount(1);
    observed.push("valid CINEMA observation remains Japanese after movement, 2051 copy, rolling history and EN/JA switches; same English in wrong room/year stays English; RESTORE unknown, Part II and simulation re-entry fail closed; fresh initial entry recovers scope");
  } else if (scenario === "recording") {
    const refusal = fixture.noTicketProbe.observations[11].presentation as BridgePresentation;
    await report(refusal); await expect(prose("入場券を持っていない。")).toHaveCount(1); await both(true); await progress(0);
    await report(purchase); await progress(0);
    await report(fixture.sessions[0].observations[86].presentation, { recording: true }); await report(make("LOOK", ["Cinema", "Movie Theatre", arrival.lines[2].text]), { recording: true }); await progress(0);
    await fresh(); const oldMovie = await report(movie); await progress(0);
    await report(fixture.sessions[0].observations[86].presentation, { recording: true }); await report(oldMovie, { recording: true, reuseIds: true }); await progress(0);
    await fresh(); await report(fixture.sessions[0].observations[86].presentation, { recording: true }); await report(movie, { recording: false }); await progress(0);
    await fresh(); await report(fixture.sessions[0].observations[86].presentation, { recording: true }); await report(movie, { recording: true }); await progress(1);
    await report(make("WAIT", Array.from({ length: 400 }, () => "Time passes...")), { location: "Kennedy Park" }); await progress(1);
    await post({ type: "command", command: "RESTORE" }); await report(arrival); await progress(0, false);
    observed.push("no ticket, purchase only, lobby/heading LOOK, unrecorded movie, late RECORD/replayed old input and stopped recording add no movie; complete recorded IN counts once and survives rolling text; RESTORE clears inference");
  } else {
    for (const mode of ["guided", "actions"] as const) {
      await settings("日本語", mode); await fresh(); await both(true);
      await report(arrival, { acceptsInput: false }); await both(true, true);
      await report(arrival, { inputKind: "char" }); await both(false);
      await report(arrival, { inputKind: "unknown" }); await both(false);
      await report(arrival, { omit: ["inputKind"] }); await both(false);
      await report(arrival, { omit: ["statusText"] }); await both(false);
      await report(arrival, { location: "Museum Entrance" }); await both(false);
      await report(arrival, { year: 2051 }); await both(false);
      await fresh(); const unknownBalance = purchase.lines[1].text.replace("$554", "$539");
      // Source-derived synthetic vending refusal, not observed canonical output.
      const insufficient = 'You insert your card into the ticket seller. A readout flashes "INSUFFICIENT FUNDS" and your card spits back into your hand.';
      await report(make("BUY TICKET", [unknownBalance, insufficient, "You already did."]));
      for (const text of [unknownBalance, insufficient, "You already did."]) { await expect(prose(text)).toHaveCount(1); await expect(prose(text)).toHaveAttribute("lang", "en"); }
      await both(true); await expect(input).toBeEnabled();
    }
    await settings("日本語", "classic"); await fresh(); await both(false);
    await settings("日本語", "actions"); await both(true);
    observed.push("Guided and Actions main/companion share busy guards; char, unknown/missing input, missing raw status, wrong room/year fail closed; unknown amount, synthetic source refusal and repeat purchase stay English; Classic has no cinema controls");
    // Same controlled transport on isolated QA; no QA story bytes are changed.
    await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click(); await page.getByRole("tab", { name: /About|この作品について/, exact: true }).click();
    await page.getByRole("button", { name: "Open spoiler/debug tools" }).click(); await page.getByRole("button", { name: "Enable spoilers & load QA build" }).click();
    const qa = page.frameLocator('iframe[src*="qa=1"]'); await expect(qa.locator(".BufferWindowInner")).toContainText("Tomorrow never yet", { timeout: 60_000 });
    await qa.locator("body").evaluate((_body, p) => {
      const native = window.parent.postMessage.bind(window.parent); window.parent.postMessage = ((data: { type?: string }, origin: string) => { if (data.type !== "transcript") native(data, origin); }) as typeof window.parent.postMessage;
      const raw = p.lines.map(line => line.text).join("\n"); native({ channel: "amfv:bridge", type: "transcript", text: "This simulation is based 10 years hence.\n" + raw, recentText: raw, statusText: "Mode: Simulation Mode Location: Cinema Date: 3/6/2041", inputKind: "line", acceptsInput: true, presentation: p }, location.origin);
    }, unique(movie));
    await expect(page.locator(".scene-cinema")).toHaveCount(0); expect(await qa.locator("body").ariaSnapshot()).not.toContain(movieJapanese);
    observed.push("isolated noncanonical QA never adopts cinema copy or operations");
  }
  await attachEvidence(testInfo, `cinema-controlled-${scenario}`, JSON.stringify({ provenance: "synthetic controlled wrapper bridge reports only; no VM edits or actual saved-game RESTORE; not natural route evidence", observed, reports }));
  await attachEvidence(testInfo, `cinema-controlled-${scenario}-accessibility`, await page.locator("body").ariaSnapshot(), "text/plain"); await attachEvidence(testInfo, `cinema-controlled-${scenario}`, await page.screenshot(), "image/png");
}
