---
title: "Building a Custom Harness with Pi and Jev"
url: "https://archive.codenewsletter.ai/2102762406204076532?utm_source=codenewsletter.ai&utm_medium=newsletter&utm_campaign=google-s-new-model-hunts-and-patches-security-bugs&_bhlid=4d44c8c006d91e4cd260ad8df4ff30d880722e4d"
domain: "archive.codenewsletter.ai"
raindrop_id: "1875507650"
captured_at: "2026-10-03T11:55:12.795Z"
proposed_at: "2026-10-03T16:15:31Z"
tags:
  - "ai"
  - "ai-agents"
  - "harnesses"
  - "jev"
  - "pi"
summary: "DAIR.ai tutorial (elvis / @omarsar0) on building your own agent loop with the Pi SDK and TypeSafe’s Jev — a small “System One” model that answers yes/no, choice, and score questions with probabilities instead of prose. Three cheap hooks: gate every tool call (allow / ask a human / block), pick a cheap vs powerful model once at request start (don’t switch mid-run; prompt-cache tax), and verify the final answer is grounded before you accept it. Gate fails closed if Jev is down; router fails open to the stronger model. Keep hard path/sandbox checks in code; Jev is for the judgment calls.\n\nInteractive playground at academy.dair.ai. Inspired by Sydney Runkle’s LangChain/Jev post, rebuilt so you own the policy.\n\nWhy it matters: practical pattern for putting allow/ask/block policy in the harness without paying for a full chat-model call on every check."
status: "proposed"
source: "obsidian-vault-raindrop"
---

Source vault note: References/AI Agents/2026-10-03-building-a-custom-harness-with-pi-and-jev-1875507650.md
