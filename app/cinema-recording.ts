import type { BridgePresentation } from "./story-presentation.ts";

// Auxiliary checklist evidence, never a VM flag, ticket inventory or capacity.
export type CinemaRecordingState = { complete: boolean; recording: boolean; seenTurns: string[] };
export const createCinemaRecordingState = (): CinemaRecordingState => ({ complete: false, recording: false, seenTurns: [] });
const MOVIE = 'You begin watching "Upbeat Patrol II," which is funny and fast-moving like the prequel, but seems to lack some of the originality and freshness. The soundtrack, locations, and special effects are all top notch. After about fifteen minutes, you decide you\'ve seen enough, and head out to the lobby.';
const ENTRY = "The usher takes your ticket and you step into the darkened theatre and find an empty seat.";

export function observeCinemaRecording(previous: CinemaRecordingState, observation: {
  eligible: boolean; roomId?: string; hasStatus: boolean; recording: boolean;
  acceptsInput: boolean; presentation: BridgePresentation | null;
}): CinemaRecordingState {
  const { presentation: p } = observation;
  if (!observation.acceptsInput) return previous;
  const eligible = observation.eligible && observation.roomId === "CINEMA" && observation.hasStatus;
  if (!p || p.version !== 3 || p.activeInput?.kind !== "line" || p.activeInput.line !== p.terminalLine
    || p.terminalLine !== p.lines.length - 1) return { ...previous, recording: false };
  const end = p.activeInput.line;
  const echo = p.lines.slice(0, end).findLastIndex(line => /^>\s*\S/.test(line.text.trim())
    || line.runs.some(run => run.classes.some(name => /Style_input/i.test(name))));
  const id = p.lines[echo]?.id;
  if (!id || !p.lines[end]?.id || id === p.lines[end].id) return { ...previous, recording: false };
  if (previous.seenTurns.includes(id)) return previous;
  const response = p.lines.slice(echo + 1, end).map(line => line.text.trim());
  const complete = eligible && previous.recording && observation.recording
    && /^>\s*IN$/i.test(p.lines[echo].text.trim())
    && response.includes(ENTRY) && response.includes("Movie Theatre") && response.includes(MOVIE)
    && !response.some(line => /Record buffer full|Auto-deactivation|WARNING: Deactivating record feature/i.test(line));
  return { complete: previous.complete || complete, recording: eligible && observation.recording, seenTurns: [...previous.seenTurns, id] };
}
