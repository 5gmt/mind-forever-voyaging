# A Mind Forever Voyaging — Modern Unabridged Edition

Steve Meretzky’s 1985 interactive novel, presented in a contemporary browser interface with the complete original story intact.

## What is preserved

- The canonical game is the original Z-machine Release 79 story file, serial `851122`.
- SHA-256: `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`.
- The complete historical ZIL source is under `source/`.
- No prose, parser response, puzzle condition, timing rule, or story branch has been rewritten.
- The original Rockvil map, security decoder, and *Dakota Online* manual are included under `public/package/`.

## How it plays

The interface turns details named by the story into direct controls:

- Communications outlets are a clickable location switcher.
- Library Mode has large Previous, Next, Open, Read, Close, and Exit controls.
- Interface Mode exposes working panels for HVAC, janitorial schedules, traffic timing, auditing, and the WNN feed as each port becomes available.
- Simulation locations show usable exits and actions for the people and objects in the current scene.
- The package map opens automatically when the story refers to it; the security prompt opens a usable decoder.
- A private notebook keeps the player’s own observations across visited years.

Every control sends an ordinary command to the story. Free typing remains available throughout.

Spoiler/debug tools live under **About**. After explicit confirmation they load `public/amfv-modern-debug.z4`, a separate Release 900 QA build with the dormant `$CHEAT` routines restored. The untouched Release 79 session remains mounted and resumes where it was left.

## Local development

```sh
npm install
npm run dev
```

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
