/* ---------------------------------------------------------------------
 * DIMSOP - BOTÓN FLOTANTE DE WHATSAPP
 * Se crea dinámicamente y se posiciona fixed en la esquina inferior
 * derecha. El número se lee de #dimsop-config[data-whatsapp] (layout.xml)
 * con fallback a 123456789 (dimsop.whatsapp_number en ir.config_parameter).
 * --------------------------------------------------------------------- */
(function () {
    'use strict';

    function buildFloat() {
        if (document.getElementById('dimsop-whatsapp-float')) {
            return;
        }
        var config = document.getElementById('dimsop-config');
        var number = (config && config.dataset.whatsapp) || '123456789';
        number = String(number).replace(/[^0-9]/g, '');
        if (!number) {
            return;
        }

        var el = document.createElement('a');
        el.id = 'dimsop-whatsapp-float';
        el.href = 'https://wa.me/' + number;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
        el.title = 'Atención al cliente por WhatsApp';
        el.setAttribute('aria-label', 'Chatear con Dimsop por WhatsApp');
        el.innerHTML = '<i class="fa fa-whatsapp" aria-hidden="true"></i>';
        document.body.appendChild(el);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildFloat);
    } else {
        buildFloat();
    }
})();
