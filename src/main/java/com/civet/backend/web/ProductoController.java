package com.civet.backend.web;

import com.civet.backend.entity.Producto;
import com.civet.backend.repo.ProductoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/productos")
public class ProductoController {
    private final ProductoRepository repo;
    public ProductoController(ProductoRepository repo){ this.repo = repo; }

    @GetMapping public List<Producto> list(){ return repo.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<Producto> get(@PathVariable Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PostMapping public Producto create(@RequestBody Producto p){ p.setId(null); return repo.save(p); }
    @PutMapping("/{id}") public ResponseEntity<Producto> update(@PathVariable Long id, @RequestBody Producto p){
        if(!repo.existsById(id)) return ResponseEntity.notFound().build();
        p.setId(id); return ResponseEntity.ok(repo.save(p));
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){
        if(!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id); return ResponseEntity.noContent().build();
    }
}
