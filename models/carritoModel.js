// MODELO: Gestión del carrito de compras
class CarritoModel {
    constructor() {
        // Productos disponibles en la tienda
        this.productos = [
            { id: 1, nombre: 'Alimento Premium Perro 15kg', precio: 12500, imagen: '🐕', categoria: 'Alimento' },
            { id: 2, nombre: 'Alimento Premium Gato 7.5kg', precio: 8900, imagen: '🐈', categoria: 'Alimento' },
            { id: 3, nombre: 'Arena Sanitaria 10kg', precio: 3200, imagen: '📦', categoria: 'Higiene' },
            { id: 4, nombre: 'Collar Antipulgas', precio: 2100, imagen: '⭕', categoria: 'Salud' },
            { id: 5, nombre: 'Juguete Interactivo', precio: 1500, imagen: '🎾', categoria: 'Juguetes' },
            { id: 6, nombre: 'Cama Mascota Grande', precio: 8500, imagen: '🛏️', categoria: 'Accesorios' },
            { id: 7, nombre: 'Shampoo Medicado 500ml', precio: 1800, imagen: '🧴', categoria: 'Higiene' },
            { id: 8, nombre: 'Plato Doble Acero Inox', precio: 2400, imagen: '🍽️', categoria: 'Accesorios' }
        ];
        
        // Items en el carrito (cada item tiene: producto + cantidad)
        this.carrito = [];
    }

    // Obtener todos los productos
    getProductos() {
        return this.productos;
    }

    // Obtener items del carrito
    getCarrito() {
        return this.carrito;
    }

    // Agregar producto al carrito
    agregarAlCarrito(productoId) {
        const producto = this.productos.find(p => p.id === productoId);
        if (!producto) return;

        // Verificar si ya está en el carrito
        const itemExistente = this.carrito.find(item => item.producto.id === productoId);
        
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            this.carrito.push({
                producto: producto,
                cantidad: 1
            });
        }
    }

    // Eliminar producto del carrito
    eliminarDelCarrito(productoId) {
        const index = this.carrito.findIndex(item => item.producto.id === productoId);
        if (index !== -1) {
            this.carrito.splice(index, 1);
        }
    }

    // Aumentar cantidad de un producto
    aumentarCantidad(productoId) {
        const item = this.carrito.find(item => item.producto.id === productoId);
        if (item) {
            item.cantidad++;
        }
    }

    // Disminuir cantidad de un producto
    disminuirCantidad(productoId) {
        const item = this.carrito.find(item => item.producto.id === productoId);
        if (item) {
            item.cantidad--;
            if (item.cantidad <= 0) {
                this.eliminarDelCarrito(productoId);
            }
        }
    }

    // Vaciar todo el carrito
    vaciarCarrito() {
        this.carrito = [];
    }

    // Calcular total del carrito
    calcularTotal() {
        return this.carrito.reduce((total, item) => {
            return total + (item.producto.precio * item.cantidad);
        }, 0);
    }

    // Obtener cantidad total de items
    getCantidadTotal() {
        return this.carrito.reduce((total, item) => total + item.cantidad, 0);
    }
}

export default CarritoModel;
