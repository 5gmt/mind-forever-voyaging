import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { localizeStoryContent, localizeStoryLeaves, localizeStoryTranscript } from "../app/localization.ts";
import { initialLineTurnPresentation, openingPresentation } from "../app/story-presentation.ts";
import { projectPresentationHistory, reconcilePresentationHistory } from "../app/presentation-history.ts";

test("static export renders the finished unabridged edition", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>A Mind Forever Voyaging \| Unabridged Modern Edition<\/title>/i);
  assert.match(html, /Original text and story flow preserved/i);
  assert.match(html, /<link rel="icon" href="\/icon\.svg[^"]*"[^>]*type="image\/svg\+xml"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview|react-loading-skeleton/i);
});

test("ships canonical Release 79 plus an isolated Release 900 QA story", async () => {
  const [story, debugStory, player, bridge, overrides] = await Promise.all([
    readFile(new URL("../public/amfv-r79-s851122.z4", import.meta.url)),
    readFile(new URL("../public/amfv-modern-debug.z4", import.meta.url)),
    readFile(new URL("../public/player.html", import.meta.url), "utf8"),
    readFile(new URL("../public/player-bridge.js", import.meta.url), "utf8"),
    readFile(new URL("../public/player-overrides.css", import.meta.url), "utf8"),
  ]);

  assert.equal(story[0], 4, "story must be Z-machine version 4");
  assert.equal((story[2] << 8) | story[3], 79);
  assert.equal(story.subarray(18, 24).toString("ascii"), "851122");
  assert.equal(createHash("sha256").update(story).digest("hex"), "14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d");
  assert.equal(debugStory[0], 4);
  assert.equal((debugStory[2] << 8) | debugStory[3], 900);
  assert.equal(debugStory.subarray(18, 24).toString("ascii"), "260808");
  assert.match(player, /"url": "\/amfv-r79-s851122\.z4"/);
  assert.match(player, /"url": "\/amfv-modern-debug\.z4"/);
  assert.match(player, /"play_in_iframe": 1/);
  assert.match(player, /"do_vm_autosave": qaBuild \? 0 : 1/);
  assert.match(bridge, /amfv:bridge/);
  assert.match(bridge, /inputKind/);
  assert.match(bridge, /activePrompt/);
  assert.match(overrides, /--glkote-buffer-bg/);
});

test("preserves the historical source and derives modern context from it", async () => {
  const sourceFiles = (await readdir(new URL("../source/", import.meta.url))).filter((file) => file.endsWith(".zil"));
  const [world, shell] = await Promise.all([
    readFile(new URL("../app/world-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/PrismEdition.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal(sourceFiles.length, 10);
  assert.match(world, /export const WORLD_ROOMS/);
  assert.match(world, /"flags": \[/);
  assert.match(world, /"synonyms": \[/);
  assert.match(world, /"handledVerbs": \[/);
  assert.match(world, /"guaranteedVerbs": \[/);
  assert.match(world, /"refusalOnlyVerbs": \[/);
  assert.match(world, /"relatedObjectIds": \[/);
  assert.match(world, /"removedObjectIds": \[/);
  assert.match(world, /"verbGroups": \[/);
  assert.match(world, /"dynamicLocations": \[/);
  assert.match(world, /"movesToCurrentRoom": (?:true|false)/);
  assert.match(world, /"name": "Dr\. Perelman"[\s\S]{0,500}"commandNoun": "perelman"/);
  assert.doesNotMatch(world, /"id": "HORIZON"/);
  assert.match(world, /"name": "Rockvil Centre"/);
  const objects = JSON.parse(world.split("export const WORLD_OBJECTS: WorldObject[] = ")[1].replace(/;\s*$/, ""));
  const rooms = JSON.parse(world.split("export const WORLD_ROOMS: WorldRoom[] = ")[1].split(";\n\nexport const WORLD_OBJECTS")[0]);
  const kennedyPark = rooms.find((room) => room.id === "KENNEDY-PARK");
  assert.deepEqual(kennedyPark.aliases, ["Kennedy Park", "Construction Site"]);
  assert.equal(kennedyPark.yearNames[2041], "Kennedy Park");
  assert.equal(kennedyPark.yearNames[2071], "Construction Site");
  assert.equal(kennedyPark.exits.NE.targetId, "MAIN-AND-KENNEDY");
  assert.ok(kennedyPark.globals.includes("WATER"));
  const churchStreetPark = rooms.find((room) => room.id === "CHURCH-STREET-PARK");
  assert.ok(churchStreetPark.globals.includes("HEIMAN-VILLAGE-OBJECT"));
  assert.ok(!churchStreetPark.globals.includes("CHURCH-OBJECT"));
  const churchEntrance = rooms.find((room) => room.id === "CHURCH-ENTRANCE");
  assert.equal(churchEntrance.exits.IN.targetId, "ST-MICHAELS");
  assert.equal(churchEntrance.exits.WEST.targetId, "ST-MICHAELS");
  assert.equal(churchEntrance.yearNames[2041], "Church Entrance");
  assert.equal(churchEntrance.yearNames[2071], "Street by Vacant Lot");
  const stMichaels = rooms.find((room) => room.id === "ST-MICHAELS");
  assert.equal(stMichaels.yearNames[2041], "St. Michael's");
  assert.equal(stMichaels.yearNames[2071], "Vacant Lot");
  for (const sourceRoom of rooms) for (const exit of Object.values(sourceRoom.exits)) {
    assert.ok(rooms.some((targetRoom) => targetRoom.id === exit.targetId), `${sourceRoom.id} exit must target a known room`);
  }
  const crime = objects.find((object) => object.id === "CRIME");
  assert.equal(crime.action, null);
  assert.deepEqual(crime.handledVerbs, []);
  assert.deepEqual(crime.globalVerbs, []);
  assert.deepEqual(crime.verbRooms, {});
  const maintenanceWorkers = objects.find((object) => object.id === "SABOTEURS");
  assert.deepEqual(maintenanceWorkers.dynamicLocations, ["CORE"]);
  const senator = objects.find((object) => object.id === "RYDER");
  assert.deepEqual(senator.dynamicLocations, ["OFFICE"]);
  assert.ok(!senator.dynamicLocations.includes("NEWS"));
  const waterpool = objects.find((object) => object.id === "WATERPOOL");
  assert.ok(waterpool.dynamicLocations.includes("KENNEDY-PARK"));
  const airConditioning = objects.find((object) => object.id === "AIR-CONDITIONING-UNIT");
  assert.ok(airConditioning.globalVerbs.includes("EXAMINE"));
  assert.ok(!airConditioning.guaranteedVerbs.includes("EXAMINE"));
  const bench = objects.find((object) => object.id === "BENCH");
  assert.deepEqual(bench.handledVerbs, ["EXAMINE"]);
  assert.ok(!bench.handledVerbs.includes("OPEN"));
  assert.ok(bench.relatedObjectIds.includes("GOVERNMENT-OFFICIAL"));
  const officialSnack = objects.find((object) => object.id === "OFFICIAL-SNACK");
  assert.deepEqual(officialSnack.refusalOnlyVerbs.sort(), ["EAT", "TAKE"]);
  assert.ok(objects.find((object) => object.id === "GOVERNMENT-OFFICIAL").removedObjectIds.includes("OFFICIAL-SNACK"));
  const statue = objects.find((object) => object.id === "STATUE");
  assert.ok(statue.relatedObjectIds.includes("PLAQUE"));
  assert.equal(objects.find((object) => object.id === "CHURCH-OFFICIAL").movesToCurrentRoom, true);
  assert.equal(objects.find((object) => object.id === "UNSHAVEN-MAN").movesToCurrentRoom, true);
  assert.match(shell, /object\.movesToCurrentRoom && object\.flags\.includes\("ACTORBIT"\)/);
  const people = objects.find((object) => object.id === "PEOPLE");
  assert.deepEqual(people.verbRooms.EXAMINE, ["ROCKVIL-STADIUM", "BAR"]);
  assert.ok(!people.globalVerbs.includes("EXAMINE"));
  for (const object of objects.filter((candidate) => candidate.commandNoun)) {
    const words = object.commandNoun.split(" ");
    const noun = words.at(-1);
    assert.ok(object.synonyms.some((synonym) => noun === synonym || noun.startsWith(synonym)), `${object.id} must use a parser noun`);
    for (const adjective of words.slice(0, -1)) assert.ok(object.adjectives.some((word) => adjective === word || adjective.startsWith(word)), `${object.id} must use parser adjectives`);
  }
  assert.match(shell, /Map & routes/);
  assert.match(shell, /Communication outlets/);
  assert.match(shell, /InterfaceWorkbench/);
  assert.match(shell, /SceneActions/);
  assert.match(shell, /Classic/);
  assert.match(shell, /Guided/);
  assert.match(shell, /Action menus/);
  assert.match(shell, /How would you like to play/);
  assert.match(shell, /setIntroOpen\(true\)/);
  assert.doesNotMatch(shell, /setIntroOpen\(!hasVisited\)/);
  assert.doesNotMatch(shell, /localStorage\.getItem\("amfv:(?:designation|modes|years|discoveries)"\)/);
  assert.match(shell, /const simulationInvitationSeen = qaEnabled[\s\S]*programming team has finished entering the parameters for the plan/);
  assert.match(shell, /const simulationReady = simulationInvitationSeen && mode === "Communications Mode" && phase !== "witness" && phase !== "lockdown"/);
  assert.doesNotMatch(shell, /const simulationReady = discovery\.simulationCleared/);
  assert.match(shell, /Simulation Controller ready/);
  assert.match(shell, /Begin the final voyage/);
  assert.match(shell, /const nextMode = freshCanonicalOpening \? null : detectMode/);
  assert.match(shell, /actorAppearsPresent/);
  assert.match(shell, /actorHasDeparted/);
  assert.doesNotMatch(shell, /object\.initialLocation === "LOCAL-GLOBALS" && !object\.id\.endsWith/);
  assert.match(shell, /mapRoutePreview/);
  assert.match(shell, /RockvilNavigator/);
  assert.match(shell, /Perelman’s brief/);
  assert.match(shell, /FIELD_RECORDING_RULES/);
  for (const tableIndex of [0, 2, 4, 6, 8, 10, 12, 14, 16]) assert.match(shell, new RegExp(`tableIndex: ${tableIndex}`));
  assert.match(shell, /WARNING: Deactivating record feature/);
  assert.match(shell, /\\\(recording\\\)/);
  assert.match(shell, /Map & recording brief/);
  assert.match(shell, /const travelOptions = useMemo/);
  assert.match(shell, /routeNext: Boolean/);
  assert.match(shell, /route-thread/);
  assert.match(shell, /compact-map-button/);
  assert.match(shell, /Clear current route/);
  assert.match(shell, /Checks follow the same Release 79 triggers as the game/);
  assert.match(shell, /Start RECORD before you complete this experience/);
  assert.match(shell, /interactionLevel === "actions" && initialFieldworkActive/);
  assert.match(shell, /role="dialog" aria-modal="true" aria-labelledby="fieldwork-title"/);
  assert.match(shell, /navigator\.share/);
  assert.match(shell, /https:\/\/mind-forever-voyaging\.netlify\.app\//);
  assert.match(shell, /Share this edition/);
  assert.match(shell, /resetWrapperForStory[\s\S]*setCommand\(""\)[\s\S]*setAliasNotice\(""\)[\s\S]*setMapDestinationId\(null\)/);
  assert.match(shell, /Begin the requested observations/);
  assert.match(shell, /Perelman’s brief · nine requested observations/);
  assert.match(shell, /\["wait for 28 minutes", "wait"\]/);
  assert.match(shell, /Turn the wheel to align the color and inner number/);
  assert.match(shell, /Fast-forward console/);
  assert.match(shell, /canonicalIframeRef/);
  assert.match(shell, /qaIframeRef/);
  assert.doesNotMatch(shell, /You are PRISM, the world’s first sentient computer/);
  assert.match(shell, /Historical content note/);
  assert.match(shell, /aria-live="polite"/);
});

test("ships the physical package materials beside the story", async () => {
  await Promise.all([
    access(new URL("../app/icon.svg", import.meta.url)),
    access(new URL("../public/package/rockvil-map-back.jpg", import.meta.url)),
    access(new URL("../public/package/security-decoder.jpg", import.meta.url)),
    access(new URL("../public/package/amfv-manual.pdf", import.meta.url)),
  ]);
  const tools = await readFile(new URL("../app/StoryTools.tsx", import.meta.url), "utf8");
  assert.match(tools, /Original 1985 promotional street map/);
  assert.match(tools, /ROCKVIL_LANDMARKS/);
  assert.match(tools, /map-hotspots/);
  assert.match(tools, /Dakota Online/);
  assert.match(tools, /HVAC Controller/);
  assert.match(tools, /traffic computer, set/);
  assert.match(tools, /\$\{noun\}, hello/);
  assert.match(tools, /hasFlag\(object, "READBIT"\)/);
  assert.match(tools, /canonicalActions/);
  assert.match(tools, /object\.initialLocation === "LOCAL-GLOBALS" && \["enter", "leave"\]\.includes\(definition\.action\.id\)/);
  assert.match(tools, /refusalOnlyVerbs/);
  assert.match(tools, /RockvilNavigator/);
  assert.match(tools, /fieldwork destination/);
  assert.doesNotMatch(tools, /article\|book\|directory/);
  assert.match(tools, /!hasFlag\(object, "TRYTAKEBIT"\)/);
  assert.doesNotMatch(tools, /hasFlag\(object, "CONTBIT"\).*Open/);
});

test("localizes only presentation while preserving raw English mechanics", async () => {
  const [shell, localization, bridge, story] = await Promise.all([
    readFile(new URL("../app/PrismEdition.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/localization.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/player-bridge.js", import.meta.url), "utf8"),
    readFile(new URL("../public/amfv-r79-s851122.z4", import.meta.url)),
  ]);
  assert.match(shell, /progressFromTranscript\(freshCanonicalOpening \? EMPTY_DISCOVERY : previous, nextTranscript\)/);
  assert.match(shell, /projectPresentationHistory\(presentationState\.history, locale\)/);
  assert.match(shell, /reconcilePresentationHistory\(previous\.history, nextPresentation\)/);
  assert.match(shell, /event\.data\.type === "command"[\s\S]*\^restore\$[\s\S]*setPresentationState\(\{ history: \[\], recovering: true \}\)/i);
  assert.match(shell, /!qaEnabled && event\.data\.acceptsInput/);
  assert.match(shell, /createPortal\(/);
  assert.match(shell, /mode: localizedMode \? "localized" : "canonical"/);
  assert.match(shell, /aria-hidden=\{qaEnabled\}/);
  assert.match(bridge, /#gameport \.BufferWindowInner/);
  assert.match(bridge, /inner\?\.setAttribute\("aria-hidden", "true"\)/);
  assert.match(bridge, /inner\?\.setAttribute\("inert", ""\)/);
  assert.match(bridge, /localized-host-ready/);
  assert.match(bridge, /canonicalScrollState\.followsTail/);
  assert.match(bridge, /canonicalScrollState\.scrollTop/);
  assert.match(bridge, /localizedHost\.parentElement !== buffer/);
  assert.match(bridge, /localizedInner !== inner/);
  assert.match(bridge, /localizedInner = inner \|\| undefined/);
  assert.match(bridge, /new MutationObserver\(\(\) => \{[\s\S]*ensureLocalizedHost\(\);[\s\S]*announceUpdate\(\)/);
  assert.match(bridge, /dataset\.amfvPresentationMode = "localized"/);
  assert.match(shell, /command: normalized/);
  assert.match(localization, /if \(locale === "en"\) return rawEnglish/);
  assert.equal(createHash("sha256").update(story).digest("hex"), "14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d");
});

test("localizes the real opening whitespace and falls back deterministically", () => {
  const raw = [
    "                      \"Tomorrow never yet",
    "                       On any human being rose or set.\"",
    "                                       -- William Marsden",
    "[Hit any key to continue.]",
    "This line is deliberately untranslated.",
  ].join("\r\n");
  const japanese = localizeStoryTranscript(raw, "ja");

  assert.match(japanese, /「明日という日はまだ、\nいかなる人間の上にも昇らず、沈みもしなかった。」/);
  assert.doesNotMatch(japanese, /Tomorrow never yet|On any human being rose or set/);
  assert.match(japanese, /This line is deliberately untranslated\./);
  assert.equal(localizeStoryTranscript(raw, "en"), raw);
});

test("builds the opening presentation from Parchment BufferLine bridge data", async () => {
  const [fixtureHtml, fixturePayload, bridgeHelper, shell] = await Promise.all([
    readFile(new URL("./fixtures/parchment-opening.html", import.meta.url), "utf8"),
    readFile(new URL("./fixtures/parchment-opening-payload.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../public/player-bridge.js", import.meta.url), "utf8"),
    readFile(new URL("../app/PrismEdition.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal((fixtureHtml.match(/class="BufferLine(?:\s|")/g) || []).length, fixturePayload.presentation.lines.length);
  const classList = (classes) => ({
    contains: (value) => classes.includes(value),
    [Symbol.iterator]: function* () { yield* classes; },
  });
  const lines = fixturePayload.presentation.lines.map((line) => {
    const node = { innerText: line.text, textContent: line.text, classList: classList(line.classes), children: [] };
    node.children = line.runs.map((run) => ({
      innerText: run.text,
      textContent: run.text,
      classList: classList(run.classes),
      tagName: run.tag.toUpperCase(),
      disabled: false,
      maxLength: run.tag === "textarea" ? 1 : -1,
      closest: (selector) => selector === ".BufferLine" ? node : null,
    }));
    return node;
  });
  const input = lines.at(-1).children.at(-1);
  const fixtureDocument = { querySelectorAll: (selector) => selector === "#gameport .BufferLine" ? lines : [input] };
  const context = vm.createContext({});
  vm.runInContext(bridgeHelper, context);
  const extracted = context.AMFVPresentationBridge.extract(fixtureDocument, () => ({
    display: "block", visibility: "visible", textAlign: "start", marginLeft: "0px", paddingLeft: "0px", whiteSpace: "pre-wrap",
  }));
  const expectedV3 = structuredClone(fixturePayload.presentation);
  expectedV3.version = 3;
  expectedV3.lines.forEach((line, index) => { line.id = `line-${index + 1}`; });
  assert.deepEqual(JSON.parse(JSON.stringify(extracted)), expectedV3);

  const blocks = openingPresentation(fixturePayload.presentation, "ja");
  assert.deepEqual(blocks?.map((block) => block.kind), ["heading", "spacer", "quote", "spacer", "prompt"]);
  assert.equal(blocks?.[0].text, "* PART I *");
  assert.match(blocks?.[2].text || "", /明日という日はまだ/);
  assert.equal(blocks?.[2].attribution, "-- William Marsden");
  assert.match(blocks?.[4].text || "", /いずれかのキーを押して/);

  assert.match(shell, /projectPresentationHistory\(presentationState\.history, locale\)/);
  assert.match(shell, /className="story-presentation-heading"/);
  assert.match(shell, /className="story-presentation-quote"/);
  assert.match(shell, /className="story-presentation-prompt"/);
  assert.doesNotMatch(shell, /className="localized-story"|<pre ref=\{localizedStoryRef\}/);
});

test("reconciles locale-neutral presentation history without duplicating observations", async () => {
  const opening = JSON.parse(await readFile(new URL("./fixtures/parchment-opening-payload.json", import.meta.url), "utf8")).presentation;
  const initial = JSON.parse(await readFile(new URL("./fixtures/parchment-initial-line-runtime-observed.json", import.meta.url), "utf8")).presentation;
  const look = JSON.parse(await readFile(new URL("./fixtures/parchment-look-runtime-observed.json", import.meta.url), "utf8")).presentation;
  opening.version = initial.version = look.version = 3;
  opening.lines.forEach((line, index) => { line.id = `opening-${index}`; });
  initial.lines.forEach((line, index) => { line.id = `initial-${index}`; });
  look.lines.forEach((line, index) => { line.id = `look-one-${index}`; });

  const reconcile = (history, observation) => reconcilePresentationHistory(history, observation).history;
  let history = reconcile([], opening);
  history = reconcile(history, opening);
  history = reconcile(history, initial);
  history = reconcile(history, look);
  assert.equal(history.length, 3);

  const truncatedOpening = structuredClone(opening);
  truncatedOpening.lines.splice(0, 2);
  truncatedOpening.terminalLine -= 2;
  truncatedOpening.activeInput.line -= 2;
  truncatedOpening.lines.at(-1).id = opening.lines.at(-1).id;
  let enriched = reconcile([], truncatedOpening);
  enriched = reconcile(enriched, opening);
  assert.equal(enriched.length, 1);
  assert.match(enriched[0].presentation.lines[0].text, /PART I/);
  enriched = reconcile(enriched, truncatedOpening);
  assert.equal(enriched.length, 1);
  assert.match(enriched[0].presentation.lines[0].text, /PART I/);

  const repeatedLook = structuredClone(look);
  repeatedLook.lines.forEach((line, index) => { line.id = `look-two-${index}`; });
  history = reconcile(history, repeatedLook);
  assert.equal(history.length, 4, "distinct identical LOOK turns are retained");

  const inventory = structuredClone(look);
  inventory.lines.forEach((line, index) => { line.id = `inventory-${index}`; });
  const commandLine = inventory.lines.find((line) => /^>LOOK/i.test(line.text));
  commandLine.text = commandLine.text.replace(/LOOK/i, "INVENTORY");
  commandLine.runs.at(-1).text = "INVENTORY";
  const commandIndex = inventory.lines.indexOf(commandLine);
  inventory.lines.splice(commandIndex + 1, 0, {
    ...inventory.lines[commandIndex + 1], id: "inventory-response",
    text: "You have no appendages to carry anything with.", runs: [],
  });
  inventory.terminalLine += 1;
  inventory.activeInput.line += 1;
  history = reconcile(history, inventory);

  const japanese = projectPresentationHistory(history, "ja");
  const english = projectPresentationHistory(history, "en");
  const japaneseAgain = projectPresentationHistory(history, "ja");
  assert.deepEqual(japaneseAgain, japanese);
  assert.ok(japanese.flatMap((entry) => entry.blocks).some((block) => /通信モード/.test(block.text)));
  assert.match(japanese.at(-1).blocks.map((block) => block.text).join("\n"), /INVENTORY[\s\S]*You have no appendages/);
  assert.ok(english.every((entry) => entry.blocks.every((block) => !block.text.includes("通信モードに入りました"))));

  const reset = reconcile(history, { ...opening, lines: opening.lines.map((line) => ({ ...line, id: `${line.id}-restart` })) });
  assert.equal(reset.length, 1, "a pristine opening starts a fresh presentation timeline");
});

test("recovers the canonical iframe for unsafe current observations and resets at RESTORE", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/parchment-look-runtime-observed.json", import.meta.url), "utf8")).presentation;
  fixture.version = 3;
  fixture.lines.forEach((line, index) => { line.id = `look-${index}`; });
  const represented = reconcilePresentationHistory([], fixture);
  assert.equal(represented.representable, true);

  const unsupportedCharacterInput = structuredClone(fixture);
  unsupportedCharacterInput.activeInput.kind = "char";
  const recovery = reconcilePresentationHistory(represented.history, unsupportedCharacterInput);
  assert.equal(recovery.representable, false);
  assert.equal(recovery.history, represented.history, "unsafe observations retain only the disposable cache");

  const invalid = reconcilePresentationHistory(represented.history, null);
  assert.equal(invalid.representable, false);

  const restore = structuredClone(fixture);
  restore.lines.forEach((line, index) => { line.id = `restore-${index}`; });
  const commandLine = restore.lines.find((line) => /^>LOOK/i.test(line.text));
  commandLine.text = commandLine.text.replace(/LOOK/i, "RESTORE");
  commandLine.runs.at(-1).text = "RESTORE";
  const restored = reconcilePresentationHistory(represented.history, restore);
  assert.equal(restored.representable, true);
  assert.equal(restored.history.length, 1, "pre-restore display entries cannot survive the timeline boundary");
});

test("shows the structured opening only for the live terminal character prompt", async () => {
  const payload = JSON.parse(await readFile(new URL("./fixtures/parchment-opening-payload.json", import.meta.url), "utf8"));
  assert.ok(openingPresentation(payload.presentation, "ja"));

  const lineInput = structuredClone(payload.presentation);
  lineInput.activeInput.kind = "line";
  assert.equal(openingPresentation(lineInput, "ja"), null);

  const staleScrollback = structuredClone(payload.presentation);
  staleScrollback.lines.push({ text: "Infocom interactive fiction - a science fiction story", classes: ["BufferLine", "Style_normal_par"], runs: [], layout: staleScrollback.lines[0].layout });
  staleScrollback.terminalLine = staleScrollback.lines.length - 1;
  staleScrollback.activeInput = { kind: "line", line: staleScrollback.terminalLine, classes: ["Input", "LineInput"] };
  assert.equal(openingPresentation(staleScrollback, "ja"), null);

  const detachedInput = structuredClone(payload.presentation);
  detachedInput.activeInput.line = null;
  assert.equal(openingPresentation(detachedInput, "ja"), null);

  const liveBrowserSlice = structuredClone(payload.presentation);
  liveBrowserSlice.lines.shift();
  liveBrowserSlice.terminalLine -= 1;
  liveBrowserSlice.activeInput.line -= 1;
  liveBrowserSlice.lines.at(-1).text = "[Hit \nany \nkey \nto \ncontinue.]";
  const browserBlocks = openingPresentation(liveBrowserSlice, "ja");
  assert.deepEqual(browserBlocks?.map((block) => block.kind), ["spacer", "quote", "spacer", "prompt"]);
  assert.match(browserBlocks?.[3].text || "", /いずれかのキーを押して/);

  const unrecognized = structuredClone(payload.presentation);
  unrecognized.lines[2].text = "A different story opening";
  assert.equal(openingPresentation(unrecognized, "ja"), null);

  const groupedRuns = structuredClone(payload.presentation);
  groupedRuns.lines.splice(2, 3, {
    ...groupedRuns.lines[2],
    text: groupedRuns.lines.slice(2, 5).map((line) => line.text).join("\n"),
  });
  groupedRuns.terminalLine = 4;
  groupedRuns.activeInput.line = 4;
  assert.deepEqual(openingPresentation(groupedRuns, "ja")?.map((block) => block.kind), ["heading", "spacer", "quote", "spacer", "prompt"]);

});

test("presents the source-derived and runtime-observed initial LOOK tableaux", async () => {
  const initialFixture = JSON.parse(await readFile(new URL("./fixtures/parchment-initial-line-source-derived.json", import.meta.url), "utf8"));
  const lookFixture = JSON.parse(await readFile(new URL("./fixtures/parchment-look-source-derived.json", import.meta.url), "utf8"));
  const runtimeInitialFixture = JSON.parse(await readFile(new URL("./fixtures/parchment-initial-line-runtime-observed.json", import.meta.url), "utf8"));
  const runtimeLookFixture = JSON.parse(await readFile(new URL("./fixtures/parchment-look-runtime-observed.json", import.meta.url), "utf8"));
  assert.match(initialFixture.provenance, /Source-derived/);
  assert.match(initialFixture.provenance, /not runtime-observed/);
  assert.match(runtimeInitialFixture.provenance, /Runtime-observed with Playwright/);
  assert.match(runtimeLookFixture.provenance, /Runtime-observed with Playwright/);

  assert.equal(initialLineTurnPresentation(initialFixture.presentation, "ja"), null, "source-derived grouped lines are not treated as browser evidence");
  assert.equal(initialLineTurnPresentation(lookFixture.presentation, "ja"), null);
  assert.equal(initialLineTurnPresentation(initialFixture.presentation, "en"), null);

  const runtimeInitial = initialLineTurnPresentation(runtimeInitialFixture.presentation, "ja");
  assert.deepEqual(runtimeInitial?.map((block) => block.kind), ["prose", "spacer", "title", "prose", "prose", "prose", "prose", "spacer", "prose", "list", "prose", "spacer"]);
  assert.equal(runtimeInitial?.find((block) => block.kind === "list")?.items?.length, 6);
  assert.equal(runtimeInitial?.find((block) => block.kind === "title")?.canonicalText, "A Mind Forever Voyaging");
  assert.ok(runtimeInitial?.filter((block) => block.kind === "spacer").every((block) => block.sourceLines.length));
  const runtimeLook = initialLineTurnPresentation(runtimeLookFixture.presentation, "ja");
  assert.deepEqual(runtimeLook?.map((block) => block.kind), ["command", "prose", "list", "prose", "spacer"]);
  assert.equal(runtimeLook?.[0].text, "LOOK");
  const runtimeEcho = runtimeLookFixture.presentation.lines.find((line) => line.text === ">LOOK");
  assert.deepEqual(runtimeEcho?.runs.map((run) => run.text), [">", "LOOK"]);
  assert.deepEqual(runtimeEcho?.runs[1].classes, ["Style_input"]);

  const missingTitle = structuredClone(runtimeInitialFixture.presentation);
  missingTitle.lines.splice(2, 1);
  missingTitle.terminalLine -= 1;
  missingTitle.activeInput.line -= 1;
  const withoutTitle = initialLineTurnPresentation(missingTitle, "ja");
  assert.ok(withoutTitle);
  assert.equal(withoutTitle.some((block) => block.text === "A Mind Forever Voyaging"), false, "an unobserved release title is never synthesized");
  assert.equal(withoutTitle.some((block) => block.kind === "title"), false);

  const reorderedOutlets = structuredClone(runtimeInitialFixture.presentation);
  [reorderedOutlets.lines[9], reorderedOutlets.lines[10]] = [reorderedOutlets.lines[10], reorderedOutlets.lines[9]];
  const reorderedList = initialLineTurnPresentation(reorderedOutlets, "ja")?.find((block) => block.kind === "list");
  assert.deepEqual(reorderedList?.items?.slice(0, 2), ["屋上 (RCRO)", "PRISMプロジェクト管制センター (PPCC)"], "translations follow observed outlet identity, not array position");

  assert.deepEqual(
    localizeStoryLeaves("part1.initial.release", ["Infocom interactive fiction - a science fiction story", "An untranslated observed release leaf"], "ja"),
    ["Infocom インタラクティブ・フィクション ― SFストーリー", "An untranslated observed release leaf"],
  );

  const detached = structuredClone(initialFixture.presentation);
  detached.activeInput.line = null;
  assert.equal(initialLineTurnPresentation(detached, "ja"), null);
  const characterInput = structuredClone(initialFixture.presentation);
  characterInput.activeInput.kind = "char";
  assert.equal(initialLineTurnPresentation(characterInput, "ja"), null);

  const unknown = structuredClone(initialFixture.presentation);
  unknown.lines[2].text = "An unknown state";
  assert.equal(initialLineTurnPresentation(unknown, "ja"), null);
  const unsupported = structuredClone(lookFixture.presentation);
  unsupported.lines[4].text = ">INVENTORY";
  assert.equal(initialLineTurnPresentation(unsupported, "ja"), null);

  const stale = structuredClone(initialFixture.presentation);
  stale.lines.push({ ...stale.lines.at(-1), text: "A later unsupported state >" });
  stale.terminalLine = stale.lines.length - 1;
  stale.activeInput.line = stale.terminalLine;
  assert.equal(initialLineTurnPresentation(stale, "ja"), null);
});

test("falls back per stable content ID without treating unknown source as recognized", () => {
  const canonical = "Canonical English survives.";
  assert.equal(localizeStoryContent("part1.initial.communications", canonical, "en"), canonical);
  // Deliberately exercise a catalog miss at runtime: recognition and catalog
  // lookup are separate responsibilities, and canonical text wins on a miss.
  assert.equal(localizeStoryContent("part1.initial.catalog-gap", canonical, "ja"), canonical);
});
