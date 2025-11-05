// models/CarritoModel.js
// MODELO: Gestión del carrito de compras (persistida en backend /api/carritos)
class CarritoModel {
  constructor(api = '/api') {
    this.api = api;
    this.productos = [];              // caché de catálogo
    this.carrito = { id: null, items: [] }; // carrito completo
  }

  // ---------- helpers ----------
  _loadId() {
    const id = localStorage.getItem('carritoId');
    return id ? parseInt(id) : null;
  }
  _saveId(id) {
    localStorage.setItem('carritoId', String(id));
  }
  async _json(url, opts = {}) {
    const init = {
      headers: { 'Content-Type': 'application/json' },
      ...opts
    };
    const r = await fetch(url, init);
    let data = null;
    try { data = await r.json(); } catch { /* puede no tener body */ }
    return { ok: r.ok, status: r.status, data };
  }

  // ---------- catálogo ----------
  async getProductos(force = false) {
    if (this.productos.length && !force) return this.productos;
    const { ok, data } = await this._json(`${this.api}/productos`);
    this.productos = ok && Array.isArray(data) ? data : [];
    return this.productos;
  }

  // ---------- carrito ----------
  async _crearCarrito(pacienteId = null) {
    const body = pacienteId ? { pacienteId } : undefined;
    const { ok, data } = await this._json(`${this.api}/carritos`, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined
    });
    if (!ok || !data?.id) throw new Error('No se pudo crear el carrito');
    this._saveId(data.id);
    this.carrito = data;
    return this.carrito;
  }

  async getCarrito() {
    let id = this._loadId();
    if (!id) {
      await this._crearCarrito(); // crea vacío
      id = this._loadId();
    }
    const { ok, status, data } = await this._json(`${this.api}/carritos/${id}`);
    if (!ok) {
      // si no existe (404) → crear uno nuevo
      if (status === 404) {
        await this._crearCarrito();
        return this.carrito;
      }
      throw new Error('No se pudo obtener el carrito');
    }
    this.carrito = data;
    return this.carrito;
  }

  // POST /api/carritos/{id}/items
  async agregarAlCarrito(productoId, cantidad = 1, precioUnitario = null) {
    const carrito = await this.getCarrito();
    const body = { productoId, cantidad, precioUnitario };
    const { ok, data } = await this._json(`${this.api}/carritos/${carrito.id}/items`, {
      method: 'POST',
      body: JSON.stringify(body)
    });
    if (!ok) throw new Error('No se pudo agregar el producto');
    this.carrito = data; // backend devuelve carrito actualizado
    return this.carrito;
  }

  // DELETE /api/carritos/{id}/items/{itemId}
  async _deleteItem(itemId) {
    const id = this._loadId();
    const { ok } = await this._json(`${this.api}/carritos/${id}/items/${itemId}`, {
      method: 'DELETE'
    });
    return ok;
  }

  // aumentar: agregamos +1 (POST) porque no hay PUT de items
  async aumentarCantidad(productoId) {
    await this.agregarAlCarrito(productoId, 1, null);
    return this.carrito;
  }

  // disminuir: si el item tiene cantidad >1, lo re-creamos con cantidad-1; si es 1, lo borramos
  async disminuirCantidad(productoId) {
    const carrito = await this.getCarrito();
    const item = (carrito.items || []).find(it => it.producto?.id === productoId);
    if (!item) return carrito;

    if ((item.cantidad || 0) <= 1) {
      await this._deleteItem(item.id);
    } else {
      // borrar y volver a crear con cantidad-1 (workaround por no tener PUT)
      await this._deleteItem(item.id);
      await this.agregarAlCarrito(productoId, item.cantidad - 1, item.precioUnitario ?? null);
    }
    // refrescar carrito
    await this.getCarrito();
    return this.carrito;
  }

  // eliminar completamente un producto (todos los items de ese producto)
  async eliminarDelCarrito(productoId) {
    const carrito = await this.getCarrito();
    const items = (carrito.items || []).filter(it => it.producto?.id === productoId);
    for (const it of items) {
      await this._deleteItem(it.id);
    }
    await this.getCarrito();
    return this.carrito;
  }

  // vaciar carrito
  async vaciarCarrito() {
    const carrito = await this.getCarrito();
    for (const it of (carrito.items || [])) {
      await this._deleteItem(it.id);
    }
    await this.getCarrito();
    return this.carrito;
  }

  // ---------- totales ----------
  calcularTotal() {
    const items = this.carrito?.items || [];
    return items.reduce((acc, it) => {
      const p = Number(it.precioUnitario ?? it.producto?.precio ?? 0);
      const c = Number(it.cantidad ?? 0);
      return acc + p * c;
    }, 0);
  }

  getCantidadTotal() {
    const items = this.carrito?.items || [];
    return items.reduce((acc, it) => acc + Number(it.cantidad ?? 0), 0);
  }
}

export default CarritoModel;

