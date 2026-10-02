---
name: unmess
description: >-
  Turn messy project inputs (notes, emails, RFPs, transcripts, scraps, Confluence/Notion links) into a clear, skim-ready project context document. Prefer MCP fetch for Confluence and Notion URLs. Use when someone needs to understand a project fast without inventing research or personas.
metadata:
  internal: true
---

## Input

Unstructured or semi-structured project material: notes, emails, meeting scraps, RFPs, briefs, chat dumps, slide decks, mixed docs, **or links** to documentation pages.

Accepted forms (in preference order):

1. **Chat paste / attached files / repo paths** — always reliable
2. **Confluence or Notion URLs** — fetch via MCP (see **Linked sources**)
3. Other URLs — try MCP if one exists for that product; otherwise ask for paste/export

Prefer saving durable copies under a working folder (e.g. `sources/`) when the paste or fetched body is long.

### Linked sources (MCP)

When the user gives a **Confluence** or **Notion** link, **do not** rely on a public HTTP fetch (auth walls). **Use the matching MCP** when it is available in the session.

This repo ships the same remote MCP servers in client-specific config so **anyone can use unmess without marketplace plugins** (each host only reads its own file):

| Client | Config | Servers |
| ------ | ------ | ------- |
| Cursor | [`.cursor/mcp.json`](../../.cursor/mcp.json) | Notion + Atlassian |
| VS Code / Copilot | [`.vscode/mcp.json`](../../.vscode/mcp.json) | Notion + Atlassian |
| Claude Code | [`.mcp.json`](../../.mcp.json) | Notion + Atlassian |
| OpenAI Codex / ChatGPT Work | [`.codex/config.toml`](../../.codex/config.toml) | Notion + Atlassian |
| Antigravity | [`.agents/mcp_config.json`](../../.agents/mcp_config.json) | Notion + Atlassian |

| Server | URL |
| ------ | --- |
| Notion | `https://mcp.notion.com/mcp` |
| Atlassian (Confluence / Jira) | `https://mcp.atlassian.com/v2/mcp` |

**First-time setup:** open the project in your client → enable / trust the MCP servers if prompted → complete OAuth (`mcp_auth` or the client’s connect flow). Keep the host configs in sync when changing URLs (same remotes; schemas differ). Paste/export remains the fallback if MCP is unavailable.

#### General MCP rules

1. Inspect available MCP tools for this session before guessing tool names.
2. If the server status is `needsAuth`, call that namespace’s **`mcp_auth`** and wait for the user to finish OAuth — then retry.
3. Fetch the page content; save a durable excerpt or markdown dump under `sources/` (e.g. `sources/confluence-<page-id>.md`, `sources/notion-<page-id>.md`) plus the original URL in a short `sources/manifest` note or at the top of `unmess.md`.
4. Build `unmess.md` from the **fetched body**, not from the URL title or a login page.
5. If MCP is missing from the session, auth fails, or the page is inaccessible: **stop inventing**. Point the user at this host’s MCP config + OAuth (or ask for paste/export), and record the unreachable URL under §7 Information gaps.

#### Confluence (Atlassian MCP)

Typical URL: `https://[site].atlassian.net/wiki/spaces/[SPACE]/pages/[PAGE_ID]/…`

Uses the **atlassian** MCP entry shipped in this repo.

When Atlassian MCP tools are available (after auth):

1. Resolve site / `cloudId` (e.g. `getAccessibleAtlassianResources` if needed).
2. Extract numeric `PAGE_ID` from the URL.
3. Fetch with **`getConfluencePage`** (`contentFormat: "markdown"` when supported).
4. Optional: related pages or Jira mentions via Atlassian search tools — only when they clarify this project; don’t vacuum the whole wiki.

If the user pastes a Confluence title without a URL, search Confluence (e.g. `search` / `searchConfluenceUsingCql`) and confirm the page before treating it as source.

#### Notion (Notion MCP)

Typical URL: `https://www.notion.so/…` or `https://notion.so/…` (page id is often the trailing UUID / 32-hex segment).

Uses the **notion** MCP entry shipped in this repo.

When Notion MCP is available (after auth):

1. Use the session’s Notion tools to **search / retrieve** the page (tool names vary by server version — discover them; prefer markdown or plain-text page retrieve when offered).
2. Follow child pages or linked databases **only** when they are clearly part of the same brief; note each URL under sources.

If Notion tools are still missing after enabling the project MCP: ask the user to reload MCP / finish OAuth — or paste the page.

#### Other products (Google Docs, …)

Same pattern: use a product MCP when present and authenticated; otherwise ask for export/paste. Do not pretend a blocked page was read.

## Output

A single user-facing file: **`unmess.md`** (or a path the user names).

Purpose: someone can open it and, in ~30 seconds, know what the project is — then dig into context, people, users, constraints, decisions, and gaps.

This skill **organises what is already known**. It does not invent research, personas, validated needs, or solutions.

### Voice

- Plain language. Short lines. One idea per bullet.
- Workshop notes, not an audit log.
- No IDs, codes, or analyst jargon in the body (`S1`, “residual”, “stakeholder map v2”).
- Never present an assumption as a fact.
- Prefer a clear gap over a padded guess.
- Write in the language of the source material unless the user asks otherwise.

### Format

```markdown
# Project context — [Project name]

## 1. Project overview

- **Client:** …
- **Project / initiative:** …
- **Deadline / dates:** …   <!-- or: Unknown -->
- **Goal (one sentence):** …
- **Stage:** …              <!-- e.g. discovery, framing, delivery — or Unknown -->
- **Sources:** …            <!-- paths and/or Confluence/Notion URLs + fetched | pasted | unreachable -->

## 2. Context

- **Why it was requested:** …
- **What triggered it:** …
- **What the client believes is happening:** …
- **Known underlying need (so far):** …   <!-- distinct from the stated ask -->
- **Relevant background:** …

## 3. Stakeholders

| Stakeholder | Role | Involvement | Decisions / topics |
| ----------- | ---- | ----------- | ------------------ |
| … | Decision maker / Subject expert / Influencer / … | High / Medium / Low / Unknown | … |

**Internal:** …
**External:** …

**Who we need to talk with**
- [Person / role] — [what knowledge or authority is missing]

## 4. Users

### [User type label]

- **Who they are:** …
- **Role / context:** …
- **What we know:** …
- **What they currently do:** …
- **What they need / expect:** …
- **Known problems or frustrations:** …
- **Unknowns:** …

<!-- Repeat one block per evidenced user type. Skip persona theatre. -->

## 5. Requirements & constraints

**Requirements**
- …

**Constraints**
- …

**Dependencies**
- …

## 6. Decisions & assumptions

**Decisions** — already agreed
- …

**Assumptions** — believed true, not yet confirmed
- …

## 7. Open questions & gaps

**Open questions** — things we need to ask
- …

**Information gaps** — things the material does not allow us to know yet
- …

**Potential research needs** — things that probably need investigation
- …
```

Skip empty groups with a single line (`None stated in the material.` / `Unknown.`) rather than inventing content.

### Section intent

| Section | Job |
| ------- | --- |
| **1. Project overview** | 30-second orientation: who, what, when, one-sentence goal, stage if known |
| **2. Context** | Why the project exists — trigger, client belief, underlying need so far, background |
| **3. Stakeholders** | Decision relationships + who we still need to talk with (not only a name list) |
| **4. Users** | Organised knowledge about user types — evidence only; no fabricated personas |
| **5. Requirements & constraints** | Separate requirements, constraints, and dependencies for later framing |
| **6. Decisions & assumptions** | What later work may treat as context vs what must stay questionable |
| **7. Open questions & gaps** | Highest-value output: ask / don’t know yet / probably needs research |

### Examples

**Overview (good)**
- **Goal (one sentence):** Help warehouse operators finish goods-in without losing stock accuracy when Wi‑Fi drops.

**Underlying need vs stated ask**
- Client asks for “a better dashboard.”
- **Known underlying need (so far):** Operators cannot tell which offline counts are trustworthy before the next truck arrives.
  *(Stated ask ≠ need. Keep both visible.)*

**Stakeholder row (good)**

| Stakeholder | Role | Involvement | Decisions / topics |
| ----------- | ---- | ----------- | ------------------ |
| Operations lead | Subject expert | High | Peak-hour process, what “done” means on the dock |

**Who we need to talk with (good)**
- Night-shift supervisors — only day-shift pain is described; peak behaviour is unknown.

**Users (good)**
- Evidence-backed user type with Unknowns listed.
- **No** invented persona (“María, 34, loves efficiency”) unless the source material actually provides that evidence.

**Decisions vs assumptions**
- **Decision:** v1 is warehouse-floor only (agreed in kickoff notes).
- **Assumption:** Operators prefer correcting errors on a handheld vs a desktop (stated once; unconfirmed).

### Rules

- Do not invent facts, users, stakeholders, deadlines, or needs.
- Do not create personas unless the source material provides enough evidence.
- Distinguish **what the client says** from **known underlying need so far**.
- Stakeholders: prefer decision/authority structure over a flat name dump.
- “Who we need to talk with” is first-class — missing knowledge or authority beats a complete org chart.
- Requirements ≠ constraints ≠ dependencies — keep them visually separate inside §5.
- Decisions ≠ assumptions — keep them visually separate in §6.
- §7 should be rich when the material is thin — gaps are the point, not a failure.
- Do not propose solutions, roadmaps, JTBD lists, or screen ideas here.
- Do not silently “fix” contradictions — put them in Context or Open questions.
- Confluence/Notion links → MCP fetch (auth if needed); never treat a login wall or URL slug as content.
- Record every source URL and whether it was **fetched**, **pasted**, or **unreachable**.

## Principles

- Organise mess; don’t invent clarity.
- Skim-first: overview must stand alone in ~30 seconds.
- Evidence over completeness.
- Separate belief from confirmation.
- Missing conversations are findings.
- Designer-readable beats exhaustive.
- Later agents (or humans) should know what is safe context vs what to challenge.

## Process

### Step 1 - Gather

Collect all provided material. Note the documentation language.

- **Paste / files / paths:** save durable copies under `sources/` when long.
- **Confluence / Notion URLs:** follow **Linked sources (MCP)** — authenticate if needed, fetch page body, save under `sources/`, list URLs in §1 **Sources**.
- **Unreachable links:** do not invent; ask for paste/export; log under §7.

### Step 2 - Overview first

Fill §1 only with what a stranger needs in 30 seconds. If goal or stage is unclear, write **Unknown** and push detail to §7.

### Step 3 - Context

Extract why / trigger / client belief / underlying need so far / background. Keep “stated ask” and “underlying need” distinct when both appear.

### Step 4 - People

Build the stakeholder table (internal + external). Add **Who we need to talk with** for missing knowledge or decision authority.

### Step 5 - Users

List user types only when the material supports them. Fill the open fields; leave Unknowns explicit. **Do not fabricate personas.**

### Step 6 - Shape & commitments

Sort requirements, constraints, and dependencies (§5). Split already-agreed **Decisions** from unconfirmed **Assumptions** (§6).

### Step 7 - Gaps

Write §7 last and generously: open questions, information gaps, potential research needs. Prefer concrete gaps over vague “need more info.”

### Step 8 - Hand off

Return `unmess.md` (or the user-specified path). Optionally list the top 3 gaps in chat. Do not wire this file into other agents unless the user asks.
