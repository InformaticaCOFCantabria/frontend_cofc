// =========================================
// JS PARA COcim
// =========================================

document.addEventListener('DOMContentLoaded', function () {
    const navBtns = document.querySelectorAll('.cim-nav-btn');
    const sections = document.querySelectorAll('.cim-section');

    navBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = this.getAttribute('data-target');

            // Actualizar botones
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Mostrar sección correcta
            sections.forEach(function (sec) {
                sec.classList.remove('active');
            });
            const targetSec = document.getElementById('sec-' + target);
            if (targetSec) {
                targetSec.classList.add('active');
            }

            // En móvil, hacer scroll al contenido
            if (window.innerWidth <= 900) {
                document.querySelector('.cim-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// =====================================================
// ACORDEÓN DE DOCUMENTOS (portado de COcirculares.js)
// =====================================================

document.addEventListener('DOMContentLoaded', function () {

    // Acordeón principal
    document.querySelectorAll('.circular-accordion').forEach(function (acc) {
        const btn   = acc.querySelector('.circular-header');
        const panel = acc.querySelector('.circular-panel');
        if (!btn || !panel) return;

        btn.addEventListener('click', function () {
            const isOpen = acc.classList.contains('is-open');

            document.querySelectorAll('.circular-accordion').forEach(function (a) {
                a.classList.remove('is-open');
                const b = a.querySelector('.circular-header');
                const p = a.querySelector('.circular-panel');
                if (b) b.setAttribute('aria-expanded', 'false');
                if (p) p.hidden = true;
            });

            if (!isOpen) {
                acc.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
                panel.hidden = false;
            }
        });
    });

    // Feedback visual en descarga
    document.querySelectorAll('.circular-panel .download-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const original = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i><span>Descargando...</span>';
            const self = this;
            setTimeout(function () { self.innerHTML = original; }, 2000);
        });
    });

});