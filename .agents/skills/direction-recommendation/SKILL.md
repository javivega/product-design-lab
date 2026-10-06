---
name: direction-recommendation
description: >-
  Qualitatively evaluate design directions for a JTBD and recommend 1–2 worth taking into experience design, written as clear prose with what to learn next. Use when ideator Phases 4–5 (Evaluate + Recommend) run.
---

## Input

Per JTBD from `ideation.md` (and context from `thinking.md` when useful):

- In short, What we’re questioning, Ways into the problem
- Design directions (3–5) — already synthesised from the collaborative session
- How they relate
- Upstream Unknowns / constraints from `problems.md` (and brief if linked)
- Which branches the designer pushed forward or parked (from `thinking.md`)

Read from disk — not from chat memory.

## Output

1. **Worth exploring next** under that JTBD (1–2 directions)
2. Contributions to **§3 Cross-cutting notes** and **§4 Questions before experience design** when patterns span jobs

### Voice

- Plain, decisive, humble — picks for exploration, not final decisions.
- Short paragraphs a designer can read aloud in a critique.
- No fake scores, no “Test next: / Downstream:” stamp on every line.
- Tie the pick to the difficulty, to evidence strength, and to what the designer cared about in the session when that is known.

### Evaluation (keep in notes or weave lightly into prose)

Weigh qualitatively: user value, business alignment, evidence strength, feasibility, complexity, risk, accessibility, side effects, distinctness, alignment with shared thinking.

Do **not** invent percentages or 1–10 matrices.

Do **not** treat the collaborative session as user research validation — designer judgement ≠ evidence.

### Format — Worth exploring next

```markdown
**Worth exploring next**

**[Direction name].** [Why it deserves exploration in 2–3 sentences — link to the real difficulty and what makes it different from the others.] [What we should learn or decide before committing further.]

**[Optional second direction].** [Same shape.]

[Optional:] We’re not advancing **[name]** for now because [one plain reason].
```

### Format — Questions before experience design (agent §4)

```markdown
## 4. Questions before experience design

Before detailed experience design, we still need to answer:

- [Plain, answerable question]?
- …
```

### Example

**Worth exploring next**

**Register at the dock when the network dies.** It attacks the confirmed paper workaround and changes where the record lives during a failure, not only how we notify people. Before going further, we should learn how operators understand “saved” vs “synced,” and what conflicts appear on reconnect.

**Only continue with what’s safe offline.** It pairs with continuity by refusing to hide risky decisions. Next, classify which receiving data and exceptions can wait under real warehouse rules.

We’re not advancing a full process redesign yet — the org cost is high before outage behaviour is better measured.

### Anti-patterns (do not write)

- Ranked tables with made-up scores
- “Recommend all five equally”
- Picks justified only by a business KPI with no user difficulty
- Next steps that are already UI specs
- `Prueba siguiente:` / `Siguiente diseño:` / `Test next:` / `Downstream:` as a mandatory template
- Treating Unknowns as validated evidence
- Treating “we agreed in the session” as proof users behave that way
- Recommending a discarded branch without acknowledging why it was parked

### Rules

- **1–2** recommendations per JTBD.
- Each maps to at least one HMW (or an explicit reframe).
- Say what to learn or decide next in normal sentences.
- Call out thin evidence honestly.
- Do not redesign directions here — evaluate and select.
- Prefer picks that match what gained interest in the thinking session unless evaluation reveals a clear conflict (then say so).

## Principles

- Recommendation ≠ final design decision.
- Honest uncertainty over false precision.
- Readable beats schematic.
- Keep the link to the problem, HMW, and shared thinking.

## Process

### Step 1 - Evaluate

Read all directions and relevant `thinking.md` notes. Note killers (no user value, pure chrome, Unknowns stated as facts).

### Step 2 - Select

Pick 1–2 that best open useful exploration. If picking two, prefer distinct approaches. Weight designer interest from the session without treating it as research evidence.

### Step 3 - Write

Fill **Worth exploring next** and lift critical open questions into §4 in plain language.

### Step 4 - Hand off

Return the Recommend block (+ §3/§4 contributions). Do not generate new directions here.
