import { writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};

const baseURL = argument("--base-url", "http://127.0.0.1:3100");
const output = argument("--output", "/tmp/parchment-courthouse-runtime-observed.json");
const prefixPath = ["PEOF", "WAIT", "WAIT", "WAIT", "WAIT", "ENTER SIMULATION MODE", "<observed decoder answer>", "LOOK", "RECORD", "WAIT", "RECORD OFF"];
const capturePath = ["RECORD", "SW", "NW", "LOOK", "SE", "NE", "RECORD OFF"];

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

const extract = async (frame, command, startAtEnter = false) => frame.locator("body").evaluate((_body, options) => {
  const bridge = window.AMFVPresentationBridge;
  if (!bridge) throw new Error("AMFVPresentationBridge is unavailable.");
  const full = bridge.extract(document, (element) => getComputedStyle(element));
  const echo = options.startAtEnter ? ">ENTER SIMULATION MODE" : `>${options.command}`;
  const start = full.lines.findLastIndex(({ text }) => text.toUpperCase() === echo.toUpperCase());
  if (start < 0) throw new Error(`Command echo is unavailable: ${echo}`);
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
}, { command, startAtEnter });

const captureSession = async (browser, id) => {
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
    const observations = [];

    const submit = async (command) => {
      await commandInput.fill(command);
      await send.click();
      await page.waitForFunction(() => {
        const input = document.querySelector("#command-input");
        return input instanceof HTMLInputElement && !input.disabled;
      }, undefined, { timeout: 60_000 });
      const observed = await extract(frame, command);
      observations.push({ command, presentation: observed.presentation, status: parseStatus(observed.statusText) });
    };

    await submit("PEOF");
    for (let turn = 0; turn < 4; turn += 1) await submit("WAIT");
    await submit("ENTER SIMULATION MODE");

    const decoder = page.getByRole("button", { name: /Submit code/ });
    await decoder.waitFor({ state: "visible", timeout: 60_000 });
    const answer = (await decoder.innerText()).match(/(\d+)\s*$/)?.[1];
    if (!answer) throw new Error("The assisted decoder did not expose a canonical numeric answer.");
    await decoder.click();
    await page.waitForFunction(() => {
      const input = document.querySelector("#command-input");
      return input instanceof HTMLInputElement && !input.disabled;
    }, undefined, { timeout: 60_000 });
    const entered = await extract(frame, answer, true);
    observations.push({
      command: answer,
      role: "security-answer",
      presentation: entered.presentation,
      status: parseStatus(entered.statusText),
      inputOwnership: {
        note: "The canonical numeric answer is appended to the security prompt line before the interpreter emits the simulation scene; it is not a standalone command-echo leaf.",
        canonicalNumericInput: answer,
      },
    });

    for (const command of ["LOOK", "RECORD", "WAIT", "RECORD OFF"]) await submit(command);
    observations.length = 0;
    for (const command of capturePath) await submit(command);
    return { id, observations };
  } finally {
    await context.close();
  }
};

const browser = await chromium.launch();
try {
  const sessions = [];
  for (let id = 1; id <= 2; id += 1) sessions.push(await captureSession(browser, id));
  const fixture = {
    provenance: `Runtime-observed with Playwright in Chromium against canonical Release 79 Parchment on ${new Date().toISOString().slice(0, 10)}; sanitized BridgePresentation v3 turn slices from two isolated fresh browser contexts. Output text is canonical English. Status fields are parsed from the observed GridWindow; no fixture prose was supplied by historical source.`,
    prefixPath,
    path: capturePath,
    stableIdentity: {
      route: ["Kennedy Park", "Elm & Park", "Courthouse", "Elm & Park", "Kennedy Park"],
      recordingStartsBefore: "SW",
      recordingEndsAfter: "NE",
    },
    dynamicFields: ["first-simulation month/day", "first-simulation time", "optional 2041 street/city-noise interrupts"],
    sessions,
  };
  await writeFile(output, `${JSON.stringify(fixture, null, 2)}\n`);
  process.stdout.write(`Captured two fresh Courthouse sessions to ${output}\n`);
} finally {
  await browser.close();
}
