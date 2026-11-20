import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const targetBranch = "codex/modern-amfv";
export const isSha = value => /^[a-f0-9]{40}$/.test(value ?? "") && !/^0+$/.test(value);

export function assertReviewedRef({ event, head, base, checkout, currentHead, currentBase, includesBase }) {
  if (event !== "workflow_dispatch") throw new Error("Full CI requires reviewer dispatch");
  if (!isSha(head) || !isSha(base)) throw new Error("Review requires full head_sha and base_sha");
  if (checkout !== head || currentHead !== head) throw new Error("Reviewed head changed; dispatch the current PR head");
  if (currentBase !== base || !includesBase) throw new Error("Base changed or is not included; update and review the branch first");
}

export function checkReviewedRef(env = process.env, cwd = process.cwd()) {
  const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
  if (!isSha(env.REVIEWED_HEAD) || !isSha(env.REVIEWED_BASE)) throw new Error("Invalid reviewed SHA");
  if (!env.GITHUB_REF?.startsWith("refs/heads/")) throw new Error("Select the reviewed PR branch, not a tag");
  const remote = ref => git("ls-remote", "--exit-code", "origin", ref).split(/\s+/)[0];
  let includesBase = false;
  try { git("merge-base", "--is-ancestor", env.REVIEWED_BASE, env.REVIEWED_HEAD); includesBase = true; }
  catch { /* Missing ancestry is not acceptance. */ }
  assertReviewedRef({
    event: env.GITHUB_EVENT_NAME, head: env.REVIEWED_HEAD, base: env.REVIEWED_BASE,
    checkout: git("rev-parse", "HEAD"), currentHead: remote(env.GITHUB_REF),
    currentBase: remote(`refs/heads/${targetBranch}`), includesBase,
  });
  console.log(`Reviewed head ${env.REVIEWED_HEAD}, current base ${env.REVIEWED_BASE}: verified`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) checkReviewedRef();
