package com.civet.backend.web;

import com.civet.backend.entity.Medico;
import com.civet.backend.repo.MedicoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin
public class MedicoController {

    private final MedicoRepository repo;

    public MedicoController(MedicoRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Medico> listar() { return repo.findAll(); }
}
