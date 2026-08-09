# A Mind Forever Voyaging — Modern Unabridged Edition

This project presents Steve Meretzky’s 1985 interactive novel in a contemporary browser reader while keeping the original work canonical.

## Preservation contract

- The game runs the original Z-machine Release 79 story file, serial `851122`.
- SHA-256: `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`.
- The complete historical ZIL source is preserved under `source/`.
- No original prose, parser response, puzzle condition, score, timing rule, or story branch has been rewritten.
- Modern features—onboarding, contextual exits, command aliases, accessibility settings, and the private session journal—live outside the game engine.

The browser interpreter is Parchment 2026.8.1. The contextual room index is generated from the preserved ZIL by `scripts/extract-world.mjs`.

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

## Credits

*A Mind Forever Voyaging* was written by Steve Meretzky and published by Infocom in 1985. The historical source archive comes from [the-infocom-files/amfv](https://github.com/the-infocom-files/amfv). The web interpreter is [Parchment](https://github.com/curiousdannii/parchment), maintained by Dannii Willis and contributors.

The original game and its source retain their existing copyright notices. Modern reader code, generated room data, and new artwork are kept structurally separate from the preserved work. See `THIRD_PARTY_NOTICES.md` for interpreter notices.
