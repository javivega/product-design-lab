# Especificación UI — NovaStock Pro

## 1. Alcance y fuentes

La UI cubre las diez superficies definidas por la arquitectura UX: recepción, revisión de excepción, diferencia de stock, cola de revisión, tarea operativa, seguimiento pendiente, visión operativa, detalle de incidencia, investigación de artículo y detalle de movimiento.

Las fuentes vinculadas en `sources/manifest.md` definen los flujos, estados y restricciones. El color principal fue definido por el diseñador como `#0166FF`.

## 2. Sistema de diseño

### Primitivas

- `primary.600`: `#0166FF`, color de marca elegido.
- Escala neutral, más escalas semánticas independientes para información, éxito, advertencia y error.

### Tokens semánticos

- Fondos: `background.default`, `background.subtle`, `background.muted`, `background.inverse`.
- Texto: `foreground.default`, `foreground.muted`, `foreground.inverse`.
- Acción: `action.primary`, `action.primary-hover`, `action.secondary`, `action.destructive`.
- Bordes y selección: `border.default`, `border.strong`, `border.focus`, `selector.selected`, `selector.disabled`.
- Estados: `status.info`, `status.success`, `status.warning`, `status.error`, `status.pending`, `status.offline`.

`primary.600` alimenta `action.primary`, `border.focus` y `selector.selected`. Los estados conservan significado propio y no usan el color de marca como sustituto.

### Dispositivo y geometría

- `device.text`: tamaños compactos para etiquetas operativas, cuerpo legible y títulos de tarea; se aumenta el cuerpo y la etiqueta de acción en pantallas táctiles industriales.
- `space`: pasos 2, 3, 4, 6 y 8 para separar controles, grupos operativos y áreas de revisión.
- `target.touch`: objetivo mínimo amplio para acciones de muelle con guantes.
- Radio y elevación se reservan para agrupar contexto, no para comunicar estado.

### Vocabulario de componentes

Button, Input, Select, Checkbox, Radio Group, Dialog, Alert, Badge, Table, Form, Tooltip, Sheet y Skeleton de shadcn/ui, tematizados con tokens semánticos.

Wrappers finos: `SyncStatus`, `EvidenceState`, `ExceptionReason` y `TaskState`; se componen sobre Badge, Alert o controles estándar.

### Patrones

- Espacio operativo denso con acción principal persistente.
- Verificación de identidad y cantidad con validación asociada.
- Estado de registro y sincronización, siempre con texto además de color.
- Detalle con historia y evidencia.
- Fila de excepción y cola de trabajo pendiente.
- Estado vacío, carga y acceso restringido coherentes.

### Decisiones de sistema

- Acción de completar tarea → `action.primary` (Button default).
- Acciones secundarias → `action.secondary`.
- Corrección irreversible / destructiva → `action.destructive` + Dialog de confirmación.
- Estado nunca solo por color: texto + icono + token `status.*`.

## 3. Arquitectura de interfaz

La interfaz expresa las relaciones de la UX sin añadir destinos. El espacio operativo de recepción y tareas prioriza la acción que mantiene el trabajo en marcha; las superficies de detalle priorizan contexto y una decisión segura.

Las entradas respetan los contextos de UX: trabajo operativo, incidencia, búsqueda autorizada o cola pendiente. Los retornos preservan el origen y el estado del caso.

Patrones compartidos:
- El estado de sincronización acompaña el registro donde se consulta, con `SyncStatus` y texto inequívoco.
- Las decisiones que no pueden cerrarse usan `ExceptionReason` y una acción que explica su consecuencia.
- Las listas de trabajo pendiente usan Tabla, filtros y foco de teclado; no definen una nueva área de producto.

## 4. Pantallas

---

### Espacio de recepción

#### Propósito

Permitir al operario de muelle registrar, verificar identidad y cantidad, y cerrar una recepción — también sin red — sin recurrir al papel.

#### Jerarquía de contenido

1. Identificación de la recepción en curso y `SyncStatus` (siempre visibles).
2. Artículo activo: identidad y cantidad (zona de trabajo primaria).
3. Lista breve de artículos ya registrados en esta recepción.
4. Acciones de cierre / derivación (persistentes).

#### Estructura de layout

- **Cabecera de tarea:** id/contexto de recepción + `SyncStatus`.
- **Zona primaria:** Form de verificación (identidad, cantidad) a ancho completo en muelle.
- **Zona secundaria:** listado compacto de líneas ya capturadas (`background.subtle`).
- **Barra de acciones:** cierre local / enviar si hay red / derivar excepción — anclada al borde inferior o inferior del viewport táctil.

#### Componentes

- Form + Input (identidad, cantidad) con labels asociados; foco → `border.focus`.
- Button primario “Cerrar recepción” → `action.primary`.
- Button secundario “Derivar excepción” → `action.secondary`.
- `SyncStatus` (Badge/Alert compuesto) → `status.offline` | `status.pending` | `status.success` + texto.
- Skeleton en carga inicial del contexto.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Con conexión | Cierre puede confirmar remoto; `SyncStatus` éxito/confirmado. |
| Sin conexión | Mismo layout; `SyncStatus` offline; cierre = guardado local pendiente. |
| Pendiente de sincronización | Tras cierre local; mensaje de confirmación no ambiguo (“cerrada para operar · pendiente de confirmar”). |
| Requiere revisión | Bloquea cierre como válido; empuja a Revisión de excepción. |
| Carga / vacío de contexto | Skeleton o empty state con instrucción de iniciar recepción. |

#### Acciones

- Primaria: cerrar (local o confirmado según red).
- Secundaria: añadir línea, derivar excepción.
- No hay acción destructiva en esta superficie.

#### Feedback

- Validación inline bajo identidad/cantidad (error asociado al campo).
- Toast/Alert breve al cerrar con el texto de estado de sincronización.
- Fallo de guardado local → `status.error` + reintento.

#### Comportamiento responsive

- Estrecho: cabecera y Form en columna; lista de líneas colapsa a resumen expandible; barra de acciones permanece fija.
- Ancho: Form y lista en dos regiones (primaria izquierda / secundaria derecha) sin cambiar destinos UX.

#### Accesibilidad

- Labels visibles; errores vinculados con `aria-describedby`.
- Objetivos táctiles ≥ `target.touch`; foco visible `border.focus`.
- `SyncStatus` anuncia texto completo al lector de pantalla, no solo el color.

---

### Revisión de excepción

#### Propósito

Resolver o entregar una recepción que no pudo cerrarse localmente, con motivo y evidencia visibles.

#### Jerarquía de contenido

1. `ExceptionReason` y estado del caso.
2. Movimiento afectado y evidencia disponible.
3. Responsable / siguiente paso.
4. Acciones de entregar, devolver o continuar a diferencia.

#### Estructura de layout

- **Cabecera:** título del caso + estado.
- **Bloque Alert:** motivo y qué falta para cerrar.
- **Cuerpo:** detalle del movimiento + evidencia (`background.subtle`).
- **Acciones:** secundarias a la izquierda/abajo; primaria de entrega o continuación según permiso.

#### Componentes

- Alert → `status.warning` / `status.error` según gravedad.
- `ExceptionReason`, Badge de estado.
- Button secundario / primario; enlace de continuación a Detalle de diferencia cuando aplique.
- Sheet para evidencia larga en viewport estrecho.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Requiere revisión | Acciones de entrega/continuación habilitadas según rol. |
| Acceso restringido | Alert de permiso; acciones de decisión deshabilitadas (`selector.disabled`). |
| Confirmado / resuelto | Lectura; CTA vuelve al trabajo operativo. |

#### Acciones

- Primaria: entregar a responsable o marcar listo para política.
- Secundaria: devolver a recepción, abrir diferencia relacionada.
- Confirmación Dialog si la entrega es irreversible en política.

#### Feedback

- Confirmación textual de entrega con id de caso.
- Error de permiso → Alert + qué rol se necesita (sin inventar el rol).

#### Comportamiento responsive

- Resumen (motivo + estado) siempre arriba; evidencia pasa a Sheet; acciones apiladas a ancho completo.

#### Accesibilidad

- Alert con rol adecuado; orden de foco motivo → evidencia → acciones.
- Botones deshabilitados explican por qué vía Tooltip o texto auxiliar.

---

### Detalle de diferencia

#### Propósito

Que el supervisor comprenda la discrepancia, evalúe evidencia y confianza del dato, y decida corregir con seguridad o dejar pendiente.

#### Jerarquía de contenido

1. Magnitud/descripción de la diferencia + `EvidenceState` / confianza.
2. Evidencia y movimientos relacionados.
3. Decisión: corregir o pendiente.
4. Historia breve si aporta contexto.

#### Estructura de layout

- **Cabecera:** diferencia + badges de confianza/sincronización.
- **Columna/región primaria:** evidencia y contexto.
- **Región de decisión:** acciones de corregir / pendiente, siempre visibles tras el contexto (no antes).
- **Secundaria:** tabla o lista de movimientos relacionados.

#### Componentes

- Alert de confianza (`status.warning` si datos pendientes).
- Table o lista de evidencia; Badge `EvidenceState`.
- Dialog de confirmación para corrección → `action.destructive` solo si la corrección es irreversible.
- Button “Dejar pendiente” → `action.secondary`.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Corregible | Primaria = corregir (con confirmación). |
| Pendiente / datos no confirmados | Corregir deshabilitado o advertido; pendiente enfatizado. |
| Acceso restringido | Solo lectura + explicación. |

#### Acciones

- Primaria contextual: corregir **o** dejar pendiente según estado (nunca ambas al mismo peso si una es insegura).
- Secundaria: abrir investigación / volver a cola.

#### Feedback

- Tras corregir: confirmación + nuevo estado del registro.
- Si sync pendiente: no mostrar la corrección como “dato central confirmado”.

#### Comportamiento responsive

- Evidencia en secuencia vertical; región de decisión sticky inferior; tabla → cards expandibles.

#### Accesibilidad

- Dialog atrapa foco; anuncia consecuencia de la corrección.
- Relación diferencia ↔ evidencia clara en estructura de encabezados.

---

### Cola de revisión

#### Propósito

Reunir y priorizar casos que no pueden cerrarse con seguridad para retomarlos.

#### Jerarquía de contenido

1. Filtros y conteo de pendientes.
2. Lista/tabla de casos (motivo, responsable, estado, origen).
3. Acción de abrir el caso seleccionado.

#### Estructura de layout

- **Barra superior:** título + filtros (Select) + búsqueda opcional.
- **Cuerpo:** Table de filas de excepción.
- **Vacío / carga:** empty state o Skeleton a ancho completo.

#### Componentes

- Table + fila clicable; Badge de estado; Select de filtros.
- Button secundario “Priorizar / asignar” solo si la política lo permite (si Unknown → ocultar o deshabilitar con nota).

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Pendiente / en revisión / resuelto | Filtro y Badge. |
| Sin resultados | Empty state explicativo. |
| Carga | Skeleton de filas. |

#### Acciones

- Primaria por fila: abrir detalle (diferencia o excepción).
- Secundaria: filtros; asignación solo si está definida.

#### Feedback

- Al volver de un detalle, la fila refleja el nuevo estado.
- Error de carga → Alert con reintentar.

#### Comportamiento responsive

- Columnas secundarias se ocultan; detalle en expansión o navegación al detalle.
- Scroll horizontal de tabla solo como respaldo, con cabecera sticky.

#### Accesibilidad

- Tabla con encabezados; filas activables por teclado (Enter).
- Filtros etiquetados; anuncio del número de resultados.

---

### Espacio de tarea operativa

#### Propósito

Completar picking o packing manteniendo identidad y cantidad, incluso en hora punta.

#### Jerarquía de contenido

1. Tarea actual + `TaskState` / contexto hora punta.
2. Artículo y cantidad (verificación mínima).
3. Controles aplazables (secundarios o diferidos).
4. Completar o derivar seguimiento.

#### Estructura de layout

Igual patrón que recepción: cabecera de tarea, Form primario denso, barra de acciones persistente. En hora punta se reduce ornamentación, no los controles mínimos.

#### Componentes

- Form, Input, Checkbox de confirmación mínima.
- Button primario “Completar” → `action.primary`.
- Button “Dejar seguimiento” → `action.secondary`.
- `TaskState` para contexto de pico / pendiente.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Normal | Densidad estándar. |
| Hora punta | Más compacto; solo identidad/cantidad obligatorias en primaria. |
| Seguimiento pendiente | CTA de seguimiento enfatizado tras completar parcial. |
| Requiere revisión | Bloqueo de completar como válido. |

#### Acciones

- Primaria: completar con mínimos verificados.
- Secundaria: abrir seguimiento pendiente permitido.

#### Feedback

- Validación de identidad/cantidad; confirmación de tarea completada.
- Si algo queda aplazado, mensaje explícito de seguimiento creado (no silencio).

#### Comportamiento responsive

- Igual que recepción: apilar Form; acciones fijas; targets táctiles amplios.

#### Accesibilidad

- Igual que recepción; atajos de teclado documentados en notas de implementación si el hardware lo permite.

---

### Detalle de seguimiento pendiente

#### Propósito

Retomar un control o registro no completado en el pico, con origen y propietario claros.

#### Jerarquía de contenido

1. Trabajo de origen + control pendiente + `TaskState`.
2. Qué falta completar.
3. Acciones: completar, entregar, escalar.

#### Estructura de layout

- Cabecera de caso + estado.
- Cuerpo: origen (enlace/contexto a tarea) + pendiente.
- Acciones de resolución en bloque final.

#### Componentes

- `TaskState`, detalle estructurado, Button primario “Completar”, secundarios entregar/escalar.
- Alert si el origen ya no es válido.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Pendiente / en curso / resuelto | Acciones y Badge. |
| Acceso restringido | Solo lectura. |

#### Acciones

- Primaria: completar el control pendiente.
- Secundaria: entregar / escalar (Dialog si cambia de responsable).

#### Feedback

- Al completar, confirmación y retorno sugerido a cola o tarea.
- Escalar: confirmación con destino (si Unknown → pregunta abierta, no inventar rol).

#### Comportamiento responsive

- Origen + pendiente siempre visibles; historial en expansión.

#### Accesibilidad

- Relación origen ↔ pendiente en headings; foco a la primera acción primaria al cargar.

---

### Visión operativa

#### Propósito

Dar al supervisor una lectura del estado operativo **junto con la confianza de los datos**, y abrir incidencias.

#### Jerarquía de contenido

1. Condición de confianza global / por área (antes que volumen).
2. Incidencias disponibles.
3. Acceso al detalle de incidencia.

#### Estructura de layout

- **Franja de confianza:** Alert o grupo de `SyncStatus` / confianza (`background.muted`).
- **Lista de incidencias:** Table o lista prioritaria.
- No inventar paneles KPI que UX dejó abiertos.

#### Componentes

- Alert de confianza; Table/lista; Badge; Button/link “Abrir incidencia”.
- Empty state si no hay incidencias.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Datos confirmados | Confianza en `status.success` + texto. |
| Parcialmente pendientes | `status.warning` + qué está pendiente. |
| Requiere revisión | Destacar incidencias. |
| Vacío / carga | Empty / Skeleton. |

#### Acciones

- Primaria: abrir incidencia seleccionada.
- Secundaria: filtrar por confianza/estado.

#### Feedback

- Si los datos están parciales, el listado no se presenta como “tiempo real confirmado”.

#### Comportamiento responsive

- Franja de confianza nunca se oculta; lista pasa a cards; filtros a Sheet.

#### Accesibilidad

- Confianza anunciada al entrar en la vista; tabla/lista navegable por teclado.

---

### Detalle de incidencia

#### Propósito

Comprender una incidencia, su confianza, y continuar hacia diferencia o investigación.

#### Jerarquía de contenido

1. Incidencia + confianza.
2. Casos / enlaces relacionados.
3. Continuación permitida (diferencia o investigación).

#### Estructura de layout

- Cabecera + Alert de estado.
- Cuerpo de detalle.
- Bloque de “continuar a…” con acciones claras (no menú genérico inventado).

#### Componentes

- Alert, Badge, Buttons/links hacia Detalle de diferencia o Investigación de artículo.
- Separación visual entre “entender” y “continuar”.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Confirmada | Continuaciones habilitadas. |
| Datos pendientes | Advertencia; algunas continuaciones pueden quedar limitadas. |
| Acceso restringido | Sin continuar a investigación si el permiso no alcanza. |

#### Acciones

- Primaria: continuar al destino relevante según el tipo de incidencia.
- Secundaria: volver a visión operativa.

#### Feedback

- Si no hay permiso para un destino, explicar en texto.

#### Comportamiento responsive

- Acciones de continuación apiladas; detalle primero.

#### Accesibilidad

- Destinos como enlaces/botones con nombre del destino; no iconos solos.

---

### Investigación de artículo

#### Propósito

Permitir al auditor seguir la historia de un artículo o caso y elegir un movimiento.

#### Jerarquía de contenido

1. Artículo / caso de origen + búsqueda.
2. Historia de movimientos (momento + estado).
3. Entrada a Detalle de movimiento.

#### Estructura de layout

- **Barra de búsqueda/contexto** arriba.
- **Historia** como Table/lista principal.
- **Panel o navegación** al detalle (en desktop puede ser split; en móvil = navegación).

#### Componentes

- Input de búsqueda, Table/lista, `EvidenceState`, Skeleton.
- Filas activables → Detalle de movimiento.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Evidencia disponible | Filas completas. |
| Pendiente | Badge pendiente en filas afectadas. |
| Acceso restringido | Filas limitadas + Alert. |
| Vacío / carga | Empty / Skeleton. |

#### Acciones

- Primaria: abrir movimiento.
- Secundaria: refinar búsqueda/filtro.

#### Feedback

- Búsqueda sin resultados → empty state.
- Error de permiso al abrir detalle → Alert y se permanece en la lista.

#### Comportamiento responsive

- Split historia|detalle solo en ancho; en estrecho, historial completo → push al detalle.

#### Accesibilidad

- Resultados anunciados; historial ordenado cronológicamente de forma explícita.

---

### Detalle de movimiento

#### Propósito

Consultar la evidencia autorizada de un movimiento (actor, momento, terminal, origen, destino, cambios, estado) y volver a la historia.

#### Jerarquía de contenido

1. Identidad del movimiento + `EvidenceState` / sync.
2. Hechos del movimiento (campos semánticos).
3. Cambios / correcciones posteriores si existen.
4. Volver a la investigación.

#### Estructura de layout

- Cabecera con estado.
- Secciones de hechos agrupadas (quién/cuándo/dónde → qué cambió).
- Pie o cabecera con retorno a Investigación de artículo.

#### Componentes

- Detalle estructurado (definición list / sections), `EvidenceState`, Alert de permiso, Button “Volver a la historia” → `action.secondary`.

#### Estados

| Estado | Qué cambia |
| ------ | ---------- |
| Confirmado | Evidencia completa según permiso. |
| Pendiente de sincronización | Advertencia; no presentar como confirmado central. |
| Acceso restringido | Campos ocultos o enmascarados + explicación. |

#### Acciones

- Primaria de pantalla: volver (la investigación es el hub).
- Sin edición operativa (alineado con UX: auditoría no modifica operación).

#### Feedback

- Si falta evidencia, listar qué no está disponible — no inventar datos.

#### Comportamiento responsive

- Secciones apiladas; retorno siempre accesible (top o sticky).

#### Accesibilidad

- Encabezados por grupo de hechos; retorno con foco restaurable a la fila de origen cuando el patrón de navegación lo permita.

---

## 5. Comportamiento entre pantallas

- `SyncStatus`, `EvidenceState` y `TaskState` usan el mismo vocabulario textual e iconográfico en todas las pantallas; el color solo refuerza el significado.
- Las acciones de cierre, corrección, derivación y escalado dan confirmación inmediata y conservan el vínculo con el caso de origen.
- Carga mediante Skeleton; errores con Alert asociado a una acción de recuperación; estados vacíos explican qué falta sin inventar trabajo.
- Tabulación, foco visible y activación por teclado están disponibles en formularios, tablas, diálogos, filtros y controles de acción.
- Recepción y tarea operativa comparten el patrón de workspace denso + barra de acción persistente; colas y visiones comparten Table + filtros.

## 6. Preguntas abiertas

- ¿Qué validación local basta para cerrar una recepción con identidad y cantidad verificadas?
- ¿Qué movimientos o excepciones no pueden cerrarse sin confirmación remota?
- ¿Quién recibe una recepción, diferencia o seguimiento pendiente y con qué permisos?
- ¿Qué reglas resuelven conflictos de sincronización y qué estado verá cada rol mientras tanto?
- ¿Qué controles, aparte de identidad y cantidad, pueden aplazarse durante una hora punta?
- ¿Qué señales y KPIs necesita realmente un supervisor para intervenir?
- ¿Qué evidencia, permisos y reglas de retención necesita un auditor?

## 7. Notas de implementación

- Implementar la capa de tokens como variables CSS o tokens de Tailwind; los componentes consumen tokens semánticos, nunca `primary.600` directamente.
- Emplear shadcn/ui como base: Form para validaciones, Table para colas e historia, Alert/Badge para estado, Dialog para confirmaciones y Sheet para detalle contextual responsive.
- Mantener `SyncStatus`, `EvidenceState`, `ExceptionReason` y `TaskState` como composiciones reutilizables con texto, icono y semántica accesible.
- Validar contraste, objetivos táctiles con guantes y navegación por teclado en los flujos de recepción y tarea operativa antes de pulir casos secundarios.
- Prioridad de build sugerida: Espacio de recepción → Espacio de tarea operativa → Detalle de diferencia → Cola de revisión → resto.
