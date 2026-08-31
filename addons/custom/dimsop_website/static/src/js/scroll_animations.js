/* ---------------------------------------------------------------------
 * DIMSOP - ANIMACIONES DE SCROLL (GSAP ScrollTrigger)
 * - Parallax en hero banner (20% intensity)
 * - Timeline escalonada para #nosotros (Misión/Visión/Valores)
 * - Animaciones de entrada para cada sección al hacer scroll
 * - Carga GSAP + ScrollTrigger desde CDN (GSAP 3.13+ es 100% gratuito)
 * - Respeta prefers-reduced-motion
 * --------------------------------------------------------------------- */
(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- CDN loader ---- */
    function loadGSAP(callback) {
        if (window.gsap && window.ScrollTrigger) { callback(); return; }
        var gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
        gsapScript.onload = function () {
            var stScript = document.createElement('script');
            stScript.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
            stScript.onload = function () {
                gsap.registerPlugin(ScrollTrigger);
                callback();
            };
            document.head.appendChild(stScript);
        };
        document.head.appendChild(gsapScript);
    }

    function initAnimations() {
        if (prefersReducedMotion) {
            document.querySelectorAll('[data-gsap-animate]').forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        gsap.config({ nullTargetWarn: false });

        /* ================================================================
         * 1. HERO PARALLAX (#banner) — 20% intensity
         * ================================================================ */

        // Entrada inicial del texto (una vez al cargar)
        gsap.from('#banner h1', {
            y: 40, opacity: 0, duration: 1, delay: 0.3,
            ease: 'power3.out'
        });
        gsap.from('#banner .dimsop-lead', {
            y: 30, opacity: 0, duration: 1, delay: 0.5,
            ease: 'power3.out'
        });

        // Parallax: video se mueve lento (20% de la velocidad del scroll)
        gsap.to('#banner .dimsop-banner-video', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '#banner',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5
            }
        });

        // Parallax: overlay se oscurece ligeramente al salir
        gsap.to('#banner .dimsop-banner-overlay', {
            opacity: 0.88,
            ease: 'none',
            scrollTrigger: {
                trigger: '#banner',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5
            }
        });

        // Parallax: texto se desplaza un poco más rápido (diferencial)
        gsap.to('#banner .container', {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
                trigger: '#banner',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5
            }
        });

        /* ================================================================
         * 2. ¿QUIÉNES SOMOS? (#nosotros) — Timeline escalonada
         * ================================================================ */

        var nosotrosTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#nosotros',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });

        nosotrosTl
            // Título
            .from('#nosotros .dimsop-h2', {
                y: 40, opacity: 0, duration: 0.8,
                ease: 'power3.out'
            })
            // Subtítulo
            .from('#nosotros .dimsop-lead', {
                y: 25, opacity: 0, duration: 0.7,
                ease: 'power3.out'
            }, '-=0.5')
            // Card Misión (desde la izquierda)
            .from('#nosotros .col-lg-6:first-child .dimsop-card', {
                x: -40, opacity: 0, duration: 0.7,
                ease: 'power3.out'
            }, '-=0.3')
            // Card Visión (desde la derecha)
            .from('#nosotros .col-lg-6:last-child .dimsop-card', {
                x: 40, opacity: 0, duration: 0.7,
                ease: 'power3.out'
            }, '-=0.6')
            // Título "Nuestros Valores"
            .from('#nosotros .dimsop-h3', {
                y: 30, opacity: 0, duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            // Subtítulo "Los principios..."
            .from('#nosotros .text-center.mb-4', {
                y: 20, opacity: 0, duration: 0.5,
                ease: 'power3.out'
            }, '-=0.4')
            // Value cards — scale + fade con stagger
            .from('#nosotros .dimsop-value', {
                scale: 0.85, opacity: 0, duration: 0.5,
                stagger: 0.08,
                ease: 'back.out(1.4)'
            }, '-=0.3');

        /* ================================================================
         * 3. CINTILLO ISO (#iso)
         * ================================================================ */
        gsap.from('#iso', {
            x: -60, opacity: 0, duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#iso',
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 4. METODOLOGÍA (#metodologia)
         * ================================================================ */
        gsap.from('#metodologia .dimsop-h2', {
            y: 50, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#metodologia',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('#metodologia .dimsop-step', {
            y: 40, opacity: 0, duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#metodologia .row',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 5. UNIDADES DE NEGOCIO (#unidades)
         * ================================================================ */
        gsap.from('#unidades .dimsop-h2', {
            y: 50, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#unidades',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('#unidades .dimsop-card', {
            y: 40, opacity: 0, duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#unidades .row',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 6. MAPA DE COBERTURA (#cobertura)
         * ================================================================ */
        gsap.from('#cobertura .dimsop-h2', {
            y: 50, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#cobertura',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        // Mapa con efecto zoom-in sutil
        gsap.from('#cobertura .dimsop-map-container', {
            scale: 0.92, opacity: 0, duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#cobertura .dimsop-map-container',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 7. ALIADOS (#aliados)
         * ================================================================ */
        gsap.from('#aliados .dimsop-h2', {
            y: 50, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#aliados',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 8. CONTADORES (#contadores)
         * ================================================================ */
        gsap.from('#contadores .dimsop-h2', {
            y: 50, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#contadores',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 9. PROYECTOS (#proyectos)
         * ================================================================ */
        gsap.from('#proyectos .dimsop-h2', {
            y: 50, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#proyectos',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('#proyectos .dimsop-project', {
            y: 40, opacity: 0, duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#proyectos .row',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 10. BLOG (#blog)
         * ================================================================ */
        gsap.from('#blog .dimsop-h2', {
            y: 50, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#blog',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('#blog .dimsop-blog-card', {
            y: 30, opacity: 0, duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#blog .row',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 11. FORMULARIO CONTACTO (#contacto)
         * ================================================================ */
        gsap.from('#contacto .dimsop-h2', {
            y: 50, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#contacto',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('#contacto .dimsop-form', {
            y: 30, opacity: 0, duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#contacto .dimsop-form',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        /* ================================================================
         * 12. FOOTER (#dimsop_footer)
         * ================================================================ */
        gsap.from('#dimsop_footer .col-lg-4', {
            y: 30, opacity: 0, duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#dimsop_footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    }

    loadGSAP(initAnimations);

    // Fallback: si GSAP no carga en 5 segundos, mostrar todo el contenido
    setTimeout(function () {
        if (!window.gsap) {
            document.querySelectorAll('[data-gsap-animate]').forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }, 5000);
})();
