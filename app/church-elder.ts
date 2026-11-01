import type { BridgePresentation } from "./story-presentation";

// Session-only evidence for this one actor. Canonical Release 79 remains the
// authority; none of these fields represents a VM flag or an assignment result.
export const CHURCH_ELDER_PRESENCE = "You suddenly notice a church elder, pacing around at the other end of the building.";
export const CHURCH_ELDER_CONVERSATION = "You have a brief chat with the church elder, who smiles and comments on how happy he is about the recent increase in church attendance, which he attributes to an improving national moral climate. Suddenly he glances at his watch, mumbles a polite parting message, and hurries away.";

export type ChurchElderState = Readonly<{
  present: boolean;
  completed: boolean;
  seenPresenceIds: readonly string[];
}>;

export const createChurchElderState = (): ChurchElderState => ({ present: false, completed: false, seenPresenceIds: [] });

export const churchEchoId = (presentation: BridgePresentation | null): string | undefined => {
  if (presentation?.version !== 3 || presentation.activeInput?.kind !== "line") return undefined;
  if (!presentation.activeInput.classes?.includes("Input") || !presentation.activeInput.classes.includes("LineInput")) return undefined;
  const end = presentation.activeInput.line;
  if (end === null || end !== presentation.terminalLine || end !== presentation.lines.length - 1
    || !presentation.lines[end]?.id || presentation.lines[end].text.trim() !== ">") return undefined;
  const echo = presentation.lines.slice(0, end).findLast((line) => /^>\s*\S/.test(line.text.trim()));
  return echo?.id !== presentation.lines[end].id ? echo?.id : undefined;
};

type ChurchElderReport = {
  eligible: boolean;
  roomId: string | null | undefined;
  inputKind: string | null | undefined;
  acceptsInput: boolean | undefined;
  hasStatus: boolean;
  turnId: string | undefined;
  command: string;
  response: string;
};

export const observeChurchElder = (state: ChurchElderState, report: ChurchElderReport): ChurchElderState => {
  const absent = () => state.present ? { ...state, present: false } : state;
  if (!report.eligible || report.roomId !== "ST-MICHAELS" || report.inputKind !== "line"
    || typeof report.acceptsInput !== "boolean" || !report.hasStatus) return absent();
  // A busy event disables both controls; do not erase a valid visit merely
  // because RECORD is still processing and its next input has not arrived.
  if (!report.acceptsInput) return state;
  if (!report.turnId) return absent();
  const leaves = report.response.split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim());
  if (leaves.includes(CHURCH_ELDER_CONVERSATION)) return { ...state, present: false, completed: true };
  // This source-known departure is a negative guard only, never translated
  // prose or evidence that the conversation has taken place.
  if (leaves.includes("The church official wanders off.")) return absent();
  if (state.completed) return absent();
  if (leaves.includes(CHURCH_ELDER_PRESENCE)) {
    if (state.seenPresenceIds.includes(report.turnId)) return state;
    return { ...state, present: true, seenPresenceIds: [...state.seenPresenceIds, report.turnId] };
  }
  if (/^look$/i.test(report.command.trim())) return absent();
  return state;
};
