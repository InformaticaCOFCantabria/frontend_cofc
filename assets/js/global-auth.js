// =========================================
// SISTEMA DE AUTENTICACIÓN GLOBAL
// Para usar en TODAS las páginas del sitio
// =========================================

// Objeto global de autenticación
const Auth = {
    // Credenciales (en producción esto debería estar en servidor)
    VALID_USERNAME: 'Admin',
    VALID_PASSWORD: 'Admin',
    
    // Verificar si el usuario está autenticado
    isAuthenticated() {
        return localStorage.getItem('isLoggedIn') === 'true';
    },
    
    // Obtener datos del usuario
    getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    },
    
    // Iniciar sesión
    login(username, password) {
        if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
            const userData = {
                username: username,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Notificar a otras pestañas
            localStorage.setItem('auth-event', Date.now().toString());
            
            return { success: true, userData: userData };
        } else {
            return { success: false, error: 'Usuario o contraseña incorrectos' };
        }
    },
    
    // Cerrar sesión
    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        
        // Notificar a otras pestañas
        localStorage.setItem('auth-event', Date.now().toString());
    },
    
    // Actualizar UI según estado de autenticación
    updateAuthUI() {
        const isLoggedIn = this.isAuthenticated();
        const userData = this.getUserData();
        
        // Actualizar botón de acceso colegiado en el header
        const loginBtn = document.querySelector('.btn-acceso');
        if (loginBtn) {
            if (isLoggedIn && userData) {
                loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${userData.username}`;
                loginBtn.style.background = 'var(--primary-color)';
                loginBtn.style.color = '#333';
                loginBtn.setAttribute('data-logged-in', 'true');
            } else {
                loginBtn.innerHTML = '<i class="fas fa-lock"></i> Acceso Colegiado';
                loginBtn.style.background = '';
                loginBtn.style.color = '';
                loginBtn.removeAttribute('data-logged-in');
            }
        }
    }
};

// =========================================
// MODAL DE LOGIN GLOBAL
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Crear modal de login dinámicamente
    const createLoginModal = () => {
        // Verificar si ya existe el modal
        if (document.getElementById('global-login-modal')) return;
        
        const modalHTML = `
            <div class="global-login-modal" id="global-login-modal">
                <div class="global-login-overlay"></div>
                <div class="global-login-content">
                    <button class="close-global-login" id="close-global-login">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="global-login-header">
                        <i class="fas fa-user-lock"></i>
                        <h2>Acceso Colegiados</h2>
                        <p>Ingresa tus credenciales para acceder</p>
                    </div>
                    
                    <form id="global-login-form" class="global-login-form">
                        <div class="form-group">
                            <label for="global-username">
                                <i class="fas fa-user"></i> Usuario
                            </label>
                            <input type="text" id="global-username" name="username" required 
                                   placeholder="Ingresa tu usuario" autocomplete="username">
                        </div>
                        
                        <div class="form-group">
                            <label for="global-password">
                                <i class="fas fa-lock"></i> Contraseña
                            </label>
                            <input type="password" id="global-password" name="password" required 
                                   placeholder="Ingresa tu contraseña" autocomplete="current-password">
                        </div>
                        
                        <div class="error-message" id="global-login-error"></div>
                        
                        <button type="submit" class="btn btn-primary btn-block">
                            <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </button>
                    </form>
                    
                    <div class="global-login-footer">
                        <p><small>¿Olvidaste tu contraseña? <a href="#">Recupérala aquí</a></small></p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    };
    
    // Crear estilos del modal
    const createModalStyles = () => {
        // Verificar si ya existen los estilos
        if (document.querySelector('style[data-global-auth]')) return;
        
        const style = document.createElement('style');
        style.setAttribute('data-global-auth', 'true');
        style.textContent = `
            .global-login-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .global-login-modal.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .global-login-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            
            .global-login-content {
                position: relative;
                background: white;
                border-radius: 12px;
                padding: 40px;
                width: 90%;
                max-width: 450px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease;
                z-index: 1;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .close-global-login {
                position: absolute;
                top: 15px;
                right: 15px;
                background: transparent;
                border: none;
                font-size: 24px;
                color: #999;
                cursor: pointer;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s;
            }
            
            .close-global-login:hover {
                background: #f0f0f0;
                color: #333;
                transform: rotate(90deg);
            }
            
            .global-login-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .global-login-header i {
                font-size: 60px;
                color: var(--primary-color);
                margin-bottom: 15px;
            }
            
            .global-login-header h2 {
                font-size: 26px;
                font-weight: 700;
                color: var(--heading-color);
                margin-bottom: 8px;
            }
            
            .global-login-header p {
                font-size: 14px;
                color: var(--text-color);
            }
            
            .global-login-form .form-group {
                margin-bottom: 20px;
            }
            
            .global-login-form label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                font-size: 14px;
                color: var(--heading-color);
            }
            
            .global-login-form label i {
                color: var(--primary-color);
                margin-right: 5px;
            }
            
            .global-login-form input {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #e0e0e0;
                border-radius: 6px;
                font-size: 14px;
                font-family: inherit;
                transition: border-color 0.3s;
            }
            
            .global-login-form input:focus {
                outline: none;
                border-color: var(--primary-color);
            }
            
            .global-login-form .error-message {
                color: #e74c3c;
                font-size: 13px;
                margin: 15px 0;
                padding: 10px;
                background: #ffe6e6;
                border-radius: 6px;
                display: none;
            }
            
            .global-login-form .error-message.show {
                display: block;
            }
            
            .global-login-form .btn-block {
                width: 100%;
                padding: 14px;
                font-size: 15px;
                margin-top: 10px;
            }
            
            .global-login-footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #f0f0f0;
            }
            
            .global-login-footer a {
                color: var(--primary-color);
                text-decoration: none;
                font-weight: 600;
            }
            
            .global-login-footer a:hover {
                text-decoration: underline;
            }
            
            /* Notificaciones */
            .global-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10001;
                animation: slideInRight 0.3s ease;
                min-width: 300px;
            }
            
            .global-notification.success {
                border-left: 4px solid #27ae60;
            }
            
            .global-notification.success i {
                color: #27ae60;
                font-size: 20px;
            }
            
            .global-notification.error {
                border-left: 4px solid #e74c3c;
            }
            
            .global-notification.error i {
                color: #e74c3c;
                font-size: 20px;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            /* Responsive */
            @media (max-width: 480px) {
                .global-login-content {
                    padding: 30px 20px;
                    width: 95%;
                }
                
                .global-login-header i {
                    font-size: 50px;
                }
                
                .global-login-header h2 {
                    font-size: 22px;
                }
                
                .global-notification {
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Inicializar
    createModalStyles();
    createLoginModal();
    Auth.updateAuthUI();
    
    // Referencias a elementos
    const loginBtn = document.querySelector('.btn-acceso');
    const modal = document.getElementById('global-login-modal');
    const closeModalBtn = document.getElementById('close-global-login');
    const loginForm = document.getElementById('global-login-form');
    const errorMessage = document.getElementById('global-login-error');
    
    // Verificar que existen los elementos
    if (!loginBtn || !modal || !closeModalBtn || !loginForm || !errorMessage) {
        console.error('No se encontraron todos los elementos necesarios');
        return;
    }
    
    // Abrir modal o cerrar sesión
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (Auth.isAuthenticated()) {
            // Si está logueado, preguntar si quiere cerrar sesión
            if (confirm('¿Deseas cerrar sesión?')) {
                Auth.logout();
                Auth.updateAuthUI();
                showNotification('Sesión cerrada correctamente', 'success');
                
                // Recargar página si estamos en una página protegida
                const currentPage = window.location.pathname;
                if (currentPage.includes('BEoferta') || currentPage.includes('BEdemanda')) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        } else {
            // Si no está logueado, abrir modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Cerrar modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';
        loginForm.reset();
    };
    
    closeModalBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer clic en el overlay
    modal.querySelector('.global-login-overlay').addEventListener('click', closeModal);
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Procesar login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('global-username').value;
        const password = document.getElementById('global-password').value;
        
        const result = Auth.login(username, password);
        
        if (result.success) {
            closeModal();
            Auth.updateAuthUI();
            showNotification(`¡Bienvenido ${result.userData.username}!`, 'success');
            
            // Si estamos en una página que requiere login, recargar
            const currentPage = window.location.pathname;
            if (currentPage.includes('BEoferta') || currentPage.includes('BEdemanda')) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            errorMessage.textContent = result.error;
            errorMessage.classList.add('show');
        }
    });
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `global-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Escuchar cambios en el localStorage (sincronización entre pestañas)
    window.addEventListener('storage', (e) => {
        if (e.key === 'auth-event') {
            // Actualizar UI cuando cambie el estado de autenticación en otra pestaña
            Auth.updateAuthUI();
            
            // Si estamos en una página protegida y se cerró sesión, recargar
            const currentPage = window.location.pathname;
            if ((currentPage.includes('BEoferta') || currentPage.includes('BEdemanda')) && !Auth.isAuthenticated()) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        }
    });
});
