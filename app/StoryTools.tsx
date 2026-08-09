"use client";

/* eslint-disable @next/next/no-img-element -- the viewer presents archival scans at their natural proportions */

import { FormEvent, useEffect, useMemo, useState, type CSSProperties } from "react";
import type { WorldObject } from "./world-data";

export type PackageItem = "map" | "decoder" | "manual";
export type InteractionLevel = "classic" | "guided" | "actions";
export type RockvilLandmark = { id: string; label: string; targetId: string; x: number; y: number; kind?: "landmark" | "fieldwork"; assignment?: number };
export type MapRoutePreview = { destination: RockvilLandmark; nextCommand: string | null; nextPlace: string | null; steps: number; arrived: boolean };

export const ROCKVIL_LANDMARKS: RockvilLandmark[] = [
  { id: "zoo", label: "Zoological Garden", targetId: "ZOO-ENTRANCE", x: 18.5, y: 33.5 },
  { id: "aquarium", label: "Aquarium", targetId: "AQUARIUM-AND-KENNEDY", x: 34, y: 30.5 },
  { id: "riverside", label: "Riverside Park", targetId: "RIVER-AND-PARK", x: 64.5, y: 34.5 },
  { id: "railroad", label: "Railroad Museum", targetId: "MUSEUM-ENTRANCE", x: 57, y: 38.5 },
  { id: "north-central", label: "North Central Station", targetId: "BODANSKI-SQUARE", x: 50.5, y: 43.5 },
  { id: "halley", label: "Halley Museum", targetId: "HALLEY-AND-PARK", x: 24.5, y: 49.5 },
  { id: "huang", label: "Huang Hall", targetId: "HUANG-HALL", x: 32.5, y: 42.5 },
  { id: "infotech", label: "InfoTech Building", targetId: "MAIN-AND-KENNEDY", x: 44.5, y: 52.5 },
  { id: "church", label: "St. Michael's Church", targetId: "ST-MICHAELS", x: 55.5, y: 50.5, assignment: 6 },
  { id: "kennedy", label: "Kennedy Park", targetId: "KENNEDY-PARK", x: 35.5, y: 60.5 },
  { id: "library", label: "Main Library", targetId: "SOUTHWAY-AND-PARK", x: 28.5, y: 70.5 },
  { id: "meal", label: "Restaurant", targetId: "ROYS-PAGODA", x: 19.5, y: 59.5, kind: "fieldwork", assignment: 0 },
  { id: "official", label: "City Hall", targetId: "CITY-HALL", x: 31.5, y: 52.5, kind: "fieldwork", assignment: 1 },
  { id: "power", label: "Power Station", targetId: "POWER-STATION", x: 58, y: 76, kind: "fieldwork", assignment: 2 },
  { id: "newspaper", label: "Newspaper", targetId: "BODANSKI-SQUARE", x: 47, y: 41, kind: "fieldwork", assignment: 3 },
  { id: "transit", label: "Transit", targetId: "SKYBUS-TERMINAL", x: 39.5, y: 50, kind: "fieldwork", assignment: 4 },
  { id: "court", label: "Courthouse", targetId: "COURTHOUSE", x: 29.5, y: 57, kind: "fieldwork", assignment: 5 },
  { id: "movie", label: "Cinema", targetId: "CINEMA", x: 53.5, y: 35, kind: "fieldwork", assignment: 7 },
  { id: "home", label: "Your apartment", targetId: "PARKVIEW-APARTMENTS", x: 25.5, y: 69, kind: "fieldwork", assignment: 8 },
];

export const INTERFACE_PORTS = [
  { id: "simulation", name: "Simulation Controller", match: /Simulation Controller/i },
  { id: "hvac", name: "HVAC Controller", match: /HVAC Controller/i },
  { id: "janitorial", name: "Janitorial Controller", match: /Janitorial Controller/i },
  { id: "traffic", name: "Metropolitan Traffic Computer", match: /Metropolitan Traffic Computer/i },
  { id: "weather", name: "National Weather Center Computer", match: /National Weather Center Computer/i },
  { id: "wnn", name: "WNN Feeder", match: /WNN Feeder/i },
  { id: "auditing", name: "IRS Auditing System", match: /IRS Auditing System/i },
] as const;

type InterfacePortId = (typeof INTERFACE_PORTS)[number]["id"];

const hasFlag = (object: WorldObject, flag: string) => object.flags.includes(flag);
const handles = (object: WorldObject, roomId: string | null | undefined, ...verbs: string[]) => verbs.some((verb) => {
  if (object.refusalOnlyVerbs.includes(verb) || !object.guaranteedVerbs.includes(verb)) return false;
  const globalBranchApplies = object.globalVerbs.includes(verb) && (!object.actionRooms.length || Boolean(roomId && object.actionRooms.includes(roomId)));
  return globalBranchApplies || Boolean(roomId && object.verbRooms[verb]?.includes(roomId));
});

type SceneAction = { label: string; id: string; command: (noun: string) => string };
const canonicalActions: Array<{ verbs: string[]; action: SceneAction }> = [
  { verbs: ["EXAMINE"], action: { label: "Examine", id: "examine", command: (noun) => `examine ${noun}` } },
  { verbs: ["READ"], action: { label: "Read", id: "read", command: (noun) => `read ${noun}` } },
  { verbs: ["SEARCH"], action: { label: "Search", id: "search", command: (noun) => `search ${noun}` } },
  { verbs: ["LOOK-INSIDE"], action: { label: "Look inside", id: "look-inside", command: (noun) => `look inside ${noun}` } },
  { verbs: ["LOOK-UNDER"], action: { label: "Look under", id: "look-under", command: (noun) => `look under ${noun}` } },
  { verbs: ["LOOK-BEHIND"], action: { label: "Look behind", id: "look-behind", command: (noun) => `look behind ${noun}` } },
  { verbs: ["SMELL"], action: { label: "Smell", id: "smell", command: (noun) => `smell ${noun}` } },
  { verbs: ["LISTEN"], action: { label: "Listen", id: "listen", command: (noun) => `listen to ${noun}` } },
  { verbs: ["TOUCH"], action: { label: "Touch", id: "touch", command: (noun) => `touch ${noun}` } },
  { verbs: ["COUNT"], action: { label: "Count", id: "count", command: (noun) => `count ${noun}` } },
  { verbs: ["TAKE"], action: { label: "Take", id: "take", command: (noun) => `take ${noun}` } },
  { verbs: ["BUY"], action: { label: "Buy", id: "buy", command: (noun) => `buy ${noun}` } },
  { verbs: ["EAT"], action: { label: "Eat", id: "eat", command: (noun) => `eat ${noun}` } },
  { verbs: ["DRINK"], action: { label: "Drink", id: "drink", command: (noun) => `drink ${noun}` } },
  { verbs: ["OPEN"], action: { label: "Open", id: "open", command: (noun) => `open ${noun}` } },
  { verbs: ["CLOSE"], action: { label: "Close", id: "close", command: (noun) => `close ${noun}` } },
  { verbs: ["SWIM"], action: { label: "Swim", id: "swim", command: (noun) => `swim in ${noun}` } },
  { verbs: ["THROUGH", "WALK-TO"], action: { label: "Enter", id: "enter", command: (noun) => `enter ${noun}` } },
  { verbs: ["LEAVE", "DISEMBARK"], action: { label: "Leave", id: "leave", command: (noun) => `leave ${noun}` } },
  { verbs: ["BOARD"], action: { label: "Board", id: "board", command: (noun) => `board ${noun}` } },
  { verbs: ["SIT"], action: { label: "Sit", id: "sit", command: (noun) => `sit on ${noun}` } },
  { verbs: ["SIT-NEXT-TO"], action: { label: "Sit beside", id: "sit-next", command: (noun) => `sit next to ${noun}` } },
  { verbs: ["LIE-DOWN"], action: { label: "Lie down", id: "lie", command: (noun) => `lie on ${noun}` } },
  { verbs: ["CLIMB-FOO"], action: { label: "Climb", id: "climb", command: (noun) => `climb ${noun}` } },
  { verbs: ["CLIMB-ON"], action: { label: "Climb on", id: "climb-on", command: (noun) => `climb on ${noun}` } },
  { verbs: ["CLIMB-UP"], action: { label: "Climb up", id: "climb-up", command: (noun) => `climb up ${noun}` } },
  { verbs: ["CLIMB-DOWN"], action: { label: "Climb down", id: "climb-down", command: (noun) => `climb down ${noun}` } },
  { verbs: ["CLIMB-OVER"], action: { label: "Climb over", id: "climb-over", command: (noun) => `climb over ${noun}` } },
  { verbs: ["CROSS"], action: { label: "Cross", id: "cross", command: (noun) => `cross ${noun}` } },
  { verbs: ["PUSH"], action: { label: "Push", id: "push", command: (noun) => `push ${noun}` } },
  { verbs: ["MOVE"], action: { label: "Move", id: "move", command: (noun) => `move ${noun}` } },
  { verbs: ["TURN"], action: { label: "Turn", id: "turn", command: (noun) => `turn ${noun}` } },
  { verbs: ["ON"], action: { label: "Switch on", id: "on", command: (noun) => `switch on ${noun}` } },
  { verbs: ["OFF"], action: { label: "Switch off", id: "off", command: (noun) => `switch off ${noun}` } },
  { verbs: ["WASH"], action: { label: "Wash", id: "wash", command: (noun) => `wash ${noun}` } },
  { verbs: ["WEAR"], action: { label: "Wear", id: "wear", command: (noun) => `wear ${noun}` } },
  { verbs: ["REMOVE", "TAKE-OFF"], action: { label: "Remove", id: "remove", command: (noun) => `remove ${noun}` } },
  { verbs: ["PLAY", "PLAY-WITH"], action: { label: "Play", id: "play", command: (noun) => `play with ${noun}` } },
  { verbs: ["SQUEEZE"], action: { label: "Squeeze", id: "squeeze", command: (noun) => `squeeze ${noun}` } },
  { verbs: ["SHAKE"], action: { label: "Shake", id: "shake", command: (noun) => `shake ${noun}` } },
  { verbs: ["KICK"], action: { label: "Kick", id: "kick", command: (noun) => `kick ${noun}` } },
  { verbs: ["KNOCK"], action: { label: "Knock", id: "knock", command: (noun) => `knock on ${noun}` } },
  { verbs: ["FOLLOW"], action: { label: "Follow", id: "follow", command: (noun) => `follow ${noun}` } },
  { verbs: ["CALL"], action: { label: "Call", id: "call", command: (noun) => `call ${noun}` } },
  { verbs: ["COMFORT"], action: { label: "Comfort", id: "comfort", command: (noun) => `comfort ${noun}` } },
];

const actionsFor = (object: WorldObject, roomId?: string | null) => {
  const actions: SceneAction[] = [];
  const actionFor = (verb: string) => canonicalActions.find((candidate) => candidate.verbs.includes(verb))!.action;
  if (hasFlag(object, "ACTORBIT")) actions.push({ label: "Talk", id: "talk", command: (noun) => `${noun}, hello` });
  if (hasFlag(object, "READBIT") || object.hasText || ["MAP", "DECODER", "MAGAZINE-ARTICLE"].includes(object.id)) actions.push(actionFor("READ"));
  if (hasFlag(object, "TAKEBIT") && !hasFlag(object, "TRYTAKEBIT") && !object.refusalOnlyVerbs.includes("TAKE")) actions.push(actionFor("TAKE"));
  if (hasFlag(object, "EATBIT") && !object.refusalOnlyVerbs.includes("EAT")) actions.push(actionFor("EAT"));
  if (hasFlag(object, "DRINKBIT") && !object.refusalOnlyVerbs.includes("DRINK")) actions.push(actionFor("DRINK"));
  if (hasFlag(object, "WEARBIT") && !object.refusalOnlyVerbs.includes("WEAR")) actions.push(actionFor("WEAR"));
  if (hasFlag(object, "FURNITUREBIT") && !object.refusalOnlyVerbs.includes("SIT")) actions.push(actionFor("SIT"));
  else if (hasFlag(object, "VEHBIT") && !object.refusalOnlyVerbs.includes("BOARD")) actions.push(actionFor("BOARD"));
  const usedAuthoredVerbs = new Set<string>();
  for (const definition of canonicalActions) {
    if (!handles(object, roomId, ...definition.verbs)) continue;
    const matchingGroups = object.verbGroups.filter((group) => group.some((verb) => definition.verbs.includes(verb)));
    if (matchingGroups.some((group) => group.every((verb) => usedAuthoredVerbs.has(verb)))) continue;
    actions.push(definition.action);
    matchingGroups.flat().forEach((verb) => usedAuthoredVerbs.add(verb));
  }
  return [...new Map(actions.map((action) => [action.id, action])).values()];
};

export const hasUsefulSceneAction = (object: WorldObject, roomId?: string | null) => Boolean(object.commandNoun && actionsFor(object, roomId).length);

const guidedActionFor = (object: WorldObject, roomId?: string | null) => {
  const actions = actionsFor(object, roomId);
  if (hasFlag(object, "ACTORBIT")) return actions.find((action) => action.id === "talk") ?? actions[0];
  if (hasFlag(object, "READBIT") || object.hasText || ["MAP", "DECODER", "MAGAZINE-ARTICLE"].includes(object.id)) return actions.find((action) => action.id === "read") ?? actions[0];
  return actions.find((action) => action.id === "examine") ?? actions[0];
};

const actionCommand = (object: WorldObject, action: SceneAction) => action.command(object.commandNoun!);

export function SceneActions({ objects, roomId, level, sendCommand, draftCommand, disabled }: { objects: WorldObject[]; roomId?: string | null; level: InteractionLevel; sendCommand: (command: string) => void; draftCommand: (command: string) => void; disabled: boolean }) {
  const usableObjects = useMemo(() => objects.filter((object) => hasUsefulSceneAction(object, roomId)), [objects, roomId]);
  if (!usableObjects.length || level === "classic") return null;

  if (level === "guided") return <section className="scene-actions scene-words" aria-label="Words mentioned here">
    <div className="scene-actions-heading"><span>Worth trying</span><small>Choose one to draft a command</small></div>
    <div className="scene-word-list">{usableObjects.slice(0, 6).map((object) => { const action = guidedActionFor(object, roomId); return <button type="button" key={object.id} onClick={() => draftCommand(actionCommand(object, action))} disabled={disabled}>{object.name}<small>{action.label}</small></button>; })}</div>
  </section>;

  return (
    <section className="scene-actions" aria-label="Actions for things mentioned here">
      <div className="scene-actions-heading"><span>In this scene</span><small>Actions written into the original story</small></div>
      <div className="scene-object-grid">
        {usableObjects.map((object) => {
          return <article className="scene-object" key={object.id}>
            <strong>{object.name}</strong>
            <div>{actionsFor(object, roomId).map((action) => <button type="button" key={action.id} onClick={() => sendCommand(actionCommand(object, action))} disabled={disabled}>{action.label}</button>)}</div>
          </article>;
        })}
      </div>
    </section>
  );
}

export function RockvilNavigator({ currentRoomId, routePreview, onSelect, onStep, disabled }: { currentRoomId: string | null; routePreview: MapRoutePreview | null; onSelect: (landmark: RockvilLandmark) => void; onStep: () => void; disabled: boolean }) {
  return <section className="rockvil-navigator" aria-label="Navigate Rockvil using the original map">
    <div className="navigator-heading"><div><span>Rockvil street map</span><strong>Choose a destination</strong></div><small>The marked fieldwork stops come from Perelman’s brief.</small></div>
    <div className="navigator-map-scroll"><div className="navigator-map-stage"><img src="/package/rockvil-map-back.jpg" alt="Original 1985 street map of downtown Rockvil" />
      <div className="map-hotspots navigator-hotspots" aria-label="Map destinations">{ROCKVIL_LANDMARKS.map((landmark) => <button type="button" key={landmark.id} className={`${landmark.kind === "fieldwork" ? "fieldwork" : "landmark"} ${currentRoomId === landmark.targetId ? "current" : ""} ${routePreview?.destination.id === landmark.id ? "selected" : ""}`} style={{ "--map-x": `${landmark.x}%`, "--map-y": `${landmark.y}%` } as CSSProperties} onClick={() => onSelect(landmark)} aria-label={`${landmark.label}${landmark.kind === "fieldwork" ? ", fieldwork destination" : ""}${currentRoomId === landmark.targetId ? ", current location" : ""}`}><span>{landmark.label}</span></button>)}</div>
    </div></div>
    {routePreview ? <div className="navigator-route"><div><span>Route to</span><strong>{routePreview.destination.label}</strong>{routePreview.arrived ? <small>You have arrived.</small> : routePreview.nextCommand ? <small>{routePreview.steps} {routePreview.steps === 1 ? "step" : "steps"} · next {routePreview.nextCommand.toUpperCase()}{routePreview.nextPlace ? ` toward ${routePreview.nextPlace}` : ""}</small> : <small>Move to a named street to begin this route.</small>}</div>{routePreview.nextCommand && !routePreview.arrived && <button type="button" onClick={onStep} disabled={disabled}>Take next step</button>}</div> : <p className="navigator-empty">Select any dot on the map. Fieldwork destinations use the square markers.</p>}
  </section>;
}

export function InterfaceWorkbench({ portIds, sendCommand, disabled }: { portIds: InterfacePortId[]; sendCommand: (command: string) => void; disabled: boolean }) {
  const [active, setActive] = useState<InterfacePortId>(portIds[0] || "simulation");
  const [hvacSystem, setHvacSystem] = useState("ventilation");
  const [hvacSector, setHvacSector] = useState("alpha");
  const [janitorialFunction, setJanitorialFunction] = useState("bathrooms");
  const [janitorialTime, setJanitorialTime] = useState("9:00");
  const [trafficParameter, setTrafficParameter] = useState("morning rush hour start");
  const [trafficTime, setTrafficTime] = useState("7:00");
  const [auditPercent, setAuditPercent] = useState("3");
  const [feedBuffer, setFeedBuffer] = useState("world news buffer");

  const submit = (event: FormEvent, command: string) => { event.preventDefault(); sendCommand(command); };
  const selectedActive = portIds.includes(active) ? active : portIds[0];
  const port = INTERFACE_PORTS.find((candidate) => candidate.id === selectedActive);
  if (!portIds.length) return <p className="empty-copy">Read the List of Active Ports to connect.</p>;

  return <div className="interface-workbench">
    <div className="port-tabs" role="tablist" aria-label="Connected systems">
      {portIds.map((id) => { const item = INTERFACE_PORTS.find((candidate) => candidate.id === id)!; return <button type="button" role="tab" aria-selected={selectedActive === id} key={id} onClick={() => setActive(id)}>{item.name}</button>; })}
    </div>
    <section className="port-console">
      <div className="port-console-title"><div><span className="system-node" /><strong>{port?.name}</strong></div><button type="button" onClick={() => sendCommand(`${port?.name}, status`)} disabled={disabled}>Request status</button></div>

      {selectedActive === "hvac" && <form onSubmit={(event) => submit(event, `hvac controller, turn on ${hvacSystem} for ${hvacSector} sector`)}>
        <label>System<select value={hvacSystem} onChange={(event) => setHvacSystem(event.target.value)}><option>heating</option><option>cooling</option><option>ventilation</option></select></label>
        <label>Sector<select value={hvacSector} onChange={(event) => setHvacSector(event.target.value)}><option value="alpha">Alpha · living quarters</option><option value="beta">Beta · offices</option><option value="gamma">Gamma · control center</option><option value="delta">Delta · maintenance core</option></select></label>
        <div className="form-actions"><button type="submit" disabled={disabled}>Turn on</button><button type="button" onClick={() => sendCommand(`hvac controller, shut off ${hvacSystem} for ${hvacSector} sector`)} disabled={disabled}>Shut off</button></div>
      </form>}

      {selectedActive === "janitorial" && <form onSubmit={(event) => submit(event, `janitorial controller, set ${janitorialFunction} for ${janitorialTime}`)}>
        <label>Function<select value={janitorialFunction} onChange={(event) => setJanitorialFunction(event.target.value)}><option value="floors">Floors</option><option value="bathrooms">Bathrooms</option><option value="garbage disposal">Garbage disposal</option><option value="rotating functions">Rotating functions</option></select></label>
        <label>Time · 8:00–11:30pm<input value={janitorialTime} onChange={(event) => setJanitorialTime(event.target.value)} inputMode="decimal" /></label>
        <button type="submit" disabled={disabled}>Set schedule</button>
      </form>}

      {selectedActive === "traffic" && <form onSubmit={(event) => submit(event, `traffic computer, set ${trafficParameter} at ${trafficTime}`)}>
        <label>Rush hour boundary<select value={trafficParameter} onChange={(event) => setTrafficParameter(event.target.value)}><option>morning rush hour start</option><option>morning rush hour end</option><option>evening rush hour start</option><option>evening rush hour end</option></select></label>
        <label>Time<input value={trafficTime} onChange={(event) => setTrafficTime(event.target.value)} inputMode="decimal" /></label>
        <button type="submit" disabled={disabled}>Set time</button>
      </form>}

      {selectedActive === "auditing" && <form onSubmit={(event) => submit(event, `auditing system, change auditing percentage to ${auditPercent}`)}>
        <label>Auditing percentage<input type="number" min="0" max="100" value={auditPercent} onChange={(event) => setAuditPercent(event.target.value)} /></label>
        <button type="submit" disabled={disabled}>Set percentage</button>
      </form>}

      {selectedActive === "wnn" && <div className="wnn-controls">
        <div className="form-actions"><button type="button" onClick={() => sendCommand("wnn feeder, turn on transmitter")} disabled={disabled}>Transmitter on</button><button type="button" onClick={() => sendCommand("wnn feeder, turn off transmitter")} disabled={disabled}>Transmitter off</button></div>
        <label>Feed<select value={feedBuffer} onChange={(event) => setFeedBuffer(event.target.value)}><option value="world news buffer">World News Buffer</option><option value="special report buffer">Special Report Buffer</option><option value="record buffer">Record Buffer</option></select></label>
        <button type="button" onClick={() => sendCommand(`wnn feeder, transmit ${feedBuffer}`)} disabled={disabled}>Transmit selected feed</button>
      </div>}

      {(selectedActive === "simulation" || selectedActive === "weather") && <p className="port-readonly">This connection accepts status requests. Its programming is not adjustable here.</p>}
    </section>
  </div>;
}

export function PackageOverlay({ item, onSelect, onClose, interactiveMap = false, currentRoomId = null, routePreview = null, routeStepDisabled = false, routeStepLabel = "Use next step", onSelectLandmark, onRouteStep }: { item: PackageItem | null; onSelect: (item: PackageItem) => void; onClose: () => void; interactiveMap?: boolean; currentRoomId?: string | null; routePreview?: MapRoutePreview | null; routeStepDisabled?: boolean; routeStepLabel?: string; onSelectLandmark?: (landmark: RockvilLandmark) => void; onRouteStep?: () => void }) {
  useEffect(() => {
    if (!item) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [item, onClose]);
  if (!item) return null;

  return <section className="package-overlay" role="dialog" aria-modal="true" aria-labelledby="package-title">
    <div className="package-viewer">
      <header><div><span className="section-kicker">In the original box</span><h2 id="package-title">AMFV package</h2></div><button type="button" onClick={onClose} aria-label="Close package materials">×</button></header>
      <nav aria-label="Package materials"><button type="button" aria-current={item === "map"} onClick={() => onSelect("map")}>Rockvil map</button><button type="button" aria-current={item === "decoder"} onClick={() => onSelect("decoder")}>Security decoder</button><button type="button" aria-current={item === "manual"} onClick={() => onSelect("manual")}>Magazine & manual</button></nav>
      {item === "map" && <figure><div className={`package-image-scroll ${interactiveMap ? "interactive-rockvil-map" : ""}`}><div className="rockvil-map-stage"><img src="/package/rockvil-map-back.jpg" alt="Original 1985 promotional street map of downtown Rockvil, South Dakota, with landmarks and a visitor guide" />{interactiveMap && <div className="map-hotspots" aria-label="Rockvil landmarks">{ROCKVIL_LANDMARKS.map((landmark) => <button type="button" key={landmark.id} className={`${landmark.kind === "fieldwork" ? "fieldwork" : "landmark"} ${currentRoomId === landmark.targetId ? "current" : ""} ${routePreview?.destination.id === landmark.id ? "selected" : ""}`} style={{ "--map-x": `${landmark.x}%`, "--map-y": `${landmark.y}%` } as CSSProperties} onClick={() => onSelectLandmark?.(landmark)} aria-label={`${landmark.label}${landmark.kind === "fieldwork" ? ", fieldwork destination" : ""}${currentRoomId === landmark.targetId ? ", current location" : ""}`}><span>{landmark.label}</span></button>)}</div>}</div></div><figcaption>{interactiveMap ? "Choose a destination on the original map to plot a walking route. Square markers correspond to Perelman’s field brief." : "The 2031 street map supplied with the original game. Zoom your browser or open the image directly for fine print."} <a href="/package/rockvil-map-back.jpg" target="_blank">Open full size ↗</a></figcaption>{interactiveMap && routePreview && <div className="map-route-card"><span>Route</span><strong>{routePreview.destination.label}</strong>{routePreview.arrived ? <p>You have reached the destination.</p> : routePreview.nextCommand ? <><p>{routePreview.steps} {routePreview.steps === 1 ? "step" : "steps"} away. Next: <b>{routePreview.nextCommand.toUpperCase()}</b>{routePreview.nextPlace ? ` toward ${routePreview.nextPlace}` : ""}.</p><button type="button" onClick={onRouteStep} disabled={routeStepDisabled}>{routeStepLabel}</button></> : <p>No reliable walking route starts from the current location. Move to a named street and try again.</p>}</div>}</figure>}
      {item === "decoder" && <figure><div className="package-image-scroll decoder-image"><img src="/package/security-decoder.jpg" alt="Original PRISM Project Facility Class One Security Mode Access Decoder wheel" /></div><figcaption>The physical decoder supplied in 1985. When the game requests a code, the command deck also offers an accessible digital equivalent.</figcaption></figure>}
      {item === "manual" && <div className="manual-card"><span aria-hidden="true">D/O</span><div><h3>Dakota Online · April 2031</h3><p>The original magazine, short story, advertising, and instruction manual are preserved together in this scan.</p><a href="/package/amfv-manual.pdf" target="_blank">Read the original PDF ↗</a></div></div>}
      <footer>Scans preserved by <a href="https://gallery.guetech.org/amfv/amfv.html" target="_blank" rel="noreferrer">The Infocom Gallery</a> and <a href="https://www.mocagh.org/loadpage.php?getgame=amfv" target="_blank" rel="noreferrer">Museum of Computer Adventure Game History</a>.</footer>
    </div>
  </section>;
}
