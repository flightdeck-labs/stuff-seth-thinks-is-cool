# Architecture

Raindrop is the capture inbox. This repository is the durable publishing layer for selected links.

```text
Raindrop
  -> Hermes/Goose relevance judgment and summary
  -> Markdown files in src/content/links
  -> Astro content collections
  -> GitHub Actions build
  -> GitHub Pages
```

## Publishing model

- Goose proposes software-development links on dated branches.
- Seth reviews pull requests before publication.
- GitHub Pages deploys from `main` after a PR merges.
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

- Home page: newest link cards.
- Tag pages: static pages generated from link tags.
- About page: purpose and publication model.
- RSS feed: all link entries.
