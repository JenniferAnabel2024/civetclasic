package com.civet.backend.web;

import com.civet.backend.entity.CarritoItem;
import com.civet.backend.repo.CarritoItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/carrito")
public class CarritoController {
    private final CarritoItemRepository repo;
    public CarritoController(CarritoItemRepository repo){ this.repo = repo; }

    @GetMapping public List<CarritoItem> list(){ return repo.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<CarritoItem> get(@PathVariable Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PostMapping public CarritoItem create(@RequestBody CarritoItem it){ it.setId(null); return repo.save(it); }
    @PutMapping("/{id}") public ResponseEntity<CarritoItem> update(@PathVariable Long id, @RequestBody CarritoItem it){
        if(!repo.existsById(id)) return ResponseEntity.notFound().build();
        it.setId(id); return ResponseEntity.ok(repo.save(it));
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){
        if(!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id); return ResponseEntity.noContent().build();
    }
}
