// =========================================
// JAVASCRIPT PARA BEdemanda.html
// =========================================

// Datos de muestra de ofertas
const ofertas = [
    { 
        id: 1, 
        coords: [43.4623, -3.8099], 
        titulo: "Farmacéutico Adjunto - Santander Centro", 
        lugar: "Santander", 
        badge: "Adjunto", 
        contrato: "Indefinido",
        jornada: "Completa", 
        desc: "Farmacia con alto volumen de trabajo en el centro de Santander busca farmacéutico adjunto. Ofrecemos contrato estable y formación continua." 
    },
    { 
        id: 2, 
        coords: [43.3496, -4.0478], 
        titulo: "Sustitución Verano (Julio/Agosto)", 
        lugar: "Torrelavega", 
        badge: "Sustituto", 
        contrato: "Temporal",
        jornada: "Tarde", 
        desc: "Se requiere farmacéutico para cubrir periodo vacacional en oficina de farmacia en Torrelavega." 
    },
    { 
        id: 3, 
        coords: [43.4078, -3.4862], 
        titulo: "Técnico en Farmacia - Zona Laredo", 
        lugar: "Laredo", 
        badge: "Técnico", 
        contrato: "Indefinido",
        jornada: "Mañana", 
        desc: "Buscamos técnico en farmacia o parafarmacia para jornada intensiva de mañanas." 
    },
    { 
        id: 4, 
        coords: [43.3802, -4.2163], 
        titulo: "Farmacéutico Sustituto - Los Corrales de Buelna", 
        lugar: "Los Corrales de Buelna", 
        badge: "Sustituto", 
        contrato: "Temporal",
        jornada: "Completa", 
        desc: "Farmacia busca sustituto para cubrir vacaciones durante dos meses." 
    },
    { 
        id: 5, 
        coords: [43.4925, -3.8034], 
        titulo: "Adjunto de Farmacia - Santander Norte", 
        lugar: "Santander", 
        badge: "Adjunto", 
        contrato: "Indefinido",
        jornada: "Completa", 
        desc: "Farmacia consolidada en zona norte de Santander busca farmacéutico adjunto con experiencia." 
    }
];

// Variables globales
let map, markersLayer;
let isLoggedIn = false;

// Elementos del DOM
const loginScreen = document.getElementById('login-screen');
const jobsContent = document.getElementById('jobs-content');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const usernameDisplay = document.getElementById('username-display');
const jobsTableBody = document.getElementById('jobs-table-body');

// =========================================
// SISTEMA DE LOGIN
// =========================================

// =========================================
// SISTEMA DE LOGIN
// =========================================

// Al cargar la página, verificar si ya está autenticado
document.addEventListener('DOMContentLoaded', () => {
    // La página inicia mostrando la pantalla de login
    loginScreen.style.display = 'block';
    jobsContent.style.display = 'none';
    
    // Verificar si ya está autenticado
    if (Auth.isAuthenticated()) {
        const userData = Auth.getUserData();
        isLoggedIn = true;
        
        // Ocultar pantalla de login y mostrar contenido
        loginScreen.style.display = 'none';
        jobsContent.style.display = 'block';
        
        // Mostrar nombre de usuario
        usernameDisplay.textContent = userData.username;
        
        // Cargar ofertas en la tabla
        loadJobsTable();
        
        // Inicializar mapa
        initMap();
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const result = Auth.login(username, password);
    
    if (result.success) {
        isLoggedIn = true;
        
        // Ocultar pantalla de login y mostrar contenido
        loginScreen.style.display = 'none';
        jobsContent.style.display = 'block';
        
        // Mostrar nombre de usuario
        usernameDisplay.textContent = result.userData.username;
        
        // Cargar ofertas en la tabla
        loadJobsTable();
        
        // Inicializar mapa
        initMap();
        
        // Limpiar formulario de login
        loginForm.reset();
        loginError.classList.remove('show');
        loginError.textContent = '';
        
        // Actualizar UI global
        Auth.updateAuthUI();
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
    
    jobsContent.style.display = 'none';
    loginScreen.style.display = 'block';
    loginForm.reset();
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================
// TABLA DE OFERTAS
// =========================================

function loadJobsTable() {
    jobsTableBody.innerHTML = '';
    
    ofertas.forEach(oferta => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${oferta.titulo}</strong></td>
            <td>${oferta.lugar}, Cantabria</td>
            <td><span class="job-type-badge ${oferta.badge.toLowerCase()}">${oferta.badge}</span></td>
            <td>${oferta.jornada}</td>
            <td>
                <div class="job-actions">
                    <button class="btn-view" onclick="viewJobOnMap(${oferta.id})">
                        <i class="fas fa-map-marker-alt"></i> Ver en Mapa
                    </button>
                    <button class="btn-contact">
                        <i class="fas fa-envelope"></i> Contactar
                    </button>
                </div>
            </td>
        `;
        
        jobsTableBody.appendChild(row);
    });
}

function viewJobOnMap(jobId) {
    const oferta = ofertas.find(o => o.id === jobId);
    
    if (oferta) {
        // Scroll al mapa
        document.querySelector('.map-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Centrar mapa en la oferta
        map.setView(oferta.coords, 14);
        
        // Mostrar detalles de la oferta
        setTimeout(() => {
            showDetail(oferta);
        }, 800);
    }
}

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
    
    // Actualizar tabla
    updateTableWithFilters(filtered);
    
    // Ocultar panel de información y mostrar estado vacío
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('empty-state').style.display = 'block';
}

function updateTableWithFilters(filteredOffers) {
    jobsTableBody.innerHTML = '';
    
    if (filteredOffers.length === 0) {
        jobsTableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: #999;">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                    No se encontraron ofertas que coincidan con los filtros
                </td>
            </tr>
        `;
        return;
    }
    
    filteredOffers.forEach(oferta => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${oferta.titulo}</strong></td>
            <td>${oferta.lugar}, Cantabria</td>
            <td><span class="job-type-badge ${oferta.badge.toLowerCase()}">${oferta.badge}</span></td>
            <td>${oferta.jornada}</td>
            <td>
                <div class="job-actions">
                    <button class="btn-view" onclick="viewJobOnMap(${oferta.id})">
                        <i class="fas fa-map-marker-alt"></i> Ver en Mapa
                    </button>
                    <button class="btn-contact">
                        <i class="fas fa-envelope"></i> Contactar
                    </button>
                </div>
            </td>
        `;
        
        jobsTableBody.appendChild(row);
    });
}


