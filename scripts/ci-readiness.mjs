import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { classifyPaths } from "./ci-scope.mjs";
import { groups } from "./ci-e2e.mjs";
import { isSha, targetBranch } from "./ci-reviewed-ref.mjs";

const repository = "5gmt/mind-forever-voyaging";
export const fullRunTitle = (head, base) => `Full CI ${head} / ${base}`;

export function evaluateRun(run, jobs, { head, base, scope, full, prNumber }) {
  const pending = reason => ({ ready: false, reason });
  if (!["docs", "verify", "full"].includes(scope) || (scope === "full" && !full)) return pending("Full changes cannot use fast acceptance");
  if (!run) return pending(full ? "Full CI required: reviewer dispatch pending" : "Fast CI has not run");
  const file = full ? "ci.yml" : "ci-fast.yml";
  if (run.head_sha !== head || run.path !== `.github/workflows/${file}` ||
      run.event !== (full ? "workflow_dispatch" : "pull_request")) return pending("Run does not match the required workflow/head/event");
  if (full ? run.display_title !== fullRunTitle(head, base) :
    !run.pull_requests?.some(pr => pr.number === prNumber && pr.base?.sha === base && pr.head?.sha === head)) {
    return pending("Run does not match the current reviewed base/head");
  }
  if (run.status !== "completed" || run.conclusion !== "success") return pending(`CI ${run.status}: ${run.conclusion ?? "pending"}`);
  const expected = full
    ? { changes: "success", verify: "success", ...Object.fromEntries(groups.map(g => [`browser-e2e (${g})`, "success"])), "ci-gate": "success" }
    : { changes: "success", verify: scope === "docs" ? "skipped" : "success", "ci-fast-gate": "success" };
  if (!Number.isInteger(run.run_attempt) || run.run_attempt < 1 || jobs.length !== Object.keys(expected).length ||
      new Set(jobs.map(j => j.name)).size !== jobs.length ||
      jobs.some(j => j.run_attempt !== run.run_attempt || expected[j.name] !== j.conclusion)) {
    return pending("Missing, duplicated, skipped, failed or mixed-attempt jobs");
  }
  return { ready: true, reason: full ? "Full CI passed for the reviewed head/base" : `Fast CI passed; ${scope} changes require no Full CI`, run: run.html_url, attempt: run.run_attempt };
}

export function latestRun(runs) {
  // Rerunning an older run must not be mistaken for an older attempt.
  return [...runs].sort((a, b) => (Date.parse(b.run_started_at) - Date.parse(a.run_started_at)) || b.id - a.id)[0];
}

async function request(path) {
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, {
    headers: { Accept: "application/vnd.github+json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  if (!response.ok) throw new Error(`GitHub GET ${path}: ${response.status}`);
  return response.json();
}

async function pages(path, key) {
  const result = [];
  for (let page = 1; page <= 10; page++) {
    const response = await request(`${path}${path.includes("?") ? "&" : "?"}per_page=100&page=${page}`);
    if (!Array.isArray(response[key])) throw new Error(`Missing ${key} in GitHub response`);
    result.push(...response[key]);
    if (result.length >= response.total_count) return result;
    if (!response[key].length) throw new Error("Incomplete GitHub pagination");
  }
  throw new Error("More than 1,000 results; inspect the current runs explicitly");
}

export async function checkReadiness(prNumber, forceFull = false, cwd = process.cwd()) {
  if (!/^[1-9][0-9]*$/.test(String(prNumber))) throw new Error("Use --pr NUMBER [--full]");
  const pr = await request(`pulls/${prNumber}`);
  if (pr.state !== "open" || pr.base.ref !== targetBranch || !isSha(pr.head.sha) || !isSha(pr.base.sha)) {
    throw new Error("Expected an open PR targeting codex/modern-amfv");
  }
  const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  if (![`https://github.com/${repository}`, `https://github.com/${repository}.git`, `git@github.com:${repository}.git`].includes(git("remote", "get-url", "origin"))) {
    throw new Error("Run from the matching repository checkout");
  }
  git("fetch", "--no-tags", "origin", pr.base.sha, pr.head.sha);
  git("merge-base", "--is-ancestor", pr.base.sha, pr.head.sha);
  const paths = git("diff", "--name-only", "--no-renames", "-z", `${pr.base.sha}...${pr.head.sha}`, "--").split("\0").filter(Boolean);
  const scope = classifyPaths(paths), full = forceFull || scope === "full";
  const file = full ? "ci.yml" : "ci-fast.yml";
  const runs = await pages(`actions/workflows/${file}/runs?head_sha=${pr.head.sha}&event=${full ? "workflow_dispatch" : "pull_request"}`, "workflow_runs");
  const run = latestRun(runs);
  const jobs = run?.status === "completed"
    ? await pages(`actions/runs/${run.id}/attempts/${run.run_attempt}/jobs`, "jobs") : [];
  const result = evaluateRun(run, jobs, { head: pr.head.sha, base: pr.base.sha, scope, full, prNumber: Number(prNumber) });
  // Re-read after fetching evidence; a push or base advance invalidates this assessment.
  const current = await request(`pulls/${prNumber}`);
  if (current.state !== "open" || current.head.sha !== pr.head.sha || current.base.sha !== pr.base.sha || current.mergeable !== true) {
    return { ready: false, reason: "PR changed or mergeability is not confirmed; recheck", head: current.head.sha, base: current.base.sha };
  }
  return { ...result, scope, head: pr.head.sha, base: pr.base.sha, pr: pr.html_url };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    if (args[0] !== "--pr" || args.length < 2 || args.length > 3 || (args[2] && args[2] !== "--full")) throw new Error("Use --pr NUMBER [--full]");
    const result = await checkReadiness(args[1], args[2] === "--full");
    console.log(JSON.stringify(result, null, 2));
    if (!result.ready) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
