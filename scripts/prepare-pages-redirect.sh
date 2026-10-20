#!/usr/bin/env bash
# Build the GitHub Pages artifact: redirect HTML at the site root, 404 catch-all,
# and every former Astro HTML path. GitHub Pages cannot send HTTP 302/301.
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
template="$root/pages-redirect/index.html"
out="${1:-$root/pages-redirect-publish}"

if [[ ! -f "$template" ]]; then
  echo "missing redirect template: $template" >&2
  exit 1
fi

rm -rf "$out"
mkdir -p "$out"
cp "$template" "$out/index.html"
cp "$template" "$out/404.html"
touch "$out/.nojekyll"

if [[ -d "$root/dist" ]]; then
  while IFS= read -r -d '' f; do
    rel="${f#"$root/dist/"}"
    dest="$out/$rel"
    mkdir -p "$(dirname "$dest")"
    cp "$template" "$dest"
  done < <(find "$root/dist" -type f -name '*.html' -print0)
fi
