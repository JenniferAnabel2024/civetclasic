// INICIALIZACIÓN: Importar módulos y crear controlador
import PacienteModel from './models/pacienteModel.js';
import PacienteView from './views/pacienteView.js';
import PacienteController from './controllers/pacienteController.js';
import CarritoModel from './models/carritoModel.js';
import CarritoView from './views/carritoView.js';
import CarritoController from './controllers/carritoController.js';
import FichaModel from './models/fichaModel.js';
import FichaView from './views/fichaView.js';
import FichaController from './controllers/fichaController.js';

$(document).ready(function() {
    // Crear instancias del modelo y vista de Pacientes
    const pacienteModel = new PacienteModel();
    const pacienteView = new PacienteView();
    new PacienteController(pacienteModel, pacienteView);

    // Crear instancias del modelo y vista de Carrito
    const carritoModel = new CarritoModel();
    const carritoView = new CarritoView();
    new CarritoController(carritoModel, carritoView);

    // Crear instancias del modelo y vista de Ficha
    const fichaModel = new FichaModel();
    const fichaView = new FichaView();
    new FichaController(fichaModel, fichaView);

    // NAVEGACIÓN ENTRE MÓDULOS
    $(document).on('click', '[data-module]', function(e) {
        e.preventDefault();
        const module = $(this).data('module');
        $('.module').hide();
        $('#module-' + module).show();
        // Scroll to top for better UX
        $('html, body').animate({ scrollTop: 0 }, 300);
    });
});
