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
  },
} as const;

export type UiKey = keyof typeof UI.en;
export const uiText = (locale: Locale, key: UiKey) => UI[locale][key];

const OUTLET_LABELS: Partial<Record<Locale, Readonly<Record<string, string>>>> = {
  ja: {
    PPCC: "PRISMプロジェクト管制センター",
    RCRO: "屋上",
    PEOF: "ペレルマンのオフィス",
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
  | "part1.communications.peof.perelman-working";

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
