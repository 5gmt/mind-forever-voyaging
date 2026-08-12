# A Mind Forever Voyaging — Modern Unabridged Edition

Steve Meretzky’s 1985 interactive novel, presented in a contemporary browser interface with the complete original story intact.

## What is preserved

- The canonical game is the original Z-machine Release 79 story file, serial `851122`.
- SHA-256: `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`.
- The complete historical ZIL source is under `source/`.
- No prose, parser response, puzzle condition, timing rule, or story branch has been rewritten.
- The original Rockvil map, security decoder, and *Dakota Online* manual are included under `public/package/`.

## How it plays

The interface offers three player-selected control levels:

- **Classic** keeps the command line and the story’s own prompts.
- The opening asks players to choose **Classic**, **Guided**, or **Action menus** before the first line of play.
- **Guided** is the default: places and exits are clickable, while a useful detail drafts one editable, source-supported command.
- **Action menus** add direct actions only for people and objects with meaningful behavior in the original source.

Across the assisted levels:

- Communications outlets are a clickable location switcher.
- Library Mode has large Previous, Next, Open, Read, Close, and Exit controls.
- Interface Mode exposes working panels for HVAC, janitorial schedules, traffic timing, auditing, and the WNN feed as each port becomes available.
- Simulation locations show usable exits and conservative suggestions drawn from the establishing passage.
- The package map opens automatically when the story refers to it. In Guided and Action modes, its landmarks plot step-by-step walking routes through the original room graph.
- A private notebook keeps the player’s own observations across visited years.

Every submitted control uses nouns, adjectives, grammar, room-local globals, and action routines from the original parser. Commented-out ZIL definitions and generic parser-global vocabulary are excluded from scene suggestions, and the establishing scene remains stable until the player moves or uses LOOK. Free typing remains available throughout.

## How the wrapper stays in sync

The canonical Release 79 interpreter remains the authority. Guided controls never move the player, complete an objective, or change a story flag themselves: each one submits an ordinary parser command to Parchment and waits for the interpreter to accept it and print the result.

The current integration is output-derived rather than a direct read of Z-machine memory:

- `public/player-bridge.js` watches Parchment’s transcript, status window, grid window, and active input. It reports the latest text, whether the story expects a line or a single character, and whether the interpreter is ready for another command.
- `app/PrismEdition.tsx` derives the current mode, year, location, available simulations, outlets, ports, and major story phase from the status window and exact messages printed by the original game.
- `scripts/extract-world.mjs` builds `app/world-data.ts` from the historical ZIL source. The interface combines that authored room/object graph with the resolved location and the nouns actually mentioned in the current scene before offering navigation or actions.
- Ambiguous locations are resolved conservatively using the previous room, the last movement command, and the current passage. If there is no reliable answer, the wrapper withholds graph-derived controls instead of guessing.

The fieldwork checklist follows the same authored moments that fill `RECORDING-TABLE` in Release 79. It reconstructs the passages printed while RECORD is active and matches the canonical events for the nine requested observations. It does **not** currently read that table from VM memory.

This design keeps the original story file untouched and ensures every assisted action still goes through the original parser. Its remaining limitation is saved-state rollback: RESTART is detected and resets the shell, but RESTORE or UNDO to an earlier state cannot yet roll every derived discovery flag back with VM-level certainty. A future hardened integration could expose a small read-only telemetry packet from Parchment—current room, mode, year, recording bitmask, and save generation—while continuing to run the unmodified, checksum-verified Release 79 story.

Spoiler/debug tools live under **About**. After explicit confirmation they load `public/amfv-modern-debug.z4`, a separate Release 900 QA build with the dormant `$CHEAT` routines restored. The untouched Release 79 session remains mounted and resumes where it was left.

## Local development

This repository requires Node.js 22.13.0 or newer and npm 11.16.0 or newer. Dependency resolution uses a seven-day release-age cooldown, so older npm versions are intentionally rejected rather than silently ignoring that policy.

Codespaces and other environments that ship an older npm can bootstrap the pinned development version without first invoking npm inside the repository:

```sh
bash scripts/bootstrap-npm.sh
npm ci
npm run dev
```

If `npm --version` is already 11.16.0 or newer, the bootstrap step is optional. For reproducible installs, prefer `npm ci` with the committed lockfile instead of regenerating it with `npm install`.

Build and verify the static export:

```sh
npm run build
npm test
```

The output is written to `out/`. This project deploys to Netlify using `netlify.toml`:

```sh
npx netlify-cli deploy --dir=out --prod
```

## Credits

*A Mind Forever Voyaging* was written by Steve Meretzky and published by Infocom in 1985. The historical source archive comes from [the-infocom-files/amfv](https://github.com/the-infocom-files/amfv). The original package scans are preserved by [The Infocom Gallery](https://gallery.guetech.org/amfv/amfv.html) and the [Museum of Computer Adventure Game History](https://www.mocagh.org/loadpage.php?getgame=amfv). The browser interpreter is [Parchment](https://github.com/curiousdannii/parchment), maintained by Dannii Willis and contributors.

The original game, source, and package material retain their existing copyright notices. See `THIRD_PARTY_NOTICES.md` for interpreter notices.
