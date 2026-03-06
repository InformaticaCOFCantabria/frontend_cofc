document.addEventListener('DOMContentLoaded', function() {

    // --- Menú Móvil ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn  = document.getElementById('close-menu-btn');
    const mobileMenu    = document.getElementById('mobile-menu');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    // --- Dropdowns menú móvil ---
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const parent = this.closest('.mobile-dropdown');
            const isOpen = parent.classList.contains('is-open');
            document.querySelectorAll('.mobile-dropdown').forEach(d => d.classList.remove('is-open'));
            if (!isOpen) parent.classList.add('is-open');
        });
    });

    // --- Hero Slider Simple ---
    const slides  = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const heroSlider = document.querySelector('.hero-slider');

    if (slides.length && nextBtn && prevBtn && heroSlider) {
        let currentSlide = 0;
        const slideInterval = 5000;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;
            slides[currentSlide].classList.add('active');
        }

        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

        let autoSlide = setInterval(() => showSlide(currentSlide + 1), slideInterval);

        heroSlider.addEventListener('mouseenter', () => clearInterval(autoSlide));
        heroSlider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => showSlide(currentSlide + 1), slideInterval);
        });
    }

});
