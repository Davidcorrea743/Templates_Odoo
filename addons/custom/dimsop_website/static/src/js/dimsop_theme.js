/* ---------------------------------------------------------------------
 * DIMSOP - COMPONENTES DEL SITIO
 * - Contadores de impacto: se animan CADA VEZ que la sección entra en
 *   viewport (y se reinician al salir) (Sección 9)
 * - Video del banner: se pausa cuando sale de pantalla
 *
 * NOTA: Este archivo NO usa odoo.define() porque nadie lo require.
 * Se ejecuta como IIFE para garantizar que corre al cargarse.
 * --------------------------------------------------------------------- */
(function () {
    'use strict';

    var reducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        if (reducedMotion) {
            el.textContent = '+' + target;
            return;
        }
        if (el._dimsopRaf) {
            cancelAnimationFrame(el._dimsopRaf);
        }
        var duration = 1800;
        var start = performance.now();

        function frame(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = '+' + Math.floor(eased * target);
            if (progress < 1) {
                el._dimsopRaf = requestAnimationFrame(frame);
            } else {
                el.textContent = '+' + target;
                el._dimsopRaf = null;
            }
        }
        el._dimsopRaf = requestAnimationFrame(frame);
    }

    function resetCounter(el) {
        if (el._dimsopRaf) {
            cancelAnimationFrame(el._dimsopRaf);
            el._dimsopRaf = null;
        }
        el.textContent = '+0';
    }

    /* Contadores: IntersectionObserver re-anima en cada entrada.
     * Fallback a scroll listener si no existe IntersectionObserver. */
    function initCounters() {
        var counters = document.querySelectorAll('.dimsop-counter-num');
        if (!counters.length) {
            return;
        }
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                    } else {
                        resetCounter(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            counters.forEach(function (c) { observer.observe(c); });
        } else {
            var ticking = false;
            window.addEventListener('scroll', function () {
                if (ticking) { return; }
                ticking = true;
                requestAnimationFrame(function () {
                    counters.forEach(function (counter) {
                        var rect = counter.getBoundingClientRect();
                        var visible = rect.top < window.innerHeight && rect.bottom > 0;
                        if (visible && counter.textContent === '+0') {
                            animateCounter(counter);
                        } else if (!visible) {
                            resetCounter(counter);
                        }
                    });
                    ticking = false;
                });
            }, { passive: true });
        }
    }

    /* Banner video: pausa cuando no está visible (ahorra datos/CPU). */
    function initBannerVideo() {
        var video = document.querySelector('.dimsop-banner-video');
        if (!video || !('IntersectionObserver' in window)) {
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    if (!reducedMotion) {
                        video.play().catch(function () {});
                    } else {
                        video.pause();
                    }
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.15 });
        observer.observe(video);
        if (reducedMotion) {
            video.pause();
            video.removeAttribute('autoplay');
        }
    }

    function init() {
        initCounters();
        initBannerVideo();
    }

    // Ejecutar inmediatamente si el DOM ya está listo, o esperar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
