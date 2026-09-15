# UI Designer examples

Short reference fragments for agents and humans. Not a substitute for a full `runs/<run-id>/ui.md`.

## Token layering (correct)

```text
Brand primary (#0B5FFF example)
  → primitives.primary.*
  → tokens.action.primary / tokens.border.focus / tokens.selector.selected
  → shadcn Button (default) / Input focus ring
  → Screen: Receiving workspace primary action "Cerrar recepción"
```

## Token layering (incorrect)

```text
Screen → Button background #0B5FFF
Screen → another Button background #2563EB
```

## Component vs pattern

| Component (shadcn) | Pattern (product) |
| ------------------ | ----------------- |
| `Button`, `Badge`, `Alert` | Sync status chip: label + status token + optional icon (not colour alone) |
| `Table`, `DropdownMenu` | Exception row: identity, status, primary next action |
| `Dialog` | Confirm destructive correction |

## Screen altitude (good)

> Layout: persistent task header (receipt id + sync status) → primary scan/verify workspace → sticky completion actions. Offline: same surface; sync status uses `status.warning` + text “Pendiente de sincronización”.

## Screen altitude (bad)

> 24px padding, 16px gap, blue `#2563EB` button bottom-right, Inter 14/20, card with shadow-lg…

## UX boundary

If UX says sync status is a **state of Receiving**, UI must not invent a separate “Sync dashboard” screen unless the designer explicitly expands UX architecture.
