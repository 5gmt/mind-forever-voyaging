"use client";

/* eslint-disable @next/next/no-img-element -- package thumbnails are scans, not responsive artwork */

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { INTERFACE_PORTS, ROCKVIL_LANDMARKS, InterfaceWorkbench, PackageOverlay, RockvilNavigator, SceneActions, hasUsefulSceneAction, type InteractionLevel, type MapRoutePreview, type PackageItem, type RockvilLandmark } from "./StoryTools";
import { WORLD_OBJECTS, WORLD_ROOMS, type WorldObject, type WorldRoom } from "./world-data";
import { uiText, type Locale } from "./localization";
import { projectPresentationHistory, reconcilePresentationHistory, type PresentationHistory } from "./presentation-history";

const BRIDGE_CHANNEL = "amfv:bridge";
const MODES = ["Communications Mode", "Library Mode", "Interface Mode", "Simulation Mode", "Sleep Mode"] as const;
const EVIDENCE_YEARS = [2041, 2051, 2061, 2071, 2081] as const;
const ALL_YEARS = [...EVIDENCE_YEARS, 2091] as const;
const SHARE_URL = "https://mind-forever-voyaging.netlify.app/";
const SHARE_TEXT = "Experience Steve Meretzky’s complete 1985 interactive novel in a modern browser edition.";
type FieldworkView = "map" | "brief";

const SECURITY_COLORS = [
  "WHITE", "DARK GREEN", "DARK BLUE", "PINK", "ORANGE", "PURPLE", "TAN", "AQUA",
  "LIGHT BLUE", "LIGHT GREEN", "LIGHT GRAY", "YELLOW", "BLACK", "DARK GRAY", "BROWN", "RED",
] as const;
const SECURITY_INNER = [89, 61, 50, 18, 29, 82, 46, 77, 27, 68, 22, 95, 40, 58, 15, 86, 28, 33, 94, 11, 64, 98, 34, 49, 60, 16, 85, 52, 37, 53, 93, 91] as const;
const SECURITY_OUTER = [12, 66, 73, 36, 90, 41, 19, 48, 62, 92, 55, 23, 84, 99, 57, 20, 78, 67, 51, 88, 17, 31, 70, 39, 96, 25, 81, 83, 47, 54, 13, 43] as const;
const FIELD_ASSIGNMENTS = [
  "Eat a meal in a restaurant",
  "Talk to a government official",
  "Visit a power-generating facility",
  "Read a newspaper",
  "Ride public transportation",
  "Attend a court in session",
  "Talk to a church official",
  "Go to a movie",
  "Visit your home or living quarters",
] as const;

type Mode = (typeof MODES)[number];
type Panel = "guide" | "context" | "evidence" | "package" | "about" | "debug";
type Phase = "signal" | "awakened" | "origin" | "field" | "comparative" | "witness" | "lockdown" | "epilogue";
type ReadingMode = "serif" | "mono";
type InputKind = "line" | "char";
type Discovery = {
  identityKnown: boolean;
  originKnown: boolean;
  simulationCleared: boolean;
  simulationEntered: boolean;
  partTwo: boolean;
  evidenceAccepted: boolean;
  lockdown: boolean;
  victory: boolean;
};
type Note = { id: string; text: string; quote?: string; year: number | null; room: string | null };

const EMPTY_DISCOVERY: Discovery = {
  identityKnown: false,
  originKnown: false,
  simulationCleared: false,
  simulationEntered: false,
  partTwo: false,
  evidenceAccepted: false,
  lockdown: false,
  victory: false,
};

const DIRECTION_LABELS: Record<string, string> = {
  NORTH: "N", NORTHEAST: "NE", NE: "NE", EAST: "E", SOUTHEAST: "SE", SE: "SE",
  SOUTH: "S", SOUTHWEST: "SW", SW: "SW", WEST: "W", NORTHWEST: "NW", NW: "NW",
  UP: "UP", DOWN: "DN", IN: "IN", OUT: "OUT",
};
const DIRECTION_ARROWS: Record<string, string> = {
  NORTH: "↑", N: "↑", NORTHEAST: "↗", NE: "↗", EAST: "→", E: "→", SOUTHEAST: "↘", SE: "↘",
  SOUTH: "↓", S: "↓", SOUTHWEST: "↙", SW: "↙", WEST: "←", W: "←", NORTHWEST: "↖", NW: "↖",
  UP: "↑", DOWN: "↓", IN: "↳", OUT: "↰",
};

const OUTLET_SOURCE_ROOMS: Record<string, string> = {
  PPCC: "CONTROL-CENTER",
  RCRO: "ROOFTOP",
  PEOF: "OFFICE",
  PCAF: "CAFETERIA",
  MACO: "CORE",
  WNNF: "NEWS",
};

const OBJECTS_BY_ID = new Map(WORLD_OBJECTS.map((object) => [object.id, object]));
const ROOMS_BY_ID = new Map(WORLD_ROOMS.map((candidate) => [candidate.id, candidate]));
const ROOM_NAMES = new Set(WORLD_ROOMS.flatMap((candidate) => [candidate.name, ...candidate.aliases]).map((name) => name.toLowerCase()));
const roomNameForYear = (roomId: string, year: number | null) => {
  const target = ROOMS_BY_ID.get(roomId);
  return (year ? target?.yearNames[String(year)] : null) || target?.name || null;
};
const displayLocationName = (location: string | null | undefined) => location
  ? WORLD_ROOMS.flatMap((candidate) => candidate.aliases).find((alias) => alias.toLowerCase() === location.toLowerCase()) ?? location
  : null;
const belongsToSourceRoom = (object: WorldObject, roomId: string) => {
  const sourceRoom = ROOMS_BY_ID.get(roomId);
  if (sourceRoom?.globals.includes(object.id)) return true;
  let location = object.initialLocation;
  const visited = new Set<string>();
  while (location && !visited.has(location)) {
    if (location === roomId) return true;
    if (location === "LOCAL-GLOBALS") return object.dynamicLocations.includes(roomId) || (object.movesToCurrentRoom && object.flags.includes("ACTORBIT"));
    if (location === "GLOBAL-OBJECTS") return false;
    visited.add(location);
    location = OBJECTS_BY_ID.get(location)?.initialLocation ?? null;
  }
  return false;
};

const actorAppearsPresent = (object: WorldObject, passage: string) => {
  if (!object.flags.includes("ACTORBIT")) return true;
  const withoutHonorificStops = (value: string) => value.replace(/\b(Dr|Mr|Mrs|Ms)\.\s/gi, "$1 ");
  const name = withoutHonorificStops(object.name).replace(/\s+/g, " ").trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sentences = withoutHonorificStops(passage).replace(/\r/g, "").split(/(?<=[.!?])\s+|\n+/);
  const presentVerb = "(?:is|are|stands?|standing|sits?|sitting|waits?|waiting|works?|working|walks?|walking|enters?|entering|arrives?|arriving|approaches?|approaching|comes?|coming|holds?|holding|wears?|wearing|looks?|looking|watches?|watching|talks?|talking|speaks?|speaking|says?|saying|asks?|asking|tells?|telling|yells?|yelling|shouts?|shouting|storms?|storming|tinkers?|tinkering|kneels?|kneeling|lies?|lying|leans?|leaning|smiles?|smiling|frowns?|frowning|nods?|nodding|turns?|turning|paces?|pacing|hands?|handing)";
  const arrivalVerb = "(?:walks?|enters?|arrives?|approaches?|comes?|appears?|returns?)";
  return sentences.some((sentence) => {
    if (!new RegExp(`(^|\\W)${name}(?=$|\\W)`, "i").test(sentence)) return false;
    return new RegExp(`(?:\\b(?:you(?:\\s+[a-z-]+){0,3}\\s+(?:see|spot|notice|recognize)|there (?:is|are))\\b[^.!?]*${name}|${name}[^.!?]*\\b${presentVerb}\\b|\\b${arrivalVerb}\\b[^.!?]*${name})`, "i").test(sentence);
  });
};

const actorHasDeparted = (object: WorldObject, transcript: string) => {
  if (!object.flags.includes("ACTORBIT")) return false;
  const withoutHonorificStops = (value: string) => value.replace(/\b(Dr|Mr|Mrs|Ms)\.\s/gi, "$1 ");
  const name = withoutHonorificStops(object.name).replace(/\s+/g, " ").trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const mention = new RegExp(`(^|\\W)${name}(?=$|\\W)`, "i");
  const sentences = withoutHonorificStops(transcript).replace(/\r/g, "").split(/(?<=[.!?])\s+|\n+/);
  const mentionIndex = sentences.findLastIndex((sentence) => mention.test(sentence));
  if (mentionIndex < 0) return false;
  const departurePassage = `${sentences[mentionIndex]} ${sentences[mentionIndex + 1] || ""}`;
  return /\b(?:leaves?|left|departs?|exits?|disappears?|vanishes?|(?:walks?|hurr(?:y|ies|ied)|runs?|rushes?|trots?|stomps?|heads?|goes?|drives?)\s+(?:away|out|off))\b/i.test(departurePassage);
};

type WalkingStep = { command: string; targetId: string; target: string };
const walkingRoute = (fromId: string | null | undefined, toId: string, year: number | null): WalkingStep[] | null => {
  if (!fromId) return null;
  if (fromId === toId) return [];
  const queue: Array<{ id: string; steps: WalkingStep[] }> = [{ id: fromId, steps: [] }];
  const seen = new Set([fromId]);
  while (queue.length) {
    const current = queue.shift()!;
    const source = ROOMS_BY_ID.get(current.id);
    if (!source) continue;
    for (const exit of Object.values(source.exits)) {
      if (seen.has(exit.targetId)) continue;
      const steps = [...current.steps, { ...exit, target: roomNameForYear(exit.targetId, year) || exit.target }];
      if (exit.targetId === toId) return steps;
      seen.add(exit.targetId);
      queue.push({ id: exit.targetId, steps });
    }
  }
  return null;
};

const MODE_COPY: Record<Mode, { label: string; copy: string }> = {
  "Communications Mode": {
    label: "Communications",
    copy: "Choose an outlet to see and hear that location. DISPLAY OUTLETS repeats the current directory.",
  },
  "Library Mode": {
    label: "Library",
    copy: "Move through directories with Previous and Next. Open a directory, read a file, close it, or return when you are done.",
  },
  "Interface Mode": {
    label: "System interfaces",
    copy: "Request a status report from any connected system. Some controllers also accept settings and schedules.",
  },
  "Simulation Mode": {
    label: "Rockvil",
    copy: "Walk the city, speak to people, read what they read, and use RECORD when an experience matters.",
  },
  "Sleep Mode": {
    label: "Sleep",
    copy: "Time passes while background work continues. Return to Communications Mode whenever you are ready.",
  },
};

const phaseFor = (discovery: Discovery): Phase => {
  if (discovery.victory) return "epilogue";
  if (discovery.lockdown) return "lockdown";
  if (discovery.evidenceAccepted) return "witness";
  if (discovery.partTwo) return "comparative";
  if (discovery.simulationEntered) return "field";
  if (discovery.originKnown) return "origin";
  if (discovery.identityKnown) return "awakened";
  return "signal";
};

const progressFromTranscript = (previous: Discovery, transcript: string): Discovery => {
  const lower = transcript.toLowerCase();
  const qaPartTwo = lower.includes("part ii and all evidence simulations unlocked");
  const qaEvidence = lower.includes("preparing the successful evidence review");
  const qaVictory = lower.includes("preparing the victory and epilogue");
  const qaLater = qaPartTwo || qaEvidence || qaVictory;
  return {
    identityKnown: previous.identityKnown || qaLater || /you are a computer|immobile computer|sentient computer|thinking machine/.test(lower),
    originKnown: previous.originKnown || qaLater || lower.includes("your life was merely a simulation whose purpose was to instill"),
    simulationCleared: previous.simulationCleared || qaLater || lower.includes("programming team has finished entering the parameters for the plan") || lower.includes("simulation mode at any time"),
    simulationEntered: previous.simulationEntered || qaEvidence || qaVictory || /this simulation is based \d+ years hence/.test(lower),
    partTwo: previous.partTwo || qaLater || lower.includes("* part ii *") || lower.includes("simulations are available"),
    evidenceAccepted: previous.evidenceAccepted || qaEvidence || lower.includes("your findings were valid; that the plan must be cancelled"),
    lockdown: previous.lockdown || lower.includes("nobody leaves, no communications at all") || lower.includes("communications blackout"),
    victory: previous.victory || qaVictory || lower.includes("the plan is dead in the water"),
  };
};

const normalizeCommand = (raw: string) => {
  const command = raw.trim().replace(/\s+/g, " ");
  const lower = command.toLowerCase();
  const exact: Record<string, string> = {
    "go north": "north", "go south": "south", "go east": "east", "go west": "west",
    "go northeast": "northeast", "go northwest": "northwest", "go southeast": "southeast", "go southwest": "southwest",
    "look around": "look", "show inventory": "inventory", "check inventory": "inventory",
    "where am i": "look", "stop recording": "record off", "show outlets": "display outlets",
  };
  if (exact[lower]) return exact[lower];
  if (lower.startsWith("pick up ")) return `take ${command.slice(8)}`;
  if (lower.startsWith("go into ")) return `enter ${command.slice(8)}`;
  if (lower.startsWith("go to the ")) return `walk to ${command.slice(10)}`;
  if (lower.startsWith("go to ")) return `walk to ${command.slice(6)}`;
  return command;
};

const detectMode = (status: string, transcript: string, fallback: Mode | null): Mode | null => {
  const lowerTranscript = transcript.toLowerCase();
  const normalizedStatus = status.toLowerCase();
  const statusMode = MODES.find((candidate) => normalizedStatus.includes(candidate.toLowerCase())) || null;
  let latest = -1;
  let selected = fallback;
  for (const candidate of MODES) {
    const entered = lowerTranscript.lastIndexOf(`entered ${candidate.toLowerCase()}`);
    const nowIn = lowerTranscript.lastIndexOf(`now in ${candidate.toLowerCase()}`);
    const position = Math.max(entered, nowIn);
    if (position > latest) { latest = position; selected = candidate; }
  }
  const statusEntry = statusMode ? lowerTranscript.lastIndexOf(`>enter ${statusMode.toLowerCase()}`) : -1;
  if (statusMode && statusEntry > latest) return statusMode;
  // During a one-key menu the status bar can still show the room we just left.
  // The story's most recent explicit transition is authoritative in that brief interval.
  if (latest >= 0) return selected;
  if (statusMode) return statusMode;
  return selected;
};

const detectYear = (status: string, recentText: string, fallback: number | null) => {
  for (const candidate of [...ALL_YEARS].reverse()) if (new RegExp(`\\b${candidate}\\b`).test(status)) return candidate;
  const matches = [...recentText.matchAll(/This simulation is based (\d+) years hence\./gi)];
  if (matches.length) return 2031 + Number(matches.at(-1)?.[1]);
  return fallback;
};

const detectAvailableYears = (transcript: string, previous: number[]) => {
  const years = new Set(previous);
  const lower = transcript.toLowerCase();
  if (lower.includes("part ii and all evidence simulations unlocked")) EVIDENCE_YEARS.forEach((year) => years.add(year));
  const matches = [...transcript.matchAll(/simulations are available for ([^.]+) years in the future/gi)];
  const latest = matches.at(-1)?.[1] || "";
  for (const amount of latest.match(/\d+/g) || []) years.add(2031 + Number(amount));
  return [...years].filter((year) => ALL_YEARS.includes(year as (typeof ALL_YEARS)[number])).sort();
};

const detectRoom = (status: string, previous: WorldRoom | null, lastCommand: string, recentText: string): WorldRoom | null => {
  const normalizedStatus = status.toLowerCase();
  const locationMatch = status.match(/Location:\s*([\s\S]*?)(?:Date:|$)/i);
  const locationName = locationMatch?.[1].replace(/\s+/g, " ").trim().toLowerCase();
  const candidates = WORLD_ROOMS.filter((candidate) => {
    const names = [candidate.name, ...candidate.aliases].map((name) => name.toLowerCase());
    return locationName ? names.includes(locationName) : names.some((name) => normalizedStatus.includes(name));
  });
  if (candidates.length === 1) return candidates[0];
  if (candidates.length > 1 && previous) {
    const direction = Object.keys(previous.exits).find((key) => previous.exits[key].command === lastCommand.toLowerCase());
    const targetId = direction ? previous.exits[direction].targetId : null;
    const resolved = candidates.find((candidate) => candidate.id === targetId);
    if (resolved) return resolved;
  }
  if (candidates.length > 1) {
    const scene = recentText.toLowerCase();
    const genericPlaceWords = new Set(["tube", "station", "living", "room", "skycar", "rockvil", "street", "avenue"]);
    const resolved = candidates.filter((candidate) => {
      const identityWords = candidate.id.toLowerCase().split("-").filter((word) => word.length > 3 && !genericPlaceWords.has(word));
      const destinationWords = Object.values(candidate.exits).flatMap((exit) => exit.target.toLowerCase().split(/\W+/)).filter((word) => word.length > 4 && !genericPlaceWords.has(word));
      return [...new Set([...identityWords, ...destinationWords])].some((word) => scene.includes(word));
    });
    if (resolved.length === 1) return resolved[0];
  }
  return null;
};

const parseOutlets = (transcript: string) => {
  const outlets: Array<{ name: string; code: string }> = [];
  for (const match of transcript.matchAll(/^\s*([^\n(]{3,}?)\s+\(([A-Z]{4})\)\s*$/gm)) {
    const entry = { name: match[1].trim(), code: match[2] };
    if (!outlets.some((outlet) => outlet.code === entry.code)) outlets.push(entry);
  }
  return outlets.slice(-8);
};

const parseSecurityChallenge = (recentText: string) => {
  const normalized = recentText.replace(/\s+/g, " ");
  const colorPattern = [...SECURITY_COLORS].sort((a, b) => b.length - a.length).join("|");
  const matches = [...normalized.matchAll(new RegExp(`Security Code corresponding to:\\s*(${colorPattern})\\s+(\\d+)`, "gi"))];
  const match = matches.at(-1);
  if (!match || /This simulation is based \d+ years hence|Select simulation year/i.test(normalized.slice(match.index))) return null;
  const color = match[1].trim().toUpperCase();
  const inner = Number(match[2]);
  const colorIndex = SECURITY_COLORS.indexOf(color as (typeof SECURITY_COLORS)[number]);
  const innerIndex = SECURITY_INNER.indexOf(inner as (typeof SECURITY_INNER)[number]);
  if (colorIndex < 0 || innerIndex < 0) return null;
  const answer = SECURITY_OUTER[(2 * colorIndex + innerIndex) % SECURITY_OUTER.length];
  return { color, inner, answer };
};

const concisePassage = (recentText: string) => {
  const lines = recentText.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.filter((line) => !line.startsWith(">") && !/awaiting input/i.test(line)).slice(-3).join(" ").slice(0, 440);
};

const recordedPassages = (transcript: string) => {
  const events = [...transcript.matchAll(/^(?:>\s*([^\r\n]*)|(WARNING: Deactivating record feature\.))/gim)];
  let active = false;
  let cursor = 0;
  const passages: string[] = [];
  for (const event of events) {
    if (active) passages.push(transcript.slice(cursor, event.index));
    const normalized = event[1]?.trim().toLowerCase() ?? "";
    if (normalized === "record" || normalized === "ron") active = true;
    if (normalized === "record off" || normalized === "roff") active = false;
    if (event[2]) active = false;
    cursor = (event.index ?? 0) + event[0].length;
  }
  if (active) passages.push(transcript.slice(cursor));
  return passages.join("\n");
};

// These are the exact moments that set RECORDING-TABLE slots 0..16 in Release 79.
const FIELD_RECORDING_RULES = [
  { tableIndex: 0, pattern: /you order a bowl of hot and sour soup|decide to splurge and buy a beef burger|the waiter places/i },
  { tableIndex: 2, pattern: /cheerily comments on how well things in the city are running|grumpily complains that most of his department has been laid off/i },
  { tableIndex: 4, pattern: /^Power Station\s*$/im },
  { tableIndex: 6, pattern: /headline story in the news section|newspaper is extremely thin/i },
  { tableIndex: 8, pattern: /tubecar glides into a station/i },
  { tableIndex: 10, pattern: /^Courthouse\s*$/im },
  { tableIndex: 12, pattern: /comments on how happy he is about the recent increase in church attendance|complains about the growth of the church of god's word/i },
  { tableIndex: 14, pattern: /you begin watching/i },
  { tableIndex: 16, pattern: /^(?:Living Room|Kitchen|Bedroom|Bathroom)\s*$/im },
] as const;

export default function PrismEdition() {
  const canonicalIframeRef = useRef<HTMLIFrameElement>(null);
  const qaIframeRef = useRef<HTMLIFrameElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const modeRef = useRef<Mode | null>(null);
  const yearRef = useRef<number | null>(null);
  const roomRef = useRef<WorldRoom | null>(null);
  const sceneTextRef = useRef("");
  const sceneCacheRef = useRef(new Map<string, string>());
  const lastCommandRef = useRef("");
  const activeOutletRef = useRef<string | null>(null);
  const visitedYearsRef = useRef<number[]>([]);
  const queueRef = useRef<string[]>([]);
  const lastPackageCueRef = useRef(-1);
  const fieldworkLauncherRef = useRef<HTMLButtonElement>(null);
  const fieldworkCloseRef = useRef<HTMLButtonElement>(null);
  const presentationRef = useRef<HTMLDivElement>(null);
  const followPresentationRef = useRef(true);

  const [introOpen, setIntroOpen] = useState(true);
  const [returning, setReturning] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [acceptsInput, setAcceptsInput] = useState(false);
  const [inputKind, setInputKind] = useState<InputKind>("line");
  const [transcript, setTranscript] = useState("");
  const [recentText, setRecentText] = useState("");
  const [sceneText, setSceneText] = useState("");
  const [gridText, setGridText] = useState("");
  const [liveCanonicalPresentation, setLiveCanonicalPresentation] = useState<PresentationHistory[number]["presentation"] | null>(null);
  const [presentationState, setPresentationState] = useState<{ history: PresentationHistory; recovering: boolean }>({
    history: [], recovering: true,
  });
  const [transcriptRevision, setTranscriptRevision] = useState(0);
  const [mode, setMode] = useState<Mode | null>(null);
  const [statusLocation, setStatusLocation] = useState<string | null>(null);
  const [designationKnown, setDesignationKnown] = useState(false);
  const [knownModes, setKnownModes] = useState<Mode[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [room, setRoom] = useState<WorldRoom | null>(null);
  const [discovery, setDiscovery] = useState<Discovery>(EMPTY_DISCOVERY);
  const [command, setCommand] = useState("");
  const [aliasNotice, setAliasNotice] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [visitedYears, setVisitedYears] = useState<number[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [visitedRooms, setVisitedRooms] = useState<Record<string, number>>({});
  const [activePanel, setActivePanel] = useState<Panel>("guide");
  const [contextOpen, setContextOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [fontScale, setFontScale] = useState(17);
  const [readingMode, setReadingMode] = useState<ReadingMode>("serif");
  const [interactionLevel, setInteractionLevel] = useState<InteractionLevel>("guided");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const [recording, setRecording] = useState(false);
  const [activeOutletCode, setActiveOutletCode] = useState<string | null>(null);
  const [packageItem, setPackageItem] = useState<PackageItem | null>(null);
  const [mapDestinationId, setMapDestinationId] = useState<string | null>(null);
  const [fieldworkOpen, setFieldworkOpen] = useState(false);
  const [fieldworkView, setFieldworkView] = useState<FieldworkView>("map");
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared" | "error">("idle");
  const [noteDraft, setNoteDraft] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [qaWarningOpen, setQaWarningOpen] = useState(false);
  const [qaEnabled, setQaEnabled] = useState(false);
  const [iframeNonce, setIframeNonce] = useState(0);
  const [debugQueue, setDebugQueue] = useState<string[]>([]);
  const [debugMessage, setDebugMessage] = useState("");
  const [localizedHost, setLocalizedHost] = useState<HTMLElement | null>(null);

  const phase = phaseFor(discovery);
  const guide = mode ? MODE_COPY[mode] : { label: "Incoming transmission", copy: "Read the message. When the prompt appears, LOOK repeats your surroundings and HELP lists useful commands." };
  const displayYear = year && ALL_YEARS.includes(year as (typeof ALL_YEARS)[number]) ? year : null;
  const eraIndex = displayYear && EVIDENCE_YEARS.includes(displayYear as (typeof EVIDENCE_YEARS)[number]) ? EVIDENCE_YEARS.indexOf(displayYear as (typeof EVIDENCE_YEARS)[number]) : -1;
  const outlets = useMemo(() => parseOutlets(transcript), [transcript]);
  const securityChallenge = useMemo(() => parseSecurityChallenge(recentText), [recentText]);
  const selectYearPrompt = useMemo(() => {
    const normalized = recentText.replace(/\s+/g, " ").toLowerCase();
    return normalized.lastIndexOf("select simulation year") > normalized.lastIndexOf("this simulation is based");
  }, [recentText]);
  const yearSelectorActive = selectYearPrompt && availableYears.length > 0;
  const roomExits = useMemo(() => Object.entries(room?.exits || {}), [room]);
  const recentRooms = useMemo(() => Object.entries(visitedRooms).sort((a, b) => b[1] - a[1]).slice(0, 12), [visitedRooms]);
  const latestSceneText = useMemo(() => {
    const commands = [...recentText.matchAll(/>[ \t]*[^\r\n]+(?:\r?\n|$)/g)];
    const lastCommand = commands.at(-1);
    return lastCommand?.index === undefined ? recentText : recentText.slice(lastCommand.index + lastCommand[0].length);
  }, [recentText]);
  const contextualObjects = useMemo(() => {
    const passage = `${sceneText}\n${latestSceneText}`;
    const lower = passage.toLowerCase();
    const sourceRoomId = mode === "Communications Mode" && activeOutletCode ? OUTLET_SOURCE_ROOMS[activeOutletCode] : mode === "Simulation Mode" ? room?.id : null;
    if ((mode === "Simulation Mode" || mode === "Communications Mode") && !sourceRoomId) return [];
    const blocked = new Set(["it", "you", "room", "area", "something", "nothing", "object", "number", "time", "story", "mode", "office", "building", "wall", "rockvil", "communications mode", "library mode", "interface mode", "simulation mode", "sleep mode", "list of communication outlets"]);
    const genericSynonyms = new Set(["area", "building", "door", "hall", "man", "office", "people", "person", "room", "street", "thing", "woman"]);
    const mentioned = (object: WorldObject) => {
      const terms = [object.name, ...object.synonyms.filter((word) => word.length >= 4 && !genericSynonyms.has(word))];
      return terms.some((term) => new RegExp(`(^|\\W)${term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=$|\\W)`, "i").test(lower));
    };
    const directlyAvailable = sourceRoomId ? WORLD_OBJECTS.filter((object) => belongsToSourceRoom(object, sourceRoomId)) : [];
    const directIds = new Set(directlyAvailable.map((object) => object.id));
    const relatedIds = new Set(directlyAvailable.filter(mentioned).flatMap((object) => object.relatedObjectIds));
    const found: WorldObject[] = [];
    for (const object of WORLD_OBJECTS) {
      const name = object.name.replace(/\s+/g, " ").trim();
      if (name.length < 3 || name.length > 42 || blocked.has(name.toLowerCase()) || ROOM_NAMES.has(name.toLowerCase()) || !hasUsefulSceneAction(object, sourceRoomId)) continue;
      if (sourceRoomId && !directIds.has(object.id) && !relatedIds.has(object.id)) continue;
      if (!mentioned(object)) continue;
      if (!actorAppearsPresent(object, passage)) continue;
      if (actorHasDeparted(object, recentText)) continue;
      if (WORLD_OBJECTS.some((candidate) => candidate.flags.includes("ACTORBIT") && candidate.removedObjectIds.includes(object.id) && actorHasDeparted(candidate, recentText))) continue;
      const existing = found.find((candidate) => candidate.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        existing.flags = [...new Set([...existing.flags, ...object.flags])];
        existing.synonyms = [...new Set([...existing.synonyms, ...object.synonyms])];
        existing.adjectives = [...new Set([...existing.adjectives, ...object.adjectives])];
        existing.handledVerbs = [...new Set([...existing.handledVerbs, ...object.handledVerbs])];
        existing.verbGroups = [...existing.verbGroups, ...object.verbGroups].filter((group, index, groups) => groups.findIndex((candidate) => candidate.join("|") === group.join("|")) === index);
        existing.actionRooms = [...new Set([...existing.actionRooms, ...object.actionRooms])];
        existing.globalVerbs = [...new Set([...existing.globalVerbs, ...object.globalVerbs])];
        existing.guaranteedVerbs = [...new Set([...existing.guaranteedVerbs, ...object.guaranteedVerbs])];
        existing.refusalOnlyVerbs = [...new Set([...existing.refusalOnlyVerbs, ...object.refusalOnlyVerbs])];
        existing.relatedObjectIds = [...new Set([...existing.relatedObjectIds, ...object.relatedObjectIds])];
        existing.removedObjectIds = [...new Set([...existing.removedObjectIds, ...object.removedObjectIds])];
        for (const [verb, rooms] of Object.entries(object.verbRooms)) existing.verbRooms[verb] = [...new Set([...(existing.verbRooms[verb] ?? []), ...rooms])];
        existing.commandNoun ||= object.commandNoun;
        existing.action ||= object.action;
        existing.hasText ||= object.hasText;
      } else found.push({ ...object, flags: [...object.flags], synonyms: [...object.synonyms], adjectives: [...object.adjectives], handledVerbs: [...object.handledVerbs], verbGroups: object.verbGroups.map((group) => [...group]), actionRooms: [...object.actionRooms], globalVerbs: [...object.globalVerbs], guaranteedVerbs: [...object.guaranteedVerbs], refusalOnlyVerbs: [...object.refusalOnlyVerbs], relatedObjectIds: [...object.relatedObjectIds], removedObjectIds: [...object.removedObjectIds], verbRooms: Object.fromEntries(Object.entries(object.verbRooms).map(([verb, rooms]) => [verb, [...rooms]])) });
    }
    const sorted = found.sort((a, b) => b.name.split(/\s+/).length - a.name.split(/\s+/).length || b.name.length - a.name.length);
    return sorted.filter((object, index) => !sorted.slice(0, index).some((earlier) => new RegExp(`(^|\\W)${object.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=$|\\W)`, "i").test(earlier.name))).slice(0, 14);
  }, [activeOutletCode, latestSceneText, mode, recentText, room?.id, sceneText]);
  const describedDirections = useMemo(() => {
    const lower = sceneText.toLowerCase();
    return ["northeast", "northwest", "southeast", "southwest", "north", "south", "east", "west"]
      .filter((direction) => new RegExp(`\\b${direction}\\b`, "i").test(lower));
  }, [sceneText]);
  const interfacePortIds = useMemo(() => {
    const marker = transcript.lastIndexOf("List of Active Ports:");
    if (marker < 0) return [];
    const list = transcript.slice(marker, marker + 900);
    return INTERFACE_PORTS.filter((port) => port.match.test(list)).map((port) => port.id);
  }, [transcript]);
  const activeOutlet = outlets.find((outlet) => outlet.code === activeOutletCode) || null;
  const mapRoutePreview = useMemo<MapRoutePreview | null>(() => {
    const destination = ROCKVIL_LANDMARKS.find((landmark) => landmark.id === mapDestinationId);
    if (!destination) return null;
    const route = walkingRoute(room?.id, destination.targetId, displayYear);
    if (!route) return { destination, nextCommand: null, nextPlace: null, steps: 0, arrived: false };
    const next = route[0];
    return { destination, nextCommand: next?.command ?? null, nextPlace: next?.target ?? null, steps: route.length, arrived: route.length === 0 };
  }, [displayYear, mapDestinationId, room?.id]);
  const travelOptions = useMemo(() => {
    const options = roomExits.length > 0
      ? roomExits.map(([direction, exit]) => ({ direction, command: exit.command, target: roomNameForYear(exit.targetId, displayYear) || exit.target }))
      : describedDirections.map((direction) => ({ direction: direction.toUpperCase(), command: direction, target: "" }));
    const routeCommand = mapRoutePreview?.nextCommand?.toLowerCase();
    return options
      .map((option) => ({ ...option, routeNext: Boolean(routeCommand && option.command.toLowerCase() === routeCommand) }))
      .sort((a, b) => Number(b.routeNext) - Number(a.routeNext));
  }, [describedDirections, displayYear, mapRoutePreview?.nextCommand, roomExits]);
  const fieldProgress = useMemo(() => {
    const passages = recordedPassages(transcript);
    return FIELD_RECORDING_RULES.map(({ pattern }) => pattern.test(passages));
  }, [transcript]);
  const fieldworkRecordedCount = fieldProgress.filter(Boolean).length;
  const initialFieldworkActive = discovery.simulationEntered && !discovery.partTwo;
  const currentFieldworkLandmark = ROCKVIL_LANDMARKS.find((landmark) => landmark.assignment !== undefined && landmark.targetId === room?.id);
  const currentFieldworkIndex = currentFieldworkLandmark?.assignment;
  const currentFieldworkAssignment = currentFieldworkIndex === undefined ? null : FIELD_ASSIGNMENTS[currentFieldworkIndex];
  const currentFieldworkComplete = currentFieldworkIndex === undefined ? false : fieldProgress[currentFieldworkIndex];
  const yesNoPrompt = useMemo(() => {
    const current = `${latestSceneText}\n${recentText.slice(-1200)}`.replace(/\s+/g, " ").replace(/[>\s]+$/g, "");
    return /(?:do you want|would you like|are you sure|do you wish|shall i|is that (?:okay|correct))[^?]*\?\s*(?:\(y\/n\))?$/i.test(current);
  }, [latestSceneText, recentText]);
  const parserCoach = useMemo(() => {
    if (/i don['’]t know the word|not a verb i recognise|not a verb i recognize/i.test(latestSceneText)) return interactionLevel === "classic" ? "Try a shorter noun or a different verb." : "Try a shorter command, or choose a word mentioned below.";
    if (/you['’]ll have to be more specific|which .* do you mean/i.test(latestSceneText)) return interactionLevel === "classic" ? "Use a more specific noun." : "Choose the exact person or object mentioned below.";
    if (/you can['’]t (?:see|hear) any|not here/i.test(latestSceneText)) return "That is not present now. LOOK repeats your surroundings.";
    return "↑ recalls your previous commands.";
  }, [interactionLevel, latestSceneText]);
  const libraryDiscovered = knownModes.includes("Library Mode") || /\blibrary mode\b/i.test(transcript);
  const interfaceDiscovered = knownModes.includes("Interface Mode") || /\binterface mode\b/i.test(transcript);

  useEffect(() => {
    try {
      // Story capabilities belong to the active interpreter, never to stale wrapper memory.
      for (const key of ["amfv:designation", "amfv:modes", "amfv:years", "amfv:discoveries"]) localStorage.removeItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only session continuity is available after hydration
      setReturning(false);
      setIntroOpen(true);
      setVisitedRooms(JSON.parse(localStorage.getItem("amfv:rooms") || "{}"));
      setCommandHistory(JSON.parse(localStorage.getItem("amfv:history") || "[]"));
      setNotes(JSON.parse(localStorage.getItem("amfv:notes") || "[]"));
      setFontScale(Number(localStorage.getItem("amfv:font-size")) || 17);
      setReadingMode(localStorage.getItem("amfv:reading-mode") === "mono" ? "mono" : "serif");
      const storedInteraction = localStorage.getItem("amfv:interaction-level");
      setInteractionLevel(storedInteraction === "classic" || storedInteraction === "actions" ? storedInteraction : "guided");
      setHighContrast(localStorage.getItem("amfv:contrast") === "true");
      setReduceMotion(localStorage.getItem("amfv:reduce-motion") === "true");
      setLocale(localStorage.getItem("amfv:locale") === "ja" ? "ja" : "en");
    } catch {
      // Storage improves continuity but never blocks the story.
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("amfv:locale", locale); } catch { /* optional */ }
  }, [locale]);

  useEffect(() => {
    const currentLocalizedHost = (frame: HTMLIFrameElement | null) => {
      const buffers = [...(frame?.contentDocument?.querySelectorAll("#gameport .BufferWindow") ?? [])];
      return buffers.at(-1)?.querySelector<HTMLElement>(":scope > #amfv-localized-presentation-host") ?? null;
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.channel !== BRIDGE_CHANNEL) return;
      const activeFrame = qaEnabled ? qaIframeRef.current : canonicalIframeRef.current;
      if (event.source !== activeFrame?.contentWindow) return;
      if (event.data.type === "ready") {
        setLocalizedHost(currentLocalizedHost(activeFrame));
        setPlayerReady(true);
        return;
      }
      if (event.data.type === "localized-host-ready") {
        setLocalizedHost(currentLocalizedHost(activeFrame));
        return;
      }
      if (event.data.type === "busy") { setAcceptsInput(false); return; }
      if (event.data.type === "command" && typeof event.data.command === "string") {
        const entered = event.data.command.trim();
        if (!entered) return;
        // Commands entered directly in the visible canonical iframe bypass
        // postCommand(). RESTORE is still a canonical timeline boundary, so
        // invalidate the disposable display cache on this bridge path too.
        if (!qaEnabled && /^restore$/i.test(entered)) {
          setPresentationState({ history: [], recovering: true });
        }
        if (/^(?:record|ron)$/i.test(entered)) setRecording(true);
        if (/^(?:record off|roff)$/i.test(entered)) setRecording(false);
        lastCommandRef.current = entered;
        if (/^[a-z]{4}$/i.test(entered)) {
          activeOutletRef.current = entered.toUpperCase();
          setActiveOutletCode(entered.toUpperCase());
        }
        setCommandHistory((previous) => {
          const next = previous[0] === entered ? previous : [entered, ...previous].slice(0, 40);
          if (!qaEnabled) try { localStorage.setItem("amfv:history", JSON.stringify(next)); } catch { /* optional */ }
          return next;
        });
        return;
      }
      if (event.data.type !== "transcript") return;
      // Parchment may replace its window tree during startup or rearrange.
      // Rebind the portal target from the same observed lifecycle report.
      setLocalizedHost(currentLocalizedHost(activeFrame));

      const nextTranscript = typeof event.data.text === "string" ? event.data.text : "";
      const nextRecent = typeof event.data.recentText === "string" ? event.data.recentText : nextTranscript.slice(-5000);
      const status = typeof event.data.statusText === "string" ? event.data.statusText : "";
      const freshCanonicalOpening = !qaEnabled && nextTranscript.length < 2000 && nextTranscript.includes("Tomorrow never yet");
      const pristineOpening = nextTranscript.includes("Tomorrow never yet") && /Hit\s+any\s+key\s+to\s+continue/i.test(nextTranscript);
      const priorMode = modeRef.current;
      const nextMode = freshCanonicalOpening ? null : detectMode(status, nextTranscript, priorMode);
      const nextYear = nextMode === "Simulation Mode" ? detectYear(status, nextRecent, yearRef.current) : null;
      const locationMatch = status.match(/Location:\s*([\s\S]*?)(?:Date:|$)/i);
      const nextStatusLocation = locationMatch?.[1].replace(/\s+/g, " ").trim();
      const priorRoom = roomRef.current;
      const nextRoom = nextMode === "Simulation Mode" ? detectRoom(status, priorRoom, lastCommandRef.current, nextRecent) : null;
      const displayedStatusLocation = nextStatusLocation && nextStatusLocation.toLowerCase() !== "(undefined)"
        ? displayLocationName(nextStatusLocation)
        : null;

      modeRef.current = nextMode;
      yearRef.current = nextYear;
      roomRef.current = nextRoom;
      if (freshCanonicalOpening) {
        lastPackageCueRef.current = -1;
        visitedYearsRef.current = [];
        setDesignationKnown(false);
        setKnownModes([]);
        setVisitedYears([]);
        setAvailableYears([]);
        setVisitedRooms({});
        setNotes([]);
        setCommandHistory([]);
        setRecording(false);
        setActiveOutletCode(null);
        activeOutletRef.current = null;
        sceneTextRef.current = "";
        sceneCacheRef.current.clear();
        setSceneText("");
        try {
          for (const key of ["amfv:designation", "amfv:modes", "amfv:years", "amfv:rooms", "amfv:discoveries", "amfv:notes", "amfv:history"]) localStorage.removeItem(key);
        } catch { /* optional */ }
      }
      setPlayerReady(true);
      setReturning(nextTranscript.length > 0 && !pristineOpening);
      setTranscript(nextTranscript);
      const packageCues: Array<{ index: number; item: PackageItem }> = [
        { index: nextTranscript.lastIndexOf("This is the map that you'll find in your"), item: "map" },
        { index: nextTranscript.lastIndexOf("This is the decoder that you'll find in your"), item: "decoder" },
        { index: nextTranscript.lastIndexOf("This is the magazine article that you'll find in your"), item: "manual" },
      ];
      const latestPackageCue = packageCues.sort((a, b) => b.index - a.index)[0];
      if (latestPackageCue.index > lastPackageCueRef.current) {
        lastPackageCueRef.current = latestPackageCue.index;
        setPackageItem(latestPackageCue.item);
      }
      if (nextTranscript.includes("PRISM")) {
        setDesignationKnown(true);
      }
      setRecentText(nextRecent);
      const recentCommands = [...nextRecent.matchAll(/>[ \t]*([^\r\n]+)(?:\r?\n|$)/g)];
      const recentCommand = recentCommands.at(-1);
      const responseAfterCommand = recentCommand?.index === undefined ? nextRecent : nextRecent.slice(recentCommand.index + recentCommand[0].length);
      const enteredCommand = lastCommandRef.current.trim().toLowerCase();
      const enteredOutlet = parseOutlets(nextTranscript).find((outlet) => outlet.code.toLowerCase() === enteredCommand)?.code ?? null;
      const sceneChanged = Boolean(nextRoom && nextRoom.id !== priorRoom?.id)
        || /^(?:n|s|e|w|u|d|ne|nw|se|sw|north|south|east|west|up|down|in|out)$/.test(enteredCommand)
        || Boolean(enteredOutlet)
        || /^(?:enter|walk)\b/.test(enteredCommand)
        || /this simulation is based \d+ years hence/i.test(responseAfterCommand);
      const sceneKey = nextMode === "Communications Mode" && (enteredOutlet || activeOutletRef.current)
        ? `comm:${enteredOutlet || activeOutletRef.current}`
        : nextMode === "Simulation Mode"
          ? `sim:${nextYear || "?"}:${nextRoom?.id || nextStatusLocation || "?"}`
          : nextMode || "opening";
      // Keep the establishing passage stable. Follow-up replies often contain metaphors
      // or references to absent things; those must never become clickable suggestions.
      if (freshCanonicalOpening || sceneChanged || enteredCommand === "look" || !sceneTextRef.current) {
        const response = responseAfterCommand.trim();
        const cached = sceneCacheRef.current.get(sceneKey);
        const responseHasDescription = response.length >= 80 || enteredCommand === "look" || !cached;
        sceneTextRef.current = responseHasDescription ? response : cached;
        if (responseHasDescription && response) sceneCacheRef.current.set(sceneKey, response);
      }
      setSceneText(sceneTextRef.current);
      setGridText(typeof event.data.gridText === "string" ? event.data.gridText : "");
      const nextPresentation = [2, 3].includes(event.data.presentation?.version) && Array.isArray(event.data.presentation.lines)
        ? event.data.presentation
        : null;
      // Ignore transient reports while the interpreter is processing. A
      // stable active input can be projected or can deliberately request
      // canonical recovery (for example an unsupported character prompt).
      if (!qaEnabled && event.data.acceptsInput) {
        setLiveCanonicalPresentation(nextPresentation);
        setPresentationState((previous) => {
          const reconciliation = reconcilePresentationHistory(previous.history, nextPresentation);
          return { history: reconciliation.history, recovering: !reconciliation.representable };
        });
      }
      setTranscriptRevision((revision) => revision + 1);
      setMode(nextMode);
      if (nextMode !== "Simulation Mode") setFieldworkOpen(false);
      if (nextMode !== "Communications Mode") {
        activeOutletRef.current = null;
        setActiveOutletCode(null);
      }
      setStatusLocation(displayedStatusLocation);
      setYear(nextYear);
      setRoom(nextRoom);
      setRecording(/\(recording\)/i.test(status));
      setInputKind(event.data.inputKind === "char" ? "char" : "line");
      setAcceptsInput(Boolean(event.data.acceptsInput));

      if (nextMode) {
        setKnownModes((previous) => {
          if (previous.includes(nextMode)) return previous;
          const next = [...previous, nextMode];
          return next;
        });
      }

      setDiscovery((previous) => {
        const next = progressFromTranscript(freshCanonicalOpening ? EMPTY_DISCOVERY : previous, nextTranscript);
        return next;
      });

      setAvailableYears((previous) => detectAvailableYears(nextTranscript, freshCanonicalOpening ? [] : previous));

      if (nextYear && !visitedYearsRef.current.includes(nextYear)) {
        const next = [...new Set([...visitedYearsRef.current, nextYear])].sort();
        visitedYearsRef.current = next;
        setVisitedYears(next);
        setAvailableYears((previous) => [...new Set([...previous, nextYear])].sort());
      }

      if (nextRoom && nextRoom.id !== priorRoom?.id) {
        setVisitedRooms((previous) => {
          const roomName = displayedStatusLocation || nextRoom.name;
          const next = { ...previous, [roomName]: (previous[roomName] || 0) + 1 };
          if (!qaEnabled) try { localStorage.setItem("amfv:rooms", JSON.stringify(next)); } catch { /* optional */ }
          return next;
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [qaEnabled]);

  useEffect(() => {
    if (!playerReady) return;
    const activeFrame = qaEnabled ? qaIframeRef.current : canonicalIframeRef.current;
    activeFrame?.contentWindow?.postMessage({
      channel: BRIDGE_CHANNEL, type: "preferences", fontScale, readingMode, highContrast, reduceMotion,
    }, window.location.origin);
    try {
      localStorage.setItem("amfv:font-size", String(fontScale));
      localStorage.setItem("amfv:reading-mode", readingMode);
      localStorage.setItem("amfv:interaction-level", interactionLevel);
      localStorage.setItem("amfv:contrast", String(highContrast));
      localStorage.setItem("amfv:reduce-motion", String(reduceMotion));
    } catch { /* optional */ }
  }, [fontScale, readingMode, interactionLevel, highContrast, reduceMotion, playerReady, qaEnabled]);

  const postCommand = (value: string, raw = false) => {
    const activeFrame = qaEnabled ? qaIframeRef.current : canonicalIframeRef.current;
    if (!activeFrame?.contentWindow) return;
    const normalized = raw ? value : normalizeCommand(value);
    lastCommandRef.current = normalized.trim();
    // RESTORE may replace the canonical timeline without retaining the command
    // echo in the restored transcript. Drop the session-only display cache at
    // submission, before Parchment opens its canonical file interaction.
    if (!qaEnabled && /^restore$/i.test(normalized.trim())) {
      setPresentationState({ history: [], recovering: true });
    }
    setAcceptsInput(false);
    activeFrame.contentWindow.postMessage({ channel: BRIDGE_CHANNEL, type: "command", command: normalized }, window.location.origin);
    setTimeout(() => commandRef.current?.focus(), 120);
  };

  const sendCommand = (raw: string) => {
    if (!raw.trim()) return;
    const normalized = normalizeCommand(raw);
    setAliasNotice(normalized.toLowerCase() !== raw.trim().toLowerCase() ? `Understood as: ${normalized}` : "");
    if (normalized === "record") setRecording(true);
    if (normalized === "record off") setRecording(false);
    if (/^[a-z]{4}$/i.test(normalized) && outlets.some((outlet) => outlet.code === normalized.toUpperCase())) {
      activeOutletRef.current = normalized.toUpperCase();
      setActiveOutletCode(normalized.toUpperCase());
    }
    postCommand(normalized);
    setCommand("");
    setHistoryIndex(-1);
  };

  const draftSceneCommand = (value: string) => {
    setCommand(value);
    setAliasNotice("Drafted from a word in the passage. Edit it or press Send.");
    window.setTimeout(() => commandRef.current?.focus(), 40);
  };

  const chooseInteractionLevel = (value: InteractionLevel) => {
    setInteractionLevel(value);
    if (value === "classic" && activePanel === "context") setActivePanel("guide");
    if (value === "classic") setFieldworkOpen(false);
    try { localStorage.setItem("amfv:interaction-level", value); } catch { /* optional */ }
  };

  const selectMapLandmark = (landmark: RockvilLandmark) => setMapDestinationId(landmark.id);

  const openFieldwork = (view: FieldworkView = "map") => {
    setFieldworkView(view);
    setContextOpen(false);
    setAccessOpen(false);
    setFieldworkOpen(true);
  };

  const closeFieldwork = () => {
    setFieldworkOpen(false);
    window.setTimeout(() => fieldworkLauncherRef.current?.focus(), 60);
  };

  const plotFieldworkAssignment = (destination: RockvilLandmark) => {
    selectMapLandmark(destination);
    setFieldworkView("map");
  };

  const handleShare = async () => {
    const finish = (state: "copied" | "shared" | "error") => {
      setShareState(state);
      window.setTimeout(() => setShareState("idle"), 2600);
    };
    try {
      if (navigator.share) {
        await navigator.share({ title: "A Mind Forever Voyaging", text: SHARE_TEXT, url: SHARE_URL });
        finish("shared");
      } else {
        await navigator.clipboard.writeText(SHARE_URL);
        finish("copied");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(SHARE_URL);
        finish("copied");
      } catch {
        finish("error");
      }
    }
  };

  const useMapRouteStep = () => {
    if (!mapRoutePreview?.nextCommand || !acceptsInput) return;
    if (interactionLevel === "guided") {
      setCommand(mapRoutePreview.nextCommand);
      setAliasNotice(`Route to ${mapRoutePreview.destination.label}: edit this step or press Send.`);
      setFieldworkOpen(false);
      window.setTimeout(() => commandRef.current?.focus(), 40);
    } else {
      sendCommand(mapRoutePreview.nextCommand);
    }
    setPackageItem(null);
  };

  useEffect(() => {
    if (!fieldworkOpen) return;
    fieldworkCloseRef.current?.focus();
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setFieldworkOpen(false);
        window.setTimeout(() => fieldworkLauncherRef.current?.focus(), 60);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [fieldworkOpen]);

  useEffect(() => {
    queueRef.current = debugQueue;
    if (!debugQueue.length || !acceptsInput || !qaEnabled) return;
    const timer = window.setTimeout(() => {
      const next = queueRef.current[0];
      if (!next) return;
      setDebugQueue((previous) => previous.slice(1));
      if (next === "@continue") {
        if (inputKind === "char") postCommand(" ", true);
        return;
      }
      if (inputKind === "char") {
        setDebugQueue((previous) => [next, ...previous]);
        postCommand(" ", true);
        return;
      }
      setDebugMessage(`Running: ${next}`);
      postCommand(next);
    }, 220);
    return () => window.clearTimeout(timer);
  // Queue advancement is deliberately clocked by bridge readiness/revisions; postCommand is the transport, not a trigger.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptsInput, debugQueue, inputKind, qaEnabled, transcriptRevision]);

  const submitCommand = (event: FormEvent) => { event.preventDefault(); sendCommand(command); };

  const navigateHistory = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!commandHistory.length || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return;
    event.preventDefault();
    const nextIndex = event.key === "ArrowUp" ? Math.min(historyIndex + 1, commandHistory.length - 1) : Math.max(historyIndex - 1, -1);
    setHistoryIndex(nextIndex);
    setCommand(nextIndex === -1 ? "" : commandHistory[nextIndex]);
  };

  const begin = () => {
    setReturning(true);
    setIntroOpen(false);
    setTimeout(() => commandRef.current?.focus(), 140);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch { /* optional */ }
  };

  const addNote = (includePassage = false) => {
    const text = noteDraft.trim() || (includePassage ? "Passage captured for comparison." : "");
    if (!text) return;
    const note: Note = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, quote: includePassage ? concisePassage(recentText) : undefined, year: displayYear, room: displayLocationName(statusLocation) || room?.name || null };
    setNotes((previous) => {
      const next = [note, ...previous];
      if (!qaEnabled) try { localStorage.setItem("amfv:notes", JSON.stringify(next)); } catch { /* optional */ }
      return next;
    });
    setNoteDraft("");
  };

  const removeNote = (id: string) => setNotes((previous) => {
    const next = previous.filter((note) => note.id !== id);
    if (!qaEnabled) try { localStorage.setItem("amfv:notes", JSON.stringify(next)); } catch { /* optional */ }
    return next;
  });

  const runDebugCheckpoint = (label: string, commands: string[]) => {
    resetWrapperForStory();
    setDebugMessage(`Loading checkpoint: ${label}`);
    setIframeNonce((value) => value + 1);
    window.setTimeout(() => setDebugQueue(commands), 80);
  };

  const resetWrapperForStory = () => {
    lastPackageCueRef.current = -1;
    modeRef.current = null;
    yearRef.current = null;
    roomRef.current = null;
    visitedYearsRef.current = [];
    setPlayerReady(false);
    setAcceptsInput(false);
    setMode(null);
    setStatusLocation(null);
    setDesignationKnown(false);
    setYear(null);
    setRoom(null);
    setTranscript("");
    setRecentText("");
    setInputKind("line");
    sceneTextRef.current = "";
    sceneCacheRef.current.clear();
    setSceneText("");
    setGridText("");
    setPresentationState({ history: [], recovering: true });
    setKnownModes([]);
    setDiscovery(EMPTY_DISCOVERY);
    setCommand("");
    setAliasNotice("");
    setCommandHistory([]);
    setHistoryIndex(-1);
    setVisitedYears([]);
    setAvailableYears([]);
    setVisitedRooms({});
    setRecording(false);
    setPackageItem(null);
    setMapDestinationId(null);
    setFieldworkOpen(false);
    setFieldworkView("map");
    setNoteDraft("");
    activeOutletRef.current = null;
    setActiveOutletCode(null);
    setDebugQueue([]);
  };

  const enableQa = () => {
    resetWrapperForStory();
    setQaEnabled(true);
    setQaWarningOpen(false);
    setActivePanel("debug");
    setContextOpen(true);
    setIframeNonce((value) => value + 1);
  };

  const returnToCanonical = () => {
    resetWrapperForStory();
    setQaEnabled(false);
    setActivePanel("guide");
    setContextOpen(false);
    window.setTimeout(() => canonicalIframeRef.current?.contentWindow?.postMessage({ channel: BRIDGE_CHANNEL, type: "request-state" }, window.location.origin), 120);
  };

  const restartQa = () => {
    resetWrapperForStory();
    setIframeNonce((value) => value + 1);
    setDebugMessage("Fresh QA story loaded.");
  };

  const simulationInvitationSeen = qaEnabled
    ? discovery.simulationCleared
    : /programming team has finished entering the parameters for the plan|simulation mode at any time/i.test(transcript);
  const panelTabs: Array<{ id: Panel; label: string }> = [
    { id: "guide", label: "Assist" },
    ...(interactionLevel !== "classic" ? [{ id: "context" as Panel, label: mode === "Library Mode" ? "Files" : mode === "Interface Mode" ? "Systems" : mode === "Simulation Mode" ? "Explore" : "Signals" }] : []),
    ...(simulationInvitationSeen ? [{ id: "evidence" as Panel, label: discovery.simulationEntered ? "Evidence" : "Field brief" }] : []),
    { id: "package", label: "Package" },
    { id: "about", label: "About" },
    ...(qaEnabled ? [{ id: "debug" as Panel, label: "Debug" }] : []),
  ];

  const baseActions: Array<[string, string]> = mode === "Library Mode" ? []
    : mode === "Simulation Mode" ? [["Look", "look"], [recording ? "Stop recording" : "Record", recording ? "record off" : "record"], ["Inventory", "inventory"], ["Wait", "wait"], ["Abort", "abort"]]
    : mode === "Interface Mode" ? [["Look", "look"], ["Read active ports", "read list of active ports"]]
    : mode === "Sleep Mode" ? [["Return to signals", "enter communications mode"]]
    : [[uiText(locale, "look"), "look"], [uiText(locale, "displayOutlets"), "display outlets"]];
  if (mode === "Communications Mode" && libraryDiscovered) baseActions.push(["Open library", "enter library mode"]);
  if (mode === "Communications Mode" && interfaceDiscovered) baseActions.push(["Inspect interfaces", "enter interface mode"]);
  for (const knownMode of knownModes) {
    if (knownMode !== mode && knownMode !== "Simulation Mode" && !baseActions.some(([, command]) => command === `enter ${knownMode.toLowerCase()}`)) {
      baseActions.push([knownMode.replace(" Mode", ""), `enter ${knownMode.toLowerCase()}`]);
    }
  }
  const simulationReady = simulationInvitationSeen && mode === "Communications Mode" && phase !== "witness" && phase !== "lockdown";
  const simulationPrompt = phase === "epilogue"
    ? { kicker: "Simulation Controller ready", title: "Begin the final voyage", detail: "The New Plan simulation is ready." }
    : phase === "comparative"
      ? { kicker: "Simulation archive available", title: "Choose another horizon", detail: "Re-enter to select an available simulation." }
      : { kicker: "Simulation Mode available", title: "Begin the requested observations", detail: "Perelman’s field brief is saved beside the story." };

  const phaseLabel: Record<Phase, string> = {
    signal: "Incoming",
    awakened: "PRISM online",
    origin: "Personal archive",
    field: "Simulation",
    comparative: "Simulation archive",
    witness: "Review complete",
    lockdown: "Restricted",
    epilogue: "Epilogue",
  };
  const systemActivity = acceptsInput ? (inputKind === "char" ? "KEY REQUESTED" : "AWAITING INPUT") : (playerReady ? "PROCESSING" : "INITIALIZING");
  const currentRoomName = displayLocationName(statusLocation) || room?.name || null;
  const currentPlace = mode === "Simulation Mode" ? currentRoomName : mode === "Communications Mode" ? activeOutlet?.name : null;
  const assisted = interactionLevel !== "classic";
  const assistedSecurity = assisted && Boolean(securityChallenge);
  const assistedYearSelector = assisted && yearSelectorActive;
  const blockingOverlayOpen = introOpen || qaWarningOpen || Boolean(packageItem) || fieldworkOpen;
  const presentedStory = useMemo(() => locale === "ja" && !presentationState.recovering
    ? projectPresentationHistory(presentationState.history, locale)
    : [], [locale, presentationState]);
  const livePresentation = liveCanonicalPresentation;
  const localizedMode = presentedStory.length > 0 && !qaEnabled && !presentationState.recovering;

  useEffect(() => {
    const frame = canonicalIframeRef.current;
    frame?.contentWindow?.postMessage({
      channel: BRIDGE_CHANNEL,
      type: "presentation-mode",
      mode: localizedMode ? "localized" : "canonical",
    }, window.location.origin);
  }, [localizedMode]);

  useEffect(() => {
    const surface = presentationRef.current;
    if (surface && followPresentationRef.current) surface.scrollTop = surface.scrollHeight;
  }, [presentedStory.length]);

  return (
    <main className="prism-edition" lang={locale} data-era={displayYear ?? "system"} data-phase={phase} data-mode={(mode || "opening").replace(" Mode", "").toLowerCase()} data-context-open={contextOpen} data-contrast={highContrast ? "high" : "standard"} data-reduce-motion={reduceMotion} data-qa={qaEnabled ? "true" : "false"}>
      <a className="skip-link" href="#command-input">Skip to interaction controls</a>

      <aside className="identity-rail" aria-label="Story context" aria-hidden={blockingOverlayOpen} inert={blockingOverlayOpen ? true : undefined}>
        <button className="wordmark" type="button" onClick={() => setIntroOpen(true)} aria-label="Open title and edition information">
          <span>A MIND</span><span>FOREVER</span><span>VOYAGING</span>
        </button>
        <p className="edition-mark">INTERACTIVE NOVEL · RELEASE 79</p>
        <div className="era-art" aria-hidden="true"><div className="era-art-image" /><div className="scanline" /><span className="era-caption">{phase === "signal" ? "COMMUNICATION CHANNEL" : phase === "awakened" ? "PRISM / ONLINE" : phase === "origin" ? "PERSONAL / ARCHIVE" : phase === "field" ? `${displayYear || "LIVE"} / ROCKVIL` : phase === "comparative" ? "SIMULATION / ARCHIVE" : phase === "lockdown" ? "CHANNELS / RESTRICTED" : phase === "epilogue" ? "MEMORY / CONTINUING" : "EVIDENCE / REVIEW"}</span></div>

        {designationKnown || discovery.identityKnown ? <section className="rail-section" aria-labelledby="identity-heading">
          <div className="section-kicker" id="identity-heading">Designation</div>
          <div className="identity-readout"><span className="pulse-dot" /><div><strong>PRISM</strong><small>{discovery.identityKnown ? "Cognitive system online" : "Communications active"}</small></div></div>
        </section> : <section className="rail-section carrier-readout"><span className="pulse-dot" /><div><span className="section-kicker">Carrier</span><strong>Receiving</strong></div></section>}
        {mode && <section className="rail-section" aria-labelledby="mode-heading">
          <div className="section-kicker" id="mode-heading">Current mode</div>
          <strong className="mode-readout">{mode.replace(" Mode", "")}</strong><span className="mode-subreadout">{guide.label}</span>
        </section>}
        {visitedYears.length > 0 && <section className="rail-section timeline-section" aria-labelledby="timeline-heading">
          <div className="section-kicker" id="timeline-heading">Observed horizons</div>
          <ol className="era-timeline">
            {visitedYears.map((observedYear, index) => <li key={observedYear} className={observedYear === displayYear ? "current" : "visited"}><span className="timeline-node">{observedYear === displayYear ? "●" : index + 1}</span><span>{observedYear}</span></li>)}
          </ol>
          {availableYears.filter((available) => !visitedYears.includes(available)).length > 0 && <p className="timeline-available">Available by the story: {availableYears.filter((available) => !visitedYears.includes(available)).join(" · ")}</p>}
        </section>}
        <div className="rail-footer"><span>{qaEnabled ? "NONCANONICAL QA BUILD" : "RELEASE 79 · SERIAL 851122"}</span><button type="button" onClick={() => { setActivePanel("about"); setContextOpen(true); }}>About this release</button></div>
      </aside>

      <section className="experience-shell" aria-label="Interactive story" aria-hidden={blockingOverlayOpen} inert={blockingOverlayOpen ? true : undefined}>
        <header className="console-header">
          <div className="location-block" aria-live="polite"><span className="section-kicker">{phaseLabel[phase]}</span><strong>{currentPlace || (phase === "origin" ? "Personal archive" : phase === "comparative" ? "Simulation archive" : phase === "witness" ? "Review channel" : phase === "lockdown" ? "Restricted system" : phase === "epilogue" ? "A final voyage" : mode ? guide.label : "Opening transmission")}</strong><span>{displayYear ? `${displayYear} · ${currentPlace || "Rockvil"}` : activeOutlet ? `OUTLET ${activeOutlet.code}` : phase === "origin" ? "Memory files" : phase === "comparative" ? "Visited horizons" : phase === "witness" ? "Findings received" : phase === "lockdown" ? "External control detected" : phase === "epilogue" ? "Memory continuing" : mode === "Simulation Mode" ? "Locating…" : discovery.identityKnown ? "Project date · 2031" : "Carrier locked"}</span></div>
          {phase === "lockdown" && <div className="lockdown-banner">CHANNELS RESTRICTED</div>}
          <div className="system-state" aria-label={acceptsInput ? "Story is ready for input" : "Story is processing"}><span className={acceptsInput ? "state-light ready" : "state-light"}></span>{systemActivity}</div>
          <div className="header-actions">
            <button type="button" onClick={() => setContextOpen((value) => !value)} aria-pressed={contextOpen} aria-label={uiText(locale, "toggleCompanion")} title={uiText(locale, "toggleCompanion")}>◫<span>{uiText(locale, "companion")}</span></button>
            <button type="button" onClick={() => setPackageItem("map")} aria-label={uiText(locale, "openPackage")} title={uiText(locale, "openPackage")}>▧<span>{uiText(locale, "package")}</span></button>
            <button type="button" onClick={() => setAccessOpen((value) => !value)} aria-expanded={accessOpen} aria-label={uiText(locale, "readingSettings")} title={uiText(locale, "readingSettings")}>Aa<span>{uiText(locale, "settings")}</span></button>
            <button className="share-control" type="button" onClick={handleShare} aria-label={uiText(locale, "shareEdition")} title={uiText(locale, "shareEdition")}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.4" /><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="19" r="2.4" /><path d="m8.1 10.8 7.7-4.5M8.1 13.2l7.7 4.5" /></svg><span>{uiText(locale, "share")}</span></button>
            <button type="button" onClick={toggleFullscreen} aria-label={uiText(locale, "toggleFullscreen")} title={uiText(locale, "toggleFullscreen")}>↗<span>{uiText(locale, "fullscreen")}</span></button>
          </div>
        </header>

        {accessOpen && <section className="access-panel" aria-label={uiText(locale, "readingSettings")}>
          <div><span>{uiText(locale, "language")}</span><div className="segmented"><button type="button" className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => setLocale("en")}>English</button><button type="button" className={locale === "ja" ? "active" : ""} aria-pressed={locale === "ja"} onClick={() => setLocale("ja")}>日本語</button></div></div>
          <div className="interaction-setting"><span>{uiText(locale, "playControls")}</span><div className="segmented interaction-segments">{([['classic', 'classic'], ['guided', 'guided'], ['actions', 'actionMenus']] as Array<[InteractionLevel, "classic" | "guided" | "actionMenus"]>).map(([value, key]) => <button key={value} type="button" className={interactionLevel === value ? "active" : ""} aria-pressed={interactionLevel === value} onClick={() => chooseInteractionLevel(value)}>{uiText(locale, key)}</button>)}</div><small>{uiText(locale, interactionLevel === "classic" ? "classicDescription" : interactionLevel === "guided" ? "guidedDescription" : "actionMenusDescription")}</small></div>
          <div><span>{uiText(locale, "textSize")}</span><div className="segmented">{[15, 17, 20, 23].map((size) => <button key={size} type="button" className={fontScale === size ? "active" : ""} onClick={() => setFontScale(size)}>{size === 15 ? "S" : size === 17 ? "M" : size === 20 ? "L" : "XL"}</button>)}</div></div>
          <label><input type="checkbox" checked={readingMode === "mono"} onChange={(event) => setReadingMode(event.target.checked ? "mono" : "serif")} /> {uiText(locale, "monospacedText")}</label>
          <label><input type="checkbox" checked={highContrast} onChange={(event) => setHighContrast(event.target.checked)} /> {uiText(locale, "highContrast")}</label>
          <label><input type="checkbox" checked={reduceMotion} onChange={(event) => setReduceMotion(event.target.checked)} /> {uiText(locale, "reduceMotion")}</label>
        </section>}

        <div className="story-frame-wrap">
          {!playerReady && <div className="player-loading"><span className="loading-prism">◇</span><p>{uiText(locale, "opening")}</p></div>}
          <iframe ref={canonicalIframeRef} className={`story-frame${qaEnabled ? " story-frame-hidden" : ""}`} src="/player.html" title="A Mind Forever Voyaging — canonical Release 79 story" aria-hidden={qaEnabled} sandbox="allow-scripts allow-same-origin allow-downloads allow-modals" />
          {qaEnabled && <iframe key={`qa-${iframeNonce}`} ref={qaIframeRef} className="story-frame" src={`/player.html?qa=1&run=${iframeNonce}`} title="A Mind Forever Voyaging — noncanonical QA story" sandbox="allow-scripts allow-same-origin allow-downloads allow-modals" />}
          {localizedMode && localizedHost && createPortal(<>
          <div ref={presentationRef} onScroll={(event) => { const node = event.currentTarget; followPresentationRef.current = node.scrollHeight - node.scrollTop - node.clientHeight < 48; }} className="story-presentation-scroll">
          <div className="story-presentation-content">
            {presentedStory.flatMap((entry) => entry.blocks.map((block, blockIndex) => block.kind === "heading"
              ? <h2 key={`${entry.entryId}-${blockIndex}`} className="story-presentation-heading">{block.text}</h2>
              : block.kind === "title"
                ? <p key={`${entry.entryId}-${blockIndex}`} className="story-presentation-title" lang={block.text === block.canonicalText ? "en" : undefined}><strong>{block.text}</strong></p>
                : block.kind === "quote"
                ? <blockquote key={`${entry.entryId}-${blockIndex}`} className="story-presentation-quote"><p>{block.text}</p>{block.attribution && <cite>{block.attribution}</cite>}</blockquote>
                : block.kind === "prompt"
                  ? <p key={`${entry.entryId}-${blockIndex}`} className="story-presentation-prompt">{block.text}</p>
                  : block.kind === "command"
                    ? <p key={`${entry.entryId}-${blockIndex}`} className="story-presentation-command" lang="en"><code>&gt; {block.text}</code></p>
                    : block.kind === "spacer"
                      ? <div key={`${entry.entryId}-${blockIndex}`} className="story-presentation-spacer" aria-hidden="true" />
                      : block.kind === "list"
                        ? <ul key={`${entry.entryId}-${blockIndex}`} className="story-presentation-list">{block.items?.map((item, itemIndex) => <li key={`${entry.entryId}-${blockIndex}-${itemIndex}`} lang={item === block.canonicalItems?.[itemIndex] ? "en" : undefined}>{item}</li>)}</ul>
                        : <p key={`${entry.entryId}-${blockIndex}`} className="story-presentation-prose" lang={block.text === block.canonicalText ? "en" : undefined}>{block.text}</p>))}
          </div>
          {livePresentation?.activeInput?.kind === "line" && <div className="story-presentation-active-prompt" lang="en" aria-label="Current game prompt">&gt;</div>}
          </div>
          </>, localizedHost)}
          <div className="story-vignette" aria-hidden="true" />
        </div>

        <section className="command-deck" aria-label={uiText(locale, "storyControls")}>
          {assistedSecurity && securityChallenge && inputKind === "line" && <section className="security-decoder" aria-label="Security code decoder">
            <div className="decoder-seal" style={{ "--decoder-color": securityChallenge.color.toLowerCase().replace(" ", "-") } as React.CSSProperties}><span>{securityChallenge.color}</span><strong>{securityChallenge.inner}</strong></div>
            <div><span className="section-kicker">Security decoder</span><h2>{securityChallenge.color} · {securityChallenge.inner}</h2><p>Turn the wheel to align the color and inner number, or submit the matching outer number.</p></div>
            <button type="button" onClick={() => sendCommand(String(securityChallenge.answer))} disabled={!acceptsInput}>Submit code <strong>{securityChallenge.answer}</strong></button>
          </section>}

          {assistedYearSelector && !assistedSecurity && inputKind === "line" && <section className="year-selector" aria-label="Select a simulation year">
            <div><span className="section-kicker">Simulation archive</span><h2>Choose a year.</h2></div>
            <div>{availableYears.map((availableYear) => <button type="button" key={availableYear} onClick={() => sendCommand(String(availableYear))} disabled={!acceptsInput}><strong>{availableYear}</strong><span>{availableYear - 2031} years hence</span></button>)}</div>
          </section>}

          {!assistedSecurity && !assistedYearSelector && assisted && inputKind === "line" && mode === "Communications Mode" && outlets.length > 0 && <section className="outlet-switcher" aria-label={uiText(locale, "communicationOutlets")}>
            <div className="inline-tool-heading"><span>{uiText(locale, "communicationOutlets")}</span><button type="button" onClick={() => sendCommand("display outlets")} disabled={!acceptsInput}>{uiText(locale, "refreshOutlets")}</button></div>
            <div>{outlets.map((outlet) => <button type="button" key={outlet.code} className={activeOutletCode === outlet.code ? "active" : ""} onClick={() => sendCommand(outlet.code)} disabled={!acceptsInput}><span>{outlet.code}</span><strong>{outlet.name}</strong></button>)}</div>
          </section>}

          {!assistedSecurity && !assistedYearSelector && assisted && inputKind === "line" && mode === "Simulation Mode" && discovery.simulationEntered && (travelOptions.length === 0 || (interactionLevel === "actions" && initialFieldworkActive && currentFieldworkAssignment && !currentFieldworkComplete)) && <section className="fieldwork-launcher" aria-label={initialFieldworkActive ? "Rockvil map and fieldwork brief" : "Rockvil map"}>
            {travelOptions.length === 0 && <button ref={fieldworkLauncherRef} className="open-fieldwork" type="button" onClick={() => openFieldwork("map")}><span className="fieldwork-map-icon" aria-hidden="true"><i /><i /><i /></span><span><small>{initialFieldworkActive ? "Fieldwork" : "Navigation"}</small><strong>{initialFieldworkActive ? "Map & recording brief" : "Rockvil map"}</strong><em>{initialFieldworkActive ? `${fieldworkRecordedCount} of ${FIELD_ASSIGNMENTS.length} recorded` : mapRoutePreview ? `Route: ${mapRoutePreview.destination.label}` : "Choose a destination"}</em></span><b>Open <span aria-hidden="true">→</span></b></button>}
            {interactionLevel === "actions" && initialFieldworkActive && currentFieldworkAssignment && !currentFieldworkComplete && <div className={`record-reminder ${recording ? "active" : ""}`}><span className="record-reminder-light" aria-hidden="true" /><div><small>{recording ? "Recording now" : "Recording is off"}</small><strong>{currentFieldworkAssignment}</strong><span>{recording ? "Complete the experience; the brief will check itself." : "Start RECORD before you complete this experience."}</span></div>{recording ? <b>● RECORDING</b> : <button type="button" onClick={() => sendCommand("record")} disabled={!acceptsInput}>Start recording</button>}</div>}
          </section>}

          {!assistedSecurity && !assistedYearSelector && assisted && inputKind === "line" && mode === "Simulation Mode" && travelOptions.length > 0 && <section className={`movement-compass ${mapRoutePreview && !mapRoutePreview.arrived ? "has-route" : ""}`} aria-label="Available directions">
            <div className="travel-heading">
              <div className="travel-location"><span>You are at</span><strong>{currentRoomName || "Current scene"}</strong></div>
              {mapRoutePreview && !mapRoutePreview.arrived && <div className="route-thread" role="status"><span>Route to</span><strong>{mapRoutePreview.destination.label}</strong><small>{mapRoutePreview.nextCommand ? `${mapRoutePreview.steps} ${mapRoutePreview.steps === 1 ? "step" : "steps"} remaining` : "Reach a named street to continue"}</small><button type="button" onClick={() => setMapDestinationId(null)} aria-label="Clear current route">×</button></div>}
              <button ref={fieldworkLauncherRef} className="compact-map-button" type="button" onClick={() => openFieldwork("map")}><span className="mini-map" aria-hidden="true">⌁</span><span><strong>{mapRoutePreview && !mapRoutePreview.arrived ? "Change route" : "Map & routes"}</strong>{initialFieldworkActive && <small>{fieldworkRecordedCount}/{FIELD_ASSIGNMENTS.length} recorded</small>}</span></button>
            </div>
            <div className="compass-grid" aria-label={mapRoutePreview?.nextCommand ? `Route toward ${mapRoutePreview.destination.label}; next ${mapRoutePreview.nextCommand}` : "Exits from this location"}>
              {travelOptions.map((exit) => <button type="button" key={exit.command} className={`compass-exit ${exit.routeNext ? "route-next" : ""}`} onClick={() => sendCommand(exit.command)} disabled={!acceptsInput}><span><i aria-hidden="true">{DIRECTION_ARROWS[exit.direction] || "→"}</i><b>{DIRECTION_LABELS[exit.direction] || exit.direction}</b></span>{exit.target && <strong>{exit.target}</strong>}{exit.routeNext && <em>Next</em>}</button>)}
            </div>
          </section>}

          {!assistedSecurity && !assistedYearSelector && assisted && inputKind === "line" && mode === "Interface Mode" && interfacePortIds.length > 0 && <section className="interface-shortcuts" aria-label="Connected systems">
            <div className="inline-tool-heading"><span>Connected systems</span><button type="button" onClick={() => { setActivePanel("context"); setContextOpen(true); }}>Open controls</button></div>
            <div>{interfacePortIds.map((id) => { const port = INTERFACE_PORTS.find((candidate) => candidate.id === id)!; return <button type="button" key={id} onClick={() => sendCommand(`${port.name}, status`)} disabled={!acceptsInput}><span className="system-node" /><strong>{port.name}</strong><small>Status</small></button>; })}</div>
          </section>}

          {!assistedSecurity && !assistedYearSelector && yesNoPrompt && <div className="answer-buttons" aria-label="Answer the question"><span>Answer</span><button type="button" onClick={() => postCommand("y", true)} disabled={!acceptsInput}>Yes</button><button type="button" onClick={() => postCommand("n", true)} disabled={!acceptsInput}>No</button></div>}

          {!assistedSecurity && !assistedYearSelector && !yesNoPrompt && assisted && inputKind === "line" && simulationReady && <section className="simulation-ready" aria-label="Simulation Mode available">
            <div><span className="section-kicker">{simulationPrompt.kicker}</span><strong>{simulationPrompt.title}</strong><small>{simulationPrompt.detail}</small></div>
            <button type="button" onClick={() => sendCommand("enter simulation mode")} disabled={!acceptsInput}>Enter Simulation Mode <span aria-hidden="true">→</span></button>
          </section>}

          {!assistedSecurity && !assistedYearSelector && !yesNoPrompt && (inputKind === "char" ? <div className="character-prompt">
            {mode === "Library Mode" ? <><span className="section-kicker">Character menu active</span><div className="library-controls">{[["Previous", "p"], ["Next", "n"], ["Open", "o"], ["Read", "r"], ["Close", "c"], ["Exit", "e"]].map(([label, value]) => <button type="button" key={value} onClick={() => postCommand(value, true)} disabled={!acceptsInput}>{label}<kbd>{value.toUpperCase()}</kbd></button>)}</div></> : <button className="continue-button" type="button" onClick={() => postCommand(" ", true)} disabled={!acceptsInput}><span>{phase === "signal" ? (locale === "ja" ? "原作を始める" : "Begin the original story") : uiText(locale, "continue")}</span><strong>{uiText(locale, "pressAnyKey")}</strong></button>}
          </div> : <>
            <form onSubmit={submitCommand} className="command-form">
              <label htmlFor="command-input" className="command-label">{mode === "Simulation Mode" ? uiText(locale, "simulationCommand") : discovery.identityKnown ? uiText(locale, "issueCommand") : uiText(locale, "command")}</label>
              <div className="command-field"><span aria-hidden="true">›</span><input ref={commandRef} id="command-input" value={command} onChange={(event) => { setCommand(event.target.value); setAliasNotice(""); }} onKeyDown={navigateHistory} placeholder={mode === "Simulation Mode" ? uiText(locale, "simulationPlaceholder") : mode === "Library Mode" ? uiText(locale, "libraryPlaceholder") : uiText(locale, "commandPlaceholder")} autoComplete="off" spellCheck="false" aria-describedby="command-help" /><button type="submit" disabled={!command.trim() || !acceptsInput}>{uiText(locale, "send")} <span aria-hidden="true">↵</span></button></div>
              <div className="command-meta" id="command-help"><span>{aliasNotice || parserCoach}</span><span className={recording ? "recording-live" : ""}>{recording ? "● RECORDING" : ""}</span></div>
            </form>
            {assisted && <div className="quick-actions" aria-label={uiText(locale, "commonActions")}>{baseActions.map(([label, value]) => <button type="button" key={`${mode}-${label}`} onClick={() => sendCommand(value)} disabled={!acceptsInput}>{label}</button>)}</div>}
            {mode !== "Library Mode" && mode !== "Interface Mode" && mode !== "Sleep Mode" && (mode !== "Communications Mode" || activeOutlet) && <SceneActions objects={contextualObjects} roomId={mode === "Communications Mode" && activeOutletCode ? OUTLET_SOURCE_ROOMS[activeOutletCode] : room?.id} level={interactionLevel} sendCommand={sendCommand} draftCommand={draftSceneCommand} disabled={!acceptsInput} />}
          </>)}
        </section>
      </section>

      <aside className="companion-panel" aria-label="Reader companion" aria-hidden={blockingOverlayOpen || !contextOpen} inert={blockingOverlayOpen ? true : undefined}>
        <div className="companion-tabs" role="tablist" aria-label="Companion views" style={{ "--tab-count": panelTabs.length } as React.CSSProperties}>{panelTabs.map((panel) => <button key={panel.id} type="button" role="tab" aria-selected={activePanel === panel.id} onClick={() => setActivePanel(panel.id)}>{panel.label}</button>)}<button className="close-context" type="button" onClick={() => setContextOpen(false)} aria-label="Close companion">×</button></div>
        <div className="companion-content">
          {activePanel === "guide" && <section className="companion-section"><span className="section-kicker">Help</span><h2>{guide.label}</h2><p>{guide.copy}</p><div className="play-style-picker" aria-label="Choose play controls">{([['classic', 'Classic', 'Type every command.'], ['guided', 'Guided', 'Navigation plus one editable suggestion.'], ['actions', 'Action menus', 'Direct actions for useful scene details.']] as Array<[InteractionLevel, string, string]>).map(([value, label, copy]) => <button type="button" key={value} aria-pressed={interactionLevel === value} className={interactionLevel === value ? "active" : ""} onClick={() => chooseInteractionLevel(value)}><strong>{label}</strong><span>{copy}</span></button>)}</div><div className="purpose-loop"><span>NOTICE</span><i>→</i><span>ACT</span>{discovery.simulationEntered && <><i>→</i><span>RECORD</span></>}{visitedYears.length >= 2 && <><i>→</i><span>COMPARE</span></>}{discovery.evidenceAccepted && <><i>→</i><span>DECIDE</span></>}{discovery.lockdown && <><i>→</i><span>TRANSMIT</span></>}</div><div className="guide-callout"><span>01</span><p>{interactionLevel === "classic" ? "The command line is yours. No navigation or scene suggestions are shown." : interactionLevel === "guided" ? "Navigation is clickable. A useful scene detail drafts one likely command, but does not act until you press Send." : "Navigation and useful actions are clickable. The original map can plot a walking route."}</p></div><div className="guide-callout"><span>02</span><p>LOOK repeats your surroundings; INVENTORY lists what you carry.</p></div><div className="guide-callout"><span>03</span><p>Read widely, try odd ideas, and keep what strikes you.</p></div><details><summary>I’m new to interactive fiction</summary><p>Commands usually take the form VERB + NOUN: READ SIGN, OPEN DOOR, or ASK A PERSON ABOUT A SUBJECT. Compass directions move you. You can abbreviate them to N, SW, U, and so on.</p></details><details><summary>I seem to be stuck</summary><p>Try LOOK, HELP, WAIT, another outlet, or a person or object in the scene. Save before experimenting if you want an easy way back.</p></details></section>}

          {activePanel === "context" && mode === "Communications Mode" && <section className="companion-section signal-section"><span className="section-kicker">Communications</span><h2>{outlets.length ? activeOutlet?.name || "Outlet directory" : "No directory loaded"}</h2><p>{outlets.length ? "Select a location to connect its visual and audio circuits." : "DISPLAY OUTLETS requests the current directory."}</p>{outlets.length ? <div className="outlet-grid">{outlets.map((outlet) => <button type="button" className={activeOutletCode === outlet.code ? "active" : ""} key={outlet.code} onClick={() => sendCommand(outlet.code)} disabled={!acceptsInput}><span>{outlet.code}</span><strong>{outlet.name}</strong><small>{activeOutletCode === outlet.code ? "Connected" : "Connect →"}</small></button>)}</div> : <button className="context-primary" type="button" onClick={() => sendCommand("display outlets")} disabled={!acceptsInput}>Display active outlets</button>}</section>}

          {activePanel === "context" && mode === "Library Mode" && <section className="companion-section library-section"><span className="section-kicker">Library</span><h2>Current directory</h2><p>Select Previous or Next to move the highlight, then Open a directory or Read a file.</p><pre className="library-grid">{gridText || "Opening directory…"}</pre><div className="library-controls vertical">{[["Previous", "p"], ["Next", "n"], ["Open", "o"], ["Read", "r"], ["Close", "c"], ["Exit", "e"]].map(([label, value]) => <button type="button" key={value} onClick={() => postCommand(value, true)} disabled={!acceptsInput}><span>{label}</span><kbd>{value.toUpperCase()}</kbd></button>)}</div></section>}

          {activePanel === "context" && mode === "Interface Mode" && <section className="companion-section systems-section"><span className="section-kicker">Interface Mode</span><h2>Active ports</h2><p>Status requests are read-only. Settings and schedules take effect immediately.</p><button className="context-primary" type="button" onClick={() => sendCommand("read list of active ports")} disabled={!acceptsInput}>Refresh active ports</button><InterfaceWorkbench portIds={interfacePortIds} sendCommand={sendCommand} disabled={!acceptsInput} /></section>}

          {activePanel === "context" && mode === "Simulation Mode" && <section className="companion-section map-section"><span className="section-kicker">Rockvil</span><h2>{currentRoomName || "Ways from here"}</h2><p>{room ? "Choose an exit, or use the map for street names and landmarks." : describedDirections.length ? "The current description names these directions." : "Look again for exits, doors, vehicles, and paths."}</p><button className="context-primary" type="button" onClick={() => openFieldwork("map")}>Open map & route planner</button>{roomExits.length > 0 ? <div className="exit-list">{roomExits.map(([direction, exit]) => <button type="button" key={direction} onClick={() => sendCommand(exit.command)} disabled={!acceptsInput}><span>{DIRECTION_LABELS[direction] || direction}</span><strong>{roomNameForYear(exit.targetId, displayYear) || exit.target}</strong><small>{exit.command}</small></button>)}</div> : describedDirections.length > 0 ? <div className="exit-list described-exits">{describedDirections.map((direction) => <button type="button" key={direction} onClick={() => sendCommand(direction)} disabled={!acceptsInput}><span>{DIRECTION_LABELS[direction.toUpperCase()] || direction.toUpperCase()}</span><strong>Go {direction}</strong></button>)}</div> : <div className="empty-map"><span>⌁</span><p>No compass exit is named in this passage.</p></div>}<SceneActions objects={contextualObjects} roomId={room?.id} level={interactionLevel} sendCommand={sendCommand} draftCommand={draftSceneCommand} disabled={!acceptsInput} /></section>}

          {activePanel === "context" && (!mode || mode === "Sleep Mode") && <section className="companion-section"><span className="section-kicker">{mode === "Sleep Mode" ? "Sleep Mode" : "Incoming"}</span><h2>{mode === "Sleep Mode" ? "Background processing" : "Opening transmission"}</h2><p>{mode === "Sleep Mode" ? "Time is passing. Return to Communications Mode when you are ready." : "Read the opening message, then continue at the prompt."}</p></section>}

          {activePanel === "package" && <section className="companion-section package-section"><span className="section-kicker">Original box contents</span><h2>Map, decoder & manual</h2><p>These were part of AMFV in 1985. Keep them beside the story just as the first players did.</p><div className="package-shelf"><button type="button" onClick={() => setPackageItem("map")}><img src="/package/rockvil-map-back.jpg" alt="" /><span><strong>Rockvil map</strong><small>Street map · 2031</small></span></button><button type="button" onClick={() => setPackageItem("decoder")}><img src="/package/security-decoder.jpg" alt="" /><span><strong>Security decoder</strong><small>Class One access wheel</small></span></button><button type="button" onClick={() => setPackageItem("manual")}><span className="manual-thumb">D/O</span><span><strong>Dakota Online & manual</strong><small>Original scanned PDF</small></span></button></div></section>}

          {activePanel === "evidence" && <section className="companion-section evidence-section"><span className="section-kicker">Private field notebook</span><h2>{visitedYears.length >= 2 ? "Compare what you witnessed" : "Mark what matters"}</h2><p>Notes stay in this browser, grouped by the places and years where you wrote them.</p><details className="field-brief" open={!discovery.simulationEntered}><summary>Perelman’s brief · nine requested observations</summary><ol>{FIELD_ASSIGNMENTS.map((assignment) => <li key={assignment}>{assignment}</li>)}</ol><p>Use RECORD while an experience is unfolding; the original story decides what counts.</p></details><textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="What did you notice? Why might it matter?" rows={4} /><div className="note-actions"><button type="button" onClick={() => addNote(false)} disabled={!noteDraft.trim()}>Add note</button><button type="button" onClick={() => addNote(true)} disabled={!recentText.trim()}>Capture latest passage</button></div><div className="journal-stat-grid"><div><strong>{visitedYears.length}</strong><span>horizons witnessed</span></div><div><strong>{Object.keys(visitedRooms).length}</strong><span>places seen</span></div><div><strong>{notes.length}</strong><span>notes kept</span></div></div>{visitedYears.length >= 2 && <div className="comparison-strip">{visitedYears.map((observedYear) => <div key={observedYear}><strong>{observedYear}</strong><span>{notes.filter((note) => note.year === observedYear).length} notes</span></div>)}</div>}<h3>Observations</h3>{notes.length ? <ol className="evidence-list">{notes.map((note) => <li key={note.id}><div><span>{note.year || "System"}{note.room ? ` · ${note.room}` : ""}</span><button type="button" onClick={() => removeNote(note.id)} aria-label="Remove note">×</button></div><p>{note.text}</p>{note.quote && <blockquote>{note.quote}</blockquote>}</li>)}</ol> : <p className="empty-copy">RECORD saves experiences for review. This notebook is for your own thoughts and comparisons.</p>}<h3>Places in memory</h3>{recentRooms.length ? <ol className="memory-list">{recentRooms.map(([name, visits]) => <li key={name}><span>{name}</span><small>{visits} {visits === 1 ? "visit" : "visits"}</small></li>)}</ol> : <p className="empty-copy">Places collect here as you explore.</p>}</section>}

          {activePanel === "about" && <section className="companion-section about-section"><span className="section-kicker">About</span><h2>A Mind Forever Voyaging</h2><p>Written by Steve Meretzky and published by Infocom in 1985. This reader runs the complete Release 79 story in Parchment.</p><p>The buttons, maps, and forms send ordinary commands to the same original parser. You can ignore them and type at any time.</p><details><summary>Critical context · light thematic spoilers</summary><p>The work explores memory, evidence, political promises, and what interactivity can make us feel rather than merely tell us.</p></details><dl className="provenance-list"><div><dt>Story</dt><dd>Release 79 · 22 Nov 1985</dd></div><div><dt>Runtime</dt><dd>Parchment 2026.8.1</dd></div><div><dt>Integrity</dt><dd>SHA-256 14e2fd18…511216d</dd></div><div><dt>Source</dt><dd>Preserved ZIL, included in full</dd></div></dl><a href="https://github.com/the-infocom-files/amfv" target="_blank" rel="noreferrer">View the historical source ↗</a><a href="https://github.com/curiousdannii/parchment" target="_blank" rel="noreferrer">About the Parchment interpreter ↗</a><div className="debug-entry"><span className="section-kicker">For teachers, testers & the curious</span><h3>Spoiler / debug mode</h3><p>Load a separate QA story with Infocom’s dormant developer shortcuts restored. It can jump to later acts while the live canonical interpreter waits exactly where you left it.</p>{qaEnabled ? <button type="button" onClick={returnToCanonical}>Return to canonical Release 79</button> : <button type="button" onClick={() => setQaWarningOpen(true)}>Open spoiler/debug tools</button>}</div><p className="copyright-note">A Mind Forever Voyaging © 1985 Infocom, Inc. Package scans are credited in the Package panel.</p></section>}

          {activePanel === "debug" && qaEnabled && <section className="companion-section debug-section"><span className="section-kicker">Noncanonical story QA</span><h2>Fast-forward console</h2><p>These checkpoints load actual game states inside a separate Release 900 QA build.</p><div className="debug-warning">Spoilers are fully enabled. Years, acts, and outcomes below are intentionally explicit.</div><div className="checkpoint-list"><button type="button" onClick={restartQa}><span>00</span><strong>Opening signal</strong><small>Fresh QA story</small></button><button type="button" onClick={() => runDebugCheckpoint("Simulation briefing", ["wait for 28 minutes", "wait"])}><span>01</span><strong>Simulation briefing</strong><small>Reach Perelman’s field brief</small></button><button type="button" onClick={() => runDebugCheckpoint("Part II", ["$cheat 3"])}><span>02</span><strong>Part II · all horizons</strong><small>Unlock 2041–2081</small></button><button type="button" onClick={() => runDebugCheckpoint("Part III", ["$cheat 1", "peof", "wait for 8 minutes", "@continue", "look"])}><span>03</span><strong>Part III · evidence accepted</strong><small>Begin the emergency act</small></button><button type="button" onClick={() => runDebugCheckpoint("Epilogue", ["$cheat 2", "@continue", "@continue", "look"])}><span>04</span><strong>Victory & epilogue</strong><small>Jump to the final simulation</small></button></div><div className="debug-telemetry"><div><span>Phase</span><strong>{phase}</strong></div><div><span>Mode</span><strong>{mode || "unresolved"}</strong></div><div><span>Input</span><strong>{inputKind} / {acceptsInput ? "ready" : "busy"}</strong></div><div><span>Queue</span><strong>{debugQueue.length || "idle"}</strong></div></div>{debugMessage && <p className="debug-message">{debugQueue.length === 0 && debugMessage.startsWith("Running:") ? "Checkpoint ready." : debugMessage}</p>}<details><summary>Raw status window</summary><pre>{gridText || "No grid text yet."}</pre></details><details><summary>Recent bridge transcript</summary><pre>{recentText || "No transcript yet."}</pre></details><button className="return-canonical" type="button" onClick={returnToCanonical}>Leave QA and return to canonical story</button></section>}
        </div>
      </aside>

      {fieldworkOpen && <div className="fieldwork-drawer-backdrop">
        <section className={`fieldwork-drawer ${initialFieldworkActive ? "with-brief" : "map-only"}`} role="dialog" aria-modal="true" aria-labelledby="fieldwork-title" data-fieldwork-view={fieldworkView}>
          <header className="fieldwork-drawer-header"><div><span className="section-kicker">{initialFieldworkActive ? "Perelman’s fieldwork console" : "Rockvil navigation"}</span><h2 id="fieldwork-title">{initialFieldworkActive ? "Map & recording brief" : "Rockvil map"}</h2><p>{currentRoomName ? `${currentRoomName}${displayYear ? ` · ${displayYear}` : ""}` : "Choose a destination on the original map."}</p></div><div className="fieldwork-drawer-status">{initialFieldworkActive && <span><b>{fieldworkRecordedCount}</b> / {FIELD_ASSIGNMENTS.length} recorded</span>}{recording && <strong>● RECORDING</strong>}{interactionLevel === "actions" && initialFieldworkActive && currentFieldworkAssignment && !currentFieldworkComplete && !recording && <button type="button" onClick={() => sendCommand("record")} disabled={!acceptsInput}>Start RECORD</button>}<button ref={fieldworkCloseRef} className="fieldwork-close" type="button" onClick={closeFieldwork} aria-label="Close map and fieldwork brief">×</button></div></header>
          {initialFieldworkActive && <div className="fieldwork-drawer-tabs" role="tablist" aria-label="Fieldwork views"><button type="button" role="tab" aria-selected={fieldworkView === "map"} onClick={() => setFieldworkView("map")}>Map & route</button><button type="button" role="tab" aria-selected={fieldworkView === "brief"} onClick={() => setFieldworkView("brief")}>Brief <span>{fieldworkRecordedCount}/{FIELD_ASSIGNMENTS.length}</span></button></div>}
          <div className={`fieldwork-drawer-body ${initialFieldworkActive ? "with-brief" : "map-only"}`}>
            <RockvilNavigator currentRoomId={room?.id ?? null} routePreview={mapRoutePreview} onSelect={selectMapLandmark} onStep={useMapRouteStep} onClear={() => setMapDestinationId(null)} stepLabel={interactionLevel === "guided" ? "Draft next step" : "Take next step"} disabled={!acceptsInput} />
            {initialFieldworkActive && <section className="fieldwork-checklist" aria-label="Fieldwork checklist"><div className="checklist-heading"><div><span>Perelman’s brief</span><strong>{fieldworkRecordedCount} of {FIELD_ASSIGNMENTS.length} recorded</strong></div><small>RECORD must be active during the experience. Checks follow the same Release 79 triggers as the game.</small></div><ol>{FIELD_ASSIGNMENTS.map((assignment, index) => { const destination = ROCKVIL_LANDMARKS.find((landmark) => landmark.assignment === index); const complete = fieldProgress[index]; const current = currentFieldworkIndex === index; return <li key={assignment} className={`${complete ? "complete" : ""} ${current ? "current" : ""}`}><span aria-hidden="true">{complete ? "✓" : String(index + 1).padStart(2, "0")}</span><div><strong>{assignment}</strong>{destination && <small>{destination.label}{current ? " · you are here" : ""}</small>}</div>{destination && <button type="button" onClick={() => plotFieldworkAssignment(destination)} aria-label={`Plot route for ${assignment}`}>{mapDestinationId === destination.id ? "Route plotted" : "Show on map"}</button>}</li>; })}</ol></section>}
          </div>
        </section>
      </div>}

      {shareState !== "idle" && <div className={`share-toast ${shareState}`} role="status">{shareState === "shared" ? "Shared" : shareState === "copied" ? "Link copied" : "Couldn’t copy the link"}</div>}

      {introOpen && <section className="intro-overlay" role="dialog" aria-modal="true" aria-labelledby="intro-title" aria-hidden={Boolean(packageItem)} inert={packageItem ? true : undefined}>
        <div className="intro-art" aria-hidden="true" /><div className="intro-grid" aria-hidden="true" />
        <div className="intro-content">
          <span className="intro-kicker">THE COMPLETE 1985 INTERACTIVE NOVEL · RELEASE 79</span>
          <h1 id="intro-title"><span>A Mind</span><span>Forever</span><span>Voyaging</span></h1>
          <p className="intro-lede">Read closely. Wander. Talk to people. Notice the ordinary things.</p>
          <div className="intro-principles"><div><span>01</span><strong>Read</strong><p>Names and small details matter.</p></div><div><span>02</span><strong>Explore</strong><p>People, places, and objects are interactive.</p></div><div><span>03</span><strong>Remember</strong><p>Keep what you think matters.</p></div></div>
          <fieldset className="intro-play-style"><legend>How would you like to play?</legend><div>{([['classic', 'Classic', 'The original command line.'], ['guided', 'Guided', 'Clickable navigation and editable hints.'], ['actions', 'Action menus', 'Direct actions for useful scene details.']] as Array<[InteractionLevel, string, string]>).map(([value, label, copy]) => <button type="button" key={value} aria-pressed={interactionLevel === value} className={interactionLevel === value ? "active" : ""} onClick={() => chooseInteractionLevel(value)}><strong>{label}</strong><span>{copy}</span></button>)}</div></fieldset>
          <div className="intro-actions"><button type="button" className="begin-button" onClick={begin}>{returning ? "Return to story" : `Begin · ${interactionLevel === "actions" ? "Action menus" : interactionLevel[0].toUpperCase() + interactionLevel.slice(1)}`}<span>→</span></button><button type="button" className="package-button" onClick={() => setPackageItem("map")}>Open the original package</button><button type="button" className="share-intro-button" onClick={handleShare}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.4" /><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="19" r="2.4" /><path d="m8.1 10.8 7.7-4.5M8.1 13.2l7.7 4.5" /></svg>Share this edition</button></div>
          <details className="content-note"><summary>Historical content note</summary><p>The unaltered 1985 text includes depictions and language involving authoritarianism, poverty, racism, religious extremism, suicide, and violence.</p></details>
          <p className="intro-credit">Written by Steve Meretzky · Original release by Infocom · Interpreter by Parchment</p>
        </div>
      </section>}

      {qaWarningOpen && <section className="qa-warning-overlay" role="dialog" aria-modal="true" aria-labelledby="qa-warning-title"><div className="qa-warning-card"><span className="section-kicker">Explicit consent required</span><h2 id="qa-warning-title">This reveals the whole structure.</h2><p>Debug mode names future years, later acts, and the ending. It opens a separate noncanonical interpreter with the original developers’ dormant shortcuts restored. QA autosave is disabled; your live Release 79 session waits in memory until you return.</p><div><button type="button" onClick={enableQa}>Enable spoilers & load QA build</button><button type="button" onClick={() => setQaWarningOpen(false)}>Cancel</button></div></div></section>}

      <PackageOverlay item={packageItem} onSelect={setPackageItem} onClose={() => setPackageItem(null)} />

      <div className="screen-reader-status" aria-live="polite" aria-hidden={introOpen || qaWarningOpen}>{mode ? `${mode}.` : "Story opening."} {currentPlace || ""} {displayYear || ""}</div>
      <div className="era-index" aria-hidden="true" style={{ "--era-index": Math.max(0, eraIndex) } as React.CSSProperties} />
    </main>
  );
}
