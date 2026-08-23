<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project-specific instructions

## How to read these instructions

- Rules that protect the canonical artifact, runtime authority, observed output, safe fallback, or accessibility are hard guardrails. Do not weaken them unless a task explicitly changes that project-level guarantee and defines acceptance criteria for the change.
- Rules that describe observation, input, or presentation mechanisms are current architectural defaults, not permanent bans on redesign. A task may change a mechanism when that boundary is explicitly in scope, provided the applicable hard guardrails remain intact and these instructions are updated with the new default.
- Commands, CI expectations, dependency and deployment constraints, and branch and review rules describe the repository's current operating procedure. Follow them for ordinary work; when a task changes the workflow, update these instructions in the same change.

## Project context routing

This file defines how agents work in this repository. It does not replace task-specific scope, current project direction, or durable project principles.

- For a well-scoped implementation or review task, use these instructions together with the task's Issue, Pull Request, or design note. Do not load broader project documents by default.
- Read `PROJECT_STATUS.md` when selecting or sequencing work, assessing the current frontier, or updating milestones, CI, implementation, or delivery status.
- Read `PROJECT_CHARTER.md` when interpreting or changing the project's mission, canonical authority, player guarantees, decision priorities, or non-goals.
- Read only the documents selected by these conditions; do not treat the three files as a mandatory reading chain. A task may require both broader documents when both conditions apply.

## Canonical story integrity

- Never modify `public/amfv-r79-s851122.z4` unless a task explicitly requires replacing the canonical release artifact.
- For ordinary application, wrapper, localization, accessibility, testing, and documentation work, its SHA-256 must remain `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`.
- Do not modify the historical ZIL sources under `source/` unless a task explicitly requires historical-source work.
- The canonical Release 79 interpreter remains the authority for game state and parser behavior.

## Current localization architecture

- Unless a task explicitly redesigns the observation boundary, state detection must operate on raw English transcript and status output from the canonical interpreter.
- Localization is a presentation concern. Do not feed localized Japanese text into state detection or other game-state derivation.
- Parser commands sent to Parchment must remain English unless a task explicitly changes the parser architecture.
- Untranslated story output must safely fall back to the original English.
- Do not modify the noncanonical QA story as part of localization work unless explicitly requested.

## Scope discipline

- Before implementation, ensure the task defines its scope, acceptance criteria, existing guarantees, and intentional non-goals. Stop and clarify material ambiguity rather than choosing an architecture implicitly.
- Prefer small, reviewable changes and avoid unrelated refactors.
- Keep translation expansion, canonical-runtime observation, history and recovery semantics, presentation and window architecture, and deployment adaptation separate when practical.
- Preserve existing accessibility and reading-preference behavior when adding alternate presentation layers.
- State whether a change is grounded in runtime-observed fixtures, historical source evidence, or real-browser evidence.

## Dependency and deployment discipline

- Follow the committed `package.json` engine boundary and `.npmrc` policy. Use `scripts/bootstrap-npm.sh` before repository npm commands when the environment's npm is too old.
- Use `npm ci` with the committed lockfile for reproducible installs.
- Pin third-party GitHub Actions to reviewed full commit SHAs, keeping the release tag in an adjacent comment for maintainability.
- Do not add production dependencies unless they are necessary for the requested task.
- Do not modify `package.json` or `package-lock.json` merely for convenience.
- Do not add or replace a deployment adapter, framework, build target, or dependency graph unless deployment work is explicitly in scope.

## Verification

Before completing implementation work, run the applicable checks:

- `npm run lint`
- `npx tsc --noEmit`
- `npm test`

For changes affecting localization presentation, canonical-runtime observation, or layout, also run `npm run test:e2e` and verify the canonical story SHA-256. For layout, status, scrolling, or focus changes, record real-browser observations in addition to automated checks.

GitHub CI runs the ordinary `verify` job first, then the Chromium-only `browser-e2e` job. A browser assertion failure must fail the CI job, and Playwright failure traces/screenshots under `test-results/` are retained briefly as Actions artifacts.

For regression fixes, preserve evidence in this order when practical:

1. A failing automated test or runtime observation that reproduces the problem
2. Confirmation that the pre-fix state is RED
3. The smallest relevant fix
4. A passing task-specific test or runtime observation (GREEN)
5. The applicable full verification suite and canonical checksum

When automation cannot reproduce a visual, timing, or browser-integration problem, use before/after real-browser observations as RED/GREEN evidence. If an environmental or network limitation blocks a check, run all independent checks and report the limitation separately from code regressions; do not report the blocked check as passing.

## Pull request and review workflow

- Do not commit directly to `codex/modern-amfv` for normal feature or maintenance work.
- Use a task-specific branch with a descriptive ASCII name.
- Keep pull requests draft until implementation, verification, and review are complete.
- Record verification commands and results, runtime observations, known limitations, and the guarantees preserved in the pull request.
- Treat implementation and design/review as separate checkpoints, even when the same person or agent performs both roles.
- Review the runtime evidence, regression coverage, acceptance criteria, and consistency with existing design—not only the textual diff.
- Return missing evidence or guarantees as explicit follow-up work rather than treating the pull request as merge-ready.

Under the repository's current branch-based GitHub workflow, a pull request is merge-ready only when:

- it contains the latest target branch (`behind = 0`);
- GitHub reports it mergeable with no unresolved conflict;
- the checks required for the change pass on the latest head commit; and
- its evidence matches the acceptance criteria, preserved guarantees, and known limitations.

If the target branch advances during review, update the branch and rerun the task-specific regression on the new base before merging.
