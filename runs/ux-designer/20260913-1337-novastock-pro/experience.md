# Arquitectura de experiencia — NovaStock Pro

## 1. Alcance y fuentes

Este trabajo cubre los cinco JTBD con direcciones en la ejecución de ideación `20260910-1311-novastock-pro`: recepción sin red, corrección de diferencias de stock, picking y packing en hora punta, supervisión operativa y auditoría de movimientos.

Fuentes vinculadas: ideación, problemas enmarcados y briefing en `sources/manifest.md`. Las direcciones son hipótesis de diseño; no sustituyen investigación de usuarios.

## 2. Experiencia por JTBD

### Registrar una recepción durante un fallo de red

#### Camino elegido

**Cerrar localmente con un estado pendiente claro.** El diseñador eligió este camino porque permite cerrar una recepción al guardar localmente, sin confundir ese cierre con la confirmación del servidor. La arquitectura deberá preservar la comprobación de identidad y cantidad.

#### Comportamiento esperado

El operario registra y verifica identidad y cantidad en el muelle. Si no hay red, el sistema guarda el movimiento localmente y explica que la recepción está cerrada para operar, pero pendiente de confirmación remota. El operario puede retomar su trabajo sin recurrir al papel.

#### Principios de UX en juego

Al cerrar, el estado local y el estado de sincronización deben poder distinguirse; de otro modo, «terminado» es ambiguo. La comprobación de identidad y cantidad es una frontera de prevención de errores acordada por el diseñador.

#### Estructura de experiencia

- **Recepción en muelle** — contexto para registrar un movimiento.
- **Verificación local** — confirma identidad y cantidad antes del cierre.
- **Estado de sincronización** — condición transversal que informa si el registro es local, pendiente, confirmado o requiere revisión.
- **Excepción de recepción** — movimiento que no puede cerrarse con las reglas locales.
- **Relación:** la recepción pasa por verificación y cierre; el estado de sincronización la acompaña sin convertirse en un destino independiente.

#### Arquitectura de pantallas

- **Espacio de recepción** — superficie principal para iniciar, verificar y cerrar una recepción. El estado de sincronización es una condición de esta misma superficie, no otra pantalla.
- **Revisión de excepción** — superficie separada solo cuando una recepción no puede cerrarse localmente; requiere una decisión o handoff.

#### Flujo de usuario

##### Principal
1. **Iniciar recepción** — En **Espacio de recepción**: el operario identifica la recepción y registra los artículos.
2. **Verificar lo mínimo** — En **Espacio de recepción**: confirma identidad y cantidad.
3. **Cerrar localmente** — En **Espacio de recepción** (estado sin conexión): el sistema guarda el movimiento y confirma que la recepción está cerrada localmente y pendiente de sincronización.
4. **Continuar** — El operario inicia o retoma la siguiente recepción sin transcribir a papel.

##### Excepción crítica: no se puede cerrar
- **Disparador:** falta una validación local o el movimiento entra en una excepción definida por política.
- **Flujo:** desde **Espacio de recepción**, el caso pasa a **Revisión de excepción** con su estado pendiente.
- **Reanudación:** el operario continúa con otra tarea; la excepción se resuelve y confirma o devuelve el caso según la política aún por definir.

### Corregir una diferencia de stock en recepción

#### Camino elegido

**Distinguir una corrección segura de una pendiente.** El diseñador eligió separar las diferencias que cuentan con evidencia suficiente de las que deben quedar abiertas para revisión. La arquitectura deberá expresar esa condición sin tratar los datos pendientes de sincronización como fiables.

#### Comportamiento esperado

El supervisor llega a una diferencia, revisa el contexto disponible y decide si puede corregirse con seguridad. Si la evidencia o la sincronización no bastan, deja la diferencia pendiente y la entrega a la persona o momento definido por la política.

#### Principios de UX en juego

La experiencia debe hacer visible por qué una corrección es segura o queda pendiente. Así se evita que un dato incompleto parezca definitivo.

#### Estructura de experiencia

- **Diferencia de stock** — caso que necesita resolución.
- **Contexto de la diferencia** — movimientos y estado de datos disponibles para revisarla.
- **Decisión de corrección** — clasifica el caso como corregible o pendiente.
- **Cola de revisión** — reúne diferencias que no pueden cerrarse con seguridad.
- **Relación:** el supervisor investiga una diferencia y la resuelve o la transforma en trabajo pendiente.

#### Arquitectura de pantallas

- **Detalle de diferencia** — superficie para entender el caso, su evidencia y el estado de los datos.
- **Cola de revisión** — superficie para encontrar y retomar casos pendientes. Es separada porque el trabajo puede sobrevivir a la sesión original.

#### Flujo de usuario

##### Principal
1. **Abrir una diferencia** — En **Detalle de diferencia**: el supervisor revisa el caso y el contexto disponible.
2. **Evaluar la evidencia** — En **Detalle de diferencia**: valora el estado de sincronización y la información requerida por política.
3. **Decidir la resolución** — Si hay evidencia suficiente, la corrección se registra con su condición; si no, pasa a **Cola de revisión**.
4. **Retomar un caso** — En **Cola de revisión**: la persona autorizada vuelve al detalle cuando haya nueva evidencia.

##### Excepción crítica: datos en conflicto
- **Disparador:** la información disponible no permite afirmar que la corrección sea segura.
- **Flujo:** el caso se conserva en **Cola de revisión** sin modificar el stock como definitivo.
- **Reanudación:** la política de conflictos determina quién aporta la evidencia o autoriza el cambio.

### Completar picking o packing en hora punta

#### Camino elegido

**Proteger el mínimo que no se negocia.** El diseñador eligió mantener siempre la verificación de identidad y cantidad, aun bajo presión. La arquitectura deberá permitir que otros controles se ajusten sin diluir esa frontera.

#### Comportamiento esperado

El operario completa picking o packing verificando siempre identidad y cantidad. Bajo presión, el flujo no permite que esos controles se omitan; si otro control no puede concluirse, queda explícitamente pendiente en vez de trasladarse silenciosamente al papel.

#### Principios de UX en juego

La prevención de errores prevalece para identidad y cantidad. La flexibilidad se aplica solo a controles cuya política permita recuperarlos después.

#### Estructura de experiencia

- **Trabajo de picking o packing** — unidad de trabajo en curso.
- **Controles mínimos** — identidad y cantidad, obligatorios en toda condición.
- **Seguimiento pendiente** — trabajo adicional que no se completa durante el pico.
- **Relación:** el trabajo no se cierra sin controles mínimos; lo recuperable se deriva a seguimiento con su estado claro.

#### Arquitectura de pantallas

- **Espacio de tarea operativa** — superficie que sostiene el trabajo y los controles mínimos; la presión de hora punta es un estado de contexto, no una pantalla.
- **Detalle de seguimiento pendiente** — superficie para retomar trabajo no concluido cuando la política lo permita.

#### Flujo de usuario

##### Principal
1. **Abrir tarea** — En **Espacio de tarea operativa**: el operario toma un trabajo de picking o packing.
2. **Verificar identidad y cantidad** — En la misma superficie: completa los controles mínimos.
3. **Cerrar o derivar** — Si los demás controles se cumplen, concluye la tarea. Si uno puede quedar pendiente por política, el sistema lo lleva a **Detalle de seguimiento pendiente**.

##### Excepción crítica: presión de hora punta
- **Disparador:** el operario necesita mantener el ritmo, pero falta un control no mínimo.
- **Flujo:** el trabajo conserva sus controles mínimos; lo recuperable queda atribuido en **Detalle de seguimiento pendiente**, no en papel.
- **Reanudación:** el propietario definido retoma el seguimiento fuera del pico.

### Intervenir en la operación de almacén

#### Camino elegido

**Supervisar la confianza, no solo el volumen.** El diseñador eligió que el supervisor distinga entre información actual y datos pendientes de sincronización. Este camino no presupone qué KPIs resuelven la supervisión: primero hace explícita la calidad del dato.

#### Comportamiento esperado

El supervisor consulta el estado operativo junto con la confianza y actualidad de sus datos. Puede entrar en una incidencia o trabajo pendiente sabiendo que una cifra puede estar confirmada, pendiente o requerir revisión.

#### Principios de UX en juego

La visibilidad del estado evita tomar una cifra por definitiva cuando la red o la sincronización la hacen provisional. No se presupone todavía qué métricas deben dirigir una acción.

#### Estructura de experiencia

- **Visión operativa** — orientación sobre el estado de inventario e incidencias.
- **Confianza del dato** — condición transversal que acompaña cualquier cifra o caso.
- **Incidencia operativa** — detalle de una situación que requiere comprensión o intervención.
- **Relación:** la visión operativa lleva a una incidencia; la confianza del dato se conserva en ambos contextos.

#### Arquitectura de pantallas

- **Visión operativa** — superficie para consultar el estado y abrir una incidencia; no presupone un conjunto cerrado de KPIs.
- **Detalle de incidencia** — superficie para comprender el caso y continuar hacia una diferencia o su revisión.

#### Flujo de usuario

##### Principal
1. **Consultar la operación** — En **Visión operativa**: el supervisor revisa el estado disponible y su confianza.
2. **Abrir una incidencia** — En **Detalle de incidencia**: comprende qué datos están confirmados, pendientes o requieren revisión.
3. **Continuar el caso** — Si hay una diferencia de stock, el supervisor entra en **Detalle de diferencia**; si no, vuelve a **Visión operativa**.

##### Excepción crítica: información no confirmada
- **Disparador:** una cifra o incidencia incluye datos pendientes de sincronización.
- **Flujo:** **Visión operativa** y **Detalle de incidencia** conservan la condición de confianza; el supervisor no interpreta el dato como definitivo.
- **Reanudación:** al confirmarse o revisarse los datos, el caso actualiza su estado sin perder el vínculo con la incidencia.

### Investigar un movimiento de artículo

#### Camino elegido

**Seguir la historia de un movimiento.** El diseñador eligió reconstruir el recorrido del artículo mediante sus cambios, actores, terminales y destinos. Este camino se mantiene como hipótesis hasta conocer qué evidencia y permisos requiere realmente una auditoría.

#### Comportamiento esperado

El auditor parte de una incidencia o artículo y sigue los movimientos relacionados en orden, distinguiendo el hecho registrado de su estado de sincronización. Puede profundizar en un movimiento sin asumir permisos sobre información no autorizada.

#### Principios de UX en juego

La experiencia debe favorecer reconocimiento del contexto frente a reconstrucción de memoria. El nivel de detalle debe respetar permisos que aún no están definidos.

#### Estructura de experiencia

- **Investigación de movimiento** — punto de partida de una revisión.
- **Historia del artículo** — relación temporal entre movimientos, actores, terminales y destinos.
- **Detalle del movimiento** — evidencia disponible para un evento concreto.
- **Estado de registro** — condición que indica si la evidencia está confirmada, pendiente o requiere revisión.
- **Relación:** una investigación abre la historia y permite entrar y volver desde el detalle de un movimiento.

#### Arquitectura de pantallas

- **Investigación de artículo** — superficie para localizar un artículo o caso y seguir su historia.
- **Detalle de movimiento** — superficie para revisar la evidencia permitida de un evento y volver a su historia.

#### Flujo de usuario

##### Principal
1. **Iniciar investigación** — En **Investigación de artículo**: el auditor parte de un artículo o incidencia.
2. **Seguir la historia** — En la misma superficie: revisa los movimientos relacionados y su estado de registro.
3. **Profundizar en un evento** — En **Detalle de movimiento**: consulta la evidencia a la que tiene acceso.
4. **Volver al contexto** — Regresa a **Investigación de artículo** para continuar la reconstrucción.

##### Excepción crítica: evidencia restringida o pendiente
- **Disparador:** el detalle no está disponible por permisos o su registro aún no está confirmado.
- **Flujo:** **Detalle de movimiento** comunica la condición sin inventar información ausente.
- **Reanudación:** el auditor solicita la evidencia o espera la confirmación según la política aplicable.

## 3. Arquitectura de solución

### Áreas de producto

- **Recepción y tarea operativa** — registra, verifica y cierra el trabajo de muelle, picking o packing.
- **Sincronización y estado de registro** — condición compartida que expresa si un dato es local, pendiente, confirmado o requiere revisión.
- **Diferencias y revisión** — trata los casos cuya corrección no es segura con la evidencia disponible.
- **Supervisión operativa** — permite comprender el estado y confianza de la información antes de intervenir.
- **Investigación y trazabilidad** — reconstruye la historia de un artículo y permite revisar un movimiento.

### Entidades y conceptos

- Movimiento de inventario, recepción, tarea operativa, diferencia de stock, incidencia, artículo, corrección y evidencia.
- Estado de registro: local, pendiente de sincronización, confirmado o requiere revisión.
- Controles mínimos: identidad y cantidad.

### Relaciones

- Una recepción y una tarea producen movimientos; su estado de registro acompaña el movimiento en todas las áreas.
- Una diferencia puede nacer de una recepción o de una incidencia y terminar como corrección segura o trabajo en revisión.
- Una incidencia puede llevar al detalle de una diferencia o a la investigación de un artículo.
- La investigación utiliza los movimientos y correcciones sin transformarlos.

### Estados transversales

- Con conexión, sin conexión, pendiente de sincronización, confirmado, requiere revisión y acceso restringido.
- Estos son estados de las superficies y los registros, no áreas independientes.

### Modelo de navegación

- **Entradas:** recepción y tareas desde el trabajo operativo; diferencias desde una incidencia o búsqueda; investigación desde un artículo o incidencia.
- **Destinos:** detalle de diferencia, cola de revisión, detalle de incidencia, investigación de artículo y detalle de movimiento.
- **Retorno y reanudación:** los casos pendientes vuelven a su cola; los detalles vuelven al contexto de origen.
- **Transiciones entre JTBD:** una recepción problemática puede crear una diferencia; una diferencia o incidencia puede abrir una investigación; el supervisor puede entrar a ambos desde una incidencia.

## 4. Inventario de pantallas

### Espacio de recepción

- **Propósito:** Registrar, verificar y cerrar una recepción en el muelle.
- **Usuario principal:** Operario de muelle.
- **Soporta:** Recepción sin red.
- **Entradas y salidas:** Entrada desde trabajo operativo; salida a otra recepción o a Revisión de excepción.
- **Información requerida:** Identidad, cantidad, contexto de recepción y estado de registro.
- **Acciones:** Registrar, verificar, cerrar localmente y derivar excepción.
- **Estados:** Con conexión, sin conexión, pendiente de sincronización, confirmado, requiere revisión.
- **Relacionadas:** Revisión de excepción, Detalle de diferencia.

### Revisión de excepción

- **Propósito:** Resolver o entregar una recepción que no puede cerrarse localmente.
- **Usuario principal:** Operario autorizado o supervisor.
- **Soporta:** Recepción sin red y corrección de diferencias.
- **Entradas y salidas:** Desde Espacio de recepción; salida a Detalle de diferencia o trabajo operativo.
- **Información requerida:** Motivo de excepción, movimiento, estado de registro y evidencia disponible.
- **Acciones:** Revisar, entregar o devolver el caso.
- **Estados:** Requiere revisión, acceso restringido, confirmado.
- **Relacionadas:** Espacio de recepción, Detalle de diferencia, Cola de revisión.

### Detalle de diferencia

- **Propósito:** Comprender una diferencia y decidir si se corrige o queda pendiente.
- **Usuario principal:** Supervisor de almacén.
- **Soporta:** Corrección de diferencia e intervención operativa.
- **Entradas y salidas:** Desde Detalle de incidencia, Revisión de excepción o Cola de revisión; salida a Cola de revisión.
- **Información requerida:** Diferencia, movimientos relacionados, evidencia, permisos y estado de sincronización.
- **Acciones:** Revisar, registrar corrección segura o dejar pendiente.
- **Estados:** Corregible, requiere revisión, datos pendientes, acceso restringido.
- **Relacionadas:** Cola de revisión, Detalle de incidencia, Investigación de artículo.

### Cola de revisión

- **Propósito:** Reunir trabajo que no puede cerrarse con seguridad.
- **Usuario principal:** Supervisor u otro rol autorizado.
- **Soporta:** Diferencias y seguimiento operativo.
- **Entradas y salidas:** Desde Detalle de diferencia o Revisión de excepción; salida al detalle correspondiente.
- **Información requerida:** Caso, motivo, estado, responsable y origen.
- **Acciones:** Retomar, entregar o priorizar según política.
- **Estados:** Pendiente, en revisión, resuelto.
- **Relacionadas:** Detalle de diferencia, Revisión de excepción.

### Espacio de tarea operativa

- **Propósito:** Completar picking o packing manteniendo identidad y cantidad.
- **Usuario principal:** Operario de almacén.
- **Soporta:** Trabajo en hora punta.
- **Entradas y salidas:** Entrada desde una tarea asignada; salida a otra tarea o Detalle de seguimiento pendiente.
- **Información requerida:** Artículo, cantidad, tarea y controles mínimos.
- **Acciones:** Verificar, completar y derivar seguimiento permitido.
- **Estados:** Normal, hora punta, pendiente de seguimiento, requiere revisión.
- **Relacionadas:** Detalle de seguimiento pendiente.

### Detalle de seguimiento pendiente

- **Propósito:** Retomar un control o registro que no se completó durante el pico.
- **Usuario principal:** Rol definido por política.
- **Soporta:** Trabajo en hora punta.
- **Entradas y salidas:** Desde Espacio de tarea operativa; salida a la tarea o a una diferencia si se detecta una incidencia.
- **Información requerida:** Trabajo de origen, control pendiente, responsable y estado.
- **Acciones:** Completar, entregar o escalar.
- **Estados:** Pendiente, en curso, resuelto.
- **Relacionadas:** Espacio de tarea operativa, Detalle de diferencia.

### Visión operativa

- **Propósito:** Consultar estado operativo junto con la confianza de los datos.
- **Usuario principal:** Supervisor de almacén.
- **Soporta:** Supervisión operativa.
- **Entradas y salidas:** Entrada desde el contexto de supervisión; salida a Detalle de incidencia.
- **Información requerida:** Estado de inventario, incidencias disponibles y condición de confianza.
- **Acciones:** Revisar estado y abrir una incidencia.
- **Estados:** Información confirmada, parcialmente pendiente, requiere revisión.
- **Relacionadas:** Detalle de incidencia.

### Detalle de incidencia

- **Propósito:** Comprender una incidencia y decidir el siguiente contexto de trabajo.
- **Usuario principal:** Supervisor de almacén.
- **Soporta:** Supervisión, diferencias e investigación.
- **Entradas y salidas:** Desde Visión operativa; salida a Detalle de diferencia o Investigación de artículo.
- **Información requerida:** Incidencia, datos relacionados, estado de confianza y enlaces a casos.
- **Acciones:** Revisar y continuar hacia el caso relacionado.
- **Estados:** Confirmada, datos pendientes, requiere revisión.
- **Relacionadas:** Visión operativa, Detalle de diferencia, Investigación de artículo.

### Investigación de artículo

- **Propósito:** Seguir la historia de un artículo o incidencia.
- **Usuario principal:** Auditor.
- **Soporta:** Investigación de movimiento.
- **Entradas y salidas:** Desde Detalle de incidencia o búsqueda autorizada; salida a Detalle de movimiento.
- **Información requerida:** Artículo, movimientos relacionados y estado de registro.
- **Acciones:** Seleccionar un movimiento y continuar la investigación.
- **Estados:** Con evidencia disponible, evidencia pendiente, acceso restringido.
- **Relacionadas:** Detalle de movimiento, Detalle de incidencia.

### Detalle de movimiento

- **Propósito:** Consultar la evidencia autorizada de un movimiento.
- **Usuario principal:** Auditor.
- **Soporta:** Investigación de movimiento.
- **Entradas y salidas:** Desde Investigación de artículo; regreso a la misma investigación.
- **Información requerida:** Actor, momento, terminal, origen, destino, cambios y estado del registro.
- **Acciones:** Revisar evidencia y volver a la historia.
- **Estados:** Confirmado, pendiente de sincronización, acceso restringido.
- **Relacionadas:** Investigación de artículo.

## 5. Experiencia entre pantallas

El estado de registro acompaña a las recepciones, movimientos, diferencias e incidencias. No exige una pantalla separada: cambia lo que cada superficie puede afirmar y qué acción es segura.

La recepción puede producir una excepción y, después, una diferencia de stock. La diferencia se resuelve o entra en Cola de revisión. La supervisión usa la confianza del dato para abrir una incidencia, que puede llevar a la diferencia o a la investigación. La investigación lee la historia y sus correcciones, pero no modifica la operación.

El seguimiento pendiente evita que la hora punta cree una segunda fuente de verdad: conserva el trabajo de origen y lo entrega a un rol que aún debe definirse.

## 6. Preguntas antes de UI

- ¿Qué validación local basta para cerrar una recepción con identidad y cantidad verificadas?
- ¿Qué movimientos o excepciones no pueden cerrarse sin confirmación remota?
- ¿Quién recibe una recepción, diferencia o seguimiento pendiente y con qué permisos?
- ¿Qué reglas resuelven conflictos de sincronización y qué estado verá cada rol mientras tanto?
- ¿Qué controles, aparte de identidad y cantidad, pueden aplazarse durante una hora punta?
- ¿Qué señales y KPIs necesita realmente un supervisor para intervenir?
- ¿Qué evidencia, permisos y reglas de retención necesita un auditor?
