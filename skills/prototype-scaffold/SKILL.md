---
name: prototype-scaffold
description: >-
  Scaffold a Vite + React + TypeScript + Tailwind prototype app with semantic CSS token hooks, shadcn-style ui kit, and folders for screens, scenarios, state, and mocks. Use when prototyper Phase 4 runs.
metadata:
  internal: true
---

## Input

- Target directory: `runs/<run-id>/prototype/`
- Brand / semantic token names from `ui.md` §2 (for initial `tokens.css`)
- Documentation language (for shell title only)

Read token names from disk — do not invent a second design system.

## Output

A installable app skeleton:

- `package.json` with scripts: `dev`, `build`, `preview`
- Vite + React + TypeScript
- Tailwind configured to read CSS variables
- `src/styles/tokens.css` with semantic variables mapped from UI primitives
- Suggested folders:
  - `src/components/ui/`
  - `src/patterns/`
  - `src/screens/`
  - `src/scenarios/` (demo entry placeholder)
  - `src/state/`
  - `src/mocks/`
- `src/App.tsx` shell with router + placeholder scenario entry
- `.gitignore` for `node_modules`, `dist`

### Stack defaults

| Choice | Default |
| ------ | ------- |
| Bundler | Vite |
| UI | React 18+ + TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui patterns into `components/ui` |
| Router | React Router |

### Token wiring

```text
ui.md primitives → --primitive-* → --action-primary (semantic) → components
```

Never instruct screens to use raw hex for brand actions.

### Anti-patterns

- Create-react-app
- HTML-only “prototype”
- Scaffold without `npm run dev`
- Full unrelated admin dashboard template
- Implementing product scenarios inside this skill (that is agent Phases 5–7)

### Rules

- Create files under the given `prototype/` path only.
- Keep dependencies lean.
- Document run commands for `prototype.md`.
- Do not implement product scenarios or screens here beyond empty placeholders.

## Process

### Step 1 - Create package + Vite React TS

### Step 2 - Add Tailwind + tokens.css

### Step 3 - Add minimal ui primitives + App shell

### Step 4 - Hand off

Return path to `prototype/` and verify `package.json` scripts exist. Agent continues with state/mocks, scenario shell, and screen implementation.
