---
title: "Amazon Aurora PostgreSQL now supports direct querying of Apache Iceberg and Parquet data in your data lake"
url: "https://aws.amazon.com/blogs/aws/amazon-aurora-postgresql-now-supports-direct-querying-of-apache-iceberg-and-parquet-data-in-your-data-lake/"
domain: "aws.amazon.com"
raindrop_id: "1876462857"
captured_at: "2026-10-04T13:59:19.730Z"
proposed_at: "2026-10-04T16:26:41Z"
tags:
  - "aurora"
  - "aws"
  - "duckdb"
  - "iceberg"
  - "parquet"
  - "postgresql"
  - "software-development"
summary: "Aurora PostgreSQL 17.11+ and 18.6+ can query Iceberg and Parquet in S3, S3 Tables, or Glue Data Catalog as foreign tables — no ETL copy first. DuckDB is embedded for the lake scan, so one Postgres query can join live operational rows (including uncommitted writes) with lake history. Optional `MATERIALIZE` into native Aurora tables when you need lower latency. GA in commercial and GovCloud regions; no extra feature fee (you still pay Aurora compute + S3 requests). Setup is IAM role with AuroraAnalytics, `aurora_analytics` extension, then foreign tables / `IMPORT FOREIGN SCHEMA`.\n\nWhy it matters: if you already speak Postgres and sit on an Iceberg/Parquet lake, this is the “stop building a pipeline just to join last week with last five years” feature."
status: "proposed"
source: "obsidian-vault-raindrop"
---

Source vault note: References/Databases/2026-10-04-amazon-aurora-postgresql-now-supports-direct-querying-of-apache-iceberg-and-parq-1876462857.md
