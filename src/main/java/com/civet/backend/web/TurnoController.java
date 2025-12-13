package com.civet.backend.web;

import com.civet.backend.entity.Turno;
import com.civet.backend.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/turnos")
@CrossOrigin
public class TurnoController {
    @Autowired
    private TurnoService turnoService; // Conectamos con el (Service)

    // --- MÉTODOS PÚBLICOS (Tus Endpoints) ---

    // 1. POST: Guardar un nuevo turno
    @PostMapping
    public Turno guardarTurno(@RequestBody Turno turno) {
        return turnoService.guardarTurno(turno);
    }

    // 2. GET: Listar todos
    @GetMapping
    public List<Turno> listarTurnos() {
        return turnoService.listarTurnos();
    }

    // 3. GET por ID: Buscar uno solo
    @GetMapping("/{id}")
    public Optional<Turno> buscarPorId(@PathVariable Long id) {
        return turnoService.buscarPorId(id);
    }

    // 4. DELETE: Eliminar
    @DeleteMapping("/{id}")
    public void eliminarTurno(@PathVariable Long id) {
        turnoService.eliminarTurno(id);
    }
}