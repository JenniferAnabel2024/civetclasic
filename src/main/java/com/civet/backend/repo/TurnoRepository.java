package com.civet.backend.repo;
// 1. Importamos la Entidad (los datos)
import com.civet.backend.entity.Turno;

// 2. Importamos las herramientas de Spring Boot (JPA y Repository)
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface  TurnoRepository extends JpaRepository<Turno, Long> {
    
}
