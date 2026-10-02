# Run workspace (canonical)

All product-design stages in one chat / pipeline share **one run folder**.

```text
runs/<run-id>/
  sources/
    manifest.json          # machine: inputs + artifact index
  brief.md                 # human deliverable
  synthetic-users.md
  problems.md
  thinking.md
  ideation.md
  experience.md
  ui.md
  prototype.md
  prototype/               # runnable app
  workflow.md              # human run book (optional but recommended for /workflow)
  .lab/                    # hidden from humans; machine-oriented runtime
    run.json
    notes.json
    evals.json
```

## Rules

1. **One run-id per conversation pipeline.** If a run already exists for this chat/project (path given, open files, or `workflow.md` / `.lab/run.json`), **reuse it**. Do not create `runs/<agent>/<run-id>/`.
2. **Human artifacts** stay at the run root (markdown + `prototype/`).
3. **Notes and evals** live only under `.lab/` as JSON — not beside the deliverables.
4. **Inputs** are sibling files in the same run (e.g. UX reads `ideation.md` here), not paths under other agent folders.
5. Legacy layout `runs/<agent>/<run-id>/` may exist historically; **new work uses this layout only**.

## Run id

- Format: `YYYYMMDD-HHMM-<short-slug>` (kebab-case).
- Prefer an existing run-id from the user, workflow, or current chat.
- Create a new run-id only when starting a **new** project/pipeline.

## `.lab/run.json`

```json
{
  "run_id": "20260915-2052-vinculo-animal",
  "schema_version": 1,
  "language": "es",
  "mode": "full",
  "current_stage": "prototyper",
  "created": "2026-09-15T20:52:00+02:00",
  "updated": "2026-09-15T21:10:00+02:00",
  "stages": {
    "brief-analyst": { "status": "done", "artifact": "brief.md" },
    "problem-framer": { "status": "done", "artifact": "problems.md" },
    "ideator": { "status": "done", "artifact": "ideation.md" },
    "ux-designer": { "status": "done", "artifact": "experience.md" },
    "ui-designer": { "status": "done", "artifact": "ui.md" },
    "prototyper": { "status": "in_progress", "artifact": "prototype/" }
  }
}
```

`status`: `pending` | `in_progress` | `done` | `blocked` | `skipped`

## `.lab/notes.json`

Machine-readable working memory. One object per stage; append to `log`.

```json
{
  "schema_version": 1,
  "run_id": "…",
  "stages": {
    "ux-designer": {
      "current": {
        "phase": "Phase 7 — Identify critical scenarios",
        "ask_question_status": "used",
        "coverage": { "jtbd_blocks": "filled" },
        "open_loops": [],
        "risks": ["invented-certainty"]
      },
      "log": [
        { "ts": "2026-09-15T21:00:00+02:00", "phase": "Phase 2", "delta": "direction queue cleared" }
      ]
    }
  }
}
```

Agents **merge** their stage key; never wipe other stages’ notes.

## `.lab/evals.json`

```json
{
  "schema_version": 1,
  "run_id": "…",
  "stages": {
    "ui-designer": {
      "updated": "2026-09-15T21:05:00+02:00",
      "checks": [
        { "id": "E2", "result": "pass", "when": "after Phase 4", "note": "10 full screen specs" },
        { "id": "Q1", "result": "pass", "when": "after Phase 4", "note": null }
      ]
    }
  }
}
```

`result`: `pass` | `fail` | `n/a` | `pending`

Agents **merge** checks for their stage (replace same `id`, keep others).

## `sources/manifest.json`

```json
{
  "schema_version": 1,
  "run_id": "…",
  "inputs": [
    { "role": "rfp", "path": "evaluations/brief-analyst/test-cases/002-example-brief.md" }
  ],
  "artifacts": {
    "brief": "brief.md",
    "synthetic_users": "synthetic-users.md",
    "problems": "problems.md",
    "ideation": "ideation.md",
    "thinking": "thinking.md",
    "experience": "experience.md",
    "ui": "ui.md",
    "prototype_doc": "prototype.md",
    "prototype_app": "prototype/",
    "workflow": "workflow.md"
  }
}
```

## Agent behaviour checklist

When starting or continuing a stage:

1. Resolve `run_id` (reuse if present).
2. Ensure `runs/<run-id>/` and `.lab/` exist.
3. Read sibling upstream artifacts from this run.
4. Write/update the stage’s human deliverable(s) at the run root.
5. Update `.lab/run.json` stage status.
6. Merge `.lab/notes.json` and `.lab/evals.json` for this stage only.
7. Update `sources/manifest.json` artifact pointers when a file is created.
8. Human gates: [`host-qa.md`](host-qa.md).
