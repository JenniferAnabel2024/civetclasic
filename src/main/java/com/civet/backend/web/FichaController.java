package com.civet.backend.web;

import com.civet.backend.entity.Ficha;
import com.civet.backend.entity.Medico;
import com.civet.backend.entity.Paciente;
import com.civet.backend.repo.FichaRepository;
import com.civet.backend.repo.MedicoRepository;
import com.civet.backend.repo.PacienteRepository;
import com.civet.backend.dto.FichaRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fichas")
@CrossOrigin 
public class FichaController {

    private final FichaRepository fichaRepo;
    private final PacienteRepository pacienteRepo;
    private final MedicoRepository medicoRepo;

    public FichaController(FichaRepository fichaRepo,
                           PacienteRepository pacienteRepo,
                           MedicoRepository medicoRepo) {
        this.fichaRepo = fichaRepo;
        this.pacienteRepo = pacienteRepo;
        this.medicoRepo = medicoRepo;
    }

    @PostMapping
    public ResponseEntity<Ficha> crear(@RequestBody FichaRequest r) {
        Paciente paciente = pacienteRepo.findById(r.pacienteId())
                .orElseThrow(() -> new IllegalArgumentException("Paciente no encontrado"));
        Medico medico = medicoRepo.findById(r.medicoId())
                .orElseThrow(() -> new IllegalArgumentException("Médico no encontrado"));

        Ficha f = new Ficha();
        f.setPaciente(paciente);
        f.setMedico(medico);
        f.setFecha(r.fecha());
        f.setDiagnostico(r.diagnostico());
        f.setTratamiento(r.tratamiento());
        f.setCosto(r.costo());

        return ResponseEntity.ok(fichaRepo.save(f));
    }

    @GetMapping
    public List<Ficha> listar(@RequestParam(value = "pacienteId", required = false) Long pacienteId) {
        return (pacienteId == null)
                ? fichaRepo.findAll()
                : fichaRepo.findByPacienteId(pacienteId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ficha> get(@PathVariable Long id) {
        return fichaRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id) {
        if (!fichaRepo.existsById(id)) return ResponseEntity.notFound().build();
        fichaRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


