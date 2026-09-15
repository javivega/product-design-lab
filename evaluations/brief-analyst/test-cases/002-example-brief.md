# SOLICITUD DE PROPUESTA (RFP)

## Proyecto: CRM de Gestión Educativa Canina (Versión Escritorio)

**Empresa Emisora:** Vínculo Animal S.L. (Málaga)
**Tipo de Proyecto:** Desarrollo *Low-Code/No-Code* o Desarrollo a Medida Ligero
**Fecha límite de recepción de propuestas:** 30 de Septiembre de 2026

---

### 1. Contexto y Objetivos del Negocio

Vínculo Animal S.L. se dedica a la educación canina basada en el respeto y la convivencia de la familia multiespecie. Actualmente, la gestión de clientes (humanos y perros), el seguimiento de las sesiones y la planificación del calendario se realizan mediante una mezcla ineficiente de agendas físicas, documentos de texto sueltos y mensajes de WhatsApp.

**Objetivo del RFP:**
Contratar a un desarrollador o agencia para crear una aplicación de escritorio ligera e intuitiva que centralice esta información. La herramienta debe reducir la carga administrativa del equipo (compuesto por 3 educadores) y estandarizar la forma en que documentamos el progreso de los animales.

### 2. Alcance Funcional Detallado

El Producto Mínimo Viable (MVP) debe contemplar exclusivamente los siguientes tres módulos funcionales para evitar sobrecostes:

* **Módulo 1: Directorio de Familias Multiespecie (CRM Básico)**
* Ficha combinada: Datos de contacto del humano responsable y perfil detallado del perro (nombre, edad, raza, reactividades, historial de salud).
* Historial de sesiones: Un espacio tipo "muro" o "línea de tiempo" dentro de cada ficha para añadir notas rápidas de evolución tras cada clase.
* Buscador rápido para localizar fichas por nombre del perro o del humano.


* **Módulo 2: Agenda y Planificación**
* Calendario integrado con vista diaria, semanal y mensual.
* Creación de eventos (sesiones) vinculados a la ficha de una familia específica.
* Código de colores automático según el educador asignado.


* **Módulo 3: Generación de Pautas (Exportación)**
* Una plantilla de texto enriquecido (Rich Text) vinculada a cada sesión para redactar los ejercicios a practicar en casa.
* Botón de exportación rápida a PDF con el membrete y logotipo de la empresa, listo para adjuntar y enviar por correo al cliente.



### 3. Requisitos de Diseño (UX/UI) y Comportamiento

La adopción de la herramienta por parte del equipo es el mayor riesgo del proyecto. Si la app es compleja, los educadores volverán al papel. Por ello, exigimos un enfoque estricto en el diseño y la psicología del usuario:

* **Diseño Comportamental:** La propuesta técnica debe evaluar específicamente las suposiciones relacionadas con la formación de hábitos del usuario y los desencadenantes conductuales (*behavioral triggers*). Queremos entender cómo el diseño de la interfaz motivará a los educadores a registrar los datos inmediatamente después de cada sesión (por ejemplo, mediante micro-interacciones gratificantes o minimizando el número de clics).
* **Sistema de Retícula:** Toda la interfaz gráfica, desde los márgenes hasta la iconografía, debe estar maquetada e implementada utilizando un sistema de cuadrícula de 4px (4px grid). Esto aplica tanto a los entregables de diseño en Figma como a la ejecución final en CSS/propiedades visuales.
* **Minimalismo Funcional:** Ausencia total de menús anidados profundos. Toda la navegación principal debe estar visible en una barra lateral simple.

### 4. Requisitos Técnicos y de Arquitectura

Dada la sencillez del proyecto, valoramos la rapidez de ejecución y la facilidad de mantenimiento por encima del código 100% personalizado.

* **Tecnologías Permitidas:** Somos receptivos a herramientas *Low-Code/No-Code* que puedan compilarse para escritorio, o bien tecnologías web encapsuladas (como Electron, Tauri o PWAs instalables).
* **Sistemas Operativos:** La aplicación debe poder instalarse y ejecutarse de forma fluida tanto en Windows como en macOS.
* **Base de Datos:** Se requiere una base de datos en la nube (ej. Firebase, Supabase, Airtable como *backend*) ligera. Solo necesitamos que la información se sincronice en tiempo real cuando los 3 ordenadores estén conectados a internet.
* **Mantenimiento:** El coste de infraestructura mensual (servidores/bases de datos) no debe superar los 30€/mes.

### 5. Cronograma e Hitos de Entrega

Se espera que el proyecto se ejecute de manera ágil en un plazo de **4 semanas** desde el inicio formal:

| Hito | Descripción | Semana |
| --- | --- | --- |
| **Hito 1** | Entrega de prototipos navegables (Figma) y validación de flujos. | Semana 1 |
| **Hito 2** | Desarrollo del Directorio CRM y Base de datos conectada. | Semana 2 |
| **Hito 3** | Implementación de Agenda, PDF exportable y empaquetado para escritorio. | Semana 3 |
| **Hito 4** | Corrección de *bugs*, entrega de instaladores y código/propiedad del entorno. | Semana 4 |

### 6. Estructura de la Propuesta a Presentar

Los proveedores interesados deben enviar un documento PDF (máximo 10 páginas) que contenga:

1. **Enfoque de la Solución:** Qué tecnología usarán (ej. *Bubble + Wrapper*, *Electron + React*, etc.) y por qué es la mejor para este caso.
2. **Enfoque UX:** Breve explicación de cómo abordarán la retención y el diseño comportamental de la interfaz.
3. **Portafolio:** Enlaces a 2 o 3 aplicaciones o interfaces diseñadas/desarrolladas previamente.
4. **Presupuesto Cerrado:** Coste total del proyecto desglosado por los 4 hitos mencionados, además del coste de mantenimiento o infraestructura mensual esperado.
