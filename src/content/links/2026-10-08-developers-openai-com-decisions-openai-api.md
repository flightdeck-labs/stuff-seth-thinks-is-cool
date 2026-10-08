---
title: "Decisions | OpenAI API"
url: "https://developers.openai.com/api/docs/guides/decisions?utm_source=tldrdev"
domain: "developers.openai.com"
raindrop_id: "1880298426"
captured_at: "2026-10-08T00:12:28.227Z"
proposed_at: "2026-10-08T00:44:19Z"
tags:
  - "ai"
  - "ai-tools"
  - "classification"
  - "decisions-api"
  - "openai"
summary: "OpenAI’s Decisions API (`POST /v1/decisions`, public beta, currently `gpt-6-luna` only) is a typed-answer endpoint: check a condition (`predicate` → P(true)), pick one of your labels (`choice` + distribution), or rate against ordered levels (`score` as a probability-weighted index). Batch independent questions over the same text/image input; images are inline base64 only (no hosted URLs / `file_id`). Docs pitch it ~10× faster than Responses, input-only pricing at $0.10/1M tokens, ZDR/HIPAA for eligible customers. Reach for this when you need classify / route / score; keep Responses + structured outputs when you need a schema or an explanation.\n\nWhy it matters: hosted cousin of Jev/Laya-style typed decisions — cheaper/faster path for routing, moderation, and severity than prompting a chat model to JSON."
status: "proposed"
source: "obsidian-vault-raindrop"
---

Source vault note: References/AI Tools/2026-10-07-decisions-openai-api-1880298426.md
