package com.civet.backend.entity; // 1. OBLIGATORIO: Define dónde vive el archivo

import jakarta.persistence.*; 
import java.time.LocalDateTime; 

@Entity 
@Table(name = "turnos")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fechaHora; 
    private String motivo;

    
    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "medico_id")
    private Medico medico;

    // --- CONSTRUCTORES ---
    public Turno() {
    }

    public Turno(LocalDateTime fechaHora, String motivo, Paciente paciente, Medico medico) {
        this.fechaHora = fechaHora;
        this.motivo = motivo;
        this.paciente = paciente;
        this.medico = medico;
    }

    // --- GETTERS Y SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public Paciente getPaciente() { return paciente; }
    public void setPaciente(Paciente paciente) { this.paciente = paciente; }

    public Medico getMedico() { return medico; }
    public void setMedico(Medico medico) { this.medico = medico; }
}