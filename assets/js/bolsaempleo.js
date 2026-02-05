// =========================================
// JAVASCRIPT PARA BOLSA DE EMPLEO FUSIONADA
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

// Datos de muestra de demandas (farmacéuticos que buscan empleo)
const demandas = [
    {
        id: 1,
        nombre: "María",
        apellidos: "García López",
        nif: "12345678A",
        telefono: "666123456",
        email: "maria.garcia@email.com",
        direccion: "Calle Mayor 15",
        ciudad: "Santander",
        cp: "39001",
        pais: "España",
        provincia: "Cantabria",
        titulo: "Farmacéutica Adjunta - Disponibilidad Inmediata",
        descripcion: "Farmacéutica con 5 años de experiencia buscando posición estable como adjunta en Cantabria",
        estudios: "Grado en Farmacia, Máster en Dermofarmacia",
        presentacion: "Farmacéutica con amplia experiencia en oficina de farmacia y especialización en dermofarmacia. Comprometida con la atención farmacéutica de calidad.",
        cvUrl: "#"
    },
    {
        id: 2,
        nombre: "Carlos",
        apellidos: "Martínez Ruiz",
        nif: "87654321B",
        telefono: "677234567",
        email: "carlos.martinez@email.com",
        direccion: "Avenida Castros 22",
        ciudad: "Torrelavega",
        cp: "39300",
        pais: "España",
        provincia: "Cantabria",
        titulo: "Farmacéutico Sustituto - Disponible Fines de Semana",
        descripcion: "Farmacéutico titulado buscando sustituciones. Disponibilidad fines de semana y vacaciones",
        estudios: "Licenciatura en Farmacia, Curso de Fitoterapia",
        presentacion: "Farmacéutico con experiencia en sustituciones. Flexible y adaptable a diferentes entornos de trabajo.",
        cvUrl: "#"
    }
];

// Variables globales
let map, markersLayer;

// Elementos del DOM
const showOfferFormBtn = document.getElementById('show-offer-form');
const showDemandFormBtn = document.getElementById('show-demand-form');
const offerFormContainer = document.getElementById('offer-form-container');
const demandFormContainer = document.getElementById('demand-form-container');
const closeOfferFormBtn = document.getElementById('close-offer-form');
const closeDemandFormBtn = document.getElementById('close-demand-form');
const jobOfferForm = document.getElementById('job-offer-form');
const jobDemandForm = document.getElementById('job-demand-form');
const jobsTableBody = document.getElementById('jobs-table-body');
const demandsTableBody = document.getElementById('demands-table-body');
const demandDetailsModal = document.getElementById('demand-details-modal');
const closeDemandDetailsBtn = document.getElementById('close-demand-details');

// =========================================
// INICIALIZACIÓN
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar mapa
    initMap();
    
    // Cargar ofertas en la tabla
    loadJobsTable();
    
    // Cargar demandas en la tabla
    loadDemandsTable();
});

// =========================================
// MOSTRAR/OCULTAR FORMULARIOS
// =========================================

// Variable para recordar qué acción se estaba intentando realizar
let pendingAction = null;

// Función auxiliar para abrir el modal de login
function openLoginModal() {
    const modal = document.getElementById('global-login-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Función para verificar el login y ejecutar la acción pendiente
function checkLoginAndExecutePendingAction() {
    if (Auth.isAuthenticated() && pendingAction) {
        const action = pendingAction;
        pendingAction = null; // Limpiar la acción pendiente
        
        setTimeout(() => {
            if (action === 'show-offer-form') {
                offerFormContainer.style.display = 'block';
                demandFormContainer.style.display = 'none';
                offerFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (action === 'show-demand-form') {
                demandFormContainer.style.display = 'block';
                offerFormContainer.style.display = 'none';
                demandFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }
}

// Listener para detectar cambios en localStorage (cuando se hace login)
window.addEventListener('storage', (e) => {
    if (e.key === 'auth-event') {
        checkLoginAndExecutePendingAction();
    }
});

// Mostrar formulario de oferta
showOfferFormBtn.addEventListener('click', () => {
    // Auth está definido en global-auth.js
    if (typeof Auth !== 'undefined' && Auth.isAuthenticated()) {
        // Usuario autenticado: mostrar el formulario
        offerFormContainer.style.display = 'block';
        demandFormContainer.style.display = 'none';
        offerFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        // Usuario NO autenticado: guardar la acción pendiente y abrir modal de login
        pendingAction = 'show-offer-form';
        openLoginModal();
    }
});

// Mostrar formulario de demanda
showDemandFormBtn.addEventListener('click', () => {
    // Para buscar empleo NO se requiere login
    demandFormContainer.style.display = 'block';
    offerFormContainer.style.display = 'none';
    demandFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Cerrar formulario de oferta
closeOfferFormBtn.addEventListener('click', () => {
    offerFormContainer.style.display = 'none';
    jobOfferForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cerrar formulario de demanda
closeDemandFormBtn.addEventListener('click', () => {
    demandFormContainer.style.display = 'none';
    jobDemandForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================
// FORMULARIO DE PUBLICACIÓN DE OFERTA
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
        badge: position.includes('Adjunto') ? 'Adjunto' : position.includes('Sustituto') ? 'Sustituto' : 'Técnico',
        contrato: contract,
        jornada: schedule,
        desc: info || `Oferta de trabajo para ${position}. Horario: ${schedule}. Tipo de contrato: ${contract}.`
    };
    
    // Agregar a las ofertas
    ofertas.push(newJob);
    
    // Actualizar el mapa
    renderMarkers(ofertas);
    
    // Actualizar la tabla
    loadJobsTable();
    
    // Mostrar mensaje de éxito
    alert('¡Oferta publicada con éxito!');
    
    // Limpiar formulario
    jobOfferForm.reset();
    
    // Ocultar formulario
    offerFormContainer.style.display = 'none';
    
    // Scroll al mapa
    document.querySelector('.explorer-section').scrollIntoView({ behavior: 'smooth' });
});

// =========================================
// FORMULARIO DE DEMANDA DE EMPLEO
// =========================================

jobDemandForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('demand-nombre').value;
    const apellidos = document.getElementById('demand-apellidos').value;
    const nif = document.getElementById('demand-nif').value;
    const telefono = document.getElementById('demand-telefono').value;
    const email = document.getElementById('demand-email').value;
    const direccion = document.getElementById('demand-direccion').value;
    const ciudad = document.getElementById('demand-ciudad').value;
    const cp = document.getElementById('demand-cp').value;
    const pais = document.getElementById('demand-pais').value;
    const provincia = document.getElementById('demand-provincia').value;
    const titulo = document.getElementById('demand-titulo').value;
    const descripcion = document.getElementById('demand-descripcion').value;
    const estudios = document.getElementById('demand-estudios').value;
    const presentacion = document.getElementById('demand-presentacion').value;
    
    // Simulación de URL del CV (en producción, aquí se subiría el archivo)
    const cvUrl = "#";
    
    // Crear nueva demanda
    const newDemand = {
        id: demandas.length + 1,
        nombre,
        apellidos,
        nif,
        telefono,
        email,
        direccion,
        ciudad,
        cp,
        pais,
        provincia,
        titulo,
        descripcion,
        estudios,
        presentacion,
        cvUrl
    };
    
    // Agregar a las demandas
    demandas.push(newDemand);
    
    // Actualizar la tabla
    loadDemandsTable();
    
    // Mostrar mensaje de éxito
    alert('¡Perfil publicado con éxito!');
    
    // Limpiar formulario
    jobDemandForm.reset();
    
    // Ocultar formulario
    demandFormContainer.style.display = 'none';
    
    // Scroll a la tabla de demandas
    document.querySelector('.demands-section').scrollIntoView({ behavior: 'smooth' });
});

// =========================================
// CARGAR OFERTAS EN LA TABLA
// =========================================

function loadJobsTable() {
    jobsTableBody.innerHTML = '';
    
    ofertas.forEach(oferta => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${oferta.titulo}</strong></td>
            <td>${oferta.lugar}, Cantabria</td>
            <td><span class="badge badge-${oferta.badge.toLowerCase()}">${oferta.badge}</span></td>
            <td>${oferta.contrato}</td>
            <td>${oferta.jornada}</td>
            <td>
                <button class="btn-details" onclick="showJobOnMap(${oferta.id})">
                    <i class="fas fa-map-marker-alt"></i>
                </button>
            </td>
        `;
        
        jobsTableBody.appendChild(row);
    });
}

// Función para mostrar oferta en el mapa
function showJobOnMap(jobId) {
    const oferta = ofertas.find(o => o.id === jobId);
    if (oferta) {
        // Centrar el mapa en la oferta
        map.setView(oferta.coords, 12);
        
        // Mostrar detalles
        showDetail(oferta);
        
        // Scroll al mapa
        document.querySelector('.explorer-section').scrollIntoView({ behavior: 'smooth' });
    }
}

// =========================================
// CARGAR DEMANDAS EN LA TABLA
// =========================================

function loadDemandsTable() {
    demandsTableBody.innerHTML = '';
    
    demandas.forEach(demanda => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${demanda.nombre}</td>
            <td>${demanda.apellidos}</td>
            <td><strong>${demanda.titulo}</strong></td>
            <td>${demanda.estudios.substring(0, 50)}${demanda.estudios.length > 50 ? '...' : ''}</td>
            <td>${demanda.telefono}</td>
            <td>${demanda.email}</td>
            <td>
                <button class="btn-details" onclick="showDemandDetails(${demanda.id})">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </td>
        `;
        
        demandsTableBody.appendChild(row);
    });
}

// =========================================
// MODAL DE DETALLES DE DEMANDA
// =========================================

function showDemandDetails(demandId) {
    const demanda = demandas.find(d => d.id === demandId);
    
    if (!demanda) return;
    
    const detailsContent = document.getElementById('demand-details-content');
    
    detailsContent.innerHTML = `
        <div class="detail-section">
            <h3><i class="fas fa-user"></i> Datos Personales</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Nombre Completo:</span>
                    <span class="detail-value">${demanda.nombre} ${demanda.apellidos}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">NIF/Pasaporte:</span>
                    <span class="detail-value">${demanda.nif}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Teléfono:</span>
                    <span class="detail-value">${demanda.telefono}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${demanda.email}</span>
                </div>
            </div>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Dirección:</span>
                    <span class="detail-value">${demanda.direccion}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Ciudad:</span>
                    <span class="detail-value">${demanda.ciudad}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Código Postal:</span>
                    <span class="detail-value">${demanda.cp}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Provincia:</span>
                    <span class="detail-value">${demanda.provincia}</span>
                </div>
            </div>
        </div>

        <div class="detail-section">
            <h3><i class="fas fa-briefcase"></i> Perfil Profesional</h3>
            <div class="detail-full">
                <span class="detail-label">Título:</span>
                <p class="detail-value"><strong>${demanda.titulo}</strong></p>
            </div>
            <div class="detail-full">
                <span class="detail-label">Descripción:</span>
                <p class="detail-value">${demanda.descripcion}</p>
            </div>
            <div class="detail-full">
                <span class="detail-label">Estudios Realizados:</span>
                <p class="detail-value">${demanda.estudios}</p>
            </div>
            ${demanda.presentacion ? `
            <div class="detail-full">
                <span class="detail-label">Presentación:</span>
                <p class="detail-value">${demanda.presentacion}</p>
            </div>
            ` : ''}
        </div>

        <div class="detail-section">
            <h3><i class="fas fa-file-pdf"></i> Documentación</h3>
            <a href="${demanda.cvUrl}" class="cv-download" target="_blank">
                <i class="fas fa-download"></i> Descargar Curriculum Vitae
            </a>
        </div>
    `;
    
    demandDetailsModal.style.display = 'block';
}

// Cerrar modal de detalles
closeDemandDetailsBtn.addEventListener('click', () => {
    demandDetailsModal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === demandDetailsModal) {
        demandDetailsModal.style.display = 'none';
    }
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
    
    if (filtered.length === 0) {
        document.getElementById('empty-state').innerHTML = `
            <i class="fas fa-search"></i>
            <p>No se encontraron ofertas que coincidan con los filtros</p>
        `;
    } else {
        document.getElementById('empty-state').innerHTML = `
            <i class="fas fa-search-location"></i>
            <p>Haz clic en un marcador del mapa para ver los detalles de la oferta</p>
        `;
    }
    
    document.getElementById('empty-state').style.display = 'block';
}
