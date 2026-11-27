import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { link, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "@playwright/test";

const fixtureName = "parchment-transit-runtime";
const { values: args } = parseArgs({ options: {
  "base-url": { type: "string", default: "http://127.0.0.1:3100" },
  output: { type: "string" },
  "failure-output": { type: "string" },
} });
const baseURL = new URL(args["base-url"]);
const runRoot = await mkdtemp(join(tmpdir(), "amfv-transit-runtime-"));
const output = resolve(args.output ?? join(runRoot, `${fixtureName}-observed.json`));
const failureOutput = resolve(args["failure-output"] ?? join(runRoot, `${fixtureName}-failure.json`));
assert.notEqual(output, failureOutput, "Success and failure destinations must differ.");
console.log(`Capture root: ${runRoot}`);

const home = JSON.parse(await readFile(new URL("../tests/fixtures/parchment-home-runtime-observed.json", import.meta.url), "utf8"));
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const canonicalSha256 = sha256(await readFile(new URL("../public/amfv-r79-s851122.z4", import.meta.url)));
const viewport = { width: 1440, height: 900 };
const normal = "Simulation Mode";
const recording = "Simulation Mode (recording)";
const stationLimit = 40;
const onboardLimit = 8;
const waitCommand = "WAIT FOR 1 MINUTE";
const universitySign = ["Elm Street and University Avenue", "(Rockvil U)", "(Brown Tubeline Terminus)"];
const junctionSign = ["Skybus Terminal", "(Transfer Between Brown and Red)"];
const boardRefusal = "There's no train here at the moment.";
const exitRefusal = "You can't leave the tubecar between stations!";
const arrival = "The tubecar glides into a station, and you can make out a sign reading:";
const open = "The car comes to a stop and the doors slide open.";
const departs = (turn) => body(turn).some((text) => /^The doors of the brown tubecar slide shut, and it glides out of the station\b/.test(text));
const canBoard = (turn) => !departs(turn) && body(turn).some((text) =>
  /^(?:A tubecar, its doors open, is waiting on the tracks to the southeast\.|A brown tubecar, marked "University" whooshes into the station on the southeast set of tracks\. As the sign changes to "Airport," the doors open)/.test(text));
const body = (turn) => turn.presentation.lines.slice(1, -1).map(({ text }) => text.trim());
const has = (turn, text) => body(turn).includes(text);
const prefixLeaves = new Map([13, 22, 23, 33, 43, 57, 72, 85, 87, 89, 102, 103, 104].map((index) => {
  const [first, second] = home.sessions.map((session) => body(session.observations[index]));
  const stable = first.filter((text) => text && !text.startsWith("WARNING:") && text !== "There is a romance novel here." && second.includes(text));
  assert.ok(stable.length, `Missing stable Home evidence at observation ${index}.`);
  return [index, stable];
}));
const requireLeaves = (turn, expected) => {
  const lines = body(turn);
  let index = -1;
  for (const text of expected) {
    index = lines.indexOf(text, index + 1);
    assert.ok(index >= 0, `${turn.command} at ${turn.status.location}: missing ${JSON.stringify(text)}.`);
  }
};
const requireState = (turn, location, mode = normal) => {
  assert.deepEqual([turn.status.location, turn.status.mode], [location, mode], turn.command);
  assert.match(turn.status.date, /\/2041$/);
  return turn;
};
const inputId = ({ presentation }) => presentation?.lines[presentation.activeInput?.line]?.id;
const parseStatus = (raw) => {
  const match = raw.match(/Mode:\s+(.+?)\s+Time:\s+(.+?)\s+Location:\s+(.+?)\s+Date:\s+([^\n]+?)\s*$/s);
  assert.ok(match, `Unrecognized live status: ${raw}`);
  const [, mode, time, location, date] = match;
  return { mode, time, location, date };
};
const clockMinutes = (time) => {
  const [, hours, minutes, suffix] = time.match(/^(\d+):(\d+)(am|pm)$/);
  return Number(hours) % 12 * 60 + Number(minutes) + (suffix === "pm" ? 720 : 0);
};
const describeError = ({ name, message, stack }) => ({ name, message, stack });

const evidence = {
  provenance: "Live Release 79 bridge-v3 reports, Playwright Chromium, production static export, fresh browser context per session.",
  baseURL: baseURL.href,
  runId: randomUUID(),
  startedAt: new Date().toISOString(),
  canonicalSha256,
  outcome: "incomplete",
  sessions: [],
  probes: [],
};
const json = () => `${JSON.stringify(evidence, null, 2)}\n`;
const checkpoint = async () => {
  await writeFile(join(runRoot, "partial.tmp"), json());
  await rename(join(runRoot, "partial.tmp"), join(runRoot, `${fixtureName}.partial.json`));
};
const publish = async (destination) => {
  await mkdir(dirname(destination), { recursive: true });
  const staging = await mkdtemp(join(dirname(destination), ".transit-runtime-"));
  try {
    const file = join(staging, "fixture.json");
    await writeFile(file, json());
    await link(file, destination);
  } finally {
    await rm(staging, { recursive: true });
  }
};

async function captureSession(browser, session) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.setDefaultTimeout(25_000);
  const playerSelector = 'iframe[src="/player.html"]';
  const frame = page.frameLocator(playerSelector);
  const player = frame.locator("body");
  const form = page.locator("#command-input");
  const send = page.getByRole("button", { name: /^Send$/i });
  const decoder = page.getByRole("button", { name: /Submit code/ });
  const mixed = session.controls === "mixed";

  // Listen before application startup. The wrapper still sends every command
  // through its existing UI, and all turn content comes from the live bridge.
  await page.addInitScript((selector) => {
    window.transitCaptureCommands = [];
    window.addEventListener("message", (event) => {
      if (event.origin !== location.origin || event.data?.channel !== "amfv:bridge") return;
      if (window !== window.parent && event.source === window.parent && event.data.type === "command") {
        window.transitCaptureCommands.push(event.data.command);
      }
      if (event.source === document.querySelector(selector)?.contentWindow && event.data.type === "transcript") {
        const { acceptsInput, inputKind, presentation, statusText } = event.data;
        window.transitCaptureReport = { acceptsInput, inputKind, presentation, statusText };
      }
    });
  }, playerSelector);
  const readLiveWindow = () => player.evaluate(() => {
    const p = window.AMFVPresentationBridge.extract(document, getComputedStyle);
    const statusText = [...document.querySelectorAll("#windowport .GridWindow")].map((grid) => grid.textContent ?? "").join("\n");
    return { id: p.lines[p.activeInput?.line]?.id, statusText };
  });
  const liveInputId = async () => (await readLiveWindow()).id;
  const waitForReport = async (kind, previousId) => {
    const handle = await page.waitForFunction(({ kind, previousId }) => {
      const report = window.transitCaptureReport;
      const p = report?.presentation;
      const id = p?.lines[p.activeInput?.line]?.id;
      return report?.acceptsInput && report.inputKind === kind && id && id !== previousId && report;
    }, { kind, previousId });
    try {
      const report = await handle.jsonValue();
      const live = await readLiveWindow();
      assert.equal(inputId(report), live.id, "Bridge input differs from the live window.");
      // The bridge uses innerText, which can apply CSS casing. Keep both
      // that report and the pre-CSS status text from the same input.
      return { ...report, bridgeStatusText: report.statusText, statusText: live.statusText };
    } finally {
      await handle.dispose();
    }
  };
  const selectClassic = async () => {
    const settings = page.getByTitle("Reading and play settings");
    await settings.click();
    await page.locator(".interaction-segments").getByRole("button", { name: "Classic", exact: true }).click();
    await settings.click();
  };
  const methods = {
    form: async (command) => { await form.fill(command); await send.click(); },
    decoder: () => decoder.click(),
    "guided-map-form": async (command) => { assert.equal(await form.inputValue(), command); await send.click(); },
    "quick-action": (command) => page.locator(".quick-actions").getByRole("button", {
      name: { record: "Record", look: "Look", "record off": "Stop recording" }[command], exact: true,
    }).click(),
  };
  let currentInputId;
  const submit = async (command, method = "form") => {
    const submittedInputId = currentInputId;
    session.pending = { command, method, submittedInputId };
    await checkpoint();
    await methods[method](command);
    const raw = await waitForReport("line", submittedInputId);
    const p = raw.presentation;
    const start = p.lines.findIndex(({ id }) => id === submittedInputId);
    assert.ok(start >= 0, `No echo for ${submittedInputId}: ${command}`);
    currentInputId = inputId(raw);
    const turn = {
      ...raw, command, submittedInputId, nextInputId: currentInputId,
      presentation: {
        ...p, lines: p.lines.slice(start), terminalLine: p.terminalLine - start,
        activeInput: { ...p.activeInput, line: p.activeInput.line - start },
      },
    };
    const echo = turn.presentation.lines[0];
    const i = session.submissions.length;
    session.submittedCommands.push(command);
    session.submissions.push({ command, method, inputKind: "line", submittedInputId, nextInputId: currentInputId, echo });
    session.observations.push(turn);
    delete session.pending;
    turn.status = parseStatus(turn.statusText);
    for (const text of body(turn).filter((line) => line.startsWith("WARNING:"))) {
      session.warnings.push({ turnId: submittedInputId, text });
    }
    assert.equal(p.activeInput.kind, "line");
    assert.equal(p.activeInput.line, p.terminalLine);
    assert.equal(p.terminalLine, p.lines.length - 1);
    if (i !== 5) assert.equal(p.lines.at(-1).text, ">");
    if (i === 6) assert.ok(echo.runs.some(({ classes, text }) => classes.includes("Style_input") && text === command));
    else assert.equal(echo.text.toUpperCase(), `>${command.toUpperCase()}`);
    assert.doesNotMatch(body(turn).join("\n"), /record buffer (?:is )?full|auto-deactivation|not currently active/i);
    if (command.toUpperCase() === "RECORD") requireLeaves(turn, ["Record feature activated."]);
    if (command.toUpperCase() === "RECORD OFF") requireLeaves(turn, ["Record feature deactivated."]);
    return turn;
  };
  const formOrAction = (command) => mixed ? submit(command.toLowerCase(), "quick-action") : submit(command);
  const minute = async (previous) => {
    const turn = await submit(waitCommand);
    requireState(turn, previous.status.location, previous.status.mode);
    requireLeaves(turn, ["Time passes..."]);
    assert.equal((clockMinutes(turn.status.time) - clockMinutes(previous.status.time) + 1440) % 1440, 1, "WAIT did not advance one minute.");
    return turn;
  };
  const waitUntil = async (turn, condition, limit, counter) => {
    session[counter] ??= 0;
    while (!condition(turn) && session[counter] < limit) {
      session[counter]++;
      turn = await minute(turn);
    }
    assert.ok(condition(turn), `No required observation within ${limit} one-minute waits (${counter}).`);
    return turn;
  };
  const mark = (name, turn) => { session.checkpoints[name] = turn.submittedInputId; };
  const snapshots = async (name, extra) => {
    const inputBefore = await liveInputId();
    const audit = { name, inputBefore, ...extra };
    for (const [key, selector] of Object.entries({
      place: ".location-block", identity: ".identity-rail", compass: ".movement-compass",
      quickActions: ".quick-actions", sceneActions: ".command-deck .scene-actions",
    })) {
      const locator = page.locator(selector);
      audit[key] = await locator.count() ? await locator.ariaSnapshot() : null;
    }
    if (mixed) {
      await page.getByTitle("Toggle companion").click();
      const explore = page.getByRole("tab", { name: "Explore", exact: true });
      if (await explore.count()) {
        await explore.click();
        audit.companion = await page.locator(".map-section").ariaSnapshot();
      }
      await page.locator(".close-context").click();
    }
    audit.inputAfter = await liveInputId();
    session.surfaceAudit.push(audit);
    assert.equal(inputBefore, currentInputId);
    assert.equal(audit.inputAfter, inputBefore, "Surface audit advanced canonical input.");
  };
  const selectLandmark = async (name) => {
    await page.locator(".compact-map-button").click();
    const drawer = page.locator(".fieldwork-drawer");
    const marker = drawer.getByRole("button", { name });
    await marker.click();
    const route = drawer.locator(".navigator-route");
    await route.waitFor();
    return { drawer, route, landmark: await marker.getAttribute("aria-label") };
  };

  try {
    await page.goto(baseURL.href);
    const introduction = page.getByRole("dialog", { name: /A Mind Forever Voyaging/i });
    await introduction.getByRole("button", { name: /^Begin/ }).click();
    await introduction.waitFor({ state: "hidden" });
    await frame.locator("#windowport .Input:not([disabled])").waitFor({ state: "attached" });
    await page.locator(playerSelector).evaluate((iframe) => {
      iframe.contentWindow.postMessage({ channel: "amfv:bridge", type: "request-state" }, location.origin);
    });
    const before = await waitForReport("char");
    await page.getByRole("button", { name: /^Begin the original story/ }).click();
    const after = await waitForReport("line", inputId(before));
    currentInputId = inputId(after);
    session.startup = { command: " ", inputKind: "char", before, after, nextInputId: currentInputId };

    const accepted = home.sessions.find(({ controls }) => controls === session.controls);
    const full = session.kind === "full";
    assert.equal(accepted.submittedCommands.length, 111);
    for (const [index, command] of accepted.submittedCommands.slice(0, full ? 111 : 7).entries()) {
      let turn;
      if (index === 6) {
        const answer = (await decoder.innerText()).match(/(\d+)\s*$/)?.[1];
        assert.ok(answer, "Missing live decoder answer.");
        if (!mixed) await selectClassic();
        turn = await submit(answer, mixed ? "decoder" : "form");
      } else if (mixed && accepted.submissions[index].method === "guided-map-form") {
        const { route } = await selectLandmark(/^Your apartment, fieldwork destination/i);
        await route.getByRole("button", { name: /Draft next step/i }).click();
        assert.equal(await liveInputId(), currentInputId, "Draft advanced canonical input.");
        turn = await submit(command, "guided-map-form");
      } else {
        turn = await submit(command, accepted.submissions[index].method);
      }
      if (index === 5) continue;
      const homeIndex = index < 5 ? index : index - 1;
      const { status } = accepted.observations[homeIndex];
      assert.deepEqual([turn.status.location, turn.status.mode], [status.location, status.mode], `Home prefix submission ${index + 1}`);
      assert.equal(turn.status.date.split("/").at(-1), status.date.split("/").at(-1));
      requireLeaves(turn, prefixLeaves.get(homeIndex) ?? []);
    }

    requireState(await submit("SW"), "Elm & Park");
    const street = requireState(await submit("W"), "Elm & University");
    mark("universityStreet", street);
    if (full) {
      let map;
      if (mixed) {
        const { drawer, route, landmark } = await selectLandmark(/^Transit, fieldwork destination/i);
        map = { landmark, route: await route.ariaSnapshot() };
        await drawer.locator(".fieldwork-close").click();
      }
      await snapshots("universityStreet", { map });
    }
    const station = requireState(await submit("DOWN"), "Tube Station");
    requireLeaves(station, ["Tube Station", ...universitySign]);
    mark("universityPlatform", station);
    if (full) await snapshots("universityPlatform");

    if (session.kind === "station-only") {
      const noCar = canBoard(station) ? await waitUntil(station, departs, stationLimit, "stationWaits") : station;
      const refused = requireState(await submit("IN"), noCar.status.location);
      requireLeaves(refused, [boardRefusal]);
      mark("noTrain", refused);
      const started = requireState(await submit("RECORD"), "Tube Station", recording);
      mark("platformRecord", started);
      const departure = await waitUntil(started, departs, stationLimit, "stationWaits");
      mark("platformDeparture", departure);
      mark("platformOff", requireState(await submit("RECORD OFF"), "Tube Station"));
    } else {
      const train = await waitUntil(station, canBoard, stationLimit, "stationWaits");
      mark("carAvailable", train);
      const board = requireState(await submit("IN"), "Tubecar");
      assert.ok(body(board).some((line) => /^This is a typical tubecar, clean and free of graffiti\. The doors of the car are (?:open|closed)\.$/.test(line)), "Missing 2041 carriage description.");
      mark("board", board);
      if (full) {
        const started = requireState(await formOrAction("RECORD"), "Tubecar", recording);
        mark("record", started);
        await snapshots("record");
        // Stop at the first new onboard arrival. A different sign is a
        // failed candidate and cannot authorize waiting for a later station.
        const arrived = await waitUntil(started, (turn) => has(turn, arrival), onboardLimit, "onboardWaits");
        assert.notEqual(arrived, started, "Arrival must follow a turn already in recording mode.");
        requireLeaves(arrived, [arrival, ...junctionSign, open]);
        mark("onboardArrival", arrived);
        await snapshots("onboardArrival");
        const out = requireState(await submit("OUT"), "Tube Station", recording);
        requireLeaves(out, ["Tube Station", ...junctionSign]);
        assert.ok(body(out).some((line) => line.startsWith("You are on a central platform between four sets of tracks.")));
        mark("junctionPlatform", out);
        await snapshots("junctionPlatform");
        mark("off", requireState(await formOrAction("RECORD OFF"), "Tube Station"));
        mark("terminal", requireState(await submit("UP"), "Skybus Terminal"));
        requireState(await submit("SE"), "Main & Kennedy");
        mark("return", requireState(await submit("SW"), "Kennedy Park"));
        await snapshots("return");
      } else {
        const departure = await waitUntil(board, departs, onboardLimit, "onboardWaits");
        mark("onboardDeparture", departure);
        const refused = requireState(await submit("OUT"), "Tubecar");
        requireLeaves(refused, [exitRefusal]);
        mark("exitRefused", refused);
      }
    }

    session.bridgeCommands = await player.evaluate(() => window.transitCaptureCommands);
    assert.deepEqual(session.bridgeCommands, [" ", ...session.submittedCommands]);
    console.log(`${session.kind} ${session.controls}: ${session.submissions.length} submissions, ${session.stationWaits ?? 0} station waits, ${session.onboardWaits ?? 0} onboard waits.`);
  } catch (error) {
    session.failure = describeError(error);
    session.bridgeCommands = await player.evaluate(() => window.transitCaptureCommands ?? [], undefined, { timeout: 2000 }).catch(() => []);
    session.failureReport = await page.evaluate(() => window.transitCaptureReport ?? null).catch(() => null);
    throw error;
  } finally {
    session.finishedAt = new Date().toISOString();
    await context.close();
  }
}

let browser;
try {
  await checkpoint();
  assert.equal(canonicalSha256, home.canonicalSha256, "Canonical story checksum changed.");
  const story = await fetch(new URL("/amfv-r79-s851122.z4", baseURL), { signal: AbortSignal.timeout(15_000) });
  assert.ok(story.ok, `Production story fetch failed: ${story.status}`);
  assert.equal(sha256(Buffer.from(await story.arrayBuffer())), canonicalSha256, "Served story checksum differs.");
  browser = await chromium.launch();
  evidence.chromium = browser.version();
  for (const [kind, controls] of [["full", "form"], ["full", "mixed"], ["station-only", "form"], ["in-transit-exit", "form"]]) {
    const session = {
      kind, controls, id: randomUUID(), startedAt: new Date().toISOString(), viewport,
      submittedCommands: [], submissions: [], observations: [], warnings: [], checkpoints: {}, surfaceAudit: [],
    };
    (kind === "full" ? evidence.sessions : evidence.probes).push(session);
    await captureSession(browser, session);
    await checkpoint();
  }
  evidence.outcome = "adoption-pending";
  evidence.finishedAt = new Date().toISOString();
  await publish(output);
  console.log(`Wrote two full sessions and two fresh probes to ${output}`);
} catch (error) {
  evidence.outcome = "incomplete";
  evidence.failure = describeError(error);
  evidence.finishedAt = new Date().toISOString();
  await checkpoint();
  await publish(failureOutput);
  console.error(`Capture stopped: ${error.message}\nEvidence: ${failureOutput}`);
  process.exitCode = 1;
} finally {
  await browser?.close();
}
