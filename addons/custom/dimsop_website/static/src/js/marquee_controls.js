/* ---------------------------------------------------------------------
 * DIMSOP - CONTROLES MANUALES DEL MARQUEE (Aliados Tecnológicos)
 *
 * Toma el control de .dimsop-marquee que contenga botones
 * (.dimsop-marquee-btn): deshabilita la animación CSS del track y lo
 * mueve con transform vía requestAnimationFrame:
 *   - Auto-scroll infinito al ritmo original (45s por vuelta de 25 chips)
 *   - Botones <- / -> (tween easeOutCubic de 3 chips)
 *   - Arrastre con puntero (drag + inercia), cursor grab/grabbing
 *   - Rueda/trackpad horizontal (deltaX)
 *   - Pausa en hover/foco; el auto se reanuda 3s tras un uso manual
 *   - prefers-reduced-motion: auto detenido, controles siguen activos
 *
 * Fallback: los demás marquees (Proyectos/Blog) y este mismo -si el JS
 * no llega a correr- conservan la animación CSS; los botones permanecen
 * ocultos (hidden) hasta el init.
 * --------------------------------------------------------------------- */
(function () {
    'use strict';

    var STEP_CHIPS = 3;          // chips que avanza/retrocede cada botón
    var TWEEN_MS = 350;          // duración del tween de botones
    var RESUME_MS = 3000;        // reanudación del auto tras uso manual
    var AUTO_LOOP_S = 45;        // segundos por vuelta (igual que el CSS)

    var reducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function initMarquee(root) {
        var track = root.querySelector('.dimsop-marquee-track');
        var btnPrev = root.querySelector('.dimsop-marquee-btn--prev');
        var btnNext = root.querySelector('.dimsop-marquee-btn--next');
        if (!track || !btnPrev || !btnNext) return;

        var half = 0;        // ancho de un conjunto (25 chips); el track los duplica
        var step = 0;        // ancho de STEP_CHIPS chips + gaps
        var x = 0;           // offset actual, normalizado a (-half, 0]
        var speed = 0;       // px/s del auto (0 con reduced-motion)
        var hovering = false;
        var focusIn = false;
        var dragging = false;
        var tween = null;    // {from, to, start}
        var vel = 0;         // px/s: inercia de arrastre
        var manualUntil = 0; // instante (ms) hasta el que el auto espera
        var lastT = 0;
        var startX = 0;
        var dragFrom = 0;
        var lastMoveT = 0;
        var lastMoveX = 0;

        function measure() {
            half = track.scrollWidth / 2;
            if (!half) return;
            var item = track.querySelector('.dimsop-logo-item');
            var cs = getComputedStyle(track);
            var gap = parseFloat(cs.columnGap || cs.gap) || 0;
            var w = item ? item.getBoundingClientRect().width : 0;
            step = Math.round((w + gap) * STEP_CHIPS);
            speed = reducedMotion ? 0 : half / AUTO_LOOP_S;
        }

        function normalize() {
            if (!half) return;
            x = x % half;
            if (x > 0) x -= half;
        }

        function apply() {
            track.style.transform = 'translate3d(' + x + 'px,0,0)';
        }

        function markManual() {
            manualUntil = performance.now() + RESUME_MS;
        }

        function autoActive() {
            return speed > 0 && !hovering && !focusIn && !dragging &&
                !tween && performance.now() >= manualUntil;
        }

        function frame(now) {
            requestAnimationFrame(frame);
            // Sin clamp de dt: el wrap módulo 'half' hace seguro cualquier
            // salto (pestaña suspendida, rAF lento) y mantiene el ritmo de
            // pared (wall clock) igual que la animación CSS original.
            var dt = Math.max(0, (now - (lastT || now)) / 1000);
            lastT = now;

            if (dragging) {
                /* el transform lo aplican los pointermove */
            } else if (tween) {
                var t = Math.min((now - tween.start) / TWEEN_MS, 1);
                x = tween.from + (tween.to - tween.from) * easeOutCubic(t);
                if (t >= 1) {
                    tween = null;
                    markManual();
                }
            } else if (vel !== 0) {
                x += vel * dt;
                vel *= Math.exp(-3 * dt);
                if (Math.abs(vel) < 40) {
                    vel = 0;
                    markManual();
                }
            } else if (autoActive()) {
                x -= speed * dt;
            }

            normalize();
            apply();
        }

        /* ---------- Botones ---------- */
        btnNext.addEventListener('click', function () {
            if (!half || dragging) return;
            normalize();
            tween = { from: x, to: x - step, start: performance.now() };
        });
        btnPrev.addEventListener('click', function () {
            if (!half || dragging) return;
            normalize();
            tween = { from: x, to: x + step, start: performance.now() };
        });

        /* ---------- Arrastre ---------- */
        root.addEventListener('dragstart', function (e) {
            e.preventDefault(); // sin fantasma nativo de imágenes
        });
        root.addEventListener('pointerdown', function (e) {
            if (e.button !== 0) return;
            if (e.target.closest && e.target.closest('.dimsop-marquee-btn')) return;
            if (!half) return;
            dragging = true;
            tween = null;
            vel = 0;
            normalize();
            startX = e.clientX;
            dragFrom = x;
            lastMoveT = performance.now();
            lastMoveX = e.clientX;
            root.classList.add('is-dragging');
            try { root.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
        });

        root.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var now = performance.now();
            var dMs = now - lastMoveT;
            if (dMs >= 8) {
                vel = ((e.clientX - lastMoveX) / dMs) * 1000;
                vel = Math.max(-3000, Math.min(3000, vel));
                lastMoveT = now;
                lastMoveX = e.clientX;
            }
            x = dragFrom + (e.clientX - startX);
            normalize();
            apply();
        });

        function endDrag(e) {
            if (!dragging) return;
            dragging = false;
            root.classList.remove('is-dragging');
            try { root.releasePointerCapture(e.pointerId); } catch (err) { /* ok */ }
            if (Math.abs(vel) < 60) vel = 0;
            markManual();
        }
        root.addEventListener('pointerup', endDrag);
        root.addEventListener('pointercancel', endDrag);

        /* ---------- Rueda horizontal ---------- */
        root.addEventListener('wheel', function (e) {
            if (!half) return;
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // scroll vertical intacto
            e.preventDefault();
            tween = null;
            x -= e.deltaX;
            normalize();
            apply();
            markManual();
        }, { passive: false });

        /* ---------- Pausa en hover / foco ---------- */
        root.addEventListener('mouseenter', function () { hovering = true; });
        root.addEventListener('mouseleave', function () { hovering = false; });
        // Foco solo dentro del track (como el :focus-within original del
        // CSS); enfocar un botón NO detiene el auto de forma permanente.
        track.addEventListener('focusin', function () { focusIn = true; });
        track.addEventListener('focusout', function () {
            focusIn = false;
            markManual();
        });

        /* ---------- Init (toma de control) ---------- */
        measure();
        if (!half) return; // sin medida fiable: se queda en fallback CSS
        track.style.animation = 'none';
        root.classList.add('dimsop-marquee--ready');
        btnPrev.hidden = false;
        btnNext.hidden = false;
        apply();
        requestAnimationFrame(frame);

        window.addEventListener('resize', function () {
            measure();
            normalize();
            apply();
        });
        window.addEventListener('load', function () {
            measure();
            normalize();
            apply();
        });
    }

    function boot() {
        var marquees = document.querySelectorAll('.dimsop-marquee');
        for (var i = 0; i < marquees.length; i++) {
            // Solo los que tengan controles (Aliados); Proyectos/Blog quedan en CSS
            if (marquees[i].querySelector('.dimsop-marquee-btn')) {
                initMarquee(marquees[i]);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
