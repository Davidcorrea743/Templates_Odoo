/* ---------------------------------------------------------------------
 * DIMSOP - DARK MODE
 * Toggle manual (luna/sol). Persiste la elección en localStorage y
 * aplica el atributo data-theme en <html>.
 * --------------------------------------------------------------------- */
(function () {
    'use strict';

    const STORAGE_KEY = 'dimsop-theme';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // localStorage no disponible: ignorar
        }
        updateToggleIcon(theme);
    }

    function updateToggleIcon(theme) {
        const icon = document.querySelector('#dimsop-dark-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o';
        }
    }

    function initDarkMode() {
        let theme = null;
        try {
            theme = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            theme = null;
        }
        // Valor por defecto: claro
        applyTheme(theme === 'dark' ? 'dark' : 'light');

        const toggle = document.getElementById('dimsop-dark-toggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                const current = document.documentElement.getAttribute('data-theme');
                applyTheme(current === 'dark' ? 'light' : 'dark');
            });
        }
    }

    document.addEventListener('DOMContentLoaded', initDarkMode);
})();
