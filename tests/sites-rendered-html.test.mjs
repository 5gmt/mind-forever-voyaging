import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

test("Sites Worker renders the finished unabridged edition", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {},
    executionContext,
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

test("Sites Worker does not require undeclared image bindings", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request(
      "http://localhost/_vinext/image?url=%2Ficon.svg&w=16&q=75",
    ),
    {},
    executionContext,
  );

  assert.ok(response.status < 500);
});
