package com.civet.backend.web;

import com.civet.backend.entity.*;
import com.civet.backend.repo.*;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/carritos")
@CrossOrigin
public class CarritoController {

    private final CarritoRepository carritoRepo;
    private final CarritoItemRepository itemRepo;
    private final ProductoRepository productoRepo;
    private final PacienteRepository pacienteRepo;
    private final VentaRepository ventaRepo;
    private final VentaItemRepository ventaItemRepo;

    public CarritoController(CarritoRepository carritoRepo,
                             CarritoItemRepository itemRepo,
                             ProductoRepository productoRepo,
                             PacienteRepository pacienteRepo,
                             VentaRepository ventaRepo,
                             VentaItemRepository ventaItemRepo) {
        this.carritoRepo = carritoRepo;
        this.itemRepo = itemRepo;
        this.productoRepo = productoRepo;
        this.pacienteRepo = pacienteRepo;
        this.ventaRepo = ventaRepo;
        this.ventaItemRepo = ventaItemRepo;
    }

    // =======================================================
    // Crear un carrito nuevo (paciente opcional)
    // =======================================================
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody(required = false) CrearCarritoRequest req) {
        Carrito c = new Carrito();

        if (req != null && req.pacienteId() != null) {
            Paciente p = pacienteRepo.findById(req.pacienteId()).orElse(null);
            c.setPaciente(p);
        }

        c.setEstado(Carrito.Estado.ABIERTO);
        carritoRepo.save(c);

        return carritoRepo.findWithItemsById(c.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(c));
    }

    // =======================================================
    // Ver un carrito con todos sus items
    // =======================================================
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<?> ver(@PathVariable Long id) {
        return carritoRepo.findWithItemsById(id)
                .map(carrito -> {
                    // ⚡ Forzar inicialización manual
                    if (carrito.getPaciente() != null) {
                        carrito.getPaciente().getNombre(); // fuerza carga
                    }
                    carrito.getItems().forEach(it -> {
                        if (it.getProducto() != null) {
                            it.getProducto().getNombre(); // fuerza carga del producto
                        }
                    });
                    return ResponseEntity.ok(carrito);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // =======================================================
    // Agregar un producto al carrito (sin cerrarlo)
    // =======================================================
    @PostMapping("/{id}/items")
    @Transactional
    public ResponseEntity<?> agregarItem(@PathVariable Long id,
                                         @RequestBody AgregarItemRequest req) {

        Carrito c = carritoRepo.findWithItemsById(id).orElse(null);
        if (c == null) return ResponseEntity.notFound().build();

        if (req.productoId() == null || req.cantidad() == null || req.cantidad() <= 0) {
            return ResponseEntity.badRequest().body("{\"error\":\"productoId y cantidad son obligatorios\"}");
        }

        Producto prod = productoRepo.findById(req.productoId()).orElse(null);
        if (prod == null) {
            return ResponseEntity.badRequest().body("{\"error\":\"producto no existe\"}");
        }

        CarritoItem it = new CarritoItem();
        it.setCarrito(c);
        it.setProducto(prod);
        it.setCantidad(req.cantidad());
        BigDecimal precio = (req.precioUnitario() != null) ? req.precioUnitario() : prod.getPrecio();
        it.setPrecioUnitario(precio);

        itemRepo.save(it);

        // ✅ Mantiene el carrito ABIERTO
        c.setEstado(Carrito.Estado.ABIERTO);
        carritoRepo.save(c);

        return carritoRepo.findWithItemsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(c));
    }

    // =======================================================
    // Eliminar un item del carrito
    // =======================================================
    @DeleteMapping("/{id}/items/{itemId}")
    @Transactional
    public ResponseEntity<?> quitarItem(@PathVariable Long id,
                                        @PathVariable Long itemId) {
        Carrito c = carritoRepo.findById(id).orElse(null);
        if (c == null) return ResponseEntity.notFound().build();

        CarritoItem it = itemRepo.findById(itemId).orElse(null);
        if (it == null || it.getCarrito() == null || !it.getCarrito().getId().equals(c.getId())) {
            return ResponseEntity.notFound().build();
        }

        itemRepo.delete(it);

        c.setEstado(Carrito.Estado.ABIERTO);
        carritoRepo.save(c);

        return carritoRepo.findWithItemsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(c));
    }

    // =======================================================
    // Finalizar compra (Checkout)
    // =======================================================
    @PostMapping("/{id}/checkout")
    @Transactional
    public ResponseEntity<?> checkout(@PathVariable Long id,
                                      @RequestBody(required = false) CheckoutRequest req) {
        Carrito c = carritoRepo.findWithItemsById(id).orElse(null);
        if (c == null) return ResponseEntity.notFound().build();

        if (c.getItems() == null || c.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"error\":\"el carrito está vacío\"}");
        }

        Venta v = new Venta();
        v.setCarrito(c);
        v.setClienteNom(c.getPaciente() != null ? c.getPaciente().getNombre()
                : (req != null ? req.clienteNom() : null));
        v.setTotal(BigDecimal.ZERO);
        v = ventaRepo.save(v);

        BigDecimal total = BigDecimal.ZERO;
        for (CarritoItem ci : c.getItems()) {
            VentaItem vi = new VentaItem();
            vi.setVenta(v);
            vi.setProducto(ci.getProducto());
            vi.setCantidad(ci.getCantidad());
            vi.setPrecioUnit(ci.getPrecioUnitario());
            ventaItemRepo.save(vi);

            total = total.add(ci.getPrecioUnitario()
                    .multiply(BigDecimal.valueOf(ci.getCantidad())));
        }

        v.setTotal(total);
        ventaRepo.save(v);

        // ✅ Cerrar carrito sólo en checkout
        c.setEstado(Carrito.Estado.CERRADO);
        carritoRepo.save(c);

        return ResponseEntity.ok(v);
    }

    // =======================================================
    // DTOs (Records internos)
    // =======================================================
    public record CrearCarritoRequest(Long pacienteId) {}
    public record AgregarItemRequest(Long productoId, Integer cantidad, BigDecimal precioUnitario) {}
    public record CheckoutRequest(String clienteNom) {}
}
