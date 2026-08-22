import { localizeStoryContent, localizeStoryLeaves, localizeStoryTranscript, observedStoryLeafTranslation, type Locale, type StoryContentId } from "./localization.ts";

export type BridgePresentationLine = {
  id?: string;
  text: string;
  classes: string[];
  runs: Array<{ text: string; classes: string[]; tag: string }>;
  layout: { textAlign: string; marginLeft: string; paddingLeft: string; whiteSpace: string };
};
export type BridgePresentation = {
  version: 2 | 3;
  lines: BridgePresentationLine[];
  terminalLine: number;
  activeInput: { kind: "line" | "char"; line: number | null; classes: string[] } | null;
  geometry?: {
    buffer: { left: number; width: number } | null;
    status: {
      left: number;
      width: number;
      height?: number;
    } | null;
    activePrompt: { left: number; width: number } | null;
  };
};
export type StoryPresentationBlock = {
  kind: "heading" | "title" | "prose" | "quote" | "prompt" | "command" | "spacer" | "list";
  text: string;
  items?: string[];
  contentId?: StoryContentId;
  canonicalText?: string;
  canonicalItems?: string[];
  attribution?: string;
  sourceLines: number[];
};

const clean = (text: string) => text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const commandText = (text: string) => clean(text).toUpperCase();
const INPUT_STYLE_PATTERN = /Style_input/i;
const HEADING_STYLE_PATTERN = /Style_(?:header|subheader)|Heading/i;
const blank = (line: BridgePresentationLine) => line.classes.includes("BlankPara");
const spacer = (sourceLine: number): StoryPresentationBlock => ({ kind: "spacer", text: "", sourceLines: [sourceLine] });

// Deliberately recognizes only Release 79's live opening character prompt.
export const openingPresentation = (presentation: BridgePresentation | null, locale: Locale): StoryPresentationBlock[] | null => {
  if (!presentation || ![2, 3].includes(presentation.version) || presentation.activeInput?.kind !== "char") return null;
  const { lines, terminalLine, activeInput } = presentation;
  if (!activeInput.classes.includes("Input") || activeInput.classes.includes("LineInput")) return null;
  const visualLines = lines.flatMap((line, sourceLine) => {
    const fragments = line.runs.some((run) => run.classes.includes("Input")) ? [line.text] : line.text.replace(/\r/g, "").split("\n");
    return fragments.map((fragment) => ({ text: clean(fragment), sourceLine }));
  });
  const headingIndex = visualLines.findIndex(({ text }) => /^\*\s*PART I\s*\*$/i.test(text));
  const quoteStart = visualLines.findIndex(({ text }) => /^"Tomorrow never yet$/i.test(text));
  const quoteEnd = visualLines.findIndex(({ text }, index) => index > quoteStart && /^On any human being rose or set\."$/i.test(text));
  const promptIndex = visualLines.findIndex(({ text }) => /^\[Hit any key to continue\.\]$/i.test(text));
  if (quoteStart < 0 || quoteEnd < 0 || promptIndex < 0) return null;
  const promptSourceLine = visualLines[promptIndex].sourceLine;
  if (promptSourceLine !== terminalLine || activeInput.line !== promptSourceLine) return null;

  const blocks: StoryPresentationBlock[] = [];
  if (headingIndex >= 0) blocks.push({ kind: "heading", text: visualLines[headingIndex].text, sourceLines: [visualLines[headingIndex].sourceLine] });
  const firstQuoteLine = visualLines[quoteStart].sourceLine;
  if (lines.slice((headingIndex >= 0 ? visualLines[headingIndex].sourceLine : -1) + 1, firstQuoteLine).some(blank)) {
    blocks.push(spacer(lines.findIndex((line, index) => index < firstQuoteLine && blank(line))));
  }
  const attributionIndex = visualLines.findIndex(({ text }, index) => index > quoteEnd && /^--\s*William Marsden$/i.test(text));
  const rawQuote = visualLines.slice(quoteStart, quoteEnd + 1).map(({ text }) => text).join("\n");
  const quoteSources = [...new Set([firstQuoteLine, visualLines[quoteEnd].sourceLine, ...(attributionIndex >= 0 ? [visualLines[attributionIndex].sourceLine] : [])])];
  blocks.push({ kind: "quote", text: localizeStoryTranscript(rawQuote, locale), attribution: attributionIndex >= 0 ? visualLines[attributionIndex].text : undefined, sourceLines: quoteSources });
  const between = lines.findIndex((line, index) => index > Math.max(...quoteSources) && index < promptSourceLine && blank(line));
  if (between >= 0) blocks.push(spacer(between));
  blocks.push({ kind: "prompt", text: localizeStoryTranscript(visualLines[promptIndex].text, locale), sourceLines: [promptSourceLine] });
  return blocks;
};

const MESSAGE = /^You "hear" a message coming in on the official message line:.*current issue of Dakota Online\."$/i;
const COMMUNICATIONS = /^You have entered Communications Mode\. The following locations are equipped with communication outlets:$/i;
const OUTLET = /^\s*.+\((PPCC|RCRO|PEOF|PCAF|MACO|WNNF)\)\s*$/i;
const INSTRUCTION = /^To activate a specific outlet, submit the associated code\.$/i;
const RELEASE_END = /^Release 79\s*\/\s*Serial number 851122$/i;
const block = (kind: "prose" | "title", contentId: StoryContentId, canonicalText: string, text: string, sourceLines: number[]): StoryPresentationBlock =>
  ({ kind, contentId, canonicalText, text, sourceLines });

// This is a narrow line-oriented projection of the initial tableau and its
// immediately following LOOK response, not a general transcript parser.
export const initialLineTurnPresentation = (presentation: BridgePresentation | null, locale: Locale): StoryPresentationBlock[] | null => {
  if (locale !== "ja" || !presentation || ![2, 3].includes(presentation.version) || presentation.activeInput?.kind !== "line") return null;
  const { lines, terminalLine, activeInput } = presentation;
  if (!activeInput.classes.includes("Input") || !activeInput.classes.includes("LineInput") || activeInput.line !== terminalLine || terminalLine !== lines.length - 1 || !/^>\s*$/.test(clean(lines[terminalLine]?.text ?? ""))) return null;
  const texts = lines.map((line) => clean(line.text.replace(/\r/g, "")));
  const messageIndex = texts.findIndex((text) => MESSAGE.test(text));
  const releaseEnd = texts.findIndex((text) => RELEASE_END.test(text));
  const commandIndex = lines.slice(0, terminalLine).findLastIndex((line, index) => /^>\s*\S/i.test(texts[index]) || line.runs.some((run) => run.classes.some((name) => /Style_input/i.test(name))));
  const isInitial = commandIndex < 0;
  const isLook = commandIndex >= 0 && commandText(texts[commandIndex]).replace(/^>\s*/, "") === "LOOK";
  if (!isInitial && !isLook) return null;
  const communicationsIndex = texts.findLastIndex((text, index) => index > commandIndex && COMMUNICATIONS.test(text));
  const outletIndexes = texts.map((text, index) => ({ text, index })).filter(({ text, index }) => index > communicationsIndex && OUTLET.test(text)).slice(0, 6);
  const instructionIndex = texts.findIndex((text, index) => index > (outletIndexes.at(-1)?.index ?? -1) && INSTRUCTION.test(text));
  if (communicationsIndex < 0 || outletIndexes.length !== 6 || instructionIndex < 0 || (isInitial && (messageIndex < 0 || releaseEnd < 0))) return null;

  const blocks: StoryPresentationBlock[] = [];
  if (isInitial) {
    const canonical = texts[messageIndex];
    blocks.push(block("prose", "part1.initial.incoming-message", canonical, localizeStoryContent("part1.initial.incoming-message", canonical, locale), [messageIndex]));
    if (blank(lines[messageIndex + 1])) blocks.push(spacer(messageIndex + 1));
    const releaseStart = messageIndex + 2;
    const releaseIndexes = Array.from({ length: releaseEnd - releaseStart + 1 }, (_, index) => releaseStart + index);
    const canonicalLeaves = releaseIndexes.map((index) => texts[index]);
    const translated = localizeStoryLeaves("part1.initial.release", canonicalLeaves, locale);
    releaseIndexes.forEach((sourceLine, index) => blocks.push(block(canonicalLeaves[index] === "A Mind Forever Voyaging" ? "title" : "prose", "part1.initial.release", canonicalLeaves[index], translated[index], [sourceLine])));
    if (blank(lines[releaseEnd + 1])) blocks.push(spacer(releaseEnd + 1));
  } else {
    blocks.push({ kind: "command", text: "LOOK", canonicalText: texts[commandIndex].replace(/^>\s*/, ""), sourceLines: [commandIndex] });
  }
  const communication = texts[communicationsIndex];
  blocks.push(block("prose", "part1.initial.communications", communication, localizeStoryContent("part1.initial.communications", communication, locale), [communicationsIndex]));
  const canonicalItems = outletIndexes.map(({ text }) => text);
  const localized = localizeStoryLeaves("part1.initial.outlets", [...canonicalItems, texts[instructionIndex]], locale);
  blocks.push({ kind: "list", text: localized.slice(0, 6).join("\n"), items: localized.slice(0, 6), canonicalText: canonicalItems.join("\n"), canonicalItems, contentId: "part1.initial.outlets", sourceLines: outletIndexes.map(({ index }) => index) });
  blocks.push(block("prose", "part1.initial.outlets", texts[instructionIndex], localized[6], [instructionIndex]));
  const trailingBlank = lines.findIndex((line, index) => index > instructionIndex && index < terminalLine && blank(line));
  if (trailingBlank >= 0) blocks.push(spacer(trailingBlank));
  return blocks;
};

// Option 2b prototype: project an ordinary turn from Parchment's observed line
// order/boundaries and semantic classes. Catalog membership supplies identity;
// no command or passage-specific recognizer is involved. The whole turn fails
// closed to the canonical fallback unless at least one observed leaf translates.
export const observedOrdinaryTurnPresentation = (presentation: BridgePresentation | null, locale: Locale): StoryPresentationBlock[] | null => {
  if (locale === "en" || !presentation || presentation.version !== 3 || presentation.activeInput?.kind !== "line") return null;
  const end = presentation.activeInput.line;
  if (end === null || end !== presentation.terminalLine || end !== presentation.lines.length - 1) return null;
  const commandIndex = presentation.lines.slice(0, end).findLastIndex((line) => {
    const text = clean(line.text);
    return /^>\s*\S/.test(text) || line.runs.some((run) => run.classes.some((name) => INPUT_STYLE_PATTERN.test(name)));
  });
  if (commandIndex < 0) return null;
  const command = clean(presentation.lines[commandIndex].text).replace(/^>\s*/, "");
  const response = presentation.lines.slice(commandIndex + 1, end);
  const translations = response.map((line) => observedStoryLeafTranslation(clean(line.text), locale));
  if (!translations.some(Boolean)) return null;

  const blocks: StoryPresentationBlock[] = [{
    // Use the same display normalization as the passage-specific projections.
    kind: "command", text: commandText(command), canonicalText: command, sourceLines: [commandIndex],
  }];
  response.forEach((line, offset) => {
    const sourceLine = commandIndex + offset + 1;
    const canonicalText = clean(line.text);
    if (!canonicalText && blank(line)) {
      blocks.push(spacer(sourceLine));
      return;
    }
    if (!canonicalText) return;
    const translation = translations[offset];
    const semanticClasses = [...line.classes, ...line.runs.flatMap((run) => run.classes)];
    const kind = semanticClasses.some((name) => HEADING_STYLE_PATTERN.test(name)) ? "title" : "prose";
    blocks.push({ kind, text: translation?.text ?? canonicalText, canonicalText, contentId: translation?.contentId, sourceLines: [sourceLine] });
  });
  return blocks;
};

// Preserve the richer, evidence-backed passage projections first. The generic
// prototype is deliberately last so catalog leaf matches cannot supersede them.
export const storyPresentation = (presentation: BridgePresentation | null, locale: Locale) => openingPresentation(presentation, locale)
  ?? initialLineTurnPresentation(presentation, locale)
  ?? observedOrdinaryTurnPresentation(presentation, locale);
