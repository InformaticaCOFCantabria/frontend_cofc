// JavaScript para la página de Junta de Gobierno

// Función para abrir el modal con la foto ampliada
function openModal(imgSrc, name, role) {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    
    modalImg.src = imgSrc;
    modalName.textContent = name;
    modalRole.textContent = role;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('photo-modal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll del body
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
