// =========================================
// MOBILE MENU — Incluir en todas las páginas
// =========================================

(function () {

    function initMobileMenu() {
        var openBtn = document.getElementById('mobile-menu-btn');
        var closeBtn = document.getElementById('close-menu-btn');
        var menu = document.getElementById('mobile-menu');

        if (!openBtn || !closeBtn || !menu) return;

        // Abrir menú
        openBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Cerrar con X
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (menu.classList.contains('active') && !menu.contains(e.target) && !openBtn.contains(e.target)) {
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Dropdowns internos — delegación de eventos en el menú
        menu.addEventListener('click', function (e) {
            var toggle = e.target.closest('.mobile-dropdown-toggle');
            if (!toggle) return;

            e.stopPropagation();

            var parent = toggle.closest('.mobile-dropdown');
            if (!parent) return;

            var isOpen = parent.classList.contains('is-open');

            // Cerrar todos
            menu.querySelectorAll('.mobile-dropdown').forEach(function (d) {
                d.classList.remove('is-open');
            });

            // Abrir el clicado si estaba cerrado
            if (!isOpen) {
                parent.classList.add('is-open');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }

})();
