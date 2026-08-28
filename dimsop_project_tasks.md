# PROYECTO: Desarrollo Página Web Corporativa Dimsop

**Cliente:** Dimsop (Soluciones TIC de Vanguardia)
**Fecha de inicio:** 1 septiembre 2026
**Fecha de fin:** 28 septiembre 2026 (20 días hábiles)
**Herramienta de gestión:** MS Project
**Equipo:** Desarrollador + Comunicaciones + Gerencia

---

## FASE 0: DESARROLLO FRONTEND (COMPLETADO - Retrospectivo)

| # | Tarea | Subtareas | Duración | Inicio | Fin | Área |
|---|-------|-----------|----------|--------|-----|------|
| 0.1 | Configuración del entorno de desarrollo | Instalar Docker (Odoo 18 + PostgreSQL), configurar docker-compose, crear base de datos, instalar módulo dimsop_website | 1 día | 18 ago | 18 ago | Desarrollo |
| 0.2 | Creación del módulo Odoo | Estructura de archivos (__manifest__.py, controllers/, models/, views/, static/), dependencias (website, website_crm), configuración de assets SCSS/JS | 1 día | 19 ago | 19 ago | Desarrollo |
| 0.3 | Desarrollo de las 14 secciones del homepage | Banner con video, cintillo ISO, Quiénes Somos (misión/visión/valores), Metodología de Trabajo, Unidades de Negocio (7), Mapa de Cobertura, Aliados Tecnológicos (27 logos en marquee), Contadores de Impacto, Proyectos Referenciales (8), Blog (placeholder), Formulario de Contacto → CRM, Footer, Botón flotante WhatsApp | 4 días | 19 ago | 22 ago | Desarrollo |
| 0.4 | Implementación de Dark Mode | Variables CSS (light/dark), toggle button, localStorage, script inline en head (FOUC), estilos para cards/form/marquee | 1 día | 22 ago | 22 ago | Desarrollo |
| 0.5 | Diseño responsive | Media queries (991px, 767px, 1400px), touch targets ≥44px, burger menu, búsqueda moderna con lupa | 1 día | 25 ago | 25 ago | Desarrollo |
| 0.6 | Integración del formulario de contacto | Controller Python (POST /dimsop/contacto), validación server-side, CSRF, creación de crm.lead, redirect con feedback (éxito/error) | 1 día | 25 ago | 25 ago | Desarrollo |
| 0.7 | Carga de assets y normalización de archivos | 27 logos de aliados (slugs normalizados), 8 imágenes de proyectos (.png), video banner (97MB), imagen metodología, logos header/footer | 1 día | 21 ago | 21 ago | Desarrollo |
| 0.8 | Corrección de bugs y iteración | Fix header sticky, nav items (6 enlaces), toggle dark mode visible, WhatsApp IIFE, hero tagline blanco, H2 secciones oscuras, proyectos dark mode (background transparent), contraste footer icons | 2 días | 25 ago | 26 ago | Desarrollo |
| 0.9 | Página de Políticas de Privacidad | Template QWeb con contenido genérico, SEO meta, website.page record | 0.5 días | 21 ago | 21 ago | Desarrollo |

**Subtotal Fase 0:** ~11.5 días (completado, retrospectivo)

---

## FASE 1: MIGRACIÓN E INTEGRACIÓN (1-10 septiembre)

| # | Tarea | Subtareas | Duración | Inicio | Fin | Área |
|---|-------|-----------|----------|--------|-----|------|
| 1.1 | Preparación del servidor de producción | Configurar servidor (Ubuntu/Debian), instalar Docker, PostgreSQL, Odoo 18, crear base de datos de producción, configurar permisos y backups | 2 días | 1 sep | 2 sep | Desarrollo |
| 1.2 | Migración del módulo al servidor | Copiar módulo dimsop_website al servidor, verificar estructura de archivos, ajustar permisos de archivos (evitar bug de root-owned files), instalar dependencias (website_crm) | 1 día | 3 sep | 3 sep | Desarrollo |
| 1.3 | Configuración de IP pública y dominio | Configurar DNS del dominio, apuntar registro A a la IP del servidor, verificar resolución de dominio, configurar firewall (puertos 80/443) | 1 día | 3 sep | 3 sep | Desarrollo |
| 1.4 | Instalación y configuración de SSL | Instalar Certbot/Let's Encrypt, generar certificado SSL, configurar redirect HTTP→HTTPS, verificar HTTPS funciona | 0.5 días | 4 sep | 4 sep | Desarrollo |
| 1.5 | Configuración de Nginx/Proxy | Configurar Nginx como reverse proxy hacia Odoo (puerto 8069), configurar headers de seguridad, compresión GZIP, cache de assets estáticos | 1 día | 4 sep | 5 sep | Desarrollo |
| 1.6 | Configuración de Odoo en producción | Ajustar odoo.conf (db_user, db_password, server_wide_modules, proxy_mode=True), configurar workers y limit_memory, desactivar debug mode | 0.5 días | 5 sep | 5 sep | Desarrollo |
| 1.7 | Pruebas de integración en producción | Verificar que todas las secciones cargan correctamente, assets CSS/JS funcionan, formulario CRM crea leads, WhatsApp funciona, dark mode persiste, búsqueda funciona | 1 día | 5 sep | 5 sep | Desarrollo |

**Subtotal Fase 1:** 7 días

---

## FASE 2: INTEGRACIÓN DE BLOG (8-15 septiembre)

| # | Tarea | Subtareas | Duración | Inicio | Fin | Área |
|---|-------|-----------|----------|--------|-----|------|
| 2.1 | Instalación del módulo website_blog | Instalar módulo website_blog de Odoo, verificar que la ruta /blog responde 200, configurar categorías de blog | 0.5 días | 8 sep | 8 sep | Desarrollo |
| 2.2 | Creación de plantilla de blog | Crear vista personalizada para el blog de Dimsop (estilo consistente con el theme), configurar layout de artículos, sidebar opcional | 1 día | 8 sep | 9 sep | Desarrollo |
| 2.3 | Creación de primer artículo de blog | Redactar artículo de prueba ("Bienvenidos a nuestro blog"), subir imagen destacada, configurar SEO meta, categorías y tags | 1 día | 9 sep | 9 sep | Comunicaciones |
| 2.4 | Integración del blog en homepage | Conectar la sección #blog del homepage con el último artículo publicado (dynamic), o mantener placeholder hasta tener contenido real | 0.5 días | 10 sep | 10 sep | Desarrollo |
| 2.5 | Configuración de RSS/feeds | Verificar que el feed RSS del blog funciona, configurar si se requiere suscripción por email | 0.5 días | 10 sep | 10 sep | Desarrollo |

**Subtotal Fase 2:** 3.5 días

---

## FASE 3: CONTENIDO Y COMUNICACIONES (8-18 septiembre)

| # | Tarea | Subtareas | Duración | Inicio | Fin | Área |
|---|-------|-----------|----------|--------|-----|------|
| 3.1 | Revisión de contenido por Gerencia | Presentar la página web a gerencia, recopilar feedback, documentar cambios solicitados | 1 día | 8 sep | 8 sep | Gerencia |
| 3.2 | Ajustes de contenido según feedback | Aplicar cambios de texto, imágenes, colores, orden de secciones según lo solicitado por gerencia | 2 días | 9 sep | 10 sep | Desarrollo + Comunicaciones |
| 3.3 | Sustitución de datos placeholder | Reemplazar: número de WhatsApp real, dirección física, teléfono, correo, URLs de redes sociales, datos de empresa en footer | 0.5 días | 10 sep | 10 sep | Comunicaciones |
| 3.4 | Compresión y optimización del video banner | Comprimir video de 97MB a <15MB (H.264, 720p/1080p), verificar calidad, actualizar ruta en módulo | 0.5 días | 11 sep | 11 sep | Comunicaciones |
| 3.5 | Creación de imagen para blog destacado | Diseñar/obtener imagen para el artículo destacado del blog (reemplazar gradiente CSS actual) | 0.5 días | 11 sep | 11 sep | Comunicaciones |
| 3.6 | Revisión de textos y SEO | Revisar todos los textos del sitio (títulos, descripciones, meta tags), verificar que el SEO on-page esté correcto (meta title, description, keywords) | 1 día | 12 sep | 12 sep | Comunicaciones |
| 3.7 | Configuración de Google Analytics | Crear cuenta de GA4, integrar código de seguimiento en el sitio, verificar que las páginas principales se registran | 0.5 días | 15 sep | 15 sep | Comunicaciones |

**Subtotal Fase 3:** 6 días

---

## FASE 4: PRUEBAS Y OPTIMIZACIÓN (15-22 septiembre)

| # | Tarea | Subtareas | Duración | Inicio | Fin | Área |
|---|-------|-----------|----------|--------|-----|------|
| 4.1 | Pruebas cross-browser | Verificar en Chrome, Firefox, Safari, Edge. Verificar en dispositivos móviles (iOS, Android). Verificar responsive en diferentes resoluciones | 1 día | 15 sep | 15 sep | Desarrollo |
| 4.2 | Pruebas de accesibilidad | Verificar contraste de colores (WCAG 2.1 AA), navegación por teclado, labels ARIA, alt texts, reduced motion | 0.5 días | 16 sep | 16 sep | Desarrollo |
| 4.3 | Pruebas de rendimiento | Ejecutar Lighthouse, verificar Core Web Vitals (LCP, FID, CLS), optimizar imágenes si es necesario, verificar carga del video | 0.5 días | 16 sep | 16 sep | Desarrollo |
| 4.4 | Pruebas del formulario CRM | Enviar formularios de prueba, verificar que los leads se crean correctamente en Odoo, verificar emails de notificación, probar validación de errores | 0.5 días | 17 sep | 17 sep | Desarrollo |
| 4.5 | Pruebas de dark mode | Verificar todas las secciones en light y dark, verificar toggle, verificar persistencia en localStorage, verificar transiciones | 0.5 días | 17 sep | 17 sep | Desarrollo |
| 4.6 | Optimización de assets | Verificar tamaño de bundles CSS/JS, optimizar imágenes PNG si es necesario, configurar cache headers en Nginx | 0.5 días | 18 sep | 18 sep | Desarrollo |
| 4.7 | Corrección de bugs finales | Atender todos los issues encontrados en pruebas, iterar hasta tener versión estable | 1 día | 18 sep | 19 sep | Desarrollo |

**Subtotal Fase 4:** 4.5 días

---

## FASE 5: DOCUMENTACIÓN Y ENTREGA (22-25 septiembre)

| # | Tarea | Subtareas | Duración | Inicio | Fin | Área |
|---|-------|-----------|----------|--------|-----|------|
| 5.1 | Documentación técnica | Documentar: estructura del módulo, variables de configuración, proceso de instalación, dependencias, backups | 1 día | 22 sep | 22 sep | Desarrollo |
| 5.2 | Manual de usuario para blog | Crear guía paso a paso para crear/editar artículos de blog en Odoo (con capturas de pantalla) | 0.5 días | 23 sep | 23 sep | Comunicaciones |
| 5.3 | Manual de configuración general | Documentar: cómo cambiar el número de WhatsApp, cómo actualizar logos, cómo cambiar textos, cómo administrar redes sociales | 0.5 días | 23 sep | 23 sep | Comunicaciones |
| 5.4 | Capacitación al equipo de comunicaciones | Sesión de capacitación (1-2h) sobre cómo usar el backend de Odoo para gestionar el blog, actualizar contenido, revisar leads del CRM | 0.5 días | 24 sep | 24 sep | Comunicaciones |
| 5.5 | Entrega formal y acta de aceptación | Presentar sitio final a gerencia, firmar acta de aceptación, entregar credenciales y documentación | 0.5 días | 25 sep | 25 sep | Gerencia |

**Subtotal Fase 5:** 3 días

---

## RESUMEN GENERAL

| Fase | Descripción | Duración | Fechas | Área Principal |
|------|-------------|----------|--------|----------------|
| 0 | Desarrollo Frontend (completado) | 11.5 días | 18-26 ago | Desarrollo |
| 1 | Migración e Integración | 7 días | 1-5 sep | Desarrollo |
| 2 | Integración de Blog | 3.5 días | 8-10 sep | Desarrollo |
| 3 | Contenido y Comunicaciones | 6 días | 8-15 sep | Comunicaciones |
| 4 | Pruebas y Optimización | 4.5 días | 15-19 sep | Desarrollo |
| 5 | Documentación y Entrega | 3 días | 22-25 sep | Comunicaciones + Gerencia |
| **TOTAL** | | **35.5 días** | **18 ago - 25 sep** | |

**Nota:** Las fases 1-5 se comprimen en 20 días hábiles (1-28 sep) porque hay tareas paralelas entre áreas. Las tareas de Desarrollo y Comunicaciones pueden ejecutarse simultáneamente.

---

## DEPENDENCIAS ENTRE TAREAS

| Tarea | Depende de |
|-------|------------|
| 1.2 Migración del módulo | 1.1 Preparación del servidor |
| 1.4 SSL | 1.3 IP pública y dominio |
| 1.5 Nginx/Proxy | 1.4 SSL |
| 1.6 Odoo en producción | 1.5 Nginx/Proxy |
| 1.7 Pruebas integración | 1.6 Odoo en producción |
| 2.2 Plantilla blog | 2.1 Instalación website_blog |
| 2.4 Blog en homepage | 2.2 Plantilla blog |
| 3.2 Ajustes contenido | 3.1 Revisión gerencia |
| 4.1 Pruebas cross-browser | 1.7 Pruebas integración |
| 4.7 Bugs finales | 4.1-4.6 Todas las pruebas |
| 5.1 Documentación técnica | 4.7 Bugs finales |
| 5.4 Capacitación | 5.2-5.3 Manuales |
| 5.5 Entrega formal | 5.1-5.4 Toda la documentación |

---

## ENTREGABLES

1. **Página web corporativa** funcionando en HTTPS con las 14 secciones
2. **Módulo Odoo** dimsop_website instalado y configurado en producción
3. **Blog integrado** con al menos 1 artículo de prueba
4. **Formulario de contacto** conectado al CRM de Odoo
5. **Documentación técnica** (instalación, configuración, mantenimiento)
6. **Manual de usuario** para blog y contenido
7. **Acta de aceptación** firmada por gerencia
