---
name: user-flows
description: >-
  Write user flows for chosen design directions through screens and states — steps, decisions, system responses, and exceptions at behaviour altitude. Use when ux-designer Phase 6 runs.
metadata:
  internal: true
---

## Input

Per JTBD from `experience.md`:

- Chosen path
- Expected behaviour
- UX principles in play
- Experience structure
- Screen architecture (for this JTBD)
- Screen inventory (§4) when available

Plus Unknowns / constraints from problems or ideation when relevant.

Read from disk — not from chat memory. Produce one flow **per JTBD block**.

## Output

**User flow** under that JTBD: primary path + critical exception branches, expressed as movement through **screens/states**.

### Voice

- Numbered steps a designer can walk in a critique.
- Shape: user goal → screen/state → action → system response → next screen/state → decision when needed.
- Each step: who acts (user role or system) and what happens.
- Name screens/states that exist in the architecture.
- Exceptions named and short — not a second novel.
- No layout, components, colours, or “tap the blue button”.

### Format

```markdown
#### User flow

##### Primary

1. **[Step name]** — On **[Screen]** ([state if relevant]): [Actor] [what happens]
2. **[Step name]** — …
3. **Decision:** [question]
   - If [A] → **[Screen]** ([state]) …
   - If [B] → …
4. …

##### Critical exceptions

###### [Exception name]

- **Trigger:** …
- **Flow:** [short steps through screens/states]
- **Resume / handoff:** …
```

Include at least one exception or decision when the direction implies risk (offline, conflict, permission, incomplete data). If truly linear and safe, say so once and keep a single primary path.

Prefer:

```text
Screen / state → User action → System response → New state → Next screen / state
```

so a Prototyper can later simulate consequences — still without layout or components.

### Alignment

- Every major step should reference a screen/state from screen architecture / inventory (or an explicit transition).
- If the flow needs a screen that does not exist → stop and patch architecture (or rephrase the step); do not invent silent screens.
- If a screen in inventory is never reached by any meaningful flow → flag for removal or justification in notes / cross-screen section.
- Reflect principles already claimed (e.g. status visibility must appear when status is checked or revealed).
- Do not invent resolved rules for Unknowns — branch with “if unknown / needs policy” or list in Questions before UI.

### Anti-patterns

- Wireframe walkthroughs
- Component-level interaction specs
- Happy path only when the direction is about failure, trust, or exceptions
- Fake precision on sync/conflict rules
- Flow that ignores the chosen direction
- Treating every experience-structure concept as a mandatory screen hop

### Rules

- One primary flow **per JTBD** for its chosen path.
- Critical exceptions only — not every edge case in the warehouse.
- Stay consistent with that JTBD’s behaviour, experience structure, and screen architecture.
- Do not overwrite other JTBD blocks.
- Patch screen architecture / inventory briefly when a gap is found, and note it.

## Principles

- Flow = behaviour over time through architectural surfaces.
- Decisions and failures are first-class.
- Behaviour altitude — UI Designer still owns interaction and visual design.

## Process

### Step 1 - Walk the behaviour

Turn expected behaviour into ordered steps against screen architecture.

### Step 2 - Fork

Add decisions and exceptions the direction requires.

### Step 3 - Consistency pass

Check principles, inventory screens/states, and Unknowns. Fix orphans and missing references.

### Step 4 - Hand off

Return the User flow. Leave Questions before UI and cross-screen synthesis to the agent finalize phases (may contribute candidates).
