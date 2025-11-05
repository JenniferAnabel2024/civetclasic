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
