# Problemas de diseño — Vínculo Animal

## 1. Alcance y fuentes

Este trabajo enmarca los cuatro JTBD del briefing de Vínculo Animal. El único rol de producto es educador (equipo de tres). Los perfiles sintéticos confirmados son: Educador — justo después de clase (in situ) y Educador — en el escritorio (ficha y pautas). Familias y perros no operan la herramienta.

Fuentes: briefing y perfiles de `runs/brief-analyst/20260915-2052-vinculo-animal/`.

## 2. Trabajos

### Anotar la evolución al terminar la clase

**JTBD**
- Como educador / persona Educador — justo después de clase (in situ): Cuando termino una clase, quiero anotar la evolución en el acto y en el sitio, para no depender de la libretita ni perder el detalle al irme.

**Contexto**
- Quién: Educador — perfil in situ.
- Cuándo: Al terminar la clase, todavía en el sitio.
- Resultado: Dejar constancia de la evolución sin esperar al ordenador.
- Necesidades relacionadas: Anotar en el acto; no volver al papel si la herramienta cuesta más.
- Del mapa: Se sabe que el último caso se anotó en papel, en el momento, en el sitio. Se asume que sin dispositivo a mano el papel gana. Se desconoce qué se escribe y dónde ocurre la clase.
- Restricciones: El RFP pide escritorio; el corte de evaluación es sin ordenador de escritorio a mano. Sincronización solo con internet.

**Exploración del problema**

**Comportamiento actual**
- Al terminar una clase reciente, el educador anotó en agenda física, libretita o papel suelto, en el acto y en el sitio.
  *Por qué lo sabemos:* La persona responsable describió esa última clase.
- Desconocido: Qué frases o campos anota (evolución, deberes, siguiente cita) y si luego lo pasa a digital.
  *Por qué:* Sabemos el soporte y el momento, no el contenido ni el paso posterior.

**Puntos de dolor**
- El registro vivo vive en papel, no junto al historial de la ficha.
  *Por qué lo sabemos:* El papel fue el soporte de esa anotación inmediata.
- Es una suposición que, si hay que abrir un escritorio después, parte del detalle se pierda.
  *Por qué:* No hay evidencia de qué se pierde al transcribir.

**Barreras**
- No hay un ordenador de escritorio a mano en el momento en que anotan.
  *Por qué lo sabemos:* Corte confirmado por diseño para evaluación, alineado con anotar in situ en papel.
- Desconocido: Si hay red, tablet o móvil en ese sitio.
  *Por qué:* El RFP solo habla de tres ordenadores que sincronizan con internet.

**Consecuencias**
- El hábito actual refuerza el papel; el RFP advierte que si la app es compleja volverán a él.
  *Por qué lo sabemos:* Riesgo de adopción declarado más el caso reciente en papel.
- Desconocido: Con qué frecuencia esa nota de papel nunca llega a un documento compartido.
  *Por qué:* No se midió el paso posterior.

**Alternativas actuales**
- Agenda física, libretita o folio en el sitio de la clase.
  *Por qué lo sabemos:* Último caso confirmado.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al educador a dejar la evolución de la clase en el acto, sin que el papel gane?
- ¿Cómo podríamos hacer que anotar en el sitio cueste menos que sacar la libretita?
- ¿Cómo podríamos evitar que esa nota se quede solo en el papel al irse?

### Encontrar los datos de una familia

**JTBD**
- Como educador / persona Educador — en el escritorio (ficha y pautas): Cuando necesito los datos de un perro o de su familia, quiero encontrarlos en un solo sitio, para no reconstruir la ficha entre WhatsApp y documentos.

**Contexto**
- Quién: Educador — perfil de escritorio.
- Cuándo: Al buscar contacto, historial o datos del perro.
- Resultado: Una sola fuente, sin reconstruir.
- Necesidades relacionadas: Encontrar la ficha en un solo sitio.
- Del mapa: Se sabe que la última búsqueda usó WhatsApp y documentos/Drive. Se desconoce qué pasa si no coinciden. Se asume la ficha 1 humano + 1 perro.
- Restricciones: Tres ordenadores; buscador pedido por nombre de perro o humano.

**Exploración del problema**

**Comportamiento actual**
- La última vez que se buscaron datos de una familia, se miró WhatsApp y también documentos o Drive.
  *Por qué lo sabemos:* La persona responsable señaló ambos sitios.
- Desconocido: En qué orden se mira, cuánto tarda y qué se copia a dónde.
  *Por qué:* Solo conocemos los dos soportes, no el recorrido.

**Puntos de dolor**
- Los datos de una misma familia están partidos en al menos dos sitios.
  *Por qué lo sabemos:* La última búsqueda usó ambos.
- Es una suposición (relleno de evaluación) que reconstruir la ficha canse y deje huecos.
  *Por qué:* Confirmado para simular, no medido en el equipo.

**Barreras**
- No hay un único sitio de verdad hoy; el RFP nombra papel, documentos sueltos y WhatsApp.
  *Por qué lo sabemos:* Sistema actual del briefing más la última búsqueda.
- Desconocido: Qué se hace cuando WhatsApp y el documento no coinciden.
  *Por qué:* El briefing no describe la corrección.

**Consecuencias**
- Preparar una clase o una pauta exige cazar información, no abrir una ficha.
  *Por qué lo sabemos:* Interpretación del comportamiento confirmado (dos sitios).
- Desconocido: Si eso retrasa el envío de pautas o se da la clase con datos incompletos.
  *Por qué:* No hay un caso de dato faltante narrado.

**Alternativas actuales**
- Buscar en WhatsApp y en documentos / Drive.
  *Por qué lo sabemos:* Última búsqueda.
- Agendas y papeles existen en el sistema actual, pero no se usaron en esa búsqueda.
  *Por qué lo sabemos:* El RFP los nombra; la persona responsable eligió A y C, no el papel.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al educador a encontrar a un perro o a su humano sin recorrer dos sitios?
- ¿Cómo podríamos hacer visible si un dato falta o no coincide, sin que tenga que recordarlo de memoria?

### Mandar los ejercicios para casa

**JTBD**
- Como educador / persona Educador — en el escritorio (ficha y pautas): Cuando hay ejercicios para casa, quiero redactarlos una vez y mandarlos por el canal que ya uso (WhatsApp), para no copiar de un documento ni fingir que el PDF por correo es el envío real.

**Contexto**
- Quién: Educador — perfil de escritorio.
- Cuándo: Tras una clase, al enviar ejercicios a la familia.
- Resultado: Redactar una vez y enviar por el canal real.
- Necesidades relacionadas: Redactar y mandar pautas; el último envío fue WhatsApp, no PDF por correo.
- Del mapa: Se sabe el último canal (texto de un documento → WhatsApp) y que no recuerdan un caso reciente sin envío. Se asume que el PDF corporativo sustituirá ese hábito. Conflicto: alcance PDF/correo vs canal real.
- Restricciones: Plantilla enriquecida y PDF con membrete están en el MVP; el envío in-app no está declarado.

**Exploración del problema**

**Comportamiento actual**
- La última vez, se copió un texto de un documento y se mandó por WhatsApp.
  *Por qué lo sabemos:* La persona responsable lo eligió.
- No recuerdan un caso reciente en el que las pautas no se enviaran.
  *Por qué lo sabemos:* Respuesta a la última pregunta del briefing.
- Desconocido: Si a veces también se entrega papel en mano o un PDF.
  *Por qué:* Solo tenemos un envío reciente.

**Puntos de dolor**
- Hay que redactar (o tener) un documento y luego copiarlo a WhatsApp.
  *Por qué lo sabemos:* Ese fue el último método.
- El PDF listo para correo no describe lo que acaba de pasar.
  *Por qué lo sabemos:* El RFP pide PDF; el caso real fue WhatsApp.

**Barreras**
- El canal de la familia es WhatsApp; el entregable pedido es un archivo para correo.
  *Por qué lo sabemos:* Conflicto entre requisito y último comportamiento.
- Desconocido: Si las familias esperan membrete o les basta el texto.
  *Por qué:* No hay relato del lado cliente.

**Consecuencias**
- Un diseño centrado en exportar PDF puede no cambiar el trabajo diario de envío.
  *Por qué lo sabemos:* Interpretación del conflicto canal vs entregable.
- Desconocido: Cuánto tiempo se pierde en copiar, o si el documento y el WhatsApp divergen.
  *Por qué:* No hay tiempos ni ejemplos de texto.

**Alternativas actuales**
- Documento + pegar en WhatsApp.
  *Por qué lo sabemos:* Último envío.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al educador a redactar los ejercicios una vez y hacerlos llegar por el canal que ya usa?
- ¿Cómo podríamos honrar la imagen de la empresa en las pautas sin obligar a un correo que hoy no es el envío?

### Ver las sesiones del propio día

**JTBD**
- Como educador / persona Educador — justo después de clase (in situ): Cuando miro el día, quiero ver mis propias sesiones, para saber a quién toca ahora sin cazar la agenda de otra persona.

**Contexto**
- Quién: Educador — perfil in situ (también encaja en escritorio).
- Cuándo: Al mirar qué clase toca ahora o a continuación.
- Resultado: Ver las propias sesiones sin coordinar con la agenda ajena.
- Necesidades relacionadas: Ver las propias sesiones; el calendario compartido con color es requisito, no un dolor reciente.
- Del mapa: Se sabe que cada uno mira su propia agenda y no recuerdan un choque reciente. Se asume que el calendario compartido resuelve un problema real. Conflicto: alcance de tres vistas + color vs hábito de agenda propia.
- Restricciones: Tres educadores, color por educador, vistas diaria/semanal/mensual pedidas.

**Exploración del problema**

**Comportamiento actual**
- Cada educador mira su propia agenda. No recuerdan un choque o cambio reciente entre dos personas.
  *Por qué lo sabemos:* La persona responsable lo eligió.
- Desconocido: Si esa agenda propia es la física del sitio o un calendario digital personal.
  *Por qué:* El RFP nombra agendas físicas; no se preguntó el formato de “mi agenda”.

**Puntos de dolor**
- El dolor evidenciado es débil: no hay un solape reciente que duele.
  *Por qué lo sabemos:* “No recuerdo un choque; cada uno mira la suya.”
- Es una suposición que no ver al resto del equipo sea un problema.
  *Por qué:* El RFP pide color por educador; el relato no lo respalda.

**Barreras**
- Tres agendas propias no son un sistema compartido, aunque tampoco hay evidencia de choques.
  *Por qué lo sabemos:* Combinación de RFP (tres personas, tres PCs) y la respuesta.
- Desconocido: Cómo se enteran de una cancelación o de un cambio de última hora.
  *Por qué:* Solo se preguntó por choques, no por cambios.

**Consecuencias**
- Meter un calendario de equipo rico puede añadir complejidad sin un dolor de coordinación reciente.
  *Por qué lo sabemos:* Tensión adopción-sencillez vs alcance de agenda del RFP.
- Desconocido: Si alguien del equipo sí agenda por los demás.
  *Por qué:* Roles internos no diferenciados.

**Alternativas actuales**
- Agenda propia de cada educador.
  *Por qué lo sabemos:* Respuesta al último solape.

**Preguntas HMW**
- ¿Cómo podríamos ayudar al educador a ver qué le toca ahora sin obligarle a gestionar la agenda de los otros?
- ¿Cómo podríamos cubrir la planificación del equipo sin añadir un sistema más pesado que la agenda propia?

## 3. Problemas enmarcados

- Al terminar la clase, el educador deja la evolución en papel en el sitio, no junto al historial de la familia.
  *De:* Anotar la evolución al terminar la clase.
- Si registrar digitalmente no cabe en ese momento y lugar, el papel sigue ganando.
  *De:* Anotar la evolución al terminar la clase.
- Al buscar a una familia, el educador tiene que reconstruir los datos entre WhatsApp y documentos.
  *De:* Encontrar los datos de una familia.
- Para mandar ejercicios, el educador copia de un documento a WhatsApp; el PDF por correo no es el envío que acaba de ocurrir.
  *De:* Mandar los ejercicios para casa.
- Cada educador se orienta con su propia agenda; no hay un choque reciente, así que un calendario de equipo puede ser alcance sin dolor sentido.
  *De:* Ver las sesiones del propio día.

## 4. Preguntas antes de explorar soluciones

Aún sin respuesta — investigación o decisión de producto:
- ¿Qué se escribe en el papel tras la clase y con qué frecuencia se pasa a un documento o a WhatsApp?
- ¿Las clases son a menudo sin un dispositivo a mano (domicilio, parque)?
- ¿Una ficha es un humano y un perro, o hay varios perros o tutores?
- ¿Qué se hace cuando WhatsApp y el documento no coinciden?
- ¿El PDF con membrete debe existir aunque WhatsApp siga siendo el canal, o el envío digital cuenta como hecho?
- ¿Hace falta ver la agenda de los otros, o basta con la propia?
- ¿Los tres educadores hacen el mismo trabajo, o hay alguien que agenda o redacta por los demás?
- ¿La primera exploración de diseño cubre “después de clase” o los tres módulos a la vez?
