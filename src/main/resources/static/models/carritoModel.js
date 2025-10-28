// models/CarritoModel.js
// MODELO: Gestión del carrito de compras (persistido en backend)
class CarritoModel {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
    this.productos = []; // caché catálogo
    this.carrito = [];   // caché carrito
  }

  // =======================
  // Catálogo de productos
  // =======================
  async getProductos(force = false) {
    if (this.productos.length && !force) return this.productos;
    const r = await fetch(`${this.baseUrl}/productos`);
    this.productos = r.ok ? await r.json() : [];
    return this.productos;
  }

  // =======================
  // Carrito (CRUD en backend)
  // =======================
  async getCarrito() {
    const r = await fetch(`${this.baseUrl}/carrito`);
    this.carrito = r.ok ? await r.json() : [];
    return this.carrito;
  }

  async _postItem({ producto, cantidad, precioUnitario }) {
    const r = await fetch(`${this.baseUrl}/carrito`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto, cantidad, precioUnitario })
    });
    return r.ok ? r.json() : null;
  }

  async _putItem(id, body) {
    const r = await fetch(`${this.baseUrl}/carrito/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return r.ok;
  }

  async _deleteItem(id) {
    const r = await fetch(`${this.baseUrl}/carrito/${id}`, { method: 'DELETE' });
    return r.ok;
  }

  _findItemByNombre(nombre) {
    return this.carrito.find(it => it.producto === nombre);
  }

  // =======================
  // Operaciones de carrito
  // =======================

  // Agregar producto por ID del catálogo
  async agregarAlCarrito(productoId) {
    const productos = await this.getProductos();
    const prod = productos.find(p => p.id === productoId);
    if (!prod) return;

    await this.getCarrito();
    const existente = this._findItemByNombre(prod.nombre);

    if (existente) {
      const ok = await this._putItem(existente.id, {
        producto: existente.producto,
        cantidad: (existente.cantidad || 0) + 1,
        precioUnitario: existente.precioUnitario
      });
      if (ok) await this.getCarrito();
      return;
    }

    const creado = await this._postItem({
      producto: prod.nombre,           // el backend guarda el nombre como string
      cantidad: 1,
      precioUnitario: prod.precio
    });
    if (creado) await this.getCarrito();
  }

  // Eliminar un producto del carrito por ID del catálogo
  async eliminarDelCarrito(productoId) {
    const productos = await this.getProductos();
    const prod = productos.find(p => p.id === productoId);
    if (!prod) return;

    await this.getCarrito();
    const existente = this._findItemByNombre(prod.nombre);
    if (existente && await this._deleteItem(existente.id)) {
      await this.getCarrito();
    }
  }

  // Aumentar cantidad por ID del catálogo
  async aumentarCantidad(productoId) {
    const productos = await this.getProductos();
    const prod = productos.find(p => p.id === productoId);
    if (!prod) return;

    await this.getCarrito();
    const it = this._findItemByNombre(prod.nombre);
    if (!it) return;

    const ok = await this._putItem(it.id, {
      producto: it.producto,
      cantidad: (it.cantidad || 0) + 1,
      precioUnitario: it.precioUnitario
    });
    if (ok) await this.getCarrito();
  }

  // Disminuir cantidad por ID del catálogo
  async disminuirCantidad(productoId) {
    const productos = await this.getProductos();
    const prod = productos.find(p => p.id === productoId);
    if (!prod) return;

    await this.getCarrito();
    const it = this._findItemByNombre(prod.nombre);
    if (!it) return;

    const nueva = (it.cantidad || 0) - 1;
    if (nueva <= 0) {
      if (await this._deleteItem(it.id)) await this.getCarrito();
      return;
    }

    const ok = await this._putItem(it.id, {
      producto: it.producto,
      cantidad: nueva,
      precioUnitario: it.precioUnitario
    });
    if (ok) await this.getCarrito();
  }

  // Vaciar carrito
  async vaciarCarrito() {
    await this.getCarrito();
    for (const it of this.carrito) {
      await this._deleteItem(it.id);
    }
    await this.getCarrito();
  }

  // =======================
  // Totales (sobre caché)
  // =======================
  calcularTotal() {
    return (this.carrito || []).reduce((total, it) =>
      total + Number(it.precioUnitario || 0) * Number(it.cantidad || 0), 0);
  }

  getCantidadTotal() {
    return (this.carrito || []).reduce((acc, it) => acc + Number(it.cantidad || 0), 0);
  }
}

export default CarritoModel;
