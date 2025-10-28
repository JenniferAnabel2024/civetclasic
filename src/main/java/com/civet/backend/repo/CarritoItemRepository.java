package com.civet.backend.repo;

import com.civet.backend.entity.CarritoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {}
