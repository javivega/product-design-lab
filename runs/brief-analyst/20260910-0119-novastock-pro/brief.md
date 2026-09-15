# Brief de producto — NovaStock Pro

## 1. Contexto del cliente y del sector

Logística NovaGestión S.A. opera la distribución nacional de bienes de consumo. Tiene más de 15 años de experiencia, 12 centros de distribución y gestiona más de 50.000 referencias (SKUs) al día. El proyecto se enmarca en operaciones internas de almacén y logística.

## 2. Problema de negocio

El sistema actual combina hojas de cálculo complejas con un software heredado de diez años. La expansión de la empresa ha llevado ese sistema a su límite y provoca cuellos de botella, errores de stock y latencia.

## 3. Objetivo principal del proyecto

Diseñar, desarrollar, probar e implantar NovaStock Pro: una aplicación de escritorio interna para supervisores y operarios de almacén que modernice la gestión de inventario y las operaciones de entrada y salida de mercancía.

La empresa busca reducir los errores de entrada manual en un 80%, reducir el tiempo de recepción y despacho en un 30%, mantener la operación cuando falle la Wi‑Fi y dejar una base extensible para predicción de demanda en una fase posterior.

## 4. Objetivos secundarios

- Dar visibilidad del stock total, reservado y en tránsito.
- Hacer trazable cada movimiento de artículo.
- Simplificar la gestión de productos, categorías, proveedores y devoluciones.
- Ofrecer informes exportables y un panel de productividad configurable.
- Preparar el despliegue en todos los centros tras una prueba controlada en uno de ellos.

## 5. Requisitos y restricciones

### Requisitos declarados

- Aplicación de escritorio nativa para Windows 10/11 y macOS.
- Inicio de sesión mediante Active Directory/SSO y permisos para administración, jefatura de almacén, operarios de muelle y auditoría.
- Inventario en tiempo real, alertas de stock mínimo y auditoría de altas, cambios y eliminaciones.
- Lectura masiva de códigos 1D, 2D y QR; flujos guiados de picking y packing; devoluciones clasificadas por estado.
- Informes dinámicos en PDF y CSV, trazabilidad completa y panel de KPIs personalizable.
- Funcionamiento local sin conexión, con almacenamiento local y sincronización bidireccional al recuperar la red.
- Compatibilidad con lectores Zebra y Honeywell, y con impresoras térmicas por red local y USB.
- Consumo de la API interna REST o GraphQL, respaldada por PostgreSQL y Node.js.
- Datos sensibles locales cifrados con AES-256 y comunicaciones mediante HTTPS/TLS 1.3.
- Interfaz limpia, de alto contraste y tipografía grande, apta para pantallas táctiles industriales y uso con guantes.
- Dos rondas mínimas de wireframes y prototipos navegables antes de programar.
- Entrega de documentación, diseños aprobados, código fuente, instaladores, manuales y resultados de QA.
- Duración máxima de seis meses, con piloto en un centro de distribución durante el mes 5.

### Implicaciones de diseño inferidas

- Los flujos críticos deben dar respuesta visible cuando la conexión cambie, ya que la operación no puede detenerse.
- La interfaz deberá equilibrar pasos guiados para evitar errores con una ejecución ágil en momentos de carga.
- El diseño deberá adaptarse a perfiles con permisos y responsabilidades distintas.

## 6. Stakeholders

No se nombran personas responsables en el RFP.

- Comité Técnico y de Compras: evaluará las propuestas y, previsiblemente, participa en la selección del proveedor.
- Logística NovaGestión S.A.: patrocinador y entidad que recibe la solución.
- Equipo interno que desarrolla la API: dependencia técnica del proyecto; no se especifica su capacidad, responsables ni calendario de disponibilidad.

## 7. Usuarios

- Supervisores de almacén: usuarios internos previstos; se desconoce qué decisiones y tareas realizan directamente en la aplicación.
- Operarios de almacén y de muelle: usuarios internos previstos para el trabajo operativo; se desconoce su experiencia digital, sus flujos actuales y sus principales fricciones.
- Administradores del sistema: gestionarán acceso y permisos, según los roles definidos.
- Auditores: consultarán o revisarán trazabilidad, según los roles definidos.
- Gerencia: está cubierta por una parte de los terminales macOS; el RFP no aclara qué tareas realizará en la aplicación.

## 8. Necesidades principales de los usuarios

- Registrar y consultar movimientos de inventario sin depender de una conexión estable.
- Reducir la entrada manual de datos al usar lectores de códigos.
- Completar recepción, picking, packing y devoluciones con claridad y rapidez.
- Ver el estado fiable del stock y de las alertas.
- Entender qué ocurrió con cada artículo y quién intervino.
- Usar la interfaz con guantes y en pantallas industriales.

### Mapa de supuestos

**Conocido**
- La operación actual sufre errores de stock, cuellos de botella y latencia.
  *Por qué lo sabemos:* El RFP los atribuye al sistema heredado y a las hojas de cálculo.
- Al menos un error de stock reciente afectó a la recepción de mercancía.
  *Por qué lo sabemos:* La persona responsable lo confirmó al responder a la primera pregunta del briefing.
- El equipo corrigió manualmente ese error.
  *Por qué lo sabemos:* La persona responsable lo confirmó al describir cómo se resolvió.
- La conectividad Wi‑Fi es inestable en zonas del almacén.
  *Por qué lo sabemos:* El modo sin conexión es un requisito indispensable.
- Un fallo reciente de Wi‑Fi interrumpió una recepción de mercancía.
  *Por qué lo sabemos:* La persona responsable identificó la recepción como la tarea en curso durante el último caso.
- Durante ese fallo, el equipo anotó los movimientos en papel.
  *Por qué lo sabemos:* La persona responsable confirmó el método usado mientras no había conexión.
- En hora punta, al menos un operario simplificó pasos para terminar más rápido.
  *Por qué lo sabemos:* La persona responsable lo confirmó al describir un caso reciente de picking o packing.
- En ese caso, parte del trabajo se registró en papel.
  *Por qué lo sabemos:* La persona responsable confirmó que se usó papel durante la hora punta.
- La interfaz debe funcionar en pantallas táctiles industriales y con guantes.
  *Por qué lo sabemos:* El RFP lo establece expresamente como requisito de UX.

**Supuestos**
- La lectura de códigos reducirá de forma significativa los errores de entrada.
  *Por qué es un supuesto:* Se fija una meta del 80%, pero no hay datos de errores actuales ni evidencia de su causa.
- Un flujo guiado ayudará a los operarios a completar picking y packing correctamente.
  *Por qué es un supuesto:* El RFP pide un proceso guiado, sin describir cómo trabajan hoy ni qué errores evita.
- Los usuarios podrán continuar con seguridad cuando el stock esté pendiente de sincronizarse.
  *Por qué es un supuesto:* Se exige trabajo sin conexión, pero no se describen las reglas para datos desactualizados o conflictos.

**Incógnitas**
- Qué tareas concretas realiza cada rol, con qué frecuencia y en qué dispositivo.
  *Por qué:* El RFP enumera roles, pero no sus recorridos ni contexto de uso.
- En qué pasos aparecen hoy los errores de stock y cuánto cuestan.
  *Por qué:* Se dan objetivos de reducción, no una línea base ni causas.
- Cómo se resuelven actualmente los desacuerdos de stock o los duplicados.
  *Por qué:* No se documentan las prácticas operativas ni las reglas de negocio.
- Qué información necesita la gerencia en macOS y con qué frecuencia.
  *Por qué:* Solo se indica el porcentaje de terminales de gerencia.
- Qué métricas deben aparecer en el panel y para qué decisiones se usarán.
  *Por qué:* El panel es requerido, pero los KPIs no están definidos.

**Conflictos**
- La aplicación debe mostrar stock en tiempo real y también permitir operar sin conexión.
  *Por qué:* El RFP exige ambas cosas, pero no define cómo se comunicará o resolverá el estado temporalmente desactualizado.
- Los flujos deben ser guiados y, a la vez, reducir el tiempo operativo un 30%.
  *Por qué:* No se define cuándo priorizar controles para evitar errores frente a velocidad durante picos de trabajo.

## 9. JTBD

- Cuando recibo mercancía y la red falla, quiero registrar los movimientos en el mismo punto de trabajo para no depender de apuntes en papel ni detener la operación.
- Cuando detecto una diferencia de stock en una recepción, quiero revisarla y corregirla con trazabilidad para recuperar un inventario fiable.
- Cuando trabajo en picking o packing durante una hora punta, quiero terminar las tareas con rapidez sin perder los controles necesarios.
- Cuando superviso las operaciones de almacén, quiero ver el estado del inventario, las incidencias y la productividad para poder intervenir a tiempo.
- Cuando audito un movimiento de artículo, quiero saber quién lo hizo, cuándo, desde qué terminal y hacia dónde fue para poder investigar una incidencia.

## 10. Preguntas

### Para la persona responsable del briefing (Mom Test)

No quedan preguntas pendientes para la persona responsable. Las lagunas que requieren investigación o decisiones de producto se mantienen a continuación.

### Preguntas abiertas

Para diseño e investigación — aún sin respuesta:

- ¿Qué terminales, tamaños de pantalla y modos de interacción usan los operarios en cada área?
- ¿Qué datos puede ver y modificar cada rol?
- ¿Cómo se priorizan o resuelven los conflictos de sincronización entre terminales?
- ¿Qué información debe estar disponible sin conexión y cuánto tiempo puede permanecer pendiente de sincronizarse?
- ¿Qué reglas de negocio definen las alertas de stock mínimo y la clasificación de devoluciones?
- ¿Qué KPIs necesita cada público y qué acción debe poder tomar desde el panel?
- ¿Cuál es la línea base de tiempos y errores que permitirá medir los objetivos del RFP?
- ¿Qué disponibilidad, contrato y límites tendrá la API interna durante el proyecto?
