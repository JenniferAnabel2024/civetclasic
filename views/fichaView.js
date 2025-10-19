// VISTA: Renderizado de la interfaz de fichas médicas
class FichaView {
    constructor() {
        this.listaFichas = $('#lista-fichas');
        this.paginacion = $('#paginacion-fichas');
        this.currentPage = 1;
        this.itemsPerPage = 6; // 6 fichas por página
        this.allFichas = [];
    }

    // Renderizar la lista de fichas con paginación
    render(fichas) {
        this.allFichas = fichas;
        this.renderPage(this.currentPage);
        this.renderPagination();
    }

    renderPage(page) {
        this.currentPage = page;
        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const fichasToShow = this.allFichas.slice(start, end);

        this.listaFichas.empty(); // Limpiar la lista

        if (fichasToShow.length === 0) {
            this.listaFichas.html('<div class="col-12"><p>No hay fichas médicas registradas. ¡Añade una!</p></div>');
            return;
        }

        fichasToShow.forEach((ficha, index) => {
            const globalIndex = start + index; // Índice global para eliminar
            const fichaCardHtml = `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card card-ficha h-100">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">Consulta - ${ficha.fecha}</h5>
                            <p class="card-text"><strong>Paciente:</strong> ${ficha.nombrePaciente}</p>
                            <p class="card-text"><strong>Médico:</strong> ${ficha.nombreMedico}</p>
                            <p class="card-text"><strong>Diagnóstico:</strong> ${ficha.diagnostico}</p>
                            <p class="card-text"><strong>Tratamiento:</strong> ${ficha.tratamiento}</p>
                            <p class="card-text text-success"><strong>Costo:</strong> $${ficha.costo.toFixed(2)}</p>
                            <div class="mt-auto">
                                <button class="btn btn-sm btn-warning me-2" data-edit="${globalIndex}">Editar</button>
                                <button class="btn btn-sm btn-delete" data-id="${globalIndex}">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            this.listaFichas.append(fichaCardHtml);
        });
    }

    renderPagination() {
        const totalPages = Math.ceil(this.allFichas.length / this.itemsPerPage);
        this.paginacion.empty();

        if (totalPages <= 1) return;

        let paginationHtml = '<nav><ul class="pagination">';

        // Anterior
        paginationHtml += `<li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${this.currentPage - 1}">Anterior</a>
        </li>`;

        // Páginas
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li class="page-item ${i === this.currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>`;
        }

        // Siguiente
        paginationHtml += `<li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${this.currentPage + 1}">Siguiente</a>
        </li>`;

        paginationHtml += '</ul></nav>';
        this.paginacion.html(paginationHtml);
    }

    setPage(page) {
        if (page >= 1 && page <= Math.ceil(this.allFichas.length / this.itemsPerPage)) {
            this.renderPage(page);
            this.renderPagination();
        }
    }
}

export default FichaView;