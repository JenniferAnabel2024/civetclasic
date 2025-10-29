// controllers/CarritoController.js
// CONTROLADOR: Lógica del carrito de compras (con backend)
class CarritoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  async init() {
    // Renderizar productos iniciales
    await this.renderProductos();

    // Event listeners
    $('#btn-vaciar-carrito').on('click', () => this.vaciarCarrito());
    $('#btn-finalizar-compra').on('click', () => this.finalizarCompra());

    // Render inicial del carrito
    await this.actualizarCarrito();
  }

  // =======================
  // RENDERIZADO DE PRODUCTOS
  // =======================
  async renderProductos() {
    const productos = await this.model.getProductos();
    this.view.renderProductos(productos, (productoId) => this.agregarAlCarrito(productoId));
  }

  // =======================
  // OPERACIONES CRUD
  // =======================
  async agregarAlCarrito(productoId) {
    await this.model.agregarAlCarrito(productoId);
    await this.actualizarCarrito();

    // Animación visual
    const button = $(`.btn-agregar[data-id="${productoId}"]`);
    this.view.animarAgregarCarrito(button);
  }

  async aumentarCantidad(productoId) {
    await this.model.aumentarCantidad(productoId);
    await this.actualizarCarrito();
  }

  async disminuirCantidad(productoId) {
    await this.model.disminuirCantidad(productoId);
    await this.actualizarCarrito();
  }

  async eliminarDelCarrito(productoId) {
    await this.model.eliminarDelCarrito(productoId);
    await this.actualizarCarrito();
  }

  async vaciarCarrito() {
    const carrito = await this.model.getCarrito();
    if (carrito.length === 0) {
      alert('El carrito ya está vacío');
      return;
    }

    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      await this.model.vaciarCarrito();
      await this.actualizarCarrito();
    }
  }

  async finalizarCompra() {
    const carrito = await this.model.getCarrito();

    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }

    const total = this.model.calcularTotal();
    const cantidadItems = this.model.getCantidadTotal();

    // Mostrar mensaje de éxito
    this.view.mostrarMensajeCompra(total, cantidadItems);

    // Vaciar carrito después de la compra
    await this.model.vaciarCarrito();
    await this.actualizarCarrito();
  }

  // =======================
  // RENDERIZADO DE CARRITO
  // =======================
  async actualizarCarrito() {
    const items = await this.model.getCarrito();
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
