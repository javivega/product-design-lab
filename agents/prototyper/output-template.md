# Prototyper output templates

Artifacts under `runs/<run-id>/`. The **app** is the primary deliverable; `prototype.md` is the run book for demos and review.

---

## Folder shape

```text
runs/<run-id>/
  prototype/
    src/
      components/     # shadcn-style primitives
      patterns/       # product compositions (SyncStatus, …)
      screens/        # product screens from ui.md
      scenarios/      # scenario entry + scenario runners
      state/          # prototype state model
      mocks/          # plausible structured data
  prototype.md
  .lab/notes.json
  .lab/evals.json
  sources/manifest.json
```

Adapt folder names if needed; keep the conceptual split.

---

## `prototype.md`

```markdown
# Prototype — [Project]

## 1. Scope and sources

- UI: `ui.md` (same run)
- UX: `experience.md` (same run)
- In-scope scenarios: […]
- Deferred: […]

## 2. Prototype scenarios

### [Scenario name]
- **Purpose:** why this demo matters
- **Status:** planned | playable | stubbed | deferred
- **Start:** …
- **Goal / outcome:** …
- **States exercised:** …
- **Screens used:** …

## 3. How to run

```bash
cd runs/<run-id>/prototype
npm install
npm run dev
```

Open the local URL → use the **scenario entry** (demo shell), not a random deep link, for reviews.

## 4. Scenario coverage

| Scenario | Status | Notes |
| -------- | ------ | ----- |
| … | playable / stubbed / deferred | … |

## 5. Screen coverage

| Screen (UI name) | Status | Needed by scenarios | Notes |
| ---------------- | ------ | ------------------- | ----- |
| … | implemented / stubbed / deferred | … | … |

## 6. Prototype state model

[Connection, sync, entity status, permissions — only what the scenarios need]

## 7. Mock data

[What datasets exist; examples of plausible records — not Product 1/2/3]

## 8. Token / design-system mapping

[Brand → primitive → semantic CSS vars; components consume semantics]

## 9. Prototype assumptions

| Assumption | Reason | Status |
| ---------- | ------ | ------ |
| … | gap in UX/UI | needs designer review |

## 10. Fidelity gaps

- …

## 11. Open questions

- …

## 12. Review notes

- Feedback from demos and resulting changes
```

### Spanish heading map (example)

| English | Spanish |
| ------- | ------- |
| Prototype scenarios | Escenarios del prototipo |
| How to run | Cómo ejecutarlo |
| Scenario coverage | Cobertura de escenarios |
| Screen coverage | Cobertura de pantallas |
| Prototype state model | Modelo de estado del prototipo |
| Mock data | Datos mock |
| Prototype assumptions | Supuestos del prototipo |
| Fidelity gaps | Brechas de fidelidad |
| Review notes | Notas de revisión |
