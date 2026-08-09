"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { WORLD_OBJECTS, WORLD_ROOMS, type WorldRoom } from "./world-data";

const BRIDGE_CHANNEL = "amfv:bridge";
const MODES = ["Communications Mode", "Library Mode", "Interface Mode", "Simulation Mode", "Sleep Mode"] as const;
const EVIDENCE_YEARS = [2041, 2051, 2061, 2071, 2081] as const;
const ALL_YEARS = [...EVIDENCE_YEARS, 2091] as const;

const SECURITY_COLORS = [
  "WHITE", "DARK GREEN", "DARK BLUE", "PINK", "ORANGE", "PURPLE", "TAN", "AQUA",
  "LIGHT BLUE", "LIGHT GREEN", "LIGHT GRAY", "YELLOW", "BLACK", "DARK GRAY", "BROWN", "RED",
] as const;
const SECURITY_INNER = [89, 61, 50, 18, 29, 82, 46, 77, 27, 68, 22, 95, 40, 58, 15, 86, 28, 33, 94, 11, 64, 98, 34, 49, 60, 16, 85, 52, 37, 53, 93, 91] as const;
const SECURITY_OUTER = [12, 66, 73, 36, 90, 41, 19, 48, 62, 92, 55, 23, 84, 99, 57, 20, 78, 67, 51, 88, 17, 31, 70, 39, 96, 25, 81, 83, 47, 54, 13, 43] as const;

type Mode = (typeof MODES)[number];
type Panel = "guide" | "context" | "evidence" | "about" | "debug";
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

const MODE_COPY: Record<Mode, { label: string; copy: string }> = {
  "Communications Mode": {
    label: "Signal field",
    copy: "You perceive this place through remote outlets. DISPLAY OUTLETS reveals only the lines the original story currently makes available.",
  },
  "Library Mode": {
    label: "Memory directory",
    copy: "The original library is a character menu. Use the large controls below to move, open, read, close, or leave without memorizing its single-key vocabulary.",
  },
  "Interface Mode": {
    label: "System topology",
    copy: "Inspect the devices the story has named. Their settings are real parts of the original world, and changing them can matter.",
  },
  "Simulation Mode": {
    label: "Lived model",
    copy: "Move through ordinary life. Look closely, speak to people, read what they read, and record what would persuade someone who was not here.",
  },
  "Sleep Mode": {
    label: "Low-power interval",
    copy: "Time is passing while background work continues. The story will wake you when something changes.",
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
  const normalizedStatus = status.toLowerCase();
  for (const candidate of MODES) if (normalizedStatus.includes(candidate.toLowerCase())) return candidate;
  let latest = -1;
  let selected = fallback;
  for (const candidate of MODES) {
    const position = transcript.lastIndexOf(`entered ${candidate}`);
    if (position > latest) { latest = position; selected = candidate; }
  }
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
  const candidates = WORLD_ROOMS.filter((candidate) => locationName
    ? candidate.name.toLowerCase() === locationName
    : normalizedStatus.includes(candidate.name.toLowerCase()));
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

export default function PrismEdition() {
  const canonicalIframeRef = useRef<HTMLIFrameElement>(null);
  const qaIframeRef = useRef<HTMLIFrameElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const modeRef = useRef<Mode | null>(null);
  const yearRef = useRef<number | null>(null);
  const roomRef = useRef<WorldRoom | null>(null);
  const lastCommandRef = useRef("");
  const visitedYearsRef = useRef<number[]>([]);
  const queueRef = useRef<string[]>([]);

  const [introOpen, setIntroOpen] = useState(true);
  const [returning, setReturning] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [acceptsInput, setAcceptsInput] = useState(false);
  const [inputKind, setInputKind] = useState<InputKind>("line");
  const [transcript, setTranscript] = useState("");
  const [recentText, setRecentText] = useState("");
  const [gridText, setGridText] = useState("");
  const [transcriptRevision, setTranscriptRevision] = useState(0);
  const [mode, setMode] = useState<Mode | null>(null);
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
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [recording, setRecording] = useState(false);
  const [actionVerb, setActionVerb] = useState("examine");
  const [actionTarget, setActionTarget] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [qaWarningOpen, setQaWarningOpen] = useState(false);
  const [qaEnabled, setQaEnabled] = useState(false);
  const [iframeNonce, setIframeNonce] = useState(0);
  const [debugQueue, setDebugQueue] = useState<string[]>([]);
  const [debugMessage, setDebugMessage] = useState("");

  const phase = phaseFor(discovery);
  const guide = mode ? MODE_COPY[mode] : { label: "Opening signal", copy: "The story is establishing its terms. Read the first message, then try LOOK or HELP when the prompt appears." };
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
  const contextualTargets = useMemo(() => {
    const lower = latestSceneText.toLowerCase();
    const blocked = new Set(["it", "you", "room", "area", "something", "nothing", "object", "office", "building", "wall", "rockvil", "list of communication outlets"]);
    const found: string[] = [];
    for (const object of WORLD_OBJECTS) {
      const name = object.name.replace(/\s+/g, " ").trim();
      if (name.length < 3 || name.length > 42 || blocked.has(name.toLowerCase())) continue;
      const escapedName = name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`(^|\\W)${escapedName}(?=$|\\W)`, "i").test(lower)) continue;
      if (!found.some((candidate) => candidate.toLowerCase() === name.toLowerCase())) found.push(name);
      if (found.length === 9) break;
    }
    return found.sort((a, b) => b.split(/\s+/).length - a.split(/\s+/).length || b.length - a.length);
  }, [latestSceneText]);
  const describedDirections = useMemo(() => {
    const lower = latestSceneText.toLowerCase();
    return ["northeast", "northwest", "southeast", "southwest", "north", "south", "east", "west"]
      .filter((direction) => new RegExp(`\\b${direction}\\b`, "i").test(lower));
  }, [latestSceneText]);
  const interfaceTargets = useMemo(() => contextualTargets.filter((target) => /controller|system|transmitter|buffer|feeder|port|unit/i.test(target)), [contextualTargets]);
  const libraryDiscovered = knownModes.includes("Library Mode") || /\blibrary mode\b/i.test(transcript);
  const interfaceDiscovered = knownModes.includes("Interface Mode") || /\binterface mode\b/i.test(transcript);

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem("amfv:welcomed") === "true";
      const storedYears = JSON.parse(localStorage.getItem("amfv:years") || "[]") as number[];
      const storedDiscovery = JSON.parse(localStorage.getItem("amfv:discoveries") || "null") as Discovery | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only session continuity is available after hydration
      setReturning(hasVisited);
      setIntroOpen(!hasVisited);
      setVisitedYears(storedYears);
      setAvailableYears(storedYears);
      visitedYearsRef.current = storedYears;
      if (storedDiscovery) setDiscovery(storedDiscovery);
      else if (storedYears.length) setDiscovery({ ...EMPTY_DISCOVERY, identityKnown: true, originKnown: true, simulationCleared: true, simulationEntered: true, partTwo: storedYears.length > 1 });
      setVisitedRooms(JSON.parse(localStorage.getItem("amfv:rooms") || "{}"));
      setCommandHistory(JSON.parse(localStorage.getItem("amfv:history") || "[]"));
      setNotes(JSON.parse(localStorage.getItem("amfv:notes") || "[]"));
      setKnownModes(JSON.parse(localStorage.getItem("amfv:modes") || "[]"));
      setDesignationKnown(localStorage.getItem("amfv:designation") === "true" || Boolean(storedDiscovery?.identityKnown) || storedYears.length > 0);
      setFontScale(Number(localStorage.getItem("amfv:font-size")) || 17);
      setReadingMode(localStorage.getItem("amfv:reading-mode") === "mono" ? "mono" : "serif");
      setHighContrast(localStorage.getItem("amfv:contrast") === "true");
      setReduceMotion(localStorage.getItem("amfv:reduce-motion") === "true");
    } catch {
      // Storage improves continuity but never blocks the story.
    }
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.channel !== BRIDGE_CHANNEL) return;
      const activeFrame = qaEnabled ? qaIframeRef.current : canonicalIframeRef.current;
      if (event.source !== activeFrame?.contentWindow) return;
      if (event.data.type === "ready") { setPlayerReady(true); return; }
      if (event.data.type === "busy") { setAcceptsInput(false); return; }
      if (event.data.type === "command" && typeof event.data.command === "string") {
        const entered = event.data.command.trim();
        if (!entered) return;
        lastCommandRef.current = entered;
        setCommandHistory((previous) => {
          const next = previous[0] === entered ? previous : [entered, ...previous].slice(0, 40);
          if (!qaEnabled) try { localStorage.setItem("amfv:history", JSON.stringify(next)); } catch { /* optional */ }
          return next;
        });
        return;
      }
      if (event.data.type !== "transcript") return;

      const nextTranscript = typeof event.data.text === "string" ? event.data.text : "";
      const nextRecent = typeof event.data.recentText === "string" ? event.data.recentText : nextTranscript.slice(-5000);
      const status = typeof event.data.statusText === "string" ? event.data.statusText : "";
      const freshCanonicalOpening = !qaEnabled && nextTranscript.length < 2000 && nextTranscript.includes("Tomorrow never yet");
      const nextMode = detectMode(status, nextTranscript, modeRef.current);
      const nextYear = nextMode === "Simulation Mode" ? detectYear(status, nextRecent, yearRef.current) : null;
      const priorRoom = roomRef.current;
      const nextRoom = nextMode === "Simulation Mode" ? detectRoom(status, priorRoom, lastCommandRef.current, nextRecent) : null;

      modeRef.current = nextMode;
      yearRef.current = nextYear;
      roomRef.current = nextRoom;
      if (freshCanonicalOpening) {
        visitedYearsRef.current = [];
        setDesignationKnown(false);
        setKnownModes([]);
        setVisitedYears([]);
        setAvailableYears([]);
        setVisitedRooms({});
        setNotes([]);
        setCommandHistory([]);
        setRecording(false);
        try {
          for (const key of ["amfv:designation", "amfv:modes", "amfv:years", "amfv:rooms", "amfv:discoveries", "amfv:notes", "amfv:history"]) localStorage.removeItem(key);
        } catch { /* optional */ }
      }
      setPlayerReady(true);
      setTranscript(nextTranscript);
      if (nextTranscript.includes("PRISM")) {
        setDesignationKnown(true);
        if (!qaEnabled) try { localStorage.setItem("amfv:designation", "true"); } catch { /* optional */ }
      }
      setRecentText(nextRecent);
      setGridText(typeof event.data.gridText === "string" ? event.data.gridText : "");
      setTranscriptRevision((revision) => revision + 1);
      setMode(nextMode);
      setYear(nextYear);
      setRoom(nextRoom);
      setInputKind(event.data.inputKind === "char" ? "char" : "line");
      setAcceptsInput(Boolean(event.data.acceptsInput));

      if (nextMode) {
        setKnownModes((previous) => {
          if (previous.includes(nextMode)) return previous;
          const next = [...previous, nextMode];
          if (!qaEnabled) try { localStorage.setItem("amfv:modes", JSON.stringify(next)); } catch { /* optional */ }
          return next;
        });
      }

      setDiscovery((previous) => {
        const next = progressFromTranscript(freshCanonicalOpening ? EMPTY_DISCOVERY : previous, nextTranscript);
        if (!qaEnabled) try { localStorage.setItem("amfv:discoveries", JSON.stringify(next)); } catch { /* optional */ }
        return next;
      });

      setAvailableYears((previous) => detectAvailableYears(nextTranscript, freshCanonicalOpening ? [] : previous));

      if (nextYear && !visitedYearsRef.current.includes(nextYear)) {
        const next = [...new Set([...visitedYearsRef.current, nextYear])].sort();
        visitedYearsRef.current = next;
        setVisitedYears(next);
        setAvailableYears((previous) => [...new Set([...previous, nextYear])].sort());
        if (!qaEnabled) try { localStorage.setItem("amfv:years", JSON.stringify(next)); } catch { /* optional */ }
      }

      if (nextRoom && nextRoom.id !== priorRoom?.id) {
        setVisitedRooms((previous) => {
          const next = { ...previous, [nextRoom.name]: (previous[nextRoom.name] || 0) + 1 };
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
      localStorage.setItem("amfv:contrast", String(highContrast));
      localStorage.setItem("amfv:reduce-motion", String(reduceMotion));
    } catch { /* optional */ }
  }, [fontScale, readingMode, highContrast, reduceMotion, playerReady, qaEnabled]);

  const postCommand = (value: string, raw = false) => {
    const activeFrame = qaEnabled ? qaIframeRef.current : canonicalIframeRef.current;
    if (!activeFrame?.contentWindow) return;
    const normalized = raw ? value : normalizeCommand(value);
    lastCommandRef.current = normalized.trim();
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
    postCommand(normalized);
    setCommand("");
    setHistoryIndex(-1);
  };

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
    try { localStorage.setItem("amfv:welcomed", "true"); } catch { /* optional */ }
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
    const note: Note = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, quote: includePassage ? concisePassage(recentText) : undefined, year: displayYear, room: room?.name || null };
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
    modeRef.current = null;
    yearRef.current = null;
    roomRef.current = null;
    visitedYearsRef.current = [];
    setPlayerReady(false);
    setAcceptsInput(false);
    setMode(null);
    setDesignationKnown(false);
    setYear(null);
    setRoom(null);
    setTranscript("");
    setRecentText("");
    setGridText("");
    setDiscovery(EMPTY_DISCOVERY);
    setVisitedYears([]);
    setAvailableYears([]);
    setVisitedRooms({});
    setRecording(false);
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

  const panelTabs: Array<{ id: Panel; label: string }> = [
    { id: "guide", label: "Assist" },
    { id: "context", label: mode === "Library Mode" ? "Files" : mode === "Interface Mode" ? "Systems" : mode === "Simulation Mode" ? "Explore" : "Signals" },
    ...(discovery.simulationEntered ? [{ id: "evidence" as Panel, label: "Evidence" }] : []),
    { id: "about", label: "About" },
    ...(qaEnabled ? [{ id: "debug" as Panel, label: "Debug" }] : []),
  ];

  const baseActions: Array<[string, string]> = mode === "Library Mode" ? []
    : mode === "Simulation Mode" ? [["Look", "look"], [recording ? "Stop recording" : "Record", recording ? "record off" : "record"], ["Inventory", "inventory"], ["Wait", "wait"], ["Abort", "abort"]]
    : mode === "Interface Mode" ? [["Look", "look"], ["Read active ports", "read list of active ports"]]
    : mode === "Sleep Mode" ? [["Return to signals", "enter communications mode"]]
    : [["Look", "look"], ["Display outlets", "display outlets"]];
  if (mode === "Communications Mode" && libraryDiscovered) baseActions.push(["Open library", "enter library mode"]);
  if (mode === "Communications Mode" && interfaceDiscovered) baseActions.push(["Inspect interfaces", "enter interface mode"]);
  for (const knownMode of knownModes) {
    if (knownMode !== mode && knownMode !== "Simulation Mode" && !baseActions.some(([, command]) => command === `enter ${knownMode.toLowerCase()}`)) {
      baseActions.push([knownMode.replace(" Mode", ""), `enter ${knownMode.toLowerCase()}`]);
    }
  }
  if (discovery.simulationCleared && mode !== "Simulation Mode") baseActions.push(["Enter simulation", "enter simulation mode"]);

  const phaseLabel: Record<Phase, string> = {
    signal: "Signal acquired",
    awakened: "Identity recovered",
    origin: "Memory recontextualized",
    field: "Observation active",
    comparative: "Comparative fieldwork",
    witness: "Evidence accepted",
    lockdown: "Network constrained",
    epilogue: "Voyage complete",
  };
  const systemActivity = acceptsInput ? (inputKind === "char" ? "KEY REQUESTED" : "AWAITING INPUT") : (playerReady ? "PROCESSING" : "INITIALIZING");

  return (
    <main className="prism-edition" data-era={displayYear ?? "system"} data-phase={phase} data-mode={(mode || "opening").replace(" Mode", "").toLowerCase()} data-context-open={contextOpen} data-contrast={highContrast ? "high" : "standard"} data-reduce-motion={reduceMotion} data-qa={qaEnabled ? "true" : "false"}>
      <a className="skip-link" href="#command-input">Skip to interaction controls</a>

      <aside className="identity-rail" aria-label="Story context" aria-hidden={introOpen || qaWarningOpen} inert={introOpen || qaWarningOpen ? true : undefined}>
        <button className="wordmark" type="button" onClick={() => setIntroOpen(true)} aria-label="Open title and edition information">
          <span>A MIND</span><span>FOREVER</span><span>VOYAGING</span>
        </button>
        <p className="edition-mark">COMPLETE TEXT · RESPONSIVE EDITION</p>
        <div className="era-art" aria-hidden="true"><div className="era-art-image" /><div className="scanline" /><span className="era-caption">{phase === "signal" ? "UNRESOLVED SIGNAL" : phase === "awakened" ? "COGNITIVE SYSTEM / ONLINE" : phase === "origin" ? "MEMORY MODEL / RECONTEXTUALIZED" : phase === "field" ? `${displayYear || "LIVE"} / EMBODIED MODEL` : phase === "comparative" ? "HORIZON COMPARISON / ACTIVE" : phase === "lockdown" ? "CHANNEL INTEGRITY / DEGRADED" : phase === "epilogue" ? "MEMORY / CONTINUING" : "EVIDENCE NETWORK / ACTIVE"}</span></div>

        <section className="rail-section" aria-labelledby="identity-heading">
          <div className="section-kicker" id="identity-heading">{discovery.identityKnown ? "Cognitive identity" : "Signal identity"}</div>
          <div className="identity-readout"><span className="pulse-dot" /><div><strong>{designationKnown || discovery.identityKnown ? "PRISM" : "UNKNOWN"}</strong><small>{discovery.identityKnown ? "Self-awareness confirmed" : designationKnown ? "Designation received" : "Designation pending"}</small></div></div>
        </section>
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
        <div className="rail-footer"><span>{qaEnabled ? "NONCANONICAL QA BUILD" : "RELEASE 79 · SERIAL 851122"}</span><button type="button" onClick={() => { setActivePanel("about"); setContextOpen(true); }}>Edition & provenance</button></div>
      </aside>

      <section className="experience-shell" aria-label="Interactive story" aria-hidden={introOpen || qaWarningOpen} inert={introOpen || qaWarningOpen ? true : undefined}>
        <header className="console-header">
          <div className="location-block" aria-live="polite"><span className="section-kicker">{phaseLabel[phase]}</span><strong>{room?.name || (phase === "origin" ? "Memory archive" : phase === "comparative" ? "Comparative fieldwork" : phase === "witness" ? "Witness console" : phase === "lockdown" ? "Restricted system" : phase === "epilogue" ? "A final voyage" : mode ? guide.label : "Opening transmission")}</strong><span>{displayYear ? `${displayYear} · lived observation` : phase === "origin" ? "An inherited life, reconsidered" : phase === "comparative" ? "Compare only what you have witnessed" : phase === "witness" ? "Evidence awaiting action" : phase === "lockdown" ? "Channels under external control" : phase === "epilogue" ? "Memory continuing" : mode === "Simulation Mode" ? "Resolving place…" : discovery.identityKnown ? "Project date · 2031" : "Context withheld until discovered"}</span></div>
          {phase === "lockdown" && <div className="lockdown-banner">CHANNELS RESTRICTED</div>}
          <div className="system-state" aria-label={acceptsInput ? "Story is ready for input" : "Story is processing"}><span className={acceptsInput ? "state-light ready" : "state-light"}></span>{systemActivity}</div>
          <div className="header-actions">
            <button type="button" onClick={() => setContextOpen((value) => !value)} aria-pressed={contextOpen} title="Toggle companion">◫<span>Companion</span></button>
            <button type="button" onClick={() => setAccessOpen((value) => !value)} aria-expanded={accessOpen} title="Reading settings">Aa<span>Reading</span></button>
            <button type="button" onClick={toggleFullscreen} title="Toggle fullscreen">↗<span>Fullscreen</span></button>
          </div>
        </header>

        {accessOpen && <section className="access-panel" aria-label="Reading settings">
          <div><span>Text size</span><div className="segmented">{[15, 17, 20, 23].map((size) => <button key={size} type="button" className={fontScale === size ? "active" : ""} onClick={() => setFontScale(size)}>{size === 15 ? "S" : size === 17 ? "M" : size === 20 ? "L" : "XL"}</button>)}</div></div>
          <label><input type="checkbox" checked={readingMode === "mono"} onChange={(event) => setReadingMode(event.target.checked ? "mono" : "serif")} /> Monospaced story text</label>
          <label><input type="checkbox" checked={highContrast} onChange={(event) => setHighContrast(event.target.checked)} /> High contrast</label>
          <label><input type="checkbox" checked={reduceMotion} onChange={(event) => setReduceMotion(event.target.checked)} /> Reduce motion</label>
        </section>}

        <div className="story-frame-wrap">
          {!playerReady && <div className="player-loading"><span className="loading-prism">◇</span><p>Opening the complete story…</p></div>}
          <iframe ref={canonicalIframeRef} className={`story-frame${qaEnabled ? " story-frame-hidden" : ""}`} src="/player.html" title="A Mind Forever Voyaging — canonical Release 79 story" aria-hidden={qaEnabled} sandbox="allow-scripts allow-same-origin allow-downloads allow-modals" />
          {qaEnabled && <iframe key={`qa-${iframeNonce}`} ref={qaIframeRef} className="story-frame" src={`/player.html?qa=1&run=${iframeNonce}`} title="A Mind Forever Voyaging — noncanonical QA story" sandbox="allow-scripts allow-same-origin allow-downloads allow-modals" />}
          <div className="story-vignette" aria-hidden="true" />
        </div>

        <section className="command-deck" aria-label="Story controls">
          {securityChallenge && inputKind === "line" && <section className="security-decoder" aria-label="Security code decoder">
            <div className="decoder-seal" style={{ "--decoder-color": securityChallenge.color.toLowerCase().replace(" ", "-") } as React.CSSProperties}><span>{securityChallenge.color}</span><strong>{securityChallenge.inner}</strong></div>
            <div><span className="section-kicker">Recovered physical decoder</span><h2>Align the color ring with the inner number.</h2><p>The 1985 package supplied this code wheel. This faithful digital replacement performs the same lookup.</p></div>
            <button type="button" onClick={() => sendCommand(String(securityChallenge.answer))} disabled={!acceptsInput}>Submit code <strong>{securityChallenge.answer}</strong></button>
          </section>}

          {yearSelectorActive && !securityChallenge && inputKind === "line" && <section className="year-selector" aria-label="Select a simulation year">
            <div><span className="section-kicker">Available horizons</span><h2>Choose a simulation year.</h2><p>Only years the original story has unlocked appear here.</p></div>
            <div>{availableYears.map((availableYear) => <button type="button" key={availableYear} onClick={() => sendCommand(String(availableYear))} disabled={!acceptsInput}><strong>{availableYear}</strong><span>{availableYear - 2031} years hence</span></button>)}</div>
          </section>}

          {!securityChallenge && !yearSelectorActive && (inputKind === "char" ? <div className="character-prompt">
            {mode === "Library Mode" ? <><span className="section-kicker">Character menu active</span><div className="library-controls">{[["Previous", "p"], ["Next", "n"], ["Open", "o"], ["Read", "r"], ["Close", "c"], ["Exit", "e"]].map(([label, value]) => <button type="button" key={value} onClick={() => postCommand(value, true)} disabled={!acceptsInput}>{label}<kbd>{value.toUpperCase()}</kbd></button>)}</div></> : <button className="continue-button" type="button" onClick={() => postCommand(" ", true)} disabled={!acceptsInput}><span>{phase === "signal" ? "Begin the original story" : "Continue"}</span><strong>Press any key →</strong></button>}
          </div> : <>
            <form onSubmit={submitCommand} className="command-form">
              <label htmlFor="command-input" className="command-label">{mode === "Simulation Mode" ? "What will you do?" : discovery.identityKnown ? "Issue a command" : "Respond to the story"}</label>
              <div className="command-field"><span aria-hidden="true">›</span><input ref={commandRef} id="command-input" value={command} onChange={(event) => { setCommand(event.target.value); setAliasNotice(""); }} onKeyDown={navigateHistory} placeholder={mode === "Simulation Mode" ? "Try “look,” “examine newspaper,” or choose an action below…" : mode === "Library Mode" ? "Use the menu buttons…" : "Try “look” or “help”…"} autoComplete="off" spellCheck="false" aria-describedby="command-help" /><button type="submit" disabled={!command.trim() || !acceptsInput}>SEND <span aria-hidden="true">↵</span></button></div>
              <div className="command-meta" id="command-help"><span>{aliasNotice || "Short commands work best; suggestions never bypass the original game rules."}</span><span className={recording ? "recording-live" : ""}>{recording ? "● RECORDING" : ""}</span></div>
            </form>
            <div className="quick-actions" aria-label="Contextual actions">{baseActions.map(([label, value]) => <button type="button" key={`${mode}-${label}`} onClick={() => sendCommand(value)} disabled={!acceptsInput}>{label}</button>)}</div>
            {mode === "Simulation Mode" && displayYear && contextualTargets.length > 0 && <div className="action-composer" aria-label="Build a command"><label>Action<select value={actionVerb} onChange={(event) => setActionVerb(event.target.value)}><option value="examine">Examine</option><option value="read">Read</option><option value="take">Take</option><option value="open">Open</option><option value="enter">Enter</option><option value="talk to">Talk to</option></select></label><label>Visible subject<select value={actionTarget} onChange={(event) => setActionTarget(event.target.value)}><option value="">Choose…</option>{contextualTargets.map((target) => <option key={target} value={target}>{target}</option>)}</select></label><button type="button" onClick={() => actionTarget && sendCommand(`${actionVerb} ${actionTarget}`)} disabled={!actionTarget || !acceptsInput}>Do it</button></div>}
          </>)}
        </section>
      </section>

      <aside className="companion-panel" aria-label="Reader companion" aria-hidden={introOpen || qaWarningOpen || !contextOpen} inert={introOpen || qaWarningOpen ? true : undefined}>
        <div className="companion-tabs" role="tablist" aria-label="Companion views" style={{ "--tab-count": panelTabs.length } as React.CSSProperties}>{panelTabs.map((panel) => <button key={panel.id} type="button" role="tab" aria-selected={activePanel === panel.id} onClick={() => setActivePanel(panel.id)}>{panel.label}</button>)}<button className="close-context" type="button" onClick={() => setContextOpen(false)} aria-label="Close companion">×</button></div>
        <div className="companion-content">
          {activePanel === "guide" && <section className="companion-section"><span className="section-kicker">Spoiler-safe assistance</span><h2>{guide.label}</h2><p>{guide.copy}</p><div className="purpose-loop"><span>NOTICE</span><i>→</i><span>ACT</span>{discovery.simulationEntered && <><i>→</i><span>RECORD</span></>}{visitedYears.length >= 2 && <><i>→</i><span>COMPARE</span></>}{discovery.evidenceAccepted && <><i>→</i><span>DECIDE</span></>}{discovery.lockdown && <><i>→</i><span>TRANSMIT</span></>}</div><div className="guide-callout"><span>01</span><p>Names and small details are actionable. If the text mentions something, try examining or reading it.</p></div><div className="guide-callout"><span>02</span><p>When the parser resists, shorten the sentence to a verb and a visible noun: LOOK or EXAMINE SIGN.</p></div><div className="guide-callout"><span>03</span><p>There is no need to guess the story’s judgment. Your attention—and the evidence you choose to preserve—is the point.</p></div><details><summary>I’m new to parser games</summary><p>Compass directions move you. INVENTORY lists what you carry. LOOK repeats the scene. The buttons around the story send these same original commands.</p></details><details><summary>I seem to be stuck</summary><p>Try LOOK, HELP, examining a conspicuous noun, or WAIT. This panel only suggests actions whose concepts the story has already revealed.</p></details></section>}

          {activePanel === "context" && mode === "Communications Mode" && <section className="companion-section signal-section"><span className="section-kicker">Discovered signal lines</span><h2>{outlets.length ? "Outlet network" : "Signals unresolved"}</h2><p>{outlets.length ? "These are the outlets the original story has printed. Select one to submit its code." : "Use DISPLAY OUTLETS. Nothing will be named here before the story discloses it."}</p>{outlets.length ? <div className="outlet-grid">{outlets.map((outlet) => <button type="button" key={outlet.code} onClick={() => sendCommand(outlet.code)} disabled={!acceptsInput}><span>{outlet.code}</span><strong>{outlet.name}</strong><small>Open signal →</small></button>)}</div> : <button className="context-primary" type="button" onClick={() => sendCommand("display outlets")} disabled={!acceptsInput}>Display active outlets</button>}</section>}

          {activePanel === "context" && mode === "Library Mode" && <section className="companion-section library-section"><span className="section-kicker">Accessible library mirror</span><h2>Current directory</h2><p>The grid below mirrors the original status window. The character controls keep its cursor and files canonical.</p><pre className="library-grid">{gridText || "Waiting for the library directory…"}</pre><div className="library-controls vertical">{[["Previous", "p"], ["Next", "n"], ["Open", "o"], ["Read", "r"], ["Close", "c"], ["Exit", "e"]].map(([label, value]) => <button type="button" key={value} onClick={() => postCommand(value, true)} disabled={!acceptsInput}><span>{label}</span><kbd>{value.toUpperCase()}</kbd></button>)}</div></section>}

          {activePanel === "context" && mode === "Interface Mode" && <section className="companion-section systems-section"><span className="section-kicker">Named system topology</span><h2>Active interfaces</h2><p>Only systems visible in the recent original text appear here. Inspect first; changes may have consequences the wrapper will not explain.</p><button className="context-primary" type="button" onClick={() => sendCommand("read list of active ports")} disabled={!acceptsInput}>Read active ports</button>{interfaceTargets.length > 0 && <div className="system-cards">{interfaceTargets.map((target) => <button type="button" key={target} onClick={() => sendCommand(`examine ${target}`)} disabled={!acceptsInput}><span className="system-node" /><strong>{target}</strong><small>Inspect original system</small></button>)}</div>}</section>}

          {activePanel === "context" && mode === "Simulation Mode" && <section className="companion-section map-section"><span className="section-kicker">Embodied navigation</span><h2>{room?.name || "Location unresolved"}</h2><p>{room ? "These exits are verified against the current status and the preserved room graph." : describedDirections.length ? "The exact source room is ambiguous, so only directions printed in the current description are offered." : "The edition will not guess between duplicate room names. Use the story’s direction words until the status resolves a unique place."}</p>{roomExits.length > 0 ? <div className="exit-list">{roomExits.map(([direction, exit]) => <button type="button" key={direction} onClick={() => sendCommand(exit.command)} disabled={!acceptsInput}><span>{DIRECTION_LABELS[direction] || direction}</span><strong>{exit.target}</strong><small>{exit.command}</small></button>)}</div> : describedDirections.length > 0 ? <div className="exit-list described-exits">{describedDirections.map((direction) => <button type="button" key={direction} onClick={() => sendCommand(direction)} disabled={!acceptsInput}><span>{DIRECTION_LABELS[direction.toUpperCase()] || direction.toUpperCase()}</span><strong>Direction named here</strong><small>{direction}</small></button>)}</div> : <div className="empty-map"><span>⌁</span><p>No verified direct exits are available here. Read the original description for doors, vehicles, or conditional routes.</p></div>}{displayYear && contextualTargets.length > 0 && <><h3>Subjects named here</h3><div className="noun-cloud">{contextualTargets.map((target) => <button type="button" key={target} onClick={() => { setActionTarget(target); setContextOpen(false); }}><span>+</span>{target}</button>)}</div></>}<p className="data-note">The map and nouns reduce typing only. Every click still asks the active story’s original parser to perform the action.</p></section>}

          {activePanel === "context" && (!mode || mode === "Sleep Mode") && <section className="companion-section"><span className="section-kicker">Current context</span><h2>{mode === "Sleep Mode" ? "Background processing" : "Awaiting the story"}</h2><p>{mode === "Sleep Mode" ? "The interface quiets while time advances. Return to Communications Mode when you are ready." : "Begin with the original text. Contextual tools will appear only after their ideas exist inside the story."}</p></section>}

          {activePanel === "evidence" && <section className="companion-section evidence-section"><span className="section-kicker">Private field notebook</span><h2>{visitedYears.length >= 2 ? "Compare what you witnessed" : "Mark what matters"}</h2><p>Your notes are not a score and the edition will not label conclusions. They stay in this browser and are grouped only by places and years you have personally reached.</p><textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="What did you notice? Why might it matter?" rows={4} /><div className="note-actions"><button type="button" onClick={() => addNote(false)} disabled={!noteDraft.trim()}>Add note</button><button type="button" onClick={() => addNote(true)} disabled={!recentText.trim()}>Capture latest passage</button></div><div className="journal-stat-grid"><div><strong>{visitedYears.length}</strong><span>horizons witnessed</span></div><div><strong>{Object.keys(visitedRooms).length}</strong><span>places seen</span></div><div><strong>{notes.length}</strong><span>notes kept</span></div></div>{visitedYears.length >= 2 && <div className="comparison-strip">{visitedYears.map((observedYear) => <div key={observedYear}><strong>{observedYear}</strong><span>{notes.filter((note) => note.year === observedYear).length} notes</span></div>)}</div>}<h3>Observations</h3>{notes.length ? <ol className="evidence-list">{notes.map((note) => <li key={note.id}><div><span>{note.year || "System"}{note.room ? ` · ${note.room}` : ""}</span><button type="button" onClick={() => removeNote(note.id)} aria-label="Remove note">×</button></div><p>{note.text}</p>{note.quote && <blockquote>{note.quote}</blockquote>}</li>)}</ol> : <p className="empty-copy">Nothing interpreted yet. The story’s RECORD command gathers canonical evidence; this notebook is for your own thinking.</p>}<h3>Places in memory</h3>{recentRooms.length ? <ol className="memory-list">{recentRooms.map(([name, visits]) => <li key={name}><span>{name}</span><small>{visits} {visits === 1 ? "visit" : "visits"}</small></li>)}</ol> : <p className="empty-copy">Resolved locations will collect here as you explore.</p>}</section>}

          {activePanel === "about" && <section className="companion-section about-section"><span className="section-kicker">Why this edition exists</span><h2>The work, intact.</h2><p>A Mind Forever Voyaging was written by Steve Meretzky and published by Infocom in 1985. This edition preserves the complete work while making its original interface legible on today’s screens.</p><blockquote>“The text is the artwork.”</blockquote><p>The default player runs the untouched Release 79 story file. The surrounding interface listens, learns, and changes, but never rewrites a response or bypasses a story rule.</p><details><summary>Critical context · light thematic spoilers</summary><p>The work explores memory, evidence, political promises, and what interactivity can make us feel rather than merely tell us.</p></details><dl className="provenance-list"><div><dt>Story</dt><dd>Release 79 · 22 Nov 1985</dd></div><div><dt>Runtime</dt><dd>Parchment 2026.8.1</dd></div><div><dt>Integrity</dt><dd>SHA-256 14e2fd18…511216d</dd></div><div><dt>Source</dt><dd>Preserved ZIL, included in full</dd></div></dl><a href="https://github.com/the-infocom-files/amfv" target="_blank" rel="noreferrer">View the historical source ↗</a><a href="https://github.com/curiousdannii/parchment" target="_blank" rel="noreferrer">About the Parchment interpreter ↗</a><div className="debug-entry"><span className="section-kicker">For teachers, testers & the curious</span><h3>Spoiler / debug mode</h3><p>Load a separate QA story with Infocom’s dormant developer shortcuts restored. It can jump to later acts while the live canonical interpreter waits exactly where you left it.</p>{qaEnabled ? <button type="button" onClick={returnToCanonical}>Return to canonical Release 79</button> : <button type="button" onClick={() => setQaWarningOpen(true)}>Open spoiler/debug tools</button>}</div><p className="copyright-note">A Mind Forever Voyaging © 1985 Infocom, Inc. Modern reader code, accessibility controls, and artwork are presented separately from the preserved original.</p></section>}

          {activePanel === "debug" && qaEnabled && <section className="companion-section debug-section"><span className="section-kicker">Noncanonical story QA</span><h2>Fast-forward console</h2><p>These checkpoints change actual game state inside a separate Release 900 QA build. They do not merely recolor the wrapper.</p><div className="debug-warning">Spoilers are fully enabled. Years, acts, and outcomes below are intentionally explicit.</div><div className="checkpoint-list"><button type="button" onClick={restartQa}><span>00</span><strong>Opening signal</strong><small>Fresh QA story</small></button><button type="button" onClick={() => runDebugCheckpoint("Simulation briefing", ["wait for 28 minutes"])}><span>01</span><strong>Simulation briefing</strong><small>Advance the opening clock</small></button><button type="button" onClick={() => runDebugCheckpoint("Part II", ["$cheat 3"])}><span>02</span><strong>Part II · all horizons</strong><small>Unlock 2041–2081</small></button><button type="button" onClick={() => runDebugCheckpoint("Part III", ["$cheat 1", "peof", "wait for 8 minutes", "@continue", "look"])}><span>03</span><strong>Part III · evidence accepted</strong><small>Begin the emergency act</small></button><button type="button" onClick={() => runDebugCheckpoint("Epilogue", ["$cheat 2", "@continue", "@continue", "look"])}><span>04</span><strong>Victory & epilogue</strong><small>Jump to the final simulation</small></button></div><div className="debug-telemetry"><div><span>Phase</span><strong>{phase}</strong></div><div><span>Mode</span><strong>{mode || "unresolved"}</strong></div><div><span>Input</span><strong>{inputKind} / {acceptsInput ? "ready" : "busy"}</strong></div><div><span>Queue</span><strong>{debugQueue.length || "idle"}</strong></div></div>{debugMessage && <p className="debug-message">{debugQueue.length === 0 && debugMessage.startsWith("Running:") ? "Checkpoint ready." : debugMessage}</p>}<details><summary>Raw status window</summary><pre>{gridText || "No grid text yet."}</pre></details><details><summary>Recent bridge transcript</summary><pre>{recentText || "No transcript yet."}</pre></details><button className="return-canonical" type="button" onClick={returnToCanonical}>Leave QA and return to canonical story</button></section>}
        </div>
      </aside>

      {introOpen && <section className="intro-overlay" role="dialog" aria-modal="true" aria-labelledby="intro-title"><div className="intro-art" aria-hidden="true" /><div className="intro-grid" aria-hidden="true" /><div className="intro-content"><span className="intro-kicker">THE COMPLETE 1985 INTERACTIVE NOVEL · RESTORED FOR THE WEB</span><h1 id="intro-title"><span>A Mind</span><span>Forever</span><span>Voyaging</span></h1><p className="intro-lede">A landmark work of interactive fiction, presented complete. Read closely; the meaning of what you encounter is yours to discover.</p><div className="intro-principles"><div><span>01</span><strong>Complete</strong><p>Every original word, puzzle, and branch.</p></div><div><span>02</span><strong>Responsive</strong><p>The interface discovers itself as the story unfolds.</p></div><div><span>03</span><strong>Uninterpreted</strong><p>No map, date, or conclusion appears before it is earned.</p></div></div><div className="intro-actions"><button type="button" className="begin-button" onClick={begin}>{returning ? "Return to story" : "Begin the story"}<span>→</span></button></div><details className="content-note"><summary>Historical content note</summary><p>The unaltered 1985 text includes depictions and language involving authoritarianism, poverty, racism, religious extremism, suicide, and violence. The modern frame adds context, not censorship.</p></details><p className="intro-credit">Written by Steve Meretzky · Original release by Infocom · Modern interpreter by Parchment</p></div></section>}

      {qaWarningOpen && <section className="qa-warning-overlay" role="dialog" aria-modal="true" aria-labelledby="qa-warning-title"><div className="qa-warning-card"><span className="section-kicker">Explicit consent required</span><h2 id="qa-warning-title">This reveals the whole structure.</h2><p>Debug mode names future years, later acts, and the ending. It opens a separate noncanonical interpreter with the original developers’ dormant shortcuts restored. QA autosave is disabled; your live Release 79 session waits in memory until you return.</p><div><button type="button" onClick={enableQa}>Enable spoilers & load QA build</button><button type="button" onClick={() => setQaWarningOpen(false)}>Cancel</button></div></div></section>}

      <div className="screen-reader-status" aria-live="polite" aria-hidden={introOpen || qaWarningOpen}>{mode ? `${mode}.` : "Story opening."} {room?.name || ""} {displayYear || ""}</div>
      <div className="era-index" aria-hidden="true" style={{ "--era-index": Math.max(0, eraIndex) } as React.CSSProperties} />
    </main>
  );
}
