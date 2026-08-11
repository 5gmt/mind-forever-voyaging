import { localizeStoryTranscript, type Locale } from "./localization.ts";

export type BridgePresentationLine = {
  text: string;
  classes: string[];
  runs: Array<{ text: string; classes: string[]; tag: string }>;
  layout: {
    textAlign: string;
    marginLeft: string;
    paddingLeft: string;
    whiteSpace: string;
  };
};

export type BridgePresentation = {
  version: 2;
  lines: BridgePresentationLine[];
  terminalLine: number;
  activeInput: { kind: "line" | "char"; line: number | null; classes: string[] } | null;
};

export type StoryPresentationBlock = {
  kind: "heading" | "prose" | "quote" | "prompt";
  text: string;
  attribution?: string;
  sourceLines: number[];
};

const clean = (text: string) => text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

// This deliberately recognizes only Release 79's opening tableau. The raw
// transcript remains the source of truth for all state detection; these lines
// are a presentation-only view of Parchment's BufferLine structure.
export const openingPresentation = (
  presentation: BridgePresentation | null,
  locale: Locale,
): StoryPresentationBlock[] | null => {
  if (!presentation || presentation.version !== 2 || presentation.activeInput?.kind !== "char") return null;
  const { lines, terminalLine, activeInput } = presentation;
  if (!activeInput.classes.includes("Input") || activeInput.classes.includes("LineInput")) return null;
  const visualLines = lines.flatMap((line, sourceLine) => {
    const text = line.text.replace(/\r/g, "");
    const fragments = line.runs.some((run) => run.classes.includes("Input")) ? [text] : text.split("\n");
    return fragments.map((fragment) => ({ text: clean(fragment), sourceLine }));
  });
  const headingIndex = visualLines.findIndex((line) => /^\*\s*PART I\s*\*$/i.test(line.text));
  const quoteStart = visualLines.findIndex((line) => /^"Tomorrow never yet$/i.test(line.text));
  const quoteEnd = visualLines.findIndex((line, index) => index > quoteStart && /^On any human being rose or set\."$/i.test(line.text));
  const promptIndex = visualLines.findIndex((line) => /^\[Hit any key to continue\.\]$/i.test(line.text));

  if (quoteStart < 0 || quoteEnd < 0 || promptIndex < 0) return null;
  // Parchment appends its Input textarea to the current BufferLine. Requiring
  // both signals prevents an old opening prompt in scrollback from masking the
  // canonical interpreter after play continues.
  const promptSourceLine = visualLines[promptIndex].sourceLine;
  if (promptSourceLine !== terminalLine || activeInput.line !== promptSourceLine) return null;

  const blocks: StoryPresentationBlock[] = [
    { kind: "heading", text: headingIndex >= 0 ? visualLines[headingIndex].text : "* PART I *", sourceLines: headingIndex >= 0 ? [visualLines[headingIndex].sourceLine] : [] },
  ];

  const attributionIndex = visualLines.findIndex((line, index) => index > quoteEnd && /^--\s*William Marsden$/i.test(line.text));
  const rawQuote = visualLines.slice(quoteStart, quoteEnd + 1).map((line) => line.text).join("\n");
  blocks.push({
    kind: "quote",
    text: localizeStoryTranscript(rawQuote, locale),
    attribution: attributionIndex >= 0 ? visualLines[attributionIndex].text : undefined,
    sourceLines: [...new Set([visualLines[quoteStart].sourceLine, visualLines[quoteEnd].sourceLine, ...(attributionIndex >= 0 ? [visualLines[attributionIndex].sourceLine] : [])])],
  });
  blocks.push({
    kind: "prompt",
    text: localizeStoryTranscript(visualLines[promptIndex].text, locale),
    sourceLines: [promptSourceLine],
  });

  return blocks;
};
