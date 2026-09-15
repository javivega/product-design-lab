# UI — Vínculo Animal

## 1. Alcance y fuentes

Expresión visual de `runs/ux-designer/20260915-2052-vinculo-animal/experience.md`.

Pantallas: Encontrar familia, Ficha de familia, Sesión, Mi día.

El diseñador fijó el primario en `#FF4E00`. Retícula 4px y navegación principal visible salen del RFP. En captura de bolsillo la barra se oculta (si no, el papel gana).

## 2. Sistema de diseño

### Primitivas

- `color.primary`: `#FF4E00` (marca)
- `color.primary-hover`: `#E04500`
- `color.neutral`: escala cálida piedra/papel (`#1C1917` … `#F7F4F0`)
- `color.info` / `success` / `warning` / `error`: escalas propias, no naranja de marca

### Tokens semánticos

- `background.default` — papel cálido
- `background.subtle` — filas y huecos
- `background.muted` — sidebar, rail
- `background.inverse` — cabecera de captura
- `foreground.default` / `muted` / `subtle` / `inverse`
- `action.primary` ← primary; `action.primary-hover`; `action.secondary`; `action.destructive`
- `border.default` / `muted` / `strong` / `focus` (focus usa primary)
- `interaction.hover` / `selected` / `disabled`
- `status.info` / `success` / `warning` / `error` / `pending` / `incomplete`

El naranja pinta acciones, foco y selección. Nunca pinta éxito, error ni “ficha incompleta”.

### Escalas

- **spacing:** 4px grid — 4, 8, 12, 16, 24, 32, 48
- **typography:** title (día / ficha), body, label, caption. En captura mínima, title más corto y body más grande (lectura al sol / de pie)
- **radius:** 8px controles; 12px paneles
- **sizing:** `target.touch` 44px mínimo (bolsillo); 36px escritorio compacto
- **breakpoints:** `compact` (bolsillo / menor de 768px), `desktop` (768px en adelante)

### Vocabulario (shadcn, tematizado)

Button, Input, Textarea, Badge, Alert, Separator, ScrollArea, Command (búsqueda), Sheet, Dialog, Tooltip, Sidebar (escritorio), Avatar, DropdownMenu.

Wrappers: `GapBadge` (hueco, `status.incomplete` + texto), `NoteInFileStatus` (en el archivo / solo aquí), `EducatorColorDot` (color + nombre, nunca solo el punto).

### Patrones

- Búsqueda + resultados con hueco asomado
- Ficha: datos + huecos + historial
- Sesión: captura mínima vs redacción completa (mismos tokens, distinta densidad)
- Mi día: lista de sesiones; modo equipo
- Vacío: título + una acción primaria
- Confirmación de nota guardada (toast + estado persistente en pantalla)

### Decisiones de sistema

- Guardar nota / guardar pautas → `action.primary`
- Compartir WhatsApp y PDF → `action.secondary` (mismo peso entre sí; no compiten con guardar)
- Huecos: Badge + etiqueta “Falta …” + `status.incomplete`
- Sidebar visible en desktop; oculta en compacto (nav inferior de 3 destinos: Día, Buscar, — la sesión no es tab, se entra desde el día o la ficha)

## 3. Arquitectura de interfaz

**Shell escritorio:** columna de navegación persistente (Día · Familias) + área de trabajo. Sin anidar. Destinos = UX: Mi día y Encontrar familia; Ficha y Sesión son destinos de trabajo, no ítems extra de nav.

**Shell compacto (captura):** pantalla completa de la superficie activa; navegación inferior Día / Familias. Al abrir Sesión en captura mínima, la nav inferior se reduce o se oculta para dejar el textarea y Guardar — si no, el papel gana.

**Patrones compartidos:** `GapBadge` en resultados y ficha; `NoteInFileStatus` en Sesión; retorno siempre visible (atrás a ficha o al día).

## 4. Pantallas

---

### Encontrar familia

#### Propósito
Localizar una familia por perro o humano, o crear una mínima, y ver de un vistazo si el archivo está muy incompleto.

#### Jerarquía de contenido
1. Campo de búsqueda (acción inmediata).
2. Resultados: nombre del perro, humano, `GapBadge` si faltan datos críticos.
3. Acción terciaria: crear familia mínima (abajo o vacío).

#### Estructura de layout
Región superior: título “Familias” + Input de búsqueda a ancho completo del workspace. Región central: lista scrollable de filas. Pie: enlace/botón secundario “Nueva familia” anclado en vacío o al final.

#### Componentes
- Input + Search icon → `foreground.muted` en icono; `border.focus` al foco
- Command o lista de botones fila (no tabla densa)
- `GapBadge` → `status.incomplete` + texto “Falta salud” / “Sin última nota”
- Button secondary “Nueva familia” → `action.secondary`
- Empty: texto + Button primary “Crear familia”

#### Estados
- Vacío sin query: prompt “Nombre del perro o del humano”.
- Sin resultados: empty + crear.
- Varios resultados: lista; la fila muestra hueco si `incomplete`.
- Carga: Skeleton de 4 filas.

#### Acciones
- Primaria implícita: escribir y abrir resultado (toda la fila es el hit).
- Secundaria: crear familia mínima (Dialog: nombre humano + nombre perro, dos Inputs, Button primary “Crear”).

#### Feedback
- Error de red: Alert `status.error` + texto, no solo color.
- Familia creada: toast y navegación a Ficha.

#### Comportamiento responsive
- Desktop: lista en el workspace a la derecha del sidebar.
- Compact: búsqueda a pantalla; teclado empuja la lista; `target.touch` 44px.

#### Accesibilidad
- Input con label visible “Buscar familia”.
- Filas como botones con nombre accesible “Luna, Ana — falta historial de salud”.
- Dialog con foco tramado; Escape cierra.

---

### Ficha de familia

#### Propósito
Archivo honesto: ver datos, huecos, historial y nacer la próxima sesión.

#### Jerarquía de contenido
1. Identidad (perro + humano) y `GapBadge` resumen.
2. Huecos listados (lo que falta para la siguiente clase).
3. Historial (notas de sesiones).
4. Próxima sesión / crear próxima.

#### Estructura de layout
Cabecera de identidad (nombre del perro como title, humano como subtitle). Bloque “Qué falta” (subtle background). Columna de historial (ScrollArea). Rail o pie persistente: “Nueva sesión” / “Abrir sesión de ahora” → `action.primary`.

#### Componentes
- Avatar o iniciales del perro (no foto requerida)
- `GapBadge` + lista de huecos como botones secundarios que revelan Input inline
- Separator
- Lista de historial: fecha + caption de nota; vacía = “Aún no hay evolución”
- Button primary “Nueva sesión”
- Button ghost “Abrir última sesión”

#### Estados
- Incompleta: bloque huecos visible y primero en el scan.
- Más completa: bloque huecos colapsa a un caption “2 huecos”.
- Historial vacío vs con notas.
- Tras crear sesión: toast y se puede ir a Mi día.

#### Acciones
- Primaria: Nueva sesión (Dialog: fecha/hora, educador por defecto “yo”).
- Secundaria: completar un hueco (inline); abrir sesión existente.
- No destructivo en esta pantalla.

#### Feedback
- Hueco guardado: el badge desaparece o baja el recuento; texto “Guardado”.
- Error de campo: mensaje asociado al Input (`status.error`).

#### Comportamiento responsive
- Desktop: identidad + huecos arriba; historial largo a la izquierda; acción nueva sesión visible sin scroll.
- Compact: stack identidad → huecos → historial; primary sticky bottom.

#### Accesibilidad
- Un h1: nombre del perro.
- Huecos como lista con nombres. Completar hueco: label del campo, no placeholder-as-label.
- Status incompleto por texto, no solo naranja (el naranja no se usa aquí).

---

### Sesión

#### Propósito
La clase concreta: dejar la evolución (captura mínima) y redactar pautas una vez, con salida WhatsApp y/o PDF.

#### Jerarquía de contenido
**Captura mínima:** 1) quién/cuándo (compacto), 2) textarea de evolución, 3) Guardar + `NoteInFileStatus`.
**Redacción completa:** 1) identidad, 2) nota ya guardada (colapsable), 3) pautas (textarea rico simple), 4) Guardar pautas, 5) Compartir / PDF.

#### Estructura de layout
Captura: casi todo el viewport es el Textarea; cabecera de una línea (perro · hoy); barra de acción inferior con Button primary “Guardar en la ficha”.
Redacción: dos bloques apilados (evolución | pautas) con Separator; acciones de canal en el pie, secundarias.

#### Componentes
- Textarea → body; en captura `sizing` grande
- Button default “Guardar en la ficha” → `action.primary`
- Button outline “Copiar para WhatsApp” y “PDF con membrete” → `action.secondary`
- `NoteInFileStatus` → texto “En el archivo” (`status.success`) o “Solo en este dispositivo” (`status.pending`) + icono
- Alert si historial vacío al redactar pautas (no bloquea)

#### Estados
- Captura mínima (entrada in situ o desde Mi día “ahora”).
- Redacción completa (escritorio / después).
- Nota pendiente de sync: status pending + texto; Guardar sigue habilitado localmente si la política lo permite (si no, Alert + pregunta abierta).
- Pautas listas: botones de canal habilitados; si no hay texto, deshabilitados + caption.

#### Acciones
- Primaria captura: Guardar en la ficha.
- Primaria redacción: Guardar pautas (si se edita).
- Secundarias: copiar WhatsApp, generar PDF — mismo peso, después de tener texto.
- Navegación: atrás a Ficha o Mi día (no es acción de negocio).

#### Feedback
- Guardar nota: toast “Ya está en la ficha de Luna” + `NoteInFileStatus` actualizado. Micro-éxito breve; no un modal.
- Copiar: toast “Texto copiado — pégalo en WhatsApp”. No fingir “enviado”.
- PDF: descarga o vista; toast “PDF listo”.
- Error: Alert `status.error` junto a la acción.

#### Comportamiento responsive
- Compact captura: sin sidebar; sin nav inferior; textarea + guardar. Transformación crítica.
- Compact redacción: stack; canal en Sheet si no caben dos botones.
- Desktop: sidebar visible; captura puede ocupar el workspace igual de limpia (pocos campos).

#### Accesibilidad
- Textarea con label “Evolución de esta clase” / “Ejercicios para casa”.
- Live region para “En el archivo”.
- Botones de canal con nombre explícito, no solo iconos.
- Foco visible `border.focus` (naranja) sobre contraste de papel.

---

### Mi día

#### Propósito
Ver las sesiones propias de hoy y abrir la de ahora; consultar el equipo en color sin vivir ahí.

#### Jerarquía de contenido
1. Título del día + control “Mío / Equipo”.
2. Lista de sesiones (perro, hora, educador).
3. Vacío: “No hay clases hoy” + ir a Familias.

#### Estructura de layout
Cabecera: fecha (title) + Tabs o Toggle “Mis sesiones | Equipo”. Lista a ancho del workspace; cada fila: hora, nombre del perro, `EducatorColorDot` + nombre. La sesión “ahora” (solape con la hora actual) se enfatiza con `interaction.selected` y un caption “Ahora”.

#### Componentes
- Tabs (shadcn) → `interaction.selected` no pinta el tab con status
- Filas Button-like
- `EducatorColorDot` + texto del educador (color + nombre)
- Empty + Button secondary “Buscar familia”

#### Estados
- Mi día con sesiones / vacío.
- Vista equipo: mismas filas, todas las de los tres; el punto de color no sustituye el nombre.
- Sesión de ahora destacada.

#### Acciones
- Primaria: abrir la sesión (fila).
- Secundaria: cambiar a vista equipo.
- No se crean sesiones aquí (nacen en la ficha).

#### Feedback
- Carga: Skeleton.
- Error al cargar el día: Alert.

#### Comportamiento responsive
- Compact: lista táctil; tabs arriba; “Ahora” más grande. Sidebar oculta; tab bar Día / Familias.
- Desktop: lista más densa; sidebar Día activo.

#### Accesibilidad
- Tabs con teclado.
- Fila: “18:00 Luna con Marta — ahora”.
- Color de educador nunca solo: el nombre va siempre.

## 5. Comportamiento entre pantallas

Mismos tokens y `GapBadge` / `NoteInFileStatus` en todas. El primary naranja es Guardar (nota o pautas), no cada enlace. Transición captura → redacción: misma pantalla, cambia densidad y aparecen canales. Tras “Nueva sesión” en Ficha, Mi día muestra la fila sin recargar conceptualmente. Copiar WhatsApp no cambia de pantalla.

## 6. Preguntas abiertas

- ¿Sin red se persiste en el dispositivo? El spec prevé `status.pending` “Solo en este dispositivo”.
- ¿Rich text real o textarea para pautas v1?
- ¿Logo/membrete del PDF son assets reales o placeholder?
- ¿Los tres educadores tienen colores fijos de sistema (no marca naranja) para `EducatorColorDot`?

## 7. Notas de implementación

React + Tailwind + shadcn/ui. Mapear CSS variables a tokens semánticos; `--primary: #FF4E00`. Sidebar shadcn en desktop; en compact, nav inferior custom de dos destinos. Grid 4px via spacing scale. No usar el naranja de shadcn default: theme override. PDF: placeholder de exportación. WhatsApp: `navigator.clipboard.writeText`.
