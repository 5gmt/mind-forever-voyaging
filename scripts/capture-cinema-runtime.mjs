import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};

const baseURL = argument("--base-url", "http://127.0.0.1:3100");
const output = argument("--output", "/tmp/parchment-cinema-runtime-observed.json");
const prefixPath = ["PEOF", "WAIT", "WAIT", "WAIT", "WAIT", "ENTER SIMULATION MODE", "<observed decoder answer>", "LOOK", "RECORD", "WAIT", "RECORD OFF"];
const courthousePath = ["RECORD", "SW", "NW", "LOOK", "SE", "NE", "RECORD OFF"];
// The accepted restaurant A prefix remains exactly 40 actual line submissions,
// including the runtime-derived decoder answer. City Hall adds ten submissions.
const newspaperPath = ["INVENTORY", "NE", "N", "NE", "RECORD", "BUY NEWSPAPER", "READ NEWSPAPER", "RECORD OFF", "SW", "S", "SW"];
const restaurantPath = ["SW", "W", "W", "S", "RECORD", "BUY MEAL", "RECORD OFF", "N", "E", "E", "NE"];
const cityHallPath = ["NE", "W", "W", "RECORD", "GOVERNMENT OFFICIAL, HELLO", "RECORD OFF", "LOOK", "E", "E", "SW"];
const powerStationPath = ["SE", "E", "S", "S", "SE", "SE", "S", "RECORD", "LOOK", "RECORD OFF", "N", "NW", "NW", "N", "N", "W", "NW"];
const powerStationLocations = ["Elm & Kennedy", "Elm & River", "Southway & River", "Bend", "Wicker & River", "Power Station Entrance", "Power Station", "Power Station", "Power Station", "Power Station", "Power Station Entrance", "Wicker & River", "Bend", "Southway & River", "Elm & River", "Elm & Kennedy", "Kennedy Park"];

const churchPath = ["NE", "E", "E", "N", "W", "RECORD", "CHURCH ELDER, HELLO", "RECORD OFF", "LOOK", "E", "S", "W", "W", "SW"];
const churchLocations = ["Main & Kennedy", "Main & River", "Main & Church", "Church Entrance", "St. Michael's", "St. Michael's", "St. Michael's", "St. Michael's", "St. Michael's", "Church Entrance", "Main & Church", "Main & River", "Main & Kennedy", "Kennedy Park"];
const churchRoomIds = ["MAIN-AND-KENNEDY", "MAIN-AND-RIVER", "MAIN-AND-CHURCH", "CHURCH-ENTRANCE", "ST-MICHAELS", "ST-MICHAELS", "ST-MICHAELS", "ST-MICHAELS", "ST-MICHAELS", "CHURCH-ENTRANCE", "MAIN-AND-CHURCH", "MAIN-AND-RIVER", "MAIN-AND-KENNEDY", "KENNEDY-PARK"];

const cinemaPath = ["NE", "N", "NE", "E", "NW", "BUY TICKET", "RECORD", "IN", "RECORD OFF", "LOOK", "SE", "W", "SW", "S", "SW"];
const cinemaLocations = ["Main & Kennedy", "Centre & Kennedy", "Bodanski Square", "Museum Entrance", "Cinema", "Cinema", "Cinema", "Cinema", "Cinema", "Cinema", "Museum Entrance", "Bodanski Square", "Centre & Kennedy", "Main & Kennedy", "Kennedy Park"];
const cinemaRoomIds = ["MAIN-AND-KENNEDY", "CENTRE-AND-KENNEDY", "BODANSKI-SQUARE", "MUSEUM-ENTRANCE", "CINEMA", "CINEMA", "CINEMA", "CINEMA", "CINEMA", "CINEMA", "MUSEUM-ENTRANCE", "BODANSKI-SQUARE", "CENTRE-AND-KENNEDY", "MAIN-AND-KENNEDY", "KENNEDY-PARK"];
const churchFixture = JSON.parse(await readFile(new URL("../tests/fixtures/parchment-church-runtime-observed.json", import.meta.url), "utf8"));
const canonicalSha256 = createHash("sha256").update(await readFile(new URL("../public/amfv-r79-s851122.z4", import.meta.url))).digest("hex");
if (canonicalSha256 !== churchFixture.canonicalSha256) throw new Error("Canonical story checksum mismatch.");
const failureOutput = argument("--failure-output", output.replace(/(?:-observed)?\.json$/, "-failure.json"));
const routeFailure = (message) => { const error = new Error(message); error.name = "RouteFailure"; throw error; };
const aliases = { east: "E", west: "W", north: "N", south: "S", northeast: "NE", northwest: "NW", southeast: "SE", southwest: "SW" };
const canonical = (command) => aliases[command.toLowerCase()] ?? command.toUpperCase();

const parseStatus = (text) => Object.fromEntries([
  ["mode", "Mode", "Time"],
  ["time", "Time", "Location"],
  ["location", "Location", "Date"],
  ["date", "Date", null],
].map(([field, label, next]) => {
  const pattern = next ? new RegExp(`${label}:\\s+(.+?)\\s+${next}:`) : new RegExp(`${label}:\\s+([^\\n]+?)\\s*$`);
  const match = text.match(pattern);
  if (!match) throw new Error(`Unable to parse ${field} from GridWindow status.`);
  return [field, match[1].trim()];
}));

const activeInputLineId = (frame) => frame.locator("body").evaluate(() => {
  const bridge = window.AMFVPresentationBridge;
  if (!bridge) throw new Error("AMFVPresentationBridge is unavailable.");
  const presentation = bridge.extract(document, (element) => getComputedStyle(element));
  if (!presentation.activeInput) throw new Error("The canonical line input is unavailable.");
  return presentation.lines[presentation.activeInput.line].id;
});

const waitForNewEcho = async (frame, command, inputLineId) => {
  const expected = `>${command}`.toUpperCase();
  await frame.locator("body").evaluate(async (_body, options) => {
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      const bridge = window.AMFVPresentationBridge;
      if (!bridge) throw new Error("AMFVPresentationBridge is unavailable.");
      const presentation = bridge.extract(document, (element) => getComputedStyle(element));
      if (presentation.lines.some(({ id, text }) => id === options.inputLineId && text.toUpperCase() === options.expected)) return;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw new Error(`Timed out waiting for the new command echo: ${options.expected}`);
  }, { expected, inputLineId });
};

const waitForNewLineInput = async (frame, submittedInputLineId) => frame.locator("body").evaluate(async (_body, previousId) => {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    const bridge = window.AMFVPresentationBridge;
    if (!bridge) throw new Error("AMFVPresentationBridge is unavailable.");
    const presentation = bridge.extract(document, (element) => getComputedStyle(element));
    const line = presentation.activeInput && presentation.lines[presentation.activeInput.line];
    if (presentation.activeInput?.kind === "line" && line?.id !== previousId) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Timed out waiting for the new canonical line input.");
}, submittedInputLineId);

const extract = async (frame, command, inputLineId) => frame.locator("body").evaluate((_body, options) => {
  const bridge = window.AMFVPresentationBridge;
  if (!bridge) throw new Error("AMFVPresentationBridge is unavailable.");
  const full = bridge.extract(document, (element) => getComputedStyle(element));
  const start = full.lines.findIndex(({ id }) => id === options.inputLineId);
  if (start < 0) throw new Error(`Submitted input identity is unavailable: ${options.inputLineId}`);
  const statusText = Array.from(document.querySelectorAll("#windowport .GridWindow")).map((node) => node.textContent ?? "").join("\n");
  return {
    statusText,
    presentation: {
      version: full.version,
      lines: full.lines.slice(start),
      terminalLine: full.terminalLine - start,
      activeInput: full.activeInput ? { ...full.activeInput, line: full.activeInput.line - start } : null,
    },
  };
}, { command, inputLineId });

// Audit real UI without advancing canonical input. Every text node records its
// inherited language as well as explicit lang attributes and accessible names.
const auditSurfaces = async (page, observationIndex, phase) => {
  const samples = [];
  const frame = page.frameLocator('iframe[src="/player.html"]');
  const inputBefore = await activeInputLineId(frame);
  const settings = page.locator(".access-panel");
  const toggle = page.getByTitle(/Reading and play settings|読書とプレイの設定/);
  const snapshot = async (selector) => {
    const values = [];
    for (const node of await page.locator(selector).all()) values.push({
      visible: await node.isVisible(), lang: await node.getAttribute("lang"), aria: await node.ariaSnapshot(),
      leaves: await node.evaluate((element) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const leaves = [];
        while (walker.nextNode()) {
          const text = walker.currentNode.textContent;
          if (text.trim()) leaves.push({ text, lang: walker.currentNode.parentElement.closest("[lang]")?.getAttribute("lang") ?? document.documentElement.lang });
        }
        return leaves;
      }),
      buttons: await node.locator("button").evaluateAll((buttons) => buttons.map((button) => ({
        text: button.innerText, ariaLabel: button.getAttribute("aria-label"), disabled: button.disabled,
      }))),
    });
    return values;
  };
  for (const locale of ["English", "日本語"]) {
    await toggle.click();
    await settings.getByRole("button", { name: locale, exact: true }).click();
    await toggle.click();
    for (const [index, mode] of ["classic", "guided", "actions"].entries()) {
      await toggle.click();
      await settings.locator(".interaction-segments button").nth(index).click();
      await toggle.click();
      const sample = { locale, mode,
        location: await snapshot(".location-block"), identity: await snapshot(".identity-rail"),
        compass: await snapshot(".movement-compass"), sceneActions: await snapshot(".command-deck .scene-actions"),
        quickActions: await snapshot(".quick-actions"), recordingReminder: await snapshot(".record-reminder"),
        commandHelp: await snapshot("#command-help"),
      };
      // Guided SceneActions only prepare editable English; do not submit it.
      if (mode === "guided") {
        const actions = page.locator(".command-deck .scene-actions:visible button");
        sample.sceneDrafts = [];
        for (const button of await actions.all()) {
          if (!await button.isVisible()) continue;
          const label = await button.innerText();
          await button.click();
          sample.sceneDrafts.push({ label, command: await page.locator("#command-input").inputValue() });
          await page.locator("#command-input").fill("");
        }
      }
      await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
      sample.companionTabs = await page.locator(".companion-tabs").ariaSnapshot();
      if (mode !== "classic") await page.locator(".companion-tabs").getByRole("tab").nth(1).click();
      sample.context = await snapshot(".map-section");
      sample.companionSceneActions = await snapshot(".map-section .scene-actions");
      sample.companionDrafts = [];
      if (mode === "guided") {
        for (const button of await page.locator(".map-section .scene-actions:visible button").all()) {
          const label = await button.innerText();
          await button.click();
          sample.companionDrafts.push({ label, command: await page.locator("#command-input").inputValue() });
          await page.locator("#command-input").fill("");
        }
      }
      await page.locator(".close-context").click();
      const map = page.locator(".compact-map-button");
      sample.mapButtonVisible = await map.isVisible();
      if (sample.mapButtonVisible) {
        await map.click();
        const drawer = page.locator(".fieldwork-drawer");
        await drawer.locator(".navigator-hotspots button").filter({ hasText: /^Cinema$/ }).click();
        await drawer.locator(".navigator-route").waitFor({ state: "visible" });
        sample.map = await drawer.ariaSnapshot();
        sample.mapSurface = await snapshot(".fieldwork-drawer");
        const step = drawer.locator(".navigator-route-actions button").first();
        if (mode === "guided" && /next step|次の移動/i.test(await step.innerText())) {
          await step.click();
          sample.guidedDraft = await page.locator("#command-input").inputValue();
          await page.locator("#command-input").fill("");
        } else await drawer.locator(".fieldwork-close").click();
      }
      sample.inputAfter = await activeInputLineId(frame);
      if (sample.inputAfter !== inputBefore) throw new Error("Surface audit advanced canonical input.");
      samples.push(sample);
    }
  }
  await toggle.click();
  await settings.getByRole("button", { name: "English", exact: true }).click();
  await settings.locator(".interaction-segments button").nth(1).click();
  await toggle.click();
  return { observationIndex, phase, inputBefore, inputAfter: await activeInputLineId(frame), samples };
};

const captureSession = async (browser, id, kind = "full") => {
  const startedAt = new Date().toISOString();
  const observations = [];
  const submittedCommands = [];
  const surfaceAudit = [];
  let securityPrompt;
  let startup;
  const submissions = [];
  let bridgeCommands = [];
  const result = () => ({ id, kind, startedAt, finishedAt: new Date().toISOString(), recordingWindow: kind === "full" ? "accepted six-task prefix plus cinema IN only" : "none",
    viewport: { width: 1440, height: 900 }, commands: observations.map(({ command }) => command),
    submittedCommands, bridgeCommands, submissions, startup, securityPrompt, observations, surfaceAudit,
    warnings: observations.flatMap((turn) => {
      const texts = turn.presentation.lines.map(({ text }) => text).filter((text) => text.startsWith("WARNING:"));
      return texts.length ? [{ turnId: turn.turnId, command: turn.command, status: turn.status, texts }] : [];
    }) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  try {
    await page.addInitScript(() => {
      window.cinemaCommandObservations = [];
      window.addEventListener("message", (event) => {
        // Observe parent-to-player requests. The existing player reports a
        // line command both on keydown and after submission; those reports
        // are notifications, not two canonical sends.
        if (window.parent !== window && event.source === window.parent && event.origin === window.location.origin
          && event.data?.channel === "amfv:bridge" && event.data.type === "command") {
          window.cinemaCommandObservations.push(event.data.command);
        }
      });
    });
    await page.goto(baseURL);
    const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
    const beginStory = page.getByRole("button", { name: /Begin the original story/i });
    const frame = page.frameLocator('iframe[src="/player.html"]');
    const commandInput = page.locator("#command-input");
    const send = page.getByRole("button", { name: /^Send$/i });
    const storyReady = page.getByText("AWAITING INPUT", { exact: true });
    await introduction.waitFor({ state: "visible", timeout: 60_000 });
    await introduction.getByRole("button", { name: /^Begin/ }).click();
    await introduction.waitFor({ state: "hidden", timeout: 60_000 });
    await Promise.race([
      beginStory.waitFor({ state: "visible", timeout: 60_000 }),
      storyReady.waitFor({ state: "visible", timeout: 60_000 }),
    ]);
    await beginStory.waitFor({ state: "visible", timeout: 60_000 });
    const opening = await frame.locator("body").evaluate(() => {
      const presentation = window.AMFVPresentationBridge.extract(document, getComputedStyle);
      return { presentation, statusText: document.querySelector("#windowport .GridWindow")?.innerText ?? "" };
    });
    if (opening.presentation.activeInput?.kind !== "char") throw new Error("Expected startup character input.");
    await beginStory.click();
    await storyReady.waitFor({ state: "visible", timeout: 60_000 });
    await commandInput.waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForFunction(() => {
      const input = document.querySelector("#command-input");
      return input instanceof HTMLInputElement && !input.disabled;
    }, undefined, { timeout: 60_000 });

    startup = { command: " ", inputKind: "char", before: opening,
      nextInputId: await activeInputLineId(frame),
      after: await frame.locator("body").evaluate(() => window.AMFVPresentationBridge.extract(document, getComputedStyle)) };

    const submit = async (command, trigger) => {
      const inputLineId = await activeInputLineId(frame);
      submittedCommands.push(command);
      if (trigger) await trigger();
      else {
        await commandInput.fill(command);
        await send.click();
      }
      await waitForNewEcho(frame, command, inputLineId);
      await waitForNewLineInput(frame, inputLineId);
      await page.waitForFunction(() => {
        const input = document.querySelector("#command-input");
        return input instanceof HTMLInputElement && !input.disabled;
      }, undefined, { timeout: 60_000 });
      const observed = await extract(frame, command, inputLineId);
      submissions.push({ command, inputKind: "line", submittedInputId: inputLineId,
        nextInputId: observed.presentation.lines[observed.presentation.activeInput.line].id,
        echo: observed.presentation.lines[0] });
      observations.push({ command, turnId: inputLineId, submittedInputId: inputLineId,
        nextInputId: observed.presentation.lines[observed.presentation.activeInput.line].id,
        presentation: observed.presentation, statusText: observed.statusText, status: parseStatus(observed.statusText) });
      if (observations.length <= 80 && /Record buffer full|Auto-deactivation|not currently active/i.test(observed.presentation.lines.map(({ text }) => text).join("\n"))) routeFailure("Recording capacity/activation failure in prefix.");
      process.stdout.write(`Session ${id} ${command}: ${parseStatus(observed.statusText).location} / ${parseStatus(observed.statusText).mode}\n`);
    };

    await submit("PEOF");
    for (let turn = 0; turn < 4; turn += 1) await submit("WAIT");
    const inputLineId = await activeInputLineId(frame);
    submittedCommands.push("ENTER SIMULATION MODE");
    await commandInput.fill("ENTER SIMULATION MODE");
    await send.click();
    await waitForNewEcho(frame, "ENTER SIMULATION MODE", inputLineId);

    const decoder = page.getByRole("button", { name: /Submit code/ });
    await decoder.waitFor({ state: "visible", timeout: 60_000 });
    const answer = (await decoder.innerText()).match(/(\d+)\s*$/)?.[1];
    if (!answer) throw new Error("The assisted decoder did not expose a canonical numeric answer.");
    securityPrompt = await extract(frame, "ENTER SIMULATION MODE", inputLineId);
    const numericInputLineId = await activeInputLineId(frame);
    submissions.push({ command: "ENTER SIMULATION MODE", inputKind: "line", submittedInputId: inputLineId,
      nextInputId: numericInputLineId, echo: securityPrompt.presentation.lines[0], ...securityPrompt });
    submittedCommands.push(answer);
    if (id === 1) {
      // Guided replaces the numeric form with its decoder button. Classic
      // exposes the real editable form without changing canonical input.
      const toggle = page.getByTitle(/Reading and play settings|読書とプレイの設定/);
      await toggle.click();
      await page.locator(".interaction-segments button").nth(0).click();
      await toggle.click();
      await commandInput.fill(answer);
      await send.click();
    } else await decoder.click();
    await waitForNewLineInput(frame, numericInputLineId);
    await page.waitForFunction(() => {
      const input = document.querySelector("#command-input");
      return input instanceof HTMLInputElement && !input.disabled;
    }, undefined, { timeout: 60_000 });
    const numericResult = await extract(frame, answer, numericInputLineId);
    const numericEcho = numericResult.presentation.lines[0];
    if (!numericEcho.runs.some((run) => run.classes.includes("Style_input") && run.text === answer)) {
      throw new Error("The current numeric input has no new canonical answer echo.");
    }
    submissions.push({ command: answer, inputKind: "line", role: "security-answer", submittedInputId: numericInputLineId,
      nextInputId: numericResult.presentation.lines[numericResult.presentation.activeInput.line].id,
      echo: numericEcho, ...numericResult });
    const entered = await extract(frame, "ENTER SIMULATION MODE", inputLineId);
    observations.push({
      command: "ENTER SIMULATION MODE",
      turnId: inputLineId,
      submittedInputId: inputLineId,
      nextInputId: entered.presentation.lines[entered.presentation.activeInput.line].id,
      role: "security-answer",
      presentation: entered.presentation,
      statusText: entered.statusText,
      status: parseStatus(entered.statusText),
      inputOwnership: {
        note: "The canonical numeric answer is appended to the security prompt line before the interpreter emits the simulation scene; it is not a standalone command-echo leaf.",
        canonicalNumericInput: answer,
        numericInputLineId,
      },
    });

    if (kind === "full") {
      // Consume, never change, the accepted church capture's exact 81-command
      // prefix and recording windows. Only the decoder answer is runtime-derived.
      for (const command of ["LOOK", "RECORD", "WAIT", "RECORD OFF", ...courthousePath, ...newspaperPath,
        ...restaurantPath, ...cityHallPath, ...powerStationPath, ...churchPath]) await submit(command);
      const accepted = churchFixture.sessions[0];
      if (submittedCommands.length !== 81 || observations.length !== 80) routeFailure("Incomplete church prefix.");
      for (const [i, command] of submittedCommands.entries()) {
        if (i !== 6 && canonical(command) !== canonical(accepted.submittedCommands[i])) routeFailure(`Prefix command mismatch: ${i}`);
      }
      for (const [i, turn] of observations.entries()) {
        const expected = accepted.observations[i].status;
        if (turn.status.location !== expected.location || turn.status.mode !== expected.mode) routeFailure(`Prefix status/recording mismatch: ${i}`);
      }
      surfaceAudit.push(await auditSurfaces(page, observations.length - 1, "before-cinema"));
      for (const [index, command] of cinemaPath.entries()) {
        let method = "canonical command form";
        if (id === 2 && index < 5) {
          if (index === 3) {
            await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
            await page.locator(".companion-tabs").getByRole("tab").nth(1).click();
            await submit("east", () => page.locator(".map-section .exit-list button").filter({ has: page.locator("small", { hasText: /^east$/ }) }).click());
            await page.locator(".close-context").click();
            method = "Guided companion exit: direct single click";
          } else {
            await page.locator(".compact-map-button").click();
            const drawer = page.locator(".fieldwork-drawer");
            await drawer.locator(".navigator-hotspots button").filter({ hasText: /^Cinema$/ }).click();
            await drawer.locator(".navigator-route-actions button").first().click();
            const draft = await commandInput.inputValue();
            if (canonical(draft) !== command) throw new Error(`Unexpected route draft: ${draft}`);
            await submit(draft);
            method = "Guided map route: editable draft then explicit Send";
          }
        } else if (id === 2 && [6, 8, 9].includes(index)) {
          await submit(command.toLowerCase(), () => page.locator(".quick-actions button").nth(index === 9 ? 0 : 1).click());
          method = "Guided quick action: direct single click";
        } else if (id === 2 && index >= 10) {
          const toggle = page.getByTitle(/Reading and play settings|読書とプレイの設定/);
          await toggle.click();
          await page.locator(".access-panel").getByRole("button", { name: "日本語", exact: true }).click();
          await page.locator(".interaction-segments button").nth(2).click();
          await toggle.click();
          const alias = ({ W: "west", S: "south" })[command] ?? command.toLowerCase();
          await submit(alias, () => page.locator(".compass-exit").filter({ has: page.getByText(command, { exact: true }) }).click());
          method = "Japanese Actions compass: direct single click";
        } else await submit(command);
        const turn = observations.at(-1);
        turn.submissionMethod = method;
        // Identity derived from observed status matched to the generated route;
        // never an interpreter global/flag or an inferred theatre room.
        turn.roomId = cinemaRoomIds[index];
        const text = turn.presentation.lines.map(({ text }) => text).join("\n");
        const expectedMode = [6, 7].includes(index) ? "Simulation Mode (recording)" : "Simulation Mode";
        if (turn.status.location !== cinemaLocations[index] || turn.status.mode !== expectedMode
          || /Record buffer full|Auto-deactivation|not currently active/i.test(text)
          || (index === 5 && (!/ticket/i.test(text) || !/\$\d/.test(text)))
          || (index === 7 && !/The usher takes your ticket[\s\S]*Movie Theatre[\s\S]*Upbeat Patrol II[\s\S]*fifteen minutes[\s\S]*lobby/.test(text))) {
          if (index === 7) surfaceAudit.push(await auditSurfaces(page, observations.length - 1, "stopped-after-movie"));
          routeFailure(`Cinema step ${index}: expected ${cinemaLocations[index]} / ${expectedMode}; observed ${turn.status.location} / ${turn.status.mode}`);
        }
        const phase = ({ 0: "outbound-0", 1: "outbound-1", 2: "outbound-2", 3: "museum-entrance", 4: "cinema-before-ticket", 5: "ticket-purchased", 6: "recording-before-movie", 7: "movie-returned-lobby", 8: "explicit-off", 9: "lobby-look", 10: "return-museum", 14: "returned-park" })[index];
        if (phase) surfaceAudit.push(await auditSurfaces(page, observations.length - 1, phase));
      }
    } else {
      // Independent fresh shortest outbound; no tasks, purchase or recording.
      for (const [index, command] of [...cinemaPath.slice(0, 5), "IN"].entries()) {
        await submit(command);
        const turn = observations.at(-1);
        turn.roomId = cinemaRoomIds[Math.min(index, 4)];
        if (turn.status.location !== cinemaLocations[Math.min(index, 4)] || turn.status.mode !== "Simulation Mode") routeFailure(`No-ticket probe status mismatch: ${index}`);
      }
      const text = observations.at(-1).presentation.lines.map(({ text }) => text).join("\n");
      if (!/ticket/i.test(text) || /Movie Theatre|You begin watching|usher takes/.test(text)) routeFailure("No-ticket IN did not yield a refusal.");
    }
    bridgeCommands = await frame.locator("body").evaluate(() => window.cinemaCommandObservations);
    return result();
  } catch (error) {
    bridgeCommands = await page.frameLocator('iframe[src="/player.html"]').locator("body")
      .evaluate(() => window.cinemaCommandObservations ?? []).catch(() => []);
    const failureObservation = await page.frameLocator('iframe[src="/player.html"]').locator("body")
      .evaluate(() => ({ presentation: window.AMFVPresentationBridge.extract(document, getComputedStyle),
        statusText: document.querySelector("#windowport .GridWindow")?.textContent ?? "" })).catch(() => null);
    return { ...result(), failureObservation, [error.name === "RouteFailure" ? "routeFailure" : "harnessFailure"]: { name: error.name, message: error.message, stack: error.stack } };
  } finally {
    await context.close();
  }
};

const browser = await chromium.launch();
try {
  const sessions = [];
  let noTicketProbe;
  const fixture = () => ({
    provenance: `Runtime-observed with Playwright in Chromium against canonical Release 79 Parchment; production static export at ${baseURL}; isolated fresh contexts captured ${new Date().toISOString()}. No VM edits, restores, or historical-source prose.`,
    candidate: "Cinema after six accepted fieldwork tasks; no route adoption implied",
    outcome: sessions.some(({ warnings }) => warnings.some(({ texts }) => texts.some((text) => /Record buffer full/.test(text))))
      ? "stopped-record-buffer-full" : sessions.length === 2 && noTicketProbe
        && !sessions.some(({ harnessFailure, routeFailure }) => harnessFailure || routeFailure)
        && !noTicketProbe.harnessFailure && !noTicketProbe.routeFailure ? "adoption-pending" : "incomplete",
    canonicalSha256, prefixPath, courthousePath, newspaperPath, restaurantPath, cityHallPath,
    powerStationPath, powerStationLocations, churchPath, churchLocations, churchRoomIds,
    cinemaPath, cinemaLocations, cinemaRoomIds, sessions, noTicketProbe,
  });
  const sessionIds = argument("--session-ids", "1,2").split(",").map(Number);
  if (!sessionIds.length || sessionIds.some((id) => ![1, 2].includes(id)) || new Set(sessionIds).size !== sessionIds.length) throw new Error("--session-ids must be 1, 2, or 1,2.");
  for (const id of sessionIds) {
    const session = await captureSession(browser, id);
    sessions.push(session);
    // A failed context stops at its first failing turn. A second fresh
    // context repeats the unchanged candidate; it never continues that context.
    await writeFile(`${output}.partial`, `${JSON.stringify(fixture(), null, 2)}\n`);
  }
  // This independent negative probe does not continue or repair a failed path.
  noTicketProbe = await captureSession(browser, "no-ticket", "no-ticket-probe");
  if (sessions.some(({ harnessFailure, routeFailure }) => harnessFailure || routeFailure)
    || noTicketProbe.harnessFailure || noTicketProbe.routeFailure || sessions.length !== 2) process.exitCode = 1;
  await writeFile(process.exitCode ? failureOutput : output, `${JSON.stringify(fixture(), null, 2)}\n`);
  process.stdout.write(`Captured ${sessions.length} full attempts and ${noTicketProbe ? 1 : 0} separate no-ticket probe to ${process.exitCode ? failureOutput : output}\n`);
} finally {
  await browser.close();
}
