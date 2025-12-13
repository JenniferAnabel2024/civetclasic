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
}