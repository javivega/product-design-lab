---
name: design-directions
description: >-
  Formalise substantially different design directions for a JTBD from a collaborative thinking session — clear approaches with reasoning and trade-offs, in workshop-ready prose, not UI specs. Use when ideator Phase 3 (Develop directions) runs.
---

## Input

Per JTBD, prefer reading in this order:

1. `thinking.md` — shared understanding, emerging / discarded directions, designer contributions, ready_to_produce notes
2. `ideation.md` — In short (and any What we’re questioning already drafted)
3. Upstream `problems.md` / brief only to ground constraints and Unknowns — not to invent new solo ideas that skip the session

Read from disk — not from chat memory.

Enter this skill only when the Ideator has left Thinking mode (`ready_to_produce: yes`, or the designer explicitly asked to formalise).

## Output

**3–5 design directions** under that JTBD’s **Design directions** subsection in `ideation.md`, plus synthesis of **What we’re questioning**, **Ways into the problem**, and **How they relate** when those are still stubs.

### Voice

- Write like a design lead briefing a peer — not like filling a spreadsheet.
- Lead with a human direction name and a clear core idea in plain sentences.
- Prefer short paragraphs; use bold mini-labels sparingly, and only when they help skim.
- Approach altitude — what changes for the person or the work system.
- Examples are stories (“during an outage, they…”), not screen inventories.
- No arrow-chains for principles. No coded legends (`Evidence —` / `Unknown —`) unless woven into a normal sentence.
- When a direction grew from the designer’s reasoning, keep that logic visible in the prose (without dumping the transcript).

### Format (per direction)

Each direction gets its **own numbered heading** under `#### Design directions` (localise labels). Leave a blank line before the next direction. Do not merge several directions under one heading.

```markdown
##### Direction 1 — [Human direction name]

[2–4 sentences: what fundamentally changes, who it helps, and which difficulty or HMW it answers.]

For example: [one short scenario.]

Trade-off: [what improves vs what it costs.]

We’d need to learn / We already know / Still unknown: [one or two plain sentences.]

##### Direction 2 — [Human direction name]

[…]
```

If a design principle truly shaped the idea, add one sentence in natural language (not a formula chain).

Omit principles when they don’t change the idea.

### Distinctness test

If you removed the titles, would a designer still see different *approaches* (prevent vs repair, automate vs assist, change the job vs change the tool)? Rewrite clones.

### Synthesis rules

- Formalise branches that gained interest in `thinking.md`; do not silently resurrect discarded ones without reason.
- Prefer shared directions over fresh solo invention. If you must add a direction that did not appear in the session, mark why it completes the set and keep it rare.
- Do not expose raw chat or the full scratchpad in `ideation.md`.

### Examples

##### Direction 1 — Register at the dock when the network dies

Keep receiving recordable where the work happens. Sync can wait; capturing the movement should not. This answers the need to keep registering during an outage without falling back to paper.

For example: in an aisle outage, the operator finishes the pallet sequence; the work is stored and reconciled later instead of rewritten from a notebook.

Trade-off: better continuity, but harder conflict handling and trust if “saved but not synced” is unclear.

We already know paper is today’s fallback. Still unknown: which movements are safe to confirm locally, and how conflicts resolve when two docks edit the same stock offline.

##### Direction 2 — Only continue with what’s safe offline

Don’t pretend every receiving decision can happen without the network. Continue with the safe subset; leave risky changes clearly for later validation.

For example: arrival and scan are recorded now; an exception that rewrites stock waits for a supervisor once connectivity returns.

Trade-off: fewer unsafe decisions under pressure; may need a clear handoff afterward.

We’d need to learn which receiving decisions can wait. The brief already assumes offline continuity matters.

### Anti-patterns (do not write)

- Formalising directions before a thinking session (or inventing designer agreement)
- Form-like bullets for every field on every card when a short paragraph would do
- `Principle → reason → consequence` as a raw chain in the file
- “Addresses: HMW #2” instead of naming the difficulty in words
- Add a banner/card/modal on screen X
- Five directions that are the same idea with different nouns
- Treating an Unknown as a proven need
- Claiming sole AI authorship of an idea the designer contributed

### Rules

- 3–5 directions per JTBD.
- Each one clearly serves at least one HMW (say so in prose).
- Prefer fewer sharper directions over padding.
- Do not recommend or rank here — that is `direction-recommendation`.

## Principles

- Directions ≠ solutions.
- Shared thinking → formalisation.
- Readable beats schematic.
- Preserve uncertainty in plain language.

## Process

### Step 1 - Read the session

Take `thinking.md` plus In short / any reframes already agreed.

### Step 2 - Formalise distinct approaches

Turn promising shared branches into 3–5 directions in prose. Use Ways into the problem to name only angles that actually mattered.

### Step 3 - Distinctness and clarity pass

Drop clones. Replace schematic labels with sentences. Strip UI specs down to approach + example. Check designer attribution where relevant.

### Step 4 - Hand off

Return **Design directions** (and related synthesis subsections) for that JTBD. Do not write Worth exploring next here.
