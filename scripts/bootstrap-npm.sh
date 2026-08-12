#!/usr/bin/env bash
set -euo pipefail

npm_version="${NPM_BOOTSTRAP_VERSION:-11.17.0}"
bootstrap_dir="$(mktemp -d)"
trap 'rm -rf "$bootstrap_dir"' EXIT

echo "Bootstrapping npm ${npm_version} outside the repository..."
(
  cd "$bootstrap_dir"
  npm install --global "npm@${npm_version}"
)

hash -r
actual_version="$(npm --version)"
if [[ "$actual_version" != "$npm_version" ]]; then
  echo "Expected npm ${npm_version} after bootstrap, found ${actual_version}." >&2
  exit 1
fi

echo "npm ${actual_version} is ready."
