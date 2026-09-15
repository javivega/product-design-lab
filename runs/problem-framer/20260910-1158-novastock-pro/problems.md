# Problemas de diseño — NovaStock Pro

## 1. Alcance y fuentes

Este trabajo enmarca los cinco JTBD del briefing de NovaStock Pro. Incluye a operarios de muelle y almacén, supervisores y auditores. Los perfiles sintéticos confirmados que dan contexto son el operario de muelle en recepción durante hora punta y el supervisor que corrige una incidencia de stock.

Fuentes: briefing y perfiles sintéticos de la ejecución `20260910-0119-novastock-pro`.

## 2. Trabajos

### Registrar una recepción durante un fallo de red

**JTBD**
- Como operario de muelle: cuando recibo mercancía y la red falla, quiero registrar los movimientos en el mismo punto de trabajo para no depender de apuntes en papel ni detener la operación.

**Contexto**
- Quién: Operario de muelle — perfil de recepción en hora punta.
- Cuándo: Durante una recepción afectada por Wi‑Fi inestable.
- Resultado: Mantener el registro de movimientos sin detener la operación.
- Necesidades relacionadas: Registrar movimientos sin conexión y usar la interfaz con guantes en pantallas industriales.
- Del mapa: Se sabe que un fallo reciente interrumpió una recepción y que se usó papel. Se desconoce qué dispositivo se usa y cómo se comunica el estado pendiente de sincronización.
- Restricciones: Guantes, pantalla industrial, periféricos de lectura y conectividad inestable.

**Exploración del problema**

**Comportamiento actual**
- Cuando falla la Wi‑Fi durante una recepción, el equipo anota los movimientos en papel.
  *Por qué lo sabemos:* La persona responsable confirmó el método usado en el último caso.
- Desconocido: Cómo vuelcan, revisan o validan después esas anotaciones.
  *Por qué:* El briefing no describe el paso posterior.

**Puntos de dolor**
- El equipo debe separar el movimiento físico de su registro digital.
  *Por qué lo sabemos:* El papel se usa como alternativa cuando la red interrumpe la recepción.
- Es una suposición que el paso manual posterior contribuya a errores de stock.
  *Por qué:* El briefing relaciona los errores con el sistema actual, pero no mide la causa concreta.

**Barreras**
- La red inestable interrumpe una tarea de recepción.
  *Por qué lo sabemos:* Un caso reciente afectó a esa tarea.
- Desconocido: Qué información mínima necesita el operario para continuar con seguridad.
  *Por qué:* No se definen reglas para datos pendientes de sincronización.

**Consecuencias**
- La operación depende de registros en papel mientras la conexión no está disponible.
  *Por qué lo sabemos:* Es el método confirmado durante el fallo.
- Desconocido: Cuánto retraso o retrabajo genera después.
  *Por qué:* No hay tiempos ni frecuencia documentados.

**Alternativas actuales**
- Anotar movimientos en papel.
  *Por qué lo sabemos:* Es el método confirmado durante el fallo de red.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al operario de muelle a registrar movimientos de recepción cuando se pierde la red?
- ¿Cómo podríamos hacer visible qué movimientos siguen pendientes sin exigir que el operario interprete el estado técnico?
- ¿Cómo podríamos reducir la dependencia del papel sin frenar la recepción?

### Corregir una diferencia de stock en recepción

**JTBD**
- Como supervisor de almacén: cuando detecto una diferencia de stock en una recepción, quiero revisarla y corregirla con trazabilidad para recuperar un inventario fiable.

**Contexto**
- Quién: Supervisor de almacén — perfil de corrección y seguimiento de incidencias.
- Cuándo: Tras detectar una diferencia de stock originada en una recepción.
- Resultado: Recuperar un inventario fiable con trazabilidad.
- Necesidades relacionadas: Ver stock fiable, entender qué ocurrió con un artículo y quién intervino.
- Del mapa: Se sabe que hubo un error reciente en recepción y que se corrigió manualmente. Se desconocen los pasos de detección y las reglas de conflicto.
- Restricciones: Permisos por rol y posibles datos pendientes de sincronización.

**Exploración del problema**

**Comportamiento actual**
- Un error de stock reciente en una recepción se corrigió manualmente en el sistema o en una hoja de cálculo.
  *Por qué lo sabemos:* La persona responsable describió cómo se resolvió.
- Desconocido: Cómo se detectó la diferencia y quién autorizó la corrección.
  *Por qué:* El briefing no aporta ese recorrido.

**Puntos de dolor**
- La corrección manual deja el proceso expuesto a errores y exige reconstruir lo ocurrido.
  *Por qué lo sabemos:* La corrección fue manual; el riesgo adicional es una interpretación que requiere validación.

**Barreras**
- Desconocido: Qué evidencia necesita el supervisor antes de modificar el stock.
  *Por qué:* No se documentan las reglas de negocio ni los permisos detallados.
- Desconocido: Qué ocurre si el dato que se corrige todavía no se ha sincronizado.
  *Por qué:* El conflicto entre tiempo real y trabajo sin conexión permanece abierto.

**Consecuencias**
- La fiabilidad del inventario depende de una corrección manual.
  *Por qué lo sabemos:* Ese fue el método usado en el caso confirmado.

**Alternativas actuales**
- Corregir el registro manualmente en el sistema o en una hoja de cálculo.
  *Por qué lo sabemos:* Es el método confirmado para el último error.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al supervisor a revisar una diferencia de recepción sin perder el contexto de lo ocurrido?
- ¿Cómo podríamos hacer que una corrección deje claro su alcance y su trazabilidad?
- ¿Cómo podríamos apoyar una decisión segura cuando los datos pueden estar pendientes de sincronización?

### Completar picking o packing en hora punta

**JTBD**
- Como operario de almacén: cuando trabajo en picking o packing durante una hora punta, quiero terminar las tareas con rapidez sin perder los controles necesarios.

**Contexto**
- Quién: Operario de almacén; el perfil de operario de muelle aporta el contexto de presión de hora punta.
- Cuándo: Durante picking o packing con alta demanda.
- Resultado: Terminar con rapidez y conservar los controles necesarios.
- Necesidades relacionadas: Completar picking y packing con claridad y rapidez; reducir entrada manual.
- Del mapa: Se sabe que un operario simplificó pasos y registró parte del trabajo en papel. Existe un conflicto entre flujos guiados y velocidad.
- Restricciones: Interfaz táctil, guantes y potencial uso de lectores de códigos.

**Exploración del problema**

**Comportamiento actual**
- En un caso de hora punta, un operario simplificó pasos para terminar más rápido.
  *Por qué lo sabemos:* La persona responsable confirmó ese comportamiento.
- Parte del trabajo se registró en papel.
  *Por qué lo sabemos:* La persona responsable confirmó el uso de papel en ese caso.
- Desconocido: Qué controles concretos se omitieron, repitieron o desplazaron.
  *Por qué:* El briefing no especifica los pasos.

**Puntos de dolor**
- El operario enfrenta una tensión entre mantener el ritmo y seguir los controles.
  *Por qué lo sabemos:* Simplificó pasos para terminar más rápido.

**Barreras**
- Desconocido: Qué parte del flujo consume más tiempo y por qué.
  *Por qué:* No hay observación del proceso ni datos de duración.

**Consecuencias**
- Parte del registro queda fuera del sistema durante una hora punta.
  *Por qué lo sabemos:* Se usó papel en el caso confirmado.

**Alternativas actuales**
- Simplificar pasos y usar papel para parte del registro.
  *Por qué lo sabemos:* Ambas prácticas se confirmaron en el caso de hora punta.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al operario a mantener el ritmo de picking o packing sin desplazar controles al papel?
- ¿Cómo podríamos distinguir los pasos que protegen la operación de los que solo añaden demora?
- ¿Cómo podríamos apoyar la recuperación de un registro incompleto sin castigar al operario por una hora punta?

### Intervenir en la operación de almacén

**JTBD**
- Como supervisor de almacén: cuando superviso las operaciones de almacén, quiero ver el estado del inventario, las incidencias y la productividad para poder intervenir a tiempo.

**Contexto**
- Quién: Supervisor de almacén — perfil de corrección y seguimiento de incidencias.
- Cuándo: Durante la supervisión de la operación.
- Resultado: Poder intervenir a tiempo.
- Necesidades relacionadas: Ver estado fiable del stock y alertas; entender incidencias.
- Del mapa: El panel de KPIs es un requisito, pero se desconocen las métricas, criterios de prioridad y acciones esperadas.
- Restricciones: Datos potencialmente desactualizados por la operación sin conexión y permisos por rol.

**Exploración del problema**

**Comportamiento actual**
- Desconocido: Cómo supervisa hoy el estado del inventario, las incidencias y la productividad.
  *Por qué:* El briefing pide un panel futuro, pero no describe la práctica actual.

**Puntos de dolor**
- Desconocido: Qué señales llega tarde a ver o no consigue reunir el supervisor.
  *Por qué:* No hay relatos ni datos de priorización actuales.

**Barreras**
- No están definidos los KPIs ni las acciones que deben provocar.
  *Por qué lo sabemos:* El briefing requiere un panel personalizable sin especificar métricas o decisiones.
- Desconocido: Cómo interpreta hoy un stock que no está sincronizado.
  *Por qué:* No se documentan esas reglas.

**Consecuencias**
- Desconocido: Qué ocurre cuando una incidencia no se atiende a tiempo.
  *Por qué:* El briefing no presenta ejemplos ni impactos por tipo de incidencia.

**Alternativas actuales**
- Desconocido: Qué fuentes o personas consulta el supervisor hoy.
  *Por qué:* El sistema actual se describe de forma general, sin el flujo de supervisión.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al supervisor a detectar una incidencia que requiere intervención sin asumir qué métricas son prioritarias?
- ¿Cómo podríamos ayudarle a valorar la fiabilidad y actualidad de la información operativa?

### Investigar un movimiento de artículo

**JTBD**
- Como auditor: cuando audito un movimiento de artículo, quiero saber quién lo hizo, cuándo, desde qué terminal y hacia dónde fue para poder investigar una incidencia.

**Contexto**
- Quién: Auditor; no hay perfil sintético específico.
- Cuándo: Al investigar una incidencia asociada a un movimiento.
- Resultado: Reconstruir el movimiento con evidencia.
- Necesidades relacionadas: Entender qué ocurrió con cada artículo y quién intervino.
- Del mapa: La trazabilidad completa es un requisito; se desconoce el flujo actual de auditoría y los permisos detallados.
- Restricciones: Acceso por rol y datos sincronizados de varios terminales.

**Exploración del problema**

**Comportamiento actual**
- Desconocido: Cómo investiga hoy un auditor un movimiento de artículo.
  *Por qué:* El briefing enumera el rol y la trazabilidad futura, no el método actual.

**Puntos de dolor**
- Desconocido: Qué parte de la reconstrucción de una incidencia resulta difícil hoy.
  *Por qué:* No hay casos ni entrevistas de auditoría.

**Barreras**
- Desconocido: Qué evidencia, permisos y nivel de detalle requiere una auditoría.
  *Por qué:* El briefing no define políticas de acceso ni procedimientos de auditoría.

**Consecuencias**
- Desconocido: Qué decisión o riesgo depende de cerrar una investigación.
  *Por qué:* No se detallan consecuencias operativas o regulatorias.

**Alternativas actuales**
- Desconocido: Qué registros o personas consulta hoy el auditor.
  *Por qué:* No hay alternativa documentada.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al auditor a reconstruir un movimiento sin tener que inferir información ausente?
- ¿Cómo podríamos hacer comprensible la relación entre un movimiento, su terminal y los cambios posteriores?

## 3. Problemas enmarcados

- Los operarios de muelle deben separar la recepción física de su registro digital cuando falla la red, y pasan a depender de papel.  
  *Origen:* Registrar una recepción durante un fallo de red.
- Los supervisores corrigen diferencias de stock manualmente sin un recorrido documentado para detectar, revisar y autorizar la corrección.  
  *Origen:* Corregir una diferencia de stock en recepción.
- Durante una hora punta, los operarios simplifican pasos para mantener el ritmo y parte del registro queda fuera del sistema.  
  *Origen:* Completar picking o packing en hora punta.

## 4. Preguntas antes de explorar soluciones

Pendientes de investigación o de una decisión de producto:

- ¿Cómo se trasladan, validan y corrigen hoy los movimientos anotados en papel después de un fallo de red?
- ¿Qué información necesita un operario para continuar con seguridad cuando hay movimientos pendientes de sincronización?
- ¿Cómo se detecta una diferencia de stock, quién puede corregirla y qué evidencia debe revisar?
- ¿Qué reglas resuelven datos duplicados o en conflicto entre terminales después de recuperar la conexión?
- ¿Qué pasos concretos se simplifican o se omiten durante picking y packing en hora punta?
- ¿Qué parte del flujo de picking o packing añade demora y cuál protege una operación correcta?
- ¿Cómo supervisan hoy las incidencias y qué señales determinan que un supervisor debe intervenir?
- ¿Qué KPIs necesitan los supervisores, con qué frecuencia y qué acción debe provocar cada uno?
- ¿Cómo investiga hoy el auditor un movimiento y qué evidencia necesita para cerrar una incidencia?
- ¿Qué permisos y retención de datos exige la trazabilidad por rol?
