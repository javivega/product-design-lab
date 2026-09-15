# Prototipo — NovaStock Pro

## 1. Alcance y fuentes

Se implementarán las diez pantallas descritas en `runs/ui-designer/20260913-1414-novastock-pro/ui.md`, respetando las relaciones y estados de `runs/ux-designer/20260913-1337-novastock-pro/experience.md`.

## 2. Cómo ejecutar

```powershell
cd runs/prototyper/20260913-1424-novastock-pro/prototype
npm install
npm run dev
```

El prototipo usa Vite + React + TypeScript + Tailwind v4.

## 3. Cobertura de pantallas

Implementadas las diez superficies del inventario UX mediante una aplicación navegable: Espacio de recepción, Revisión de excepción, Detalle de diferencia, Cola de revisión, Espacio de tarea operativa, Detalle de seguimiento pendiente, Visión operativa, Detalle de incidencia, Investigación de artículo y Detalle de movimiento.

La navegación lateral permite abrir cada superficie. Las acciones principales y secundarias son interactivas; el conmutador de conexión demuestra los estados de sincronización confirmada y pendiente.

## 4. Notas de mapeo de tokens

El color primario #0166FF se mapeará a variables semánticas de acción, selección y foco. Los estados de éxito, alerta, error e información serán independientes.

## 5. Datos simulados y limitaciones

La autenticación, sincronización, permisos, hardware y backend están simulados. Los mismos datos de ejemplo sostienen las superficies para mostrar sus patrones y estados. Las reglas de validación local y de conflictos siguen pendientes de política.

## 6. Preguntas abiertas y brechas de fidelidad

- Qué validación local basta para cerrar una recepción.
- Qué movimientos requieren confirmación remota.
- Qué permisos y reglas resuelven los conflictos de sincronización.
- La cola, entregas y permisos son demostraciones de navegación, no reglas operativas reales.
- La pantalla no integra lectores ni impresoras; conserva la estructura de la tarea para una futura integración.
