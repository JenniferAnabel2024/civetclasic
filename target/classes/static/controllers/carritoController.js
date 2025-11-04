// controllers/CarritoController.js
// CONTROLADOR: Lógica del carrito de compras (con backend)
class CarritoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  async init() {
    await this.renderProductos();

    $('#btn-vaciar-carrito').on('click', () => this.vaciarCarrito());
    $('#btn-finalizar-compra').on('click', () => this.finalizarCompra());

    await this.actualizarCarrito();
  }

  // ---------- productos ----------
  async renderProductos() {
    const productos = await this.model.getProductos();
    this.view.renderProductos(productos, (productoId) => this.agregarAlCarrito(productoId));
  }

  // ---------- CRUD carrito ----------
  async agregarAlCarrito(productoId) {
    await this.model.agregarAlCarrito(productoId);
    await this.actualizarCarrito();

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
    if (!carrito.items || carrito.items.length === 0) {
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
    if (!carrito.items || carrito.items.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }

    const total = this.model.calcularTotal();
    const cantidadItems = this.model.getCantidadTotal();

    this.view.mostrarMensajeCompra(total, cantidadItems);

    await this.model.vaciarCarrito();
    await this.actualizarCarrito();
  }

  // ---------- render ----------
  async actualizarCarrito() {
    const [carrito, productos] = await Promise.all([
      this.model.getCarrito(),
      this.model.getProductos()
    ]);

    const total = this.model.calcularTotal();

    this.view.renderCarrito(
      carrito,    // 👈 objeto completo
      productos,
      (id) => this.aumentarCantidad(id),
      (id) => this.disminuirCantidad(id),
      (id) => this.eliminarDelCarrito(id)
    );

    this.view.actualizarTotal(total);
    console.log('🧾 Carrito actualizado:', carrito);
  }
}

export default CarritoController;

