---
name: brief-analyst
description: Translate unstructured RFPs and product docs into a structured briefing for a product design team. Use when the user invokes brief-analyst or starts the pipeline from raw docs.
metadata:
  internal: true
---

Read and follow `references/method.md` completely. Do not improvise a parallel method.

When that file names another document, read it from this skill's `references/` folder (`host-qa.md`, `run-workspace.md`, and the method notes named there). Do not look for `agents/` or `skills/` outside this skill folder.

Write into the user's project at `runs/<run-id>/` (reuse if this chat already has a run). Notes and evals go in `.lab/*.json` only.
