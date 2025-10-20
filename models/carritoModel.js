// MODELO: Gestión del carrito de compras
class CarritoModel {
    constructor() {
        // Productos disponibles en la tienda
        this.productos = [
            { id: 1, nombre: 'Alimento Gato Premium', precio: 8900, imagen: 'images/alimentogato.jpg', categoria: 'Alimento' },
            { id: 2, nombre: 'Cama Mascota Confortable', precio: 8500, imagen: 'images/camamascota.jpg', categoria: 'Accesorios' },
            { id: 3, nombre: 'Juguete Interactivo Mascota', precio: 1500, imagen: 'images/juguetemascota.webp', categoria: 'Juguetes' },
            { id: 4, nombre: 'Natuta Choice Adulto x2kg', precio: 4200, imagen: 'images/NATURAL-CHOICE-ADULTO-X-20-KG.jpg.webp', categoria: 'Alimento' },
            { id: 5, nombre: 'Piedras Sanitarias Premium', precio: 3200, imagen: 'images/piedrassanitarias.webp', categoria: 'Higiene' },
            { id: 6, nombre: 'Plato Mascota Diseño', precio: 2400, imagen: 'images/platomascota.webp', categoria: 'Accesorios' },
            { id: 7, nombre: 'Shampoo Mascota Medicinal', precio: 1800, imagen: 'images/shampoomascotal.png', categoria: 'Higiene' }
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
