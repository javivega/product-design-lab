---
name: information-architecture
description: >-
  Define experience structure and solution-area concepts for chosen design directions — conceptual places and relationships, not a 1:1 screen list or wireframes. Use when ux-designer Phases 3–4 run.
metadata:
  internal: true
---

## Input

From `experience.md` (and linked ideation / problems):

- Chosen paths (per JTBD)
- Expected behaviour
- UX principles in play (if already written)
- Constraints and Unknowns that affect where work happens

Read from disk — not from chat memory.

## Output

1. Per JTBD: **Experience structure** (conceptual areas / concepts)
2. Contributions to **§3 Solution architecture** (product areas, entities, relationships, cross-cutting states, navigation model as relationships)

Do **not** produce the screen inventory here — that is owned by the UX Designer agent in Phase 5. Do not equate every concept with a screen.

### Voice

- Name concepts as a designer would in a workshop (“Dock receiving”, “Pending sync”, “Exception review”) — not route paths or component names.
- One short gloss when the name isn’t enough.
- Include system conditions as **concepts** when they change what the user can do; whether they become screens or states is decided later in screen architecture.
- Navigation model: entry points, destinations, returns, handoffs — **not** sidebar / tabs / bottom nav.

### Format — Experience structure (per JTBD)

```markdown
#### Experience structure

- **[Concept / area]** — [one-line purpose]
- **[Concept / area]** — …
- **Sequence / relationships:** [how these concepts connect for the job]
```

### Format — Solution architecture contributions (§3)

```markdown
## 3. Solution architecture

### Product areas
- **[Area]** — [supported JTBDs / purpose]

### Core entities / concepts
- …

### Relationships
- …

### Cross-cutting states
- …

### Navigation model
- **Entries:** …
- **Destinations:** …
- **Returns / resume:** …
- **Cross-JTBD transitions:** …
```

Keep shallow unless the directions require more. Prefer fewer honest concepts over a fake full product map. Architecture must emerge from JTBDs and directions — never copy a stock template (dashboard, settings, profile…) unless required.

### Anti-patterns

- Listing every future screen as if concepts = screens
- “Home / Dashboard / Settings” boilerplate unrelated to the path
- Component names (Modal, TabBar, Card)
- Layout or navigation chrome specs
- Inventing places that contradict chosen directions
- Visual or pixel-level instructions

### Rules

- Scope experience structure to each JTBD’s chosen path; leave other JTBD blocks untouched when editing one.
- Name shared concepts consistently across JTBD blocks when the same concept appears.
- Mark uncertain concepts lightly or push to Questions before UI.
- Do not write user flows here — that is `user-flows`.
- Do not write full screen inventory fields here — agent Phase 5.

## Principles

- Experience structure ≠ screen inventory.
- Concepts serve behaviour.
- Solution areas emerge from jobs, not conventions.
- Shallow and useful beats encyclopaedic.

## Process

### Step 1 - Read behaviour

Extract concepts implied by expected behaviour and the direction.

### Step 2 - Cluster

Group into conceptual areas per JTBD; note cross-cutting states.

### Step 3 - Relate (solution level)

Propose product areas and navigation relationships across jobs.

### Step 4 - Hand off

Return experience structure (+ §3 contributions). Leave screen boundaries and flows to the agent / `user-flows`.
