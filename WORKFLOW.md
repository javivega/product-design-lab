# Product Design Lab — Workflow

End-to-end pipeline from unstructured product docs to a product-experience prototype.

```text
Docs / RFP
    → Brief Analyst
    → Problem Framer
    → Ideator
    → UX Designer
    → UI Designer
    → Prototyper
```

## Quick start

1. Open this repo in Cursor, Claude Code, ChatGPT Work / Codex, or Antigravity.
2. Run the **workflow** skill (or say “run the product-design workflow”) and point at your RFP or docs (or an evaluation fixture).
3. All stages write into **`runs/<run-id>/`** (same run for the whole chat).
4. When done, open `runs/<run-id>/prototype.md` and follow **How to run**.

## Stage skills

| Skill | What it does | Primary output (in `runs/<run-id>/`) |
| ----- | ------------ | -------------------------------------- |
| `workflow` | Full pipeline or resume | `workflow.md` + stage artifacts |
| `brief-analyst` | Structure the brief | `brief.md` |
| `problem-framer` | Frame problems + HMWs | `problems.md` |
| `ideator` | Collaborative directions | `ideation.md` |
| `ux-designer` | Experience + screen architecture | `experience.md` |
| `ui-designer` | Design system + screen UI specs | `ui.md` |
| `prototyper` | Product experience prototype | `prototype/` |

Hosts differ in how you attach a skill (`/name`, `$name`, `@name`, or plain language). The method files are the same.

Orchestrator: [`agents/workflow/AGENT.md`](agents/workflow/AGENT.md)  
Run layout: [`agents/_shared/run-workspace.md`](agents/_shared/run-workspace.md)  
Questions: [`agents/_shared/host-qa.md`](agents/_shared/host-qa.md)

## What each stage owns

| Stage | Question it answers |
| ----- | ------------------- |
| Brief Analyst | What is the project, for whom, with what unknowns? |
| Problem Framer | What problems and HMWs should we explore? |
| Ideator | What design directions are worth exploring (together)? |
| UX Designer | What is the experience architecture (areas, screens, states, flows, **critical scenarios**)? |
| UI Designer | How should that experience be expressed (tokens, components, screen composition)? |
| Prototyper | Can I **experience** how this solution works (scenarios, state, feedback)? |

```text
UX → architecture
UI → visual expression
Prototyper → tangible product experience
```

## Handoffs

All stages share **`runs/<run-id>/`**. Upstream artifacts are siblings (e.g. `experience.md` next to `ui.md`).

Runtime notes/evals: **`.lab/notes.json`** and **`.lab/evals.json`** (machine-readable; merge per stage).

**Prototyper** needs `ui.md` with **full** §4 screen specs. Prefer UX **critical scenarios** as the demo unit.

## Human gates

Collaborative stages use a **native structured picker** when the host has one (Cursor `AskQuestion`, Claude Code `AskUserQuestion`). If none is in the tool list, ask the same question as a short numbered list in chat. Do not invent the answer. Protocol: [`agents/_shared/host-qa.md`](agents/_shared/host-qa.md).

## Fixtures

- `evaluations/brief-analyst/test-cases/001-example-brief.md` — NovaStock-style RFP  
- `evaluations/brief-analyst/test-cases/002-example-brief.md` — Vínculo Animal CRM RFP  

## Legacy runs

Older work may live under `runs/<agent>/<run-id>/`. New pipelines use `runs/<run-id>/` only.
