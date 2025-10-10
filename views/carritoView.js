// VISTA: Renderizado del carrito de compras
class CarritoView {
    constructor() {
        this.productosContainer = $('#productos-disponibles');
        this.carritoContainer = $('#items-carrito');
        this.totalElement = $('#total-carrito');
    }

    // Renderizar productos disponibles
    renderProductos(productos, onAgregarClick) {
        this.productosContainer.empty();
        
        productos.forEach(producto => {
            const productoCard = `
                <div class="col-lg-6 col-xl-4 mb-4">
                    <div class="card card-paciente h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="text-center mb-3">
                                <span style="font-size: 4rem;">${producto.imagen}</span>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="card-title mb-2">${producto.nombre}</h5>
                                <span class="badge bg-success mb-3">${producto.categoria}</span>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <strong class="text-success fs-4">$${producto.precio.toLocaleString('es-AR')}</strong>
                                </div>
                            </div>
                            <button class="btn btn-professional btn-lg w-100 mt-3 btn-agregar" data-id="${producto.id}">
                                🛒 Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            `;
            this.productosContainer.append(productoCard);
        });

        // Agregar event listeners
        $('.btn-agregar').on('click', function() {
            const productoId = parseInt($(this).data('id'));
            onAgregarClick(productoId);
        });
    }

    // Renderizar items del carrito
    renderCarrito(items, onAumentarClick, onDisminuirClick, onEliminarClick) {
        this.carritoContainer.empty();
        
        if (items.length === 0) {
            this.carritoContainer.html('<p class="text-muted">El carrito está vacío</p>');
            return;
        }

        items.forEach(item => {
            const itemElement = `
                <div class="carrito-item mb-3 pb-3 border-bottom">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="flex-grow-1">
                            <strong>${item.producto.nombre}</strong>
                            <br>
                            <small class="text-muted">$${item.producto.precio.toLocaleString('es-AR')} c/u</small>
                        </div>
                        <button class="btn btn-sm btn-delete btn-eliminar-item" data-id="${item.producto.id}" title="Eliminar">
                            ❌
                        </button>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group btn-group-sm" role="group">
                            <button class="btn btn-outline-secondary btn-disminuir" data-id="${item.producto.id}">-</button>
                            <button class="btn btn-outline-secondary" disabled>${item.cantidad}</button>
                            <button class="btn btn-outline-secondary btn-aumentar" data-id="${item.producto.id}">+</button>
                        </div>
                        <strong class="text-success">$${(item.producto.precio * item.cantidad).toLocaleString('es-AR')}</strong>
                    </div>
                </div>
            `;
            this.carritoContainer.append(itemElement);
        });

        // Event listeners para botones del carrito
        $('.btn-aumentar').on('click', function() {
            const productoId = parseInt($(this).data('id'));
            onAumentarClick(productoId);
        });

        $('.btn-disminuir').on('click', function() {
            const productoId = parseInt($(this).data('id'));
            onDisminuirClick(productoId);
        });

        $('.btn-eliminar-item').on('click', function() {
            const productoId = parseInt($(this).data('id'));
            onEliminarClick(productoId);
        });
    }

    // Actualizar total
    actualizarTotal(total) {
        this.totalElement.text('$' + total.toLocaleString('es-AR', { minimumFractionDigits: 2 }));
    }

    // Mostrar mensaje de compra finalizada
    mostrarMensajeCompra(total, cantidadItems) {
        const mensaje = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>¡Compra Finalizada! 🎉</strong>
                <br>
                Has comprado ${cantidadItems} producto(s) por un total de $${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                <br>
                <small>¡Gracias por tu compra!</small>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        $('#module-contacto').prepend(mensaje);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            $('.alert').alert('close');
        }, 5000);
    }

    // Mostrar animación al agregar al carrito
    animarAgregarCarrito(button) {
        const originalText = button.html();
        button.html('✓ Agregado').prop('disabled', true);
        
        setTimeout(() => {
            button.html(originalText).prop('disabled', false);
        }, 1000);
    }
}

export default CarritoView;
