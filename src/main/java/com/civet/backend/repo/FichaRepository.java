package com.civet.backend.repo;

import com.civet.backend.entity.Ficha;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FichaRepository extends JpaRepository<Ficha, Long> {
	@EntityGraph(attributePaths = {"paciente", "medico"})
    List<Ficha> findByPacienteId(Long pacienteId);
}
