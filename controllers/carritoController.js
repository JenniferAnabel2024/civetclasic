// CONTROLADOR: Lógica del carrito de compras
class CarritoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.init();
    }

    init() {
        // Renderizar productos iniciales
        this.renderProductos();
        
        // Event listeners para botones del carrito
        $('#btn-vaciar-carrito').on('click', () => this.vaciarCarrito());
        $('#btn-finalizar-compra').on('click', () => this.finalizarCompra());
    }

    renderProductos() {
        const productos = this.model.getProductos();
        this.view.renderProductos(productos, (productoId) => this.agregarAlCarrito(productoId));
    }

    agregarAlCarrito(productoId) {
        this.model.agregarAlCarrito(productoId);
        this.actualizarCarrito();
        
        // Animación visual
        const button = $(`.btn-agregar[data-id="${productoId}"]`);
        this.view.animarAgregarCarrito(button);
    }

    aumentarCantidad(productoId) {
        this.model.aumentarCantidad(productoId);
        this.actualizarCarrito();
    }

    disminuirCantidad(productoId) {
        this.model.disminuirCantidad(productoId);
        this.actualizarCarrito();
    }

    eliminarDelCarrito(productoId) {
        this.model.eliminarDelCarrito(productoId);
        this.actualizarCarrito();
    }

    vaciarCarrito() {
        if (this.model.getCarrito().length === 0) {
            alert('El carrito ya está vacío');
            return;
        }
        
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            this.model.vaciarCarrito();
            this.actualizarCarrito();
        }
    }

    finalizarCompra() {
        const carrito = this.model.getCarrito();
        
        if (carrito.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
            return;
        }
        
        const total = this.model.calcularTotal();
        const cantidadItems = this.model.getCantidadTotal();
        
        // Mostrar mensaje de éxito
        this.view.mostrarMensajeCompra(total, cantidadItems);
        
        // Vaciar carrito después de la compra
        this.model.vaciarCarrito();
        this.actualizarCarrito();
    }

    actualizarCarrito() {
        const items = this.model.getCarrito();
        const total = this.model.calcularTotal();
        
        this.view.renderCarrito(
            items,
            (id) => this.aumentarCantidad(id),
            (id) => this.disminuirCantidad(id),
            (id) => this.eliminarDelCarrito(id)
        );
        
        this.view.actualizarTotal(total);
    }
}

export default CarritoController;
