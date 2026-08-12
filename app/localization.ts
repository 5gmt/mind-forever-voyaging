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
  },
} as const;

export type UiKey = keyof typeof UI.en;
export const uiText = (locale: Locale, key: UiKey) => UI[locale][key];

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
  | "part1.initial.outlets";

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

const storyLeafIdentity = (contentId: StoryContentId, canonicalLeaf: string) => {
  if (contentId === "part1.initial.outlets") return canonicalLeaf.match(/\((PPCC|RCRO|PEOF|PCAF|MACO|WNNF)\)$/i)?.[1].toUpperCase() ?? canonicalLeaf;
  return canonicalLeaf;
};

export const localizeStoryLeaves = (
  contentId: StoryContentId,
  canonicalLeaves: readonly string[],
  locale: Locale,
) => canonicalLeaves.map((leaf) => STRUCTURED_STORY_CATALOG[locale]?.[contentId]?.[storyLeafIdentity(contentId, leaf)] ?? leaf);
