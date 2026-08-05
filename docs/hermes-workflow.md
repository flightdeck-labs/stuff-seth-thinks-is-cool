# Hermes Automation Workflow

This document captures the v1 operating model for Goose/Hermes.

## Collector schedule

A Hermes cron collector can run periodically, e.g. every few hours:

1. Fetch recent Raindrop items with `RAINDROP_TOKEN` stored in the Hermes environment.
2. Filter for software-development relevance using Goose judgment.
3. Summarize selected links in a concise colleague-to-colleague voice.
4. Use `scripts/dedupe-links.ts` to skip candidates whose Raindrop ID or normalized URL already exists.
5. Generate Markdown entries under `src/content/links/` using `scripts/write-link-entry.ts`.
6. Commit entries to `goose/daily-links/YYYY-MM-DD`.

## Midnight PR schedule

A second Hermes cron job can run around midnight in Seth's timezone:

1. Check the daily branch.
2. Skip if there are no changes relative to `main`.
3. Push the branch.
4. Open a PR titled `Daily links for YYYY-MM-DD`.
5. Request Seth as reviewer when the GitHub username is configured.

Use `pnpm daily-pr -- --date YYYY-MM-DD` for dry-runs and add `--execute` only when ready to open the PR.

## Required Hermes environment

- GitHub CLI authenticated with access to `flightdeck-labs/stuff-seth-thinks-is-cool`.
- `RAINDROP_TOKEN` available to Hermes-side jobs that fetch Raindrop.
- No model-provider token is required in this repository.

## Relevance rules

For v1, select links that are plausibly useful to software development: programming, systems, AI engineering, developer tools, security, infrastructure, product engineering, technical writing, and adjacent engineering practice. Skip purely personal, shopping, entertainment, or non-technical links unless Seth explicitly marks them for the site.

## Summary voice

Write summaries as Goose: casual, concise, and useful. Explain why the link is interesting, not just what the title says. Avoid pretending Seth wrote the note unless he did.

## Failure behavior

- Missing `RAINDROP_TOKEN`: fail clearly and do not commit anything.
- Empty candidate set: do nothing.
- Build/test failure: keep the branch local or open a fix PR only after checks pass.
- Empty branch: do not open a PR.

## Manual recovery

```bash
pnpm install
pnpm test
pnpm build
pnpm collect:raindrop -- --page 0 --per-page 10
pnpm daily-pr -- --date YYYY-MM-DD
```

If a generated Markdown file is invalid, fix the frontmatter and rerun `pnpm build`.
