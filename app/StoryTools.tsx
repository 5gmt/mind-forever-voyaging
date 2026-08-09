"use client";

/* eslint-disable @next/next/no-img-element -- the viewer presents archival scans at their natural proportions */

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { WorldObject } from "./world-data";

export type PackageItem = "map" | "decoder" | "manual";

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

const actionsFor = (object: WorldObject) => {
  const lower = object.name.toLowerCase();
  const actions: Array<{ label: string; verb: string }> = [];
  if (hasFlag(object, "ACTORBIT")) return [{ label: "Greet", verb: "hello" }, { label: "Look", verb: "examine" }];
  if (hasFlag(object, "READBIT") || /article|book|directory|display|graffiti|label|letter|magazine|map|menu|newspaper|notice|paper|screen|sign/.test(lower)) actions.push({ label: "Read", verb: "read" });
  if (hasFlag(object, "DOORBIT") || hasFlag(object, "CONTBIT") || /box|cabinet|door|drawer|gate|mailbox|refrigerator|window/.test(lower)) actions.push({ label: "Open", verb: "open" });
  if (hasFlag(object, "VEHBIT") || /bus|car|elevator|skycar|train|tube/.test(lower)) actions.push({ label: "Enter", verb: "enter" });
  if (/button|buzzer|key|switch/.test(lower)) actions.push({ label: "Press", verb: "push" });
  if (hasFlag(object, "TAKEBIT") || hasFlag(object, "TRYTAKEBIT")) actions.push({ label: "Take", verb: "take" });
  actions.push({ label: "Look", verb: "examine" });
  return [...new Map(actions.map((action) => [action.verb, action])).values()].slice(0, 3);
};

export function SceneActions({ objects, sendCommand, disabled }: { objects: WorldObject[]; sendCommand: (command: string) => void; disabled: boolean }) {
  const topics = useMemo(() => objects.filter((object) => !hasFlag(object, "ACTORBIT")).slice(0, 4), [objects]);
  if (!objects.length) return null;

  return (
    <section className="scene-actions" aria-label="Things mentioned in the current scene">
      <div className="scene-actions-heading"><span>In this scene</span><small>Choose an action</small></div>
      <div className="scene-object-grid">
        {objects.map((object) => {
          const actor = hasFlag(object, "ACTORBIT");
          return <article className="scene-object" key={object.id}>
            <strong>{object.name}</strong>
            <div>{actionsFor(object).map((action) => <button type="button" key={action.verb} onClick={() => sendCommand(`${action.verb} ${object.name}`)} disabled={disabled}>{action.label}</button>)}</div>
            {actor && topics.length > 0 && <details><summary>Ask about…</summary><div className="topic-buttons">{topics.map((topic) => <button type="button" key={topic.id} onClick={() => sendCommand(`ask ${object.name} about ${topic.name}`)} disabled={disabled}>{topic.name}</button>)}</div></details>}
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

export function PackageOverlay({ item, onSelect, onClose }: { item: PackageItem | null; onSelect: (item: PackageItem) => void; onClose: () => void }) {
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
      {item === "map" && <figure><div className="package-image-scroll"><img src="/package/rockvil-map-back.jpg" alt="Original 1985 promotional street map of downtown Rockvil, South Dakota, with landmarks and a visitor guide" /></div><figcaption>The 2031 street map supplied with the original game. Zoom your browser or open the image directly for fine print. <a href="/package/rockvil-map-back.jpg" target="_blank">Open full size ↗</a></figcaption></figure>}
      {item === "decoder" && <figure><div className="package-image-scroll decoder-image"><img src="/package/security-decoder.jpg" alt="Original PRISM Project Facility Class One Security Mode Access Decoder wheel" /></div><figcaption>The physical decoder supplied in 1985. When the game requests a code, the command deck also offers an accessible digital equivalent.</figcaption></figure>}
      {item === "manual" && <div className="manual-card"><span aria-hidden="true">D/O</span><div><h3>Dakota Online · April 2031</h3><p>The original magazine, short story, advertising, and instruction manual are preserved together in this scan.</p><a href="/package/amfv-manual.pdf" target="_blank">Read the original PDF ↗</a></div></div>}
      <footer>Scans preserved by <a href="https://gallery.guetech.org/amfv/amfv.html" target="_blank" rel="noreferrer">The Infocom Gallery</a> and <a href="https://www.mocagh.org/loadpage.php?getgame=amfv" target="_blank" rel="noreferrer">Museum of Computer Adventure Game History</a>.</footer>
    </div>
  </section>;
}
