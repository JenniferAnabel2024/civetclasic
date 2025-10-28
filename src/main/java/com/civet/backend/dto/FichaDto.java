package com.civet.backend.dto;

import java.time.LocalDate;

public class FichaDto {
    public Long id;
    public Long pacienteId;
    public PacienteRef paciente;
    public String nombreMedico;
    public LocalDate fecha;
    public String sintomas;
    public String observaciones;

    public static class PacienteRef { public Long id; }
}
