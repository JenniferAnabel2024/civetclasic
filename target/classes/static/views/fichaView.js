// VISTA: Renderizado de la interfaz de fichas médicas (con backend)
class FichaView {
  constructor() {
    this.listaFichas = $('#lista-fichas');
    this.paginacion = $('#paginacion-fichas');
    this.currentPage = 1;
    this.itemsPerPage = 6; // 6 fichas por página
    this.allFichas = [];
  }

  // Renderizar la lista completa con paginación
  render(fichas = []) {
    this.allFichas = fichas;
    this.currentPage = 1;
    this.renderPage(1);
    this.renderPagination();
  }

  // Renderiza una página específica
  renderPage(page) {
    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const fichasToShow = this.allFichas.slice(start, end);

    this.listaFichas.empty();

    if (!fichasToShow.length) {
      this.listaFichas.html(
        `<div class="col-12 text-center text-muted p-3">
          <p>No hay fichas médicas registradas. ¡Añade una nueva ficha!</p>
        </div>`
      );
      return;
    }

    fichasToShow.forEach((ficha) => {
      const fichaHtml = `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card card-ficha h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Consulta - ${ficha.fecha || 'Sin fecha'}</h5>
              <p><strong>Paciente:</strong> ${ficha.nombrePaciente || 'Sin asignar'}</p>
              <p><strong>Médico:</strong> ${ficha.nombreMedico || 'N/D'}</p>
              <p><strong>Diagnóstico:</strong> ${ficha.diagnostico || ficha.sintomas || 'N/A'}</p>
              <p><strong>Tratamiento:</strong> ${ficha.tratamiento || ficha.observaciones || 'N/A'}</p>
              <p class="text-success"><strong>Costo:</strong> $${(ficha.costo || 0).toFixed(2)}</p>
              <div class="mt-auto d-flex justify-content-between">
                <button class="btn btn-sm btn-warning btn-edit" data-edit="${ficha.id}">
                  ✏️ Editar
                </button>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${ficha.id}">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      this.listaFichas.append(fichaHtml);
    });
  }

  // Renderiza la barra de paginación
  renderPagination() {
    const totalPages = Math.ceil(this.allFichas.length / this.itemsPerPage);
    this.paginacion.empty();

    if (totalPages <= 1) return;

    let html = '<nav><ul class="pagination justify-content-center">';

    // Botón anterior
    html += `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${this.currentPage - 1}">Anterior</a>
      </li>`;

    // Números de página
    for (let i = 1; i <= totalPages; i++) {
      html += `
        <li class="page-item ${i === this.currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>`;
    }

    // Botón siguiente
    html += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${this.currentPage + 1}">Siguiente</a>
      </li>`;

    html += '</ul></nav>';

    this.paginacion.html(html);

    // Event listeners para cambiar página
    this.paginacion.find('.page-link').off('click').on('click', (e) => {
      e.preventDefault();
      const newPage = parseInt($(e.target).data('page'));
      if (!isNaN(newPage)) this.setPage(newPage);
    });
  }

  // Cambiar de página
  setPage(page) {
    const totalPages = Math.ceil(this.allFichas.length / this.itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      this.renderPage(page);
      this.renderPagination();
    }
  }
}

export default FichaView;
