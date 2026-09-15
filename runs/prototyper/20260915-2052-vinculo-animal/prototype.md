# Prototype — Vínculo Animal

## 1. Alcance y fuentes

- UI: `runs/ui-designer/20260915-2052-vinculo-animal/ui.md`
- UX: `runs/ux-designer/20260915-2052-vinculo-animal/experience.md`
- In-scope: los cuatro escenarios críticos de UX
- Diferido: ninguno

## 2. Escenarios del prototipo

### Al terminar en el sitio
- **Propósito:** Impedir que la nota se quede en el papel.
- **Estado:** playable
- **Inicio:** picker → Mi día → Luna ahora
- **Salida:** Guardar en la ficha; historial en la ficha. Toggle sin red → “solo este dispositivo”.
- **Estados:** captura mínima; pending sync
- **Pantallas:** Mi día, Sesión, Ficha

### Cazar a Luna y ver el hueco
- **Propósito:** Archivo honesto
- **Estado:** playable
- **Inicio:** Familias
- **Salida:** ficha con “Falta historial de salud”; Completar quita el hueco

### Una redacción, dos canales
- **Propósito:** Un texto, WhatsApp o PDF
- **Estado:** playable
- **Inicio:** Sesión en redacción (nota ya en archivo)
- **Salida:** copiar / PDF simulado; no se finge enviado

### La próxima clase nace en la ficha
- **Propósito:** Sesión desde la familia
- **Estado:** playable
- **Inicio:** Ficha de Luna
- **Salida:** Nueva sesión → aparece en Mi día

## 3. Cómo ejecutarlo

```bash
cd runs/prototyper/20260915-2052-vinculo-animal/prototype
npm install
npm run dev
```

Abre la URL local y entra por el **selector de escenarios**.

## 4. Cobertura de escenarios

| Escenario | Estado | Notas |
| -------- | ------ | ----- |
| Al terminar en el sitio | playable | Incluye sin red |
| Cazar a Luna | playable | |
| Una redacción, dos canales | playable | PDF simulado |
| Nace en la ficha | playable | |

## 5. Cobertura de pantallas

| Pantalla | Estado | Escenarios |
| -------- | ------ | ---------- |
| Encontrar familia | implemented | hueco, explore |
| Ficha de familia | implemented | hueco, nace, sitio (historial) |
| Sesión | implemented | sitio, pautas |
| Mi día | implemented | sitio, nace |

## 6. Modelo de estado del prototipo

Familias (huecos, historial), sesiones (nota, pautas, noteInFile, noteLocalOnly), pantalla activa, modo captura/redacción, vista mío/equipo, offline simulado.

## 7. Datos mock

Luna/Ana (huecos de salud y reactividad), Kira/Pablo (historial), Nala/Elena (teléfono y salud). Educadores Marta (tú), Luis, Sofía.

## 8. Tokens

`--primitive-primary: #FF4E00` → `--action-primary`. Status independientes. Componentes no usan hex de marca en JSX (salvo puntos de educador, que no son marca).

## 9. Supuestos del prototipo

| Supuesto | Razón | Estado |
| -------- | ----- | ------ |
| PDF es toast, no archivo binario | Fuera de fidelidad del demo | review |
| WhatsApp = clipboard | UX: no envío in-app | ok |
| Completar hueco no pide el valor | Evitar formulario largo | review |
| Sin red persistido solo en memoria | No hay storage | ok |

## 10. Brechas de fidelidad

- No hay PDF real ni membrete.
- Tipografía serif de sistema, no una webfont de marca.
- Nav inferior de 2 destinos; captura oculta chrome como en UI.

## 11. Preguntas abiertas

Las de `ui.md` §6 y `experience.md` §7.

## 12. Notas de revisión

- Recorridos en navegador (localhost:5175): captura in situ con sin-red; huecos en ficha; nueva sesión aparece en Mi día; copiar WhatsApp no finge envío.
- Ajuste: las filas de Mi día muestran `dateLabel` (Hoy/Mañana) para no mezclar la sesión nueva con el día de hoy.
