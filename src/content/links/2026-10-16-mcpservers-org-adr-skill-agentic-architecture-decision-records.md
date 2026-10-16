---
title: "adr-skill — agentic Architecture Decision Records"
url: "https://mcpservers.org/agent-skills/vercel/ai/adr-skill"
domain: "mcpservers.org"
raindrop_id: "1891236687"
captured_at: "2026-10-16T05:43:48.790Z"
proposed_at: "2026-10-16T09:29:24Z"
tags:
  - "adr"
  - "agent-skills"
  - "ai-agents"
  - "architecture"
  - "documentation"
  - "software-development"
  - "vercel"
summary: "Vercel’s `adr-skill` (from the `vercel/ai` repo) is an agent skill for Architecture Decision Records that a coding agent can implement without follow-up questions. A human still approves the decision; the ADR has to be specific (stack/version, not “use a database”), list non-goals, and include an implementation plan: files to touch, patterns to follow, tests, and checkable verification. Four phases: scan the repo, Socratic intent capture with a confirmation gate, draft from a simple or MADR template, then review against an agent-readiness checklist. Install with `npx skills add https://github.com/vercel/ai --skill adr-skill`.\n\nWhy it matters: this is the agent workflow that sits on top of a Markdown ADR format like MADR — when to write one, how to keep it executable, and how to link it both ways with the code."
status: "proposed"
source: "obsidian-vault-raindrop"
---

Source vault note: References/Software Engineering/2026-10-16-adr-skill-1891236687.md
