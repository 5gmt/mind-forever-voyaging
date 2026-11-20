import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { evaluateRun, fullRunTitle, latestRun } from "../../scripts/ci-readiness.mjs";
import { assertReviewedRef, checkReviewedRef } from "../../scripts/ci-reviewed-ref.mjs";
import { classifyPaths } from "../../scripts/ci-scope.mjs";

const head = "a".repeat(40), base = "b".repeat(40), other = "c".repeat(40);
const options = { head, base, scope: "full", full: true, prNumber: 120 };
const run = {
  head_sha: head, path: ".github/workflows/ci.yml", event: "workflow_dispatch",
  display_title: fullRunTitle(head, base), status: "completed", conclusion: "success",
  run_attempt: 2, html_url: "https://github.com/5gmt/mind-forever-voyaging/actions/runs/1",
};
const jobs = ["changes", "verify", "browser-e2e (church)", "browser-e2e (power)", "browser-e2e (remaining)",
  "browser-e2e (cinema-desktop)", "browser-e2e (cinema-narrow)", "ci-gate"]
  .map(name => ({ name, conclusion: "success", run_attempt: 2 }));

test("Full acceptance requires the current head/base, dispatch and entire successful attempt", () => {
  assert.equal(evaluateRun(run, jobs, options).ready, true);
  assert.equal(evaluateRun(undefined, [], options).ready, false);
  for (const change of [
    { head_sha: other }, { path: ".github/workflows/ci-fast.yml" }, { event: "pull_request" },
    { display_title: fullRunTitle(head, other) }, { display_title: "legacy CI" },
    { status: "queued", conclusion: null }, { status: "in_progress", conclusion: null },
    { conclusion: "cancelled" }, { conclusion: "failure" }, { conclusion: "skipped" }, { run_attempt: 3 },
  ]) assert.equal(evaluateRun({ ...run, ...change }, jobs, options).ready, false, JSON.stringify(change));
  assert.equal(evaluateRun(run, jobs.slice(1), options).ready, false);
  assert.equal(evaluateRun(run, [...jobs, jobs[0]], options).ready, false);
  assert.equal(evaluateRun(run, jobs.map((j, i) => i === 1 ? jobs[0] : j), options).ready, false);
  for (let i = 0; i < jobs.length; i++) for (const conclusion of ["failure", "cancelled", "skipped", undefined]) {
    assert.equal(evaluateRun(run, jobs.map((j, n) => n === i ? { ...j, conclusion } : j), options).ready, false);
  }
  assert.equal(evaluateRun(run, jobs.map((j, i) => i === 4 ? { ...j, run_attempt: 1 } : j), options).ready, false);
});

test("a later failure or pending rerun cannot fall back to an older successful run", () => {
  const earlier = { ...run, id: 20, run_started_at: "2026-11-20T01:00:00Z" };
  const later = { ...run, id: 21, conclusion: "failure", run_started_at: "2026-11-20T02:00:00Z" };
  assert.equal(evaluateRun(latestRun([earlier, later]), jobs, options).ready, false);
  const rerun = { ...earlier, run_attempt: 3, status: "in_progress", run_started_at: "2026-11-20T03:00:00Z" };
  assert.equal(latestRun([later, rerun]).id, 20);
  assert.equal(evaluateRun(latestRun([later, rerun]), jobs, options).ready, false);
});

test("Docs and Verify use fast evidence from this PR and base, never as Full evidence", () => {
  const fast = { ...run, path: ".github/workflows/ci-fast.yml", event: "pull_request",
    pull_requests: [{ number: 120, base: { sha: base }, head: { sha: head } }] };
  for (const scope of ["docs", "verify"]) {
    const fastJobs = [jobs[0], { ...jobs[1], conclusion: scope === "docs" ? "skipped" : "success" }, { ...jobs[0], name: "ci-fast-gate" }];
    assert.equal(evaluateRun(fast, fastJobs, { ...options, scope, full: false }).ready, true);
    assert.equal(evaluateRun(fast, fastJobs, { ...options, scope, full: true }).ready, false);
    assert.equal(evaluateRun(fast, fastJobs, { ...options, scope: "full", full: false }).ready, false);
    assert.equal(evaluateRun({ ...fast, pull_requests: [] }, fastJobs, { ...options, scope, full: false }).ready, false);
    assert.equal(evaluateRun(fast, fastJobs, { ...options, scope, full: false, base: other }).ready, false);
  }
});

test("review guard rejects missing SHAs, wrong events, changed refs and outdated base", () => {
  const valid = { event: "workflow_dispatch", head, base, checkout: head, currentHead: head, currentBase: base, includesBase: true };
  assert.doesNotThrow(() => assertReviewedRef(valid));
  for (const change of [{ head: "main" }, { base: "" }, { head: "0".repeat(40) }, { event: "push" },
    { checkout: other }, { currentHead: other }, { currentBase: other }, { includesBase: false }]) {
    assert.throws(() => assertReviewedRef({ ...valid, ...change }));
  }
});

test("review guard observes real remote branch movement before accepting", t => {
  const cwd = mkdtempSync(join(tmpdir(), "amfv-reviewed-ref-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  git("init", "--quiet", "--initial-branch=codex/modern-amfv");
  git("config", "user.name", "CI test"); git("config", "user.email", "ci@example.invalid");
  writeFileSync(join(cwd, "README.md"), "base\n"); git("add", "."); git("commit", "--quiet", "-m", "base");
  const originalBase = git("rev-parse", "HEAD");
  git("switch", "--quiet", "-c", "reviewed");
  writeFileSync(join(cwd, "README.md"), "head\n"); git("commit", "--quiet", "-am", "head");
  const originalHead = git("rev-parse", "HEAD"), remote = join(cwd, "remote.git");
  git("clone", "--quiet", "--bare", ".", remote); git("remote", "add", "origin", remote);
  const env = { GITHUB_EVENT_NAME: "workflow_dispatch", GITHUB_REF: "refs/heads/reviewed", REVIEWED_HEAD: originalHead, REVIEWED_BASE: originalBase };
  assert.doesNotThrow(() => checkReviewedRef(env, cwd));
  git("--git-dir", remote, "update-ref", "refs/heads/reviewed", originalBase);
  assert.throws(() => checkReviewedRef(env, cwd), /head changed/);
  git("--git-dir", remote, "update-ref", "refs/heads/reviewed", originalHead);
  git("--git-dir", remote, "update-ref", "refs/heads/codex/modern-amfv", originalHead);
  assert.throws(() => checkReviewedRef(env, cwd), /Base changed/);
});

test("documents currently read by unit/E2E tests are heavy inputs", () => {
  const consumers = execFileSync("git", ["ls-files", "app", "scripts", "tests"], { encoding: "utf8" }).trim().split("\n");
  const inputs = new Set();
  for (const file of consumers.filter(f => /\.(?:mjs|tsx?)$/.test(f))) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(/new URL\("(?:\.\.\/)+docs\/([^"\n]+)"/g)) inputs.add(`docs/${match[1]}`);
  }
  assert.ok(inputs.size >= 3);
  for (const input of inputs) assert.equal(classifyPaths([input]), "full", `${input} has a test/code consumer`);
});
