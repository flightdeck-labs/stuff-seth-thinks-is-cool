# Architecture

Raindrop is the capture inbox. This repository is the durable publishing layer for selected links.

```text
Raindrop
  -> Hermes/Goose relevance judgment and summary
  -> Markdown files in src/content/links
  -> (this repo stays the ingest source)
  -> shr.dev publishes the collection at /cool
```

## Publishing model

- Goose proposes software-development links on dated branches.
- Seth reviews pull requests before publication.
- The public collection is https://shr.dev/cool. After a PR merges, GitHub Pages still deploys from `main`, but CI runs `scripts/prepare-pages-redirect.sh` and uploads that folder: site root, every former Astro HTML path (about, tags, …), and `404.html` for anything else, all pointing at that URL.
- GitHub Pages has no server-side 301/302. The stub is HTTP 200 (or 404 for unknown paths) with meta refresh, canonical, and JavaScript `location.replace`. A real 302 would need something in front of `*.github.io` (for example Cloudflare); that is not set up here, and `shr.dev` already has its own Worker.
- CI still runs `pnpm build` so invalid Markdown fails the ingest pipeline. The Astro `dist/` is not what Pages serves.
- The repo never stores Raindrop or model-provider secrets.

## Content model

Each link is a Markdown file under `src/content/links/` with schema-validated frontmatter:

- `title`
- `url`
- `domain`
- optional `raindrop_id`
- optional `captured_at`
- `proposed_at`
- optional `published_at`
- `tags`
- `summary`
- `status`
- `source`

## Site pages

The Astro app in this repo is local/CI-only (ingest validation). Public URLs:

- Live collection: https://shr.dev/cool (plus `/cool/about/` and `/cool/rss.xml` on shr.dev).
- GitHub Pages (`https://flightdeck-labs.github.io/stuff-seth-thinks-is-cool/`): redirect stub only.
