---
name: opportunity-mapping
description: >-
  Write How Might We questions under every JTBD block to foster conversation and ideation, and list questions that must be answered before exploring solutions. Use when completing problems.md §2 HMW subsections and §4.
---

## Input

JTBD blocks from `problems.md` §2 (Context + Problem exploration), framed problems from §3, and leftover Unknowns / Conflicts. Read them from disk — not from chat memory.

## Output

1. **HMW questions** — inside **every** in-scope JTBD block in §2 (required)
2. **Questions before exploring solutions** — `problems.md` §4

Do **not** create a separate global “Opportunities” section. HMWs belong with the JTBD.

### Voice

- Conversational, short, human — like prompts a designer would take into a workshop.
- No IDs, codes, or analyst jargon in the user-facing lines (`HMW-3`, “opportunity seed”).
- One clear How Might We per bullet. No stacked sub-clauses.
- Questions should read as design, research, or product-decision prompts — not runtime tickets.

## HMW questions (under each JTBD)

### Altitude

A How Might We sits at **problem altitude**: it names the people and the difficulty for **this job**, and leaves the solution open.

- Yes: “How might we help operators quickly identify which orders need priority attention?”
- No: “How might we build a priority dashboard with red badges?”

Too broad (“How might we make the warehouse better?”) is as unhelpful as too narrow (a prescribed UI).

### Format

Inside each JTBD block:

```markdown
**HMW questions**
- How might we [help / enable / make it easier for] [who] [to do the hard thing]?
- How might we [second angle on the same job — optional]?
- How might we [third angle — optional]?
```

Rules:

- **Every** in-scope JTBD block gets **1–3+** How Might We statements. No exceptions for “thin” jobs — if evidence is thin, write HMWs that invite research-aware ideation and keep Unknowns in §4.
- Ground HMWs in that JTBD’s Context + Problem exploration (and related framed problems when helpful).
- Vary the angle (speed, trust, recovery, visibility) only when it is still the same job difficulty — do not smuggle a new JTBD.
- Do not name screens, components, or product modules.
- Do not use “How might we add / build / implement [feature]”.
- HMWs foster conversation and future ideation — they are not a backlog of features.

### Examples

Under a receiving-offline JTBD:
- How might we help dock operators keep receiving movements recorded when the network drops?
- How might we help them reconnect those movements once the network returns?

Under a peak-controls JTBD:
- How might we help operators finish peak picking without losing the controls they need later?

### Anti-patterns (do not write)

- How might we build a priority dashboard with red badges?
- How might we add a real-time KPI panel?
- How might we implement offline mode with local SQLite?
- How might we reduce errors by 80%? (business target, not a design opportunity)

## Questions before exploring solutions (section 4)

### What belongs here

Questions that, if unanswered, would make ideation guesswork:

- Unknown current behaviour, pain, barriers, or alternatives from JTBD explorations
- Conflicts from assumption mapping that change which problem is real
- Product decisions that would lock a solution too early (scope, policy, who decides)

These are **not** a Mom Test owner queue. Do not rewrite them as pitch questions (“Would you use a dashboard?”).

### Format

```markdown
## 4. Questions before exploring solutions

Still unanswered — research or a product decision:
- [Clear, answerable question]?
- [Clear, answerable question]?
```

After answers arrive, **update the problems file**: fold useful answers into the matching JTBD blocks and §3; remove resolved questions; keep or add items for what is still unknown.

Do not leave section 4 as a graveyard of answered items.

### Examples — Questions

- How do supervisors decide which incident to handle first today?
- When two stations disagree on stock after an outage, who wins, and how is that decided now?
- Which control steps get skipped in a peak, and what breaks when they are skipped?

### Anti-patterns (do not ask)

- Would a dashboard help?
- Do you think operators want guided flows?
- Which colour should we use for priority?
- What features should v1 include?

### Rules

- Every material Unknown or Conflict that still affects framing appears here, or was folded into a framed problem with its uncertainty removed.
- Questions must be answerable by research, observation, or a product decision — not rhetorical.
- Prefer “what happens today / last time / who decides” over “what should we build”.
- Writing §4 is not asking the user. Live Q&A follows the calling agent’s **Native Q&A** section, and only when a frame would otherwise invent behaviour or the run must choose among problem clusters.

## Principles

- Frame opportunities from problems and explorations, not from feature lists.
- Stay at problem altitude; leave solutions open.
- Every JTBD carries its own HMW set.
- Never present an assumption as a fact.
- Questions before solutions are first-class output.
- Prefer a clear Unknown over a padded How Might We.
- Designer-readable beats exhaustive.

## Process

### Step 1 - Take JTBD blocks and framed problems

Read `problems.md` §2 and §3. If a framed problem is still solution-shaped, send it back to problem framing — do not wrap it in “How might we”.

### Step 2 - Write How Might We per JTBD

For each in-scope JTBD block, draft 1–3+ How Might We statements under **HMW questions**. Confirm none are missing before handoff.

### Step 3 - Collect questions

From JTBD explorations and mapping Conflicts, lift leftover Unknowns into §4. Phrase each as an answerable research or product-decision question.

### Step 4 - Hand off

Return updated §2 HMW blocks + §4. Do not ideate solutions, sketch UI, or rank opportunities with scores.
