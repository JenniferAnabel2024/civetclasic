package com.civet.backend.repo;

import com.civet.backend.entity.Carrito;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {

    @EntityGraph(attributePaths = {"items", "items.producto", "paciente"})
    Optional<Carrito> findWithItemsById(Long id);
}

