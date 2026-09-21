import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { companionHeaderLanguage, localizeOutletLabel, localizeSceneActionLabel, localizeSceneObjectName, packageInteractiveLocale, sceneActionsLocale, sceneActionUiText, uiText, localizeStoryContent, localizeStoryLeaves, localizeStoryTranscript, observedStoryLeafTranslation } from "../app/localization.ts";
import { initialLineTurnPresentation, observedOrdinaryTurnPresentation, openingPresentation } from "../app/story-presentation.ts";
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
  assert.match(shell, /uiText\(locale, "shareEdition"\)/);
  assert.match(shell, /resetWrapperForStory[\s\S]*setCommand\(""\)[\s\S]*setAliasNotice\(null\)[\s\S]*setMapDestinationId\(null\)/);
  assert.match(shell, /Begin the requested observations/);
  assert.match(shell, /Perelman’s brief · nine requested observations/);
  assert.match(shell, /\["wait for 28 minutes", "wait"\]/);
  assert.match(shell, /Turn the wheel to align the color and inner number/);
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
  for (const className of ["library-section", "systems-section", "map-section", "evidence-section", "debug-section"]) {
    assert.match(shell, new RegExp(`className="companion-section ${className}" lang="en"`));
  }
  assert.match(shell, /className="debug-entry" lang="en"/);
  assert.match(shell, /openingOrCommunications \? <span lang=\{locale\}>[\s\S]*: <span lang="en">\{mode\}/);
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "signal"), "ja");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "comparative"), "en");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "comparative", true), "ja");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "witness"), "en");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "lockdown"), "en");
  assert.equal(companionHeaderLanguage("ja", "Communications Mode", "epilogue"), "en");
  assert.equal(companionHeaderLanguage("ja", "Simulation Mode", "field"), "en");
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

test("keeps both later-scene SceneActions shells and language boundaries in English", async () => {
  const tools = await readFile(new URL("../app/StoryTools.tsx", import.meta.url), "utf8");
  assert.match(tools, /const displayLocale = sceneActionsLocale\(locale, roomId\)/);
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
    assert.deepEqual(briefLines.slice(assignmentStart, assignmentStart + assignments.length).map((text) => text.trim()), assignments);
    assert.match(briefLines[assignmentStart - 1], /list of things to record:$/);
    assert.match(briefLines[assignmentStart + assignments.length], /^By the way, since the Simulation Controller/);
    assert.match(briefLines.join("\n"), /walks to a point beyond your field of vision[\s\S]*walks back into your field of vision/);

    const challenge = observations.find(({ command }) => command === "ENTER SIMULATION MODE");
    assert.deepEqual(challenge.status, { mode: "Simulation Mode", time: "7:35pm", location: "(undefined)", date: "3/16/2031" });
    assert.equal(challenge.presentation.activeInput.line, 1, "security prompt and active input share one line");
    const prompt = challenge.presentation.lines[1].text.replace(/\s+/g, " ").trim();
    const dynamic = prompt.match(/Security Code corresponding to: ([A-Z ]+) (\d+) >$/);
    assert.ok(dynamic, "security shell retains a dynamic color and inner number");
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
