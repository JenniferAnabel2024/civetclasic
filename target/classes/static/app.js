// app.js – inicialización principal (conexión front-back lista)

// IMPORTS de modelos, vistas y controladores
import PacienteModel from './models/pacienteModel.js';
import PacienteView from './views/pacienteView.js';
import PacienteController from './controllers/pacienteController.js';

import CarritoModel from './models/carritoModel.js';
import CarritoView from './views/carritoView.js';
import CarritoController from './controllers/carritoController.js';

import FichaModel from './models/fichaModel.js';
import FichaView from './views/fichaView.js';
import FichaController from './controllers/fichaController.js';

// Esperar a que el DOM esté listo
$(document).ready(() => {
  console.log('🚀 Frontend CIVET iniciado correctamente');

  // ==== PACIENTES ====
  const pacienteModel = new PacienteModel(); // ya conectado a /api/pacientes
  const pacienteView = new PacienteView();
  new PacienteController(pacienteModel, pacienteView);

  // ==== CARRITO ====
  const carritoModel = new CarritoModel(); // conectado a /api/productos
  const carritoView = new CarritoView();
  new CarritoController(carritoModel, carritoView);

  // ==== FICHAS MÉDICAS ====
  const fichaModel = new FichaModel(); // conectado a /api/fichas
  const fichaView = new FichaView();
  new FichaController(fichaModel, fichaView);

  // === Configuración manual extra para selects ===
  const API_BASE = 'http://localhost:8080'; // cambia si tu backend está en otro puerto o dominio

  const selPaciente = document.getElementById('nombre-paciente');
  const selMedico = document.getElementById('medico-id');
  const formFicha = document.getElementById('form-ficha');

  // Si el HTML no tiene el select de médicos aún, lo agregamos dinámicamente
  if (formFicha && !selMedico) {
    const medicoInput = document.getElementById('nombre-medico');
    if (medicoInput) {
      const select = document.createElement('select');
      select.id = 'medico-id';
      select.className = 'form-control';
      select.required = true;
      select.innerHTML = '<option value="">Selecciona un Médico</option>';
      medicoInput.replaceWith(select);
    }
  }

  async function cargarPacientes() {
    try {
      const res = await fetch(`${API_BASE}/api/pacientes`);
      if (!res.ok) throw new Error('Error al cargar pacientes');
      const pacientes = await res.json();
      selPaciente.innerHTML = '<option value="">Selecciona un Paciente</option>';
      pacientes.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.nombre} (${p.especie})`;
        selPaciente.appendChild(opt);
      });
    } catch (err) {
      console.error(err);
      alert('No se pudieron cargar los pacientes');
    }
  }

  async function cargarMedicos() {
    try {
      const res = await fetch(`${API_BASE}/api/medicos`);
      if (!res.ok) throw new Error('Error al cargar médicos');
      const medicos = await res.json();
      const select = document.getElementById('medico-id');
      select.innerHTML = '<option value="">Selecciona un Médico</option>';
      medicos.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.nombre;
        select.appendChild(opt);
      });
    } catch (err) {
      console.error(err);
      alert('No se pudieron cargar los médicos');
    }
  }

  function toYMD(val) {
    if (!val) return null;
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    const d = new Date(val);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  }

  if (formFicha) {
    formFicha.addEventListener('submit', async e => {
      e.preventDefault();
      const payload = {
        pacienteId: Number(selPaciente.value),
        medicoId: Number(document.getElementById('medico-id').value),
        fecha: toYMD(document.getElementById('fecha-ficha').value),
        diagnostico: document.getElementById('diagnostico-ficha').value.trim(),
        tratamiento: document.getElementById('tratamiento-ficha').value.trim(),
        costo: Number(document.getElementById('costo-ficha').value)
      };

      if (!payload.pacienteId) return alert('Selecciona un paciente.');
      if (!payload.medicoId) return alert('Selecciona un médico.');
      if (!payload.fecha) return alert('Selecciona una fecha válida.');

      try {
        const res = await fetch(`${API_BASE}/api/fichas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const msg = await res.text().catch(() => '');
          alert(`Error al guardar la ficha médica.\n${res.status} ${msg}`);
          return;
        }
        const data = await res.json();
        alert(`✅ Ficha guardada correctamente (ID ${data.id})`);
        formFicha.reset();
      } catch (err) {
        console.error(err);
        alert('Error de red al guardar la ficha médica.');
      }
    });

    // cargar combos
    Promise.all([cargarPacientes(), cargarMedicos()]);
  }

  // ==== NAVEGACIÓN ENTRE MÓDULOS ====
  $(document).on('click', '[data-module]', function (e) {
    e.preventDefault();
    const module = $(this).data('module');

    // Ocultar todos los módulos
    $('.module').hide();

    // Mostrar el seleccionado
    $(`#module-${module}`).fadeIn(300);

    // Marcar el link activo
    $('[data-module]').removeClass('active');
    $(this).addClass('active');

    // Scroll al inicio
    $('html, body').animate({ scrollTop: 0 }, 300);
  });

  // Mostrar por defecto el módulo de inicio
  $('.module').hide();
  $('#module-inicio').show();
});

