# Stuff Seth Thinks Is Cool

Selected software-development links Seth finds interesting, curated with Goose.

## What this is

Raindrop is the capture inbox. Goose proposes concise notes for links that look relevant to software development. The repo stores those proposed links as Markdown, Astro builds the site, and GitHub Pages publishes it after Seth merges a review PR.

## Local development

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
```

## Content

Link entries live in `src/content/links/` as Markdown with schema-validated frontmatter. A minimal entry looks like:

```yaml
---
title: "Example Link"
url: "https://example.com/"
domain: "example.com"
proposed_at: "2026-08-03T20:15:22Z"
tags:
  - software-development
summary: "Why this link is worth saving."
status: "proposed"
source: "raindrop"
---
```

## Helper scripts

Normalize a URL:

```bash
pnpm tsx scripts/normalize-url.ts 'https://example.com/?utm_source=x&id=1#top'
```

Generate a Markdown link entry:

```bash
pnpm tsx scripts/write-link-entry.ts '{"title":"Example","url":"https://example.com/","summary":"Why it matters.","tags":["software-development"]}'
```

Check whether a candidate link duplicates existing Markdown by Raindrop ID or normalized URL:

```bash
pnpm dedupe:link -- '{"url":"https://example.com/?utm_source=x"}'
```

Fetch Raindrop items, using a Hermes-side secret:

```bash
RAINDROP_TOKEN=*** pnpm collect:raindrop -- --page 0 --per-page 10
```

Dry-run the daily PR helper:

```bash
pnpm daily-pr -- --date 2026-08-03
```

## Publishing model

1. Goose creates or updates a dated branch like `goose/daily-links/YYYY-MM-DD`.
2. Goose commits proposed Markdown link entries.
3. The daily PR helper opens a PR if the branch has changes.
4. Seth reviews and merges.
5. GitHub Pages deploys `main`.

See [`docs/architecture.md`](docs/architecture.md) and [`docs/hermes-workflow.md`](docs/hermes-workflow.md) for details.

## Boundaries

- No Raindrop token is committed to this repo.
- No OpenAI/model-provider token is required in this repo.
- Source links belong to their original authors.
