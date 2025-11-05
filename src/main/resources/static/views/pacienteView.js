

class PacienteView {
  /**
   * @param {string|jQuery} containerSelector - selector o jQuery del contenedor de tarjetas
   */
  constructor(containerSelector = '#lista-pacientes') {
    // Validar jQuery disponible
    if (typeof $ !== 'function') {
      throw new Error('jQuery ($) no está disponible en esta página.');
    }

    // Permite pasar un selector o un objeto jQuery
    this.listaPacientes = containerSelector && containerSelector.jquery
      ? containerSelector
      : $(containerSelector);

    if (!this.listaPacientes || this.listaPacientes.length === 0) {
      throw new Error(
        'No se encontró el contenedor para la lista de pacientes. ' +
        'Verifica que exista un elemento con el selector provisto.'
      );
    }

    this.FALLBACK_IMG = '/images/animales.webp'; // ← tu imagen genérica
  }

  // ---- Helpers de seguridad y formato --------------------------------------

  /**
   * Escapa caracteres peligrosos para evitar inyección en HTML
   * @param {any} value
   * @returns {string}
   */
  _escape(value) {
    const s = (value ?? '').toString();
    return s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  /**
   * Normaliza/valida la ruta de imagen y aplica fallback.
   * - Si no hay imagen → usa genérica.
   * - Si viene absoluta o con esquema http(s) → la usa tal cual.
   * - Si es nombre simple → asume /images/<nombre>
   * @param {any} img
   * @returns {string}
   */
  _imgSrc(img) {
    if (!img || typeof img !== 'string' || img.trim() === '') {
      return this.FALLBACK_IMG;
    }
    const val = img.trim();
    if (val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://')) {
      return val;
    }
    return `/images/${val}`;
  }

  /**
   * Convierte un ítem (posible paciente) en un objeto seguro y tipado mínimo.
   * Filtra/normaliza campos esperados.
   * @param {any} raw
   * @returns {{id:string, nombre:string, especie:string, imagen:string}}
   */
  _normalizePaciente(raw) {
    const id = raw?.id ?? '';
    const nombre = this._escape(raw?.nombre ?? 'Sin nombre');
    const especie = this._escape(raw?.especie ?? '—');
    const imagen = this._imgSrc(raw?.imagen);
    return { id, nombre, especie, imagen };
  }

  /**
   * Construye el HTML de la card (ya con datos saneados)
   * Nota: onerror fuerza fallback si la imagen remota falla.
   * @param {{id:any, nombre:string, especie:string, imagen:string}} p
   * @returns {string}
   */
  _cardHtml(p) {
    const safeId = this._escape(p.id);
    return `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card card-paciente h-100">
          <img
            src="${p.imagen}"
            class="card-img-top"
            alt="${p.nombre}"
            loading="lazy"
            onerror="this.onerror=null;this.src='${this.FALLBACK_IMG}';"
            style="height: 215px; object-fit: contain; background: #000;"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text flex-grow-1">Especie: ${p.especie}</p>
            <div class="mt-2 d-flex justify-content-end">
              <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${safeId}">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ---- Render principal -----------------------------------------------------

  /**
   * Renderiza la grilla de pacientes
   * @param {Array<any>} pacientes
   */
  render(pacientes = []) {
    // Limpiar contenedor
    this.listaPacientes.empty();

    // Validar tipo
    if (!Array.isArray(pacientes)) {
      this.listaPacientes.html(`
        <div class="col-12 text-center text-danger p-3">
          <p>Formato de datos inválido: se esperaba una lista de pacientes.</p>
        </div>
      `);
      return;
    }

    if (pacientes.length === 0) {
      this.listaPacientes.html(`
        <div class="col-12 text-center text-muted p-3">
          <p>No hay pacientes registrados. ¡Añade uno!</p>
        </div>
      `);
      return;
    }

    // Normalizar + render
    const html = pacientes
      .map((raw) => this._normalizePaciente(raw))
      .map((p) => this._cardHtml(p))
      .join('');

    this.listaPacientes.html(html);
  }
}

export default PacienteView;

