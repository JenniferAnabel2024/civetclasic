// INICIALIZACIÓN: Importar módulos y crear controlador
import PacienteModel from './models/pacienteModel.js';
import PacienteView from './views/pacienteView.js';
import PacienteController from './controllers/pacienteController.js';
import CarritoModel from './models/carritoModel.js';
import CarritoView from './views/carritoView.js';
import CarritoController from './controllers/carritoController.js';

$(document).ready(function() {
    // Crear instancias del modelo y vista de Pacientes
    const pacienteModel = new PacienteModel();
    const pacienteView = new PacienteView();
    new PacienteController(pacienteModel, pacienteView);

    // Crear instancias del modelo y vista de Carrito
    const carritoModel = new CarritoModel();
    const carritoView = new CarritoView();
    new CarritoController(carritoModel, carritoView);
});
