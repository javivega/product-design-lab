---
name: design-system
description: >-
  Establish a token-driven design system — brand → primitives → semantic tokens → scales → components → patterns — for UI Designer Phase 2. Use when defining or refining theme tokens without hardcoding colours into screens.
metadata:
  internal: true
---

## Input

From `ui.md` / UX / brief:

- Brand colours if known (primary, optional secondary, neutral)
- Product context (e.g. industrial density vs marketing sparsity)
- UX states that need semantic expression (offline, pending, error…)
- Existing provisional tokens if refining mid-run

Read from disk — not from chat memory.

## Output

**§2 Design system** in `ui.md` (and updates when screens reveal new patterns/tokens).

### Dependency direction (mandatory)

```text
Brand colours
  → Primitives (raw, no UI meaning)
  → Semantic tokens (purpose)
  → Scales (typography, spacing, radius, sizing, breakpoints)
  → Components (prefer shadcn/ui)
  → Patterns
  → Screens
```

Do **not** use a parallel “device” family next to colour semantics. Responsive behaviour belongs in **scales**.

Components and screens must reference **semantic** token names, never raw primitive steps (`primary-500`) or one-off hex in specs.

### Primitives

Brand-led raw values (omit unused):

```text
color.primary · color.secondary (optional) · color.neutral
color.info · color.success · color.warning · color.error  (raw scales for mapping — meaning comes from semantic.status)
```

Primitives are values only. No “button colour” meaning here.

### Semantic tokens

Keep taxonomy **small**:

```text
background · foreground · action · border · interaction (or selector) · status
```

Example leaves (adapt; do not explode):

- background: default, subtle, muted, inverse
- foreground: default, muted, subtle, inverse
- action: primary, primary-hover, primary-active, secondary, destructive
- border: default, muted, strong, focus
- interaction: default, hover, selected, active, disabled
- status: info, success, warning, error

Brand primary → `action.primary`, often `border.focus` / `interaction.selected` — **not** `status.*`.

### Scales

```text
typography · spacing · radius · sizing · breakpoints
```

Map type roles (display, title, body, label, caption) to typography steps across a small breakpoint set (e.g. mobile / tablet / desktop).

### Component vocabulary

List shadcn components this product will use. Prefer existing primitives before inventing. Note thin project wrappers composed from tokens.

> shadcn is the implementation foundation, not the visual identity.

### Patterns

Name recurring compositions when shared or clearly core (empty state, form + validation, confirmation, dense workspace, exception row, detail + history…).

### System decisions

Record reusable rules once (primary vs secondary vs destructive; status never colour-alone).

### Anti-patterns

- Token explosion
- Mapping brand primary onto success/error
- Hex values in screen component lists
- Treating shadcn default theme as brand identity
- Inventing Settings/Dashboard without UX need
- Parallel “device.*” colour/semantic trees

### Rules

- If brand unknown: provisional neutrals + open question, or Native Q&A once (agent owns the ask).
- Refine tokens when screens reveal gaps; keep component API stable.
- Do not write full screen specs here — UI Designer Phase 4 / `ui-screen-spec`.

## Process

1. Brand and context → primitives  
2. Map semantics (protect status)  
3. Define scales  
4. Vocabulary + patterns + system decisions  
5. Hand off §2 for screens to consume  
