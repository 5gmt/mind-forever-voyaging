import { storyPresentation, type BridgePresentation, type StoryPresentationBlock } from "./story-presentation.ts";
import type { Locale } from "./localization.ts";

export type PresentationHistoryEntry = {
  id: string;
  presentation: BridgePresentation;
  // Resolved room captured by the host from raw mode/year/session observations.
  // It belongs to this history entry, not the currently selected locale.
  cityHall2041?: string;
};

export type PresentationHistory = PresentationHistoryEntry[];
export type PresentationReconciliation = {
  history: PresentationHistory;
  representable: boolean;
};

const clean = (value: string) => value.replace(/\u00a0/g, " ").replace(/\r/g, "").trim();

const observationId = (presentation: BridgePresentation) => {
  const inputLine = presentation.activeInput?.line;
  const stableId = inputLine == null ? null : presentation.lines[inputLine]?.id;
  if (stableId) return stableId;
  return presentation.lines
    .map((line) => `${clean(line.text)}|${line.classes.join(".")}`)
    .join("\n");
};

const observationRichness = (presentation: BridgePresentation) => presentation.lines.reduce(
  (score, line) => score + (clean(line.text) ? 1 : 0) + (/^\*\s*PART I\s*\*$/i.test(clean(line.text)) ? 100 : 0),
  0,
);

const isSafeObservation = (presentation: BridgePresentation | null): presentation is BridgePresentation =>
  Boolean(presentation
    && (presentation.version === 2 || presentation.version === 3)
    && presentation.activeInput
    && presentation.activeInput.line !== null
    && presentation.activeInput.line === presentation.terminalLine);

export const reconcilePresentationHistory = (
  previous: PresentationHistory,
  presentation: BridgePresentation | null,
  scope: { cityHall2041?: string } = {},
): PresentationReconciliation => {
  if (!isSafeObservation(presentation)) return { history: previous, representable: false };
  const localized = storyPresentation(presentation, "ja");
  const fallback = fallbackTurnPresentation(presentation);
  if (!localized && !fallback) return { history: previous, representable: false };

  const id = observationId(presentation);
  const existingIndex = previous.findIndex((entry) => entry.id === id);
  if (existingIndex >= 0) {
    if (observationRichness(presentation) <= observationRichness(previous[existingIndex].presentation)) return { history: previous, representable: true };
    return {
      history: previous.map((entry, index) => index === existingIndex ? { ...entry, presentation } : entry),
      representable: true,
    };
  }
  const pristineOpening = presentation.activeInput?.kind === "char" && Boolean(localized);
  // RESTORE hands timeline selection back to canonical Parchment. Its result
  // cannot safely inherit display entries from the pre-restore timeline, so
  // discard that disposable cache and rebuild from canonical observations.
  const restoreBoundary = fallback?.[0]?.kind === "command"
    && /^RESTORE$/i.test(fallback[0].canonicalText ?? fallback[0].text);
  return {
    history: [...(pristineOpening || restoreBoundary ? [] : previous), { id, presentation, ...(scope.cityHall2041 ? { cityHall2041: scope.cityHall2041 } : {}) }],
    representable: true,
  };
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

const CITY_HALL_COPY_ROOMS: Record<string, string> = {
  "part1.simulation.city-hall.plaza-heading": "ROCKVIL-CENTRE",
  "part1.simulation.city-hall.plaza": "ROCKVIL-CENTRE",
  "part1.simulation.city-hall.heading": "CITY-HALL",
  "part1.simulation.city-hall.building": "CITY-HALL",
  "part1.simulation.city-hall.presence": "CITY-HALL",
  "part1.simulation.city-hall.conversation": "CITY-HALL",
  "part1.simulation.city-hall.return": "MAIN-AND-KENNEDY",
};

export const projectPresentationHistory = (
  history: PresentationHistory,
  locale: Locale,
): Array<{ entryId: string; blocks: StoryPresentationBlock[] }> => history.map((entry) => ({
  entryId: entry.id,
  blocks: (storyPresentation(entry.presentation, locale)
    ?? fallbackTurnPresentation(entry.presentation)
    ?? []).map((block) => block.contentId?.startsWith("part1.simulation.city-hall.")
      && entry.cityHall2041 !== CITY_HALL_COPY_ROOMS[block.contentId]
      ? { ...block, text: block.canonicalText ?? block.text }
      : block),
})).filter((entry) => entry.blocks.length > 0);
