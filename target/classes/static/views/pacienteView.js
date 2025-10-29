// views/PacienteView.js
// VISTA: Renderizado de la interfaz de pacientes (con backend)
class PacienteView {
  constructor() {
    this.listaPacientes = $('#lista-pacientes');
  }

  // Helper para armar la URL de la imagen
  _imgSrc(img) {
    if (!img || typeof img !== 'string' || img.trim() === '') {
      return '/images/placeholder.png';
    }
    // Si ya viene con slash o esquema (http/https), úsala tal cual
    if (img.startsWith('/') || img.startsWith('http://') || img.startsWith('https://')) {
      return img;
    }
    // Si es solo el nombre (ej: 'perro.jpg'), asumimos carpeta /images
    return `/images/${img}`;
  }

  // Renderizar la lista de pacientes
  render(pacientes = []) {
    this.listaPacientes.empty();

    if (!pacientes.length) {
      this.listaPacientes.html(`
        <div class="col-12 text-center text-muted p-3">
          <p>No hay pacientes registrados. ¡Añade uno!</p>
        </div>
      `);
      return;
    }

    const html = pacientes.map((p) => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card card-paciente h-100">
          <img src="${this._imgSrc(p.imagen)}"
               class="card-img-top"
               alt="${p.nombre}"
               style="height: 300px; object-fit: contain; background: #000000;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text flex-grow-1">Especie: ${p.especie || '—'}</p>
            <div class="mt-2 d-flex justify-content-end">
              <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${p.id}">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    this.listaPacientes.html(html);
  }
}

export default PacienteView;
