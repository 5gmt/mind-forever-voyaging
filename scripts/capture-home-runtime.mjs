import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { link, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "@playwright/test";
import { WORLD_ROOMS } from "../app/world-data.ts";

const { values: args } = parseArgs({ options: {
  "base-url": { type: "string", default: "http://127.0.0.1:3100" },
  output: { type: "string" },
  "failure-output": { type: "string" },
} });
const baseURL = new URL(args["base-url"]);
const runRoot = await mkdtemp(join(tmpdir(), "amfv-home-runtime-"));
const output = resolve(args.output ?? join(runRoot, "parchment-home-runtime-observed.json"));
const failureOutput = resolve(args["failure-output"] ?? join(runRoot, "parchment-home-runtime-failure.json"));
assert.notEqual(output, failureOutput, "Success and failure destinations must differ.");
console.log(`Capture root: ${runRoot}`);

const cinema = JSON.parse(await readFile(new URL("../tests/fixtures/parchment-cinema-recording-a-observed.json", import.meta.url), "utf8"));
const checksum = (bytes) => createHash("sha256").update(bytes).digest("hex");
const canonicalSha256 = checksum(await readFile(new URL("../public/amfv-r79-s851122.z4", import.meta.url)));
const viewport = { width: 1440, height: 900 };
const recording = "Simulation Mode (recording)";
const normal = "Simulation Mode";
const doorOpens = "The door opens.";
const lobbyEntry = "You enter the inner lobby and take the elevator up to your floor.";
const livingRoomLeaves = [
  "Living Room",
  "This is the large living area of your apartment, with a bedroom to the north and a kitchen to the east. The front door of the apartment, next to the couch on the south wall, is open. A huge window provides a panoramic view to the west.",
  "Jill's easel occupies a beautiful, well-lit spot near the window. Her current painting is on the easel. In one corner is the old word processor where you do your writing.",
];
const homePath = [
  ["SW", "ELM-AND-PARK"],
  ["S", "SOUTHWAY-AND-PARK"],
  ["W", "PARKVIEW-APARTMENTS"],
  ["OPEN DOOR WITH KEY", "PARKVIEW-APARTMENTS", normal, [doorOpens]],
  ["IN", "PARKVIEW-HALL", normal, [lobbyEntry]],
  ["OPEN DOOR WITH KEY", "PARKVIEW-HALL", normal, [doorOpens]],
  ["N", "LIVING-ROOM", normal, livingRoomLeaves],
  ["RECORD", "LIVING-ROOM", recording],
  ["LOOK", "LIVING-ROOM", recording, livingRoomLeaves],
  ["RECORD OFF", "LIVING-ROOM"],
  ["S", "PARKVIEW-HALL"],
  ["E", "PARKVIEW-APARTMENTS"],
  ["E", "SOUTHWAY-AND-PARK"],
  ["N", "ELM-AND-PARK"],
  ["NE", "KENNEDY-PARK"],
];
const lockedPath = [
  ...homePath.slice(0, 3),
  ["IN", "PARKVIEW-APARTMENTS", normal, ["The door to the inner lobby is locked."]],
  ...homePath.slice(3, 5),
  ["N", "PARKVIEW-HALL", normal, ["The door is closed."]],
];
const aliases = { east: "E", west: "W", north: "N", south: "S", northeast: "NE", northwest: "NW", southeast: "SE", southwest: "SW" };
const canonical = (command) => aliases[command.toLowerCase()] ?? command.toUpperCase();
const prefix = cinema.sessions[0].submittedCommands.map(canonical);
const body = (turn) => turn.presentation.lines.slice(1, -1).map(({ text }) => text.trim());
const requiredPrefixLeaves = new Map([13, 22, 23, 33, 43, 57, 72, 85, 87, 89].map((index) => {
  const [first, second] = cinema.sessions.map((session) => body(session.observations[index]));
  const shared = first.filter((text) => text && !text.startsWith("WARNING:") && second.includes(text));
  assert.ok(shared.length > 0, `Missing accepted prefix evidence at observation ${index}`);
  return [index, shared];
}));
const clockMinutes = (time) => {
  const [, hours, minutes, suffix] = time.match(/^(\d+):(\d+)(am|pm)$/);
  return Number(hours) % 12 * 60 + Number(minutes) + (suffix === "pm" ? 720 : 0);
};

const simulationRoomId = (status) => {
  if (!status.mode.startsWith(normal)) return null;
  const year = status.date.split("/").at(-1);
  const rooms = WORLD_ROOMS.filter((room) => !room.id.startsWith("EPILOGUE-") && (room.yearNames[year] ?? room.name) === status.location);
  return rooms.length === 1 ? rooms[0].id : null;
};
const parseStatus = (raw) => {
  const match = raw.match(/Mode:\s+(.+?)\s+Time:\s+(.+?)\s+Location:\s+(.+?)\s+Date:\s+([^\n]+?)\s*$/s);
  assert.ok(match, `Unrecognized live status: ${raw}`);
  const [, mode, time, location, date] = match;
  return { mode, time, location, date };
};
const requireLeaves = (turn, expected) => {
  const leaves = body(turn);
  let cursor = 0;
  for (const text of expected) {
    const found = leaves.indexOf(text, cursor);
    assert.ok(found >= cursor, `${turn.command} at ${turn.status.location}: missing ${JSON.stringify(text)}`);
    cursor = found + 1;
  }
};

const evidence = {
  provenance: "Playwright Chromium against a production static export. Raw observations from live Release 79 Parchment, with a fresh browser context per session.",
  baseURL: baseURL.href,
  runId: randomUUID(),
  startedAt: new Date().toISOString(),
  canonicalSha256,
  candidate: "2041 home after cinema candidate A",
  outcome: "incomplete",
  sessions: [],
  lockedDoorProbe: null,
};
const json = () => `${JSON.stringify(evidence, null, 2)}\n`;
const checkpoint = async () => {
  await writeFile(join(runRoot, "partial.tmp"), json());
  await rename(join(runRoot, "partial.tmp"), join(runRoot, "parchment-home-runtime.partial.json"));
};
const publish = async (destination) => {
  await mkdir(dirname(destination), { recursive: true });
  const staging = await mkdtemp(join(dirname(destination), ".home-runtime-"));
  try {
    const file = join(staging, "fixture.json");
    await writeFile(file, json());
    // Publish atomically and refuse to replace evidence from an earlier run.
    await link(file, destination);
  } finally {
    await rm(staging, { recursive: true });
  }
};
const failureDetails = (error) => ({ name: error.name, message: error.message, stack: error.stack });

const captureSession = async (browser, session) => {
  const context = await browser.newContext({ viewport });
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(30_000);
    await page.addInitScript(() => {
      window.homeCaptureCommands = [];
      window.addEventListener("message", (event) => {
        if (event.origin !== location.origin || event.data?.channel !== "amfv:bridge") return;
        if (window !== window.parent && event.source === window.parent && event.data.type === "command") {
          window.homeCaptureCommands.push(event.data.command);
        }
        if (event.source === document.querySelector('iframe[src="/player.html"]')?.contentWindow && event.data.type === "transcript") {
          const { acceptsInput, inputKind, presentation } = event.data;
          window.homeCaptureReport = { acceptsInput, inputKind, inputId: presentation?.lines[presentation.activeInput?.line]?.id };
        }
      });
    });
    const frame = page.frameLocator('iframe[src="/player.html"]');
    const player = frame.locator("body");
    const form = page.locator("#command-input");
    const send = page.getByRole("button", { name: /^Send$/i });
    const readPlayer = (inputId) => player.evaluate((_body, id) => {
      const presentation = window.AMFVPresentationBridge.extract(document, getComputedStyle);
      const statusText = [...document.querySelectorAll("#windowport .GridWindow")].map((grid) => grid.textContent ?? "").join("\n");
      if (id === undefined) return { presentation, statusText };
      const start = presentation.lines.findIndex((line) => line.id === id);
      if (start === -1) throw new Error(`No raw echo for ${id}`);
      return { statusText, presentation: {
        version: presentation.version,
        lines: presentation.lines.slice(start),
        terminalLine: presentation.terminalLine - start,
        activeInput: { ...presentation.activeInput, line: presentation.activeInput.line - start },
      } };
    }, inputId);
    const inputId = ({ presentation }) => presentation.lines[presentation.activeInput?.line]?.id;
    const waitForReport = async (kind, id) => {
      await page.waitForFunction(({ kind, id }) => window.homeCaptureReport?.acceptsInput
        && window.homeCaptureReport.inputKind === kind && window.homeCaptureReport.inputId === id, { kind, id });
    };
    const waitForForm = () => page.waitForFunction(() => {
      const input = document.querySelector("#command-input");
      return input instanceof HTMLInputElement && !input.disabled;
    });
    const selectMode = async (mode) => {
      const settings = page.getByTitle("Reading and play settings");
      await settings.click();
      await page.locator(".interaction-segments").getByRole("button", { name: mode, exact: true }).click();
      await settings.click();
    };
    const methods = {
      form: async (command) => { await form.fill(command); await send.click(); },
      decoder: () => page.getByRole("button", { name: /Submit code/ }).click(),
      "guided-map-form": async (command) => { assert.equal(await form.inputValue(), command); await send.click(); },
      "quick-action": (command) => page.locator(".quick-actions").getByRole("button", {
        name: { record: "Record", look: "Look", "record off": "Stop recording" }[command], exact: true,
      }).click(),
    };
    let currentInputId;
    const submit = async (command, method = "form") => {
      const numeric = session.submissions.length === 6;
      const question = session.submissions.length === 5;
      const submittedInputId = currentInputId;
      session.pending = { command, method, submittedInputId };
      await checkpoint();
      await methods[method](command);
      await player.evaluate(async (_body, previousId) => {
        const deadline = Date.now() + 25_000;
        while (Date.now() < deadline) {
          const p = window.AMFVPresentationBridge.extract(document, getComputedStyle);
          if (p.activeInput?.kind === "line" && p.lines[p.activeInput.line]?.id !== previousId) return;
          await new Promise((resolve) => setTimeout(resolve, 25));
        }
        throw new Error("Timed out waiting for a distinct live line input.");
      }, submittedInputId);
      const raw = await readPlayer(submittedInputId);
      const echo = raw.presentation.lines[0];
      currentInputId = inputId(raw);
      assert.equal(raw.presentation.activeInput.line, raw.presentation.terminalLine);
      assert.equal(raw.presentation.terminalLine, raw.presentation.lines.length - 1);
      assert.ok(currentInputId && currentInputId !== submittedInputId);
      if (numeric) assert.ok(echo.runs.some(({ classes, text }) => classes.includes("Style_input") && text === command));
      else assert.equal(echo.text.toUpperCase(), `>${command.toUpperCase()}`);
      session.submittedCommands.push(command);
      session.submissions.push({ command, method, inputKind: "line", submittedInputId, nextInputId: currentInputId, echo });
      delete session.pending;
      if (question) {
        session.securityPrompt = raw;
        await waitForReport("line", currentInputId);
        return;
      }
      // Keep the two actual submissions above and the combined decoder
      // observation used by the accepted cinema fixture for comparison.
      const combined = numeric ? await readPlayer(session.submissions[5].submittedInputId) : raw;
      const turnId = combined.presentation.lines[0].id;
      const status = parseStatus(combined.statusText);
      const turn = {
        command: numeric ? prefix[5] : command,
        turnId, submittedInputId: turnId, nextInputId: currentInputId,
        ...combined, status, roomId: simulationRoomId(status),
      };
      session.observations.push(turn);
      for (const text of body(turn).filter((text) => /^WARNING:/i.test(text))) session.warnings.push({ turnId, command, status, text });
      assert.doesNotMatch(body(turn).join("\n"), /record buffer (?:is )?full|auto-deactivation|not currently active/i);
      if (canonical(command) === "RECORD") requireLeaves(turn, ["Record feature activated."]);
      if (canonical(command) === "RECORD OFF") requireLeaves(turn, ["Record feature deactivated."]);
      await waitForReport("line", currentInputId);
      await waitForForm();
      return turn;
    };

    const audit = async (map) => {
      const inputBefore = currentInputId;
      const snapshots = {};
      for (const [name, selector] of Object.entries({
        place: ".location-block", identity: ".identity-rail", compass: ".movement-compass",
        quickActions: ".quick-actions", sceneActions: ".command-deck .scene-actions",
      })) {
        const locator = page.locator(selector);
        snapshots[name] = await locator.count() ? await locator.ariaSnapshot() : null;
      }
      const companion = page.getByTitle("Toggle companion");
      await companion.click();
      const explore = page.getByRole("tab", { name: "Explore", exact: true });
      if (await explore.count()) {
        await explore.click();
        const mapSection = page.locator(".map-section");
        await mapSection.waitFor();
        snapshots.companion = await mapSection.ariaSnapshot();
      }
      await page.locator(".close-context").click();
      const inputAfter = inputId(await readPlayer());
      session.surfaceAudit.push({ afterSubmission: session.submissions.length, inputBefore, inputAfter, ...snapshots, ...(map && { map }) });
      assert.equal(inputAfter, inputBefore, "The surface audit advanced canonical input.");
    };
    const openHomeMap = async () => {
      await page.locator(".compact-map-button").click();
      const drawer = page.locator(".fieldwork-drawer");
      const home = drawer.getByRole("button", { name: /^Your apartment, fieldwork destination/i });
      await home.click();
      const route = drawer.locator(".navigator-route");
      await route.waitFor();
      return { drawer, route, evidence: { landmark: await home.getAttribute("aria-label"), route: await route.ariaSnapshot() } };
    };

    try {
      await page.goto(baseURL.href);
      const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
      await introduction.getByRole("button", { name: /^Begin/ }).click();
      await introduction.waitFor({ state: "hidden" });
      await frame.locator("#windowport .BufferLine").first().waitFor({ state: "attached" });
      await frame.locator("#windowport .Input:not([disabled])").waitFor({ state: "attached" });
      const before = await readPlayer();
      assert.equal(before.presentation.activeInput.kind, "char");
      // Replay the installed bridge's read-only report after the live
      // windowport exists. Startup's space still comes from the real UI.
      await page.locator('iframe[src="/player.html"]').evaluate((iframe) => {
        iframe.contentWindow.postMessage({ channel: "amfv:bridge", type: "request-state" }, location.origin);
      });
      await waitForReport("char", inputId(before));
      await page.getByRole("button", { name: /^Begin the original story/ }).click();
      await waitForForm();
      const after = await readPlayer();
      currentInputId = inputId(after);
      assert.equal(after.presentation.activeInput.kind, "line");
      assert.ok(currentInputId && currentInputId !== inputId(before));
      await waitForReport("line", currentInputId);
      session.startup = { command: " ", inputKind: "char", before, after, nextInputId: currentInputId };

      for (let i = 0; i < (session.kind === "full" ? prefix.length : 7); i += 1) {
        let turn;
        if (i === 6) {
          const decoder = page.getByRole("button", { name: /Submit code/ });
          const answer = (await decoder.innerText()).match(/(\d+)\s*$/)?.[1];
          assert.ok(answer, "Missing current assisted decoder answer.");
          if (session.controls === "form") await selectMode("Classic");
          turn = await submit(answer, session.controls === "form" ? "form" : "decoder");
        } else turn = await submit(prefix[i]);
        if (!turn) continue;
        const index = session.observations.length - 1;
        const { status } = cinema.sessions[0].observations[index];
        assert.deepEqual([turn.status.location, turn.status.mode], [status.location, status.mode], `Cinema prefix observation ${index}`);
        requireLeaves(turn, requiredPrefixLeaves.get(index) ?? []);
        if (index === 87) assert.equal(clockMinutes(turn.status.time) - clockMinutes(session.observations[index - 1].status.time), 15);
      }

      const route = session.kind === "full" ? homePath : lockedPath;
      const mixed = session.controls === "mixed";
      for (const [index, [command, roomId, mode = normal, leaves = []]] of route.entries()) {
        let turn;
        let map;
        if (mixed && index === 0) {
          const inputBefore = currentInputId;
          const { route, evidence } = await openHomeMap();
          await route.getByRole("button", { name: /Draft next step/i }).click();
          const draft = await form.inputValue();
          assert.equal(canonical(draft), command);
          assert.equal(inputId(await readPlayer()), inputBefore, "The Guided map draft submitted a command.");
          session.guidedDraft = { ...evidence, command: draft, inputBefore, inputAfter: inputId(await readPlayer()) };
          turn = await submit(draft, "guided-map-form");
        } else if (mixed && [7, 8, 9].includes(index)) {
          turn = await submit(command.toLowerCase(), "quick-action");
        } else turn = await submit(command);

        assert.deepEqual([turn.roomId, turn.status.mode], [roomId, mode], `${command} at submission ${session.submissions.length}`);
        assert.match(turn.status.date, /\/2041$/);
        assert.equal(turn.presentation.lines.at(-1).text, ">");
        requireLeaves(turn, leaves);
        if (session.kind === "full" && [2, 4, 6, 8, 14].includes(index)) {
          if (mixed && index === 2) {
            const { drawer, evidence } = await openHomeMap();
            map = evidence;
            await drawer.locator(".fieldwork-close").click();
          }
          await audit(map);
        }
        console.log(`${session.kind} ${session.controls} ${session.submissions.length} ${turn.command}: ${turn.status.location} / ${turn.status.mode}`);
      }
      session.bridgeCommands = await player.evaluate(() => window.homeCaptureCommands);
      assert.deepEqual(session.bridgeCommands, [" ", ...session.submittedCommands]);
    } catch (error) {
      session.failure = failureDetails(error);
      session.bridgeCommands = await player.evaluate(() => window.homeCaptureCommands ?? [], undefined, { timeout: 2000 }).catch(() => []);
      session.failureObservation = await readPlayer().catch(() => null);
      throw error;
    }
  } finally {
    session.finishedAt = new Date().toISOString();
    await context.close();
  }
};

let browser;
try {
  await checkpoint();
  assert.equal(canonicalSha256, cinema.canonicalSha256, "Canonical story checksum changed.");
  const story = await fetch(new URL("/amfv-r79-s851122.z4", baseURL), { signal: AbortSignal.timeout(15_000) });
  assert.ok(story.ok, `Production story fetch failed: ${story.status}`);
  assert.equal(checksum(Buffer.from(await story.arrayBuffer())), canonicalSha256, "Served story checksum differs.");
  browser = await chromium.launch();
  evidence.chromium = browser.version();
  for (const spec of [{ kind: "full", controls: "form" }, { kind: "full", controls: "mixed" }, { kind: "locked-door-probe", controls: "form" }]) {
    const session = {
      ...spec, id: randomUUID(), startedAt: new Date().toISOString(), viewport,
      submittedCommands: [], submissions: [], observations: [], warnings: [], surfaceAudit: [],
    };
    if (session.kind === "full") evidence.sessions.push(session);
    else evidence.lockedDoorProbe = session;
    await captureSession(browser, session);
    await checkpoint();
  }
  evidence.outcome = "adoption-pending";
  evidence.finishedAt = new Date().toISOString();
  await publish(output);
  console.log(`Wrote two complete sessions and a separate locked-door probe to ${output}`);
} catch (error) {
  evidence.outcome = "incomplete";
  evidence.failure = failureDetails(error);
  evidence.finishedAt = new Date().toISOString();
  await checkpoint();
  await publish(failureOutput);
  console.error(`Capture stopped: ${error.message}\nEvidence: ${failureOutput}`);
  process.exitCode = 1;
} finally {
  await browser?.close();
}
