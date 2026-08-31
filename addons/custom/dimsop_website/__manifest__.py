{
    'name': 'Dimsop Website Theme',
    'version': '18.0.1.0.0',
    'category': 'Website/Website',
    'summary': 'Sitio web corporativo de Dimsop: Soluciones TIC',
    'description': """
Sitio web corporativo de Dimsop (Soluciones TIC de Vanguardia).
Incluye: banner con video, cintillo ISO 9001, misión/visión/valores,
metodología de trabajo, unidades de negocio, mapa de cobertura, aliados,
contadores de impacto, proyectos referenciales, blog, formulario de
contacto conectado al CRM, footer y botón flotante de WhatsApp.

Características técnicas:
- Selector de idioma ES/EN (i18n nativo de Odoo).
- Dark mode con toggle manual persistente (localStorage).
- Assets SCSS + JS bajo web.assets_frontend.
    """,
    'author': 'Dimsop',
    'website': 'https://www.dimsop.com',
    'license': 'LGPL-3',
    'depends': [
        'website',
        'web',
        'website_crm',
    ],
    'data': [
        'views/layout.xml',
        'views/header.xml',
        'views/footer.xml',
        'views/home.xml',
        'views/privacy.xml',
        'data/website_data.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'dimsop_website/static/src/scss/primary_variables.scss',
            'dimsop_website/static/src/scss/dark_mode.scss',
            'dimsop_website/static/src/scss/styles.scss',
            'dimsop_website/static/src/js/darkmode.js',
            'dimsop_website/static/src/js/dimsop_theme.js',
            'dimsop_website/static/src/js/whatsapp_float.js',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
