import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("static export renders the finished unabridged edition", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>A Mind Forever Voyaging \| Unabridged Modern Edition<\/title>/i);
  assert.match(html, /Original text and story flow preserved/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview|react-loading-skeleton/i);
});

test("ships canonical Release 79 plus an isolated Release 900 QA story", async () => {
  const [story, debugStory, player, bridge, overrides] = await Promise.all([
    readFile(new URL("../public/amfv-r79-s851122.z4", import.meta.url)),
    readFile(new URL("../public/amfv-modern-debug.z4", import.meta.url)),
    readFile(new URL("../public/player.html", import.meta.url), "utf8"),
    readFile(new URL("../public/player-bridge.js", import.meta.url), "utf8"),
    readFile(new URL("../public/player-overrides.css", import.meta.url), "utf8"),
  ]);

  assert.equal(story[0], 4, "story must be Z-machine version 4");
  assert.equal((story[2] << 8) | story[3], 79);
  assert.equal(story.subarray(18, 24).toString("ascii"), "851122");
  assert.equal(createHash("sha256").update(story).digest("hex"), "14e2fd1872c9487e2ca51a7975590358f5ca42a4b439abc39c60b6653511216d");
  assert.equal(debugStory[0], 4);
  assert.equal((debugStory[2] << 8) | debugStory[3], 900);
  assert.equal(debugStory.subarray(18, 24).toString("ascii"), "260808");
  assert.match(player, /"url": "\/amfv-r79-s851122\.z4"/);
  assert.match(player, /"url": "\/amfv-modern-debug\.z4"/);
  assert.match(player, /"play_in_iframe": 1/);
  assert.match(player, /"do_vm_autosave": qaBuild \? 0 : 1/);
  assert.match(bridge, /amfv:bridge/);
  assert.match(bridge, /inputKind/);
  assert.match(overrides, /--glkote-buffer-bg/);
});

test("preserves the historical source and derives modern context from it", async () => {
  const sourceFiles = (await readdir(new URL("../source/", import.meta.url))).filter((file) => file.endsWith(".zil"));
  const [world, shell] = await Promise.all([
    readFile(new URL("../app/world-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/PrismEdition.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal(sourceFiles.length, 10);
  assert.match(world, /export const WORLD_ROOMS/);
  assert.match(world, /"name": "Rockvil Centre"/);
  assert.match(shell, /The work, intact\./);
  assert.match(shell, /Spoiler-safe assistance/);
  assert.match(shell, /Recovered physical decoder/);
  assert.match(shell, /Fast-forward console/);
  assert.match(shell, /canonicalIframeRef/);
  assert.match(shell, /qaIframeRef/);
  assert.doesNotMatch(shell, /You are PRISM, the world’s first sentient computer/);
  assert.match(shell, /Historical content note/);
  assert.match(shell, /aria-live="polite"/);
});
