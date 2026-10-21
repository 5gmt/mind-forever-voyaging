import { writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};

const baseURL = argument("--base-url", "http://127.0.0.1:3100");
const output = argument("--output", "/tmp/parchment-restaurant-runtime-observed.json");
const prefixPath = ["PEOF", "WAIT", "WAIT", "WAIT", "WAIT", "ENTER SIMULATION MODE", "<observed decoder answer>", "LOOK", "RECORD", "WAIT", "RECORD OFF"];
const courthousePath = ["RECORD", "SW", "NW", "LOOK", "SE", "NE", "RECORD OFF"];
const newspaperPath = ["INVENTORY", "RECORD", "NE", "N", "NE", "BUY NEWSPAPER", "READ NEWSPAPER", "SW", "S", "SW", "RECORD OFF"];
// Test travel recording once, then the smallest meal-only window twice.
const attempts = ["travel", "meal", "meal"];
const restaurantPath = (window) => window === "travel"
  ? ["RECORD", "SW", "W", "W", "S", "BUY MEAL", "N", "E", "E", "NE", "RECORD OFF"]
  : ["SW", "W", "W", "S", "RECORD", "BUY MEAL", "RECORD OFF", "N", "E", "E", "NE"];


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
  const statusText = Array.from(document.querySelectorAll("#gameport .GridWindow")).map((node) => node.textContent ?? "").join("\n");
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

// Only wrapper preferences, map selection, and a Guided draft change during an
// audit. No interpreter state is written and no extra story command is sent.
const auditSurfaces = async (page, observationIndex) => {
  const samples = [];
  const settings = page.locator(".access-panel");
  const toggle = page.getByTitle(/Reading and play settings|読書とプレイの設定/);
  for (const locale of ["English", "日本語"]) {
    await toggle.click();
    await settings.getByRole("button", { name: locale, exact: true }).click();
    await toggle.click();
    for (const [index, mode] of ["classic", "guided", "actions"].entries()) {
      await toggle.click();
      await settings.locator(".interaction-segments button").nth(index).click();
      await toggle.click();
      const snapshot = async (selector) => {
        const nodes = page.locator(selector);
        const values = [];
        for (const node of await nodes.all()) values.push({ visible: await node.isVisible(), aria: await node.ariaSnapshot() });
        return values;
      };
      const sample = { locale, mode,
        location: await page.locator(".location-block").innerText(),
        compass: await snapshot(".movement-compass"),
        sceneActions: await snapshot(".scene-actions"),
      };
      await page.getByTitle(/Toggle companion|ガイドの表示を切り替える/).click();
      sample.companionTabs = await page.locator(".companion-tabs").ariaSnapshot();
      if (mode !== "classic") {
        await page.locator(".companion-tabs").getByRole("tab").nth(1).click();
      }
      sample.context = await snapshot(".map-section");
      await page.locator(".close-context").click();
      const map = page.locator(".compact-map-button");
      sample.mapButtonVisible = await map.isVisible();
      if (sample.mapButtonVisible) {
        await map.click();
        const drawer = page.locator(".fieldwork-drawer");
        await drawer.locator(".navigator-hotspots button").filter({ hasText: /Restaurant|レストラン/ }).click();
        await drawer.locator(".navigator-route").waitFor({ state: "visible" });
        sample.map = await drawer.ariaSnapshot();
        const step = drawer.locator(".navigator-route-actions button").first();
        if (mode === "guided" && await step.count() && /next step|次の移動/i.test(await step.innerText())) {
          await step.click();
          sample.guidedDraft = await page.locator("#command-input").inputValue();
          await page.locator("#command-input").fill("");
        } else {
          await drawer.locator(".fieldwork-close").click();
        }
      }
      samples.push(sample);
    }
  }
  await toggle.click();
  await settings.getByRole("button", { name: "English", exact: true }).click();
  await settings.locator(".interaction-segments button").nth(1).click();
  await toggle.click();
  return { observationIndex, samples };
};

const captureSession = async (browser, id, recordingWindow) => {
  const startedAt = new Date().toISOString();
  const observations = [];
  const submittedCommands = [];
  const surfaceAudit = [];
  let securityPrompt;
  const result = () => ({ id, startedAt, finishedAt: new Date().toISOString(), recordingWindow,
    viewport: { width: 1440, height: 900 }, commands: observations.map(({ command }) => command),
    submittedCommands, securityPrompt, observations, surfaceAudit });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  try {
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
    if (await beginStory.isVisible()) await beginStory.click();
    await storyReady.waitFor({ state: "visible", timeout: 60_000 });
    await commandInput.waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForFunction(() => {
      const input = document.querySelector("#command-input");
      return input instanceof HTMLInputElement && !input.disabled;
    }, undefined, { timeout: 60_000 });

    const submit = async (command) => {
      const inputLineId = await activeInputLineId(frame);
      submittedCommands.push(command);
      await commandInput.fill(command);
      await send.click();
      await waitForNewEcho(frame, command, inputLineId);
      await waitForNewLineInput(frame, inputLineId);
      await page.waitForFunction(() => {
        const input = document.querySelector("#command-input");
        return input instanceof HTMLInputElement && !input.disabled;
      }, undefined, { timeout: 60_000 });
      const observed = await extract(frame, command, inputLineId);
      observations.push({ command, submittedInputId: inputLineId,
        nextInputId: observed.presentation.lines[observed.presentation.activeInput.line].id,
        presentation: observed.presentation, status: parseStatus(observed.statusText) });
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
    submittedCommands.push(answer);
    const numericInputLineId = await activeInputLineId(frame);
    await decoder.click();
    await waitForNewLineInput(frame, numericInputLineId);
    await page.waitForFunction(() => {
      const input = document.querySelector("#command-input");
      return input instanceof HTMLInputElement && !input.disabled;
    }, undefined, { timeout: 60_000 });
    const entered = await extract(frame, "ENTER SIMULATION MODE", inputLineId);
    observations.push({
      command: "ENTER SIMULATION MODE",
      submittedInputId: inputLineId,
      nextInputId: entered.presentation.lines[entered.presentation.activeInput.line].id,
      role: "security-answer",
      presentation: entered.presentation,
      status: parseStatus(entered.statusText),
      inputOwnership: {
        note: "The canonical numeric answer is appended to the security prompt line before the interpreter emits the simulation scene; it is not a standalone command-echo leaf.",
        canonicalNumericInput: answer,
        numericInputLineId,
      },
    });

    for (const command of ["LOOK", "RECORD", "WAIT", "RECORD OFF"]) await submit(command);
    for (const command of [...courthousePath, ...newspaperPath]) await submit(command);
    for (const command of restaurantPath(recordingWindow)) {
      await submit(command);
      if (id === 3 && ["SW", "W", "S", "RECORD", "BUY MEAL", "RECORD OFF", "NE"].includes(command)) {
        surfaceAudit.push(await auditSurfaces(page, observations.length - 1));
      }
    }
    return result();
  } catch (error) {
    return { ...result(), harnessFailure: { name: error.name, message: error.message, stack: error.stack } };
  } finally {
    await context.close();
  }
};

const browser = await chromium.launch();
try {
  const sessions = [];
  for (const [index, recordingWindow] of attempts.entries()) {
    sessions.push(await captureSession(browser, index + 1, recordingWindow));
    // Preserve partial observations even if a later attempt fails.
    await writeFile(output, `${JSON.stringify({ sessions }, null, 2)}\n`);
  }
  const fixture = {
    provenance: `Runtime-observed with Playwright in Chromium against canonical Release 79 Parchment; three isolated fresh contexts captured ${new Date().toISOString()}. No VM edits, restores, or historical-source prose.`,
    canonicalSha256: "14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d",
    prefixPath, courthousePath, newspaperPath,
    attempts, restaurantPaths: { travel: restaurantPath("travel"), meal: restaurantPath("meal") },
    sessions,
  };
  await writeFile(output, `${JSON.stringify(fixture, null, 2)}\n`);
  if (sessions.some(({ harnessFailure }) => harnessFailure)) process.exitCode = 1;
  process.stdout.write(`Captured three fresh Courthouse-to-Newspaper-to-Restaurant attempts to ${output}\n`);
} finally {
  await browser.close();
}
