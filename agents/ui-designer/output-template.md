# UI Designer output templates

Reference shapes for files under `runs/<run-id>/`. Localise prose to the documentation language. Token/component names may stay English for implementation clarity.

Screens consume **semantic tokens**. Do not put raw primitive colour values in screen specs.

**§4 Screens is the core deliverable.** Every UX inventory screen needs a full specification with all required subsections. Bullet digests that only restate UX are invalid. See `skills/ui-screen-spec/SKILL.md`.

Prioritise screens/states that UX **critical scenarios** require when the inventory is large.

---

## `ui.md`

```markdown
# UI design — [Project]

## 1. Scope and sources
## 2. Design system
### Colour primitives
### Semantic tokens
### Scales
#### Typography
#### Spacing
#### Radius
#### Sizing
#### Breakpoints
### Component vocabulary
### Patterns
### System decisions
## 3. Interface architecture
### Global shell
### Navigation
### Shared patterns
## 4. Screens
### [Screen name]
#### Purpose
#### Content hierarchy
#### Layout structure
#### Components
#### States
#### Actions
#### Feedback
#### Responsive behaviour
#### Accessibility
### [Next screen…]
## 5. Cross-screen behaviour
## 6. Open questions
## 7. Implementation notes
```

### Per-screen body (required under each `###` screen)

- **Purpose** — UI job aligned with UX
- **Content hierarchy** — primary / secondary / tertiary + scan path
- **Layout structure** — regions (header, workspace, secondary, actions); composition OK, not pixel CSS
- **Components** — shadcn + wrappers bound to semantic tokens
- **States** — material UX/UI states and what changes
- **Actions** — primary / secondary / destructive treatment
- **Feedback** — success, failure, progress, uncertainty (never colour alone)
- **Responsive behaviour** — concrete transformations via scales/breakpoints
- **Accessibility** — focus, keyboard, labels, touch, status semantics

### Token naming example (conceptual)

```text
primitives.color.primary.600
        ↓ maps to
semantic.action.primary

Button / default → semantic.action.primary
Input / error    → semantic.status.error
Input / focus    → semantic.border.focus
```

Do not write `primary-500` in screen component lists.

### Spanish heading map (example)

| English | Spanish |
| ------- | ------- |
| Design system | Sistema de diseño |
| Colour primitives | Primitivos de color |
| Semantic tokens | Tokens semánticos |
| Scales | Escalas |
| Screens | Pantallas |
| Implementation notes | Notas de implementación |
