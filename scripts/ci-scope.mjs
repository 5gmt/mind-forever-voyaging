import { appendFileSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// These files have no runtime/build/test consumers. New paths default to full.
const documentation = new Set([
  "AGENTS.md", "CLAUDE.md", "PROJECT_CHARTER.md", "PROJECT_STATUS.md", "README.md", "THIRD_PARTY_NOTICES.md",
  "docs/church-fieldwork-acceptance.md", "docs/church-runtime-evidence.md",
  "docs/cinema-recording-a-design.md", "docs/cinema-runtime-evidence.md",
  "docs/city-hall-fieldwork-acceptance.md", "docs/city-hall-runtime-evidence.md",
  "docs/issue-29-next-milestone-design.md", "docs/issue-47-first-simulation-runtime-evidence.md",
  "docs/issue-48-narrow-projections.md", "docs/issue-55-courthouse-runtime-evidence.md",
  "docs/issue-67-fieldwork-acceptance.md", "docs/localization-boundary.md",
  "docs/newspaper-runtime-evidence.md", "docs/option-2b-prototype.md",
  "docs/plans/2041-church-fieldwork.md", "docs/plans/2041-cinema-fieldwork.md",
  "docs/plans/2041-city-hall-fieldwork.md", "docs/plans/2041-newspaper-fieldwork.md",
  "docs/plans/2041-power-station-fieldwork.md", "docs/plans/2041-restaurant-fieldwork.md",
  "docs/plans/2041-restaurant-followup-decision.md",
  "docs/power-station-fieldwork-acceptance.md", "docs/power-station-runtime-evidence.md",
  "docs/restaurant-fieldwork-acceptance.md", "docs/restaurant-recording-a-evidence.md",
  "docs/restaurant-runtime-evidence.md", "docs/ci-operation.md",
]);

export function classifyPaths(paths) {
  if (!paths.length) return "full";
  let scope = "docs";
  for (const path of paths) {
    if (documentation.has(path)) continue;
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

export function assertGate(scope, results) {
  const expected = {
    docs: { changes: "success", verify: "skipped", "browser-e2e": "skipped" },
    verify: { changes: "success", verify: "success", "browser-e2e": "skipped" },
    full: { changes: "success", verify: "success", "browser-e2e": "success" },
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
    });
    console.log(`CI accepted: ${process.env.CI_SCOPE}`);
  } else {
    const result = detectScope(process.env.GITHUB_EVENT_NAME, JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")));
    console.log(JSON.stringify(result, null, 2));
    appendFileSync(process.env.GITHUB_OUTPUT, `scope=${result.scope}\n`);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      `CI scope: **${result.scope}** (${result.paths.length} changed paths; ${result.reason}).\n`);
  }
}
