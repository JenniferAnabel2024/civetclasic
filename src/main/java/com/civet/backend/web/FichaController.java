package com.civet.backend.web;

import com.civet.backend.dto.FichaDto;
import com.civet.backend.entity.Ficha;
import com.civet.backend.entity.Paciente;
import com.civet.backend.repo.FichaRepository;
import com.civet.backend.repo.PacienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/fichas")
public class FichaController {
    private final FichaRepository repo;
    private final PacienteRepository pacienteRepo;
    public FichaController(FichaRepository repo, PacienteRepository pacienteRepo){
        this.repo = repo; this.pacienteRepo = pacienteRepo;
    }

    @GetMapping public List<Ficha> list(){ return repo.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<Ficha> get(@PathVariable Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PostMapping public ResponseEntity<Ficha> create(@RequestBody FichaDto dto){
        Paciente pac = resolvePaciente(dto);
        if(pac == null) return ResponseEntity.badRequest().build();
        Ficha f = new Ficha();
        f.setPaciente(pac);
        f.setNombreMedico(dto.nombreMedico);
        f.setFecha(dto.fecha);
        f.setSintomas(dto.sintomas);
        f.setObservaciones(dto.observaciones);
        return ResponseEntity.ok(repo.save(f));
    }
    @PutMapping("/{id}") public ResponseEntity<Ficha> update(@PathVariable Long id, @RequestBody FichaDto dto){
        if(!repo.existsById(id)) return ResponseEntity.notFound().build();
        Paciente pac = resolvePaciente(dto);
        if(pac == null) return ResponseEntity.badRequest().build();
        Ficha f = repo.findById(id).orElseThrow();
        f.setPaciente(pac);
        f.setNombreMedico(dto.nombreMedico);
        f.setFecha(dto.fecha);
        f.setSintomas(dto.sintomas);
        f.setObservaciones(dto.observaciones);
        return ResponseEntity.ok(repo.save(f));
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){
        if(!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id); return ResponseEntity.noContent().build();
    }

    private Paciente resolvePaciente(FichaDto dto){
        Long id = null;
        if(dto.pacienteId != null) id = dto.pacienteId;
        else if(dto.paciente != null) id = dto.paciente.id;
        if(id == null) return null;
        return pacienteRepo.findById(id).orElse(null);
    }
}
