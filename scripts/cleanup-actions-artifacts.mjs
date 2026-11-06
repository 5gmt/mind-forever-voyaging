import { appendFileSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export function validateManifest(manifest) {
  if (manifest.repository !== "5gmt/mind-forever-voyaging" || !Array.isArray(manifest.artifacts) || !manifest.artifacts.length) {
    throw new Error("Invalid cleanup manifest");
  }
  const seen = new Set();
  for (const artifact of manifest.artifacts) {
    if (!Number.isSafeInteger(artifact.id) || artifact.id <= 0 || seen.has(artifact.id) || manifest.protected_ids?.includes(artifact.id)
      || artifact.name !== "playwright-test-results" || !Number.isSafeInteger(artifact.run_id)
      || !Number.isSafeInteger(artifact.size_in_bytes) || !/^sha256:[a-f0-9]{64}$/.test(artifact.digest)) {
      throw new Error(`Invalid or protected artifact: ${artifact.id}`);
    }
    seen.add(artifact.id);
  }
}

export function verifyArtifact(expected, actual) {
  if (actual.id !== expected.id || actual.name !== expected.name || actual.size_in_bytes !== expected.size_in_bytes
    || actual.digest !== expected.digest || actual.workflow_run?.id !== expected.run_id) {
    throw new Error(`Artifact metadata changed: ${expected.id}`);
  }
}

export async function cleanup(manifest, { apply = false, request }) {
  validateManifest(manifest);
  const candidates = [];
  // Validate every target before the first deletion. Never select targets by age or wildcard.
  for (const expected of manifest.artifacts) {
    const response = await request(expected.id, "GET");
    if (response.status === 404 || response.status === 410) continue;
    if (!response.ok) throw new Error(`Artifact ${expected.id}: HTTP ${response.status}`);
    const actual = await response.json();
    verifyArtifact(expected, actual);
    if (!actual.expired) candidates.push(expected);
  }
  const bytes = candidates.reduce((total, artifact) => total + artifact.size_in_bytes, 0);
  console.log(`${apply ? "Apply" : "Dry run"}: ${candidates.length} exact artifacts, ${bytes} bytes`);
  let deleted = 0;
  for (const artifact of candidates) {
    console.log(`${apply ? "Delete" : "Would delete"} ${artifact.id}, run ${artifact.run_id}, ${artifact.size_in_bytes} bytes`);
    if (apply) {
      const response = await request(artifact.id, "DELETE");
      if (response.status !== 204 && response.status !== 404 && response.status !== 410) {
        throw new Error(`Deletion stopped after ${deleted} artifacts: ${artifact.id} returned HTTP ${response.status}`);
      }
      deleted++;
    }
  }
  return { apply, eligible: candidates.length, deleted, bytes };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.slice(2).some(arg => arg !== "--apply")) throw new Error("Only --apply is supported");
  const manifest = JSON.parse(readFileSync(new URL("../.github/artifact-cleanup-2026-11-07.json", import.meta.url), "utf8"));
  if (process.env.GITHUB_REPOSITORY && process.env.GITHUB_REPOSITORY !== manifest.repository) throw new Error("Repository mismatch");
  const apply = process.argv.includes("--apply");
  if (apply && !process.env.GH_TOKEN) throw new Error("GH_TOKEN is required to apply cleanup");
  const result = await cleanup(manifest, {
    apply,
    request: (id, method) => fetch(`https://api.github.com/repos/${manifest.repository}/actions/artifacts/${id}`, {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(30_000),
    }),
  });
  console.log(JSON.stringify(result));
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    `${apply ? "Deleted" : "Would delete"} ${result.eligible} allowlisted artifacts (${result.bytes} bytes). Protected and newly created artifacts are not selected.\n`);
}
