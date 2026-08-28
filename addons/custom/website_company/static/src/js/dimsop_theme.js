/* ---------------------------------------------------------------------
 * DIMSOP - COMPONENTES DEL SITIO
 * - Contadores de impacto animados al hacer scroll (Sección 9)
 * --------------------------------------------------------------------- */
odoo.define('dimsop_website.counters', function (require) {
    'use strict';

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const duration = 1800;
        const start = performance.now();

        function frame(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = '+' + Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                el.textContent = '+' + target;
            }
        }
        requestAnimationFrame(frame);
    }

    function onScroll() {
        const counters = document.querySelectorAll('.dimsop-counter-num:not([data-animated])');
        counters.forEach(function (counter) {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                counter.setAttribute('data-animated', 'true');
                animateCounter(counter);
            }
        });
    }

    function init() {
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    document.addEventListener('DOMContentLoaded', init);
});
