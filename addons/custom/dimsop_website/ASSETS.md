# ASSETS / RECURSOS MULTIMEDIA - DIMSOP WEBSITE

Aquí se colocan todos los archivos multimedia del sitio.
Los nombres y rutas en los templates ya están referenciados; solo reemplaza
los archivos con los reales de Dimsop.

## 1. VIDEO (Sección 2 - Banner principal)
Carpeta: `dimsop_website/static/src/video/`

| Archivo                        | Uso                            |
|--------------------------------|--------------------------------|
| `banner_principal.mp4`         | Video de fondo del banner H1   |

También se puede usar `banner-poster.jpg` (imagen de carga previa del video)
en: `dimsop_website/static/src/img/banners/`.

## 2. IMÁGENES (Secciones 4, 5, 7, 8, 10)
Carpetas dentro de `dimsop_website/static/src/img/`:

| Carpeta        | Uso                                                        |
|----------------|------------------------------------------------------------|
| `banners/`     | Poster del video, mapa de cobertura, imagen destacada blog |
| `logos/`       | Logo principal Dimsop (claro + blanco para footer)         |
| `logos/aliados/` | Logos de aliados: `aliado-1.png` ... `aliado-6.png`      |
| `methodology/` | Infografía: `metodologia.png` (5 pasos)                    |
| `projects/`    | Imágenes de los 8 proyectos referenciales                  |
| `social/`      | Iconos de redes sociales (opcional)                        |

### Imágenes de proyectos esperadas (Sección 10)
`ucm-chile.jpg`, `policlinica-metropolitana.jpg`, `oleoducto-colombia.jpg`,
`its-infocom.jpg`, `avianca.jpg`, `mi-tickera.jpg`, `todo1.jpg`, `uniseguros.jpg`

### Logos
- `dimsop_website/static/src/img/logos/dimsop-logo.png`          -> header
- `dimsop_website/static/src/img/logos/dimsop-logo-white.png`    -> footer

## 3. FUENTES (Sección 0.2 - Tipografía)
Actualmente se cargan desde Google Fonts (Bebas Neue / Anton + Arimo) vía SCSS.
Si se desea auto-hospedado, colocar los `.woff2` en:
`dimsop_website/static/src/fonts/` y ajustar `static/src/scss/primary_variables.scss`.

## 4. DATOS QUE DEBEN CONFIGURARSE
- Número WhatsApp (Sección 14): `data/website_data.xml` -> `dimsop.whatsapp_number` y en `static/src/js/whatsapp_float.js`
- Dirección, teléfono, email (Sección 13): `data/website_data.xml` -> `partner_dimsop`
- URLs LinkedIn / Instagram (Sección 13): `data/website_data.xml` -> `dimsop.linkedin_url`, `dimsop.instagram_url`
- Valores de contadores (Sección 9): en `views/home.xml` -> atributos `data-target`
