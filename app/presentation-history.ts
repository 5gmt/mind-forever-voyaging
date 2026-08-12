import { storyPresentation, type BridgePresentation, type StoryPresentationBlock } from "./story-presentation.ts";
import type { Locale } from "./localization.ts";

export type PresentationHistoryEntry = {
  id: string;
  presentation: BridgePresentation;
};

export type PresentationHistory = PresentationHistoryEntry[];

const clean = (value: string) => value.replace(/\u00a0/g, " ").replace(/\r/g, "").trim();

const observationId = (presentation: BridgePresentation) => {
  const inputLine = presentation.activeInput?.line;
  const stableId = inputLine == null ? null : presentation.lines[inputLine]?.id;
  if (stableId) return stableId;
  return presentation.lines
    .map((line) => `${clean(line.text)}|${line.classes.join(".")}`)
    .join("\n");
};

const isSafeObservation = (presentation: BridgePresentation | null): presentation is BridgePresentation =>
  Boolean(presentation
    && (presentation.version === 2 || presentation.version === 3)
    && presentation.activeInput
    && presentation.activeInput.line !== null
    && presentation.activeInput.line === presentation.terminalLine);

export const reconcilePresentationHistory = (
  previous: PresentationHistory,
  presentation: BridgePresentation | null,
): PresentationHistory => {
  if (!isSafeObservation(presentation)) return previous;
  const localized = storyPresentation(presentation, "ja");
  const fallback = fallbackTurnPresentation(presentation);
  if (!localized && !fallback) return previous;

  const id = observationId(presentation);
  if (previous.some((entry) => entry.id === id)) return previous;
  const pristineOpening = presentation.activeInput?.kind === "char" && Boolean(localized);
  return [...(pristineOpening ? [] : previous), { id, presentation }];
};

export const fallbackTurnPresentation = (
  presentation: BridgePresentation,
): StoryPresentationBlock[] | null => {
  if (presentation.activeInput?.kind !== "line" || presentation.activeInput.line === null) return null;
  const end = presentation.activeInput.line;
  const lines = presentation.lines.slice(0, end);
  const commandIndex = lines.findLastIndex((line) => {
    const text = clean(line.text);
    return /^>\s*\S/.test(text)
      || line.runs.some((run) => run.classes.some((name) => /Style_input/i.test(name)));
  });
  if (commandIndex < 0) return null;
  const rawCommand = clean(lines[commandIndex].text).replace(/^>\s*/, "");
  if (!rawCommand) return null;
  const response = lines.slice(commandIndex + 1).map((line) => clean(line.text)).filter(Boolean).join("\n");
  const blocks: StoryPresentationBlock[] = [{
    kind: "command", text: rawCommand.toUpperCase(), canonicalText: rawCommand,
    sourceLines: [commandIndex],
  }];
  if (response) blocks.push({
    kind: "prose", text: response, canonicalText: response,
    sourceLines: Array.from({ length: end - commandIndex - 1 }, (_, index) => commandIndex + index + 1),
  });
  return blocks;
};

export const projectPresentationHistory = (
  history: PresentationHistory,
  locale: Locale,
): Array<{ entryId: string; blocks: StoryPresentationBlock[] }> => history.map((entry) => ({
  entryId: entry.id,
  blocks: storyPresentation(entry.presentation, locale)
    ?? fallbackTurnPresentation(entry.presentation)
    ?? [],
})).filter((entry) => entry.blocks.length > 0);
