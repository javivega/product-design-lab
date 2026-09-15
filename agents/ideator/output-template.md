# Ideator output templates

Reference shapes for files under `runs/<run-id>/`. Adapt section body copy to the documentation language. Structural headings below may stay in English or be localised consistently with `AGENT.md` Language rules.

These are **templates**, not rigid forms. Prefer workshop prose over labeled field dumps. Prefer clear section breaks over dense continuous text.

---

## `ideation.md` (user-facing synthesis)

Filled mainly in **Production** mode after Think together. Do not paste the full conversation or raw `thinking.md` here.

**Hierarchy (required for scanability):**

| Level | Use for |
| ----- | ------- |
| `##` | Document parts (1 Scope, 2 Ideation, 3 Cross-cutting, 4 Questions) |
| `###` | One JTBD (`JTBD N — title`) |
| `####` | Context · Design directions · Wrap-up inside a JTBD |
| `#####` | One design direction (`Direction N — name`) |
| `---` | Between JTBD blocks |

```markdown
# Design directions — [Project]

## 1. Scope and sources

[Which problem-framer (and brief) run; which JTBDs are in scope.]

## 2. Ideation by JTBD

---

### JTBD 1 — [Short job label]

#### Context

**In short**
[3–5 plain sentences: who, situation, difficulty, HMWs, constraints, unknowns.]

**What we’re questioning**
[Kept vs reframed — reflecting shared discussion.]

**Ways into the problem**
[2–4 short sentences: angles that mattered, in plain words.]

#### Design directions

##### Direction 1 — [Human direction name]

[Prose per design-directions skill — approach, example, trade-off, uncertainty.]

##### Direction 2 — [Human direction name]

[…]

##### Direction 3 — [Human direction name]

[…]

#### Wrap-up

**How they relate**
[Short paragraph, or “Keep these separate.”]

**Worth exploring next**
[1–2 short paragraphs: why, difference, what to learn next.]

---

### JTBD 2 — [Short job label]

#### Context
…

#### Design directions

##### Direction 1 — …
…

#### Wrap-up
…

## 3. Cross-cutting notes

[Patterns, conflicts, research gaps across jobs.]

## 4. Questions before experience design

Before detailed experience design, we still need to answer:

- [Plain, answerable question]?
- …
```

---

## `thinking.md` (collaborative scratchpad)

Living, lightweight, **not** a deliverable. Update during Thinking mode. Resume from this file — not from chat memory.

Prefer one `###` per JTBD when several jobs are in play, so the scratchpad stays scannable.

```markdown
# Thinking session

## Current focus
- JTBD: …
- HMWs in play: …
- Mode notes: …

---

### JTBD — [label]

#### Shared understanding
- Evidence we trust: …
- Assumptions / hypotheses: …
- Constraints: …
- Unknowns: …

#### Challenge & reframes
- …
- Designer: …
- Agent: …

#### Emerging directions
- [Name or sketch] — interest: high/med/low — source: designer / agent / both — why: …

#### Discarded / parked
- … — why: …

#### Tensions & open threads
- …

---

## Ready to produce?
- status: not yet | nearly | yes
- promising branches to formalise: …
- why ready / what’s still blocking: …
```

---

## Localised body headings (example: Spanish)

When the documentation language is Spanish, prefer:

| English | Spanish |
| ------- | ------- |
| Context | Contexto |
| Design directions | Direcciones de diseño |
| Direction N | Dirección N |
| Wrap-up | Cierre |
| In short | En resumen |
| What we’re questioning | Qué estamos cuestionando |
| Ways into the problem | Vías para entrar en el problema / Formas de entrar en el problema |
| How they relate | Cómo se relacionan |
| Worth exploring next | Merece explorar después / Merece exploración a continuación |

Keep the same heading levels (`###` / `####` / `#####`) and `---` between JTBDs.
