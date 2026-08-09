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

for (const file of files) {
  const source = await readFile(join(sourcePath, file), "utf8");
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
}

const namesById = new Map(rooms.map((room) => [room.id, room.name]));
const normalized = rooms
  .map((room) => ({
    id: room.id,
    name: room.name,
    exits: Object.fromEntries(
      Object.entries(room.exits).map(([direction, target]) => [
        direction,
        { command: direction.toLowerCase(), target: namesById.get(target) ?? target.toLowerCase().replaceAll("-", " ") },
      ]),
    ),
  }))
  .sort((a, b) => b.name.length - a.name.length || a.name.localeCompare(b.name));

const output = `// Generated from the preserved ZIL source by scripts/extract-world.mjs.\n` +
  `// Do not edit by hand; the original game remains canonical.\n\n` +
  `export type WorldExit = { command: string; target: string };\n` +
  `export type WorldRoom = { id: string; name: string; exits: Record<string, WorldExit> };\n\n` +
  `export const WORLD_ROOMS: WorldRoom[] = ${JSON.stringify(normalized, null, 2)};\n`;

await writeFile(outputFile, output, "utf8");
console.log(`Extracted ${normalized.length} named rooms to ${fileURLToPath(outputFile)}`);
