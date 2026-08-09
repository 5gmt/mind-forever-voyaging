"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { WORLD_ROOMS, type WorldRoom } from "./world-data";

const BRIDGE_CHANNEL = "amfv:bridge";
const MODES = ["Communications Mode", "Library Mode", "Interface Mode", "Simulation Mode", "Sleep Mode"] as const;
const YEARS = [2041, 2051, 2061, 2071] as const;

type Mode = (typeof MODES)[number];
type Panel = "guide" | "map" | "journal" | "about";
type ReadingMode = "serif" | "mono";

const MODE_GUIDES: Record<Mode, { label: string; copy: string; actions: Array<[string, string]> }> = {
  "Communications Mode": {
    label: "Remote senses",
    copy: "Route PRISM’s sight and hearing through project outlets. The outlet list shows the four-letter codes currently available.",
    actions: [["Show outlets", "display outlets"], ["Look", "look"], ["Library", "enter library mode"], ["Simulation", "enter simulation mode"]],
  },
  "Library Mode": {
    label: "Character menu",
    copy: "The original library uses single keys: next and previous move the cursor, open enters a directory, read opens a file, and exit returns to Communications.",
    actions: [["Next", "n"], ["Previous", "p"], ["Open", "o"], ["Read", "r"], ["Close", "c"], ["Exit", "e"]],
  },
  "Interface Mode": {
    label: "Systems console",
    copy: "Inspect PRISM’s active ports and settings. These controls belong to the original story; changes can have consequences.",
    actions: [["Look", "look"], ["Read ports", "read list of active ports"], ["Communications", "enter communications mode"]],
  },
  "Simulation Mode": {
    label: "Embodied world",
    copy: "Explore like ordinary interactive fiction. Observe widely. RECORD begins capturing evidence; RECORD OFF stops. ABORT returns to PRISM.",
    actions: [["Look", "look"], ["Record", "record"], ["Stop recording", "record off"], ["Inventory", "inventory"], ["Wait", "wait"], ["Abort", "abort"]],
  },
  "Sleep Mode": {
    label: "Background processing",
    copy: "PRISM is passing time in Sleep Mode. The original simulation will wake you when processing is complete or an interruption occurs.",
    actions: [["Communications", "enter communications mode"]],
  },
};

const DIRECTION_LABELS: Record<string, string> = {
  NORTH: "N", NORTHEAST: "NE", NE: "NE", EAST: "E", SOUTHEAST: "SE", SE: "SE",
  SOUTH: "S", SOUTHWEST: "SW", SW: "SW", WEST: "W", NORTHWEST: "NW", NW: "NW",
  UP: "UP", DOWN: "DN", IN: "IN", OUT: "OUT",
};

const normalizeCommand = (raw: string) => {
  const command = raw.trim().replace(/\s+/g, " ");
  const lower = command.toLowerCase();
  const exact: Record<string, string> = {
    "go north": "north", "go south": "south", "go east": "east", "go west": "west",
    "go northeast": "northeast", "go northwest": "northwest", "go southeast": "southeast", "go southwest": "southwest",
    "look around": "look", "show inventory": "inventory", "check inventory": "inventory",
    "where am i": "look", "stop recording": "record off",
  };
  if (exact[lower]) return exact[lower];
  if (lower.startsWith("pick up ")) return `take ${command.slice(8)}`;
  if (lower.startsWith("go into ")) return `enter ${command.slice(8)}`;
  if (lower.startsWith("go to the ")) return `walk to ${command.slice(10)}`;
  if (lower.startsWith("go to ")) return `walk to ${command.slice(6)}`;
  return command;
};

const detectMode = (status: string, transcript: string, fallback: Mode): Mode => {
  for (const candidate of MODES) if (status.includes(candidate)) return candidate;
  let latest = -1;
  let selected = fallback;
  for (const candidate of MODES) {
    const position = transcript.lastIndexOf(candidate);
    if (position > latest) { latest = position; selected = candidate; }
  }
  return selected;
};

const detectYear = (status: string, transcript: string, fallback: number | null) => {
  for (const candidate of [2091, 2081, 2071, 2061, 2051, 2041]) {
    if (new RegExp(`\\b${candidate}\\b`).test(status)) return candidate;
  }
  const matches = [...transcript.matchAll(/This simulation is based (\d+) years hence\./g)];
  if (matches.length) return 2031 + Number(matches.at(-1)?.[1]);
  return fallback;
};

const detectRoom = (status: string, transcript: string): WorldRoom | null => {
  const statusRoom = WORLD_ROOMS.find((candidate) => status.includes(candidate.name));
  if (statusRoom) return statusRoom;
  let latest = -1;
  let selected: WorldRoom | null = null;
  for (const candidate of WORLD_ROOMS) {
    const position = transcript.lastIndexOf(candidate.name);
    if (position > latest) { latest = position; selected = candidate; }
  }
  return selected;
};

export default function PrismEdition() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const trackedRoomRef = useRef<string | null>(null);
  const modeRef = useRef<Mode>("Communications Mode");
  const yearRef = useRef<number | null>(null);

  const [introOpen, setIntroOpen] = useState(true);
  const [returning, setReturning] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [acceptsInput, setAcceptsInput] = useState(false);
  const [mode, setMode] = useState<Mode>("Communications Mode");
  const [year, setYear] = useState<number | null>(null);
  const [room, setRoom] = useState<WorldRoom | null>(null);
  const [command, setCommand] = useState("");
  const [aliasNotice, setAliasNotice] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [visitedYears, setVisitedYears] = useState<number[]>([]);
  const visitedYearsRef = useRef<number[]>([]);
  const [visitedRooms, setVisitedRooms] = useState<Record<string, number>>({});
  const [activePanel, setActivePanel] = useState<Panel>("guide");
  const [contextOpen, setContextOpen] = useState(true);
  const [accessOpen, setAccessOpen] = useState(false);
  const [fontScale, setFontScale] = useState(17);
  const [readingMode, setReadingMode] = useState<ReadingMode>("serif");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const guide = MODE_GUIDES[mode];
  const displayYear = year && YEARS.includes(year as (typeof YEARS)[number]) ? year : null;
  const eraIndex = displayYear ? YEARS.indexOf(displayYear as (typeof YEARS)[number]) : -1;

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem("amfv:welcomed") === "true";
      const storedYears = JSON.parse(localStorage.getItem("amfv:years") || "[]") as number[];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- local preferences only exist after hydration
      setReturning(hasVisited);
      setIntroOpen(!hasVisited);
      setVisitedYears(storedYears);
      visitedYearsRef.current = storedYears;
      setVisitedRooms(JSON.parse(localStorage.getItem("amfv:rooms") || "{}"));
      setCommandHistory(JSON.parse(localStorage.getItem("amfv:history") || "[]"));
      setFontScale(Number(localStorage.getItem("amfv:font-size")) || 17);
      setReadingMode(localStorage.getItem("amfv:reading-mode") === "mono" ? "mono" : "serif");
      setHighContrast(localStorage.getItem("amfv:contrast") === "true");
      setReduceMotion(localStorage.getItem("amfv:reduce-motion") === "true");
    } catch {
      // Browser storage is an enhancement, never a requirement.
    }
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.channel !== BRIDGE_CHANNEL) return;
      if (event.data.type === "ready") { setPlayerReady(true); return; }
      if (event.data.type === "busy") { setAcceptsInput(false); return; }
      if (event.data.type === "command" && typeof event.data.command === "string") {
        const entered = event.data.command.trim();
        if (!entered) return;
        setCommandHistory((previous) => {
          const next = previous[0] === entered ? previous : [entered, ...previous].slice(0, 30);
          try { localStorage.setItem("amfv:history", JSON.stringify(next)); } catch { /* Storage may be disabled. */ }
          return next;
        });
        return;
      }
      if (event.data.type !== "transcript") return;

      const transcript = typeof event.data.text === "string" ? event.data.text : "";
      const status = typeof event.data.statusText === "string" ? event.data.statusText : "";
      const nextMode = detectMode(status, transcript, modeRef.current);
      const nextYear = nextMode === "Simulation Mode" ? detectYear(status, transcript, yearRef.current) : null;
      const nextRoom = nextMode === "Simulation Mode" ? detectRoom(status, transcript) : null;

      modeRef.current = nextMode;
      yearRef.current = nextYear;
      setMode(nextMode);
      setYear(nextYear);
      setRoom(nextRoom);
      setAcceptsInput(Boolean(event.data.acceptsInput));

      if (nextYear && !visitedYearsRef.current.includes(nextYear)) {
        const next = [...new Set([...visitedYearsRef.current, nextYear])].sort();
        visitedYearsRef.current = next;
        setVisitedYears(next);
        try { localStorage.setItem("amfv:years", JSON.stringify(next)); } catch { /* Storage may be disabled. */ }
      }

      if (nextRoom && trackedRoomRef.current !== nextRoom.name) {
        trackedRoomRef.current = nextRoom.name;
        setVisitedRooms((previous) => {
          const next = { ...previous, [nextRoom.name]: (previous[nextRoom.name] || 0) + 1 };
          try { localStorage.setItem("amfv:rooms", JSON.stringify(next)); } catch { /* Storage may be disabled. */ }
          return next;
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!playerReady) return;
    iframeRef.current?.contentWindow?.postMessage({
      channel: BRIDGE_CHANNEL, type: "preferences", fontScale, readingMode, highContrast,
    }, window.location.origin);
    try {
      localStorage.setItem("amfv:font-size", String(fontScale));
      localStorage.setItem("amfv:reading-mode", readingMode);
      localStorage.setItem("amfv:contrast", String(highContrast));
      localStorage.setItem("amfv:reduce-motion", String(reduceMotion));
    } catch { /* Storage may be disabled. */ }
  }, [fontScale, readingMode, highContrast, reduceMotion, playerReady]);

  const sendCommand = (raw: string) => {
    if (!raw.trim() || !iframeRef.current?.contentWindow) return;
    const normalized = normalizeCommand(raw);
    setAliasNotice(normalized.toLowerCase() !== raw.trim().toLowerCase() ? `Understood as: ${normalized}` : "");
    iframeRef.current.contentWindow.postMessage({ channel: BRIDGE_CHANNEL, type: "command", command: normalized }, window.location.origin);
    setCommand("");
    setHistoryIndex(-1);
    setTimeout(() => iframeRef.current?.contentWindow?.postMessage({ channel: BRIDGE_CHANNEL, type: "focus" }, window.location.origin), 80);
  };

  const submitCommand = (event: FormEvent) => { event.preventDefault(); sendCommand(command); };

  const navigateHistory = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!commandHistory.length || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return;
    event.preventDefault();
    const nextIndex = event.key === "ArrowUp" ? Math.min(historyIndex + 1, commandHistory.length - 1) : Math.max(historyIndex - 1, -1);
    setHistoryIndex(nextIndex);
    setCommand(nextIndex === -1 ? "" : commandHistory[nextIndex]);
  };

  const begin = () => {
    try { localStorage.setItem("amfv:welcomed", "true"); } catch { /* Storage may be disabled. */ }
    setReturning(true);
    setIntroOpen(false);
    setTimeout(() => commandRef.current?.focus(), 120);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch { /* Fullscreen may be unavailable. */ }
  };

  const roomExits = useMemo(() => Object.entries(room?.exits || {}), [room]);
  const recentRooms = useMemo(() => Object.entries(visitedRooms).sort((a, b) => b[1] - a[1]).slice(0, 12), [visitedRooms]);

  return (
    <main className="prism-edition" data-era={displayYear ?? "system"} data-context-open={contextOpen} data-contrast={highContrast ? "high" : "standard"} data-reduce-motion={reduceMotion}>
      <a className="skip-link" href="#command-input">Skip to command line</a>

      <aside className="identity-rail" aria-label="PRISM context">
        <button className="wordmark" type="button" onClick={() => setIntroOpen(true)} aria-label="Open introduction">
          <span>A MIND</span><span>FOREVER</span><span>VOYAGING</span>
        </button>
        <p className="edition-mark">UNABRIDGED · 1985 / 2026</p>
        <div className="era-art" aria-hidden="true"><div className="era-art-image" /><div className="scanline" /><span className="era-caption">ROCKVIL / TEMPORAL MODEL</span></div>

        <section className="rail-section" aria-labelledby="identity-heading">
          <div className="section-kicker" id="identity-heading">Cognitive identity</div>
          <div className="identity-readout"><span className="pulse-dot" /><div><strong>PRISM</strong><small>Self-aware · Online</small></div></div>
        </section>
        <section className="rail-section" aria-labelledby="mode-heading">
          <div className="section-kicker" id="mode-heading">Current mode</div>
          <strong className="mode-readout">{mode.replace(" Mode", "")}</strong><span className="mode-subreadout">{guide.label}</span>
        </section>
        <section className="rail-section timeline-section" aria-labelledby="timeline-heading">
          <div className="section-kicker" id="timeline-heading">Temporal archive</div>
          <ol className="era-timeline">
            {YEARS.map((era, index) => <li key={era} className={era === displayYear ? "current" : visitedYears.includes(era) ? "visited" : ""}><span className="timeline-node">{visitedYears.includes(era) ? "✓" : index + 1}</span><span>{era}</span></li>)}
          </ol>
        </section>
        <div className="rail-footer"><span>Release 79</span><span>Serial 851122</span><button type="button" onClick={() => { setActivePanel("about"); setContextOpen(true); }}>Provenance</button></div>
      </aside>

      <section className="experience-shell" aria-label="Game console">
        <header className="console-header">
          <div className="location-block" aria-live="polite"><span className="section-kicker">Live context</span><strong>{room?.name || (mode === "Simulation Mode" ? "Resolving location…" : mode)}</strong><span>{displayYear ? `${displayYear} simulation` : "Project date · 2031"}</span></div>
          <div className="system-state" aria-label={acceptsInput ? "PRISM is ready for a command" : "PRISM is processing"}><span className={acceptsInput ? "state-light ready" : "state-light"} />{acceptsInput ? "AWAITING INPUT" : playerReady ? "PROCESSING" : "INITIALIZING"}</div>
          <div className="header-actions">
            <button type="button" onClick={() => setContextOpen((value) => !value)} aria-pressed={contextOpen} title="Toggle companion panel">◫<span>Companion</span></button>
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
          {!playerReady && <div className="player-loading"><span className="loading-prism">◇</span><p>Reconstructing PRISM’s memory…</p></div>}
          <iframe ref={iframeRef} className="story-frame" src="/player.html" title="A Mind Forever Voyaging — complete original interactive story" sandbox="allow-scripts allow-same-origin allow-downloads allow-modals" />
          <div className="story-vignette" aria-hidden="true" />
        </div>

        <section className="command-deck" aria-label="Modern command console">
          <form onSubmit={submitCommand} className="command-form">
            <label htmlFor="command-input" className="command-label">Tell PRISM what to do</label>
            <div className="command-field"><span aria-hidden="true">›</span><input ref={commandRef} id="command-input" value={command} onChange={(event) => { setCommand(event.target.value); setAliasNotice(""); }} onKeyDown={navigateHistory} placeholder={mode === "Library Mode" ? "Use N, P, O, R, C, or E…" : "Try “look around” or “enter simulation mode”…"} autoComplete="off" spellCheck="false" aria-describedby="command-help" /><button type="submit" disabled={!command.trim() || !acceptsInput}>SEND <span aria-hidden="true">↵</span></button></div>
            <div className="command-meta" id="command-help"><span>{aliasNotice || "Plain English aliases are translated into the original parser’s vocabulary."}</span><button type="button" onClick={() => sendCommand("undo")} disabled={!acceptsInput || mode === "Library Mode"}>Undo last turn</button></div>
          </form>
          <div className="quick-actions" aria-label="Suggested commands">{guide.actions.map(([label, value]) => <button type="button" key={`${mode}-${label}`} onClick={() => sendCommand(value)} disabled={!acceptsInput}>{label}</button>)}{mode !== "Library Mode" && <button type="button" onClick={() => sendCommand("save")} disabled={!acceptsInput}>Save</button>}</div>
        </section>
      </section>

      <aside className="companion-panel" aria-label="Reader companion">
        <div className="companion-tabs" role="tablist" aria-label="Companion views">{(["guide", "map", "journal", "about"] as Panel[]).map((panel) => <button key={panel} type="button" role="tab" aria-selected={activePanel === panel} onClick={() => setActivePanel(panel)}>{panel}</button>)}<button className="close-context" type="button" onClick={() => setContextOpen(false)} aria-label="Close companion">×</button></div>
        <div className="companion-content">
          {activePanel === "guide" && <section className="companion-section"><span className="section-kicker">Spoiler-light guidance</span><h2>{guide.label}</h2><p>{guide.copy}</p><div className="guide-callout"><span>01</span><p>Read slowly. Details are the game’s interface, not decoration.</p></div><div className="guide-callout"><span>02</span><p>Try verbs such as LOOK, EXAMINE, ASK, READ, WAIT, and RECORD.</p></div><div className="guide-callout"><span>03</span><p>When the future feels wrong, observe more places before reporting back.</p></div><details><summary>I’m new to parser games</summary><p>Use short commands: “examine newspaper,” “ask Jill about Mitchell,” or a direction such as “north.” The game will tell you when it needs more detail.</p></details><details><summary>I seem to be stuck</summary><p>LOOK again, examine conspicuous nouns, check INVENTORY, or WAIT. In a simulation, ABORT returns you to PRISM’s own modes without erasing progress.</p></details></section>}
          {activePanel === "map" && <section className="companion-section map-section"><span className="section-kicker">Contextual navigation</span><h2>{room?.name || "Map offline"}</h2><p>{room ? "Known direct exits from the original room data. Conditional routes still depend on the story." : "Enter a simulation and move once; PRISM will resolve your position."}</p>{roomExits.length > 0 ? <div className="exit-list">{roomExits.map(([direction, exit]) => <button type="button" key={direction} onClick={() => sendCommand(exit.command)} disabled={!acceptsInput}><span>{DIRECTION_LABELS[direction] || direction}</span><strong>{exit.target}</strong><small>{exit.command}</small></button>)}</div> : <div className="empty-map"><span>⌁</span><p>No simple exits are exposed here. Read the story text for available actions.</p></div>}<p className="data-note">Map labels are extracted from the preserved ZIL source; they do not alter the game.</p></section>}
          {activePanel === "journal" && <section className="companion-section"><span className="section-kicker">Private session notebook</span><h2>Your voyage</h2><div className="journal-stat-grid"><div><strong>{visitedYears.length}</strong><span>eras reached</span></div><div><strong>{Object.keys(visitedRooms).length}</strong><span>places seen</span></div><div><strong>{commandHistory.length}</strong><span>recent commands</span></div></div><h3>Places in memory</h3>{recentRooms.length ? <ol className="memory-list">{recentRooms.map(([name, visits]) => <li key={name}><span>{name}</span><small>{visits} {visits === 1 ? "visit" : "visits"}</small></li>)}</ol> : <p className="empty-copy">Locations will collect here once you enter the future.</p>}<h3>Recent commands</h3>{commandHistory.length ? <ol className="command-history">{commandHistory.slice(0, 8).map((item, index) => <li key={`${item}-${index}`}><button type="button" onClick={() => setCommand(item)}><span>›</span>{item}</button></li>)}</ol> : <p className="empty-copy">Your last commands will appear here for easy reuse.</p>}<p className="data-note">Notebook data stays in this browser. The game’s own SAVE command creates a portable save.</p></section>}
          {activePanel === "about" && <section className="companion-section about-section"><span className="section-kicker">Why this edition exists</span><h2>The work, intact.</h2><p>A Mind Forever Voyaging was written by Steve Meretzky and published by Infocom in 1985. It remains one of interactive fiction’s boldest uses of simulation as political argument.</p><blockquote>“The text is the artwork.”</blockquote><p>This edition does not rewrite, summarize, rebalance, or sanitize the story. The original Release 79 Z-machine file is running inside a modern reader.</p><dl className="provenance-list"><div><dt>Story</dt><dd>Release 79 · 22 Nov 1985</dd></div><div><dt>Runtime</dt><dd>Parchment 2026.8.1</dd></div><div><dt>Story SHA-256</dt><dd>14e2fd18…511216d</dd></div><div><dt>Source</dt><dd>Preserved ZIL, included in full</dd></div></dl><a href="https://github.com/the-infocom-files/amfv" target="_blank" rel="noreferrer">View the historical source ↗</a><a href="https://github.com/curiousdannii/parchment" target="_blank" rel="noreferrer">About the Parchment interpreter ↗</a><p className="copyright-note">A Mind Forever Voyaging © 1985 Infocom, Inc. Modern reader code and artwork are presented separately from the preserved original.</p></section>}
        </div>
      </aside>

      {introOpen && <section className="intro-overlay" role="dialog" aria-modal="true" aria-labelledby="intro-title"><div className="intro-art" aria-hidden="true" /><div className="intro-grid" aria-hidden="true" /><div className="intro-content"><span className="intro-kicker">THE COMPLETE 1985 INTERACTIVE NOVEL · RESTORED FOR THE WEB</span><h1 id="intro-title"><span>A Mind</span><span>Forever</span><span>Voyaging</span></h1><p className="intro-lede">You are PRISM, the world’s first sentient computer. A proposed national plan promises renewal. Your task is to live inside its future—and report what you find.</p><div className="intro-principles"><div><span>01</span><strong>Unabridged</strong><p>Every original word, puzzle, and branch.</p></div><div><span>02</span><strong>Approachable</strong><p>Modern guidance around the classic parser.</p></div><div><span>03</span><strong>Remembered</strong><p>Autosave, a private journal, and accessible type.</p></div></div><div className="intro-actions"><button type="button" className="begin-button" onClick={begin}>{returning ? "Continue voyage" : "Awaken PRISM"}<span>→</span></button>{returning && <button type="button" className="secondary-button" onClick={() => { setIntroOpen(false); sendCommand("restart"); }}>Restart original story</button>}</div><details className="content-note"><summary>Historical content note</summary><p>The unaltered 1985 text includes depictions and language involving authoritarianism, poverty, racism, religious extremism, suicide, and violence. The modern frame adds context, not censorship.</p></details><p className="intro-credit">Written by Steve Meretzky · Original release by Infocom · Modern interpreter by Parchment</p></div></section>}

      <div className="screen-reader-status" aria-live="polite">{mode}. {room?.name || ""} {displayYear || ""}</div>
      <div className="era-index" aria-hidden="true" style={{ "--era-index": Math.max(0, eraIndex) } as React.CSSProperties} />
    </main>
  );
}
