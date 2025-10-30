package com.civet.backend.web;

import com.civet.backend.entity.Pago;
import com.civet.backend.entity.Venta;
import com.civet.backend.repo.PagoRepository;
import com.civet.backend.repo.VentaRepository;
import com.civet.backend.dto.PagoDtos.CrearPagoRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin
public class VentaController {

    private final VentaRepository ventaRepo;
    private final PagoRepository pagoRepo;

    public VentaController(VentaRepository ventaRepo, PagoRepository pagoRepo) {
        this.ventaRepo = ventaRepo;
        this.pagoRepo = pagoRepo;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ver(@PathVariable("id") Long id) {
        return ventaRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/pagos")
    @Transactional
    public ResponseEntity<?> agregarPago(@PathVariable("id") Long ventaId,
                                         @RequestBody CrearPagoRequest req) {
        Venta v = ventaRepo.findById(ventaId).orElse(null);
        if (v == null) return ResponseEntity.notFound().build();
        if (req.medio == null || req.monto == null)
            return ResponseEntity.badRequest().body("{\"error\":\"medio y monto son obligatorios\"}");

        Pago p = new Pago();
        p.setVenta(v);
        p.setMedio(req.medio);
        p.setMonto(req.monto);
        p.setNota(req.nota);
        pagoRepo.save(p);

        return ResponseEntity.ok(ventaRepo.findById(ventaId).get());
    }
}
