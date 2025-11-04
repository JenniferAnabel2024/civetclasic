// views/CarritoView.js
// VISTA: Renderizado del carrito de compras (con backend conectado)
class CarritoView {
  constructor() {
    this.productosContainer = $('#productos-disponibles');
    this.carritoContainer = $('#items-carrito');
    this.totalElement = $('#total-carrito');
  }

  // Renderizar productos del catálogo
  renderProductos(productos, onAgregarClick) {
    this.productosContainer.empty();

    if (!productos.length) {
      this.productosContainer.html('<p class="text-muted">No hay productos disponibles</p>');
      return;
    }

    productos.forEach((producto) => {
      const precio = Number(producto.precio || 0);
      const card = `
        <div class="col-lg-6 col-xl-4 mb-4">
          <div class="card card-paciente h-100">
            <div class="card-body d-flex flex-column">
              <div class="text-center mb-3">
                <img src="${producto.imagen || '/images/placeholder.png'}"
                     alt="${producto.nombre}"
                     class="img-fluid"
                     style="max-height: 200px; object-fit: cover;">
              </div>
              <div class="flex-grow-1">
                <h5 class="card-title mb-2">${producto.nombre}</h5>
                <span class="badge bg-success mb-3">${producto.categoria || 'Producto'}</span>
                <div class="d-flex justify-content-between align-items-center">
                  <strong class="text-dark fs-4">
                    $${precio.toLocaleString('es-AR')}
                  </strong>
                </div>
              </div>
              <button class="btn btn-professional btn-lg w-100 mt-3 btn-agregar"
                      data-id="${producto.id}">
                🛒 Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      `;
      this.productosContainer.append(card);
    });

    $('.btn-agregar').off('click').on('click', function () {
      const productoId = parseInt($(this).data('id'));
      if (!isNaN(productoId)) onAgregarClick(productoId);
    });
  }

  // Renderizar carrito usando el objeto completo que devuelve el backend
  renderCarrito(carrito, productos, onAumentarClick, onDisminuirClick, onEliminarClick) {
    this.carritoContainer.empty();

    const items = carrito?.items || [];
    if (!items.length) {
      this.carritoContainer.html('<p class="text-muted">El carrito está vacío</p>');
      this.actualizarTotal(0);
      return;
    }

    items.forEach((item) => {
      const prod = item.producto || {};
      const productoId = prod.id;
      const nombre = prod.nombre || 'Producto';
      const precioUnit = Number(item.precioUnitario ?? prod.precio ?? 0);
      const cantidad = Number(item.cantidad ?? 0);
      const subtotal = precioUnit * cantidad;

      const row = `
        <div class="carrito-item mb-3 pb-3 border-bottom">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="flex-grow-1">
              <strong>${nombre}</strong><br>
              <small class="text-muted">$${precioUnit.toLocaleString('es-AR')} c/u</small>
            </div>
            <button class="btn btn-sm btn-outline-danger btn-eliminar-item"
                    data-id="${productoId}" title="Eliminar">
              ❌
            </button>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group btn-group-sm" role="group">
              <button class="btn btn-dark fw-bold btn-disminuir" data-id="${productoId}">-</button>
              <button class="btn btn-outline-dark fw-bold" disabled>${cantidad}</button>
              <button class="btn btn-dark fw-bold btn-aumentar" data-id="${productoId}">+</button>
            </div>
            <strong class="text-dark">$${subtotal.toLocaleString('es-AR')}</strong>
          </div>
        </div>
      `;
      this.carritoContainer.append(row);
    });

    // Listeners
    $('.btn-aumentar').off('click').on('click', function () {
      const id = parseInt($(this).data('id'));
      if (!isNaN(id)) onAumentarClick(id);
    });
    $('.btn-disminuir').off('click').on('click', function () {
      const id = parseInt($(this).data('id'));
      if (!isNaN(id)) onDisminuirClick(id);
    });
    $('.btn-eliminar-item').off('click').on('click', function () {
      const id = parseInt($(this).data('id'));
      if (!isNaN(id)) onEliminarClick(id);
    });
  }

  actualizarTotal(total) {
    this.totalElement.text(
      '$' + Number(total || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })
    );
  }

  mostrarMensajeCompra(total, cantidadItems) {
    const msg = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>¡Compra Finalizada! 🎉</strong><br>
        Has comprado ${cantidadItems} producto(s) por un total de $${Number(total || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
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

