// CONTROLADOR: Manejo de eventos y lógica de aplicación para fichas
import PacienteModel from '../models/pacienteModel.js';

class FichaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.pacienteModel = new PacienteModel();
        this.init();
    }

    init() {
        // Llenar select de pacientes
        this.populatePacienteSelect();

        // (CREATE/UPDATE) Manejar envío del formulario de ficha
        $('#form-ficha').on('submit', (e) => {
            e.preventDefault();
            const index = $('#ficha-index').val();
            const nombrePaciente = $('#nombre-paciente').val().trim();
            const nombreMedico = $('#nombre-medico').val().trim();
            const fecha = $('#fecha-ficha').val().trim();
            const diagnostico = $('#diagnostico-ficha').val().trim();
            const tratamiento = $('#tratamiento-ficha').val().trim();
            const costo = parseFloat($('#costo-ficha').val().trim());

            if (nombrePaciente && nombreMedico && fecha && diagnostico && tratamiento && !isNaN(costo)) {
                if (index) {
                    // UPDATE
                    this.model.fichas[parseInt(index)] = { nombrePaciente, nombreMedico, fecha, diagnostico, tratamiento, costo };
                } else {
                    // CREATE
                    this.model.add({ nombrePaciente, nombreMedico, fecha, diagnostico, tratamiento, costo });
                }
                this.view.render(this.model.getAll());
                this.resetForm();
            } else {
                alert('Por favor, completa todos los campos correctamente.');
            }
        });

        // (UPDATE) Manejar clic en editar ficha
        $('#lista-fichas').on('click', '[data-edit]', (e) => {
            const fichaIndex = $(e.target).data('edit');
            const ficha = this.model.fichas[fichaIndex];
            this.fillForm(ficha, fichaIndex);
        });

        // (DELETE) Manejar clic en eliminar ficha
        $('#lista-fichas').on('click', '.btn-delete', (e) => {
            const fichaIndex = $(e.target).data('id');
            this.model.remove(fichaIndex);
            this.view.render(this.model.getAll());
            this.view.setPage(1); // Ir a primera página después de eliminar
        });

        // CANCELAR EDICIÓN
        $('#btn-cancel-edit').on('click', () => {
            this.resetForm();
        });

        // PAGINACIÓN
        $('#paginacion-fichas').on('click', '.page-link', (e) => {
            e.preventDefault();
            const page = parseInt($(e.target).data('page'));
            this.view.setPage(page);
        });

        // Renderizar inicial
        this.view.render(this.model.getAll());
    }

    fillForm(ficha, index) {
        $('#ficha-index').val(index);
        $('#nombre-paciente').val(ficha.nombrePaciente);
        $('#nombre-medico').val(ficha.nombreMedico);
        $('#fecha-ficha').val(ficha.fecha);
        $('#diagnostico-ficha').val(ficha.diagnostico);
        $('#tratamiento-ficha').val(ficha.tratamiento);
        $('#costo-ficha').val(ficha.costo);
        $('#btn-submit-ficha').text('Actualizar Ficha');
        $('#btn-cancel-edit').show();
        $('#module-ficha-paciente').get(0).scrollIntoView({ behavior: 'smooth' });
    }

    resetForm() {
        $('#form-ficha')[0].reset();
        $('#ficha-index').val('');
        $('#btn-submit-ficha').text('Añadir Ficha');
        $('#btn-cancel-edit').hide();
    }

    populatePacienteSelect() {
        const pacientes = this.pacienteModel.getAll();
        const select = $('#nombre-paciente');
        pacientes.forEach(paciente => {
            select.append(`<option value="${paciente.nombre}">${paciente.nombre} (${paciente.especie})</option>`);
        });
    }
}

export default FichaController;