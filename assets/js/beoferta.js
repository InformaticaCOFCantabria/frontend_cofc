// =========================================
// JAVASCRIPT PARA BEoferta.html
// =========================================

// Datos de muestra de ofertas
const ofertas = [
    { 
        id: 1, 
        coords: [43.4623, -3.8099], 
        titulo: "Farmacéutico Adjunto - Santander Centro", 
        lugar: "Santander", 
        badge: "Adjunto", 
        jornada: "Completa", 
        desc: "Farmacia con alto volumen de trabajo en el centro de Santander busca farmacéutico adjunto. Ofrecemos contrato estable y formación continua." 
    },
    { 
        id: 2, 
        coords: [43.3496, -4.0478], 
        titulo: "Sustitución Verano (Julio/Agosto)", 
        lugar: "Torrelavega", 
        badge: "Sustituto", 
        jornada: "Tarde", 
        desc: "Se requiere farmacéutico para cubrir periodo vacacional en oficina de farmacia en Torrelavega." 
    },
    { 
        id: 3, 
        coords: [43.4078, -3.4862], 
        titulo: "Técnico en Farmacia - Zona Laredo", 
        lugar: "Laredo", 
        badge: "Técnico", 
        jornada: "Mañana", 
        desc: "Buscamos técnico en farmacia o parafarmacia para jornada intensiva de mañanas." 
    }
];

// Variables globales
let map, markersLayer;
let isLoggedIn = false;

// Elementos del DOM
const loginModal = document.getElementById('login-modal');
const showLoginBtn = document.getElementById('show-login-btn');
const closeModalBtn = document.querySelector('.close-modal');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const publishButtonContainer = document.getElementById('publish-button-container');
const jobFormContainer = document.getElementById('job-form-container');
const logoutBtn = document.getElementById('logout-btn');
const jobOfferForm = document.getElementById('job-offer-form');

// =========================================
// SISTEMA DE LOGIN
// =========================================

// Al cargar la página, verificar si ya está autenticado
document.addEventListener('DOMContentLoaded', () => {
    // Siempre inicializar el mapa
    initMap();
    
    if (Auth.isAuthenticated()) {
        // Usuario ya está logueado
        isLoggedIn = true;
        loginModal.style.display = 'none';
        publishButtonContainer.style.display = 'none';
        jobFormContainer.style.display = 'block';
    }
});

// Mostrar modal de login
showLoginBtn.addEventListener('click', () => {
    if (Auth.isAuthenticated()) {
        // Si ya está autenticado, ir directo al formulario
        publishButtonContainer.style.display = 'none';
        jobFormContainer.style.display = 'block';
        jobFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        // Si no está autenticado, mostrar modal
        loginModal.style.display = 'block';
    }
});

// Cerrar modal
closeModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    loginError.classList.remove('show');
    loginError.textContent = '';
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        loginError.classList.remove('show');
        loginError.textContent = '';
    }
});

// Procesar login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const result = Auth.login(username, password);
    
    if (result.success) {
        isLoggedIn = true;
        loginModal.style.display = 'none';
        publishButtonContainer.style.display = 'none';
        jobFormContainer.style.display = 'block';
        
        // Limpiar formulario de login
        loginForm.reset();
        loginError.classList.remove('show');
        loginError.textContent = '';
        
        // Actualizar UI global
        Auth.updateAuthUI();
        
        // Scroll al formulario
        jobFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        loginError.textContent = result.error;
        loginError.classList.add('show');
    }
});

// Cerrar sesión
logoutBtn.addEventListener('click', () => {
    isLoggedIn = false;
    Auth.logout();
    Auth.updateAuthUI();
    
    jobFormContainer.style.display = 'none';
    publishButtonContainer.style.display = 'block';
    jobOfferForm.reset();
    
    // Scroll al botón de publicar
    publishButtonContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// =========================================
// FORMULARIO DE PUBLICACIÓN
// =========================================

jobOfferForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const position = document.getElementById('job-position').value;
    const schedule = document.getElementById('job-schedule').value;
    const contract = document.getElementById('job-contract').value;
    const location = document.getElementById('job-location').value;
    const info = document.getElementById('job-info').value;
    
    // Asignar coordenadas por defecto (centro de Cantabria)
    const lat = 43.35;
    const lng = -3.8;
    
    // Crear nueva oferta
    const newJob = {
        id: ofertas.length + 1,
        coords: [lat, lng],
        titulo: `${position} - ${location}`,
        lugar: location,
        badge: contract,
        jornada: schedule,
        desc: info || `Oferta de trabajo para ${position}. Horario: ${schedule}. Tipo de contrato: ${contract}.`
    };
    
    // Agregar a las ofertas
    ofertas.push(newJob);
    
    // Actualizar el mapa
    renderMarkers(ofertas);
    
    // Mostrar mensaje de éxito
    alert('¡Oferta publicada con éxito!');
    
    // Limpiar formulario
    jobOfferForm.reset();
    
    // Scroll al mapa para ver la nueva oferta
    document.querySelector('.map-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// =========================================
// MAPA CON LEAFLET
// =========================================

function initMap() {
    // Inicializar el mapa centrado en Cantabria
    map = L.map('map', { 
        scrollWheelZoom: false, 
        zoomControl: false 
    }).setView([43.35, -3.8], 9);
    
    // Agregar control de zoom en la esquina inferior derecha
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    // Agregar capa de mapa base
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Crear capa para los marcadores
    markersLayer = L.layerGroup().addTo(map);
    
    // Renderizar marcadores iniciales
    renderMarkers(ofertas);
}

function renderMarkers(data) {
    // Limpiar marcadores existentes
    markersLayer.clearLayers();
    
    // Icono personalizado
    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #BEE164; width: 14px; height: 14px; border-radius: 50%; border: 3px solid #000; box-shadow: 0 0 10px rgba(190,225,100,0.5);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
    });
    
    // Agregar marcador para cada oferta
    data.forEach(oferta => {
        const marker = L.marker(oferta.coords, { icon: customIcon });
        
        // Evento de clic en el marcador
        marker.on('click', () => showDetail(oferta));
        
        markersLayer.addLayer(marker);
    });
}

function showDetail(oferta) {
    // Ocultar estado vacío
    document.getElementById('empty-state').style.display = 'none';
    
    // Mostrar panel de información
    const panel = document.getElementById('info-panel');
    panel.style.display = 'block';
    
    // Rellenar información
    document.getElementById('job-title').textContent = oferta.titulo;
    document.getElementById('job-location').textContent = oferta.lugar + ", Cantabria";
    document.getElementById('job-badge').textContent = oferta.badge;
    document.getElementById('job-desc').textContent = oferta.desc;
}

// =========================================
// FILTROS DE BÚSQUEDA
// =========================================

function applyFilters() {
    const keyword = document.getElementById('search-keyword').value.toLowerCase();
    const type = document.getElementById('search-type').value;
    
    // Filtrar ofertas
    const filtered = ofertas.filter(o => 
        (o.titulo.toLowerCase().includes(keyword) || o.lugar.toLowerCase().includes(keyword)) &&
        (type === 'Todos los tipos' || o.badge === type)
    );
    
    // Actualizar marcadores
    renderMarkers(filtered);
    
    // Ocultar panel de información y mostrar estado vacío
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('empty-state').style.display = 'block';
}

