// views/CarritoView.js
// VISTA: Renderizado del carrito de compras (con backend conectado)

class CarritoView {
  constructor() {
    this.productosContainer = $('#productos-disponibles');
    this.carritoContainer = $('#items-carrito');
    this.totalElement = $('#total-carrito');

    // ====== MAPA MANUAL DE IMÁGENES POR ID (EDITABLE) ======
    // Cambiá los nombres/paths según tus archivos reales.
    this.imageMap = {
      1: 'alimentogato.jpg',
      2: 'platomascota.webp',
      3: 'collarantipulgas.webp',
      4: 'juguetemascota.webp',
      5: 'shampoomascotal.png',
    };

    // Placeholder genérico si falta imagen
    this.placeholder = '/images/placeholder.png';
  }

  // Normaliza una ruta/URL de imagen y aplica placeholder si viene vacía
  _imgSrc(img) {
    if (!img || typeof img !== 'string' || img.trim() === '') {
      return this.placeholder;
    }
    const s = img.trim();
    if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('/')) {
      return s;
    }
    return `/images/${s}`;
  }

  // Elige la imagen para un producto: primero por id (imageMap),
  // si no, intenta producto.imagen, si no, usa placeholder
  _imageForProduct(producto) {
    const id = Number(producto?.id);
    if (!Number.isFinite(id)) return this.placeholder;
    const manual = this.imageMap[id];
    if (manual) return this._imgSrc(manual);
    if (producto?.imagen) return this._imgSrc(String(producto.imagen));
    return this.placeholder;
  }

  // Sanitiza nombre para alt/title
  _safeName(nombre) {
    if (typeof nombre !== 'string') return 'Producto';
    const s = nombre.trim();
    return s.length ? s : 'Producto';
  }

  // Renderizar productos del catálogo
  renderProductos(productos, onAgregarClick) {
    this.productosContainer.empty();

    if (!Array.isArray(productos) || productos.length === 0) {
      this.productosContainer.html('<p class="text-muted">No hay productos disponibles</p>');
      return;
    }

    productos.forEach((producto) => {
      const precioNum = Number(producto?.precio ?? 0);
      const precio = Number.isFinite(precioNum) ? precioNum : 0;

      const nombre = this._safeName(producto?.nombre);
      const imgSrc = this._imageForProduct(producto);
      const id = Number(producto?.id);

      const card = `
        <div class="col-lg-6 col-xl-4 mb-4">
          <div class="card card-paciente h-100">
            <div class="card-body d-flex flex-column">
              <div class="text-center mb-3">
                <img src="${imgSrc}"
                     alt="${nombre}"
                     class="img-fluid"
                     style="max-height: 200px; object-fit: cover;">
              </div>
              <div class="flex-grow-1">
                <h5 class="card-title mb-2" title="${nombre}">${nombre}</h5>
                <span class="badge bg-success mb-3">${(producto?.categoria || 'Producto')}</span>
                <div class="d-flex justify-content-between align-items-center">
                  <strong class="text-dark fs-4">
                    $${precio.toLocaleString('es-AR')}
                  </strong>
                </div>
              </div>
              <button class="btn btn-professional btn-lg w-100 mt-3 btn-agregar"
                      data-id="${Number.isFinite(id) ? id : ''}"
                      ${Number.isFinite(id) ? '' : 'disabled'}>
                🛒 Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      `;
      this.productosContainer.append(card);
    });

    // Listeners
    const self = this;
    $('.btn-agregar').off('click').on('click', function () {
      const val = $(this).data('id');
      const productoId = Number(val);
      if (Number.isFinite(productoId) && typeof onAgregarClick === 'function') {
        onAgregarClick(productoId);
        self.animarAgregarCarrito($(this));
      }
    });
  }

  // Renderizar carrito usando el objeto completo que devuelve el backend
  renderCarrito(carrito, productos, onAumentarClick, onDisminuirClick, onEliminarClick) {
    this.carritoContainer.empty();

    const items = Array.isArray(carrito?.items) ? carrito.items : [];
    if (items.length === 0) {
      this.carritoContainer.html('<p class="text-muted">El carrito está vacío</p>');
      this.actualizarTotal(0);
      return;
    }

    items.forEach((item) => {
      const prod = item?.producto ?? {};
      const productoId = Number(prod?.id);
      const nombre = this._safeName(prod?.nombre);

      const precioUnitNum = Number(item?.precioUnitario ?? prod?.precio ?? 0);
      const precioUnit = Number.isFinite(precioUnitNum) ? precioUnitNum : 0;

      const cantidadNum = Number(item?.cantidad ?? 0);
      const cantidad = Number.isFinite(cantidadNum) ? cantidadNum : 0;

      const subtotal = precioUnit * cantidad;

      const row = `
        <div class="carrito-item mb-3 pb-3 border-bottom">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="flex-grow-1">
              <strong>${nombre}</strong><br>
              <small class="text-muted">$${precioUnit.toLocaleString('es-AR')} c/u</small>
            </div>
            <button class="btn btn-sm btn-outline-danger btn-eliminar-item"
                    data-id="${Number.isFinite(productoId) ? productoId : ''}"
                    title="Eliminar"
                    ${Number.isFinite(productoId) ? '' : 'disabled'}>
              ❌
            </button>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group btn-group-sm" role="group">
              <button class="btn btn-dark fw-bold btn-disminuir"
                      data-id="${Number.isFinite(productoId) ? productoId : ''}"
                      ${Number.isFinite(productoId) ? '' : 'disabled'}>-</button>
              <button class="btn btn-outline-dark fw-bold" disabled>${cantidad}</button>
              <button class="btn btn-dark fw-bold btn-aumentar"
                      data-id="${Number.isFinite(productoId) ? productoId : ''}"
                      ${Number.isFinite(productoId) ? '' : 'disabled'}>+</button>
            </div>
            <strong class="text-dark">$${subtotal.toLocaleString('es-AR')}</strong>
          </div>
        </div>
      `;
      this.carritoContainer.append(row);
    });

    // Listeners
    $('.btn-aumentar').off('click').on('click', function () {
      const id = Number($(this).data('id'));
      if (Number.isFinite(id) && typeof onAumentarClick === 'function') onAumentarClick(id);
    });
    $('.btn-disminuir').off('click').on('click', function () {
      const id = Number($(this).data('id'));
      if (Number.isFinite(id) && typeof onDisminuirClick === 'function') onDisminuirClick(id);
    });
    $('.btn-eliminar-item').off('click').on('click', function () {
      const id = Number($(this).data('id'));
      if (Number.isFinite(id) && typeof onEliminarClick === 'function') onEliminarClick(id);
    });
  }

  actualizarTotal(total) {
    const n = Number(total || 0);
    this.totalElement.text(
      '$' + (Number.isFinite(n) ? n : 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })
    );
  }

  mostrarMensajeCompra(total, cantidadItems) {
    const totalNum = Number(total || 0);
    const cantNum = Number(cantidadItems || 0);

    const msg = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>¡Compra Finalizada! 🎉</strong><br>
        Has comprado ${Number.isFinite(cantNum) ? cantNum : 0} producto(s) por un total de $${(Number.isFinite(totalNum) ? totalNum : 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        <br><small>¡Gracias por tu compra!</small>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    this.carritoContainer.prepend(msg);
    setTimeout(() => $('.alert').alert('close'), 5000);
  }

  animarAgregarCarrito(button) {
    const original = button.html();
    button.html('✓ Agregado').prop('disabled', true);
    setTimeout(() => button.html(original).prop('disabled', false), 900);
  }
}

export default CarritoView;


