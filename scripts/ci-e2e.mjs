import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const groups = ["church", "power", "remaining", "cinema-desktop", "cinema-narrow"];
export function groupForFile(file) {
  if (file === "church-fieldwork.spec.ts") return "church";
  if (file === "power-station-fieldwork.spec.ts") return "power";
  if (file === "cinema-fieldwork.spec.ts") return "cinema-desktop";
  if (file === "cinema-narrow.spec.ts") return "cinema-narrow";
  return "remaining"; // Includes new files, so adding a spec cannot silently omit it.
}

function listTests(filters = []) {
  const report = JSON.parse(execFileSync(process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", "--list", "--reporter=json", ...filters],
    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }));
  if (report.errors?.length) throw new Error(JSON.stringify(report.errors));
  const specs = [];
  const visit = suite => {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests) specs.push({ id: `${spec.id}:${test.projectName}`, file: spec.file });
    }
    for (const child of suite.suites ?? []) visit(child);
  };
  for (const suite of report.suites) visit(suite);
  if (!specs.length) throw new Error("No browser tests found");
  return specs;
}

export function filtersForGroup(files, group) {
  if (!groups.includes(group)) throw new Error(`Unknown E2E group: ${group}`);
  const selected = [...new Set(files)].filter(file => groupForFile(file) === group);
  if (!selected.length) throw new Error(`Empty E2E group: ${group}`);
  return selected.map(file => `(^|/)${file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`);
}

export function assertPartition(all, partitions) {
  const ids = all.map(test => test.id).sort();
  const actual = partitions.flat().map(test => test.id).sort();
  if (new Set(ids).size !== ids.length || new Set(actual).size !== actual.length || JSON.stringify(ids) !== JSON.stringify(actual)) {
    throw new Error("E2E partition omits or duplicates tests");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const all = listTests();
  const files = all.map(test => test.file);
  if (process.argv[2] === "--check") {
    const partitions = groups.map(group => listTests(filtersForGroup(files, group)));
    assertPartition(all, partitions);
    const summary = groups.map((group, i) => `${group}: ${partitions[i].length}`).join(", ");
    console.log(`Browser partition covers all ${all.length} tests exactly once (${summary}).`);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}; total ${all.length}, no omissions or duplicates.\n`);
  } else {
    const filters = filtersForGroup(files, process.argv[2]);
    const result = spawnSync(process.execPath,
      [resolve("node_modules/@playwright/test/cli.js"), "test", ...filters], { stdio: "inherit" });
    if (result.error) throw result.error;
    process.exit(result.status ?? 1);
  }
}
