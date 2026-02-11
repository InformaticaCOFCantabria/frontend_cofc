document.addEventListener('DOMContentLoaded', function() {
    
    // --- Funcionalidad del Acordeón ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const isActive = currentItem.classList.contains('active');

            // Cerrar todos los items del acordeón
            accordionItems.forEach(item => {
                item.classList.remove('active');
            });

            // Si el item clickeado no estaba activo, abrirlo
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });

    // Opcional: Cerrar acordeón al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            accordionItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // --- Funcionalidad del Menú Móvil (del script.js original) ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target) && 
                mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    // --- Funcionalidad del Formulario de Baja de Colegiación ---
    const formBajaColegiacion = document.getElementById('form-baja-colegiacion');
    
    if (formBajaColegiacion) {
        formBajaColegiacion.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar que al menos un motivo esté seleccionado
            const motivos = formBajaColegiacion.querySelectorAll('input[name="motivo"]:checked');
            if (motivos.length === 0) {
                alert('Por favor, seleccione al menos un motivo para la baja.');
                return;
            }
            
            // Aquí se procesaría el formulario
            // Por ahora, mostramos un mensaje de confirmación
            if (confirm('¿Está seguro de que desea enviar la solicitud de baja de colegiación?')) {
                alert('Formulario enviado correctamente. En breve nos pondremos en contacto con usted.');
                formBajaColegiacion.reset();
            }
        });

        // Funcionalidad del botón "Otro" en Población
        const btnOtro = formBajaColegiacion.querySelector('.btn-otro');
        const poblacionInput = formBajaColegiacion.querySelector('#poblacion');
        
        if (btnOtro && poblacionInput) {
            btnOtro.addEventListener('click', function() {
                poblacionInput.value = '';
                poblacionInput.focus();
            });
        }

        // Funcionalidad del botón delete en Población
        const btnDelete = formBajaColegiacion.querySelector('.btn-delete');
        
        if (btnDelete && poblacionInput) {
            btnDelete.addEventListener('click', function() {
                poblacionInput.value = '';
            });
        }
    }

    // --- Funcionalidad del Formulario de Solicitud de Certificados ---
    const formSolicitudCertificados = document.getElementById('form-solicitud-certificados');
    
    if (formSolicitudCertificados) {
        formSolicitudCertificados.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar que al menos un tipo de certificado esté seleccionado
            const tiposCertificado = formSolicitudCertificados.querySelectorAll('input[name="tipo-certificado"]:checked');
            if (tiposCertificado.length === 0) {
                alert('Por favor, seleccione al menos un tipo de certificado.');
                return;
            }
            
            // Aquí se procesaría el formulario
            // Por ahora, mostramos un mensaje de confirmación
            if (confirm('¿Está seguro de que desea enviar la solicitud de certificado?')) {
                alert('Formulario enviado correctamente.Recibirá un correo electrónico con las instrucciones en 24-48 horas hábiles.');
                formSolicitudCertificados.reset();
            }
        });

        // Funcionalidad del botón "Otro" en Población
        const btnOtroCert = formSolicitudCertificados.querySelector('.btn-otro');
        const poblacionInputCert = formSolicitudCertificados.querySelector('#poblacion');
        
        if (btnOtroCert && poblacionInputCert) {
            btnOtroCert.addEventListener('click', function() {
                poblacionInputCert.value = '';
                poblacionInputCert.focus();
            });
        }

        // Funcionalidad de los botones delete en el formulario
        const btnDeleteButtons = formSolicitudCertificados.querySelectorAll('.btn-delete');
        
        btnDeleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const inputGroup = this.closest('.input-with-buttons');
                if (inputGroup) {
                    const input = inputGroup.querySelector('input');
                    if (input) {
                        input.value = '';
                    }
                }
            });
        });
    }

});
