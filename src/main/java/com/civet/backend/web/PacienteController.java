package com.civet.backend.web;

import com.civet.backend.entity.Paciente;
import com.civet.backend.repo.PacienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/pacientes")
public class PacienteController {
    private final PacienteRepository repo;
    public PacienteController(PacienteRepository repo){ this.repo = repo; }

    @GetMapping public List<Paciente> list(){ return repo.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<Paciente> get(@PathVariable Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PostMapping public Paciente create(@RequestBody Paciente p){ p.setId(null); return repo.save(p); }
    @PutMapping("/{id}") public ResponseEntity<Paciente> update(@PathVariable Long id, @RequestBody Paciente p){
        if(!repo.existsById(id)) return ResponseEntity.notFound().build();
        p.setId(id); return ResponseEntity.ok(repo.save(p));
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){
        if(!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id); return ResponseEntity.noContent().build();
    }
}
