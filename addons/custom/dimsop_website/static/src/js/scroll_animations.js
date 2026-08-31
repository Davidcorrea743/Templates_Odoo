/* ---------------------------------------------------------------------
 * DIMSOP - ANIMACIONES DE SCROLL (GSAP ScrollTrigger)
 * Animaciones de entrada para cada sección al hacer scroll.
 * Se carga GSAP + ScrollTrigger desde CDN (GSAP 3.13+ es 100% gratuito).
 * Respeta prefers-reduced-motion.
 * --------------------------------------------------------------------- */
(function () {
    'use strict';

    // Verificar prefers-reduced-motion
    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cargar GSAP + ScrollTrigger desde CDN
    function loadGSAP(callback) {
        if (window.gsap && window.ScrollTrigger) {
            callback();
            return;
        }

        var gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js';
        gsapScript.onload = function () {
            var stScript = document.createElement('script');
            stScript.src = 'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js';
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
            // En reduced motion, mostrar todo inmediatamente sin animación
            document.querySelectorAll('[data-gsap-animate]').forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        // Configuración global de ScrollTrigger
        gsap.config({ nullTargetWarn: false });

        // ============================================================
        // 1. QUIÉNES SOMOS (#nosotros)
        // ============================================================
        gsap.from('#nosotros .dimsop-h2', {
            scrollTrigger: {
                trigger: '#nosotros',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('#nosotros .dimsop-lead', {
            scrollTrigger: {
                trigger: '#nosotros',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });

        gsap.from('#nosotros .dimsop-card', {
            scrollTrigger: {
                trigger: '#nosotros .row',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Valores corporativos - stagger
        gsap.from('#nosotros .dimsop-value', {
            scrollTrigger: {
                trigger: '#nosotros .dimsop-value',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.5)'
        });

        // ============================================================
        // 2. METODOLOGÍA DE TRABAJO (#metodologia)
        // ============================================================
        gsap.from('#metodologia .dimsop-h2', {
            scrollTrigger: {
                trigger: '#metodologia',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animación de texto "reveal" para el título
        var metodologiaTitle = document.querySelector('#metodologia .dimsop-h2');
        if (metodologiaTitle) {
            var text = metodologiaTitle.textContent;
            metodologiaTitle.innerHTML = text.split('').map(function (char) {
                return '<span style="display: inline-block; opacity: 0;">' + (char === ' ' ? '&nbsp;' : char) + '</span>';
            }).join('');
            var chars = metodologiaTitle.querySelectorAll('span');
            gsap.to(chars, {
                scrollTrigger: {
                    trigger: '#metodologia',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.05,
                stagger: 0.03,
                ease: 'power2.out'
            });
        }

        // Steps - stagger fade-in
        gsap.from('#metodologia .dimsop-step', {
            scrollTrigger: {
                trigger: '#metodologia .row',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // ============================================================
        // 3. UNIDADES DE NEGOCIO (#unidades)
        // ============================================================
        gsap.from('#unidades .dimsop-h2', {
            scrollTrigger: {
                trigger: '#unidades',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('#unidades .dimsop-card', {
            scrollTrigger: {
                trigger: '#unidades .row',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // ============================================================
        // 4. MAPA DE COBERTURA (#cobertura)
        // ============================================================
        gsap.from('#cobertura .dimsop-h2', {
            scrollTrigger: {
                trigger: '#cobertura',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('#cobertura .dimsop-map-iframe', {
            scrollTrigger: {
                trigger: '#cobertura .dimsop-map-container',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // ============================================================
        // 5. ALIADOS (#aliados)
        // ============================================================
        gsap.from('#aliados .dimsop-h2', {
            scrollTrigger: {
                trigger: '#aliados',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // ============================================================
        // 6. CONTADORES / ECOSISTEMA DIMSOP (#contadores)
        // ============================================================
        // Solo animamos el título; los números los maneja dimsop_theme.js
        gsap.from('#contadores .dimsop-h2', {
            scrollTrigger: {
                trigger: '#contadores',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // ============================================================
        // 7. PROYECTOS REFERENCIALES (#proyectos)
        // ============================================================
        gsap.from('#proyectos .dimsop-h2', {
            scrollTrigger: {
                trigger: '#proyectos',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('#proyectos .dimsop-project', {
            scrollTrigger: {
                trigger: '#proyectos .dimsop-projects-carousel',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // ============================================================
        // 8. BLOG (#blog)
        // ============================================================
        gsap.from('#blog .dimsop-h2', {
            scrollTrigger: {
                trigger: '#blog',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('#blog .dimsop-blog-card', {
            scrollTrigger: {
                trigger: '#blog .dimsop-blog-carousel',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // ============================================================
        // 9. FOOTER
        // ============================================================
        gsap.from('#dimsop_footer .col-lg-4', {
            scrollTrigger: {
                trigger: '#dimsop_footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    // Inicializar cuando GSAP esté listo
    loadGSAP(initAnimations);

    // Fallback si GSAP no carga en 5 segundos
    setTimeout(function () {
        if (!window.gsap) {
            console.warn('GSAP no cargó, mostrando contenido sin animaciones');
            document.querySelectorAll('[data-gsap-animate]').forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }, 5000);
})();