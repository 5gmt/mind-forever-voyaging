import { writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};

const baseURL = argument("--base-url", "http://127.0.0.1:3100");
const output = argument("--output", "/tmp/parchment-power-station-runtime-observed.json");
const prefixPath = ["PEOF", "WAIT", "WAIT", "WAIT", "WAIT", "ENTER SIMULATION MODE", "<observed decoder answer>", "LOOK", "RECORD", "WAIT", "RECORD OFF"];
const courthousePath = ["RECORD", "SW", "NW", "LOOK", "SE", "NE", "RECORD OFF"];
// The accepted restaurant A prefix remains exactly 40 actual line submissions,
// including the runtime-derived decoder answer. City Hall adds ten submissions.
const newspaperPath = ["INVENTORY", "NE", "N", "NE", "RECORD", "BUY NEWSPAPER", "READ NEWSPAPER", "RECORD OFF", "SW", "S", "SW"];
const restaurantPath = ["SW", "W", "W", "S", "RECORD", "BUY MEAL", "RECORD OFF", "N", "E", "E", "NE"];
const cityHallPath = ["NE", "W", "W", "RECORD", "GOVERNMENT OFFICIAL, HELLO", "RECORD OFF", "LOOK", "E", "E", "SW"];
const powerStationPath = ["SE", "E", "S", "S", "SE", "SE", "S", "RECORD", "LOOK", "RECORD OFF", "N", "NW", "NW", "N", "N", "W", "NW"];
const powerStationLocations = ["Elm & Kennedy", "Elm & River", "Southway & River", "Bend", "Wicker & River", "Power Station Entrance", "Power Station", "Power Station", "Power Station", "Power Station", "Power Station Entrance", "Wicker & River", "Bend", "Southway & River", "Elm & River", "Elm & Kennedy", "Kennedy Park"];



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
        compass: await snapshot(".movement-compass"), sceneActions: await snapshot(".scene-actions"),
        quickActions: await snapshot(".quick-actions"), recordingReminder: await snapshot(".record-reminder"),
        commandHelp: await snapshot("#command-help"),
      };
      // Guided SceneActions only prepare editable English; do not submit it.
      if (mode === "guided") {
        const actions = page.locator(".scene-actions:visible button");
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
      await page.locator(".close-context").click();
      const map = page.locator(".compact-map-button");
      sample.mapButtonVisible = await map.isVisible();
      if (sample.mapButtonVisible) {
        await map.click();
        const drawer = page.locator(".fieldwork-drawer");
        await drawer.locator(".navigator-hotspots button").filter({ hasText: /Power Station/ }).click();
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

const captureSession = async (browser, id) => {
  const startedAt = new Date().toISOString();
  const observations = [];
  const submittedCommands = [];
  const surfaceAudit = [];
  let securityPrompt;
  let startup;
  const submissions = [];
  let bridgeCommands = [];
  const result = () => ({ id, startedAt, finishedAt: new Date().toISOString(), recordingWindow: "on-site",
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
      window.powerStationCommandObservations = [];
      window.addEventListener("message", (event) => {
        // Observe parent-to-player requests. The existing player reports a
        // line command both on keydown and after submission; those reports
        // are notifications, not two canonical sends.
        if (window.parent !== window && event.source === window.parent && event.origin === window.location.origin
          && event.data?.channel === "amfv:bridge" && event.data.type === "command") {
          window.powerStationCommandObservations.push(event.data.command);
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
    await decoder.click();
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

    for (const command of ["LOOK", "RECORD", "WAIT", "RECORD OFF"]) await submit(command);
    for (const command of [...courthousePath, ...newspaperPath]) await submit(command);
    for (const command of restaurantPath) {
      await submit(command);
    }
    // Exactly the accepted fifty submissions and recording windows come first.
    for (const command of cityHallPath) await submit(command);
    surfaceAudit.push(await auditSurfaces(page, observations.length - 1, "before-power-station"));
    for (const [index, command] of powerStationPath.entries()) {
      let method = "canonical command form";
      const directionAlias = { E: "east", W: "west", S: "south", N: "north" };
      if (id === 2 && index < 7) {
        await page.locator(".compact-map-button").click();
        const drawer = page.locator(".fieldwork-drawer");
        await drawer.locator(".navigator-hotspots button").filter({ hasText: /Power Station/ }).click();
        await drawer.locator(".navigator-route-actions button").first().click();
        const draft = await commandInput.inputValue();
        if (draft.toUpperCase() !== command && draft !== directionAlias[command]) throw new Error(`Unexpected route draft: ${draft}`);
        await submit(draft);
        method = "Guided map route: editable draft then explicit Send";
      } else if (id === 2 && index <= 9) {
        await submit(command.toLowerCase(), () => page.locator(".quick-actions button").nth(index === 8 ? 0 : 1).click());
        method = "Guided quick action: one explicit click";
      } else if (id === 2) {
        const toggle = page.getByTitle(/Reading and play settings|読書とプレイの設定/);
        await toggle.click();
        await page.locator(".access-panel").getByRole("button", { name: "日本語", exact: true }).click();
        await page.locator(".interaction-segments button").nth(2).click();
        await toggle.click();
        await submit(directionAlias[command] ?? command.toLowerCase(), () => page.locator(".compass-exit")
          .filter({ has: page.getByText(command, { exact: true }) }).click());
        method = "Japanese Action menus compass: one explicit click";
      } else await submit(command);
      const turn = observations.at(-1);
      turn.submissionMethod = method;
      const expectedMode = [7, 8].includes(index) ? "Simulation Mode (recording)" : "Simulation Mode";
      if (turn.status.location !== powerStationLocations[index] || turn.status.mode !== expectedMode
        || /Record buffer full|Auto-deactivation|not currently active/i.test(turn.presentation.lines.map(({ text }) => text).join("\n"))) {
        const failure = new Error(`Power Station step ${index}: expected ${powerStationLocations[index]} / ${expectedMode}, observed ${turn.status.location} / ${turn.status.mode}`);
        failure.name = "RouteFailure";
        throw failure;
      }
      const phase = index < 5 ? `outbound-${index}` : ({ 5: "entrance", 6: "facility-off", 7: "facility-recording", 8: "recorded-look", 9: "explicit-off", 16: "returned-park" })[index];
      if (phase) surfaceAudit.push(await auditSurfaces(page, observations.length - 1, phase));
    }
    bridgeCommands = await frame.locator("body").evaluate(() => window.powerStationCommandObservations);
    return result();
  } catch (error) {
    bridgeCommands = await page.frameLocator('iframe[src="/player.html"]').locator("body")
      .evaluate(() => window.powerStationCommandObservations ?? []).catch(() => []);
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
  for (const id of [1, 2]) {
    sessions.push(await captureSession(browser, id));
    // Preserve partial observations even if a later attempt fails.
    await writeFile(output, `${JSON.stringify({ sessions }, null, 2)}\n`);
  }
  const fixture = {
    provenance: `Runtime-observed with Playwright in Chromium against canonical Release 79 Parchment; ${sessions.length} isolated fresh contexts captured ${new Date().toISOString()}. No VM edits, restores, or historical-source prose.`,
    candidate: "Power Station after the four accepted fieldwork tasks",
    canonicalSha256: "14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d",
    prefixPath, courthousePath, newspaperPath,
    restaurantPath, cityHallPath, powerStationPath, powerStationLocations,
    sessions,
  };
  await writeFile(output, `${JSON.stringify(fixture, null, 2)}\n`);
  if (sessions.some(({ harnessFailure, routeFailure }) => harnessFailure || routeFailure)) process.exitCode = 1;
  process.stdout.write(`Captured ${sessions.length} fresh four-task-to-Power-Station attempts to ${output}\n`);
} finally {
  await browser.close();
}
