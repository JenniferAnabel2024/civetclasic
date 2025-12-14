package com.civet.backend.service;

import com.civet.backend.entity.Turno;
import com.civet.backend.repo.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepository;

  // 1. Guardar un turno (Create)
    public Turno guardarTurno(Turno turno) {
        return turnoRepository.save(turno);
    }

    // 2. Listar todos los turnos (Read)
    public List<Turno> listarTurnos() {
        return turnoRepository.findAll();
    }

    // 3. Buscar un turno por ID (Read one)
    public Optional<Turno> buscarPorId(Long id) {
        return turnoRepository.findById(id);
    }

    // 4. Eliminar un turno (Delete)
    public void eliminarTurno(Long id) {
        turnoRepository.deleteById(id);
    }

    // 5. Actualizar un turno (Update)
    public Turno actualizarTurno(Long id, Turno turnoActualizado) {
        Optional<Turno> turnoExistente = turnoRepository.findById(id);
        if (turnoExistente.isPresent()) {
            Turno turno = turnoExistente.get();
            turno.setFechaHora(turnoActualizado.getFechaHora());
            turno.setMotivo(turnoActualizado.getMotivo());
            turno.setPaciente(turnoActualizado.getPaciente());
            turno.setMedico(turnoActualizado.getMedico());
            return turnoRepository.save(turno);
        } else {
            throw new RuntimeException("Turno no encontrado con ID: " + id);
        }
    }
}