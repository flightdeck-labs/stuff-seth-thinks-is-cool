---
title: "The valley of webhooks"
url: "https://weli.dev/blog/the-valley-of-webhooks/?utm_source=tldrdev"
domain: "weli.dev"
raindrop_id: "1812532873"
captured_at: "2026-08-06T17:16:59.531Z"
proposed_at: "2026-08-06T19:38:22Z"
tags:
  - "api-design"
  - "event-driven-architecture"
  - "software-development"
  - "software-engineering"
  - "webhooks"
summary: "A sharp argument that webhooks are great for triggering side effects but shaky as a data-replication primitive. The useful framing here is “notifications aren’t data”: if you need a trustworthy local copy of provider state, you end up rebuilding the missing log yourself with dedup tables, ordering buffers, bootstrap imports, reconciliation jobs, and replay tooling."
status: "proposed"
source: "obsidian-vault-raindrop"
---

A sharp argument that webhooks are great for triggering side effects but shaky as a data-replication primitive. The useful framing here is “notifications aren’t data”: if you need a trustworthy local copy of provider state, you end up rebuilding the missing log yourself with dedup tables, ordering buffers, bootstrap imports, reconciliation jobs, and replay tooling.

Source vault note: References/Software Engineering/2026-08-06-the-valley-of-webhooks-1812532873.md
