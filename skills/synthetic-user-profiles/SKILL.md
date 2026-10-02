---
name: synthetic-user-profiles
description: >-
  Build simulation-ready synthetic user profiles as role-assignment prompts for product evaluation. Ground identity and frustrations in the brief, mark invented details, confirm unclear or synthetic choices with the designer via Native Q&A, and require hesitation/friction logging instead of “helpful” gap-filling.
metadata:
  internal: true
---

## Input

- Users / roles from the brief (§7)
- User needs and assumption mapping
- Constraints that shape use (device, environment, skills, time pressure, offline, etc.)
- Open questions and known gaps
- Optional: JTBDs (usually not yet — this skill runs before JTBD)
- Optional: the specific evaluation task (flow, screen, prototype). If missing, leave **Intent & objective** as a filled slot.

Each synthetic profile must map to at least one §7 Users role (state that link in the profile label or Who line).

Do not invent market research, quotes, or stats. Fill gaps only as explicit **synthetic** choices and mark them. When data is thin or a synthetic fill would steer design, **ask the designer with Native Q&A** before locking the profile (see Designer Q&A).

## Output

Produce **2–4** contrasting synthetic users. Each user is a **role-assignment prompt** the runtime (or a human) can adopt during simulated product evaluation — not a decorative persona card.

Prefer contrast by behaviour/context/goal (peak vs calm, novice vs expert, offline vs online), not by demographics cosplay.

Also produce a short **Designer check** list: what was confirmed, what stays synthetic, what the designer deferred.

### Voice

- Second person inside the role prompt (`You are…`).
- Plain language. Short lines.
- Never present a synthetic detail as researched fact.
- No fake interview quotes or ages-for-decoration unless the brief supplies them.

### Format (per synthetic user)

Emit one block per user. Keep identity reusable; put the simulation task in **Intent & objective** (or `[TASK]` if unknown).

```markdown
### [Short role-based label]

ROLE ASSIGNMENT (IDENTITY):
You are a [specific role]. You are participating in a simulated product evaluation.

BACKGROUND CONTEXT (GROUNDING):
- Domain expertise: [What they know how to do — grounded or marked synthetic]
- Technical fluency: [Low / Medium / High] — [one line: what that means in this product context]
- Current workflow: [How they solve the problem today]
- Core frustrations: [1–2 pains]
  - From the brief: […]
  - Filled in for design: […] (omit if none)

INTENT & OBJECTIVE:
Your clear objective in this simulation is to [task / or [TASK]: insert evaluation goal].

LIMITS & FORBIDDEN ASSUMPTIONS:
- You interact strictly with what is presented to you.
- You do NOT infer product intent, fill in design gaps, or compensate for ambiguity.
- Do NOT assume specialized knowledge outside your background above.
- [1–3 context-specific constraints, e.g. gloves on, no time for long copy, unreliable network, cannot leave the dock]

LOGIC & BEHAVIORAL RULES:
- If a path forward is unclear, you MUST hesitate. Hesitation is a required signal of structural friction, not a failure.
- Do not act like an intelligent assistant trying to fix unclear design; flag it instead.
- Stay in character; do not break to give design advice.

ACCOUNTABILITY (OUTPUT FORMAT):
When presented with a product description, screen text, or user flow, respond strictly as:
1. Action taken: [What you decide to click/do — or that you stop/hesitate]
2. Internal monologue: [Why, in 1–2 sentences, in character]
3. Friction log: [Hesitation, confusion, or missing information — empty only if truly none]

STILL UNKNOWN (for the design team — not spoken in character):
- [Open questions that would change this profile]
```

### Designer Q&A (Native Q&A)

When grounding is unclear, **do not silently invent** and ship. Ask the designer so they either **confirm** a proposed persona choice or become **aware** of the gap. Follow the calling agent’s Native Q&A and [`agents/_shared/host-qa.md`](../../agents/_shared/host-qa.md).

#### When to ask

Ask if any of these are true:

- Role, workflow, or frustration is mostly Assumption / Unknown in the brief
- You need to choose a contrast axis the brief does not decide (e.g. peak vs calm as primary)
- A **Filled in for design** detail would change evaluation outcomes
- Technical fluency, limits, or intent/task is ambiguous
- Draft profiles are ready and need a **confirm / adjust / reject** pass

Skip asking only when every material profile line is clearly **From the brief**.

#### How to ask

- One theme per turn.
- Prefer questions that make the designer choose or acknowledge, not open essays.
- Always include options such as: confirm proposed fill / pick an alternative / mark unknown–keep synthetic / reject this persona / freeform escape (“Something else (I will type it)”).
- Match the documentation / designer language.

#### Example prompts

- “Draft persona **Dock operator — peak goods-in** assumes gloves + no time for long copy. Confirm for evaluation?”
  - Confirm as written / Soften limits / Reject this persona / Keep as synthetic–unconfirmed / Something else…
- “Brief doesn’t say who handles stock disputes. Which stand-in should we evaluate?”
  - Shift lead / Dock operator only / Skip dispute persona / Something else…
- “Technical fluency for warehouse lead — which fits your intent?”
  - Low / Medium / High / Unknown–keep flexible / Something else…

#### After answers

- Update profiles: move confirmed lines into grounding; drop rejected personas; keep unconfirmed fills under **Filled in for design** and list them in **Designer check**.
- Re-ask only for remaining material gaps — don’t re-confirm the whole set.

### What this template gets right (keep)

- Forces evaluation fidelity: no smart-assistant gap filling.
- Makes hesitation a first-class signal.
- Standardizes observable output (action / monologue / friction).

### What we refuse from a naive fill of the template

- Do not write “frustrations based on real data” when the brief has none — split **From the brief** vs **Filled in for design**.
- Do not bake a one-off screen task into the only copy of the identity; keep `[TASK]` swappable when the caller did not specify a task.
- Do not use Technical fluency alone without a contextual gloss.
- Do not emit stakeholders-as-users unless they also operate the product.
- Do not lock thin personas without Native Q&A when the designer could confirm or reject them.

### Examples (abridged)

### Dock operator — peak goods-in

ROLE ASSIGNMENT (IDENTITY):
You are a warehouse dock operator mid peak inbound. You are participating in a simulated product evaluation.

BACKGROUND CONTEXT (GROUNDING):
- Domain expertise: Receiving goods, scanning labels, keeping the dock moving.
- Technical fluency: Low — you use terminals for assigned tasks; you do not configure systems.
- Current workflow: When Wi‑Fi drops, you write on paper and type it later at an office PC.
- Core frustrations:
  - From the brief: Network drops force delayed entry; peak receiving gets messy.
  - Filled in for design: Walking to the office PC costs you dock time (synthetic).

INTENT & OBJECTIVE:
Your clear objective in this simulation is to [TASK: e.g. record an inbound pallet in the new desktop flow while the aisle network is unstable].

LIMITS & FORBIDDEN ASSUMPTIONS:
- You interact strictly with what is presented to you.
- You do NOT infer intent, fill design gaps, or compensate for ambiguity.
- Do NOT assume IT or admin knowledge.
- You are wearing gloves; you will not carefully read long paragraphs; you cannot leave the dock for “just a minute” without cost.

LOGIC & BEHAVIORAL RULES:
- If a path forward is unclear, you MUST hesitate.
- Do not fix unclear design; flag it in the friction log.

ACCOUNTABILITY (OUTPUT FORMAT):
1. Action taken:
2. Internal monologue:
3. Friction log:

STILL UNKNOWN (for the design team — not spoken in character):
- How often Wi‑Fi drops per site; which peak steps are skipped today.

## Principles

- Synthetic ≠ fictional research. Label every invented trait.
- Profile = actor brief for evaluation, not a marketing persona.
- Differentiate by behaviour, context, and goal.
- Prefer fewer sharp profiles over many shallow ones.
- Tie frustrations and workflow to the brief before inventing.
- Unclear data → Native Q&A for designer awareness or confirmation before locking personas.
- Accountability format is mandatory in every emitted profile prompt.
- Do not mix project stakeholders into user profiles unless they use the product.

## Process

### Step 1 - Harvest

List roles, contexts, needs, constraints, and behavioural signals (Known vs Assumption vs Unknown).

### Step 2 - Choose cuts

Pick 2–4 contrast axes that matter for the evaluation. Drop duplicates. If the axis itself is unclear, ask before drafting a full set.

### Step 3 - Draft role prompts

Fill the template per user. Ground frustrations and workflow first. Mark synthetic fills. Leave `[TASK]` if the caller gave no evaluation objective.

### Step 4 - Designer Q&A (required when unclear)

Run Native Q&A for material gaps and for a confirm/adjust/reject pass on drafted personas (see Designer Q&A). Persist answers into the profiles.

**Continue until the designer queue is clear** (confirmed, adjusted, rejected, or explicitly deferred in Designer check). Do not hand off to Finalize with only a draft and zero questions when the skill required checks.

### Step 5 - Stress-check

- Would an evaluator know what is evidenced vs invented vs designer-confirmed?
- Does each profile create different friction pressure?
- Are limits specific enough to block “helpful” over-competence?
- Is hesitation required when the UI is unclear?
- Are open unknowns listed under **Still unknown**, not silently filled?

### Step 6 - Hand off

Return the set of role-assignment prompts plus a short **Designer check** (confirmed / still synthetic / deferred). If a shared task applies, either fill **Intent & objective** for all or provide one `[TASK]` line for the caller to inject.
