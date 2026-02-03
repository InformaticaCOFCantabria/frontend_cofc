// =========================================
// JAVASCRIPT PARA FARMACIAS Y BOTIQUINES
// =========================================

// Datos de farmacias (EJEMPLO - Reemplaza con tus datos reales)
const farmaciasData = [
    {
        nombre: "AGUSTÍN ÁLVAREZ, EDUARDO",
        numero: "249",
        direccion: "C/ RUALASAL, 1 - SANTANDER - 39002 - CANTABRIA",
        telefono: "942214455"
    },
    {
        nombre: "AISA MARURI, JON ANDER",
        numero: "203",
        direccion: "AV. GENERAL DÁVILA, 73 - SANTANDER - 39006 - CANTABRIA",
        telefono: "942278844"
    },
    {
        nombre: "ALBA RODRÍGUEZ, ANA EULALIA",
        numero: "257",
        direccion: "C/ JOAQUÍN COSTA, 11 - TORRELAVEGA - 39300 - CANTABRIA",
        telefono: "942880033"
    },
    {
        nombre: "ÁLVAREZ BLANCO, NATIVIDAD",
        numero: "421",
        direccion: "C/ MARQUÉS DE LA HERMIDA, 15 - SANTANDER - 39009 - CANTABRIA",
        telefono: "942231122"
    },
    {
        nombre: "BELTRÁN PIÑEIRO, LUIS",
        numero: "23",
        direccion: "C/ CASTILLA, 15 - SANTANDER - 39009 - CANTABRIA",
        telefono: "942232907"
    },
    // Añade el resto de tus farmacias aquí...
];

// Datos de botiquines (EJEMPLO - Reemplaza con tus datos reales)
const botiquinesData = [
    {
        nombre: "BOTIQUÍN AMPARO GONZÁLEZ GONZÁLEZ",
        direccion: "BO. CARANCEJA, S/N - CARANCEJA REOCÍN - 39530 - CANTABRIA",
        telefono: "942832088"
    },
    {
        nombre: "BOTIQUÍN ELENA DE LA ROZA LÓPEZ",
        direccion: "C/ CALVO SOTELO, 15 - VILLANUEVA DE VILLAESCUSA - 39690 - CANTABRIA",
        telefono: "942520144"
    },
    {
        nombre: "BOTIQUÍN ESPERANZA VALLE DÍAZ",
        direccion: "C/ GENERAL MOLA, 18 - LIÉRGANES - 39722 - CANTABRIA",
        telefono: "942528035"
    },
    {
        nombre: "BOTIQUÍN MARIA JESÚS SÁINZ-PARDO GÓMEZ",
        direccion: "C/ FUENTE, 21 - PUENTE VIESGO - 39670 - CANTABRIA",
        telefono: "942598015"
    },
    {
        nombre: "BOTIQUÍN MARÍA DEL CARMEN LÓPEZ ANGULO",
        direccion: "C/ BARRIO ARRIBA, 1 - SUANCES - 39340 - CANTABRIA",
        telefono: "942810150"
    },
    {
        nombre: "BOTIQUÍN MARÍA TERESA SAÍNZ OLAVARRÍA",
        direccion: "BO. LAS ESCUELAS, S/N - COTILLO DE ANIEVAS - 39451 - CANTABRIA",
        telefono: "672327755"
    },
    {
        nombre: "BOTIQUÍN PILAR LÓPEZ GONZÁLEZ",
        direccion: "C/ CANTABRIA, 69 - SAN FELICES DE BUELNA - 39410 - CANTABRIA",
        telefono: "942821043"
    },
    {
        nombre: "BOTIQUÍN SILVIA GUTIÉRREZ COSÍO",
        direccion: "BO. SANTIURDE, 12 - SANTIURDE DE REINOSA - 39490 - CANTABRIA",
        telefono: "Sin teléfono"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    
    // Referencias a elementos
    const searchInput = document.getElementById('globalSearch');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const farmaciasGrid = document.getElementById('farmacias-grid');
    const botiquinesGrid = document.getElementById('botiquines-grid');
    const noResultsFarmacias = document.getElementById('noResultsFarmacias');
    const noResultsBotiquines = document.getElementById('noResultsBotiquines');

    // Actualizar contadores
    document.getElementById('farmacias-count').textContent = farmaciasData.length;
    document.getElementById('botiquines-count').textContent = botiquinesData.length;
    document.getElementById('total-farmacias').textContent = farmaciasData.length;
    document.getElementById('total-botiquines').textContent = botiquinesData.length;

    // Función para crear tarjeta de farmacia
    function createFarmaciaCard(farmacia) {
        return `
            <div class="item-card farmacia-item">
                <div class="item-header">
                    <div class="item-icon">
                        <i class="fas fa-pills"></i>
                    </div>
                    <div class="item-title">
                        <h4>${farmacia.nombre}</h4>
                        <span class="item-number">Nº ${farmacia.numero}</span>
                    </div>
                </div>
                <div class="item-details">
                    <div class="detail-row">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${farmacia.direccion}</span>
                    </div>
                    ${farmacia.telefono !== 'Sin teléfono' ? `
                    <div class="detail-row">
                        <i class="fas fa-phone"></i>
                        <a href="tel:${farmacia.telefono}">${farmacia.telefono}</a>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Función para crear tarjeta de botiquín
    function createBotiquinCard(botiquin) {
        return `
            <div class="item-card botiquin-item">
                <div class="item-header">
                    <div class="item-icon">
                        <i class="fas fa-first-aid"></i>
                    </div>
                    <div class="item-title">
                        <h4>${botiquin.nombre}</h4>
                    </div>
                </div>
                <div class="item-details">
                    <div class="detail-row">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${botiquin.direccion}</span>
                    </div>
                    ${botiquin.telefono !== 'Sin teléfono' ? `
                    <div class="detail-row">
                        <i class="fas fa-phone"></i>
                        <a href="tel:${botiquin.telefono}">${botiquin.telefono}</a>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Renderizar farmacias
    function renderFarmacias(data = farmaciasData) {
        if (data.length === 0) {
            farmaciasGrid.style.display = 'none';
            noResultsFarmacias.classList.add('active');
        } else {
            farmaciasGrid.style.display = 'grid';
            noResultsFarmacias.classList.remove('active');
            farmaciasGrid.innerHTML = data.map(f => createFarmaciaCard(f)).join('');
        }
    }

    // Renderizar botiquines
    function renderBotiquines(data = botiquinesData) {
        if (data.length === 0) {
            botiquinesGrid.style.display = 'none';
            noResultsBotiquines.classList.add('active');
        } else {
            botiquinesGrid.style.display = 'grid';
            noResultsBotiquines.classList.remove('active');
            botiquinesGrid.innerHTML = data.map(b => createBotiquinCard(b)).join('');
        }
    }

    // Inicializar con todos los datos
    renderFarmacias();
    renderBotiquines();

    // Función de búsqueda
    function searchItems() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Filtrar farmacias
        const filteredFarmacias = farmaciasData.filter(farmacia => {
            return farmacia.nombre.toLowerCase().includes(searchTerm) ||
                   farmacia.direccion.toLowerCase().includes(searchTerm) ||
                   farmacia.telefono.includes(searchTerm) ||
                   farmacia.numero.includes(searchTerm);
        });

        // Filtrar botiquines
        const filteredBotiquines = botiquinesData.filter(botiquin => {
            return botiquin.nombre.toLowerCase().includes(searchTerm) ||
                   botiquin.direccion.toLowerCase().includes(searchTerm) ||
                   botiquin.telefono.includes(searchTerm);
        });

        // Actualizar contadores
        document.getElementById('farmacias-count').textContent = filteredFarmacias.length;
        document.getElementById('botiquines-count').textContent = filteredBotiquines.length;

        // Renderizar resultados filtrados
        renderFarmacias(filteredFarmacias);
        renderBotiquines(filteredBotiquines);
    }

    // Event listener para búsqueda
    searchInput.addEventListener('keyup', searchItems);

    // Event listener para limpiar búsqueda con ESC
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchItems();
            searchInput.blur();
        }
    });

    // Cambio de pestañas
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Enfocar automáticamente el input al cargar la página
    setTimeout(() => {
        searchInput.focus();
    }, 300);

    // Efecto hover en las tarjetas
    function addHoverEffects() {
        const cards = document.querySelectorAll('.item-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f0f9e8';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'white';
            });
        });
    }

    // Aplicar efectos después de renderizar
    setTimeout(addHoverEffects, 100);

    // Actualizar efectos después de cada búsqueda
    searchInput.addEventListener('keyup', function() {
        setTimeout(addHoverEffects, 100);
    });

    console.log(`✅ Página cargada correctamente`);
    console.log(`📊 Total Farmacias: ${farmaciasData.length}`);
    console.log(`📊 Total Botiquines: ${botiquinesData.length}`);
});

// INSTRUCCIONES PARA AÑADIR TUS DATOS REALES:
// ============================================
//
// 1. Reemplaza el array 'farmaciasData' con tus datos completos de farmacias
//    El formato debe ser:
//    {
//        nombre: "NOMBRE COMPLETO DEL FARMACÉUTICO",
//        numero: "123",  // Número de farmacia
//        direccion: "Dirección completa",
//        telefono: "942XXXXXX"  // o "Sin teléfono"
//    }
//
// 2. Reemplaza el array 'botiquinesData' con tus datos completos de botiquines
//    El formato debe ser:
//    {
//        nombre: "BOTIQUÍN NOMBRE DEL TITULAR",
//        direccion: "Dirección completa",
//        telefono: "942XXXXXX"  // o "Sin teléfono"
//    }
//
// 3. Los datos se pueden extraer de los archivos HTML originales
//    o de una base de datos si la tienes
//
// 4. Para facilitar la extracción, puedes usar expresiones regulares
//    o copiar/pegar desde los archivos HTML originales
//
// 5. Una vez añadidos todos los datos, los contadores y la búsqueda
//    funcionarán automáticamente