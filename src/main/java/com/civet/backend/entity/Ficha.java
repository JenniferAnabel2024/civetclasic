package com.civet.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity @Table(name = "fichas")
public class Ficha {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    private String nombreMedico;
    private LocalDate fecha;

    @Column(length=1000) private String sintomas;
    @Column(length=2000) private String observaciones;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Paciente getPaciente() { return paciente; }
    public void setPaciente(Paciente paciente) { this.paciente = paciente; }
    public String getNombreMedico() { return nombreMedico; }
    public void setNombreMedico(String nombreMedico) { this.nombreMedico = nombreMedico; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public String getSintomas() { return sintomas; }
    public void setSintomas(String sintomas) { this.sintomas = sintomas; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}