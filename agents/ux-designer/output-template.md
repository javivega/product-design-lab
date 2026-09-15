# UX Designer output templates

Reference shapes for files under `runs/<run-id>/`. Localise body copy to the documentation language. Prefer workshop prose over forms.

**Default:** one experience block **per in-scope JTBD**, plus solution architecture, screen inventory, and critical scenarios.

Screens are **architectural surfaces**. Do not specify layout, components, colours, typography, spacing, or visual hierarchy.

---

## `experience.md`

```markdown
# Experience design — [Project]

## 1. Scope and sources

[Ideator run (and problems/brief). Which JTBDs are in scope.
Experience + solution + screen architecture + critical scenarios — not visual UI.]

## 2. Experience by JTBD

---

### JTBD 1 — [Short job label]

#### Chosen path
- **Direction:** …
- **Why:** …

#### Expected behaviour
[…]

#### UX principles in play
[…]

#### Experience structure
[Concepts / areas — not screens]

#### Screen architecture
[Surfaces; state vs separate screen]

#### User flow
[screen/state → action → system response → new state → next]

#### Critical scenarios
[1–3 situations — or “primary flow only”]

---

### JTBD N — …

## 3. Solution architecture

### Product areas
### Core entities / concepts
### Relationships
### Cross-cutting states
### Navigation model

## 4. Screen inventory

### [Screen name]
- **Purpose:** …
- **Primary user:** …
- **Supports:** …
- **Entry points:** …
- **Exit points:** …
- **Information required:** …
- **Primary actions:** …
- **Secondary actions:** …
- **States:** …
- **Related screens:** …
- **Open questions:** …

## 5. Critical scenarios

### [Scenario name]
- **JTBD:** …
- **Context:** …
- **Goal:** …
- **Relevant states:** …
- **Screens involved:** …
- **Outcome:** …
- **Why critical:** …

## 6. Cross-screen experience

[Shared screens, entities, states, queues, handoffs — or “None yet.”]

## 7. Questions before UI / prototype

- …
```

### Spanish heading map (example)

| English | Spanish |
| ------- | ------- |
| Scope and sources | Alcance y fuentes |
| Experience by JTBD | Experiencia por JTBD |
| Chosen path | Camino elegido |
| Expected behaviour | Comportamiento esperado |
| UX principles in play | Principios UX en juego |
| Experience structure | Estructura de experiencia |
| Screen architecture | Arquitectura de pantallas |
| User flow | Flujo de usuario |
| Critical scenarios | Escenarios críticos |
| Solution architecture | Arquitectura de la solución |
| Screen inventory | Inventario de pantallas |
| Cross-screen experience | Experiencia entre pantallas |
| Questions before UI / prototype | Preguntas antes de UI / prototipo |

Keep hierarchy: `###` JTBD → `####` subsections; `---` between JTBDs.
