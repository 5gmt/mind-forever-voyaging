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

const sourceFiles = await Promise.all(files.map(async (file) => ({
  file,
  source: stripLineComments(await readFile(join(sourcePath, file), "utf8")),
})));
const allSource = sourceFiles.map(({ source }) => source).join("\n\n");

const dynamicRoomNames = new Map();
for (const match of allSource.matchAll(/<PUTP\s+,([A-Z0-9-]+)\s+,P\?SDESC\s+"([^"]+)"/g)) {
  const names = dynamicRoomNames.get(match[1]) ?? [];
  if (!names.includes(match[2])) names.push(match[2]);
  dynamicRoomNames.set(match[1], names);
}

const routineBodies = new Map();
for (const match of allSource.matchAll(/<ROUTINE\s+([A-Z0-9-]+)([\s\S]*?)(?=\r?\n\r?\n<(?:ROUTINE|OBJECT|ROOM|GLOBAL|CONSTANT|SYNTAX|VERB|DIRECTIONS|BUZZ)\b|$)/g)) {
  routineBodies.set(match[1], match[2]);
}

const handledVerbsFor = (action) => {
  if (!action) return [];
  const body = routineBodies.get(action) ?? "";
  const verbs = [];
  for (const match of body.matchAll(/<VERB\?\s+([^>]+)>/g)) {
    for (const verb of match[1].split(/\s+/).filter((word) => /^[A-Z][A-Z0-9-]*$/.test(word))) {
      if (!verbs.includes(verb)) verbs.push(verb);
    }
  }
  return verbs;
};

const actionRoomsFor = (action) => {
  if (!action) return [];
  const body = routineBodies.get(action) ?? "";
  const rooms = [];
  for (const match of body.matchAll(/<EQUAL\?\s+,HERE\s+([^>]+)>/g)) {
    for (const room of match[1].matchAll(/,([A-Z][A-Z0-9-]+)/g)) {
      if (!rooms.includes(room[1])) rooms.push(room[1]);
    }
  }
  return rooms;
};

const enclosingBranch = (body, index) => {
  const start = body.lastIndexOf("(", index);
  if (start < 0) return body;
  let depth = 0;
  let quoted = false;
  for (let cursor = start; cursor < body.length; cursor += 1) {
    const character = body[cursor];
    if (character === '"' && body[cursor - 1] !== "\\") quoted = !quoted;
    if (quoted) continue;
    if (character === "(") depth += 1;
    if (character === ")") {
      depth -= 1;
      if (depth === 0) return body.slice(start, cursor + 1);
    }
  }
  return body.slice(start);
};

const verbContextsFor = (action) => {
  const body = action ? routineBodies.get(action) ?? "" : "";
  const globalVerbs = new Set();
  const verbRooms = new Map();
  for (const match of body.matchAll(/<VERB\?\s+([^>]+)>/g)) {
    const branch = enclosingBranch(body, match.index ?? 0);
    const rooms = actionRoomsForBranch(branch);
    for (const verb of match[1].split(/\s+/).filter((word) => /^[A-Z][A-Z0-9-]*$/.test(word))) {
      if (!rooms.length) globalVerbs.add(verb);
      else verbRooms.set(verb, [...new Set([...(verbRooms.get(verb) ?? []), ...rooms])]);
    }
  }
  return { globalVerbs: [...globalVerbs], verbRooms: Object.fromEntries(verbRooms) };
};

function actionRoomsForBranch(branch) {
  const rooms = [];
  for (const match of branch.matchAll(/<EQUAL\?\s+,HERE\s+([^>]+)>/g)) {
    for (const room of match[1].matchAll(/,([A-Z][A-Z0-9-]+)/g)) if (!rooms.includes(room[1])) rooms.push(room[1]);
  }
  return rooms;
}

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

for (const { source } of sourceFiles) {
  const roomPattern = /<ROOM\s+([A-Z0-9-]+)([\s\S]*?)>\r?\n(?=\r?\n|\f)/g;
  for (const match of source.matchAll(roomPattern)) {
    const [, id, body] = match;
    const description = /\(DESC\s+"([^"]+)"\)/.exec(body)?.[1];
    const aliases = [...new Set([
      ...(description && description !== "(undefined)" ? [description] : []),
      ...(dynamicRoomNames.get(id) ?? []),
    ])];
    if (!aliases.length) continue;

    const exits = {};
    const exitPattern = new RegExp(`\\((${directionPattern})\\s+TO\\s+([A-Z0-9-]+)`, "g");
    for (const exit of body.matchAll(exitPattern)) {
      exits[exit[1]] = exit[2];
    }

    const globals = /\(GLOBAL\s+([^)]+)\)/.exec(body)?.[1]
      .split(/\s+/)
      .filter((word) => /^[A-Z][A-Z0-9-]*$/.test(word)) ?? [];

    rooms.push({ id, name: aliases[0], aliases, globals, exits });
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
    const action = /\(ACTION\s+([A-Z0-9-]+)\)/.exec(body)?.[1] ?? null;
    const handledVerbs = handledVerbsFor(action);
    const actionRooms = actionRoomsFor(action);
    const { globalVerbs, verbRooms } = verbContextsFor(action);
    const hasText = /\(TEXT\s+(?:"|<)/.test(body);
    objects.push({ id, name, initialLocation, flags, synonyms, adjectives, commandNoun, action, handledVerbs, actionRooms, globalVerbs, verbRooms, hasText });
  }
}

const namesById = new Map(rooms.map((room) => [room.id, room.name]));
const normalized = rooms
  .map((room) => ({
    id: room.id,
    name: room.name,
    aliases: room.aliases,
    globals: room.globals,
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
  `export type WorldRoom = { id: string; name: string; aliases: string[]; globals: string[]; exits: Record<string, WorldExit> };\n\n` +
  `export type WorldObject = { id: string; name: string; initialLocation: string | null; flags: string[]; synonyms: string[]; adjectives: string[]; commandNoun: string | null; action: string | null; handledVerbs: string[]; actionRooms: string[]; globalVerbs: string[]; verbRooms: Record<string, string[]>; hasText: boolean };\n\n` +
  `export const WORLD_ROOMS: WorldRoom[] = ${JSON.stringify(normalized, null, 2)};\n\n` +
  `export const WORLD_OBJECTS: WorldObject[] = ${JSON.stringify(normalizedObjects, null, 2)};\n`;

await writeFile(outputFile, output, "utf8");
console.log(`Extracted ${normalized.length} named rooms and ${normalizedObjects.length} named objects to ${fileURLToPath(outputFile)}`);
