# Experiencia — Vínculo Animal

## 1. Alcance y fuentes

Arquitectura de experiencia a partir de `runs/ideator/20260915-2052-vinculo-animal/ideation.md`. Problems: `runs/problem-framer/20260915-2052-vinculo-animal/`. Brief: `runs/brief-analyst/20260915-2052-vinculo-animal/`.

Los cuatro JTBD están in scope. Caminos elegidos por el diseñador. Esto es arquitectura de comportamiento y superficies, no UI visual.

## 2. Experiencia por JTBD

---

### JTBD 1 — Anotar la evolución al terminar la clase

#### Camino elegido
**Captura de bolsillo que ya es la ficha.** Lo anotado al terminar la clase entra en el historial de esa sesión/familia. No es un limbo, ni una foto de la libretita, ni “luego en el PC”.

#### Comportamiento esperado
El educador, aún en el sitio, identifica la sesión de ahora (o la familia) y deja una nota corta que **ya es** el historial. No reescribe después para que “cuente”. Si no hay red, la nota debe poder existir igual; las reglas de sync son desconocidas.

#### Principios UX que importan
Si “guardar” no se entiende, el papel gana: el estado de la nota (en la ficha / aún no) tiene que ser obvio. Carga cognitiva mínima: más de un momento de búsqueda y el gesto muere.

#### Estructura de la experiencia
- **Momento de captura** — los treinta segundos in situ.
- **Sesión de ahora** — el contenedor al que se pega la nota.
- **Nota de evolución** — el rastro que ya vive en el archivo.
- **Relación:** captura → sesión de ahora → nota ya en el historial de la familia.

#### Arquitectura de pantallas
- **Sesión** en estado *captura mínima* es la superficie (no un CRM aparte). Identificar familia/sesión puede ocurrir en **Encontrar familia** si no está preligada.
- La nota no es una pantalla propia: es contenido de la sesión.
- Escritorio vs bolsillo es el mismo concepto en distinto contexto de entrada, no dos productos.

#### Flujo de usuario

##### Principal

1. **Entrar al momento** — Desde **Mi día** (sesión de ahora) o, si no está a mano, **Encontrar familia**.
2. **Abrir la sesión** — En **Sesión** (*captura mínima*): el educador escribe la evolución.
3. **Confirmar** — El sistema deja la nota en el historial de esa familia/sesión y muestra que ya está en el archivo (no “borrador en el móvil”).
4. **Salir** — Vuelve a **Mi día** o cierra; no hay un paso extra de “subir al CRM”.

##### Excepciones críticas

###### No está ligada la sesión de ahora

- **Disparador:** no hay “esta clase” en Mi día, o hay varias familias.
- **Flujo:** **Encontrar familia** (se ven huecos, pero el objetivo es acertar la ficha) → **Ficha de familia** o directo a **Sesión**.
- **Retoma:** captura mínima en **Sesión**.

###### Sin red (política desconocida)

- **Disparador:** no hay internet en el sitio.
- **Flujo:** si se puede guardar en el dispositivo, **Sesión** indica que la nota existe pero aún no está en los otros ordenadores. Si no se puede, el flujo no inventa la regla: queda en preguntas.
- **Retoma:** al volver la red, la nota debe aparecer en la ficha; el cómo es desconocido.

#### Escenarios críticos

**Escenario: al terminar en el sitio**
- Contexto: acaba la clase; libretita a mano; no hay escritorio.
- Objetivo: dejar la evolución antes de irse.
- Estados: captura mínima; posiblemente sin red.
- Pantallas: Mi día o Encontrar familia → Sesión (captura mínima).
- Resultado: la nota está en el historial, no solo en el papel.
- Por qué: es el hábito evidenciado y el reframe de la ideación.

---

### JTBD 2 — Encontrar los datos de una familia

#### Camino elegido
**Un sitio que enseña lo que falta.** Al buscar o abrir, se ve qué no está. La captura va llenando el archivo; no se finge una ficha completa.

#### Comportamiento esperado
El educador busca por perro o humano y llega a una ficha que declara huecos (contacto, salud, reactividad, última nota). Puede completar lo urgente o entrar a la sesión. No reconstruye WhatsApp + Drive a ciegas.

#### Principios UX que importan
Reconocimiento frente a recuerdo: los huecos se ven, no se adivinan. No ocultar lo incompleto para “parecer CRM”.

#### Estructura de la experiencia
- **Búsqueda** — localizar perro o humano.
- **Ficha incompleta** — la familia como archivo honesto.
- **Huecos** — qué falta para dar la siguiente clase o mandar pautas.
- **Relación:** búsqueda → ficha que muestra huecos → completar, abrir historial o crear/abrir sesión.

#### Arquitectura de pantallas
- **Encontrar familia** y **Ficha de familia** son superficies distintas: una elige, la otra es el archivo.
- Los huecos son **estado** de la ficha (y pueden asomarse en resultados), no una pantalla de “incompletos”.
- No hay un módulo “importar WhatsApp”.

#### Flujo de usuario

##### Principal

1. **Buscar** — En **Encontrar familia**: nombre de perro o humano.
2. **Elegir** — El resultado puede mostrar si la ficha está muy incompleta.
3. **Leer la ficha** — En **Ficha de familia** (*con huecos visibles*): historial, contacto, próximos huecos.
4. **Decidir:** completar un hueco aquí, abrir **Sesión**, o volver.

##### Excepciones críticas

###### Dos fichas o ningún resultado

- **Disparador:** nombre ambiguo o familia no creada.
- **Flujo:** desambiguar en **Encontrar familia**, o crear familia mínima (nombre + perro) y entrar a ficha con casi todo hueco.
- **Retoma:** ficha honesta, no un formulario largo.

###### Dato en conflicto (desconocido)

- **Disparador:** el educador “sabe” que el teléfono de WhatsApp no es el de la ficha.
- **Flujo:** no hay regla de fusión. La ficha muestra el dato que tiene; corregir es editar el hueco/campo. No se simula un merge automático.

#### Escenarios críticos

**Escenario: cazar a Luna antes de la siguiente clase**
- Contexto: escritorio; los datos estaban en WhatsApp y Drive.
- Objetivo: abrir la familia y ver qué falta.
- Estados: ficha incompleta.
- Pantallas: Encontrar familia → Ficha de familia.
- Resultado: se ve el hueco (p. ej. salud o última nota), no una ficha “llena” falsa.
- Por qué: camino elegido; el archivo empieza a medias.

---

### JTBD 3 — Mandar los ejercicios para casa

#### Camino elegido
**Redactar una vez; el canal al final.** Las pautas viven en la sesión. WhatsApp o PDF es el último gesto.

#### Comportamiento esperado
El educador abre la sesión, escribe (o retoca) las pautas una vez, y elige cómo salen. No hay un documento paralelo que luego se copia. El envío in-app no está en el RFP: “enviar” puede ser compartir/copiar.

#### Principios UX que importan
Un solo origen. El canal no debe obligar a reescribir. Control: el educador decide WhatsApp vs PDF, no un correo por defecto.

#### Estructura de la experiencia
- **Pautas de la sesión** — el texto único.
- **Último paso de canal** — WhatsApp (tubo a la familia) o PDF (marca).
- **Relación:** sesión (ya con nota de evolución, si existe) → redacción única → canal.

#### Arquitectura de pantallas
- Las pautas son parte de **Sesión** en estado *redacción completa*, no un editor huérfano.
- El PDF y el compartir son **acciones/estados de salida** de esa misma superficie, no un “módulo exportación”.
- No hay bandeja de correo.

#### Flujo de usuario

##### Principal

1. **Abrir la sesión** — Desde **Ficha de familia**, **Mi día** o tras la captura.
2. **Redactar** — En **Sesión** (*redacción completa*): un texto de ejercicios.
3. **Canal:** compartir/copiar hacia WhatsApp, o generar PDF con membrete, o ambos, **sin** duplicar el texto.
4. **Cierre** — La sesión recuerda que las pautas existen (no el estado del WhatsApp del cliente, que es desconocido).

##### Excepciones críticas

###### No hay nota de evolución todavía

- **Disparador:** se redactan pautas sin captura in situ.
- **Flujo:** se puede escribir igual; no se obliga a la nota. Opcional: avisar que el historial está vacío (hueco), no bloquear.

###### Envío “hecho” vs copiado

- **Disparador:** el producto no controla WhatsApp.
- **Flujo:** no fingir “entregado al cliente”. Como mucho, “listo para pegar / archivo generado”.

#### Escenarios críticos

**Escenario: una redacción, dos salidas**
- Contexto: escritorio, después de clase; el último hábito real fue pegar en WhatsApp.
- Objetivo: no escribir dos veces.
- Estados: redacción completa; salida WhatsApp y/o PDF.
- Pantallas: Sesión (redacción completa).
- Resultado: el mismo texto sale por el tubo y, si hace falta, como PDF.
- Por qué: postura del diseñador en ideación y UX.

---

### JTBD 4 — Ver las sesiones del propio día

#### Camino elegido
**La sesión nace en la ficha; el calendario es una vista.** Se cita desde la familia. Mi día (y el color de equipo) son vistas de esas sesiones, no un módulo de huecos vacíos primero.

#### Comportamiento esperado
El educador crea o confirma la próxima clase en la **Ficha de familia**. **Mi día** lista las suyas. El equipo en color es consulta, no el lugar donde se vive. No hay evidencia de choques; no se diseña un árbitro de conflictos.

#### Principios UX que importan
La unidad es la sesión-con-familia, no el hueco semanal. Flexibilidad: ver al equipo sin obligar a planificar ahí.

#### Estructura de la experiencia
- **Próxima sesión en la ficha** — nacer el evento.
- **Mi día** — qué me toca.
- **Vista de equipo** — los otros en color (consulta).
- **Relación:** ficha → sesión → aparece en mi día (y opcionalmente en la vista de equipo).

#### Arquitectura de pantallas
- **Mi día** es la superficie de “qué me toca”. La vista de equipo es **estado** de esa superficie (o un modo), no un producto de calendario aparte.
- Crear sesión: acción desde **Ficha de familia** (destino: la misma **Sesión**).
- No se añade un constructor de “semana vacía” como pantalla primaria.

#### Flujo de usuario

##### Principal

1. **En la ficha** — El educador fija próxima clase (cuándo, quién la da).
2. **El sistema** — Crea **Sesión** ligada a esa familia y al educador.
3. **Mi día** — Ese día, la sesión aparece con el nombre del perro/familia.
4. **Consultar equipo (opcional)** — **Mi día** (*vista equipo*): colores por educador; no hay que pasar por ahí para trabajar.

##### Excepciones críticas

###### Choque de horario

- **Disparador:** dos sesiones a la misma hora (no evidenciado).
- **Flujo:** no hay árbitro. Como mucho, ambas se listan. Política desconocida; no inventar bloqueo.

###### Captura in situ sin sesión previa

- **Disparador:** hubo clase no dada de alta.
- **Flujo:** desde **Encontrar familia** se abre o crea **Sesión** “de ahora” (JTBD 1). Luego existe en Mi día.

#### Escenarios críticos

**Escenario: la próxima Luna nace en su ficha**
- Contexto: escritorio, planificando.
- Objetivo: que martes 18:00 exista como sesión de esa familia, no como bloque ciego.
- Estados: mi día; opcional vista equipo.
- Pantallas: Ficha de familia → Sesión; luego Mi día.
- Resultado: el día propio muestra la clase; el color de equipo es consultable.
- Por qué: camino elegido; une archivo y agenda.

## 3. Arquitectura de la solución

### Áreas de producto
- **Archivo de familias** — encontrar y ver huecos (JTBD 2); nacer sesiones (JTBD 4).
- **Sesión** — captura, historial, pautas y salida (JTBD 1 y 3).
- **Mi día** — vistas de las sesiones propias y, en consulta, del equipo (JTBD 4); entrada a la captura (JTBD 1).

### Entidades / conceptos
- **Familia** — humano responsable + perro (1:1 es supuesto; varios perros es incógnita).
- **Sesión** — clase ligada a familia y educador, con nota de evolución y pautas.
- **Educador** — quién da la sesión (color en vista de equipo).
- **Hueco** — campo o rastro que falta en la ficha (no una entidad de negocio aparte).

### Relaciones
- Familia tiene muchas sesiones.
- Sesión tiene como máximo una nota de evolución relevante para el historial (puede crecer como muro).
- Sesión tiene un texto de pautas (un origen).
- Educador tiene muchas sesiones; Mi día filtra por “yo”.

### Estados transversales
- **Ficha incompleta** — huecos visibles.
- **Sesión en captura mínima** vs **redacción completa**.
- **Nota en el archivo** vs **pendiente de ver en otros ordenadores** (sync desconocido).
- **Pautas listas para canal** (no “entregadas al cliente”).
- **Mi día** vs **vista equipo**.

### Modelo de navegación
- **Entradas:** Mi día (sesión de ahora / el día); Encontrar familia (nombre).
- **Destinos:** Ficha de familia; Sesión.
- **Retornos:** de Sesión a Ficha o a Mi día; de Ficha a Encontrar familia.
- **Cruce de JTBD:** la nota de captura es el historial que la ficha muestra; las pautas se redactan en la misma sesión; la sesión creada en la ficha aparece en Mi día.

No se prescribe barra lateral, pestañas ni chrome (el RFP pide navegación visible; eso es UI).

## 4. Inventario de pantallas

### Encontrar familia
- **Propósito:** localizar una familia por perro o humano, o crear una mínima.
- **Usuario principal:** educador (escritorio o bolsillo si la sesión no está ligada).
- **Soporta:** JTBD 1 (excepción), JTBD 2.
- **Entradas:** inicio de búsqueda; “no está la sesión de ahora”.
- **Salidas:** Ficha de familia; Sesión; crear familia mínima.
- **Información:** coincidencias de nombre; indicio de ficha muy incompleta.
- **Acciones primarias:** buscar, abrir, crear mínima.
- **Acciones secundarias:** ninguna obligatoria.
- **Estados:** sin resultados; varios resultados; listado con huecos asomados.
- **Relacionadas:** Ficha de familia, Sesión.
- **Abiertas:** ¿crear familia exige perro y humano a la vez?

### Ficha de familia
- **Propósito:** archivo honesto de una familia: datos, huecos, historial, nacer próxima sesión.
- **Usuario principal:** educador.
- **Soporta:** JTBD 2, JTBD 4; consulta para 1 y 3.
- **Entradas:** Encontrar familia; desde una Sesión.
- **Salidas:** Sesión (captura o redacción); Encontrar familia; Mi día (tras crear sesión).
- **Información:** contacto, perro, huecos, historial de sesiones/notas, próxima sesión si existe.
- **Acciones primarias:** abrir sesión, crear próxima sesión, completar un hueco.
- **Acciones secundarias:** volver a buscar.
- **Estados:** incompleta (huecos); más completa; historial vacío.
- **Relacionadas:** Encontrar familia, Sesión, Mi día.
- **Abiertas:** ¿varios perros o tutores en una ficha?

### Sesión
- **Propósito:** la clase concreta: captura de evolución, pautas de un solo origen, salida de canal.
- **Usuario principal:** educador.
- **Soporta:** JTBD 1, JTBD 3; destino de JTBD 4.
- **Entradas:** Mi día; Ficha de familia; Encontrar familia.
- **Salidas:** Ficha de familia; Mi día; canal externo (WhatsApp/PDF, fuera o compartir).
- **Información:** familia/perro, educador, momento, nota de evolución, texto de pautas, si la nota ya está en el archivo.
- **Acciones primarias:** guardar nota (captura); guardar pautas; compartir/copiar; generar PDF.
- **Acciones secundarias:** ir a la ficha.
- **Estados:** captura mínima; redacción completa; nota pendiente de sync (si aplica); pautas listas para canal.
- **Relacionadas:** Ficha de familia, Mi día, Encontrar familia.
- **Abiertas:** ¿captura y redacción son dos estados o dos momentos en la misma vista? Política sin red.

### Mi día
- **Propósito:** ver las sesiones propias de hoy (y, en consulta, las del equipo).
- **Usuario principal:** educador.
- **Soporta:** JTBD 4; entrada a JTBD 1.
- **Entradas:** arranque del día; retorno desde Sesión.
- **Salidas:** Sesión; (opcional) Ficha de familia.
- **Información:** sesiones de “yo” con nombre de familia/perro; en vista equipo, sesiones de otros con distinción por educador.
- **Acciones primarias:** abrir sesión de ahora / de hoy.
- **Acciones secundarias:** pasar a vista equipo y volver a “mío”.
- **Estados:** mi día; vista equipo; vacío (sin sesiones).
- **Relacionadas:** Sesión, Ficha de familia.
- **Abiertas:** ¿hace falta semana/mes como superficies o basta el día como vista primaria?

No hay pantallas de ajustes, onboarding, notificaciones ni dashboard: no salen de los caminos.

## 5. Escenarios críticos

### Al terminar en el sitio
- **JTBD:** 1
- **Contexto:** fin de clase, sin escritorio.
- **Objetivo:** nota en el historial antes de irse.
- **Estados:** captura mínima; posible sin red.
- **Pantallas:** Mi día o Encontrar familia → Sesión.
- **Resultado:** la libretita no es el único rastro.
- **Por qué:** evidencia + reframe compartido.

### Cazar a Luna y ver el hueco
- **JTBD:** 2
- **Contexto:** escritorio; datos partidos.
- **Objetivo:** archivo honesto.
- **Estados:** ficha incompleta.
- **Pantallas:** Encontrar familia → Ficha de familia.
- **Resultado:** se ve qué falta.
- **Por qué:** camino elegido (enseñar lo que falta).

### Una redacción, dos canales
- **JTBD:** 3
- **Contexto:** mismas pautas hacia WhatsApp y, si hace falta, PDF.
- **Objetivo:** no copiar de un documento.
- **Estados:** redacción completa; listo para canal.
- **Pantallas:** Sesión.
- **Resultado:** un texto, dos salidas posibles.
- **Por qué:** “redactar una vez”.

### La próxima clase nace en la ficha
- **JTBD:** 4
- **Contexto:** planificar desde la familia.
- **Objetivo:** sesión real, no un hueco ciego.
- **Estados:** mi día; vista equipo opcional.
- **Pantallas:** Ficha de familia → Sesión; Mi día.
- **Resultado:** el día propio muestra la clase.
- **Por qué:** sesión-en-ficha.

## 6. Experiencia entre pantallas

Comparten **Familia**, **Sesión** y el educador. **Sesión** es la superficie compartida de captura y pautas (estados distintos). **Ficha de familia** consume el historial que produce la captura y origina las sesiones que **Mi día** lista. **Encontrar familia** alimenta ficha y, en excepción, la captura.

No hay cola entre roles: los tres educadores son el mismo tipo de usuario. No hay handoff a un supervisor.

La vista de equipo no crea trabajo para otro JTBD; solo consulta.

## 7. Preguntas antes de UI / prototipo

- ¿Qué se escribe en treinta segundos, y eso cabe en captura mínima?
- ¿Sin red se guarda en el dispositivo? ¿Cómo se entiende “en el archivo” vs “solo aquí”?
- ¿Una ficha es un perro o varios? ¿Un tutor o varios?
- ¿“Enviar” es copiar texto, compartir, o un PDF — y se marca de alguna forma en la sesión?
- ¿Semana y mes son necesarias o el día basta para el prototipo?
- ¿El contenedor es escritorio con captura de bolsillo (PWA/misma app) sin romper el RFP?
- ¿Crear familia mínima exige qué campos para no matar la captura?
