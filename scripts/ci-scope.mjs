import { appendFileSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// Explanatory Markdown grows with milestones; maintain executable inputs instead.
const rootDocumentation = new Set([
  "AGENTS.md", "CLAUDE.md", "PROJECT_CHARTER.md", "PROJECT_STATUS.md", "README.md", "THIRD_PARTY_NOTICES.md",
]);

export function isExecutableDocument(path) {
  return /^docs\/(?:.*\/)?[^/]*copy-packet\.md$/.test(path) || path.startsWith("docs/test-inputs/");
}

function isDocumentation(path) {
  return rootDocumentation.has(path) || /^docs\/.+\.md$/.test(path);
}

export function classifyPaths(paths) {
  if (!paths.length) return "full";
  let scope = "docs";
  for (const path of paths) {
    if (isExecutableDocument(path)) return "full";
    if (isDocumentation(path)) continue;
    if (path === "tests/rendered-html.test.mjs" || /^scripts\/capture-[a-z0-9-]+\.mjs$/.test(path)) {
      scope = "verify";
    } else {
      return "full";
    }
  }
  return scope;
}

export function detectScope(eventName, event, cwd = process.cwd()) {
  if (eventName === "workflow_dispatch") return { scope: "full", paths: [], reason: "manual full acceptance" };
  let base, head, range;
  if (eventName === "pull_request") {
    base = event.pull_request?.base?.sha;
    head = event.pull_request?.head?.sha;
    range = "..."; // Entire PR, not just the latest commit.
  } else if (eventName === "push") {
    base = event.before;
    head = event.after;
    range = "..";
  } else {
    throw new Error(`Unsupported event: ${eventName}`);
  }
  if (![base, head].every(sha => /^[a-f0-9]{40}$/.test(sha ?? "") && !/^0+$/.test(sha))) {
    return { scope: "full", paths: [], reason: "missing comparison commit" };
  }
  let output;
  try {
    // Disabling rename detection preserves BOTH old and new paths, including deletions.
    output = execFileSync("git", ["diff", "--name-only", "--no-renames", "-z", `${base}${range}${head}`, "--"],
      { cwd, encoding: "utf8", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
  } catch {
    return { scope: "full", paths: [], reason: "comparison unavailable" };
  }
  const paths = output.split("\0").filter(Boolean);
  return { scope: classifyPaths(paths), paths, reason: `${eventName} comparison` };
}

export function assertGate(scope, results, mode = "full") {
  if (!["fast", "full"].includes(mode)) throw new Error(`Invalid CI mode: ${mode}`);
  const expected = {
    docs: { changes: "success", verify: "skipped", "browser-e2e": "skipped" },
    verify: { changes: "success", verify: "success", "browser-e2e": "skipped" },
    full: { changes: "success", verify: "success", "browser-e2e": mode === "full" ? "success" : "skipped" },
  }[scope];
  if (!expected) throw new Error(`Invalid CI scope: ${scope}`);
  for (const [job, result] of Object.entries(expected)) {
    if (results[job] !== result) throw new Error(`${job}: expected ${result}, received ${results[job]}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv[2] === "gate") {
    assertGate(process.env.CI_SCOPE, {
      changes: process.env.CHANGES_RESULT,
      verify: process.env.VERIFY_RESULT,
      "browser-e2e": process.env.E2E_RESULT,
    }, process.env.CI_MODE ?? "full");
    const pending = process.env.CI_MODE === "fast" && process.env.CI_SCOPE === "full";
    const summary = pending
      ? "Fast checks passed. FULL CI REQUIRED: reviewer must dispatch CI for the final head/base before merge."
      : `CI ${process.env.CI_MODE ?? "full"} checks passed: ${process.env.CI_SCOPE}`;
    console.log(summary);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
  } else {
    const result = detectScope(process.env.GITHUB_EVENT_NAME, JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")));
    console.log(JSON.stringify(result, null, 2));
    appendFileSync(process.env.GITHUB_OUTPUT, `scope=${result.scope}\n`);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      `CI scope: **${result.scope}** (${result.paths.length} changed paths; ${result.reason}).\n`);
  }
}
