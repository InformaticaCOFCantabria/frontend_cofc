// JavaScript para la página de Colegiación en Sede Colegial

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos
    const downloadButtons = document.querySelectorAll('.download-btn');
    const documentCards = document.querySelectorAll('.document-card');

    // Efecto hover mejorado en las cards
    documentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Analytics y feedback visual para descargas
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const fileName = this.getAttribute('href');
            console.log(`Descargando documento: ${fileName}`);
            
            // Aquí puedes agregar tracking de analytics si lo necesitas
            // Ejemplo: gtag('event', 'download', { 'file_name': fileName });
            
            // Pequeño feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i><span>Descargando...</span>';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });

    // Smooth scroll para navegación interna (si se agrega en el futuro)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Verificar si los archivos existen (útil para desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        downloadButtons.forEach(button => {
            const href = button.getAttribute('href');
            if (href && !href.startsWith('http')) {
                console.log(`Verificar que existe el archivo: ${href}`);
            }
        });
    }

    // Animación de entrada para las cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar las cards para animación de entrada
    documentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Contador de documentos descargados (opcional)
    let downloadCount = 0;
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            downloadCount++;
            console.log(`Total de documentos descargados en esta sesión: ${downloadCount}`);
        });
    });

});
