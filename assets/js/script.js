document.addEventListener('DOMContentLoaded', function() {
    
    // --- Menú Móvil ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Cerrar menú al hacer click fuera (opcional)
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });


    // --- Hero Slider Simple ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-slide');
    const prevBtn = document.querySelector('.prev-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Loop logic
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Auto play
    let autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
    }, slideInterval);

    // Pausar auto play al interactuar
    document.querySelector('.hero-slider').addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    document.querySelector('.hero-slider').addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            showSlide(currentSlide + 1);
        }, slideInterval);
    });

});