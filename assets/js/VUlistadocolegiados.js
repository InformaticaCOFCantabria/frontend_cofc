// JavaScript para la página de Listado de Colegiados

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos
    const searchInput = document.getElementById('tableSearch');
    const table = document.getElementById('colegiadosTable');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const noResults = document.getElementById('noResults');
    const tableContainer = table.parentElement;

    // Función de búsqueda
    function searchTable() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleRows = 0;

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            
            if (searchTerm === '' || text.includes(searchTerm)) {
                row.style.display = '';
                visibleRows++;
            } else {
                row.style.display = 'none';
            }
        });

        // Mostrar/ocultar mensaje de "no results"
        if (visibleRows === 0) {
            tableContainer.style.display = 'none';
            noResults.classList.add('active');
        } else {
            tableContainer.style.display = 'block';
            noResults.classList.remove('active');
        }

        // Scroll al inicio de la tabla cuando se busca
        if (searchTerm !== '') {
            table.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Event listener para el input de búsqueda
    searchInput.addEventListener('keyup', searchTable);

    // Event listener para limpiar búsqueda con ESC
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchTable();
            searchInput.blur();
        }
    });

    // Enfocar automáticamente el input al cargar la página
    setTimeout(() => {
        searchInput.focus();
    }, 300);

    // Agregar efecto de highlight en las filas al pasar el mouse
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f9e8';
        });
        
        row.addEventListener('mouseleave', function() {
            if (!this.style.display || this.style.display !== 'none') {
                this.style.backgroundColor = '';
            }
        });
    });

    // Contar y mostrar número total de colegiados
    const totalColegiados = rows.length;
    console.log(`Total de colegiados en el listado: ${totalColegiados}`);

});
