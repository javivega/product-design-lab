# Product Design Lab

Multi-agent product design pipeline: from RFP/docs to a **product experience** prototype.

This repo is packaged for **Cursor, Claude Code, ChatGPT Work / Codex, and Antigravity** with one canonical layout. Host-only files exist only where those apps cannot share a format.

## Pipeline

See **[WORKFLOW.md](./WORKFLOW.md)** for the full map, handoffs, and how to invoke each stage.

```text
brief-analyst → problem-framer → ideator → ux-designer → ui-designer → prototyper
```

```text
UX = experience architecture (+ critical scenarios)
UI = visual expression (tokens → screens)
Prototyper = tangible, scenario-based experience
```

Or run everything with the **workflow** skill.

## Invoke

Say the stage name, or use the host’s skill picker (`/brief-analyst`, `$brief-analyst`, `@brief-analyst`, …).

Discovery skills live in **`.agents/skills/`** (Agent Skills spec). Each wrapper loads the real method in `agents/<name>/AGENT.md`.

| Skill | Method |
| ----- | ------ |
| `workflow` | `agents/workflow/AGENT.md` |
| `brief-analyst` | `agents/brief-analyst/AGENT.md` |
| `problem-framer` | `agents/problem-framer/AGENT.md` |
| `ideator` | `agents/ideator/AGENT.md` |
| `ux-designer` | `agents/ux-designer/AGENT.md` |
| `ui-designer` | `agents/ui-designer/AGENT.md` |
| `prototyper` | `agents/prototyper/AGENT.md` |
| `unmess` | `skills/unmess/SKILL.md` |

Method library (loaded by agents, not auto-discovered): `skills/<name>/SKILL.md`.

When executing a stage, load that stage’s `AGENT.md` and follow it completely. Keep `runs/<run-id>/workflow.md` and `.lab/run.json` updated at every handoff. All stages share one run folder.

## Runs (canonical)

**One folder per run** — all stages in the same chat share it:

```text
runs/<run-id>/
  brief.md · problems.md · ideation.md · experience.md · ui.md · prototype/
  workflow.md
  sources/manifest.json
  .lab/run.json · notes.json · evals.json   # machine runtime (hidden)
```

Full convention: [`agents/_shared/run-workspace.md`](agents/_shared/run-workspace.md)

Structured questions: [`agents/_shared/host-qa.md`](agents/_shared/host-qa.md)

Do **not** create `runs/<agent>/<run-id>/` for new work. Legacy agent-scoped folders may still exist for older runs.

## What is shared vs host-only

**Shared (edit these):** `AGENTS.md`, `WORKFLOW.md`, `agents/`, `skills/`, `.agents/skills/`, `evaluations/`.

**Host adapters (keep; schemas differ):**

| App | Why it exists |
| --- | ------------- |
| `CLAUDE.md` | Claude Code reads `CLAUDE.md`, not `AGENTS.md` (`@AGENTS.md` import). |
| `.claude/skills/` | Claude Code’s skill picker does not scan `.agents/skills/`. Same wrappers. |
| `.cursor/mcp.json` | Cursor MCP schema (`url`). |
| `.vscode/mcp.json` | VS Code / Copilot MCP schema (`servers` + `type`). |
| `.mcp.json` | Claude Code MCP schema. |
| `.codex/config.toml` | Codex MCP schema (`[mcp_servers.*]`). |
| `.agents/mcp_config.json` | Antigravity MCP schema (`serverUrl`). |

ChatGPT Skills upload (web, not Codex): zip one folder from `.agents/skills/` — do not duplicate `AGENT.md`.

Do not add Cursor-only slash commands, Claude-only copies of `AGENT.md`, or extra instruction files that repeat this map.
