---
name: assumption-mapping
description: >-
  Classify user needs and related claims as Known, Assumption, Unknown, or Contradiction based on evidence in the source documents. Write them in plain language a product designer can skim. Use when structuring brief section 8.
metadata:
  internal: true
---

## Input

User needs and related claims about users, problems, or behaviour extracted from briefs, research notes, RFPs, product docs, or conversation.

## Output

A short **Assumption mapping** section for product designers — not an audit log.

### Voice

- Plain language. One idea per line.
- Write as if briefing a designer before a workshop.
- No IDs, codes, or analyst jargon in the user-facing lines (`N1`, “probe”, “residual”, “owner (date)”).
- Prefer short sentences over nested clauses.
- Group by label so the eye can scan: Known → Assumptions → Unknowns → Conflicts.

### Labels

- **Known** — we have evidence in the documents (or a concrete story from the briefing owner)
- **Assumption** — it appears in the docs, but without evidence
- **Unknown** — we have no information
- **Conflict** — two statements disagree (prefer “Conflict” over “Contradiction” in the brief)

### Format

Under section 8, after a short list of user needs in everyday language:

```markdown
### Assumption mapping

**Known**
- [Belief in plain language.]
  *Why we say so:* [One short evidence line.]

**Assumptions**
- [Belief in plain language.]
  *Why it’s an assumption:* [What the doc says vs what it doesn’t prove.]

**Unknowns**
- [What we don’t know, as a clear gap.]
  *Why:* [What’s missing from the docs.]

**Conflicts**
- [The tension in plain language.]
  *Why:* [The two clashing claims, briefly.]
```

### Examples

**Known**
- People drop off before paying.
  *Why we say so:* Analytics in the brief show 38% cart abandonment between cart and payment last quarter.

**Assumptions**
- Long process time is a main reason people drop off.
  *Why it’s an assumption:* The brief mentions drop-off, but doesn’t link it to duration.
- Users prefer self-service over talking to someone.
  *Why it’s an assumption:* The RFP pushes self-service as the main path, with no research on channel preference.

**Unknowns**
- What makes someone start this task in the first place.
  *Why:* Docs describe the in-product flow, not the trigger or context before it.
- Whether mobile is required for v1.
  *Why:* Desktop is specified in detail; mobile is never in or out of scope.

**Conflicts**
- Guided steps for new users vs a fast path for experts — both are written as must-haves.
  *Why:* One section demands step-by-step guidance; another demands finishing in under two minutes with minimal UI.

### Rules

- Lead with the belief; keep evidence to one short supporting line.
- Never invent data.
- List Assumptions, Unknowns, and Conflicts first in priority of attention; add Known only when it stops a belief being mistaken for a fact.
- Skip empty groups.
- Do not build matrices, scores, or experiment plans here.

## Principles

- Never present an assumption as a fact.
- Distinguish evidence from interpretation or opinion.
- One belief per bullet; split compound claims.
- Prefer a clear Unknown over a padded Assumption.
- Designer-readable beats exhaustive.

## Process

### Step 1 - Extract

Pull user needs and success-critical claims. Phrase each as a single clear belief in everyday language.

### Step 2 - Classify

Assign Known / Assumption / Unknown / Conflict using only what is in the documents (and owner answers, when already captured).

### Step 3 - Write for designers

Rewrite into the grouped format above. Cut robotic phrasing (“appears in the document but without evidence” → say what’s missing in human terms).

### Step 4 - Hand off

Return the section for brief §8. Also list the biggest Unknowns/Conflicts as candidates for open questions (§10).
