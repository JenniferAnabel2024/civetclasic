package com.civet.backend.web;

import com.civet.backend.entity.Paciente;
import com.civet.backend.repo.PacienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin
public class PacienteController {

    private final PacienteRepository repo;

    public PacienteController(PacienteRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Paciente> listar() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> get(@PathVariable("id") Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Paciente crear(@RequestBody Paciente p) { return repo.save(p); }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizar(@PathVariable("id") Long id, @RequestBody Paciente p) {
        return repo.findById(id).map(db -> {
            db.setNombre(p.getNombre());
            db.setEspecie(p.getEspecie());
            db.setImagen(p.getImagen());
            return ResponseEntity.ok(repo.save(db));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable("id") Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
