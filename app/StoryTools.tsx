"use client";

/* eslint-disable @next/next/no-img-element -- the viewer presents archival scans at their natural proportions */

import { FormEvent, useEffect, useMemo, useState, type CSSProperties } from "react";
import type { WorldObject } from "./world-data";

export type PackageItem = "map" | "decoder" | "manual";
export type InteractionLevel = "classic" | "guided" | "actions";
export type RockvilLandmark = { id: string; label: string; targetId: string; x: number; y: number };
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
  { id: "church", label: "St. Michael's Church", targetId: "CHURCH-ENTRANCE", x: 55.5, y: 50.5 },
  { id: "kennedy", label: "Kennedy Park", targetId: "KENNEDY-PARK", x: 35.5, y: 60.5 },
  { id: "library", label: "Main Library", targetId: "SOUTHWAY-AND-PARK", x: 28.5, y: 70.5 },
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
  const globalBranchApplies = object.globalVerbs.includes(verb) && (!object.actionRooms.length || Boolean(roomId && object.actionRooms.includes(roomId)));
  return globalBranchApplies || Boolean(roomId && object.verbRooms[verb]?.includes(roomId));
});

const actionsFor = (object: WorldObject, roomId?: string | null) => {
  const actions: Array<{ label: string; verb: string }> = [];
  if (hasFlag(object, "ACTORBIT")) actions.push({ label: "Greet", verb: "greet" });
  if (hasFlag(object, "READBIT") || object.hasText || handles(object, roomId, "READ") || ["MAP", "DECODER", "MAGAZINE-ARTICLE"].includes(object.id)) actions.push({ label: "Read", verb: "read" });
  if (((hasFlag(object, "DOORBIT") || hasFlag(object, "CONTBIT")) && !hasFlag(object, "OPENBIT")) || handles(object, roomId, "OPEN")) actions.push({ label: "Open", verb: "open" });
  if (hasFlag(object, "VEHBIT") || handles(object, roomId, "BOARD", "ENTER")) actions.push({ label: "Enter", verb: "enter" });
  if (hasFlag(object, "TAKEBIT") || handles(object, roomId, "TAKE")) actions.push({ label: "Take", verb: "take" });
  if (handles(object, roomId, "EXAMINE", "LOOK-INSIDE")) actions.push({ label: "Look", verb: "examine" });
  return [...new Map(actions.map((action) => [action.verb, action])).values()].slice(0, 3);
};

export const hasUsefulSceneAction = (object: WorldObject, roomId?: string | null) => Boolean(object.commandNoun && actionsFor(object, roomId).length);

const guidedActionFor = (object: WorldObject, roomId?: string | null) => {
  const actions = actionsFor(object, roomId);
  if (hasFlag(object, "ACTORBIT")) return actions.find((action) => action.verb === "greet") ?? actions[0];
  if (hasFlag(object, "READBIT") || object.hasText || ["MAP", "DECODER", "MAGAZINE-ARTICLE"].includes(object.id)) return actions.find((action) => action.verb === "read") ?? actions[0];
  return actions.find((action) => action.verb === "examine") ?? actions[0];
};

const actionCommand = (object: WorldObject, verb: string) => verb === "greet"
  ? `${object.commandNoun}, hello`
  : `${verb} ${object.commandNoun}`;

export function SceneActions({ objects, roomId, level, sendCommand, draftCommand, disabled }: { objects: WorldObject[]; roomId?: string | null; level: InteractionLevel; sendCommand: (command: string) => void; draftCommand: (command: string) => void; disabled: boolean }) {
  const usableObjects = useMemo(() => objects.filter((object) => hasUsefulSceneAction(object, roomId)), [objects, roomId]);
  const topics = useMemo(() => usableObjects.filter((object) => !hasFlag(object, "ACTORBIT")).slice(0, 4), [usableObjects]);
  if (!usableObjects.length || level === "classic") return null;

  if (level === "guided") return <section className="scene-actions scene-words" aria-label="Words mentioned here">
    <div className="scene-actions-heading"><span>Worth trying</span><small>Choose one to draft a likely command</small></div>
    <div className="scene-word-list">{usableObjects.map((object) => { const action = guidedActionFor(object, roomId); return <button type="button" key={object.id} onClick={() => draftCommand(actionCommand(object, action.verb))} disabled={disabled}>{object.name}<small>{action.label}</small></button>; })}</div>
  </section>;

  return (
    <section className="scene-actions" aria-label="Actions for things mentioned here">
      <div className="scene-actions-heading"><span>Mentioned here</span><small>Choose an action</small></div>
      <div className="scene-object-grid">
        {usableObjects.map((object) => {
          const actor = hasFlag(object, "ACTORBIT");
          return <article className="scene-object" key={object.id}>
            <strong>{object.name}</strong>
            <div>{actionsFor(object, roomId).map((action) => <button type="button" key={action.verb} onClick={() => sendCommand(actionCommand(object, action.verb))} disabled={disabled}>{action.label}</button>)}</div>
            {actor && topics.length > 0 && <details><summary>Ask about…</summary><div className="topic-buttons">{topics.map((topic) => <button type="button" key={topic.id} onClick={() => sendCommand(`ask ${object.commandNoun} about ${topic.commandNoun}`)} disabled={disabled}>{topic.name}</button>)}</div></details>}
          </article>;
        })}
      </div>
    </section>
  );
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
      {item === "map" && <figure><div className={`package-image-scroll ${interactiveMap ? "interactive-rockvil-map" : ""}`}><div className="rockvil-map-stage"><img src="/package/rockvil-map-back.jpg" alt="Original 1985 promotional street map of downtown Rockvil, South Dakota, with landmarks and a visitor guide" />{interactiveMap && <div className="map-hotspots" aria-label="Rockvil landmarks">{ROCKVIL_LANDMARKS.map((landmark) => <button type="button" key={landmark.id} className={`${currentRoomId === landmark.targetId ? "current" : ""} ${routePreview?.destination.id === landmark.id ? "selected" : ""}`} style={{ "--map-x": `${landmark.x}%`, "--map-y": `${landmark.y}%` } as CSSProperties} onClick={() => onSelectLandmark?.(landmark)} aria-label={`${landmark.label}${currentRoomId === landmark.targetId ? ", current location" : ""}`}><span>{landmark.label}</span></button>)}</div>}</div></div><figcaption>{interactiveMap ? "Choose a landmark on the original map to plot a walking route." : "The 2031 street map supplied with the original game. Zoom your browser or open the image directly for fine print."} <a href="/package/rockvil-map-back.jpg" target="_blank">Open full size ↗</a></figcaption>{interactiveMap && routePreview && <div className="map-route-card"><span>Route</span><strong>{routePreview.destination.label}</strong>{routePreview.arrived ? <p>You are at the mapped approach. Follow the passage for the entrance.</p> : routePreview.nextCommand ? <><p>{routePreview.steps} {routePreview.steps === 1 ? "step" : "steps"} away. Next: <b>{routePreview.nextCommand.toUpperCase()}</b>{routePreview.nextPlace ? ` toward ${routePreview.nextPlace}` : ""}.</p><button type="button" onClick={onRouteStep} disabled={routeStepDisabled}>{routeStepLabel}</button></> : <p>No reliable walking route starts from the current location. Move to a named street and try again.</p>}</div>}</figure>}
      {item === "decoder" && <figure><div className="package-image-scroll decoder-image"><img src="/package/security-decoder.jpg" alt="Original PRISM Project Facility Class One Security Mode Access Decoder wheel" /></div><figcaption>The physical decoder supplied in 1985. When the game requests a code, the command deck also offers an accessible digital equivalent.</figcaption></figure>}
      {item === "manual" && <div className="manual-card"><span aria-hidden="true">D/O</span><div><h3>Dakota Online · April 2031</h3><p>The original magazine, short story, advertising, and instruction manual are preserved together in this scan.</p><a href="/package/amfv-manual.pdf" target="_blank">Read the original PDF ↗</a></div></div>}
      <footer>Scans preserved by <a href="https://gallery.guetech.org/amfv/amfv.html" target="_blank" rel="noreferrer">The Infocom Gallery</a> and <a href="https://www.mocagh.org/loadpage.php?getgame=amfv" target="_blank" rel="noreferrer">Museum of Computer Adventure Game History</a>.</footer>
    </div>
  </section>;
}
