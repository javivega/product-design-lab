---
name: problem-exploration
description: >-
  Walk each JTBD from context through current behaviour, pain points, barriers, consequences, and existing alternatives. Mark missing steps Unknown. Fill the Problem exploration subsection inside each JTBD block in problems.md §2.
---

## Input

JTBD blocks from `problems.md` §2 (with Context already filled), plus the source brief (users, needs, assumption mapping, JTBDs, constraints, and any owner answers already captured).

Read those files from disk — not from chat memory.

## Output

Fill **Problem exploration** under each JTBD block in `problems.md` §2. Do not create a separate top-level explorations section.

### Voice

- Plain language. One idea per line.
- Write as if briefing a designer before a framing workshop.
- No IDs, codes, or analyst jargon in the user-facing lines (`P1`, “probe”, “residual”).
- Prefer short sentences over nested clauses.
- Lead with what we know; keep gaps visible.

### Labels

- **Known** behaviour or pain — we have evidence in the brief, assumption mapping, or a concrete owner story
- **Unknown** — we have no information; say what’s missing in one short *why*
- Do not invent current behaviour from a requested feature (“they need a dashboard” is not behaviour)

### Format

Inside each existing JTBD block, fill:

```markdown
**Problem exploration**

**Current behaviour**
- [What they do today.]
  *Why we say so:* [One short evidence line.]
- Unknown: [What we don’t know about current behaviour.]
  *Why:* [What’s missing.]

**Pain points**
- [The difficulty they feel or hit.]
  *Why we say so:* [Evidence or “assumption — …”]

**Barriers**
- [What blocks doing the job well.]
  *Why we say so:* […]

**Consequences**
- [What happens if the job stays hard — for the user, then the operation if evidenced.]
  *Why we say so:* […]

**Existing alternatives**
- [Workarounds, tools, or people they use today.]
  *Why we say so:* […]
- Unknown: [If none are documented.]
  *Why:* […]
```

Leave **JTBD**, **Context**, and **HMW questions** alone (other phases own those). Skip empty groups only when the whole group would be empty *and* there is no Unknown to record.

### Examples

**Current behaviour**
- When Wi-Fi drops during receiving, the team writes movements on paper and keys them in later.
  *Why we say so:* The briefing owner described the last outage that way.
- Unknown: How supervisors decide which incidents to handle first during a peak.
  *Why:* The brief asks for a panel, but does not describe today’s triage.

**Pain points**
- Operators lose the thread between paper notes and the system after an outage.
  *Why we say so:* Paper was the fallback; the brief reports stock errors and latency, not a measured error rate.

### Anti-patterns (do not write)

- They currently lack a real-time dashboard. (Feature gap, not behaviour.)
- Users need guided picking so they don’t make mistakes. (Solution as pain.)
- Current behaviour: they will scan codes with Zebra readers. (Future requirement, not today’s work.)
- Pain: the company must cut errors by 80%. (Business goal, not a user difficulty.)

### Rules

- Walk the full chain for every in-scope JTBD. Do not skip a step silently.
- If a step is not evidenced, mark it **Unknown** with a short *why*.
- Never fill current behaviour, pain, barriers, consequences, or alternatives from a feature list.
- Distinguish evidence from interpretation on every line (`*Why we say so:*` or `*Why:*`).
- One claim per bullet; split compound stories.
- Carry Constraints and mapping items from the JTBD’s Context — don’t contradict them, don’t invent new ones.
- Do not score, rank, propose solutions, or write How Might We here.

## Principles

- Never present an assumption as a fact.
- Distinguish evidence from interpretation or opinion.
- Do not invent current behaviour, pain, or alternatives.
- Prefer a clear Unknown over a padded story.
- Designer-readable beats exhaustive.

## Process

### Step 1 - Take the context

Read each JTBD block’s Context from `problems.md` §2 and the matching brief sections. Do not rebuild the job from memory.

### Step 2 - Walk the chain

For each JTBD, fill Problem exploration:

Current behaviour → Pain points → Barriers → Consequences → Existing alternatives

Use only what the documents (and already-captured owner answers) support.

### Step 3 - Mark gaps

Where the brief is silent, write **Unknown** plus why. Pull those gaps forward as candidates for `problems.md` §4 (questions before solutions).

### Step 4 - Hand off

Return updated JTBD blocks for `problems.md` §2. Do not frame problems or write How Might We statements here — that is later phases.
