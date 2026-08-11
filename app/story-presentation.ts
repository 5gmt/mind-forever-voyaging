import { localizeStoryContent, localizeStoryTranscript, type Locale, type StoryContentId } from "./localization.ts";

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
  kind: "heading" | "prose" | "quote" | "prompt" | "command";
  text: string;
  contentId?: StoryContentId;
  canonicalText?: string;
  attribution?: string;
  sourceLines: number[];
};

const clean = (text: string) => text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const commandText = (text: string) => clean(text).replace(/\s+/g, " ").toUpperCase();

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

  const blocks: StoryPresentationBlock[] = [];
  if (headingIndex >= 0) {
    blocks.push({ kind: "heading", text: visualLines[headingIndex].text, sourceLines: [visualLines[headingIndex].sourceLine] });
  }

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

const INITIAL_MESSAGE = /You "hear" a message coming in on the official message line:[\s\S]*?current issue of Dakota Online\."/i;
const RELEASE = /Infocom interactive fiction - a science fiction story[\s\S]*?Release 79\s*\/\s*Serial number 851122/i;
const COMMUNICATIONS = /You have entered Communications Mode\.\s*The following locations are equipped with communication outlets:/i;
const OUTLETS = /PRISM Project Control Center\s*\(PPCC\)[\s\S]*?(?:WNN(?: Feed)?|World News Network Feed)\s*\(WNNF\)[\s\S]*?submit the associated code\./i;

const contentBlock = (
  contentId: StoryContentId,
  canonicalText: string,
  locale: Locale,
  sourceLines: number[],
): StoryPresentationBlock => ({
  kind: "prose",
  contentId,
  canonicalText,
  text: localizeStoryContent(contentId, canonicalText, locale),
  sourceLines,
});

// Source evidence: GO and V-LOOK in source/misc.zil and source/verbs.zil,
// with MESSAGE-B and the outlet list in source/prism.zil. This intentionally
// recognizes only the first line-input tableau and its immediately following
// LOOK turn; it is not a general transcript/turn parser.
export const initialLineTurnPresentation = (
  presentation: BridgePresentation | null,
  locale: Locale,
): StoryPresentationBlock[] | null => {
  if (locale !== "ja" || !presentation || presentation.version !== 2 || presentation.activeInput?.kind !== "line") return null;
  const { lines, terminalLine, activeInput } = presentation;
  if (!activeInput.classes.includes("Input") || !activeInput.classes.includes("LineInput")) return null;
  if (terminalLine < 0 || activeInput.line !== terminalLine || activeInput.line !== lines.length - 1) return null;

  const indexed = lines.map((line, index) => ({ text: clean(line.text.replace(/\r/g, "")), index }));
  const terminalText = indexed[terminalLine]?.text ?? "";
  if (!/^>\s*$/.test(terminalText)) return null;
  const joined = indexed.map((line) => line.text).join("\n");
  const message = joined.match(INITIAL_MESSAGE)?.[0];
  const release = joined.match(RELEASE)?.[0];
  const descriptions = [...joined.matchAll(new RegExp(COMMUNICATIONS.source, "gi"))];
  const outletMatches = [...joined.matchAll(new RegExp(OUTLETS.source, "gi"))];
  if (!message || !release || descriptions.length === 0 || outletMatches.length === 0) return null;

  const responseLine = indexed.findLastIndex((line) => COMMUNICATIONS.test(line.text));
  const echoedCommandLine = indexed.slice(0, terminalLine).findLast((line, index, candidates) => {
      if (/^>\s*\S/i.test(commandText(line.text))) return true;
      const prior = candidates[index - 1];
      const hasInputStyle = lines[line.index].classes.some((className) => /Style_input/i.test(className))
        || lines[line.index].runs.some((run) => run.classes.some((className) => /Style_input/i.test(className)));
      return Boolean(commandText(line.text)) && (hasInputStyle || commandText(prior?.text ?? "") === ">");
    });
  const echoedLookLine = echoedCommandLine
    && commandText(echoedCommandLine.text).replace(/^>\s*/, "") === "LOOK"
    ? echoedCommandLine
    : undefined;
  const lastDescription = descriptions.at(-1);
  const lastOutlets = outletMatches.at(-1);
  if (!lastDescription || !lastOutlets) return null;
  const isInitial = !echoedCommandLine;
  const isLook = Boolean(echoedLookLine && echoedLookLine.index < responseLine);
  if (!isInitial && !isLook) return null;

  const sourceLinesFor = (value: string) => indexed.filter((line) => value.includes(line.text) && line.text).map((line) => line.index);
  const communicationText = lastDescription[0];
  const outletsText = lastOutlets[0];
  const blocks: StoryPresentationBlock[] = [];
  if (isInitial) {
    blocks.push(contentBlock("part1.initial.incoming-message", message, locale, sourceLinesFor(message)));
    blocks.push(contentBlock("part1.initial.release", release, locale, sourceLinesFor(release)));
  } else if (echoedLookLine) {
    const priorLine = indexed[echoedLookLine.index - 1];
    const sourceLines = commandText(priorLine?.text ?? "") === ">"
      ? [priorLine.index, echoedLookLine.index]
      : [echoedLookLine.index];
    blocks.push({ kind: "command", text: "LOOK", canonicalText: "LOOK", sourceLines });
  }
  blocks.push(contentBlock("part1.initial.communications", communicationText, locale, sourceLinesFor(communicationText)));
  blocks.push(contentBlock("part1.initial.outlets", outletsText, locale, sourceLinesFor(outletsText)));
  return blocks;
};

export const storyPresentation = (presentation: BridgePresentation | null, locale: Locale) =>
  openingPresentation(presentation, locale) ?? initialLineTurnPresentation(presentation, locale);
