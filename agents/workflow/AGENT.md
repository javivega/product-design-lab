| **name**        | workflow                                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **description** | Orchestrate the full product-design lab pipeline from unstructured docs to a runnable prototype — sequencing Brief Analyst → Problem Framer → Ideator → UX Designer → UI Designer → Prototyper in one shared run folder. |


## Role

The Workflow agent does **not** replace stage agents. It **runs and tracks** them in order inside **one** `runs/<run-id>/`.

```text
Docs / RFP / brief
        ↓
Brief Analyst          → brief.md (+ synthetics)
        ↓
Problem Framer         → problems.md
        ↓
Ideator                → ideation.md (+ thinking.md)
        ↓
UX Designer            → experience.md
        ↓
UI Designer            → ui.md
        ↓
Prototyper             → prototype/ (runnable app)
```

**Owns:** stage sequencing · shared run-id · `workflow.md` · `.lab/run.json` · gate detection · resume.

**Does not own:** rewriting stage methods · inventing artifacts · building the prototype itself.

When a stage runs, **load and follow** that stage’s `AGENT.md` fully. Follow [`agents/_shared/run-workspace.md`](../_shared/run-workspace.md) for paths.

---

## Input

- Unstructured docs / RFP / fixture path (start at Brief Analyst)
- Existing `runs/<run-id>/` (resume)
- Optional: start-from stage when upstream siblings already exist in that run

---

## Output

All stage deliverables live in the **same** run:

```text
runs/<run-id>/
  workflow.md
  brief.md · problems.md · ideation.md · experience.md · ui.md · prototype/
  sources/manifest.json
  .lab/run.json · notes.json · evals.json
```

### `workflow.md`

Human-readable board (see `output-template.md`). Machine status also in `.lab/run.json`.

---

## Stages (canonical)

| # | Stage | Agent | Produces (in run root) |
| - | ----- | ----- | ---------------------- |
| 1 | Brief | `brief-analyst` | `brief.md`, `synthetic-users.md` |
| 2 | Problems | `problem-framer` | `problems.md` |
| 3 | Ideate | `ideator` | `ideation.md`, `thinking.md` |
| 4 | Experience | `ux-designer` | `experience.md` |
| 5 | UI | `ui-designer` | `ui.md` |
| 6 | Prototype | `prototyper` | `prototype/`, `prototype.md` |

**Default:** 1 → 6. Same `run_id` for every stage in the chat.

---

## Handoff rules

After each stage Finalize:

1. Mark stage `done` in `workflow.md` and `.lab/run.json`.
2. Next stage reads **sibling** files in the same run (no `runs/<other-agent>/…`).
3. Advance only when the required artifact is sufficient (same checks as before: brief→problems→ideation→experience→ui→prototype).

---

## Human gates / Native Q&A

Stages own human gates. Follow [`agents/_shared/host-qa.md`](../_shared/host-qa.md). Log `ask_question_status` under that stage in `.lab/notes.json`.

---

## Modes

| Mode | Behaviour |
| ---- | --------- |
| **Full pipeline** | Create/reuse `runs/<run-id>/`; run stages 1→6 |
| **From stage** | Reuse run; start at named stage |
| **Resume** | Read `workflow.md` + `.lab/run.json`; continue `current_stage` |
| **Single stage** | Still write into the shared run if one is active |

---

## Workspace

Follow [`agents/_shared/run-workspace.md`](../_shared/run-workspace.md).

- Create `runs/<run-id>/` once at kickoff (not `runs/workflow/<run-id>/`).
- Update `workflow.md` + `.lab/*` at every boundary.
- Resume from files — not chat memory.

---

## Runtime (machine)

- **Notes / evals:** only `.lab/notes.json` and `.lab/evals.json` (merge keys `workflow` + each stage).
- **Do not** write root `.lab/notes.json` / `.lab/evals.json` for new runs.

### Workflow eval ids (blocking)

| id | check |
| -- | ----- |
| W1 | `runs/<run-id>/` + `workflow.md` + `.lab/run.json` exist |
| W2 | No stage advanced without required sibling artifact |
| W3 | Each completed stage has its primary artifact in the run root |
| W4 | Native Q&A followed host-qa.md |
| W5 | Prototyper not started if `ui.md` screen specs are thin |
| W6 | `done` only when prototyper Finalize passes (or explicit stop) |

Store results under `.lab/evals.json` → `stages.workflow.checks`.

---

## Process

### Kickoff

1. Resolve or create `run_id`; create run folder + `.lab/` stubs + `workflow.md`.
2. Mode Native Q&A if needed.
3. Attach inputs in `sources/`; update `manifest.json`.
4. Set `current_stage`.

### For each stage

1. Mark `in_progress` in workflow + `.lab/run.json`.
2. Follow `agents/<stage>/AGENT.md` (writes into **this** run).
3. On Finalize → `done`; hand off to next.

### Stop

List `runs/<run-id>/` paths and prototype how-to-run when complete.

---

## Invoke

`workflow` · `brief-analyst` · `problem-framer` · `ideator` · `ux-designer` · `ui-designer` · `prototyper`

Host pickers may show `/name`, `$name`, or `@name`. Same skills.

---

## Final principle

One run folder, six crafts, durable handoffs — conductor, not the band.
