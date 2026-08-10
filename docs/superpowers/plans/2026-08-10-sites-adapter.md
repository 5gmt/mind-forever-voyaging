# Sites Adapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the canonical GitHub tree buildable and testable as both the existing Next.js static export and the owner-only ChatGPT Sites Worker.

**Architecture:** Preserve the root Next.js static configuration and add a Vinext/Vite adapter that consumes the same export constraints while emitting a Sites Worker. Keep target-specific render tests separate, make Sites the package's default `build` target for lifecycle compatibility, and route Netlify explicitly through `build:next`.

**Tech Stack:** Node.js 22, Next.js 16.3, React 19.2.8, Vinext 0.0.50, Vite 8.2.1, Cloudflare Vite plugin 1.51.1, Wrangler 4.120.0, Node test runner.

## Global Constraints

- Keep `public/amfv-r79-s851122.z4` unchanged at SHA-256 `14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d`.
- Do not modify `app/`, `public/`, `source/`, `next.config.ts`, or `tests/rendered-html.test.mjs`.
- Do not add D1, Drizzle, R2, authentication, example routes, or starter image assets.
- Preserve Netlify's `out/` publication and public URL behavior.
- Keep the Site owner-only and do not deploy or change its access policy in this task.
- Work only on `agent/add-sites-adapter`; deliver a Draft PR to `codex/modern-amfv`.

---

### Task 1: Specify the Sites Worker render contract

**Files:**
- Create: `tests/sites-rendered-html.test.mjs`

**Interfaces:**
- Consumes: built ESM module `dist/server/index.js` with `default.fetch(request, env, ctx)`
- Produces: a real Worker render regression test used by `test:sites`

- [ ] **Step 1: Write the failing Worker render test**

```js
import assert from "node:assert/strict";
import test from "node:test";

test("Sites Worker renders the finished unabridged edition", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(
    html,
    /<title>A Mind Forever Voyaging \| Unabridged Modern Edition<\/title>/i,
  );
  assert.match(html, /Original text and story flow preserved/i);
  assert.doesNotMatch(
    html,
    /codex-preview|Your site is taking shape|SkeletonPreview|react-loading-skeleton/i,
  );
});
```

- [ ] **Step 2: Run the test to verify RED**

Run:

```bash
node --test tests/sites-rendered-html.test.mjs
```

Expected: FAIL because `dist/server/index.js` does not exist.

- [ ] **Step 3: Commit the demonstrated failing contract**

```bash
git add tests/sites-rendered-html.test.mjs
git commit -m "test: define Sites Worker render contract"
```

### Task 2: Add the minimal Sites build adapter

**Files:**
- Create: `.openai/hosting.json`
- Create: `vite.config.ts`
- Create: `worker/index.ts`
- Create: `build/sites-vite-plugin.ts`
- Create: `scripts/sites-env.sh`
- Create: `scripts/install-ci.sh`
- Create: `scripts/build-sites-verified.sh`
- Create: `scripts/validate-sites-artifact.sh`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: existing `app/`, `public/`, root `next.config.ts`, and Site project identity
- Produces: `npm run build` emitting `dist/server/index.js` and `dist/.openai/hosting.json`

- [ ] **Step 1: Add the Site identity**

Create `.openai/hosting.json`:

```json
{
  "d1": null,
  "project_id": "appgprj_6a7978369d34819186fa48a641acce81",
  "r2": null
}
```

- [ ] **Step 2: Add the build-packaging plugin**

Create `build/sites-vite-plugin.ts` with a Vite `closeBundle` hook that
recreates `dist/.openai/` and copies `.openai/hosting.json` to
`dist/.openai/hosting.json`. It must not package Drizzle migrations because
this application has no D1 binding or schema.

- [ ] **Step 3: Add the Worker entry point**

Create `worker/index.ts` that imports and exports the handler from
`vinext/server/app-router-entry`. The application sets
`images.unoptimized`, so the Worker must not register a custom optimizer or
require undeclared `ASSETS` and `IMAGES` bindings.

- [ ] **Step 4: Add the Vite configuration**

Create `vite.config.ts` using `vinext()`, then add the repository's
`sites()` packaging plugin and
`@cloudflare/vite-plugin` with `main: "./worker/index.ts"`,
`compatibility_flags: ["nodejs_compat"]`, and no D1 or R2 bindings. Retain
the project-local Wrangler/Miniflare paths and the existing agent-preview
server behavior.

- [ ] **Step 5: Add bounded Sites scripts**

Add:

- `scripts/sites-env.sh` to keep HOME-like runtime state, npm cache, temporary
  files, and Wrangler files under `.sites-runtime/`;
- `scripts/install-ci.sh` to run one bounded `npm ci` and verify the locked
  Vinext installation;
- `scripts/build-sites-verified.sh` to run one bounded `vinext build`;
- `scripts/validate-sites-artifact.sh` to parse the packaged manifest and
  import `dist/server/index.js`, rejecting an artifact without callable
  `default.fetch`.

- [ ] **Step 6: Add exact development dependencies and scripts**

Keep Next.js 16.3.0, update React/RSC to the fixed 19.2.8 patch, and install:

```bash
NPM_CONFIG_CACHE=/tmp/mfv-sites-adapter-npm-cache npm install --save-exact \
  react@19.2.8 react-dom@19.2.8
NPM_CONFIG_CACHE=/tmp/mfv-sites-adapter-npm-cache npm install --save-dev --save-exact \
  @cloudflare/vite-plugin@1.51.1 \
  @vitejs/plugin-react@6.0.2 \
  @vitejs/plugin-rsc@0.5.26 \
  react-server-dom-webpack@19.2.8 \
  vinext@0.0.50 \
  vite@8.2.1 \
  wrangler@4.120.0
```

Define these package scripts:

```json
{
  "install:ci": "bash scripts/install-ci.sh",
  "dev": "WRANGLER_LOG_PATH=.wrangler/wrangler.log vite",
  "dev:next": "next dev",
  "prebuild": "npm run world",
  "build": "bash scripts/build-sites-verified.sh",
  "build:next": "npm run world && next build",
  "start": "WRANGLER_LOG_PATH=.wrangler/wrangler.log vinext start",
  "start:next": "next start",
  "test": "npm run test:next && npm run test:sites",
  "test:next": "npm run build:next && node --test tests/rendered-html.test.mjs",
  "test:sites": "npm run build && node --test tests/sites-rendered-html.test.mjs",
  "lint": "eslint . --ignore-pattern dist --ignore-pattern .next --ignore-pattern out --ignore-pattern .netlify --ignore-pattern .sites-runtime --ignore-pattern .wrangler",
  "world": "node scripts/extract-world.mjs"
}
```

- [ ] **Step 7: Ignore generated Sites state**

Add only these missing entries to `.gitignore`:

```gitignore
/.sites-runtime/
/.wrangler/
/dist/
```

- [ ] **Step 8: Run the Sites test to verify GREEN**

Run:

```bash
npm run test:sites
```

Expected: `vinext build` and artifact validation exit 0, followed by one
passing Worker render test.

- [ ] **Step 9: Run adapter static checks**

Run:

```bash
npm run lint
npx tsc --noEmit
```

Expected: both commands exit 0 without errors.

- [ ] **Step 10: Commit the adapter**

```bash
git add .openai/hosting.json vite.config.ts worker/index.ts \
  build/sites-vite-plugin.ts scripts/sites-env.sh scripts/install-ci.sh \
  scripts/build-sites-verified.sh scripts/validate-sites-artifact.sh \
  package.json package-lock.json .gitignore
git commit -m "feat: add Sites deployment adapter"
```

### Task 3: Preserve and document the Next/Netlify target

**Files:**
- Modify: `netlify.toml`
- Modify: `README.md`

**Interfaces:**
- Consumes: `build:next`, existing `out/` render contract
- Produces: unchanged Netlify static publication and documented target commands

- [ ] **Step 1: Route Netlify to the explicit static build**

Change only the build command in `netlify.toml`:

```toml
[build]
  command = "npm run build:next"
  publish = "out"
```

- [ ] **Step 2: Document both build targets**

In `README.md`, retain the existing project description and add a short
deployment section listing:

```bash
npm run dev:next
npm run build:next
npm run test:next
npm run dev
npm run build
npm run test:sites
npm test
```

Explain that Netlify publishes `out/`, Sites packages `dist/`, and the
application/story source is shared.

- [ ] **Step 3: Verify the static target**

Run:

```bash
npm run test:next
```

Expected: Next.js emits `out/index.html` and all four existing tests pass.

- [ ] **Step 4: Verify Netlify's configured command**

Run:

```bash
npm run build:next
test -f out/index.html
```

Expected: both commands exit 0.

- [ ] **Step 5: Commit the preserved static target**

```bash
git add netlify.toml README.md
git commit -m "docs: separate Sites and Netlify builds"
```

### Task 4: Run the full clean-install verification

**Files:**
- Verify only

**Interfaces:**
- Consumes: complete dual-target tree
- Produces: evidence for code review and the Draft PR

- [ ] **Step 1: Reinstall exactly from the lockfile**

Run:

```bash
NPM_CONFIG_CACHE=/tmp/mfv-sites-adapter-npm-cache npm ci
```

Expected: exit 0 with the locked dependency tree installed.

- [ ] **Step 2: Verify canonical story integrity**

Run:

```bash
echo "14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d  public/amfv-r79-s851122.z4" |
  sha256sum --check --strict
```

Expected: `public/amfv-r79-s851122.z4: OK`.

- [ ] **Step 3: Run all repository checks**

Run:

```bash
npm run lint
npx tsc --noEmit
npm test
```

Expected: lint and TypeScript exit 0; the Next suite passes four tests and the
Sites suite passes one test.

- [ ] **Step 4: Inspect the final scope**

Run:

```bash
git diff --check origin/codex/modern-amfv...HEAD
git status -sb
git diff --stat origin/codex/modern-amfv...HEAD
```

Expected: no whitespace errors, no uncommitted implementation files, no changes
under `app/`, `public/`, `source/`, `next.config.ts`, or
`tests/rendered-html.test.mjs`.

- [ ] **Step 5: Request code review**

Dispatch a reviewer with:

- description: dual-target Next/Netlify and ChatGPT Sites adapter;
- requirements: this plan and
  `docs/superpowers/specs/2026-08-10-sites-adapter-design.md`;
- base SHA: `9fcf94d4674c6a8de036b8f72c253ab4c63992f5`;
- head SHA: current `HEAD`.

Fix every Critical or Important finding, rerun the affected verification, and
commit the repair before publishing.

- [ ] **Step 6: Publish a Draft PR**

Push `agent/add-sites-adapter` and create a Draft PR targeting
`codex/modern-amfv`. The PR body must summarize the two build targets, list
the excluded starter capabilities, state that Site access and live deployment
were not changed, and include the fresh verification results.
