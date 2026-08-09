import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const sourceDir = new URL("../source/", import.meta.url);
const outputFile = new URL("../app/world-data.ts", import.meta.url);
const sourcePath = fileURLToPath(sourceDir);
const directionPattern = "NORTH|NORTHEAST|EAST|SOUTHEAST|SOUTH|SOUTHWEST|WEST|NORTHWEST|NE|SE|SW|NW|UP|DOWN|IN|OUT";

const files = (await readdir(sourcePath))
  .filter((name) => name.endsWith(".zil"))
  .sort();

const rooms = [];
const objects = [];

const stripLineComments = (text) => text.split(/\r?\n/).map((line) => {
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && line[index - 1] !== "\\") quoted = !quoted;
    if (character === ";" && !quoted) return line.slice(0, index);
  }
  return line;
}).join("\n");

const parserWords = (body, property) => {
  const raw = new RegExp(`\\(${property}\\s+([^)]+)\\)`).exec(body)?.[1] ?? "";
  return raw.split(/\s+/)
    .map((word) => word.replace(/\\'/g, "'").toLowerCase())
    .filter((word) => /^[a-z0-9][a-z0-9'-]*$/.test(word) && !word.startsWith("zz"));
};

const commandNounFor = (name, synonyms, adjectives, flags) => {
  const displayWords = name.toLowerCase().match(/[a-z0-9']+/g) ?? [];
  const lastDisplayWord = displayWords.at(-1);
  const genericActorNouns = new Set(["baby", "computer", "controller", "elder", "guard", "guardsman", "man", "member", "official", "officer", "system", "woman", "worker", "workers"]);
  let base = null;
  if (flags.includes("ACTORBIT") && lastDisplayWord && synonyms.some((synonym) => lastDisplayWord === synonym || lastDisplayWord.startsWith(synonym))) base = lastDisplayWord;
  const candidates = synonyms.flatMap((synonym) => {
    const displayWord = displayWords.find((word) => word === synonym || word.startsWith(synonym));
    return displayWord ? [displayWord] : [];
  });
  base ??= [...new Set(candidates)].sort((a, b) => b.length - a.length)[0] ?? synonyms.sort((a, b) => b.length - a.length)[0] ?? null;
  if (!base) return null;
  const adjective = adjectives.flatMap((candidate) => {
    const displayWord = displayWords.find((word) => word === candidate || word.startsWith(candidate));
    return displayWord ? [displayWord] : [];
  }).sort((a, b) => b.length - a.length)[0];
  if (adjective && adjective !== base && (!flags.includes("ACTORBIT") || genericActorNouns.has(base))) return `${adjective} ${base}`;
  return base;
};

for (const file of files) {
  const source = stripLineComments(await readFile(join(sourcePath, file), "utf8"));
  const roomPattern = /<ROOM\s+([A-Z0-9-]+)([\s\S]*?)>\r?\n(?=\r?\n|\f)/g;
  for (const match of source.matchAll(roomPattern)) {
    const [, id, body] = match;
    const description = /\(DESC\s+"([^"]+)"\)/.exec(body)?.[1];
    if (!description || description === "(undefined)") continue;

    const exits = {};
    const exitPattern = new RegExp(`\\((${directionPattern})\\s+TO\\s+([A-Z0-9-]+)`, "g");
    for (const exit of body.matchAll(exitPattern)) {
      exits[exit[1]] = exit[2];
    }

    rooms.push({ id, name: description, exits });
  }

  const objectPattern = /<OBJECT\s+([A-Z0-9-]+)([\s\S]*?)>\r?\n(?=\r?\n|\f)/g;
  for (const match of source.matchAll(objectPattern)) {
    const [, id, body] = match;
    const name = /\(DESC\s+"([^"]+)"\)/.exec(body)?.[1];
    if (!name || name === "it" || name === "(undefined)" || name.length < 2) continue;
    const initialLocation = /\(LOC\s+([A-Z0-9-]+)\)/.exec(body)?.[1] ?? null;
    const flags = /\(FLAGS\s+([^)]+)\)/.exec(body)?.[1].trim().split(/\s+/).filter(Boolean) ?? [];
    const synonyms = parserWords(body, "SYNONYM");
    const adjectives = parserWords(body, "ADJECTIVE");
    const commandNoun = commandNounFor(name, synonyms, adjectives, flags);
    objects.push({ id, name, initialLocation, flags, synonyms, adjectives, commandNoun });
  }
}

const namesById = new Map(rooms.map((room) => [room.id, room.name]));
const normalized = rooms
  .map((room) => ({
    id: room.id,
    name: room.name,
    exits: Object.fromEntries(
      Object.entries(room.exits).map(([direction, target]) => [
        direction,
        { command: direction.toLowerCase(), targetId: target, target: namesById.get(target) ?? target.toLowerCase().replaceAll("-", " ") },
      ]),
    ),
  }))
  .sort((a, b) => b.name.length - a.name.length || a.name.localeCompare(b.name));

const normalizedObjects = [...new Map(objects.map((object) => [object.id, object])).values()]
  .sort((a, b) => b.name.length - a.name.length || a.name.localeCompare(b.name));

const output = `// Generated from the preserved ZIL source by scripts/extract-world.mjs.\n` +
  `// Do not edit by hand; the original game remains canonical.\n\n` +
  `export type WorldExit = { command: string; targetId: string; target: string };\n` +
  `export type WorldRoom = { id: string; name: string; exits: Record<string, WorldExit> };\n\n` +
  `export type WorldObject = { id: string; name: string; initialLocation: string | null; flags: string[]; synonyms: string[]; adjectives: string[]; commandNoun: string | null };\n\n` +
  `export const WORLD_ROOMS: WorldRoom[] = ${JSON.stringify(normalized, null, 2)};\n\n` +
  `export const WORLD_OBJECTS: WorldObject[] = ${JSON.stringify(normalizedObjects, null, 2)};\n`;

await writeFile(outputFile, output, "utf8");
console.log(`Extracted ${normalized.length} named rooms and ${normalizedObjects.length} named objects to ${fileURLToPath(outputFile)}`);
