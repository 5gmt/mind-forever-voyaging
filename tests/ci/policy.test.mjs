import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { classifyPaths, detectScope, assertGate } from "../../scripts/ci-scope.mjs";
import { assertPartition, filtersForGroup, groupForFile } from "../../scripts/ci-e2e.mjs";

test("historical documentation PRs are light; runtime contracts and fixtures remain full", () => {
  assert.equal(classifyPaths(["AGENTS.md", "PROJECT_STATUS.md", "docs/plans/2041-cinema-fieldwork.md"]), "docs"); // #111
  assert.equal(classifyPaths(["docs/cinema-recording-a-design.md", "docs/plans/2041-cinema-fieldwork.md", "PROJECT_STATUS.md"]), "docs"); // #113
  assert.equal(classifyPaths(["scripts/capture-cinema-runtime.mjs", "tests/fixtures/parchment-cinema-runtime-observed.json", "tests/rendered-html.test.mjs"]), "full"); // #112
  assert.equal(classifyPaths(["app/localization.ts", "tests/e2e/church-fieldwork.spec.ts", "docs/church-copy-packet.md"]), "full"); // #107
  for (const path of ["docs/church-copy-packet.md", "docs/power-station-copy-packet.md", "docs/new-contract.md", ".github/workflows/ci.yml", "playwright.config.ts", "package-lock.json", "scripts/ci-scope.mjs"]) {
    assert.equal(classifyPaths(["README.md", path]), "full", path);
  }
  assert.equal(classifyPaths(["README.md", "tests/rendered-html.test.mjs", "scripts/capture-cinema-runtime.mjs"]), "verify");
  assert.equal(classifyPaths([]), "full");
});

test("Git comparison covers the entire PR, push range, deletion and rename", t => {
  const cwd = mkdtempSync(join(tmpdir(), "amfv-ci-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
  git("init", "--quiet");
  git("config", "user.email", "ci@example.invalid");
  git("config", "user.name", "CI test");
  mkdirSync(join(cwd, "docs"));
  writeFileSync(join(cwd, "README.md"), "baseline\n");
  writeFileSync(join(cwd, "docs/church-copy-packet.md"), "contract\n");
  git("add", "."); git("commit", "--quiet", "-m", "baseline");
  const base = git("rev-parse", "HEAD");
  git("mv", "docs/church-copy-packet.md", "docs/church-runtime-evidence.md");
  git("commit", "--quiet", "-m", "rename contract to documentation");
  const previous = git("rev-parse", "HEAD");
  writeFileSync(join(cwd, "README.md"), "last commit is docs only\n");
  git("add", "."); git("commit", "--quiet", "-m", "docs");
  const head = git("rev-parse", "HEAD");
  const pr = detectScope("pull_request", { pull_request: { base: { sha: base }, head: { sha: head } } }, cwd);
  assert.equal(pr.scope, "full");
  assert.ok(pr.paths.includes("docs/church-copy-packet.md"));
  assert.ok(pr.paths.includes("docs/church-runtime-evidence.md"));
  assert.equal(detectScope("push", { before: previous, after: head }, cwd).scope, "docs");
  assert.equal(detectScope("push", { before: base, after: head }, cwd).scope, "full");
  assert.equal(detectScope("push", { before: "0".repeat(40), after: head }, cwd).scope, "full");
  assert.equal(detectScope("push", { before: "1".repeat(40), after: head }, cwd).scope, "full");
});

test("manual runs force full; unknown events cannot silently skip", () => {
  assert.equal(detectScope("workflow_dispatch", {}).scope, "full");
  assert.equal(detectScope("pull_request", {}).scope, "full");
  assert.throws(() => detectScope("unexpected", {}));
});

test("gate rejects failures, cancellation, missing results and unexpected skips", () => {
  for (const [scope, expected] of Object.entries({
    docs: { changes: "success", verify: "skipped", "browser-e2e": "skipped" },
    verify: { changes: "success", verify: "success", "browser-e2e": "skipped" },
    full: { changes: "success", verify: "success", "browser-e2e": "success" },
  })) {
    assert.doesNotThrow(() => assertGate(scope, expected));
    for (const job of Object.keys(expected)) for (const bad of ["failure", "cancelled", undefined, expected[job] === "success" ? "skipped" : "success"]) {
      assert.throws(() => assertGate(scope, { ...expected, [job]: bad }), `${scope} / ${job} / ${bad}`);
    }
  }
  assert.throws(() => assertGate("", {}));
});

test("partition covers each test once and includes newly added specs", () => {
  assert.equal(groupForFile("church-fieldwork.spec.ts"), "church");
  assert.equal(groupForFile("power-station-fieldwork.spec.ts"), "power");
  assert.equal(groupForFile("new-cinema.spec.ts"), "remaining");
  const filters = filtersForGroup(["church-fieldwork.spec.ts", "power-station-fieldwork.spec.ts", "nested/new.spec.ts"], "remaining");
  assert.ok(new RegExp(filters[0]).test("/checkout/tests/e2e/nested/new.spec.ts"));
  assert.ok(!new RegExp(filters[0]).test("/checkout/tests/e2e/nested/newXspec.ts"));
  assert.throws(() => filtersForGroup([], "remaining"));
  assert.throws(() => filtersForGroup(["new.spec.ts"], "unknown"));
  const all = [{ id: "a" }, { id: "b" }];
  assert.doesNotThrow(() => assertPartition(all, [[all[0]], [all[1]]]));
  assert.throws(() => assertPartition(all, [[all[0]]]));
  assert.throws(() => assertPartition(all, [[all[0]], [all[0]], [all[1]]]));
});
