import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { companionHeaderLanguage, localizeOutletLabel, localizeSceneActionLabel, localizeSceneObjectName, localizeSimulationMapLabel, localizeSimulationPlace, packageInteractiveLocale, plotAssignmentLabel, recordedProgress, sceneActionsLocale, sceneActionUiText, simulationAssignment, uiText, localizeStoryContent, localizeStoryLeaves, localizeStoryTranscript, observedStoryLeafTranslation } from "../app/localization.ts";
import { assignmentBriefPresentation, initialLineTurnPresentation, observedOrdinaryTurnPresentation, openingPresentation, securityPromptPresentation, storyPresentation } from "../app/story-presentation.ts";
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
  assert.match(shell, /navigationText\(mapRoutePreview/);
  assert.match(shell, /communicationOutlets/);
  assert.match(shell, /InterfaceWorkbench/);
  assert.match(shell, /SceneActions/);
  assert.match(shell, /Classic/);
  assert.match(shell, /Guided/);
  assert.match(shell, /actionMenus/);
  assert.match(shell, /uiText\(locale, "introPlayStyle"\)/);
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
  assert.match(shell, /uiText\(locale, "mapRecordingBrief"\)/);
  assert.match(shell, /const travelOptions = useMemo/);
  assert.match(shell, /routeNext: Boolean/);
  assert.match(shell, /route-thread/);
  assert.match(shell, /compact-map-button/);
  assert.match(shell, /navigationText\("clearRoute"\)/);
  assert.match(shell, /uiText\(locale, "checklistEstimate"\)/);
  assert.match(shell, /uiText\(locale, recording \? "recordingCompleteHint" : "recordingStartHint"\)/);
  assert.match(shell, /interactionLevel === "actions" && initialFieldworkActive/);
  assert.match(shell, /role="dialog" aria-modal="true" aria-labelledby="fieldwork-title"/);
  assert.match(shell, /navigator\.share/);
  assert.match(shell, /https:\/\/mind-forever-voyaging\.netlify\.app\//);
  assert.match(shell, /uiText\(locale, "shareEdition"\)/);
  assert.match(shell, /resetWrapperForStory[\s\S]*setCommand\(""\)[\s\S]*setAliasNotice\(null\)[\s\S]*setMapDestinationId\(null\)/);
  assert.match(shell, /uiText\(locale, "simulationBeginObservations"\)/);
  assert.match(shell, /Perelman’s brief · nine requested observations/);
  assert.match(shell, /\["wait for 28 minutes", "wait"\]/);
  assert.match(shell, /uiText\(locale, "securityDecoderInstructions"\)/);
  assert.match(shell, /Fast-forward console/);
  assert.match(shell, /canonicalIframeRef/);
  assert.match(shell, /qaIframeRef/);
  assert.doesNotMatch(shell, /You are PRISM, the world’s first sentient computer/);
  assert.match(shell, /uiText\(locale, "introContentNote"\)/);
  assert.match(shell, /aria-live="polite"/);
});

test("ships the physical package materials beside the story", async () => {
  await Promise.all([
    access(new URL("../app/icon.svg", import.meta.url)),
    access(new URL("../public/package/rockvil-map-back.jpg", import.meta.url)),
    access(new URL("../public/package/security-decoder.jpg", import.meta.url)),
    access(new URL("../public/package/amfv-manual.pdf", import.meta.url)),
  ]);
  const [tools, localization] = await Promise.all([
    readFile(new URL("../app/StoryTools.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/localization.ts", import.meta.url), "utf8"),
  ]);
  assert.match(localization, /Original 1985 promotional street map/);
  assert.match(tools, /ROCKVIL_LANDMARKS/);
  assert.match(tools, /map-hotspots/);
  assert.match(localization, /Dakota Online/);
  assert.match(tools, /HVAC Controller/);
  assert.match(tools, /traffic computer, set/);
  assert.match(tools, /\$\{noun\}, hello/);
  assert.match(tools, /hasFlag\(object, "READBIT"\)/);
  assert.match(tools, /canonicalActions/);
  assert.match(tools, /object\.initialLocation === "LOCAL-GLOBALS" && \["enter", "leave"\]\.includes\(definition\.action\.id\)/);
  assert.match(tools, /refusalOnlyVerbs/);
  assert.match(tools, /RockvilNavigator/);
  assert.match(tools, /fieldwork destination/);
  assert.equal(packageInteractiveLocale("ja", true), "en");
  assert.equal(packageInteractiveLocale("ja", false), "ja");
  assert.match(tools, /className="map-hotspots" lang=\{interactiveLocale\} aria-label="Rockvil landmarks"/);
  assert.match(tools, /<span lang=\{interactiveLocale\}>Choose a destination/);
  assert.match(tools, /className="map-route-card" lang=\{interactiveLocale\}/);
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

test("localizes the core wrapper UI catalog in both directions", () => {
  assert.equal(uiText("en", "readingSettings"), "Reading and play settings");
  assert.equal(uiText("ja", "readingSettings"), "読書とプレイの設定");
  assert.equal(uiText("en", "share"), "Share");
  assert.equal(uiText("ja", "share"), "共有");
  assert.equal(uiText("en", "issueCommand"), "Issue a command");
  assert.equal(uiText("ja", "issueCommand"), "コマンドを入力");
  assert.equal(uiText("ja", "commandHistoryHelp"), "↑ で以前のコマンドを呼び出せます。");
  assert.equal(uiText("ja", "linkCopied"), "リンクをコピーしました");
  assert.equal(localizeOutletLabel("ja", "PEOF", "Dr. Perelman's Office"), "ペレルマン博士のオフィス");
  assert.equal(localizeOutletLabel("en", "PEOF", "Dr. Perelman's Office"), "Dr. Perelman's Office");
});

test("localizes the approved initial Simulation controls and estimated brief", () => {
  assert.equal(uiText("ja", "simulationAvailable"), "Simulation Mode が利用できます");
  assert.equal(uiText("ja", "securityCodeDecoder"), "セキュリティコード・デコーダー");
  assert.equal(uiText("ja", "stopRecording"), "録画停止");
  assert.equal(uiText("ja", "checklistEstimate"), "体験中は RECORD を有効にしてください。チェックは Release 79 と同じ反応を手がかりにする補助的な推定です。");
  assert.equal(simulationAssignment("ja", 3), "新聞を読むこと");
  assert.equal(simulationAssignment("en", 8), "Visit your home or living quarters");
  assert.equal(recordedProgress("ja", 2), "9件中2件を録画");
  assert.equal(recordedProgress("en", 2, true), "2/9 recorded");
  assert.equal(plotAssignmentLabel("ja", "新聞を読むこと"), "新聞を読むことへの経路を表示");
});

test("limits the Simulation UI packet to the first 2041 entry and preserves English subtrees", async () => {
  const shell = await readFile(new URL("../app/PrismEdition.tsx", import.meta.url), "utf8");
  assert.match(shell, /type InitialSimulationState = "unknown" \| "eligible" \| "active" \| "complete"/);
  assert.match(shell, /initialSimulationRef\.current = "eligible"/);
  assert.match(shell, /priorCanonicalMode === "Simulation Mode" && nextMode !== "Simulation Mode"/);
  assert.match(shell, /const initial2041Presentation = mode === "Simulation Mode" && initialFieldworkActive && displayYear === 2041 && initialSimulationState === "active"/);
  assert.doesNotMatch(shell, /simulationEntryCount/);
  assert.match(shell, /const initialInvitationPresentation = !discovery\.simulationEntered && !discovery\.partTwo/);
  assert.match(shell, /mode === "Simulation Mode" && initial2041Presentation \? \[\[uiText\(locale, "simulationLook"\)/);
  assert.match(shell, /<RockvilNavigator[\s\S]{0,1000}lang=\{navigationLocale\}/);
  assert.match(shell, /className="decoder-seal" lang="en"/);
  assert.match(shell, /localizeSimulationPlace\(locale, currentRoomName\) !== currentRoomName \? locale : "en"/);
});

test("localizes the approved opening and Communications companion copy", () => {
  assert.equal(uiText("ja", "carrierLocked"), "信号を捕捉");
  assert.equal(uiText("ja", "readerCompanion"), "読者ガイド");
  assert.equal(uiText("ja", "communicationsGuideCopy"), "アウトレットを選ぶと、その場所の映像と音声に接続します。DISPLAY OUTLETS で現在の一覧を再表示します。");
  assert.equal(uiText("ja", "criticalContextCopy"), "この作品は、記憶、証拠、政治的な約束、そしてインタラクティブな表現が、単に物語を伝えるだけでなく、私たちに何を感じさせうるかを探究しています。");
  assert.equal(uiText("en", "criticalContextCopy"), "The work explores memory, evidence, political promises, and what interactivity can make us feel rather than merely tell us.");
});

test("contains the complete approved identity rail and general shell copy packet", () => {
  const approved = {
    storyContext: ["Story context", "作品情報"],
    openTitleInformation: ["Open title and edition information", "作品名と版の情報を開く"],
    editionSubtitle: ["INTERACTIVE NOVEL · RELEASE 79", "インタラクティブ小説 · Release 79"],
    communicationChannel: ["COMMUNICATION CHANNEL", "通信チャンネル"],
    prismOnlineCaption: ["PRISM / ONLINE", "PRISM / オンライン"],
    carrier: ["Carrier", "搬送波"], receiving: ["Receiving", "受信中"],
    designation: ["Designation", "識別名"],
    communicationsActive: ["Communications active", "通信機能稼働中"],
    cognitiveSystemOnline: ["Cognitive system online", "認知システム稼働中"],
    currentMode: ["Current mode", "現在のモード"],
    communications: ["Communications", "通信"],
    releaseSerial: ["RELEASE 79 · SERIAL 851122", "RELEASE 79 · SERIAL 851122"],
    aboutRelease: ["About this release", "この版について"],
    skipInteractionControls: ["Skip to interaction controls", "ストーリー操作へスキップ"],
    interactiveStory: ["Interactive story", "インタラクティブな物語"],
    prismOnline: ["PRISM online", "PRISM オンライン"],
    projectDate2031: ["Project date · 2031", "計画年 · 2031"],
    initializing: ["INITIALIZING", "初期化中"], keyRequested: ["KEY REQUESTED", "キー入力待機中"],
    awaitingInput: ["AWAITING INPUT", "入力待機中"], processing: ["PROCESSING", "処理中"],
    canonicalStoryTitle: ["A Mind Forever Voyaging — canonical Release 79 story", "A Mind Forever Voyaging — オリジナル版 Release 79"],
    currentGamePrompt: ["Current game prompt", "現在のゲームプロンプト"],
    answerQuestion: ["Answer the question", "質問に答える"], answer: ["Answer", "回答"],
    yes: ["Yes", "はい"], no: ["No", "いいえ"],
    openLibrary: ["Open library", "ライブラリを開く"],
    inspectInterfaces: ["Inspect interfaces", "インターフェースを確認"],
  };
  for (const [key, [english, japanese]] of Object.entries(approved)) {
    assert.equal(uiText("en", key), english, `${key} English`);
    assert.equal(uiText("ja", key), japanese, `${key} Japanese`);
  }
});

test("keeps accessible Japanese names and excluded later-mode English in their own language boundaries", async () => {
  const shell = await readFile(new URL("../app/PrismEdition.tsx", import.meta.url), "utf8");
  assert.match(shell, /className="system-state" lang=\{locale\} aria-label=\{uiText/);
  assert.match(shell, /<span>\{systemActivity\}<\/span>/);
  assert.match(shell, /className="companion-panel" lang=\{locale\} aria-label=\{uiText\(locale, "readerCompanion"\)\}/);
  for (const className of ["library-section", "systems-section", "evidence-section", "debug-section"]) {
    assert.match(shell, new RegExp(`className="companion-section ${className}" lang="en"`));
  }
  assert.match(shell, /className="debug-entry" lang="en"/);
  assert.match(shell, /className="mode-subreadout" lang=\{guide\.localized \? locale : "en"\}/);
  assert.match(shell, /openingOrCommunications \? <span lang=\{locale\}>[\s\S]*: <span lang="en">\{mode\}/);
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "signal"), "ja");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "comparative"), "en");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "comparative", true), "ja");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "witness"), "en");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "lockdown"), "en");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "epilogue"), "en");
  assert.equal(companionHeaderLanguage("ja", "Simulation Mode", "field"), "en");
  assert.equal(companionHeaderLanguage("ja", "Simulation Mode", "field", true), "ja");
  assert.equal(localizeSimulationPlace("ja", "Elm & Park"), "エルム通りとパーク通り");
  assert.equal(localizeSimulationPlace("ja", "Courthouse"), "裁判所");
  assert.equal(localizeSimulationPlace("ja", "Kennedy Park"), "ケネディ公園");
  assert.equal(localizeSimulationPlace("ja", "Main & Kennedy"), "メイン通りとケネディ通り");
  assert.equal(localizeSimulationPlace("ja", "Centre & Kennedy"), "センター通りとケネディ通り");
  assert.equal(localizeSimulationPlace("ja", "Bodanski Square"), "ボダンスキー広場");
  assert.equal(localizeSimulationPlace("ja", "Unobserved Room"), "Unobserved Room");
  assert.equal(localizeSimulationPlace("en", "Courthouse"), "Courthouse");
  assert.equal(localizeSimulationMapLabel("ja", "north-central", "North Central Station"), "ノース・セントラル駅");
  assert.equal(localizeSimulationMapLabel("ja", "newspaper", "Newspaper"), "新聞");
  assert.equal(localizeSimulationMapLabel("ja", "infotech", "InfoTech Building"), "インフォテック・ビル");
  assert.equal(localizeSimulationMapLabel("ja", "unknown", "Unobserved Landmark"), "Unobserved Landmark");
  assert.equal(localizeSimulationMapLabel("en", "newspaper", "Newspaper"), "Newspaper");
});

test("localizes the complete introduction catalog and preserves its English copy", () => {
  const expected = {
    introKicker: ["THE COMPLETE 1985 INTERACTIVE NOVEL · RELEASE 79", "完全収録・1985年のインタラクティブ小説 · Release 79"],
    introLede: ["Read closely. Wander. Talk to people. Notice the ordinary things.", "よく読み、歩き回り、人と話し、ありふれたものに目を留めてください。"],
    introRead: ["Read", "読む"],
    introReadDescription: ["Names and small details matter.", "名前や細かな点も重要です。"],
    introExplore: ["Explore", "探索する"],
    introExploreDescription: ["People, places, and objects are interactive.", "人、場所、物と関わることができます。"],
    introRemember: ["Remember", "覚えておく"],
    introRememberDescription: ["Keep what you think matters.", "大切だと思うことを覚えておいてください。"],
    introPlayStyle: ["How would you like to play?", "どのようにプレイしますか？"],
    introClassicDescription: ["The original command line.", "原作どおりのコマンド入力です。"],
    introGuidedDescription: ["Clickable navigation and editable hints.", "クリック可能な移動操作と、編集できるヒントを表示します。"],
    introActionMenusDescription: ["Direct actions for useful scene details.", "場面内の有用な対象に直接アクションできます。"],
    introBegin: ["Begin", "始める"],
    introReturn: ["Return to story", "物語に戻る"],
    introOpenPackage: ["Open the original package", "オリジナル版の付属資料を開く"],
    introContentNote: ["Historical content note", "歴史的内容に関する注意"],
    introContentWarning: ["The unaltered 1985 text includes depictions and language involving authoritarianism, poverty, racism, religious extremism, suicide, and violence.", "改変していない1985年の本文には、権威主義、貧困、人種差別、宗教的過激主義、自殺、暴力に関する描写と言葉が含まれます。"],
    introCredits: ["Written by Steve Meretzky · Original release by Infocom · Interpreter by Parchment", "著：Steve Meretzky · オリジナル版：Infocom · インタープリター：Parchment"],
  };

  for (const [key, [english, japanese]] of Object.entries(expected)) {
    assert.equal(uiText("en", key), english);
    assert.equal(uiText("ja", key), japanese);
  }
  assert.equal(uiText("en", "shareEdition"), "Share this edition");
  assert.equal(uiText("ja", "shareEdition"), "このエディションを共有");
});

test("localizes only the approved PEOF SceneActions display copy", () => {
  assert.equal(sceneActionsLocale("ja", "OFFICE"), "ja");
  assert.equal(sceneActionsLocale("en", "OFFICE"), "en");
  assert.equal(sceneActionsLocale("ja", "KENNEDY-PARK"), "en");
  assert.equal(sceneActionsLocale("ja", null), "en");

  const shellCopy = {
    guidedLandmark: ["Words mentioned here", "この場面で言及された語"],
    guidedHeading: ["Worth trying", "試してみる"],
    guidedInstruction: ["Choose one to draft a command", "選ぶとコマンドを下書きします"],
    actionsLandmark: ["Actions for things mentioned here", "この場面で言及された対象へのアクション"],
    actionsHeading: ["In this scene", "この場面で"],
    actionsInstruction: ["Actions written into the original story", "原作に用意されたアクション"],
  };
  for (const [key, [english, japanese]] of Object.entries(shellCopy)) {
    assert.equal(sceneActionUiText("en", key), english);
    assert.equal(sceneActionUiText("ja", key), japanese);
  }

  for (const [id, english, japanese] of [
    ["PERELMAN", "Dr. Perelman", "ペレルマン博士"],
    ["DESK", "desk", "机"],
    ["DECODER", "decoder", "デコーダー"],
    ["MAP", "map", "地図"],
    ["PEN", "pen", "ペン"],
    ["MAGAZINE-ARTICLE", "magazine article", "雑誌記事"],
  ]) {
    assert.equal(localizeSceneObjectName("en", "OFFICE", id, english), english);
    assert.equal(localizeSceneObjectName("ja", "OFFICE", id, english), japanese);
  }
  assert.equal(localizeSceneObjectName("ja", "OFFICE", "LATER-OBJECT", "later object"), "later object");
  assert.equal(localizeSceneObjectName("ja", "LATER-ROOM", "MAP", "map"), "map");

  for (const [objectId, actionId, english, japanese] of [
    ["PERELMAN", "talk", "Talk", "話す"],
    ["PERELMAN", "examine", "Examine", "調べる"],
    ["DESK", "look-inside", "Look inside", "中をのぞく"],
    ["DECODER", "read", "Read", "読む"],
  ]) {
    assert.equal(localizeSceneActionLabel("en", "OFFICE", objectId, actionId, english), english);
    assert.equal(localizeSceneActionLabel("ja", "OFFICE", objectId, actionId, english), japanese);
  }
  assert.equal(localizeSceneActionLabel("ja", "OFFICE", "LATER-OBJECT", "read", "Read"), "Read");
  assert.equal(localizeSceneActionLabel("ja", "LATER-ROOM", "MAP", "read", "Read"), "Read");
});

test("limits newspaper SceneActions to the approved initial route and object/action pairs", () => {
  assert.equal(sceneActionsLocale("ja", "BODANSKI-SQUARE", true), "ja");
  assert.equal(sceneActionsLocale("ja", "BODANSKI-SQUARE", false), "en");
  assert.equal(sceneActionsLocale("ja", "UNOBSERVED-ROOM", true), "en");
  assert.equal(localizeSceneObjectName("ja", "BODANSKI-SQUARE", "NEWSPAPER", "newspaper"), "新聞");
  assert.equal(localizeSceneObjectName("ja", "BODANSKI-SQUARE", "NEWSPAPER-DISPENSER", "newspaper dispenser"), "新聞販売機");
  assert.equal(localizeSceneActionLabel("ja", "BODANSKI-SQUARE", "NEWSPAPER", "buy", "Buy"), "買う");
  assert.equal(localizeSceneActionLabel("ja", "BODANSKI-SQUARE", "NEWSPAPER", "read", "Read"), "読む");
  assert.equal(localizeSceneActionLabel("ja", "BODANSKI-SQUARE", "NEWSPAPER-DISPENSER", "examine", "Examine"), "Examine");
  assert.equal(localizeSceneActionLabel("ja", "BODANSKI-SQUARE", "UNKNOWN", "read", "Read"), "Read");
  assert.equal(localizeSceneObjectName("ja", "DRUG-STORE", "NEWSPAPER", "newspaper"), "newspaper");
  assert.equal(localizeSceneObjectName("en", "BODANSKI-SQUARE", "NEWSPAPER", "newspaper"), "newspaper");
});

test("keeps both later-scene SceneActions shells and language boundaries in English", async () => {
  const tools = await readFile(new URL("../app/StoryTools.tsx", import.meta.url), "utf8");
  assert.match(tools, /const displayLocale = sceneActionsLocale\(locale, roomId, initial2041\)/);
  assert.match(tools, /scene-actions scene-words" lang=\{displayLocale\} aria-label=\{sceneActionUiText\(displayLocale, "guidedLandmark"\)\}/);
  assert.match(tools, /className="scene-actions" lang=\{displayLocale\} aria-label=\{sceneActionUiText\(displayLocale, "actionsLandmark"\)\}/);
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
    text: "You have no appendages, remember?", runs: [],
  });
  inventory.terminalLine += 1;
  inventory.activeInput.line += 1;
  history = reconcile(history, inventory);

  const japanese = projectPresentationHistory(history, "ja");
  const english = projectPresentationHistory(history, "en");
  const japaneseAgain = projectPresentationHistory(history, "ja");
  assert.deepEqual(japaneseAgain, japanese);
  assert.ok(japanese.flatMap((entry) => entry.blocks).some((block) => /通信モード/.test(block.text)));
  assert.match(japanese.at(-1).blocks.map((block) => block.text).join("\n"), /INVENTORY[\s\S]*手足はないことを忘れたのか/);
  assert.deepEqual(observedStoryLeafTranslation("You have no appendages, remember?", "ja"), {
    contentId: "part1.communications.inventory-empty", text: "手足はないことを忘れたのか？",
  });
  assert.equal(observedStoryLeafTranslation("You have no appendages, remember?", "en"), undefined);
  assert.equal(observedOrdinaryTurnPresentation(inventory, "en"), null);
  assert.deepEqual(observedOrdinaryTurnPresentation(inventory, "ja")?.slice(0, 2).map((block) => block.kind), ["command", "prose"]);
  assert.equal(observedOrdinaryTurnPresentation(inventory, "ja")?.[1].sourceLines[0], commandIndex + 1);
  assert.ok(english.every((entry) => entry.blocks.every((block) => !block.text.includes("通信モードに入りました"))));

  const reset = reconcile(history, { ...opening, lines: opening.lines.map((line) => ({ ...line, id: `${line.id}-restart` })) });
  assert.equal(reset.length, 1, "a pristine opening starts a fresh presentation timeline");
});

test("projects the runtime-observed PEOF inspection packet with command-qualified leaves", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/parchment-peof-inspection-runtime-observed.json", import.meta.url), "utf8"));
  assert.match(fixture.provenance, /Runtime-observed with Playwright/);
  assert.match(fixture.provenance, /canonical Release 79/);

  const expectedResponses = new Map([
    ["LOOK", ["ペレルマン博士のオフィス", "ここは、あなたの創造者であるエイブラハム・ペレルマン博士のオフィスだ。室内は物であふれ、散らかっている。ぎっしり詰まった本棚が部屋を囲んでいる。ペレルマンの机の上には、デコーダー、街の地図、ボールペン、雑誌記事のプリントアウトなど、さまざまな品が置かれている。", "ペレルマン博士は机に向かい、仕事をしている。"]],
    ["EXAMINE DESK", ["ペレルマンの机の上には、デコーダー、街の地図、ボールペン、雑誌記事のプリントアウトなど、さまざまな品が置かれている。"]],
    ["EXAMINE DR PERELMAN", ["ペレルマンは50代後半の年配の男性で、白い山羊ひげをたくわえている。"]],
    ["EXAMINE DECODER", ["［これは、あなたの『A Mind Forever Voyaging』パッケージに入っているデコーダーです。］"]],
    ["EXAMINE MAP", ["［これは、あなたの『A Mind Forever Voyaging』パッケージに入っている地図です。］"]],
    ["EXAMINE PEN", ["［これは、あなたの『A Mind Forever Voyaging』パッケージに入っているペンです。］"]],
    ["EXAMINE MAGAZINE ARTICLE", ["［これは、あなたの『A Mind Forever Voyaging』パッケージに入っている雑誌記事です。］"]],
  ]);

  assert.deepEqual(fixture.observations.map(({ command }) => command), [...expectedResponses.keys()]);
  for (const observation of fixture.observations) {
    assert.equal(observation.presentation.version, 3);
    assert.equal(observation.presentation.terminalLine, observation.presentation.lines.length - 1);
    assert.equal(observation.presentation.activeInput.line, observation.presentation.terminalLine);
    assert.equal(observation.presentation.lines[0].text, `>${observation.command}`);
    assert.equal(observation.presentation.lines.at(-1).text, ">");
    assert.deepEqual(observation.status, {
      mode: "Communications Mode",
      time: observation.status.time,
      location: "Dr. Perelman's Office",
      date: "3/16/2031",
    });

    const blocks = observedOrdinaryTurnPresentation(observation.presentation, "ja");
    assert.ok(blocks, `${observation.command} is representable by the ordinary-turn projector`);
    assert.equal(blocks[0].kind, "command");
    assert.equal(blocks[0].canonicalText, observation.command);
    assert.equal(blocks[0].text, observation.command);
    assert.deepEqual(
      blocks.filter(({ kind }) => kind === "title" || kind === "prose").map(({ text }) => text),
      expectedResponses.get(observation.command),
    );
    assert.equal(blocks.at(-1).kind, "spacer");
    assert.equal(observedOrdinaryTurnPresentation(observation.presentation, "en"), null);

    const canonicalLeaf = observation.presentation.lines[1].text;
    assert.ok(observedStoryLeafTranslation(canonicalLeaf, "ja", observation.command));
    assert.equal(observedStoryLeafTranslation(canonicalLeaf, "ja", "SCORE"), undefined);
  }

  assert.equal(observedStoryLeafTranslation("An unobserved office detail.", "ja", "LOOK"), undefined);
});

test("retains the first Simulation Mode brief, dynamic challenge, and recording boundaries", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/parchment-first-simulation-runtime-observed.json", import.meta.url), "utf8"));
  assert.match(fixture.provenance, /Runtime-observed with Playwright in Chromium/);
  assert.match(fixture.provenance, /canonical Release 79/);
  assert.match(fixture.provenance, /canonical English/);
  assert.equal(fixture.sessions.length, 2);

  const assignments = [
    "Eating a meal in a restaurant",
    "Talking to a government official",
    "Visiting a power-generating facility",
    "Reading a newspaper",
    "Riding some form of public transportation",
    "Attending a court in session",
    "Talking to a church official",
    "Going to a movie",
    "Visiting your own home or living quarters",
  ];
  const challenges = [];
  const simulationDates = [];
  const simulationTimes = [];

  for (const session of fixture.sessions) {
    const observations = session.observations;
    assert.deepEqual(observations.map(({ command, role }) => role ?? command), [
      "PEOF", "WAIT", "WAIT", "WAIT", "WAIT", "ENTER SIMULATION MODE", "security-answer", "LOOK", "RECORD", "WAIT", "RECORD OFF",
    ]);
    for (const observation of observations) {
      assert.equal(observation.presentation.version, 3);
      assert.equal(observation.presentation.terminalLine, observation.presentation.lines.length - 1);
      assert.equal(observation.presentation.activeInput.kind, "line");
      assert.equal(observation.presentation.activeInput.line, observation.presentation.terminalLine);
      assert.ok(observation.presentation.lines.every(({ text }) => !/[\u3040-\u30ff\u3400-\u9fff]/u.test(text)), "fixture story output remains canonical English");
    }

    const waits = observations.filter(({ command, role }) => command === "WAIT" && !role);
    assert.equal(waits.length, 5, "four Communications WAITs plus one recorded WAIT are retained");
    assert.match(waits[1].presentation.lines.map(({ text }) => text).join("\n"), /Alyson Price[\s\S]*Good night, Doc/);
    const briefLines = waits[3].presentation.lines.map(({ text }) => text);
    const assignmentStart = briefLines.findIndex((text) => text.trim() === assignments[0]);
    assert.ok(assignmentStart > 0);
    assert.deepEqual(briefLines.slice(assignmentStart, assignmentStart + assignments.length), assignments.map((text) => `   ${text}`));
    assert.deepEqual(
      waits[3].presentation.lines.slice(assignmentStart, assignmentStart + assignments.length).map(({ runs }) => runs),
      assignments.map((text) => [{ text: `   ${text}`, classes: ["Style_normal"], tag: "span" }]),
    );
    assert.match(briefLines[assignmentStart - 1], /list of things to record:$/);
    assert.match(briefLines[assignmentStart + assignments.length], /^By the way, since the Simulation Controller/);
    assert.match(briefLines.join("\n"), /walks to a point beyond your field of vision[\s\S]*walks back into your field of vision/);

    const challenge = observations.find(({ command }) => command === "ENTER SIMULATION MODE");
    assert.deepEqual(challenge.status, { mode: "Simulation Mode", time: "7:35pm", location: "(undefined)", date: "3/16/2031" });
    assert.equal(challenge.presentation.activeInput.line, 1, "security prompt and active input share one line");
    const promptLine = challenge.presentation.lines[1];
    const prompt = promptLine.text.replace(/\s+/g, " ").trim();
    const dynamic = prompt.match(/^Simulation Mode is a Class One Security mode\. For access, enter the Security Code corresponding to: ([A-Z ]+) (\d+) >$/);
    assert.ok(dynamic, "security shell retains a dynamic color and inner number");
    assert.deepEqual(promptLine.runs.at(-1), { text: "", classes: ["Input", "LineInput"], tag: "textarea" });
    challenges.push(`${dynamic[1]} ${dynamic[2]}`);

    const answer = observations.find(({ role }) => role === "security-answer");
    assert.equal(answer.inputOwnership.canonicalNumericInput, answer.command);
    assert.match(answer.presentation.lines.map(({ text }) => text.replace(/\s+/g, " ")).join("\n"), new RegExp(`Security Code corresponding to: ${dynamic[1]} ${dynamic[2]} >${answer.command}[\\s\\S]*This simulation is based 10 years hence\\.[\\s\\S]*Kennedy Park`));
    simulationDates.push(answer.status.date);
    simulationTimes.push(answer.status.time);

    const record = observations.find(({ command }) => command === "RECORD");
    const recordOff = observations.find(({ command }) => command === "RECORD OFF");
    assert.equal(record.status.mode, "Simulation Mode (recording)");
    assert.deepEqual(record.presentation.lines.map(({ text }) => text), [">RECORD", "Record feature activated.", " ", ">"]);
    assert.equal(recordOff.status.mode, "Simulation Mode");
    assert.deepEqual(recordOff.presentation.lines.map(({ text }) => text), [">RECORD OFF", "Record feature deactivated.", " ", ">"]);
    assert.deepEqual(recordOff.presentation.lines.at(-1).runs.map(({ tag, text }) => ({ tag, text })), [
      { tag: "span", text: ">" }, { tag: "textarea", text: "" },
    ]);
  }

  assert.equal(new Set(challenges).size, 2, "fresh sessions observed different security challenges");
  assert.equal(new Set(simulationDates).size, 2, "fresh sessions observed different simulation dates");
  assert.equal(new Set(simulationTimes).size, 2, "fresh sessions observed different simulation times");
});

test("retains the runtime-observed 2041 Courthouse recording round trip", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/parchment-courthouse-runtime-observed.json", import.meta.url), "utf8"));
  assert.match(fixture.provenance, /Runtime-observed with Playwright in Chromium/);
  assert.match(fixture.provenance, /canonical Release 79/);
  assert.match(fixture.provenance, /canonical English/);
  assert.equal(fixture.sessions.length, 2);
  assert.deepEqual(fixture.path, ["RECORD", "SW", "NW", "LOOK", "SE", "NE", "RECORD OFF"]);

  const elmDescription = "This is the intersection of the north-south Park Street and the east-west Elm Street. A park entrance is on the northeast corner, and large, old-fashioned edifices occupy the other three corners of the intersection. The sidewalks and street are crowded with people.";
  const courthouseDescription = "The courthouse is of the same vintage as the other governmental buildings in the area, dating from around 1990 or so. An exit leads southeast.";
  const courtSession = "The court is in session. A woman is being tried for petty theft.";
  const optionalNoise = "You are startled as a taxi horn blares nearby.";
  const observedNoise = [];

  for (const session of fixture.sessions) {
    assert.deepEqual(session.observations.map(({ command }) => command), fixture.path);
    for (const observation of session.observations) {
      assert.equal(observation.presentation.version, 3);
      assert.equal(observation.presentation.terminalLine, observation.presentation.lines.length - 1);
      assert.deepEqual(observation.presentation.activeInput, {
        kind: "line",
        line: observation.presentation.terminalLine,
        classes: ["Input", "LineInput"],
      });
      assert.deepEqual(observation.presentation.lines.at(-1).runs.map(({ text, tag }) => ({ text, tag })), [
        { text: ">", tag: "span" }, { text: "", tag: "textarea" },
      ]);
      assert.ok(observation.presentation.lines.every(({ text }) => !/[\u3040-\u30ff\u3400-\u9fff]/u.test(text)));
      assert.match(observation.status.date, /^\d{1,2}\/\d{1,2}\/2041$/);
      const fallback = reconcilePresentationHistory([], observation.presentation);
      assert.equal(fallback.representable, true, `${observation.command} has the existing ordinary line-input shape`);
      const blocks = projectPresentationHistory(fallback.history, "ja")[0].blocks;
      if (observation.command === "SW") {
        assert.equal(blocks.find(({ canonicalText }) => canonicalText === "Elm & Park").text, "エルム通りとパーク通り");
        assert.equal(blocks.find(({ canonicalText }) => canonicalText === elmDescription).text, "ここは南北に走るパーク通りと東西に走るエルム通りの交差点だ。北東の角には公園の入口があり、残る三つの角には古風な大建築が建っている。歩道も車道も人で混み合っている。");
        const noise = blocks.find(({ canonicalText }) => canonicalText === optionalNoise);
        if (noise) assert.equal(noise.text, optionalNoise, "optional city noise remains canonical English");
      }
      if (["NW", "LOOK"].includes(observation.command)) {
        assert.equal(blocks.find(({ canonicalText }) => canonicalText === "Courthouse").text, "裁判所");
        assert.equal(blocks.find(({ canonicalText }) => canonicalText === courthouseDescription).text, "この裁判所は周辺のほかの官庁舎と同じ年代の建物で、1990年頃に建てられたものだ。出口は南東へ通じている。");
        assert.equal(blocks.find(({ canonicalText }) => canonicalText === courtSession).text, "法廷は開廷中だ。女性が軽窃盗の罪で裁判にかけられている。");
      }
      if (observation.command === "SE") assert.equal(blocks.find(({ canonicalText }) => canonicalText === "Elm & Park").text, "エルム通りとパーク通り");
      if (observation.command === "NE") assert.equal(blocks.find(({ canonicalText }) => canonicalText === "Kennedy Park").text, "ケネディ公園");
    }

    const byCommand = Object.fromEntries(session.observations.map((observation) => [observation.command, observation]));
    assert.equal(byCommand.RECORD.status.mode, "Simulation Mode (recording)");
    assert.equal(byCommand["RECORD OFF"].status.mode, "Simulation Mode");
    assert.deepEqual(byCommand.SW.presentation.lines.slice(0, 3).map(({ text }) => text), [">SW", "Elm & Park", elmDescription]);
    const swLeaves = byCommand.SW.presentation.lines.map(({ text }) => text);
    if (swLeaves.includes(optionalNoise)) observedNoise.push(optionalNoise);
    assert.ok(swLeaves.every((text) => [">SW", "Elm & Park", elmDescription, " ", ">", optionalNoise].includes(text)));
    for (const command of ["NW", "LOOK"]) {
      assert.deepEqual(byCommand[command].presentation.lines.map(({ text }) => text), [
        `>${command}`, "Courthouse", courthouseDescription, " ", courtSession, " ", ">",
      ]);
      assert.equal(byCommand[command].status.location, "Courthouse");
      assert.equal(byCommand[command].status.mode, "Simulation Mode (recording)");
    }
    assert.deepEqual(byCommand.SE.presentation.lines.map(({ text }) => text), [">SE", "Elm & Park", " ", ">"]);
    assert.deepEqual(byCommand.NE.presentation.lines.map(({ text }) => text), [">NE", "Kennedy Park", " ", ">"]);
    assert.equal(byCommand["RECORD OFF"].status.location, "Kennedy Park");
  }

  assert.deepEqual(observedNoise, [optionalNoise], "optional city noise occurred in only one fresh session");
  assert.notEqual(fixture.sessions[0].observations[0].status.date, fixture.sessions[1].observations[0].status.date);
  assert.notEqual(fixture.sessions[0].observations[0].status.time, fixture.sessions[1].observations[0].status.time);

  const alternateCrowd = structuredClone(fixture.sessions[0].observations.find(({ command }) => command === "SW").presentation);
  alternateCrowd.lines.find(({ text }) => text === elmDescription).text = `${elmDescription.slice(0, elmDescription.indexOf("The sidewalks"))}The street is bustling with lunchtime crowds.`;
  const alternateBlocks = projectPresentationHistory(reconcilePresentationHistory([], alternateCrowd).history, "ja")[0].blocks;
  assert.equal(alternateBlocks.find(({ canonicalText }) => canonicalText === "Elm & Park").text, "エルム通りとパーク通り");
  const alternateDescription = alternateBlocks.find(({ canonicalText }) => canonicalText?.endsWith("lunchtime crowds."));
  assert.equal(alternateDescription.text, alternateDescription.canonicalText, "unapproved random description safely remains canonical English");
});

test("retains the runtime-observed Courthouse-to-Newspaper fieldwork route", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/parchment-newspaper-runtime-observed.json", import.meta.url), "utf8"));
  assert.match(fixture.provenance, /Runtime-observed with Playwright in Chromium/);
  assert.equal(fixture.decision, "A: Courthouse followed by Newspaper in the same fresh canonical session");
  assert.equal(fixture.sessions.length, 2);
  assert.deepEqual(fixture.stableIdentity.newspaperPath, [
    "INVENTORY", "RECORD", "NE", "N", "NE", "BUY NEWSPAPER", "READ NEWSPAPER", "SW", "S", "SW", "RECORD OFF",
  ]);
  assert.deepEqual(fixture.prerequisites.inventoryBeforeNewspaperRecording, ["a key", "a wallet"]);
  assert.deepEqual(fixture.attemptClassification.canonicalRouteFailures, []);

  const articleParagraphs = [
    "The headline story in the news section is about the Index of Leading Economic Indicators, which are up a stunning 9.7% over last month, yet another indication of the economy's robust performance. Related stories discuss the unemployment rate, which is at the lowest level in almost thirty years, and commercial and housing construction, which are at an all-time high.",
    "Another major story covers President Ryder's speech for the Distinguished Lecturer Series of the Border Security Force Academy. In his address, the President called the '40s a \"decade of new hope,\" and attributed much of that new hope to the work of the BSF, sending a signal to the entire world that the USNA \"won't be pushed around by the biggest dictatorship or the smallest band of terrorist murderers.\"",
    "On one of the inside pages, an in-depth report on crime reveals that, although the overall crime rate has dropped only 4% over the last decade, public perception is that crime has fallen much further. The report attributes this perception to three points: Violent crime has decreased much faster than other types of crime, and is down by 15% from ten years ago. Crime in the schools, which has always gotten the most publicity, has dropped by 40%. Most importantly, offenders are getting harsher sentences, as opposed to the old days of getting off on technicalities, low bail, and easy parole.",
    "Other stories in the news section deal with the construction of a new InfoTech orbiting factory, deregulation of the medicinal drug industry, the war in Turkey, and plans for a lunar mining operation. An editorial calls for lowering draft board requirements in order to ease prison overcrowding.",
  ];
  const japaneseArticleParagraphs = [
    "ニュース欄のトップ記事は景気先行指数を取り上げている。前月比で驚異の9.7%上昇し、経済の力強い成長をまたしても裏づけたという。関連記事では、失業率が約30年ぶりの低水準にあることや、商業施設と住宅の建設が史上最高水準に達していることが報じられている。",
    "別の主要記事は、国境警備隊アカデミーの著名講師シリーズで行われたライダー大統領の講演を伝えている。演説で大統領は40年代を「新たな希望の10年」と呼び、その希望の多くはBSFの働きによるものだと述べた。さらに大統領は、USNAが「最大の独裁国家にも、テロリストの殺人集団の最小の一派にも、言いなりにはならない」という姿勢を全世界に示した。",
    "中面の一つには犯罪に関する詳細な報告があり、過去10年間で犯罪率全体はわずか4%しか低下していないにもかかわらず、世間では犯罪がそれ以上に大幅に減ったと受け止められていることを明らかにしている。報告は、この認識を三つの点に帰している。暴力犯罪はほかの種類の犯罪よりはるかに速く減少し、10年前より15%低下した。常に最も大きく報道されてきた学校内犯罪は40%減少した。そして何より、かつてのように法手続き上の不備や低額の保釈金、容易な仮釈放によって放免されるのとは対照的に、犯罪者にはより厳しい刑が科されている。",
    "ニュース欄のほかの記事では、インフォテックの新たな軌道工場の建設、医薬品産業の規制緩和、トルコでの戦争、月面採掘事業の計画が取り上げられている。社説は、刑務所の過密を緩和するため、徴兵委員会の要件を緩和するよう求めている。",
  ];

  for (const session of fixture.sessions) {
    assert.deepEqual(session.observations.map(({ command }) => command), fixture.path);
    const newspaper = session.observations.slice(fixture.stableIdentity.courthousePath.length);
    assert.deepEqual(newspaper.map(({ status }) => status.location), [
      "Kennedy Park", "Kennedy Park", "Main & Kennedy", "Centre & Kennedy", "Bodanski Square", "Bodanski Square",
      "Bodanski Square", "Centre & Kennedy", "Main & Kennedy", "Kennedy Park", "Kennedy Park",
    ]);

    for (const observation of session.observations) {
      assert.equal(observation.presentation.version, 3);
      assert.equal(observation.presentation.terminalLine, observation.presentation.lines.length - 1);
      assert.deepEqual(observation.presentation.activeInput, {
        kind: "line", line: observation.presentation.terminalLine, classes: ["Input", "LineInput"],
      });
      assert.match(observation.status.date, /^\d{1,2}\/\d{1,2}\/2041$/);
      assert.equal(reconcilePresentationHistory([], observation.presentation).representable, true);
    }

    const inventory = newspaper.find(({ command }) => command === "INVENTORY");
    assert.deepEqual(inventory.presentation.lines.map(({ text }) => text), [
      ">INVENTORY", "You are carrying:", "   a key", "   a wallet", " ", ">",
    ]);
    const purchase = newspaper.find(({ command }) => command === "BUY NEWSPAPER");
    assert.match(purchase.presentation.lines[1].text, /NEW BALANCE: \$599/);
    const reading = newspaper.find(({ command }) => command === "READ NEWSPAPER");
    const readingLeaves = reading.presentation.lines.map(({ text }) => text);
    assert.deepEqual(readingLeaves, [
      ">READ NEWSPAPER",
      articleParagraphs[0], " ",
      articleParagraphs[1], " ",
      articleParagraphs[2], " ",
      articleParagraphs[3], " ",
      ">",
    ], "all four observed article paragraphs and their boundaries remain complete and ordered");
    const localizedReading = projectPresentationHistory(
      reconcilePresentationHistory([], reading.presentation).history,
      "ja",
    )[0].blocks;
    assert.deepEqual(
      localizedReading.filter(({ kind }) => kind === "prose").map(({ text }) => text),
      japaneseArticleParagraphs,
      "all approved article paragraphs are localized without changing their order",
    );
    assert.deepEqual(
      localizedReading.map(({ kind }) => kind),
      ["command", "prose", "spacer", "prose", "spacer", "prose", "spacer", "prose", "spacer"],
      "article paragraph and blank-line structure is preserved",
    );
    assert.equal(reading.status.mode, "Simulation Mode (recording)");
    assert.equal(newspaper.at(-1).status.mode, "Simulation Mode");
    assert.equal(newspaper.at(-1).status.location, "Kennedy Park");
    assert.deepEqual(newspaper.at(-1).presentation.lines.map(({ text }) => text), [
      ">RECORD OFF", "Record feature deactivated.", " ", ">",
    ]);
  }

  assert.notEqual(fixture.sessions[0].observations[0].status.date, fixture.sessions[1].observations[0].status.date);
  assert.match(fixture.attemptClassification.harnessFailures[0], /synchronization failures/);

  assert.equal(
    observedStoryLeafTranslation(`${articleParagraphs[0]} Unapproved variant`, "ja", "READ NEWSPAPER"),
    undefined,
    "unapproved article variants remain canonical English",
  );
  assert.equal(observedStoryLeafTranslation("Main & Kennedy", "ja", "LOOK"), undefined);
});

test("projects only the two accepted first-simulation structures and fails closed", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/parchment-first-simulation-runtime-observed.json", import.meta.url), "utf8"));
  const shell = await readFile(new URL("../app/PrismEdition.tsx", import.meta.url), "utf8");
  const bridge = await readFile(new URL("../public/player-bridge.js", import.meta.url), "utf8");
  const expectedAssignments = [
    "Eating a meal in a restaurant", "Talking to a government official", "Visiting a power-generating facility",
    "Reading a newspaper", "Riding some form of public transportation", "Attending a court in session",
    "Talking to a church official", "Going to a movie", "Visiting your own home or living quarters",
  ];

  for (const session of fixture.sessions) {
    const brief = session.observations.filter(({ command, role }) => command === "WAIT" && !role)[3].presentation;
    const blocks = assignmentBriefPresentation(brief, "ja");
    const list = blocks?.filter(({ kind }) => kind === "list");
    assert.equal(list?.length, 1);
    assert.deepEqual(list[0].items, [
      "レストランで食事をすること", "政府職員と話すこと", "発電施設を訪れること",
      "新聞を読むこと", "何らかの公共交通機関に乗ること", "開廷中の裁判を傍聴すること",
      "教会関係者と話すこと", "映画を見に行くこと", "自分の家、または居住区を訪れること",
    ]);
    assert.deepEqual(list[0].canonicalItems, expectedAssignments);
    assert.equal(list[0].sourceLines.length, 9);
    assert.match(blocks[list === undefined ? -1 : blocks.indexOf(list[0]) - 1].text, /記録すべき項目のリスト/);
    assert.match(blocks[blocks.indexOf(list[0]) + 1].text, /^なお、シミュレーション・コントローラー/);
    assert.ok(blocks.some(({ kind }) => kind === "spacer"), "surrounding blank-line boundaries survive");

    const noIndent = structuredClone(brief);
    for (const sourceLine of list[0].sourceLines) {
      noIndent.lines[sourceLine].text = noIndent.lines[sourceLine].text.trimStart();
      noIndent.lines[sourceLine].runs[0].text = noIndent.lines[sourceLine].runs[0].text.trimStart();
    }
    assert.equal(assignmentBriefPresentation(noIndent, "ja"), null, "raw three-space grouping is required");
    assert.equal(observedOrdinaryTurnPresentation(noIndent, "ja"), null, "unindented packet cannot partially localize");
    const fallback = reconcilePresentationHistory([], noIndent);
    assert.equal(fallback.representable, true, "unknown packet uses the canonical-English host fallback");
    const fallbackBlocks = projectPresentationHistory(fallback.history, "ja")[0].blocks;
    assert.deepEqual(fallbackBlocks.map(({ kind }) => kind), ["command", "prose"]);
    assert.match(fallbackBlocks[1].text, /Eating a meal in a restaurant[\s\S]*Visiting your own home or living quarters/);
    assert.equal(fallbackBlocks.some(({ kind }) => kind === "list"), false);

    for (const mutate of [
      (copy) => copy.lines.splice(list[0].sourceLines[4], 1),
      (copy) => copy.lines.splice(list[0].sourceLines[2], 2, copy.lines[list[0].sourceLines[3]], copy.lines[list[0].sourceLines[2]]),
      (copy) => copy.lines.splice(list[0].sourceLines.at(-1) + 1, 0, structuredClone(copy.lines[list[0].sourceLines.at(-1)])),
    ]) {
      const unknown = structuredClone(brief);
      mutate(unknown);
      unknown.terminalLine = unknown.lines.length - 1;
      unknown.activeInput.line = unknown.terminalLine;
      assert.equal(assignmentBriefPresentation(unknown, "ja"), null);
      assert.equal(observedOrdinaryTurnPresentation(unknown, "ja"), null, "unknown packet cannot partially localize");
    }

    const challenge = session.observations.find(({ command }) => command === "ENTER SIMULATION MODE").presentation;
    const security = securityPromptPresentation(challenge, "ja");
    assert.deepEqual(security?.map(({ kind }) => kind), ["command", "security-prompt"]);
    assert.equal(security[1].text, "シミュレーション・モードはクラス1セキュリティ・モードです。アクセスするには、次に対応するセキュリティ・コードを入力してください：");
    assert.equal(security[1].canonicalText, fixture.stableIdentity.securityShell);
    assert.match(security[1].securityChallenge.color, /^[A-Z ]+$/);
    assert.equal(Number.isInteger(security[1].securityChallenge.innerNumber), true);
    assert.equal("answer" in security[1], false, "story projection has no outer-answer field");
    assert.doesNotMatch(JSON.stringify(security), /\b(?:51|43)\b/, "observed derived answers do not enter story output");

    const unknownColor = structuredClone(challenge);
    const colorRun = unknownColor.lines[1].runs.find((run) => /RED|ORANGE/.test(run.text));
    assert.ok(colorRun);
    colorRun.text = "ULTRAVIOLET ";
    assert.equal(securityPromptPresentation(unknownColor, "ja"), null);
    assert.equal(observedOrdinaryTurnPresentation(unknownColor, "ja"), null);
    const completed = structuredClone(challenge);
    completed.lines[1].runs[completed.lines[1].runs.length - 1] = { text: "51", classes: ["Style_input"], tag: "span" };
    assert.equal(securityPromptPresentation(completed, "ja"), null, "submitted outer answer is never projected");

    const rollingChallenge = structuredClone(challenge);
    rollingChallenge.lines = [...structuredClone(brief.lines.slice(0, -1)), ...rollingChallenge.lines];
    rollingChallenge.terminalLine = rollingChallenge.lines.length - 1;
    rollingChallenge.activeInput.line = rollingChallenge.terminalLine;
    const rollingBlocks = storyPresentation(rollingChallenge, "ja");
    assert.deepEqual(rollingBlocks?.map(({ kind }) => kind), ["command", "security-prompt"]);
    assert.equal(rollingBlocks?.[1].securityChallenge.color, security[1].securityChallenge.color);
    assert.equal(assignmentBriefPresentation(rollingChallenge, "ja"), null, "stale WAIT packet cannot supersede the latest ENTER turn");

    const projectedRoute = session.observations.map((observation) => ({
      role: observation.role ?? observation.command,
      blocks: storyPresentation(observation.presentation, "ja"),
    }));
    assert.ok(projectedRoute.every(({ blocks }) => blocks), "every approved route turn has a Japanese projection");
    const securityAnswer = projectedRoute.find(({ role }) => role === "security-answer").blocks;
    assert.equal(securityAnswer[0].text, session.observations.find(({ role }) => role === "security-answer").command, "numeric canonical input remains the English command echo");
    assert.equal(securityAnswer.find(({ canonicalText }) => canonicalText === "This simulation is based 10 years hence.").text, "このシミュレーションの時代設定は、10年後です。");
    assert.equal(securityAnswer.find(({ canonicalText }) => canonicalText === "Kennedy Park").text, "ケネディ公園");
    assert.equal(projectedRoute.find(({ role }) => role === "RECORD").blocks[1].text, "記録機能を起動しました。");
    assert.equal(projectedRoute.find(({ role }) => role === "RECORD OFF").blocks[1].text, "記録機能を停止しました。");
  }

  assert.match(shell, /block\.kind === "security-prompt"[\s\S]*securityChallenge\?\.color[\s\S]*securityChallenge\?\.innerNumber/);
  assert.match(shell, /assistedSecurity && securityChallenge[\s\S]*コード <strong>\{securityChallenge\.answer\}<\/strong> を送信/);
  assert.match(shell, /const assisted = interactionLevel !== "classic"/);
  assert.match(bridge, /inner\?\.setAttribute\("aria-hidden", "true"\)[\s\S]*inner\?\.setAttribute\("inert", ""\)/);
  assert.doesNotMatch(shell.slice(shell.indexOf('block.kind === "security-prompt"'), shell.indexOf(': block.kind === "command"')), /\.answer/);
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

test("projects the runtime-observed PEOF office scene through exact leaf identity", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/parchment-peof-runtime-observed.json", import.meta.url), "utf8"));
  assert.match(fixture.provenance, /Runtime-observed with Playwright against canonical Release 79/);
  const presentation = fixture.presentation;
  const blocks = observedOrdinaryTurnPresentation(presentation, "ja");

  assert.deepEqual(blocks?.map((block) => block.kind), ["command", "title", "prose", "prose", "spacer"]);
  assert.equal(blocks?.[0].text, "PEOF");
  assert.equal(blocks?.[0].canonicalText, "PEOF");
  assert.equal(blocks?.[1].canonicalText, "Dr. Perelman's Office");
  assert.equal(blocks?.[1].text, "ペレルマン博士のオフィス");
  assert.match(blocks?.[2].text ?? "", /エイブラハム・ペレルマン博士/);
  assert.equal(blocks?.[3].text, "ペレルマン博士は机に向かい、仕事をしている。");
  assert.equal(blocks?.[4].sourceLines[0], presentation.terminalLine - 1);
  assert.equal(observedOrdinaryTurnPresentation(presentation, "en"), null);

  const unrelatedTurn = structuredClone(presentation);
  const commandLine = unrelatedTurn.lines.find((line) => /^>PEOF/i.test(line.text));
  commandLine.text = commandLine.text.replace(/PEOF/i, "SCORE");
  commandLine.runs.at(-1).text = "SCORE";
  assert.equal(
    observedOrdinaryTurnPresentation(unrelatedTurn, "ja"),
    null,
    "PEOF leaves do not acquire translations or title semantics outside the observed command context",
  );

  const untranslated = structuredClone(presentation);
  untranslated.lines[presentation.terminalLine - 2].text = "An adjacent untranslated canonical leaf.";
  untranslated.lines[presentation.terminalLine - 2].runs[0].text = "An adjacent untranslated canonical leaf.";
  const fallbackBlocks = observedOrdinaryTurnPresentation(untranslated, "ja");
  assert.equal(fallbackBlocks?.[3].text, "An adjacent untranslated canonical leaf.");
  assert.equal(fallbackBlocks?.[3].canonicalText, "An adjacent untranslated canonical leaf.");
});
