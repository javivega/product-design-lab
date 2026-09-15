# Diseño de interfaz — NovaStock Pro

## 1. Alcance y fuentes

El alcance incluye las diez pantallas definidas en la arquitectura UX: Espacio de recepción, Revisión de excepción, Detalle de diferencia, Cola de revisión, Espacio de tarea operativa, Detalle de seguimiento pendiente, Visión operativa, Detalle de incidencia, Investigación de artículo y Detalle de movimiento.

Fuentes vinculadas en `sources/manifest.md`. La marca no define colores en el briefing; el sistema visual queda pendiente de la elección de marca antes de fijar sus primitivas.

## 2. Sistema de diseño

### Primitivas

- `primary`: #0166FF, aportado por el diseñador.
- `neutral`: escala fría para fondos, texto y bordes.
- `info`, `success`, `warning`, `error`: escalas independientes de la marca.

### Tokens semánticos

- `background.default`, `background.subtle`, `background.muted`; `foreground.default`, `foreground.muted`, `foreground.inverse`.
- `action.primary`, `action.primary-hover`, `action.secondary`, `action.destructive`; `border.default`, `border.strong`, `border.focus`.
- `selector.hover`, `selector.selected`, `selector.disabled`; `status.info`, `status.success`, `status.warning`, `status.error`.
- La marca alimenta `action.primary`, `selector.selected` y `border.focus`. Los estados semánticos no usan el azul de marca.

### Tipografía, dispositivos y geometría

- `device.text`: `sm`, `md`, `lg`, `xl`; texto operativo legible en terminal táctil, con `lg` como mínimo para acciones críticas.
- `space`: 1, 2, 3, 4, 6, 8; `radius`: `sm`, `md`; las zonas táctiles siguen un mínimo consistente.
- En móvil o ventana estrecha, el contenido se reordena y se desplaza; no se crea un producto distinto.

### Vocabulario y patrones

- shadcn/ui: Button, Input, Select, Checkbox, Dialog, Sheet, Alert, Badge, Table, Tabs, Tooltip, Breadcrumb, Dropdown Menu y Form.
- Patrones: espacio operativo denso, estado de sincronización, formulario con validación, fila de excepción, cola de trabajo, detalle con historia y confirmación de decisión.
- Un `SyncStatus` combina Badge, icono y texto; un `CaseStatus` hace lo mismo para pendiente, revisión y resuelto.

### Reglas compartidas

- Acción principal: `action.primary`; acción secundaria: `action.secondary`; acción destructiva: `action.destructive`.
- Todo estado se comunica con texto e icono además de color.
- Errores se asocian al campo o acción afectada; el foco siempre usa `border.focus`.

## 3. Arquitectura de interfaz

La interfaz comparte un contexto operativo compacto: identidad de la tarea o caso, condición de confianza y acciones del trabajo actual. No añade destinos fuera de la arquitectura UX.

Las tareas que deben sobrevivir a la sesión —excepciones, diferencias y seguimiento— usan el patrón de cola de trabajo. Los detalles usan contexto principal más historia o evidencia progresiva. El estado de sincronización se expresa dentro de cada superficie mediante `SyncStatus`, no como área de navegación independiente.

## 4. Pantallas

### Espacio de recepción
#### Propósito
Registrar y cerrar una recepción con identidad y cantidad verificadas.
#### Jerarquía de contenido
La tarea y su estado `SyncStatus` son primarios; artículos y cantidades siguen; el contexto y la ayuda son progresivos.
#### Estructura de diseño
Contexto de recepción arriba, espacio de registro como área principal y acciones persistentes al cierre.
#### Componentes
Input/Form para identificación, Table para artículos, Button primario con `action.primary`, `SyncStatus` con `status.*`.
#### Estados
Con red, sin red, pendiente, confirmado y requiere revisión cambian el texto, acciones habilitadas y prioridad de la condición.
#### Acciones
Registrar y verificar son de tarea; Cerrar localmente es la acción primaria; derivar excepción es secundaria.
#### Feedback
La confirmación nombra explícitamente «guardado localmente» o «confirmado»; errores quedan junto al dato afectado.
#### Comportamiento responsive
La tabla se desplaza horizontalmente; el contexto se compacta y las acciones permanecen accesibles.
#### Accesibilidad
Etiquetas persistentes, foco visible, teclado para registro, objetivos táctiles amplios y anuncios del cambio de sincronización.

### Revisión de excepción
#### Propósito
Comprender y entregar una recepción que no puede cerrarse localmente.
#### Jerarquía de contenido
Motivo, estado y siguiente responsable dominan; evidencia y movimiento aportan el contexto secundario.
#### Estructura de diseño
Resumen de caso, evidencia agrupada y área final para la decisión o entrega.
#### Componentes
Alert semántico, `CaseStatus`, Table de evidencia, Select de responsable, Button primario y Dialog de confirmación.
#### Estados
Requiere revisión, acceso restringido y confirmado cambian evidencia disponible y acciones.
#### Acciones
Revisar es primaria; entregar y volver a trabajo son secundarias.
#### Feedback
La entrega confirma responsable y estado; los permisos denegados explican qué sigue disponible.
#### Comportamiento responsive
La evidencia pasa a bloques apilados y las decisiones abren Sheet cuando falta ancho.
#### Accesibilidad
Alert con texto, relaciones entre motivo y evidencia, foco devuelto tras Dialog y alternativa por teclado.

### Detalle de diferencia
#### Propósito
Permitir al supervisor decidir si una diferencia se corrige o queda pendiente.
#### Jerarquía de contenido
La diferencia, confianza del dato y decisión son primarias; movimientos y evidencia se consultan después.
#### Estructura de diseño
Resumen de diferencia, contexto de movimientos y zona de resolución separada visualmente.
#### Componentes
`CaseStatus`, Table, Badge de sincronización, Accordion para evidencia, Form y Dialog para confirmar corrección.
#### Estados
Corregible, requiere revisión, datos pendientes y acceso restringido limitan las acciones de resolución.
#### Acciones
Registrar corrección segura es primaria solo si procede; dejar pendiente es secundaria y visible.
#### Feedback
La interfaz explica la condición que permite o bloquea corregir y confirma el destino del caso.
#### Comportamiento responsive
El contexto se vuelve secciones desplegables; las acciones de decisión quedan ancladas al final.
#### Accesibilidad
Estado descrito por texto, orden de foco del resumen a la decisión y errores asociados al motivo.

### Cola de revisión
#### Propósito
Encontrar, priorizar y retomar trabajo pendiente sin cerrar con falsa certeza.
#### Jerarquía de contenido
Los casos y su condición son primarios; filtros y responsable ayudan a encontrar el siguiente caso.
#### Estructura de diseño
Controles de búsqueda y filtro antes de una lista densa de casos; detalle se abre desde cada fila.
#### Componentes
Input, Select, Table, `CaseStatus`, Dropdown Menu y Pagination con tokens de selector.
#### Estados
Pendiente, en revisión, resuelto, vacío y carga mantienen texto explicativo junto al estado.
#### Acciones
Abrir caso es primaria por fila; priorizar o entregar son secundarias.
#### Feedback
Los cambios de responsable o estado se confirman en la fila y mediante mensaje no bloqueante.
#### Comportamiento responsive
La tabla prioriza caso y estado; atributos secundarios entran en Sheet de filtros o detalle.
#### Accesibilidad
Cabeceras de tabla, filtros con etiqueta, ordenamiento anunciado y navegación completa por teclado.

### Espacio de tarea operativa
#### Propósito
Completar picking o packing sin omitir identidad ni cantidad.
#### Jerarquía de contenido
Artículo, cantidad y control mínimo dominan; el contexto de tarea y seguimiento son secundarios.
#### Estructura de diseño
Identidad de tarea, área principal de comprobación y zona persistente de completar o derivar.
#### Componentes
Input/Form, Checkbox o control de verificación, `CaseStatus`, Button y Alert para bloqueos.
#### Estados
Normal, hora punta, pendiente de seguimiento y requiere revisión cambian la explicación, no los controles mínimos.
#### Acciones
Completar es primaria tras verificar; derivar seguimiento permitido es secundaria.
#### Feedback
La confirmación distingue tarea completa de seguimiento creado; la falta de verificación bloquea y explica.
#### Comportamiento responsive
La información de tarea se compacta; controles y acción principal permanecen en una secuencia vertical.
#### Accesibilidad
Verificaciones con nombre claro, mensajes de error asociados, teclado y zonas táctiles amplias con guantes.

### Detalle de seguimiento pendiente
#### Propósito
Retomar un control o registro aplazado durante la hora punta.
#### Jerarquía de contenido
El control pendiente, origen y responsable son primarios; contexto operativo es secundario.
#### Estructura de diseño
Resumen del seguimiento, contexto de tarea original y área de cierre, entrega o escalado.
#### Componentes
`CaseStatus`, Table o lista de contexto, Select, Form, Button y Dialog.
#### Estados
Pendiente, en curso y resuelto determinan acciones disponibles y mensaje de continuidad.
#### Acciones
Completar es primaria; entregar o escalar son secundarias.
#### Feedback
Cada cambio confirma el responsable y dónde continuará el trabajo.
#### Comportamiento responsive
El contexto colapsa bajo el control pendiente; acciones se apilan.
#### Accesibilidad
Responsable y estado legibles por lector, foco visible y confirmaciones anunciadas.

### Visión operativa
#### Propósito
Permitir al supervisor leer el estado operativo junto con la confianza de los datos.
#### Jerarquía de contenido
La condición de confianza y las incidencias disponibles preceden a cualquier cifra; detalles se revelan al abrir un caso.
#### Estructura de diseño
Resumen de confianza, grupos de incidencias y acceso a su detalle; no presupone KPIs concretos.
#### Componentes
`SyncStatus`, `CaseStatus`, Alert, Table o lista de incidencias, Button/Link de detalle.
#### Estados
Confirmada, parcialmente pendiente y requiere revisión cambian explicación, énfasis y acciones de apertura.
#### Acciones
Abrir incidencia es primaria contextual; actualizar consulta es secundaria.
#### Feedback
Las cifras provisionales se etiquetan como tales con texto e icono, nunca solo color.
#### Comportamiento responsive
Los grupos se apilan; los atributos secundarios aparecen al expandir una incidencia.
#### Accesibilidad
Orden de lectura prioriza confianza, etiquetas descriptivas para estado y foco claro al abrir detalle.

### Detalle de incidencia
#### Propósito
Explicar una incidencia y llevar al supervisor al contexto de resolución correcto.
#### Jerarquía de contenido
Estado, confianza y siguiente relación dominan; los datos de apoyo permanecen secundarios.
#### Estructura de diseño
Resumen de incidencia, hechos relacionados y decisiones para continuar hacia diferencia o investigación.
#### Componentes
Alert, `CaseStatus`, `SyncStatus`, Accordion, Button y Breadcrumb.
#### Estados
Confirmada, datos pendientes y requiere revisión condicionan qué continuación está disponible.
#### Acciones
Abrir diferencia o investigación son primarias según relación; volver es secundaria.
#### Feedback
Las transiciones preservan una referencia de origen; la información pendiente explica su impacto.
#### Comportamiento responsive
Hechos relacionados se convierten en secciones expandibles; acciones se ordenan por disponibilidad.
#### Accesibilidad
Encabezados semánticos, botones con destino explícito y foco devuelto al contexto al regresar.

### Investigación de artículo
#### Propósito
Permitir al auditor seguir la historia autorizada de un artículo o incidencia.
#### Jerarquía de contenido
Identidad del artículo y secuencia de movimientos son primarias; filtros y metadatos son secundarios.
#### Estructura de diseño
Contexto de investigación, historia ordenada y acceso progresivo al detalle de cada movimiento.
#### Componentes
Input, Table/lista cronológica, `SyncStatus`, Badge de permisos, Tabs solo para vistas equivalentes y Button/Link de detalle.
#### Estados
Evidencia disponible, pendiente, acceso restringido, vacío y carga alteran qué historia puede explorarse.
#### Acciones
Abrir movimiento es primaria contextual; filtrar o cambiar investigación es secundaria.
#### Feedback
Cada evento nombra su estado y acceso; ausencia de evidencia explica si es pendiente o restringida.
#### Comportamiento responsive
La historia pasa a lista vertical; filtros se abren en Sheet y detalles secundarios se ocultan progresivamente.
#### Accesibilidad
Orden temporal anunciado, relaciones entre eventos descritas y controles de filtro etiquetados.

### Detalle de movimiento
#### Propósito
Mostrar la evidencia autorizada de un evento sin sacar al auditor de su historia.
#### Jerarquía de contenido
Qué movimiento ocurrió, cuándo y su estado son primarios; actor, terminal, origen y destino dan contexto.
#### Estructura de diseño
Resumen del movimiento, grupos de evidencia y retorno claro a la investigación de origen.
#### Componentes
`SyncStatus`, Badge de permisos, Table de cambios, Accordion, Breadcrumb y Button secundario de retorno.
#### Estados
Confirmado, pendiente de sincronización y acceso restringido cambian la disponibilidad y explicación de la evidencia.
#### Acciones
Volver a la historia es primaria de navegación; revisar evidencia relacionada es secundaria.
#### Feedback
El estado se explica junto al dato afectado; restricciones no se presentan como datos ausentes sin explicación.
#### Comportamiento responsive
Los atributos se apilan por grupos; tablas de cambios se desplazan de forma accesible.
#### Accesibilidad
Estructura por encabezados, relaciones de datos en tabla, retorno por teclado y anuncio de restricción.

## 5. Comportamiento entre pantallas

`SyncStatus` y `CaseStatus` conservan el mismo lenguaje, icono y tokens semánticos en recepción, diferencias, colas, supervisión e investigación. Los cambios de estado confirman qué se guardó, qué sigue pendiente y quién debe continuar el trabajo.

Las colas y los detalles preservan el origen del caso. El foco vuelve al disparador tras cerrar un detalle o diálogo. Los flujos de excepción, seguimiento e investigación no dependen únicamente del color ni de mensajes efímeros.

## 6. Preguntas abiertas

- ¿Qué validación local basta para cerrar una recepción?
- ¿Qué movimientos no pueden cerrarse sin confirmación remota?
- ¿Qué permisos y reglas resuelven conflictos de sincronización?
- ¿Qué controles adicionales pueden aplazarse durante la hora punta?
- ¿Qué señales operativas y KPIs necesita realmente el supervisor?
- ¿Qué evidencia puede ver el auditor y cuánto tiempo debe conservarse?

## 7. Notas de implementación

- Usar Tailwind para implementar los tokens semánticos como variables de tema; las primitivas no se consumen desde pantallas.
- Componer con shadcn/ui y wrappers de dominio como `SyncStatus` y `CaseStatus`; evitar bifurcar componentes por cada pantalla.
- Validar contraste, foco, teclado, lectores y táctil en terminales industriales antes de fijar la implementación.
