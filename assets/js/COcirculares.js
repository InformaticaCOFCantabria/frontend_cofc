// COcirculares.js — Acordeón de circulares
// Reutiliza los mismos efectos hover de PTestatutosmemoria.js

document.addEventListener('DOMContentLoaded', function () {

    const accordions = document.querySelectorAll('.circular-accordion');

    accordions.forEach(function (acc) {
        const btn   = acc.querySelector('.circular-header');
        const panel = acc.querySelector('.circular-panel');

        if (!btn || !panel) return;

        btn.addEventListener('click', function () {
            const isOpen = acc.classList.contains('is-open');

            // Cerrar todos
            accordions.forEach(function (a) {
                a.classList.remove('is-open');
                const b = a.querySelector('.circular-header');
                const p = a.querySelector('.circular-panel');
                if (b) b.setAttribute('aria-expanded', 'false');
                if (p) p.hidden = true;
            });

            // Abrir el clicado si estaba cerrado
            if (!isOpen) {
                acc.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
                panel.hidden = false;
            }
        });
    });

    // Subgrupos desplegables independientes (no se cierran entre sí)
    document.querySelectorAll('.documents-group-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const panelId = btn.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            btn.setAttribute('aria-expanded', !isOpen);
            panel.hidden = isOpen;
        });
    });

    // Sub-subgrupos por año (tercer nivel)
    document.querySelectorAll('.documents-subgroup-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const panelId = btn.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isOpen);
            panel.hidden = isOpen;
        });
    });

    // Mismo efecto de feedback en descarga que PTestatutosmemoria.js
    document.querySelectorAll('.circular-panel .download-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const original = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i><span>Descargando...</span>';
            const self = this;
            setTimeout(function () {
                self.innerHTML = original;
            }, 2000);
        });
    });

});
