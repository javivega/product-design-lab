---
name: ui-screen-spec
description: >-
  Write a complete UI specification for one UX inventory screen — hierarchy, layout structure, components, states, actions, feedback, responsive and accessibility. Use when ui-designer Phase 4 designs screens.
metadata:
  internal: true
---

## Input

Per screen from UX `experience.md` inventory + `ui.md` design system:

- Purpose, primary user, supports, entry/exit, information required, actions, states, related screens (from UX)
- Flows that touch this screen
- §2 Design system (semantic tokens, shadcn vocabulary, patterns)

Read from disk — not from chat memory.

## Output

One **full** screen block under `ui.md` §4. **All subsections below are required.** Do not collapse into a bullet summary of the UX inventory.

### Required format

```markdown
### [Screen name] — matches UX inventory name

#### Purpose
[1–3 sentences: what the user accomplishes — aligned with UX, expressed as UI job.]

#### Content hierarchy
[Primary / secondary / tertiary information and why. Scan path in prose.]

#### Layout structure
[High-level regions and how they relate — e.g. task header, primary workspace, secondary context, persistent actions.
Allowed: composition. Forbidden: pixel CSS, exact font sizes unless device tokens are named.]

#### Components
[Named shadcn components + project wrappers. Bind to semantic tokens by name.
Example: Button (default) → action.primary; SyncStatus → status.* + text.]

#### States
[Each material UX/UI state: what changes in hierarchy, available actions, and status presentation.]

#### Actions
[Primary, secondary, destructive — placement in the composition and token treatment.]

#### Feedback
[How success, failure, progress, uncertainty, and sync/trust status are communicated — never colour alone.]

#### Responsive behaviour
[Concrete transformations: what stays / stacks / reorders / becomes sheet / scrolls / hides / changes interaction.]

#### Accessibility
[Labels, focus, keyboard, touch targets, status semantics, error association — material to this screen.]
```

### Distinctness from UX

UX already said *what* the screen supports. This skill must add *how it is expressed*:

| UX (already known) | UI (must add) |
| ------------------ | ------------- |
| Purpose / states list | Layout regions + hierarchy |
| Actions list | Which control, where, primary vs secondary weight |
| Related screens | How navigation/affordance appears |
| Information required | What is prominent vs progressive |

Restating the UX inventory in shorter bullets = **fail**.

### Anti-patterns

- Five bullets under the screen title and stop
- “Make it responsive” without transformations
- Hex colours or `primary.600` in the components list
- Inventing a new screen not in UX inventory
- Skipping States / Feedback / Accessibility
- Wireframe ASCII art as a substitute for structure (optional sketch OK only as supplement)

### Rules

- One screen per application of this skill (or batch clearly, but each block complete).
- Name must match UX inventory.
- Reuse patterns from §2; if a new pattern appears, add it to §2 then reference it.
- Do not redesign UX flows; if blocked, note Open questions instead.

## Principles

- Screens are the product of the UI Designer — not an appendix.
- Full specs beat summaries.
- Semantic tokens only.
- Behaviour altitude for interaction; visual hierarchy is in scope.

## Process

### Step 1 - Read UX screen + flows

Take inventory fields and every flow step that lands on this screen.

### Step 2 - Draft full subsections

Write all nine subsections. Prefer concrete composition language.

### Step 3 - Token and pattern pass

Replace raw colours; cite §2 patterns; ensure status uses text + token.

### Step 4 - Hand off

Return the screen block. Agent removes this screen from `screen_queue`.
