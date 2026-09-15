# Prototyper examples

## Conceptual model

```text
Scenario → State → Interaction → System response → New state → Next
```

Screens implement the UI. Scenarios make the solution **experienceable**.

## Good outcome

- Demo shell lists 2–3 critical scenarios
- “Receive offline” changes sync state and shows explicit pending feedback
- Mock data: `Pedido #48392 · Frutas García · 8 revisados / 3 discrepancias`
- Buttons use semantic tokens, not `#0166FF` in JSX
- Assumptions documented when a minor surface was chosen for conflict UI

## Bad outcome

- Only route links between empty screens
- Finalize with “design system + blank layout”
- `Product 1 / Status / Lorem`
- New product screens not in `ui.md`
- Silent restyle of brand or UX flows
