Aquí tienes una versión mucho más extensa y detallada del RFP (Solicitud de Propuesta). Este formato es el que se utilizaría en un entorno corporativo real para licitar un proyecto de software de gran envergadura.

---

# SOLICITUD DE PROPUESTA (RFP)

## Proyecto: Desarrollo de Aplicación de Escritorio "NovaStock Pro"

**Empresa Emisora:** Logística NovaGestión S.A.
**Número de Referencia del RFP:** RFP-2026-045
**Fecha de Emisión:** 10 de Septiembre de 2026
**Fecha Límite para Preguntas:** 25 de Septiembre de 2026
**Fecha Límite de Recepción de Propuestas:** 15 de Octubre de 2026

---

### 1. Información General y Confidencialidad

Este documento contiene información confidencial y de propiedad de Logística NovaGestión S.A. Su propósito es exclusivo para la preparación de propuestas por parte de los proveedores invitados. La distribución, copia o divulgación no autorizada de cualquier parte de este RFP está estrictamente prohibida. La participación en este proceso implica la aceptación de un Acuerdo de Confidencialidad (NDA) implícito.

### 2. Presentación de la Empresa

**Logística NovaGestión S.A.** es un operador logístico líder con más de 15 años de experiencia en la distribución de bienes de consumo a nivel nacional. Actualmente, gestionamos una red de 12 centros de distribución y procesamos más de 50.000 referencias (SKUs) diarias.
Debido a nuestra rápida expansión, nuestro actual sistema de gestión de inventario —basado en una combinación de hojas de cálculo complejas y un software heredado de hace 10 años— ha llegado a su límite operativo, generando cuellos de botella, errores de stock y problemas de latencia.

### 3. Resumen y Objetivos del Proyecto

Buscamos una agencia de desarrollo de software para diseñar, desarrollar, probar e implementar **"NovaStock Pro"**, una aplicación de escritorio de uso interno destinada a nuestros supervisores y operarios de almacén.

**Objetivos Clave:**

* **Reducción de Errores:** Disminuir los errores de entrada manual de datos en un 80% mediante la integración automatizada de hardware.
* **Velocidad Operativa:** Reducir el tiempo de procesamiento de recepción y despacho de mercancía en un 30%.
* **Tolerancia a Fallos de Red:** Garantizar la continuidad del trabajo en áreas del almacén con conectividad WiFi inestable (Modo *Offline-First*).
* **Escalabilidad:** Crear una arquitectura base que permita añadir módulos de Inteligencia Artificial para la predicción de demanda en la Fase 2 (fuera de este RFP).

### 4. Requisitos Funcionales Detallados

La aplicación debe incluir, como mínimo, los siguientes módulos y funcionalidades:

* **Módulo de Autenticación y Control de Accesos:**
* Inicio de sesión seguro con integración Active Directory/SSO.
* Gestión de Roles y Permisos granulares (Administrador del Sistema, Jefe de Almacén, Operario de Muelle, Auditor).


* **Módulo de Gestión de Inventario:**
* Visualización en tiempo real del stock total, reservado y en tránsito.
* Creación, edición y eliminación (con registro de auditoría) de productos, categorías y proveedores.
* Sistema de alertas automatizadas de stock mínimo.


* **Módulo de Operaciones de Almacén (Inbound/Outbound):**
* Lectura masiva de códigos de barras (1D, 2D y códigos QR).
* Proceso guiado de *picking* (recogida) y *packing* (empaquetado).
* Gestión de devoluciones con categorización de estado (Dañado, Reacondicionable, Aprobado).


* **Módulo de Trazabilidad e Informes:**
* Generación de reportes dinámicos exportables a PDF y CSV.
* Trazabilidad completa (*Audit Trail*) de cada movimiento de un artículo: quién lo movió, cuándo, desde qué terminal y su destino.
* Panel de control (Dashboard) personalizable con KPIs de productividad.



### 5. Requisitos Técnicos y de Arquitectura

El proveedor tiene libertad para proponer el *stack* tecnológico que considere más adecuado (por ejemplo, Electron, Tauri, .NET MAUI o Qt), siempre y cuando cumpla con los siguientes requisitos:

* **Sistemas Operativos:** La aplicación compilada debe ejecutarse de forma nativa en **Windows 10/11** (90% de los terminales) y **macOS** (10% de los terminales de gerencia).
* **Arquitectura Local-First:** Es indispensable que la aplicación pueda funcionar sin conexión. Debe contar con una base de datos local (ej. SQLite, IndexedDB) que almacene los cambios y los sincronice bidireccionalmente con el servidor central mediante colas de mensajes cuando se recupere la conexión.
* **Integración de Hardware:** Reconocimiento y latencia cero con lectores de códigos de barras USB/Bluetooth de las marcas Zebra y Honeywell. Compatibilidad con impresoras térmicas de etiquetas vía red local y USB.
* **API / Backend:** La aplicación de escritorio debe consumir una API RESTful o GraphQL existente (actualmente en desarrollo interno) construida sobre PostgreSQL y Node.js.
* **Seguridad:** Encriptación AES-256 para cualquier dato sensible almacenado localmente. Las comunicaciones deben realizarse exclusivamente vía HTTPS/TLS 1.3.

### 6. Experiencia de Usuario y Diseño (UX/UI)

* **Diseño centrado en el operario:** La interfaz debe ser extremadamente limpia, con tipografías grandes y alto contraste, adaptada para monitores táctiles industriales y para personal que utiliza guantes de trabajo.
* El proveedor deberá incluir en su propuesta al menos dos rondas de *wireframes* y prototipos navegables en Figma (o similar) antes de comenzar la programación.

### 7. Entregables del Proyecto

El proveedor seleccionado deberá entregar:

1. Documentación técnica completa (Arquitectura, Esquemas de base de datos local, Diagramas de flujo).
2. Prototipos de diseño UI/UX aprobados.
3. Código fuente completo, comentado y transferido a los repositorios Git de NovaGestión (derechos de propiedad intelectual cedidos al 100%).
4. Archivos binarios/instaladores (.exe, .msi, .dmg) configurados para despliegue masivo (MDM).
5. Manual de usuario y guía de resolución de problemas (*Troubleshooting*).
6. Plan de pruebas y resultados de QA (Quality Assurance), incluyendo pruebas de carga y estrés.

### 8. Cronograma e Hitos Estimados

El proyecto está planeado para completarse en un máximo de **6 meses** tras la firma del contrato.

* **Mes 1:** Levantamiento de requisitos finales, diseño UX/UI y aprobación de arquitectura.
* **Mes 2-3:** Desarrollo del Módulo Core (Inventario y Base de Datos Local).
* **Mes 4:** Integración de periféricos, sistema de sincronización *offline* y Módulo de Informes.
* **Mes 5:** Fase de Pruebas (Alpha y Beta) en un entorno de almacén controlado (1 centro de distribución).
* **Mes 6:** Corrección de errores, despliegue global, formación a formadores y entrega final.

### 9. Presupuesto y Modelo de Precios

Las empresas postoras deberán presentar un presupuesto cerrado que detalle:

* Desglose de costes por fase (Análisis, Diseño, Desarrollo, Testing, Implementación).
* Tarifa por hora/día de los perfiles involucrados.
* Coste del soporte técnico y mantenimiento mensual post-lanzamiento (Acuerdo de Nivel de Servicio - SLA) para los primeros 12 meses.

### 10. Requisitos de la Propuesta

Las agencias interesadas deberán enviar un documento PDF (máximo 30 páginas) que incluya:

1. **Resumen Ejecutivo:** Comprensión de los objetivos y enfoque propuesto.
2. **Perfil de la Empresa:** Años en el mercado, tamaño del equipo y áreas de especialización.
3. **Casos de Éxito:** Mínimo de dos (2) proyectos similares de aplicaciones de escritorio o sistemas logísticos/industriales.
4. **Equipo de Proyecto:** CV resumido de los perfiles clave asignados al proyecto (Project Manager, Tech Lead, UI/UX Designer, Desarrolladores).
5. **Propuesta Técnica:** Enfoque arquitectónico, *stack* tecnológico recomendado y justificación del mismo.
6. **Cronograma y Presupuesto.**

### 11. Criterios de Evaluación

Las propuestas serán evaluadas por el Comité Técnico y de Compras bajo la siguiente ponderación:

* **35% - Solvencia Técnica y Arquitectura:** Calidad y viabilidad de la solución tecnológica propuesta, especialmente el enfoque *offline-first*.
* **25% - Experiencia del Proveedor:** Casos de éxito relevantes en el sector logístico o aplicaciones de escritorio empresariales.
* **20% - Propuesta Económica:** Relación coste-beneficio y transparencia en el desglose.
* **10% - Enfoque UI/UX:** Metodología de diseño centrada en el operario.
* **10% - Plazos de entrega:** Capacidad para cumplir o mejorar el cronograma propuesto de 6 meses.

### 12. Proceso de Envío e Instrucciones

* **Periodo de Preguntas:** Las dudas sobre este RFP deben enviarse a `it-purchasing@novagestion.test` antes del 25 de Septiembre de 2026. Todas las respuestas se publicarán en un documento compartido con todos los licitadores.
* **Envío de Propuestas:** Deben enviarse electrónicamente al mismo correo electrónico indicando en el asunto "Propuesta RFP-2026-045 - [Nombre del Proveedor]".
* **Fecha Límite:** No se aceptarán propuestas recibidas después de las 23:59 (Hora CET) del 15 de Octubre de 2026.