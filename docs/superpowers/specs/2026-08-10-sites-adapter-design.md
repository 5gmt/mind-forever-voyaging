# Sites Adapter Design

## Goal

Make the GitHub default branch the canonical application source for both the
existing Next.js static export on Netlify and the owner-only ChatGPT Sites
deployment. A future application change should be testable on Sites without
reconstructing a second package configuration or copying starter-only files by
hand.

This change adds a deployment adapter. It does not change the AMFV wrapper,
canonical Release 79 story, historical ZIL source, localization architecture,
or public Netlify URL.

## Chosen approach

Keep one source tree with two explicit build targets:

- ChatGPT Sites is the default production build because the Sites lifecycle
  invokes the package's existing `build` script.
- The current Next.js static export remains available as `build:next`.
- Netlify calls `build:next` explicitly and continues publishing `out/`.
- CI runs the existing static-render tests and a separate Sites Worker render
  test.

This avoids maintaining a long-lived branch whose `package.json`,
`next.config.ts`, test expectations, and lockfile diverge from the GitHub
default branch.

## Build boundaries

### Shared application

The following remain shared and unchanged:

- `app/`
- `public/`
- `source/`
- `scripts/extract-world.mjs`
- the canonical Release 79 SHA-256:
  `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`

### Next.js and Netlify

- Preserve `next.config.ts`, including `output: "export"` and
  `images.unoptimized`.
- Add `build:next` for the current `next build` path.
- Keep the existing static HTML test in `tests/rendered-html.test.mjs`.
- Change `netlify.toml` to call `npm run build:next`; its publish directory
  remains `out`.

### ChatGPT Sites

Add only the platform adapter required to emit a deployable Sites artifact:

- `.openai/hosting.json` for the existing owner-only Site identity
- `vite.config.ts`
- `worker/index.ts`
- `build/sites-vite-plugin.ts`
- bounded Sites environment, build, install, and artifact-validation scripts
- `tests/sites-rendered-html.test.mjs`

`vite.config.ts` lets Vinext consume the authoritative root
`next.config.ts`. Vinext prerenders the exportable routes and also emits the
Worker artifact required by Sites. This keeps the static-export constraints
identical across both targets instead of maintaining a second Next-style
configuration.

The application uses unoptimized images, so the Worker delegates directly to
Vinext and requires no custom Images or asset binding. No D1, Drizzle, R2,
authentication helper, example routes, or starter image assets are included.

## Package scripts

The public script contract is:

- `dev`: Sites/Vite development server, so Sites agent preview works
- `dev:next`: existing Next.js development server
- `build`: build and validate the Sites Worker
- `build:next`: build the Next.js static export
- `start`: serve the Sites/Vinext build
- `start:next`: serve the Next.js build
- `test:next`: build and test the static export
- `test:sites`: build and test the Sites Worker
- `test`: run both target-specific suites

The existing `lint`, `world`, and canonical story checks remain in force.
Sites packages are development dependencies; the application receives no new
runtime feature dependency. React, React DOM, and the bundled RSC runtime use
19.2.8, while the Cloudflare/Vite toolchain uses versions that clear the
advisories affecting the initial Sites starter snapshot.

Vinext currently depends on `image-size@2.0.2`, for which npm reports image
parser denial-of-service advisories without a fixed release. This application
has no upload or runtime image-inspection path, the custom image optimizer is
not included, only trusted repository assets are processed during the build,
and `image-size` is absent from the emitted Worker. Revisit the pin when
Vinext adopts a fixed image parser.

## Type checking and linting

Do not replace the repository's ESLint configuration and do not exclude new
adapter directories from TypeScript. Adapter files define their narrow Worker
environment interfaces locally and must pass the repository-wide
`npx tsc --noEmit` and `npm run lint` checks.

Only additive ignore entries for generated Sites state are permitted:
`/.sites-runtime/`, `/.wrangler/`, and `/dist/`.

## Test strategy

The static and Worker render contracts stay independent:

1. `tests/rendered-html.test.mjs` reads `out/index.html` and protects the
   existing Netlify output.
2. `tests/sites-rendered-html.test.mjs` imports
   `dist/server/index.js`, calls its real `fetch` handler with an asset
   binding, and asserts the rendered AMFV title and edition markers.
3. Existing story, source, package-material, lint, TypeScript, and canonical
   checksum checks continue unchanged.

This separation prevents the open localization work from having to merge two
different render helpers into `tests/rendered-html.test.mjs`.

## Git and deployment workflow

- Work occurs on `agent/add-sites-adapter`, never directly on
  `codex/modern-amfv`.
- The deliverable is a Draft PR.
- GitHub remains the canonical application source.
- ChatGPT Sites retains its separate managed source repository and owner-only
  access policy. After this adapter lands, future GitHub revisions can be
  synchronized into that managed checkout without reconstructing the build
  configuration.
- This PR does not broaden Site access, change the live deployment, or merge
  the open localization PR.

## Acceptance criteria

- `npm run lint` passes.
- `npx tsc --noEmit` passes.
- `npm run test:next` passes and emits `out/index.html`.
- `npm run test:sites` passes and emits an ESM
  `dist/server/index.js` with callable `default.fetch`.
- `npm test` passes both targets from a clean install.
- Netlify remains configured to publish `out/`.
- The canonical story checksum is unchanged.
- No AMFV application, story, historical source, localization, database,
  authentication, or access-policy behavior changes.
