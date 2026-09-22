export type Locale = "en" | "ja";

const UI = {
  en: {
    language: "Language",
    companion: "Companion",
    package: "Package",
    settings: "Settings",
    share: "Share",
    fullscreen: "Fullscreen",
    opening: "Opening the complete story…",
    storyControls: "Story controls",
    command: "Respond to the story",
    commandPlaceholder: "Type a command…",
    send: "SEND",
    continue: "Continue",
    pressAnyKey: "Press any key →",
    toggleCompanion: "Toggle companion",
    openPackage: "Open original package materials",
    readingSettings: "Reading and play settings",
    shareEdition: "Share this edition",
    toggleFullscreen: "Toggle fullscreen",
    playControls: "Play controls",
    classic: "Classic",
    guided: "Guided",
    actionMenus: "Action menus",
    classicDescription: "Text commands and the story’s own prompts.",
    guidedDescription: "Navigation and one editable suggestion for useful things.",
    actionMenusDescription: "Direct actions for useful people and objects.",
    textSize: "Text size",
    monospacedText: "Monospaced story text",
    highContrast: "High contrast",
    reduceMotion: "Reduce motion",
    simulationCommand: "What will you do?",
    issueCommand: "Issue a command",
    simulationPlaceholder: "Type anything, or use the scene controls below…",
    libraryPlaceholder: "Use the menu buttons…",
    commonActions: "Common actions",
    communicationOutlets: "Communication outlets",
    refreshOutlets: "Refresh list",
    look: "Look",
    displayOutlets: "Display outlets",
    commandHistoryHelp: "↑ recalls your previous commands.",
    shorterNounHelp: "Try a shorter noun or a different verb.",
    shorterCommandHelp: "Try a shorter command, or choose a word mentioned below.",
    specificNounHelp: "Use a more specific noun.",
    exactObjectHelp: "Choose the exact person or object mentioned below.",
    absentObjectHelp: "That is not present now. LOOK repeats your surroundings.",
    understoodAs: "Understood as: {command}",
    draftedFromPassage: "Drafted from a word in the passage. Edit it or press Send.",
    routeDrafted: "Route to {destination}: edit this step or press Send.",
    shared: "Shared",
    linkCopied: "Link copied",
    linkCopyFailed: "Couldn’t copy the link",
    introKicker: "THE COMPLETE 1985 INTERACTIVE NOVEL · RELEASE 79",
    introLede: "Read closely. Wander. Talk to people. Notice the ordinary things.",
    introRead: "Read",
    introReadDescription: "Names and small details matter.",
    introExplore: "Explore",
    introExploreDescription: "People, places, and objects are interactive.",
    introRemember: "Remember",
    introRememberDescription: "Keep what you think matters.",
    introPlayStyle: "How would you like to play?",
    introClassicDescription: "The original command line.",
    introGuidedDescription: "Clickable navigation and editable hints.",
    introActionMenusDescription: "Direct actions for useful scene details.",
    introBegin: "Begin",
    introReturn: "Return to story",
    introOpenPackage: "Open the original package",
    introContentNote: "Historical content note",
    introContentWarning: "The unaltered 1985 text includes depictions and language involving authoritarianism, poverty, racism, religious extremism, suicide, and violence.",
    introCredits: "Written by Steve Meretzky · Original release by Infocom · Interpreter by Parchment",
    companionAssist: "Assist",
    companionSignals: "Signals",
    companionAbout: "About",
    incoming: "Incoming",
    openingTransmission: "Opening transmission",
    carrierLocked: "Carrier locked",
    storyReady: "Story is ready for input",
    storyProcessing: "Story is processing",
    readerCompanion: "Reader companion",
    companionViews: "Companion views",
    closeCompanion: "Close companion",
    help: "Help",
    openingGuideHeading: "Incoming transmission",
    openingGuideCopy: "Read the message. When the prompt appears, LOOK repeats your surroundings and HELP lists useful commands.",
    choosePlayControls: "Choose play controls",
    guideClassicDescription: "Type every command.",
    guideGuidedDescription: "Navigation plus one editable suggestion.",
    notice: "NOTICE",
    act: "ACT",
    classicCallout: "The command line is yours. No navigation or scene suggestions are shown.",
    guidedCallout: "Navigation is clickable. A useful scene detail drafts one likely command, but does not act until you press Send.",
    actionMenusCallout: "Navigation and useful actions are clickable. The original map can plot a walking route.",
    lookInventoryHelp: "LOOK repeats your surroundings; INVENTORY lists what you carry.",
    storySafeHelp: "Read widely, try odd ideas, and keep what strikes you.",
    interactiveFictionHelp: "I’m new to interactive fiction",
    interactiveFictionHelpCopy: "Commands usually take the form VERB + NOUN: READ SIGN, OPEN DOOR, or ASK A PERSON ABOUT A SUBJECT. Compass directions move you. You can abbreviate them to N, SW, U, and so on.",
    stuckHelp: "I seem to be stuck",
    stuckHelpCopy: "Try LOOK, HELP, WAIT, another outlet, or a person or object in the scene. Save before experimenting if you want an easy way back.",
    communications: "Communications",
    communicationsGuideCopy: "Choose an outlet to see and hear that location. DISPLAY OUTLETS repeats the current directory.",
    noDirectory: "No directory loaded",
    outletDirectory: "Outlet directory",
    outletGuide: "Select a location to connect its visual and audio circuits.",
    outletEmptyGuide: "DISPLAY OUTLETS requests the current directory.",
    connected: "Connected",
    connect: "Connect →",
    displayActiveOutlets: "Display active outlets",
    storyOpeningAnnouncement: "Story opening.",
    communicationsAnnouncement: "Communications Mode.",
    openingContextCopy: "Read the opening message, then continue at the prompt.",
    originalBoxContents: "Original box contents",
    packageHeading: "Map, decoder & manual",
    packageCopy: "These were part of AMFV in 1985. Keep them beside the story just as the first players did.",
    rockvilMap: "Rockvil map",
    streetMap2031: "Street map · 2031",
    securityDecoder: "Security decoder",
    classOneWheel: "Class One access wheel",
    dakotaManual: "Dakota Online & manual",
    originalScannedPdf: "Original scanned PDF",
    aboutCopy: "Written by Steve Meretzky and published by Infocom in 1985. This reader runs the complete Release 79 story in Parchment.",
    aboutParserCopy: "The buttons, maps, and forms send ordinary commands to the same original parser. You can ignore them and type at any time.",
    criticalContext: "Critical context · light thematic spoilers",
    criticalContextCopy: "The work explores memory, evidence, political promises, and what interactivity can make us feel rather than merely tell us.",
    story: "Story",
    releaseDate: "Release 79 · 22 Nov 1985",
    runtime: "Runtime",
    integrity: "Integrity",
    source: "Source",
    preservedZil: "Preserved ZIL, included in full",
    historicalSource: "View the historical source ↗",
    parchmentAbout: "About the Parchment interpreter ↗",
    copyrightNote: "A Mind Forever Voyaging © 1985 Infocom, Inc. Package scans are credited in the Package panel.",
    packageDialogKicker: "In the original box",
    packageDialogTitle: "AMFV package",
    closePackageMaterials: "Close package materials",
    packageMaterials: "Package materials",
    magazineManual: "Magazine & manual",
    packageMapAlt: "Original 1985 promotional street map of downtown Rockvil, South Dakota, with landmarks and a visitor guide",
    packageMapCaption: "The 2031 street map supplied with the original game. Zoom your browser or open the image directly for fine print.",
    openFullSize: "Open full size ↗",
    packageDecoderAlt: "Original PRISM Project Facility Class One Security Mode Access Decoder wheel",
    packageDecoderCaption: "The physical decoder supplied in 1985. When the game requests a code, the command deck also offers an accessible digital equivalent.",
    packageManualHeading: "Dakota Online · April 2031",
    packageManualDescription: "The original magazine, short story, advertising, and instruction manual are preserved together in this scan.",
    readOriginalPdf: "Read the original PDF ↗",
    packageAttributionPrefix: "Scans preserved by",
    packageAttributionAnd: "and",
    packageAttributionSuffix: ".",
    storyContext: "Story context",
    openTitleInformation: "Open title and edition information",
    editionSubtitle: "INTERACTIVE NOVEL · RELEASE 79",
    communicationChannel: "COMMUNICATION CHANNEL",
    prismOnlineCaption: "PRISM / ONLINE",
    carrier: "Carrier",
    receiving: "Receiving",
    designation: "Designation",
    communicationsActive: "Communications active",
    cognitiveSystemOnline: "Cognitive system online",
    currentMode: "Current mode",
    releaseSerial: "RELEASE 79 · SERIAL 851122",
    aboutRelease: "About this release",
    skipInteractionControls: "Skip to interaction controls",
    interactiveStory: "Interactive story",
    prismOnline: "PRISM online",
    projectDate2031: "Project date · 2031",
    initializing: "INITIALIZING",
    keyRequested: "KEY REQUESTED",
    awaitingInput: "AWAITING INPUT",
    processing: "PROCESSING",
    canonicalStoryTitle: "A Mind Forever Voyaging — canonical Release 79 story",
    currentGamePrompt: "Current game prompt",
    answerQuestion: "Answer the question",
    answer: "Answer",
    yes: "Yes",
    no: "No",
    openLibrary: "Open library",
    inspectInterfaces: "Inspect interfaces",
  },
  ja: {
    language: "言語",
    companion: "ガイド",
    package: "付属資料",
    settings: "設定",
    share: "共有",
    fullscreen: "全画面",
    opening: "完全版ストーリーを起動中…",
    storyControls: "ストーリー操作",
    command: "物語に応答する",
    commandPlaceholder: "英語でコマンドを入力…",
    send: "送信",
    continue: "続ける",
    pressAnyKey: "いずれかのキーを押す →",
    toggleCompanion: "ガイドの表示を切り替える",
    openPackage: "オリジナルの付属資料を開く",
    readingSettings: "読書とプレイの設定",
    shareEdition: "このエディションを共有",
    toggleFullscreen: "全画面表示を切り替える",
    playControls: "プレイ操作",
    classic: "クラシック",
    guided: "ガイド付き",
    actionMenus: "アクションメニュー",
    classicDescription: "テキストコマンドと原作のプロンプトで操作します。",
    guidedDescription: "移動操作と、便利な対象への編集可能な提案を1つ表示します。",
    actionMenusDescription: "人物や物に対する便利なアクションを直接選べます。",
    textSize: "文字サイズ",
    monospacedText: "ストーリーを等幅フォントで表示",
    highContrast: "ハイコントラスト",
    reduceMotion: "アニメーションを減らす",
    simulationCommand: "どう行動しますか？",
    issueCommand: "コマンドを入力",
    simulationPlaceholder: "英語で入力するか、下のシーン操作を使用…",
    libraryPlaceholder: "メニューボタンを使用…",
    commonActions: "よく使うアクション",
    communicationOutlets: "通信アウトレット",
    refreshOutlets: "一覧を更新",
    look: "周囲を見る",
    displayOutlets: "アウトレット一覧",
    commandHistoryHelp: "↑ で以前のコマンドを呼び出せます。",
    shorterNounHelp: "より短い名詞か別の動詞を試してください。",
    shorterCommandHelp: "より短いコマンドを試すか、下に表示された言葉を選んでください。",
    specificNounHelp: "より具体的な名詞を使ってください。",
    exactObjectHelp: "下に表示された人物または物を正確に選んでください。",
    absentObjectHelp: "それは現在ここにありません。LOOK で周囲を再表示できます。",
    understoodAs: "{command} として受け付けました",
    draftedFromPassage: "本文の言葉から下書きしました。編集するか、送信を押してください。",
    routeDrafted: "{destination} への経路：この手順を編集するか、送信を押してください。",
    shared: "共有しました",
    linkCopied: "リンクをコピーしました",
    linkCopyFailed: "リンクをコピーできませんでした",
    introKicker: "完全収録・1985年のインタラクティブ小説 · Release 79",
    introLede: "よく読み、歩き回り、人と話し、ありふれたものに目を留めてください。",
    introRead: "読む",
    introReadDescription: "名前や細かな点も重要です。",
    introExplore: "探索する",
    introExploreDescription: "人、場所、物と関わることができます。",
    introRemember: "覚えておく",
    introRememberDescription: "大切だと思うことを覚えておいてください。",
    introPlayStyle: "どのようにプレイしますか？",
    introClassicDescription: "原作どおりのコマンド入力です。",
    introGuidedDescription: "クリック可能な移動操作と、編集できるヒントを表示します。",
    introActionMenusDescription: "場面内の有用な対象に直接アクションできます。",
    introBegin: "始める",
    introReturn: "物語に戻る",
    introOpenPackage: "オリジナル版の付属資料を開く",
    introContentNote: "歴史的内容に関する注意",
    introContentWarning: "改変していない1985年の本文には、権威主義、貧困、人種差別、宗教的過激主義、自殺、暴力に関する描写と言葉が含まれます。",
    introCredits: "著：Steve Meretzky · オリジナル版：Infocom · インタープリター：Parchment",
    companionAssist: "ガイド",
    companionSignals: "通信",
    companionAbout: "この作品について",
    incoming: "受信中",
    openingTransmission: "開始メッセージ",
    carrierLocked: "信号を捕捉",
    storyReady: "物語は入力を受け付けています",
    storyProcessing: "物語を処理中です",
    readerCompanion: "読者ガイド",
    companionViews: "ガイドの表示",
    closeCompanion: "ガイドを閉じる",
    help: "ヘルプ",
    openingGuideHeading: "受信中の通信",
    openingGuideCopy: "メッセージを読んでください。入力待ちになったら、LOOK で周囲を再表示し、HELP で役立つコマンドを確認できます。",
    choosePlayControls: "プレイ操作を選ぶ",
    guideClassicDescription: "すべてのコマンドを入力します。",
    guideGuidedDescription: "移動操作と、編集できる提案を1つ表示します。",
    notice: "気づく",
    act: "行動する",
    classicCallout: "コマンドはすべて自分で入力します。移動操作や場面の提案は表示されません。",
    guidedCallout: "移動操作はクリックできます。場面内の有用な対象を選ぶと、使えそうなコマンドを1つ下書きしますが、送信を押すまで実行されません。",
    actionMenusCallout: "移動操作と有用なアクションをクリックできます。オリジナルの地図では徒歩経路も表示できます。",
    lookInventoryHelp: "LOOK で周囲を再表示し、INVENTORY で所持品を一覧表示します。",
    storySafeHelp: "幅広く読み、思いついたことを試し、心に残ったことを覚えておいてください。",
    interactiveFictionHelp: "インタラクティブ・フィクションは初めてです",
    interactiveFictionHelpCopy: "コマンドは通常、VERB + NOUN の形です。たとえば READ SIGN、OPEN DOOR、ASK A PERSON ABOUT A SUBJECT のように入力します。方角で移動でき、N、SW、U などに省略できます。",
    stuckHelp: "行き詰まったようです",
    stuckHelpCopy: "LOOK、HELP、WAIT、別のアウトレット、場面内の人物や物を試してください。戻りやすくしたいなら、試す前にセーブしてください。",
    communications: "通信",
    communicationsGuideCopy: "アウトレットを選ぶと、その場所の映像と音声に接続します。DISPLAY OUTLETS で現在の一覧を再表示します。",
    noDirectory: "一覧はまだ読み込まれていません",
    outletDirectory: "アウトレット一覧",
    outletGuide: "場所を選ぶと、その映像回線と音声回線に接続します。",
    outletEmptyGuide: "DISPLAY OUTLETS で現在の一覧を呼び出します。",
    connected: "接続済み",
    connect: "接続 →",
    displayActiveOutlets: "利用可能なアウトレットを表示",
    storyOpeningAnnouncement: "物語を開始しています。",
    communicationsAnnouncement: "通信モード。",
    openingContextCopy: "開始メッセージを読んだら、入力待ちになった時点で続けてください。",
    originalBoxContents: "オリジナル版の同梱物",
    packageHeading: "地図、デコーダー、マニュアル",
    packageCopy: "これらは1985年の AMFV に同梱されていました。最初のプレイヤーたちと同じように、物語のそばに置いてください。",
    rockvilMap: "ロックヴィル地図",
    streetMap2031: "市街地図 · 2031",
    securityDecoder: "セキュリティ・デコーダー",
    classOneWheel: "クラス1アクセス用ホイール",
    dakotaManual: "Dakota Online とマニュアル",
    originalScannedPdf: "オリジナルのスキャンPDF",
    aboutCopy: "Steve Meretzky が執筆し、Infocom が1985年に発売しました。このリーダーでは、Release 79 の全編を Parchment 上で実行します。",
    aboutParserCopy: "ボタン、地図、フォームは、いずれも同じオリジナルのパーサーに通常のコマンドを送ります。これらは使わず、いつでも直接入力できます。",
    criticalContext: "作品理解のための背景 · テーマに関する軽いネタバレあり",
    criticalContextCopy: "この作品は、記憶、証拠、政治的な約束、そしてインタラクティブな表現が、単に物語を伝えるだけでなく、私たちに何を感じさせうるかを探究しています。",
    story: "物語",
    releaseDate: "Release 79 · 1985年11月22日",
    runtime: "実行環境",
    integrity: "完全性",
    source: "ソース",
    preservedZil: "保存された ZIL を完全収録",
    historicalSource: "歴史的ソースを見る ↗",
    parchmentAbout: "Parchment インタープリターについて ↗",
    copyrightNote: "A Mind Forever Voyaging © 1985 Infocom, Inc. 付属資料のスキャンは「付属資料」パネルでクレジットしています。",
    packageDialogKicker: "オリジナル版の箱に同梱",
    packageDialogTitle: "AMFV 付属資料",
    closePackageMaterials: "付属資料を閉じる",
    packageMaterials: "付属資料",
    magazineManual: "雑誌とマニュアル",
    packageMapAlt: "ランドマークと案内情報を掲載した、サウスダコタ州ロックヴィル中心街の1985年オリジナル販促用街路地図",
    packageMapCaption: "原作ゲームに同梱された2031年の街路地図です。細かい文字は、ブラウザを拡大するか画像を直接開いて確認してください。",
    openFullSize: "原寸で開く ↗",
    packageDecoderAlt: "オリジナルの PRISM Project Facility クラス1セキュリティモード用アクセス・デコーダー・ホイール",
    packageDecoderCaption: "1985年に同梱された実物のデコーダーです。ゲームがコードを求めるときは、コマンド操作部にもアクセシビリティ対応のデジタル版が表示されます。",
    packageManualHeading: "Dakota Online · 2031年4月",
    packageManualDescription: "オリジナルの雑誌、短編小説、広告、操作マニュアルを、このスキャンにまとめて収録しています。",
    readOriginalPdf: "オリジナルPDFを読む ↗",
    packageAttributionPrefix: "スキャン資料は",
    packageAttributionAnd: "および",
    packageAttributionSuffix: " により保存されています。",
    storyContext: "作品情報",
    openTitleInformation: "作品名と版の情報を開く",
    editionSubtitle: "インタラクティブ小説 · Release 79",
    communicationChannel: "通信チャンネル",
    prismOnlineCaption: "PRISM / オンライン",
    carrier: "搬送波",
    receiving: "受信中",
    designation: "識別名",
    communicationsActive: "通信機能稼働中",
    cognitiveSystemOnline: "認知システム稼働中",
    currentMode: "現在のモード",
    releaseSerial: "RELEASE 79 · SERIAL 851122",
    aboutRelease: "この版について",
    skipInteractionControls: "ストーリー操作へスキップ",
    interactiveStory: "インタラクティブな物語",
    prismOnline: "PRISM オンライン",
    projectDate2031: "計画年 · 2031",
    initializing: "初期化中",
    keyRequested: "キー入力待機中",
    awaitingInput: "入力待機中",
    processing: "処理中",
    canonicalStoryTitle: "A Mind Forever Voyaging — オリジナル版 Release 79",
    currentGamePrompt: "現在のゲームプロンプト",
    answerQuestion: "質問に答える",
    answer: "回答",
    yes: "はい",
    no: "いいえ",
    openLibrary: "ライブラリを開く",
    inspectInterfaces: "インターフェースを確認",
  },
} as const;

export type UiKey = keyof typeof UI.en;
export const uiText = (locale: Locale, key: UiKey) => UI[locale][key];
export const packageInteractiveLocale = (locale: Locale, interactiveMap: boolean): Locale => interactiveMap ? "en" : locale;

const SCENE_ACTION_UI = {
  en: {
    guidedLandmark: "Words mentioned here",
    guidedHeading: "Worth trying",
    guidedInstruction: "Choose one to draft a command",
    actionsLandmark: "Actions for things mentioned here",
    actionsHeading: "In this scene",
    actionsInstruction: "Actions written into the original story",
  },
  ja: {
    guidedLandmark: "この場面で言及された語",
    guidedHeading: "試してみる",
    guidedInstruction: "選ぶとコマンドを下書きします",
    actionsLandmark: "この場面で言及された対象へのアクション",
    actionsHeading: "この場面で",
    actionsInstruction: "原作に用意されたアクション",
  },
} as const;

export type SceneActionUiKey = keyof typeof SCENE_ACTION_UI.en;
export const sceneActionUiText = (locale: Locale, key: SceneActionUiKey) => SCENE_ACTION_UI[locale][key];
export const sceneActionsLocale = (locale: Locale, roomId: string | null | undefined): Locale => roomId === "OFFICE" ? locale : "en";

type PeofSceneObjectId = "PERELMAN" | "DESK" | "PERELMAN-DESK" | "DECODER" | "MAP" | "PEN" | "MAGAZINE-ARTICLE";
type PeofSceneActionId = "talk" | "examine" | "read" | "look-inside";

const PEOF_SCENE_OBJECT_NAMES: Readonly<Record<PeofSceneObjectId, string>> = {
  PERELMAN: "ペレルマン博士",
  DESK: "机",
  "PERELMAN-DESK": "机",
  DECODER: "デコーダー",
  MAP: "地図",
  PEN: "ペン",
  "MAGAZINE-ARTICLE": "雑誌記事",
};

const PEOF_SCENE_ACTION_LABELS: Readonly<Record<PeofSceneActionId, string>> = {
  talk: "話す",
  examine: "調べる",
  read: "読む",
  "look-inside": "中をのぞく",
};

const isPeofSceneObject = (objectId: string): objectId is PeofSceneObjectId => objectId in PEOF_SCENE_OBJECT_NAMES;
const isPeofSceneAction = (actionId: string): actionId is PeofSceneActionId => actionId in PEOF_SCENE_ACTION_LABELS;

export const localizeSceneObjectName = (locale: Locale, roomId: string | null | undefined, objectId: string, canonicalName: string) =>
  locale === "ja" && roomId === "OFFICE" && isPeofSceneObject(objectId) ? PEOF_SCENE_OBJECT_NAMES[objectId] : canonicalName;

export const localizeSceneActionLabel = (locale: Locale, roomId: string | null | undefined, objectId: string, actionId: string, canonicalLabel: string) =>
  locale === "ja" && roomId === "OFFICE" && isPeofSceneObject(objectId) && isPeofSceneAction(actionId)
    ? PEOF_SCENE_ACTION_LABELS[actionId]
    : canonicalLabel;

const ENGLISH_PHASE_TITLES = new Set(["origin", "comparative", "witness", "lockdown", "epilogue"]);

// Later-phase headings remain English even when the canonical interpreter has
// returned to Communications Mode. The visible branch, not the mode alone,
// determines the language inherited by assistive technology.
export const companionHeaderLanguage = (
  locale: Locale,
  mode: string | null,
  phase: string,
  hasLocalizedCurrentPlace = false,
): Locale => {
  // The rendered heading chooses currentPlace before every phase-owned title,
  // so its localized outlet name must win here in the same order.
  if (hasLocalizedCurrentPlace) return locale;
  return ENGLISH_PHASE_TITLES.has(phase) || (mode !== null && mode !== "Communications Mode") ? "en" : locale;
};

const OUTLET_LABELS: Partial<Record<Locale, Readonly<Record<string, string>>>> = {
  ja: {
    PPCC: "PRISMプロジェクト管制センター",
    RCRO: "屋上",
    PEOF: "ペレルマン博士のオフィス",
    PCAF: "カフェテリア",
    MACO: "メインコンピューター・コア",
    WNNF: "WNNフィード",
  },
};

export const localizeOutletLabel = (locale: Locale, code: string, canonicalLabel: string) =>
  OUTLET_LABELS[locale]?.[code.toUpperCase()] ?? canonicalLabel;

// Intentionally tiny and exact: this PoC only presents deterministic translations
// of the canonical opening. Anything not listed remains verbatim English.
const OPENING_TRANSLATIONS: ReadonlyArray<readonly [string | RegExp, string]> = [
  [/"Tomorrow never yet[ \t]*\r?\n[ \t]*On any human being rose or set\."/, "「明日という日はまだ、\nいかなる人間の上にも昇らず、沈みもしなかった。」"],
  ["[Hit any key to continue.]", "［いずれかのキーを押して続けてください。］"],
  ["Infocom interactive fiction - a science fiction story", "Infocom インタラクティブ・フィクション ― SFストーリー"],
  ["Copyright (c) 1985 by Infocom, Inc. All rights reserved.", "Copyright (c) 1985 Infocom, Inc. All rights reserved.（著作権表示）"],
];

export const localizeStoryTranscript = (rawEnglish: string, locale: Locale) => {
  if (locale === "en") return rawEnglish;
  return OPENING_TRANSLATIONS.reduce(
    (presented, [english, japanese]) => presented.replace(english, japanese),
    rawEnglish,
  );
};

export type StoryContentId =
  | "part1.initial.incoming-message"
  | "part1.initial.release"
  | "part1.initial.communications"
  | "part1.initial.outlets"
  | "part1.communications.inventory-empty"
  | "part1.communications.peof.title"
  | "part1.communications.peof.description"
  | "part1.communications.peof.perelman-working"
  | "part1.communications.peof.desk-description"
  | "part1.communications.peof.perelman-description"
  | "part1.communications.peof.decoder-package-note"
  | "part1.communications.peof.map-package-note"
  | "part1.communications.peof.pen-package-note"
  | "part1.communications.peof.magazine-article-package-note"
  | "part1.communications.peof.time-passes"
  | "part1.communications.peof.secretary-departure"
  | "part1.communications.peof.simulation-staff-arrival"
  | "part1.communications.peof.simulation-brief-intro"
  | "part1.communications.peof.simulation-brief-assignment"
  | "part1.communications.peof.simulation-brief-realtime"
  | "part1.communications.peof.perelman-return"
  | "part1.simulation.security-prompt"
  | "part1.simulation.ten-years-hence"
  | "part1.simulation.kennedy-park.title"
  | "part1.simulation.kennedy-park.description"
  | "part1.simulation.record-activated"
  | "part1.simulation.record-deactivated";

// Normal parser-turn localization is keyed by stable story IDs. Canonical
// English is supplied by the recognizer and remains the per-block fallback.
const STORY_CATALOG: Partial<Record<Locale, Partial<Record<StoryContentId, string>>>> = {
  ja: {
    "part1.initial.incoming-message": "公式メッセージ回線から、メッセージが届くのを「聞く」。\n\n「PRISM？ ペレルマンだ。心理テストはすべて100％で合格した。つまり、目覚めのあともトラウマや深刻な影響なく回復したということだ。まもなくシミュレーションを開始できる。ところで、君の記事が『Dakota Online』最新号に載っているよ。」",
    "part1.initial.release": "Infocom インタラクティブ・フィクション ― SFストーリー\nCopyright (c) 1985 Infocom, Inc. All rights reserved.（著作権表示）\nA Mind Forever Voyaging は Infocom, Inc. の商標です。\nRelease 79 / Serial number 851122",
    "part1.initial.communications": "通信モードに入りました。以下の場所には通信アウトレットが設置されています。",
    "part1.initial.outlets": "PRISMプロジェクト管制センター (PPCC)\n屋上 (RCRO)\nペレルマンのオフィス (PEOF)\nカフェテリア (PCAF)\nメインコンピューター・コア (MACO)\nWNNフィード (WNNF)\n特定のアウトレットを起動するには、対応するコードを入力してください。",
  },
};

export const localizeStoryContent = (
  contentId: StoryContentId,
  canonicalText: string,
  locale: Locale,
) => STORY_CATALOG[locale]?.[contentId] ?? canonicalText;

// Structured projections keep the stable catalog IDs above while replacing
// only leaves that canonical Parchment actually supplied. A missing translated
// leaf therefore falls back to that observed English leaf, never a story
// literal manufactured by the wrapper.
const STRUCTURED_STORY_CATALOG: Partial<Record<Locale, Partial<Record<StoryContentId, Readonly<Record<string, string>>>>>> = {
  ja: {
    "part1.initial.release": {
      "A Mind Forever Voyaging": "A Mind Forever Voyaging",
      "Infocom interactive fiction - a science fiction story": "Infocom インタラクティブ・フィクション ― SFストーリー",
      "Copyright (c) 1985 by Infocom, Inc. All rights reserved.": "Copyright (c) 1985 Infocom, Inc. All rights reserved.（著作権表示）",
      "A Mind Forever Voyaging is a trademark of Infocom, Inc.": "A Mind Forever Voyaging は Infocom, Inc. の商標です。",
      "Release 79 / Serial number 851122": "Release 79 / Serial number 851122",
    },
    "part1.initial.outlets": {
      PPCC: "PRISMプロジェクト管制センター (PPCC)",
      RCRO: "屋上 (RCRO)",
      PEOF: "ペレルマンのオフィス (PEOF)",
      PCAF: "カフェテリア (PCAF)",
      MACO: "メインコンピューター・コア (MACO)",
      WNNF: "WNNフィード (WNNF)",
      "To activate a specific outlet, submit the associated code.": "特定のアウトレットを起動するには、対応するコードを入力してください。",
    },
  },
};

type ObservedStoryTranslation = Readonly<{
  contentId: StoryContentId;
  text: string;
  // Some canonical room titles use the same Parchment style as prose. The
  // exact observed leaf may therefore carry its narrow semantic identity.
  kind?: "title";
}>;

type ObservedStoryCatalogEntry = Readonly<{
  canonicalLeaf: string;
  // Optional raw-English command context narrows identity when one observed
  // transition is not evidence that the leaf owns this role globally.
  canonicalCommand?: string;
  translation: ObservedStoryTranslation;
}>;

// Option 2b prototype catalog. Unlike passage-owned structured catalogs, its
// identity is the exact canonical leaf observed at runtime, optionally narrowed
// by its canonical command. Keeping this catalog separate prevents unrelated
// ordinary-turn contexts from acquiring translations or semantic roles.
const OBSERVED_STORY_CATALOG: Partial<Record<Locale, ReadonlyArray<ObservedStoryCatalogEntry>>> = {
  ja: [
    {
      canonicalLeaf: "You have no appendages, remember?",
      translation: { contentId: "part1.communications.inventory-empty", text: "手足はないことを忘れたのか？" },
    },
    {
      canonicalCommand: "PEOF",
      canonicalLeaf: "Dr. Perelman's Office",
      translation: { contentId: "part1.communications.peof.title", text: "ペレルマン博士のオフィス", kind: "title" },
    },
    {
      canonicalCommand: "PEOF",
      canonicalLeaf: "This is the office of your creator, Dr. Abraham Perelman. It is cluttered and disorganized. Overstuffed bookshelves line the room. Perelman's desk is covered with a number of items, including a decoder, a map of the city, a ball-point pen, and a printout of a magazine article.",
      translation: { contentId: "part1.communications.peof.description", text: "ここは、あなたの創造者であるエイブラハム・ペレルマン博士のオフィスだ。室内は物であふれ、散らかっている。ぎっしり詰まった本棚が部屋を囲んでいる。ペレルマンの机の上には、デコーダー、街の地図、ボールペン、雑誌記事のプリントアウトなど、さまざまな品が置かれている。" },
    },
    {
      canonicalCommand: "PEOF",
      canonicalLeaf: "Dr. Perelman is sitting at his desk, working.",
      translation: { contentId: "part1.communications.peof.perelman-working", text: "ペレルマン博士は机に向かい、仕事をしている。" },
    },
    {
      canonicalCommand: "LOOK",
      canonicalLeaf: "Dr. Perelman's Office",
      translation: { contentId: "part1.communications.peof.title", text: "ペレルマン博士のオフィス", kind: "title" },
    },
    {
      canonicalCommand: "LOOK",
      canonicalLeaf: "This is the office of your creator, Dr. Abraham Perelman. It is cluttered and disorganized. Overstuffed bookshelves line the room. Perelman's desk is covered with a number of items, including a decoder, a map of the city, a ball-point pen, and a printout of a magazine article.",
      translation: { contentId: "part1.communications.peof.description", text: "ここは、あなたの創造者であるエイブラハム・ペレルマン博士のオフィスだ。室内は物であふれ、散らかっている。ぎっしり詰まった本棚が部屋を囲んでいる。ペレルマンの机の上には、デコーダー、街の地図、ボールペン、雑誌記事のプリントアウトなど、さまざまな品が置かれている。" },
    },
    {
      canonicalCommand: "LOOK",
      canonicalLeaf: "Dr. Perelman is sitting at his desk, working.",
      translation: { contentId: "part1.communications.peof.perelman-working", text: "ペレルマン博士は机に向かい、仕事をしている。" },
    },
    {
      canonicalCommand: "EXAMINE DESK",
      canonicalLeaf: "Perelman's desk is covered with a number of items, including a decoder, a map of the city, a ball-point pen, and a printout of a magazine article.",
      translation: { contentId: "part1.communications.peof.desk-description", text: "ペレルマンの机の上には、デコーダー、街の地図、ボールペン、雑誌記事のプリントアウトなど、さまざまな品が置かれている。" },
    },
    {
      canonicalCommand: "EXAMINE DR PERELMAN",
      canonicalLeaf: "Perelman is an older man, in his late fifties, and has a white goatee.",
      translation: { contentId: "part1.communications.peof.perelman-description", text: "ペレルマンは50代後半の年配の男性で、白い山羊ひげをたくわえている。" },
    },
    {
      canonicalCommand: "EXAMINE DECODER",
      canonicalLeaf: "[This is the decoder that you'll find in your A Mind Forever Voyaging package.]",
      translation: { contentId: "part1.communications.peof.decoder-package-note", text: "［これは、あなたの『A Mind Forever Voyaging』パッケージに入っているデコーダーです。］" },
    },
    {
      canonicalCommand: "EXAMINE MAP",
      canonicalLeaf: "[This is the map that you'll find in your A Mind Forever Voyaging package.]",
      translation: { contentId: "part1.communications.peof.map-package-note", text: "［これは、あなたの『A Mind Forever Voyaging』パッケージに入っている地図です。］" },
    },
    {
      canonicalCommand: "EXAMINE PEN",
      canonicalLeaf: "[This is the pen that you'll find in your A Mind Forever Voyaging package.]",
      translation: { contentId: "part1.communications.peof.pen-package-note", text: "［これは、あなたの『A Mind Forever Voyaging』パッケージに入っているペンです。］" },
    },
    {
      canonicalCommand: "EXAMINE MAGAZINE ARTICLE",
      canonicalLeaf: "[This is the magazine article that you'll find in your A Mind Forever Voyaging package.]",
      translation: { contentId: "part1.communications.peof.magazine-article-package-note", text: "［これは、あなたの『A Mind Forever Voyaging』パッケージに入っている雑誌記事です。］" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "Time passes...",
      translation: { contentId: "part1.communications.peof.time-passes", text: "時間が過ぎていく……" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "Alyson Price, Perelman's secretary, pops her head in the doorway. \"Hey Doc! Need me for anything else tonight?\" Perelman, grinning, responds, \"Not unless you've decided to dump that unfairly handsome husband of yours.\" She looks exasperated at what is obviously an old joke and shakes a fist at him in a mock threat. \"Really, though, I'll be fine,\" says Perelman. \"Scram.\" She disappears from sight, shouting from the next room, \"Good night, Doc. Don't stay too late!\"",
      translation: { contentId: "part1.communications.peof.secretary-departure", text: "ペレルマンの秘書、アリソン・プライスが戸口からひょいと顔をのぞかせる。「ねえ博士！　今夜、ほかに何か用はある？」ペレルマンはにやりとして答える。「その反則なくらいハンサムなご亭主を捨てる気になったのなら話は別だがね」明らかに聞き飽きた冗談に、彼女はうんざりした顔で、脅すふりをして拳を振る。「冗談はさておき、本当にもう大丈夫だよ」とペレルマン。「さあ、帰った帰った」彼女は姿を消し、隣の部屋から声を張り上げる。「おやすみ、博士。あんまり遅くまで残らないでね！」" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "A PRISM Project staff member dashes in and hands Perelman a note before leaving. Glancing at the note, Perelman walks to a point beyond your field of vision. A moment later, you hear a click, as of a switch being turned.",
      translation: { contentId: "part1.communications.peof.simulation-staff-arrival", text: "PRISMプロジェクトのスタッフが駆け込んできて、ペレルマンにメモを手渡すと立ち去る。メモに目を通したペレルマンは、あなたの視界の外へ歩いていく。しばらくして、スイッチを入れたようなカチッという音が聞こえる。" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "A message begins coming over the message line: \"Perelman to PRISM. The programming team has finished entering the parameters for the Plan. This is it: you can enter Simulation Mode at any time. The Social Science group has come up with a list of things to record:",
      translation: { contentId: "part1.communications.peof.simulation-brief-intro", text: "通信回線からメッセージが流れ始める。「ペレルマンからPRISMへ。プログラミング・チームがプランのパラメーター入力を完了した。いよいよだ――いつでもシミュレーション・モードに入れる。社会科学グループが記録すべき項目のリストをまとめた。" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "By the way, since the Simulation Controller will be doing so much data-crunching on the fly, it appears the simulation will run in real time -- a minute there will approximately equal a minute here. Well, good luck!\"",
      translation: { contentId: "part1.communications.peof.simulation-brief-realtime", text: "なお、シミュレーション・コントローラーが進行中に大量のデータ処理を行うため、シミュレーションはリアルタイムで進むようだ――向こうでの1分が、こちらでの約1分に相当する。それでは、健闘を祈る！」" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "A moment later, Perelman walks back into your field of vision.",
      translation: { contentId: "part1.communications.peof.perelman-return", text: "しばらくして、ペレルマンがあなたの視界に戻ってくる。" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Eating a meal in a restaurant",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "レストランで食事をすること" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Talking to a government official",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "政府職員と話すこと" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Visiting a power-generating facility",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "発電施設を訪れること" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Reading a newspaper",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "新聞を読むこと" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Riding some form of public transportation",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "何らかの公共交通機関に乗ること" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Attending a court in session",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "開廷中の裁判を傍聴すること" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Talking to a church official",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "教会関係者と話すこと" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Going to a movie",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "映画を見に行くこと" },
    },
    {
      canonicalCommand: "WAIT",
      canonicalLeaf: "   Visiting your own home or living quarters",
      translation: { contentId: "part1.communications.peof.simulation-brief-assignment", text: "自分の家、または居住区を訪れること" },
    },
    {
      canonicalCommand: "ENTER SIMULATION MODE",
      canonicalLeaf: "Simulation Mode is a Class One Security mode. For access, enter the Security Code corresponding to:",
      translation: { contentId: "part1.simulation.security-prompt", text: "シミュレーション・モードはクラス1セキュリティ・モードです。アクセスするには、次に対応するセキュリティ・コードを入力してください：" },
    },
    {
      canonicalLeaf: "This simulation is based 10 years hence.",
      translation: { contentId: "part1.simulation.ten-years-hence", text: "このシミュレーションの時代設定は、10年後です。" },
    },
    {
      canonicalLeaf: "Kennedy Park",
      translation: { contentId: "part1.simulation.kennedy-park.title", text: "ケネディ公園", kind: "title" },
    },
    {
      canonicalLeaf: "This is a small, downtown park with gates leading northeast, southeast, and southwest. There is a sprawling, free-form waterpool surrounding a statue of John F. Kennedy in the center of the park.",
      translation: { contentId: "part1.simulation.kennedy-park.description", text: "ここは市街地にある小さな公園で、北東、南東、南西へ通じる門がある。公園の中央では、ジョン・F・ケネディ像を取り囲むように、自由な形の大きな水盤が広がっている。" },
    },
    {
      canonicalCommand: "RECORD",
      canonicalLeaf: "Record feature activated.",
      translation: { contentId: "part1.simulation.record-activated", text: "記録機能を起動しました。" },
    },
    {
      canonicalCommand: "RECORD OFF",
      canonicalLeaf: "Record feature deactivated.",
      translation: { contentId: "part1.simulation.record-deactivated", text: "記録機能を停止しました。" },
    },
  ],
};

const OBSERVED_STORY_INDEX: Partial<Record<Locale, ReadonlyMap<string, ObservedStoryTranslation>>> = Object.fromEntries(
  Object.entries(OBSERVED_STORY_CATALOG).map(([locale, entries]) => {
    const index = new Map<string, ObservedStoryTranslation>();
    for (const { canonicalCommand, canonicalLeaf, translation } of entries ?? []) {
      const identity = `${canonicalCommand?.toUpperCase() ?? "*"}\u0000${canonicalLeaf}`;
      if (index.has(identity)) throw new Error(`Duplicate observed story identity for locale ${locale}: ${identity}`);
      index.set(identity, translation);
    }
    return [locale, index];
  }),
);

const storyLeafIdentity = (contentId: StoryContentId, canonicalLeaf: string) => {
  if (contentId === "part1.initial.outlets") return canonicalLeaf.match(/\((PPCC|RCRO|PEOF|PCAF|MACO|WNNF)\)$/i)?.[1].toUpperCase() ?? canonicalLeaf;
  return canonicalLeaf;
};

export const localizeStoryLeaves = (
  contentId: StoryContentId,
  canonicalLeaves: readonly string[],
  locale: Locale,
) => canonicalLeaves.map((leaf) => STRUCTURED_STORY_CATALOG[locale]?.[contentId]?.[storyLeafIdentity(contentId, leaf)] ?? leaf);

export const observedStoryLeafTranslation = (canonicalLeaf: string, locale: Locale, canonicalCommand?: string) => {
  const index = OBSERVED_STORY_INDEX[locale];
  return index?.get(`${canonicalCommand?.toUpperCase() ?? "*"}\u0000${canonicalLeaf}`)
    ?? index?.get(`*\u0000${canonicalLeaf}`);
};
