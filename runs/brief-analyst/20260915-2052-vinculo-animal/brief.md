# Brief de producto — Vínculo Animal (CRM educativo canino)

## 1. Contexto del cliente y del sector

Vínculo Animal S.L. (Málaga) se dedica a la educación canina basada en el respeto y la convivencia de la familia multiespecie. El proyecto es una herramienta interna de escritorio para gestionar familias (humanos y perros), sesiones y calendario.

## 2. Problema de negocio

Hoy la gestión de clientes, el seguimiento de sesiones y la planificación se reparte entre agendas físicas, documentos de texto sueltos y WhatsApp. Eso encarece el trabajo administrativo y dificulta un registro homogéneo del progreso de los animales.

## 3. Objetivo principal del proyecto

Contratar a un desarrollador o agencia para crear una aplicación de escritorio ligera e intuitiva que centralice esa información, reduzca la carga administrativa del equipo (tres educadores) y estandarice cómo se documenta el progreso de los perros.

El MVP se limita a tres módulos: directorio de familias, agenda y generación de pautas exportables a PDF.

## 4. Objetivos secundarios

- Sustituir el mosaico actual de papel, archivos sueltos y WhatsApp por un único sitio de consulta.
- Dejar cada sesión vinculada a una ficha de familia, con notas de evolución y, si aplica, ejercicios para casa.
- Compartir un calendario coloreado por educador entre los tres ordenadores del equipo.
- Entregar prototipos navegables en la semana 1 y un empaquetado para Windows y macOS en cuatro semanas.

## 5. Requisitos y restricciones

### Requisitos declarados

- Solo tres módulos en el MVP: directorio de familias, agenda y generación de pautas (exportación).
- Ficha combinada: contacto del humano responsable y perfil del perro (nombre, edad, raza, reactividades, historial de salud).
- Historial de sesiones tipo muro o línea de tiempo dentro de cada ficha, para notas rápidas tras cada clase.
- Búsqueda por nombre del perro o del humano.
- Calendario con vistas diaria, semanal y mensual; eventos de sesión ligados a una ficha de familia; color automático por educador asignado.
- Plantilla de texto enriquecido por sesión para ejercicios en casa; exportación rápida a PDF con membrete y logotipo, lista para adjuntar por correo.
- Navegación principal visible en una barra lateral simple, sin menús anidados profundos.
- Retícula de 4px en diseño e implementación.
- Escritorio en Windows y macOS; low-code/no-code compilable o web encapsulada (Electron, Tauri o PWA instalable).
- Base de datos en la nube (ej. Firebase, Supabase, Airtable) con sincronización en tiempo real cuando los tres ordenadores estén conectados a internet.
- Infraestructura mensual ≤ 30 €.
- Plazo de 4 semanas (Figma en semana 1; CRM en semana 2; agenda + PDF + empaquetado en semana 3; bugs e instaladores en semana 4).

### Implicaciones de diseño inferidas

- El flujo crítico no es “un CRM completo”, sino registrar y reencontrar lo que acaba de pasar en una clase con muy pocos pasos.
- El PDF se plantea como archivo para adjuntar fuera de la app; el envío por correo o WhatsApp no está en el alcance declarado.
- La sincronización se describe solo con internet; no hay requisito de trabajo sin red.
- El diseño debe tratar la adopción como riesgo principal: si cuesta más que el papel, el equipo puede no usarla.

## 6. Stakeholders

No se nombran personas responsables en el RFP (quién decide, aprueba o firma).

- Vínculo Animal S.L.: empresa emisora y destinataria de la herramienta.
- Quien evalúe las propuestas de proveedores: no se indica comité, fundación ni educador-propietario.

## 7. Usuarios

- Educadores (equipo de tres): usuarios internos previstos. Operan fichas, agenda y pautas. No se describe qué hace cada uno, ni si alguno también gestiona el negocio. En un caso reciente, al terminar una clase se anotó en el acto, aún en el sitio, en agenda física, libretita o papel suelto. La persona responsable no recuerda un choque de horario reciente: cada educador mira su propia agenda.
- Familias (humanos responsables) y perros: aparecen en las fichas y reciben el PDF; no son usuarios de la aplicación según el RFP.
- No hay otros roles de producto nombrados (administración, recepción, facturación).

## 8. Necesidades principales de los usuarios

- Encontrar la ficha en un solo sitio: la última vez los datos estaban repartidos entre WhatsApp y documentos / Drive.
- Anotar en el acto, aún en el sitio de la clase, sin esperar al ordenador — hoy eso cae en papel.
- Ver las propias sesiones del día; el RFP pide además ver quién da cada hora, pero no hay un choque reciente que lo haya hecho urgente.
- Crear una sesión ya ligada a una familia, sin reescribir los datos.
- Redactar ejercicios para casa y mandarlos; hoy el último envío fue un texto de WhatsApp copiado de un documento, no un PDF por correo.
- Hacer todo eso sin menús escondidos ni más fricción que el papel y el WhatsApp de ahora.

### Mapa de supuestos

**Conocido**
- Hoy se trabaja con agendas físicas, documentos sueltos y WhatsApp.
  *Por qué lo sabemos:* El RFP lo describe como el sistema actual.
- En un caso reciente, al terminar una clase se anotó en papel (agenda física, libretita o folio), no en un documento ni en WhatsApp.
  *Por qué lo sabemos:* La persona responsable lo eligió al contar la última clase.
- Esa anotación se hizo en el momento, todavía en el sitio de la clase.
  *Por qué lo sabemos:* La persona responsable lo confirmó para esa misma sesión.
- La última vez que se buscó a una familia, los datos estaban en WhatsApp y también en documentos o Drive.
  *Por qué lo sabemos:* La persona responsable señaló ambos sitios.
- No hay un choque de horario reciente en la memoria de la persona responsable; cada educador mira su propia agenda.
  *Por qué lo sabemos:* Lo eligió al preguntar por el último solape o cambio entre dos educadores.
- La última vez que se enviaron ejercicios para casa, se copió un texto de un documento y se mandó por WhatsApp.
  *Por qué lo sabemos:* La persona responsable lo eligió al contar el último envío.
- No recuerdan un caso reciente en el que las pautas no se llegaran a enviar.
  *Por qué lo sabemos:* La persona responsable lo eligió al preguntar por la última vez que no se enviaron.
- El equipo previsto son tres educadores, cada uno con un ordenador que debe sincronizarse en la nube.
  *Por qué lo sabemos:* El RFP fija el tamaño del equipo y la sincronización entre tres equipos.
- El MVP se corta en tres módulos y no más, para no inflar el coste.
  *Por qué lo sabemos:* El alcance lo declara de forma exclusiva.
- La empresa considera la adopción el mayor riesgo: si la app es compleja, volverán al papel.
  *Por qué lo sabemos:* Está escrito como requisito de diseño, no como hallazgo de investigación.

**Supuestos**
- Si la app no se puede usar en el sitio de la clase (móvil/tablet o un portátil a mano), el papel seguirá ganando.
  *Por qué es un supuesto:* Un caso reciente se anotó en el acto en el sitio; el RFP pide escritorio, no el dispositivo de esa anotación.
- Una ficha combinada de un humano y un perro es la unidad correcta.
  *Por qué es un supuesto:* Se pide esa ficha; no se dice si una familia tiene varios perros o varios tutores.
- El calendario compartido con color por educador resolverá un problema real de coordinación.
  *Por qué es un supuesto:* El RFP lo pide; el último relato es que cada uno mira su agenda y no recuerdan un choque.
- El PDF con membrete sustituirá el envío real (hoy: WhatsApp con texto copiado de un documento).
  *Por qué es un supuesto:* El RFP pide PDF listo para correo; el último caso real fue WhatsApp, no email.

**Incógnitas**
- Qué escriben en el papel (evolución, deberes, siguiente cita) y qué se pierde al pasarlo después.
  *Por qué:* Sabemos el soporte y el momento, no el contenido.
- Dónde dan las clases (centro, domicilio, parque) y si hay red en ese momento.
  *Por qué:* Solo se habla de sincronizar cuando hay internet.
- Qué se hace cuando WhatsApp y el documento no coinciden, o falta un dato en los dos.
  *Por qué:* Sabemos que se busca en ambos; no cómo se resuelve el desacuerdo.
- Quién decide el producto y si los tres educadores trabajan igual o hay un perfil más administrativo.
  *Por qué:* No hay stakeholders nombrados ni diferencia de roles.
- Qué campos de reactividad y salud se usan de verdad, y con qué detalle se redactan las pautas.
  *Por qué:* El RFP lista etiquetas, no ejemplos de notas reales.

**Conflictos**
- Se pide una herramienta “ligera y sencilla” y, a la vez, diseño comportamental, texto enriquecido, tres vistas de calendario y PDF corporativo en cuatro semanas.
  *Por qué:* El riesgo de adopción empuja a recortar; el alcance MVP y el hito de Figma en siete días empujan a cubrir mucho.
- Escritorio nativo / empaquetado frente a PWA o low-code; la sincronización solo existe con internet.
  *Por qué:* El RFP abre varias tecnologías y no define qué pasa si un educador anota fuera de cobertura.

## 9. JTBDs

- **Como** educador **/ persona** Educador — justo después de clase (in situ): **Cuando** termino una clase, **quiero** anotar la evolución en el acto y en el sitio, **para** no depender de la libretita ni perder el detalle al irme.
- **Como** educador **/ persona** Educador — en el escritorio (ficha y pautas): **Cuando** necesito los datos de un perro o de su familia, **quiero** encontrarlos en un solo sitio, **para** no reconstruir la ficha entre WhatsApp y documentos.
- **Como** educador **/ persona** Educador — en el escritorio (ficha y pautas): **Cuando** hay ejercicios para casa, **quiero** redactarlos una vez y mandarlos por el canal que ya uso (WhatsApp), **para** no copiar de un documento ni fingir que el PDF por correo es el envío real.
- **Como** educador **/ persona** Educador — justo después de clase (in situ): **Cuando** miro el día, **quiero** ver mis propias sesiones, **para** saber a quién toca ahora sin cazar la agenda de otra persona.

## 10. Preguntas

### Para la persona responsable del briefing (Mom Test)

No quedan preguntas pendientes para la persona responsable. Las lagunas que requieren investigación o decisiones de producto se mantienen a continuación.

### Preguntas abiertas

Para diseño e investigación — aún sin respuesta:
- ¿Una ficha es un humano y un perro, o hay familias con varios perros o varios tutores?
- ¿Las clases ocurren a menudo sin un ordenador a mano (domicilio, parque) y hay que anotar igual en la app?
- ¿Los tres educadores hacen el mismo trabajo, o hay alguien que agenda, factura o escribe las pautas por los demás?
- ¿El PDF se adjunta por correo, se reenvía por WhatsApp, o se ignora si WhatsApp ya cubre el envío?
- ¿Hace falta ver la agenda de los otros tres, o basta con la propia más el color?
- ¿La semana 1 de Figma cubre los tres módulos o un único flujo de “después de clase”?
- ¿Qué escriben en el papel tras la clase y qué se pierde si no se pasa a digital?
