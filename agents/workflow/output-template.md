# Workflow run book template

File: `runs/<run-id>/workflow.md`

```markdown
# Workflow — [Project]

## Status
- **state:** pending | in_progress | blocked | stopped | done
- **current_stage:** brief-analyst | … | prototyper | done
- **mode:** full | from-stage | resume | single
- **run:** `runs/<run-id>/`
- **language:** …
- **updated:** …

## Sources
- …

## Stage board

| Stage | Status | Artifact |
| ----- | ------ | -------- |
| 1 Brief Analyst | … | `brief.md` |
| 2 Problem Framer | … | `problems.md` |
| 3 Ideator | … | `ideation.md` |
| 4 UX Designer | … | `experience.md` |
| 5 UI Designer | … | `ui.md` |
| 6 Prototyper | … | `prototype/` |

Machine mirror: `.lab/run.json`

## Gates & decisions
- …

## Blockers
- …

## Next action
- …
```
