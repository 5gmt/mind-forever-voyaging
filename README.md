# A Mind Forever Voyaging — Modern Unabridged Edition

This project presents Steve Meretzky’s 1985 interactive novel in a contemporary browser reader while keeping the original work canonical.

## Preservation contract

- The game runs the original Z-machine Release 79 story file, serial `851122`.
- SHA-256: `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`.
- The complete historical ZIL source is preserved under `source/`.
- No original prose, parser response, puzzle condition, score, timing rule, or story branch has been rewritten.
- Modern features—spoiler-gated onboarding, contextual exits and nouns, command aliases, accessibility settings, the digital security decoder, and a private evidence notebook—live outside the game engine.

The browser interpreter is Parchment 2026.8.1. The contextual room index is generated from the preserved ZIL by `scripts/extract-world.mjs`.

## Design approach

The surrounding interface follows the story instead of explaining it. It begins as an unresolved literary signal, reveals Communications, Library, Interface, and Simulation tools only after the original text names them, and changes again as observation becomes evidence and evidence becomes public action. Years and places appear only after the player reaches them.

Clicks still send ordinary Release 79 commands. Library buttons replace obscure single-key input, the story’s physical-package security wheel has a source-accurate digital counterpart, verified exits become directional controls, and recent visible nouns can be combined with verbs. Free typing always remains available.

An explicitly consent-gated spoiler/debug mode is available under **Edition & provenance**. It loads `public/amfv-modern-debug.z4`, a separate Release 900 QA build defined by `modern/debug-amfv.zil`, with Infocom’s dormant `$CHEAT` routines restored. Canonical play always uses the untouched Release 79 file, and QA autosaves remain isolated.

## Local development

```sh
npm install
npm run dev
```

The deployment build is produced with:

```sh
npm run build
npm test
```

The static export is written to `out/`. Netlify configuration lives in `netlify.toml`; a manual production deploy can be made with:

```sh
npx netlify-cli deploy --dir=out --prod
```

## Credits

*A Mind Forever Voyaging* was written by Steve Meretzky and published by Infocom in 1985. The historical source archive comes from [the-infocom-files/amfv](https://github.com/the-infocom-files/amfv). The web interpreter is [Parchment](https://github.com/curiousdannii/parchment), maintained by Dannii Willis and contributors.

The original game and its source retain their existing copyright notices. Modern reader code, generated room data, and new artwork are kept structurally separate from the preserved work. See `THIRD_PARTY_NOTICES.md` for interpreter notices.
