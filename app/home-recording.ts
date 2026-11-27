import type { BridgePresentation } from "./story-presentation.ts";

// Auxiliary checklist evidence held for the current canonical session.
export type HomeRecordingState = { complete: boolean; recording: boolean; seenTurns: string[] };
type HomeRecordingWindow = HomeRecordingState & { pendingLook?: boolean };

export const createHomeRecordingState = (): HomeRecordingWindow => ({ complete: false, recording: false, seenTurns: [] });
export const HOME_LIVING_ROOM = "This is the large living area of your apartment, with a bedroom to the north and a kitchen to the east. The front door of the apartment, next to the couch on the south wall, is open. A huge window provides a panoramic view to the west.";
export const HOME_FURNISHINGS = "Jill's easel occupies a beautiful, well-lit spot near the window. Her current painting is on the easel. In one corner is the old word processor where you do your writing.";

export const hasStableHomeInput = (p: BridgePresentation | null): p is BridgePresentation & {
  activeInput: { kind: "line"; line: number; classes: string[] };
} => Boolean(p?.version === 3 && p.activeInput?.kind === "line" && p.activeInput.line === p.terminalLine
  && p.terminalLine === p.lines.length - 1 && p.lines[p.terminalLine]?.id && p.lines[p.terminalLine].text.trim() === ">");

export function observeHomeRecording(previous: HomeRecordingWindow, observation: {
  eligible: boolean; roomId?: string; hasStatus: boolean; recording: boolean;
  acceptsInput: boolean; presentation: BridgePresentation | null;
}): HomeRecordingWindow {
  if (!observation.acceptsInput) return previous;
  const { presentation: p } = observation;
  const resetWindow = { complete: previous.complete, recording: false, seenTurns: previous.seenTurns };
  if (!hasStableHomeInput(p)) return resetWindow;

  const end = p.activeInput.line;
  const echo = p.lines.slice(0, end).findLastIndex(line => /^>\s*\S/.test(line.text.trim())
    || line.runs.some(run => run.classes.some(name => /Style_input/i.test(name))));
  const id = p.lines[echo]?.id;
  const command = p.lines[echo]?.text.trim().match(/^>\s*(.+)$/)?.[1].toUpperCase();
  if (!id || !command || id === p.lines[end].id) return resetWindow;

  const inLivingRoom = observation.eligible && observation.hasStatus && observation.roomId === "LIVING-ROOM";
  const stale = previous.seenTurns.includes(id);
  if (!inLivingRoom) return stale ? resetWindow : { ...resetWindow, seenTurns: [...previous.seenTurns, id] };
  if (stale) return previous;

  const response = p.lines.slice(echo + 1, end).map(line => line.text);
  const failed = response.some(line => /record buffer (?:is )?full|auto-deactivation|deactivating record feature|not currently active/i.test(line));
  const started = command === "RECORD" && response.includes("Record feature activated.");
  const recording = !failed && observation.recording && (previous.recording || started);
  const pendingLook = recording && !started && (previous.pendingLook || previous.recording && command === "LOOK"
    && response.includes("Living Room") && response.includes(HOME_LIVING_ROOM) && response.includes(HOME_FURNISHINGS));
  const stopped = !failed && previous.recording && command === "RECORD OFF" && !observation.recording
    && response.includes("Record feature deactivated.");
  return {
    complete: previous.complete || Boolean(stopped && previous.pendingLook),
    recording,
    seenTurns: [...previous.seenTurns, id],
    ...(pendingLook ? { pendingLook: true } : {}),
  };
}
