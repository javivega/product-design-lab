# Workflow — NovaStock Pro

## Status
- **state:** done
- **current_stage:** done
- **mode:** resume (assembled from existing stage runs)
- **language:** es
- **updated:** 2026-09-13

## Sources
- Fixture / prior chain: NovaStock Pro RFP via brief-analyst run
- See stage manifests for original docs

## Stage board

| Stage | Status | Run path | Primary artifact | Notes |
| ----- | ------ | -------- | ---------------- | ----- |
| 1 Brief Analyst | done | `runs/brief-analyst/20260910-0119-novastock-pro/` | `brief.md` | + synthetic-users.md |
| 2 Problem Framer | done | `runs/problem-framer/20260910-1158-novastock-pro/` | `problems.md` | |
| 3 Ideator | done | `runs/ideator/20260910-1311-novastock-pro/` | `ideation.md` | + thinking.md |
| 4 UX Designer | done | `runs/ux-designer/20260913-1337-novastock-pro/` | `experience.md` | |
| 5 UI Designer | done | `runs/ui-designer/20260913-1407-novastock-pro/` | `ui.md` | Full screen specs |
| 6 Prototyper | done | `runs/prototyper/20260913-1424-novastock-pro/` | `prototype/` | See prototype.md how to run |

## Gates & decisions
- Collaborative AskQuestion used inside ideator, ux-designer, and ui-designer (brand) runs as recorded in those notes.
- This workflow file was created to link the completed NovaStock chain under one run book.

## Blockers
- None for the linked chain.

## Next action
- Demo: `cd runs/prototyper/20260913-1424-novastock-pro/prototype && npm install && npm run dev`
- Or start a **new** full pipeline with `/workflow` on another RFP (e.g. `evaluations/brief-analyst/test-cases/002-example-brief.md`).
