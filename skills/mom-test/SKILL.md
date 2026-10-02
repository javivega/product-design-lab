---
name: mom-test
description: >-
  Turn Assumptions, Unknowns, and Conflicts into Mom Test–safe questions a product designer can use — plus a clear Open questions list. Ask live questions via Native Q&A (host-qa.md).
metadata:
  internal: true
---

## Input

Assumption mapping items (especially Assumptions, Unknowns, and Conflicts), plus brief context about users, problems, and behaviour.

## Output

Write into brief section 10:

1. **Questions for the briefing owner** — Mom Test questions (past behaviour, specifics)
2. **Open questions** — what remains unanswered for design / research after (or instead of) owner answers

Also run live questioning via **Native Q&A** during Phase 5.

### Voice

- Conversational, short, human — like notes a designer would take into an interview.
- No “Probes:”, “N1 —”, strikethrough answer archaeology, or status badges in the final brief.
- One clear question per bullet. No stacked sub-clauses.
- Open questions should read as design/research prompts, not runtime tickets.

### Format

```markdown
## 10. Questions

### For the briefing owner (Mom Test)

About [topic in plain language]
- [Past-behaviour question]?
- [Specifics / frequency / workaround question]?

About [next topic]
- …

### Open questions

For design and research — still unanswered:
- [Clear open question]?
- [Clear open question]?
```

After answers arrive, **update the brief**: fold useful answers into §§7–9 and assumption mapping; remove resolved owner questions; keep or add **Open questions** for what is still unknown.

Do not leave section 10 as a graveyard of answered/strikethrough items.

### Examples — Mom Test

About drop-off and process length
- Walk me through the last time someone abandoned this process — what happened step by step?
- Where did they stop, and what made them stop then?
- How often has that happened in the last month?

About self-service vs assisted help
- Last time you needed help with this, which channel did you actually use?
- What did you try before contacting support?

About starting the task
- What was going on the last time you started this task?
- What had to be true before you began?

### Examples — Open questions

- How long does the libreta → office delay usually last when Wi‑Fi drops?
- Who corrects stock errors today, and how often?
- In a busy goods-in peak, which steps get skipped or done outside the system — and why?
- Should v1 enforce a strict guided flow in receiving, or allow a faster peak mode?
- When two stations disagree on stock offline, should the product follow “first who asks”, keep the phone call, or require system sync first?

### Anti-patterns (do not ask)

- Would you use a faster checkout?
- Do you think drop-off is caused by process length?
- Is self-service important to you?
- Would your team adopt this if we built it?

### Native Q&A (runtime)

Phase 5 **must** ask the human. Follow the calling agent’s **Native Q&A** section and [`agents/_shared/host-qa.md`](../../agents/_shared/host-qa.md).

- Write §10 first, then ask the next unanswered *owner* question (one per turn).
- After each answer: update `brief.md` (needs, mapping, JTBDs, open questions) before the next question.
- Move leftovers the owner can’t answer into **Open questions**.

## Principles

- Talk about their life, not your idea.
- Ask about the past, not the future.
- Ask for specifics (“last time…”) over generics (“usually…”).
- Dig into problems and behaviour; don’t seek validation of the solution.
- Open questions are first-class output — always present if anything material is still unknown.
- File list ≠ asking. Native Q&A is how live interaction happens.

## Process

### Step 1 - Select

Take Assumptions, Unknowns, and Conflicts from assumption mapping.

### Step 2 - Split

- What can the briefing owner answer now? → Mom Test (owner) questions  
- What needs users, data, or a product decision later? → Open questions  

### Step 3 - Write

Draft 2–3 Mom Test questions per theme (not per jargon ID). Draft open questions as a clean backlog for the design team.

### Step 4 - Ask (required)

Ask the next unanswered owner question per `host-qa.md` (never `CallDynamicTool` / MCP for the picker). Do not invent owner answers.

**Continue until the owner queue is empty:** after each answer, update the brief, then ask the next unanswered owner bullet/theme. Do not stop after the first probe. Do not hand off to JTBD or later phases while owner questions remain open (unless the designer explicitly defers that item to Open questions / research).

Persist answers into the brief; grow/shrink **Open questions** accordingly.

### Step 5 - Hand off

Section 10 should stay readable: current owner questions (if any still open) + open questions. No answered clutter.
