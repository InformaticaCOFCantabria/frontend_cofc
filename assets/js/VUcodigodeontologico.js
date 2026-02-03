// JavaScript para la página de Código Deontológico

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos
    const downloadButton = document.querySelector('.download-btn');
    const documentCard = document.querySelector('.document-card');

    // Efecto hover mejorado en la card
    if (documentCard) {
        documentCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        documentCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Analytics y feedback visual para el botón de descarga
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
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
    }

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

    // Verificar si el archivo PDF existe (útil para desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        if (downloadButton) {
            const href = downloadButton.getAttribute('href');
            if (href && !href.startsWith('http')) {
                console.log(`Verificar que existe el archivo: ${href}`);
            }
        }
    }

    // Animación de entrada para la card
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

    // Observar la card para animación de entrada
    if (documentCard) {
        documentCard.style.opacity = '0';
        documentCard.style.transform = 'translateY(20px)';
        documentCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(documentCard);
    }

});
