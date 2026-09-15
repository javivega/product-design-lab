# Ideación — NovaStock Pro

## 1. Alcance y fuentes

La sesión cubre los cinco JTBD de `runs/problem-framer/20260910-1158-novastock-pro/`: recepción sin red, corrección de diferencias de stock, picking y packing en hora punta, supervisión operativa y auditoría de movimientos. Parte del briefing y de los perfiles sintéticos vinculados en `sources/manifest.md`.

## 2. Ideación por JTBD

---

### JTBD 1 — Registrar una recepción durante un fallo de red

#### Contexto

**En resumen**

El operario de muelle necesita registrar una recepción cuando la Wi‑Fi falla. Hoy el equipo recurre a papel, pero no se conoce cómo se valida o vuelca después ese registro. El desafío no es solo conservar datos: también es que el operario sepa si puede continuar y qué queda pendiente, incluso con guantes y bajo presión.

**Qué estamos cuestionando**

No aceptamos que el operario tenga que elegir entre seguir trabajando y confiar en el registro. El diseñador ha establecido que el guardado local puede cerrar la recepción si el estado pendiente se entiende sin ambigüedad.

**Vías para entrar en el problema**

La conversación abrió tres vías: convertir el registro local en una parte válida del trabajo, hacer su estado reconocible de un vistazo y reservar para más adelante solo las decisiones que realmente necesitan verificación externa.

#### Direcciones de diseño

##### Dirección 1 — Registrar en el muelle aunque la red caiga

El movimiento se captura donde sucede y queda guardado localmente como parte válida de la recepción. Así se ataca el uso confirmado de papel sin obligar a esperar al servidor. Por ejemplo, el operario termina el registro del palé en el muelle y continúa con el siguiente.

Trade-off: mejora la continuidad, pero hace más importante decidir cómo tratar conflictos al reconectar.

Ya sabemos que el papel es el recurso actual. Tendríamos que aprender qué movimientos pueden cerrarse localmente sin crear un riesgo operativo.

##### Dirección 2 — Cerrar localmente con un estado que inspire confianza

La recepción se puede dar por terminada cuando identidad y cantidad están verificadas y el registro local deja claro que aún está pendiente de sincronizarse. Esta dirección sigue la postura del diseñador: el estado local no es un borrador oculto.

Trade-off: protege la confianza durante la operación, pero exige una definición muy precisa de “verificado localmente”.

La verificación de identidad y cantidad fue una condición aportada por el diseñador. Sigue sin definirse qué otras validaciones son necesarias.

##### Dirección 3 — Separar la continuidad de las excepciones riesgosas

La operación habitual continúa sin red, mientras que las acciones que cambian de forma sensible el inventario se conservan para una revisión posterior. No se intenta hacer que toda decisión sea igual de segura sin conexión.

Trade-off: reduce decisiones inciertas, pero puede crear trabajo de seguimiento y una sensación de tarea incompleta.

Tendríamos que decidir qué casos son excepciones y quién es responsable de resolverlos.

#### Cierre

**Cómo se relacionan**

Registrar en el muelle y cerrar localmente con claridad forman una misma experiencia de continuidad y confianza. Separar las excepciones es un límite que evita extender esa promesa a decisiones cuyo riesgo aún no conocemos.

**Merece explorar después**

**Cerrar localmente con un estado que inspire confianza.** Esta es la dirección más alineada con la postura compartida y con el recurso actual al papel. Antes de comprometerse, hay que concretar qué prueba local basta para identidad y cantidad, y cómo se entiende el trabajo pendiente.

**Separar la continuidad de las excepciones riesgosas.** Complementa la primera al no disfrazar de segura una corrección dudosa. Hace falta clasificar los movimientos y excepciones que requieren una revisión posterior.

---

### JTBD 2 — Corregir una diferencia de stock en recepción

#### Contexto

**En resumen**

Un error de stock reciente en recepción se corrigió manualmente. Se desconoce cómo se detectó, quién autorizó el cambio y qué sucede si hay datos sin sincronizar. La oportunidad debe ayudar a revisar una diferencia sin hacer que el supervisor invente el contexto o asuma que una corrección es segura.

**Qué estamos cuestionando**

No conviene tratar una corrección manual como un simple cambio de cifra. La cuestión es si el supervisor puede recuperar el contexto suficiente para corregir con seguridad, especialmente cuando algunos datos quizá aún no estén sincronizados.

**Vías para entrar en el problema**

Se pueden conservar el contexto del movimiento, separar la investigación de la modificación y definir una responsabilidad clara para los casos que no puedan resolverse con certeza.

#### Direcciones de diseño

##### Dirección 1 — Reconstruir antes de corregir

La corrección parte de entender qué ocurrió en la recepción antes de cambiar el inventario. La dirección busca reducir que el supervisor tenga que reconstruir el caso con memoria, hojas de cálculo o conversaciones dispersas.

Trade-off: añade un paso antes de corregir, pero evita que la rapidez sustituya a la comprensión.

Sabemos que hubo una corrección manual. No sabemos qué evidencia se necesitó ni cómo se detectó la diferencia.

##### Dirección 2 — Distinguir una corrección segura de una pendiente

No todas las diferencias reciben el mismo tratamiento. Las que pueden justificarse con la información disponible se resuelven; las que dependan de datos sin sincronizar quedan explícitamente abiertas para revisión.

Trade-off: reduce el riesgo de modificar datos inciertos, pero puede retrasar el cierre de una incidencia.

Tendríamos que decidir las reglas, los permisos y quién asume cada caso.

##### Dirección 3 — Hacer responsable el cambio, no solo el dato

La corrección se entiende como una decisión atribuible: queda vinculada a la persona, el motivo y la evidencia disponible. Esto apoya la necesidad de trazabilidad sin asumir todavía un flujo concreto de auditoría.

Trade-off: aumenta la rendición de cuentas, pero puede sentirse pesado si se pide el mismo nivel de justificación para todo.

Sigue abierto qué detalle exige cada tipo de ajuste.

#### Cierre

**Cómo se relacionan**

Reconstruir antes de corregir da el contexto; distinguir los casos seguros evita una falsa certeza; hacer responsable el cambio conserva la decisión para revisarla después.

**Merece explorar después**

**Reconstruir antes de corregir.** Aborda directamente la corrección manual confirmada y puede reducir la reconstrucción posterior. Hay que observar cómo se detectan hoy las diferencias y qué información consulta el supervisor.

**Distinguir una corrección segura de una pendiente.** Es coherente con el límite de seguridad acordado para el trabajo sin red. Antes de avanzar, deben definirse reglas de conflicto y permisos.

---

### JTBD 3 — Completar picking o packing en hora punta

#### Contexto

**En resumen**

Durante una hora punta, un operario simplificó pasos y registró parte del trabajo en papel para terminar antes. Aún no sabemos qué controles se omitieron ni cuáles aportan más demora. La tensión central está entre sostener el ritmo y conservar los controles que protegen el registro.

**Qué estamos cuestionando**

La rapidez no puede lograrse eliminando la identidad del artículo o su cantidad: el diseñador señaló ambos controles como irrenunciables. La pregunta es qué parte del trabajo puede adaptarse al pico sin empujar registros hacia el papel.

**Vías para entrar en el problema**

Podemos proteger los controles esenciales, variar el nivel de detalle según el riesgo y diseñar una recuperación explícita para lo que no pueda completarse en el momento.

#### Direcciones de diseño

##### Dirección 1 — Proteger el mínimo que no se negocia

Durante el pico, la operación conserva siempre la identidad del artículo y la cantidad. El resto de comprobaciones se trata como una decisión de riesgo, no como una lista que el operario debe completar igual en cada situación.

Trade-off: hace el ritmo más sostenible, pero requiere acordar qué controles pueden variar.

Esta prioridad procede de la aportación del diseñador. No conocemos todavía los pasos concretos que se omiten hoy.

##### Dirección 2 — Adaptar el esfuerzo al tipo de movimiento

Los movimientos que entrañan más riesgo reciben más revisión; los rutinarios conservan una ruta más directa. La dirección cambia la lógica de “todo o nada” por una relación entre control y consecuencia.

Trade-off: puede reducir fricción en tareas repetitivas, pero exige reglas de negocio y puede confundir si el riesgo no se explica bien.

Tendríamos que aprender qué movimientos generan más errores o impacto.

##### Dirección 3 — Recuperar el registro sin castigar el pico

Cuando una parte del trabajo no puede completarse en el momento, se conserva como algo recuperable y atribuible, no como una anotación desconectada. El objetivo es evitar que el papel se convierta en una segunda fuente de verdad.

Trade-off: mantiene la operación en movimiento, pero abre una carga de seguimiento que debe tener propietario.

Sabemos que el papel aparece en hora punta. Desconocemos cuándo y cómo se transcribe después.

#### Cierre

**Cómo se relacionan**

Proteger el mínimo establece la frontera. Adaptar el esfuerzo permite que la frontera se aplique de forma proporcional. Recuperar el registro cubre los casos que todavía no pueden terminarse dentro del pico.

**Merece explorar después**

**Proteger el mínimo que no se negocia.** Es el punto de partida más claro porque refleja una condición explícita del diseñador. Antes de detallarlo, hay que observar qué controles se mantienen y cuáles se sacrifican realmente.

**Recuperar el registro sin castigar el pico.** Ataca el uso confirmado de papel sin asumir que todo el trabajo debe resolverse en el instante. Hay que decidir quién retoma el registro y cuándo.

---

### JTBD 4 — Intervenir en la operación de almacén

#### Contexto

**En resumen**

El supervisor necesita detectar e intervenir ante inventario, incidencias y productividad, pero no está documentado cómo lo hace hoy ni qué señales prioriza. Las métricas y acciones esperadas siguen abiertas. Cualquier dirección debe respetar que la información puede no estar sincronizada.

**Qué estamos cuestionando**

Todavía no sabemos cómo supervisan hoy los responsables ni qué información les permite intervenir. Por eso estas direcciones son hipótesis: buscan hacer visible la incertidumbre operativa, no afirmar que un conjunto concreto de métricas resolverá el problema.

**Vías para entrar en el problema**

La supervisión puede empezar por hacer visible la confianza de la información, por concentrarse en excepciones que requieren una decisión humana o por conectar una señal operativa con una acción clara.

#### Direcciones de diseño

##### Dirección 1 — Supervisar la confianza, no solo el volumen

Además del estado operativo, el supervisor puede distinguir qué información es actual y qué parte sigue pendiente de sincronización. Esto evita que una cifra parezca definitiva cuando no lo es.

Trade-off: aporta cautela, pero puede aumentar la carga de interpretación.

La necesidad nace del conflicto conocido entre tiempo real y operación sin red. Aún no sabemos qué señales mira hoy el supervisor.

##### Dirección 2 — Intervenir por excepción

En vez de revisar toda la actividad por igual, el supervisor se concentra en los casos donde el equipo no puede continuar, existe una diferencia o el registro necesita revisión. La dirección mantiene al humano en los casos ambiguos.

Trade-off: puede reducir el ruido, pero depende de criterios de excepción aún no definidos.

Tendríamos que aprender qué incidentes son urgentes y cómo se priorizan.

##### Dirección 3 — Conectar cada señal con una decisión

La información operativa se organiza alrededor de lo que el supervisor puede decidir o delegar, no de una colección general de indicadores. Esta dirección cuestiona si mostrar más datos sin una acción asociada ayudaría realmente.

Trade-off: obliga a limitar el alcance de cada señal, pero reduce información sin propósito.

Siguen abiertos los KPIs y las acciones que deberían provocar.

#### Cierre

**Cómo se relacionan**

Supervisar la confianza da contexto a la información; intervenir por excepción reduce dónde mirar; conectar señales con decisiones evita que el seguimiento se convierta en observación pasiva.

**Merece explorar después**

**Intervenir por excepción.** Puede ser útil si se confirma que los supervisores necesitan priorizar, pero la evidencia actual es débil. Hay que observar primero cómo se enteran y deciden hoy ante una incidencia.

**Supervisar la confianza, no solo el volumen.** Encaja con el trabajo sin red y puede ser transversal. Debemos averiguar qué grado de incertidumbre es útil mostrar sin sobrecargar al supervisor.

---

### JTBD 5 — Investigar un movimiento de artículo

#### Contexto

**En resumen**

El auditor necesita reconstruir un movimiento para investigar una incidencia. La trazabilidad completa es un requisito, pero no se conoce el proceso actual, la evidencia necesaria ni los permisos detallados. La exploración debe evitar asumir que el auditor necesita el mismo contexto que un supervisor.

**Qué estamos cuestionando**

La trazabilidad requerida no garantiza por sí sola que un auditor pueda investigar bien. Falta conocer qué evidencia usa, qué preguntas intenta responder y qué permisos necesita, así que las direcciones se mantienen deliberadamente como hipótesis.

**Vías para entrar en el problema**

La investigación puede seguir una historia de un movimiento, separar los hechos de las correcciones posteriores y ajustar el nivel de detalle al propósito de la revisión.

#### Direcciones de diseño

##### Dirección 1 — Seguir la historia de un movimiento

La investigación se centra en reconstruir qué pasó con un artículo a través de sus cambios, actores, terminales y destinos. La dirección responde al JTBD sin asumir que el auditor necesita una visión operativa completa.

Trade-off: ayuda a encontrar contexto, pero una historia demasiado extensa puede dificultar localizar lo relevante.

La trazabilidad completa es un requisito. No sabemos qué secuencia de hechos necesita el auditor en la práctica.

##### Dirección 2 — Diferenciar el hecho de su corrección

Un movimiento original y cualquier ajuste posterior se entienden como momentos distintos de la investigación. Así se evita que una corrección borre la posibilidad de comprender el incidente inicial.

Trade-off: conserva contexto, pero puede exponer una complejidad que requiere una política clara de retención.

Sabemos que hubo una corrección manual. Desconocemos las exigencias de auditoría para esos casos.

##### Dirección 3 — Abrir detalle solo cuando la investigación lo pide

La revisión empieza por una cuestión concreta y profundiza conforme aparece evidencia relevante. La dirección busca respetar los permisos y no asumir que toda la información debe exponerse siempre.

Trade-off: reduce carga informativa, pero una relación poco visible entre hechos puede ocultar un indicio importante.

Tendríamos que decidir qué roles pueden ver cada detalle y qué deben conservar los registros.

#### Cierre

**Cómo se relacionan**

Seguir la historia ofrece el hilo conductor; diferenciar hechos y correcciones conserva la integridad de ese hilo; abrir detalle gradualmente modera la complejidad y los permisos.

**Merece explorar después**

**Diferenciar el hecho de su corrección.** Conecta con el caso confirmado de corrección manual y protege la investigación de un incidente. Antes de avanzar, hay que conocer obligaciones de auditoría y retención.

**Seguir la historia de un movimiento.** Es una traducción directa del objetivo de trazabilidad, pero necesita una observación del trabajo de auditoría para saber qué historia resulta útil.

---

## 3. Notas transversales

La sesión dejó una condición común para los flujos operativos: la continuidad no debe exigir renunciar a la confianza. El guardado local puede ser un cierre válido si se entiende su estado, y la identidad y cantidad del artículo son controles que no deberían ceder ante la presión.

Esto sugiere distinguir entre registrar, verificar, sincronizar y corregir en vez de tratarlos como un único momento. La supervisión y la auditoría pueden aprovechar esa distinción, pero sus flujos actuales todavía no están observados.

## 4. Preguntas antes de diseñar la experiencia

Antes de diseñar la experiencia en detalle, aún debemos responder:

- ¿Qué validación local basta para confirmar identidad y cantidad durante una recepción sin red?
- ¿Qué movimientos o excepciones deben quedar pendientes hasta una revisión posterior?
- ¿Cómo se recuperan, validan y corrigen hoy los registros anotados en papel?
- ¿Cómo se detecta una diferencia de stock, quién puede corregirla y qué evidencia debe revisar?
- ¿Qué controles se omiten durante picking o packing en hora punta y qué riesgo evita cada uno?
- ¿Cómo prioriza hoy un supervisor una incidencia y qué decisión toma con cada señal?
- ¿Qué necesita un auditor para investigar un movimiento y qué permisos o retención de datos se aplican?
