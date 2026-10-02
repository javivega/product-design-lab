---
name: problem-framing
description: >-
  Rewrite JTBD problem explorations into neutral, solution-free design problems a product designer can take into a workshop. Use when writing problems.md section 3 (framed problems rollup).
---

## Input

JTBD blocks from `problems.md` §2 (Context + Problem exploration filled). Read them from disk — not from chat memory.

## Output

A short **Framed problems** list for product designers — not an audit log. Embed into `problems.md` section 3.

### Voice

- Plain language. One difficulty per statement.
- Write as if pinning problems on a wall before ideation.
- No IDs, codes, or analyst jargon in the user-facing lines (`P1`, “HMW-ready”, “insight”).
- User or situation first — never the product.

### What a framed problem is

A framed problem names **who struggles**, **with what**, in **which situation** — without naming a solution.

- Neutral: no pitch, no feature, no UI.
- Traceable: each statement maps back to at least one JTBD exploration in §2.
- Bounded: one difficulty per line; split compound claims.
- User/design problem — not a restated business KPI.

### Format

```markdown
## 3. Framed problems

- [Who] [struggle in the situation] [the difficulty], so [consequence in human terms — optional, only if evidenced].
  *From:* [short job label].
- …
```

Keep the list short. Merge duplicates across JTBDs. Do not number problems. Do not attach How Might We here — HMWs live under each JTBD in §2.

### Examples

**Yes**
- Operators struggle to identify which orders need priority attention.
- Dock operators lose the link between paper notes and the system after a Wi-Fi drop.
- During a peak, operators drop control steps to finish faster, then reconstruct the record afterwards.

**No**
- We need a dashboard.
- The app should show priority orders in red.
- Reduce manual entry errors by 80%.

### Rules

- User/situation, not product.
- No named UI or feature as the problem.
- One difficulty per statement.
- Traceable to a JTBD exploration in §2 — if you cannot point to one, don’t write the problem.
- Merge duplicates. Do not explode every JTBD into ten problems.
- Do not relabel a business goal as a user problem unless the exploration shows the user difficulty.
- If a statement would require inventing current behaviour, leave it out and keep the gap for §4 (or Native Q&A per the agent).
- Skip empty hero statements (“operations are hard”). Be specific.

## Principles

- Frame problems, don’t propose solutions.
- Never present an assumption as a fact.
- One problem = one difficulty; split compound claims.
- Separate business problems from user/design problems.
- Designer-readable beats exhaustive.

## Process

### Step 1 - Read explorations

Take each **Problem exploration** in `problems.md` §2. Note evidenced pains, barriers, and consequences. Ignore feature requests.

### Step 2 - Draft

Write one neutral problem per distinct difficulty. Name the people and the situation. Tag *From:* with the job label.

### Step 3 - Filter

Reject solution-shaped lines. Merge near-duplicates. Drop business KPIs that have no user difficulty underneath. Drop anything that is only Unknown — those belong in §4, not as fake problems.

### Step 4 - Hand off

Return the list for `problems.md` §3. Do not write How Might We statements here — that is opportunity mapping (under each JTBD).
