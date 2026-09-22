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
  kind: "heading" | "title" | "prose" | "quote" | "prompt" | "security-prompt" | "command" | "spacer" | "list";
  text: string;
  items?: string[];
  contentId?: StoryContentId;
  canonicalText?: string;
  canonicalItems?: string[];
  attribution?: string;
  securityChallenge?: { color: string; innerNumber: number };
  sourceLines: number[];
};

const clean = (text: string) => text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const commandText = (text: string) => clean(text).toUpperCase();
const INPUT_STYLE_PATTERN = /Style_input/i;
const HEADING_STYLE_PATTERN = /Style_(?:header|subheader)|Heading/i;
const blank = (line: BridgePresentationLine) => line.classes.includes("BlankPara");
const spacer = (sourceLine: number): StoryPresentationBlock => ({ kind: "spacer", text: "", sourceLines: [sourceLine] });

const ASSIGNMENT_INTRO = "A message begins coming over the message line: \"Perelman to PRISM. The programming team has finished entering the parameters for the Plan. This is it: you can enter Simulation Mode at any time. The Social Science group has come up with a list of things to record:";
const ASSIGNMENTS = [
  "Eating a meal in a restaurant",
  "Talking to a government official",
  "Visiting a power-generating facility",
  "Reading a newspaper",
  "Riding some form of public transportation",
  "Attending a court in session",
  "Talking to a church official",
  "Going to a movie",
  "Visiting your own home or living quarters",
] as const;
const ASSIGNMENT_OUTRO = "By the way, since the Simulation Controller will be doing so much data-crunching on the fly, it appears the simulation will run in real time -- a minute there will approximately equal a minute here. Well, good luck!\"";
const SECURITY_SHELL = "Simulation Mode is a Class One Security mode. For access, enter the Security Code corresponding to:";
const SECURITY_COLORS = new Set([
  "WHITE", "DARK GREEN", "DARK BLUE", "PINK", "ORANGE", "PURPLE", "TAN", "AQUA",
  "LIGHT BLUE", "LIGHT GREEN", "LIGHT GRAY", "YELLOW", "BLACK", "DARK GRAY", "BROWN", "RED",
]);
const SECURITY_INNER = new Set([89, 61, 50, 18, 29, 82, 46, 77, 27, 68, 22, 95, 40, 58, 15, 86, 28, 33, 94, 11, 64, 98, 34, 49, 60, 16, 85, 52, 37, 53, 93, 91]);

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

const currentLineTurnBoundary = (presentation: BridgePresentation | null) => {
  if (!presentation || presentation.version !== 3 || presentation.activeInput?.kind !== "line") return null;
  const end = presentation.activeInput.line;
  if (end === null || end !== presentation.terminalLine || end !== presentation.lines.length - 1) return null;
  if (!presentation.activeInput.classes.includes("Input") || !presentation.activeInput.classes.includes("LineInput")) return null;
  const commandIndex = presentation.lines.slice(0, end).findLastIndex((line) => {
    const text = clean(line.text);
    return /^>\s*\S/.test(text) || line.runs.some((run) => run.classes.some((name) => INPUT_STYLE_PATTERN.test(name)));
  });
  return commandIndex < 0 ? null : { commandIndex, end };
};

// Release 79 emits these nine indented leaves between two exact prose leaves.
// Treating the leaves independently would erase the only observed list boundary.
export const assignmentBriefPresentation = (presentation: BridgePresentation | null, locale: Locale): StoryPresentationBlock[] | null => {
  const boundary = currentLineTurnBoundary(presentation);
  if (!boundary || !presentation) return null;
  const { commandIndex, end } = boundary;
  if (commandText(presentation.lines[commandIndex].text).replace(/^>\s*/, "") !== "WAIT") return null;
  const texts = presentation.lines.map((line) => clean(line.text));
  const introIndex = texts.indexOf(ASSIGNMENT_INTRO, commandIndex + 1);
  if (introIndex < 0) return null;
  const itemIndexes = ASSIGNMENTS.map((_, offset) => introIndex + offset + 1);
  const observedItemsMatch = ASSIGNMENTS.every((item, offset) => {
    const line = presentation.lines[itemIndexes[offset]];
    const rawText = `   ${item}`;
    return line?.text === rawText
      && line.runs.length === 1
      && line.runs[0].text === rawText
      && line.runs[0].tag === "span"
      && line.runs[0].classes.length === 1
      && line.runs[0].classes[0] === "Style_normal";
  });
  if (!observedItemsMatch) return null;
  const outroIndex = introIndex + ASSIGNMENTS.length + 1;
  if (texts[outroIndex] !== ASSIGNMENT_OUTRO) return null;

  const blocks: StoryPresentationBlock[] = [{ kind: "command", text: "WAIT", canonicalText: "WAIT", sourceLines: [commandIndex] }];
  for (let sourceLine = commandIndex + 1; sourceLine < end; sourceLine += 1) {
    if (sourceLine === introIndex + 1) {
      const canonicalItems = [...ASSIGNMENTS];
      blocks.push({
        kind: "list", text: canonicalItems.join("\n"), items: canonicalItems,
        canonicalText: canonicalItems.join("\n"), canonicalItems, sourceLines: itemIndexes,
      });
      sourceLine = itemIndexes.at(-1)!;
      continue;
    }
    if (!texts[sourceLine] && blank(presentation.lines[sourceLine])) {
      blocks.push(spacer(sourceLine));
      continue;
    }
    if (!texts[sourceLine]) continue;
    const translation = observedStoryLeafTranslation(texts[sourceLine], locale, "WAIT");
    blocks.push({
      kind: "prose", text: translation?.text ?? texts[sourceLine], canonicalText: texts[sourceLine],
      contentId: translation?.contentId, sourceLines: [sourceLine],
    });
  }
  return blocks;
};

// The live textarea remains Parchment-owned. This projection represents only
// the exact static shell and its two canonical challenge fields; it never has
// a slot for the derived outer answer.
export const securityPromptPresentation = (presentation: BridgePresentation | null, locale: Locale): StoryPresentationBlock[] | null => {
  const boundary = currentLineTurnBoundary(presentation);
  if (!boundary || !presentation) return null;
  const { commandIndex, end } = boundary;
  if (end !== commandIndex + 1 || commandText(presentation.lines[commandIndex].text).replace(/^>\s*/, "") !== "ENTER SIMULATION MODE") return null;
  const line = presentation.lines[end];
  const inputRuns = line.runs.filter((run) => run.classes.includes("Input") || run.classes.includes("LineInput"));
  if (inputRuns.length !== 1 || inputRuns[0].tag !== "textarea" || inputRuns[0].text !== "") return null;
  const canonicalSurface = clean(line.runs.filter((run) => run !== inputRuns[0]).map((run) => run.text).join(""));
  const match = canonicalSurface.match(new RegExp(`^${SECURITY_SHELL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} ([A-Z ]+) (\\d+) >$`));
  if (!match) return null;
  const color = match[1].trim();
  const innerNumber = Number(match[2]);
  if (!SECURITY_COLORS.has(color) || !SECURITY_INNER.has(innerNumber)) return null;
  // Japanese copy is intentionally deferred to Issue #49. Keeping this field
  // separate makes that catalog addition data-only without changing identity.
  const shell = localizeStoryTranscript(SECURITY_SHELL, locale);
  return [
    { kind: "command", text: "ENTER SIMULATION MODE", canonicalText: "ENTER SIMULATION MODE", sourceLines: [commandIndex] },
    {
      kind: "security-prompt", text: shell, canonicalText: SECURITY_SHELL,
      securityChallenge: { color, innerNumber }, sourceLines: [end],
    },
  ];
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
  const responseText = response.map((line) => clean(line.text)).join("\n");
  if (responseText.includes("list of things to record:") || responseText.includes("Security Code corresponding to:")) return null;
  const translations = response.map((line) => observedStoryLeafTranslation(clean(line.text), locale, command));
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
    const kind = translation?.kind === "title" || semanticClasses.some((name) => HEADING_STYLE_PATTERN.test(name)) ? "title" : "prose";
    blocks.push({ kind, text: translation?.text ?? canonicalText, canonicalText, contentId: translation?.contentId, sourceLines: [sourceLine] });
  });
  return blocks;
};

// Preserve the richer, evidence-backed passage projections first. The generic
// prototype is deliberately last so catalog leaf matches cannot supersede them.
export const storyPresentation = (presentation: BridgePresentation | null, locale: Locale) => openingPresentation(presentation, locale)
  ?? initialLineTurnPresentation(presentation, locale)
  ?? assignmentBriefPresentation(presentation, locale)
  ?? securityPromptPresentation(presentation, locale)
  ?? observedOrdinaryTurnPresentation(presentation, locale);
