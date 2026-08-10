<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project-specific instructions

## Canonical story integrity

- Never modify `public/amfv-r79-s851122.z4` unless a task explicitly requires replacing the canonical release artifact.
- For ordinary application, wrapper, localization, accessibility, testing, and documentation work, its SHA-256 must remain `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`.
- Do not modify the historical ZIL sources under `source/` unless a task explicitly requires historical-source work.
- The canonical Release 79 interpreter remains the authority for game state and parser behavior.

## Localization architecture

- State detection must operate on raw English transcript and status output from the canonical interpreter.
- Localization is a presentation concern. Do not feed localized Japanese text into state detection or other game-state derivation.
- Parser commands sent to Parchment must remain English unless a task explicitly changes the parser architecture.
- Untranslated story output must safely fall back to the original English.
- Do not modify the noncanonical QA story as part of localization work unless explicitly requested.

## Scope discipline

- Prefer small, reviewable changes and avoid unrelated refactors.
- Do not add production dependencies unless they are necessary for the requested task.
- Do not modify `package.json` or `package-lock.json` merely for convenience.
- Preserve existing accessibility and reading-preference behavior when adding alternate presentation layers.

## Verification

Before completing implementation work, run the applicable checks:

- `npm run lint`
- `npx tsc --noEmit`
- `npm test`

For localization or wrapper work, also verify the canonical story SHA-256. If a full build or test cannot run because of an environmental or network limitation, run all independent checks that can run and report the environmental failure separately from code regressions.

## Git workflow

- Do not commit directly to `codex/modern-amfv` for normal feature or maintenance work.
- Use a task-specific branch with a descriptive ASCII name.
- Keep pull requests draft until implementation, verification, and review are complete.
