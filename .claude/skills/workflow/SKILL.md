---
name: workflow
description: Orchestrate the full product-design lab pipeline from unstructured docs to a runnable prototype (Brief Analyst through Prototyper) in one shared run folder. Use when the user wants /workflow, the full pipeline, or to resume a run.
metadata:
  internal: true
---

Read and follow `agents/workflow/AGENT.md` completely. Do not improvise a parallel method.

Write into the shared `runs/<run-id>/` (reuse if this chat already has a run). Notes/evals → `.lab/*.json` only.

Structured Q&A: `agents/_shared/host-qa.md`. Run layout: `agents/_shared/run-workspace.md`. Pipeline: `WORKFLOW.md`.

When executing a stage, load that stage's AGENT.md and follow it completely. Keep runs/<run-id>/workflow.md and .lab/run.json updated at every handoff.
