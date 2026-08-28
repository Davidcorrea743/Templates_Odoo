/* ---------------------------------------------------------------------
 * DIMSOP - BOTÓN FLOTANTE DE WHATSAPP (Sección 14)
 * Ubicado fijamente en la esquina inferior derecha, redirige al chat de
 * atención al cliente de Dimsop mediante https://wa.me/NÚMERO
 *
 * El número se configura en data/website_data.xml (dimsop.whatsapp_number).
 * --------------------------------------------------------------------- */
odoo.define('dimsop_website.whatsapp', function (require) {
    'use strict';

    function buildFloat() {
        const el = document.createElement('a');
        el.id = 'dimsop-whatsapp-float';
        el.href = 'https://wa.me/580000000000'; // TODO: leer dimsop.whatsapp_number
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
        el.title = 'Atención al cliente por WhatsApp';
        el.setAttribute('aria-label', 'WhatsApp');
        el.innerHTML = '<i class="fa fa-whatsapp" aria-hidden="true"></i>';
        document.body.appendChild(el);
    }

    document.addEventListener('DOMContentLoaded', buildFloat);
});
