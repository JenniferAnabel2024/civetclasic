package com.civet.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record FichaRequest(
        Long pacienteId,
        Long medicoId,
        LocalDate fecha,
        String diagnostico,
        String tratamiento,
        BigDecimal costo
) {}

