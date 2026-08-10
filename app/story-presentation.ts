import { localizeStoryTranscript, type Locale } from "./localization.ts";

export type BridgePresentationLine = {
  text: string;
  classes: string[];
  runs: Array<{ text: string; classes: string[] }>;
  layout: {
    textAlign: string;
    marginLeft: string;
    paddingLeft: string;
    whiteSpace: string;
  };
};

export type StoryPresentationBlock = {
  kind: "heading" | "prose" | "quote" | "prompt";
  text: string;
  attribution?: string;
  sourceLines: number[];
};

const clean = (text: string) => text.replace(/\u00a0/g, " ").trim();

// This deliberately recognizes only Release 79's opening tableau. The raw
// transcript remains the source of truth for all state detection; these lines
// are a presentation-only view of Parchment's BufferLine structure.
export const openingPresentation = (
  lines: BridgePresentationLine[],
  locale: Locale,
): StoryPresentationBlock[] | null => {
  const normalized = lines.map((line) => clean(line.text));
  const headingIndex = normalized.findIndex((line) => /^\*\s*PART I\s*\*$/i.test(line));
  const quoteStart = normalized.findIndex((line) => /^"Tomorrow never yet$/i.test(line));
  const quoteEnd = normalized.findIndex((line, index) => index > quoteStart && /^On any human being rose or set\."$/i.test(line));
  const promptIndex = normalized.findIndex((line) => /^\[Hit any key to continue\.\]$/i.test(line));

  if (quoteStart < 0 || quoteEnd < 0 || promptIndex < 0) return null;

  const blocks: StoryPresentationBlock[] = [];
  if (headingIndex >= 0) {
    blocks.push({ kind: "heading", text: normalized[headingIndex], sourceLines: [headingIndex] });
  }

  const attributionIndex = normalized.findIndex((line, index) => index > quoteEnd && /^--\s*William Marsden$/i.test(line));
  const rawQuote = normalized.slice(quoteStart, quoteEnd + 1).join("\n");
  blocks.push({
    kind: "quote",
    text: localizeStoryTranscript(rawQuote, locale),
    attribution: attributionIndex >= 0 ? normalized[attributionIndex] : undefined,
    sourceLines: [quoteStart, quoteEnd, ...(attributionIndex >= 0 ? [attributionIndex] : [])],
  });
  blocks.push({
    kind: "prompt",
    text: localizeStoryTranscript(normalized[promptIndex], locale),
    sourceLines: [promptIndex],
  });

  return blocks;
};
