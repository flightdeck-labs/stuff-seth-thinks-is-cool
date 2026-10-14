---
title: "Ponytail — lazy-senior skill for coding agents"
url: "https://github.com/DietrichGebert/ponytail"
domain: "github.com"
raindrop_id: "1888620544"
captured_at: "2026-10-14T01:35:30.694Z"
proposed_at: "2026-10-14T05:12:39Z"
tags:
  - "ai"
  - "ai-agents"
  - "coding-agents"
  - "developer-tools"
  - "software-development"
summary: "[Ponytail](https://github.com/DietrichGebert/ponytail) is a coding-agent skill that biases the model toward the laziest senior in the room: reuse what already exists, then write the smallest thing that actually needs to exist. It is one prompt (`skills/ponytail/SKILL.md` plus a compact `AGENTS.md`) with install adapters for a pile of hosts — Claude Code, Codex, Devin, OpenCode, Gemini, pi, Hermes, Cursor, Copilot, and others.\n\n- Before generating, it walks a ladder: does this need to exist, is it already in the repo, stdlib/platform/installed dep, then the minimum that works — plus a small test when the logic is risky.\n- Slash commands on skill-capable hosts: `/ponytail` (lite/full/ultra/off), `/ponytail-review` (bugs/security/load, not just “what to delete”), `/ponytail-audit` (whole-repo, ranked), `/ponytail-debt` (harvest `shortcut:` comments).\n- Site: [ponytail.dev](https://ponytail.dev). MIT. Install only from `DietrichGebert/ponytail` / `@dietrichgebert/ponytail`.\n\nWhy it matters: if your agent keeps shipping a 300-line date picker when `input type=\"date\"` would do, this is the reusable “stop generating, start looking” prompt."
status: "proposed"
source: "obsidian-vault-raindrop"
---

Source vault note: References/AI Agents/2026-10-14-dietrichgebert-ponytail-1888620544.md
