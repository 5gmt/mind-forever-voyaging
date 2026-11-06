import assert from "node:assert/strict";
import test from "node:test";
import { cleanup, validateManifest, verifyArtifact } from "../../scripts/cleanup-actions-artifacts.mjs";

const artifact = { id: 1, run_id: 2, name: "playwright-test-results", size_in_bytes: 400, digest: `sha256:${"a".repeat(64)}` };
const manifest = { repository: "5gmt/mind-forever-voyaging", protected_ids: [3], artifacts: [artifact] };
const actual = { ...artifact, workflow_run: { id: 2 }, expired: false };

test("cleanup rejects duplicate/protected IDs and a different repository", () => {
  assert.doesNotThrow(() => validateManifest(manifest));
  assert.throws(() => validateManifest({ ...manifest, repository: "another/repository" }));
  assert.throws(() => validateManifest({ ...manifest, protected_ids: [1] }));
  assert.throws(() => validateManifest({ ...manifest, artifacts: [artifact, artifact] }));
  assert.throws(() => verifyArtifact(artifact, { ...actual, digest: `sha256:${"b".repeat(64)}` }));
  assert.throws(() => verifyArtifact(artifact, { ...actual, workflow_run: { id: 99 } }));
});

test("cleanup is read-only by default and deletes only exact validated IDs when applied", async () => {
  const calls = [];
  const request = async (id, method) => {
    calls.push([id, method]);
    return { ok: true, status: method === "GET" ? 200 : 204, json: async () => actual };
  };
  const dry = await cleanup(manifest, { request });
  assert.equal(dry.deleted, 0);
  assert.deepEqual(calls, [[1, "GET"]]);
  calls.length = 0;
  const result = await cleanup(manifest, { request, apply: true });
  assert.equal(result.deleted, 1);
  assert.deepEqual(calls, [[1, "GET"], [1, "DELETE"]]);
});

test("cleanup validates all candidates before deleting and tolerates already removed IDs", async () => {
  const calls = [];
  const request = async (id, method) => {
    calls.push([id, method]);
    return { ok: true, status: 200, json: async () => ({ ...actual, id, name: id === 4 ? "different-artifact" : actual.name }) };
  };
  await assert.rejects(cleanup({ ...manifest, artifacts: [artifact, { ...artifact, id: 4 }] }, { request, apply: true }));
  assert.ok(calls.every(([, method]) => method === "GET"));
  const removed = await cleanup(manifest, { apply: true, request: async () => ({ status: 404 }) });
  assert.equal(removed.deleted, 0);
});
