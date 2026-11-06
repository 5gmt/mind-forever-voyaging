#!/usr/bin/env bash
set -euo pipefail

# Fixed official release and checksum; no project dependency or mutable action tag.
actionlint_dir="$(mktemp -d)"
trap 'rm -rf "$actionlint_dir"' EXIT
curl --fail --silent --show-error --location --retry 2 \
  https://github.com/rhysd/actionlint/releases/download/v1.7.7/actionlint_1.7.7_linux_amd64.tar.gz \
  --output "$actionlint_dir/actionlint.tar.gz"
echo "023070a287cd8cccd71515fedc843f1985bf96c436b7effaecce67290e7e0757  $actionlint_dir/actionlint.tar.gz" | sha256sum --check --strict
tar -xzf "$actionlint_dir/actionlint.tar.gz" -C "$actionlint_dir" actionlint
"$actionlint_dir/actionlint" -color
