// controllers/FichaController.js
import PacienteModel from '../models/PacienteModel.js';

class FichaController {
  constructor(model, view) {
    this.model = model;              // FichaModel conectado al backend
    this.view = view;
    this.pacienteModel = new PacienteModel(); // PacienteModel conectado
    this.init();
  }

  async init() {
    // Llenar <select> de pacientes desde backend
    await this.populatePacienteSelect();

    // CREATE / UPDATE
    $('#form-ficha').on('submit', async (e) => {
      e.preventDefault();

      const idFichaStr   = $('#ficha-index').val();
      const idFicha      = idFichaStr ? Number(idFichaStr) : null;

      const pacienteIdStr = $('#nombre-paciente').val().trim();
      const pacienteId    = pacienteIdStr ? Number(pacienteIdStr) : null;

      const nombreMedico = $('#nombre-medico').val().trim();
      const fecha        = $('#fecha-ficha').val().trim();
      const diagnostico  = $('#diagnostico-ficha').val().trim();
      const tratamiento  = $('#tratamiento-ficha').val().trim();
      const costoVal     = $('#costo-ficha').val().trim();
      const costo        = costoVal === '' ? 0 : Number(parseFloat(costoVal));

      if (!pacienteId || !nombreMedico || !fecha || !diagnostico || !tratamiento || Number.isNaN(costo)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
      }

      const fichaData = { pacienteId, nombreMedico, fecha, diagnostico, tratamiento, costo };

      try {
        if (idFicha) {
          await this.model.update(idFicha, fichaData);
        } else {
          await this.model.add(fichaData);
        }
        await this.renderFichas();
        this.resetForm();
      } catch (err) {
        console.error(err);
        alert('Error al guardar la ficha médica.');
      }
    });

    // EDIT
    $('#lista-fichas').on('click', '[data-edit]', async (e) => {
      const idFicha = Number($(e.currentTarget).data('edit')); // seguro contra clicks en hijos
      const fichas = await this.model.getAll();
      const ficha = fichas.find(f => Number(f.id) === idFicha);
      if (ficha) this.fillForm(ficha);
    });

    // DELETE
    $('#lista-fichas').on('click', '.btn-delete', async (e) => {
      const idFicha = Number($(e.currentTarget).data('id'));
      if (!idFicha) return;
      if (!confirm('¿Seguro que deseas eliminar esta ficha?')) return;

      try {
        await this.model.remove(idFicha);
        await this.renderFichas();
      } catch (err) {
        console.error(err);
        alert('Error al eliminar la ficha médica.');
      }
    });

    // CANCELAR EDICIÓN
    $('#btn-cancel-edit').on('click', () => this.resetForm());

    // PAGINACIÓN (la view maneja el cambio de página)
    $('#paginacion-fichas').on('click', '.page-link', (e) => {
      e.preventDefault();
      const page = parseInt($(e.currentTarget).data('page'));
      this.view.setPage(page);
    });

    // Render inicial
    await this.renderFichas();
  }

  async populatePacienteSelect() {
    try {
      const pacientes = await this.pacienteModel.getAll();
      const select = $('#nombre-paciente');
      select.empty();
      select.append('<option value="">Selecciona un Paciente</option>');
      pacientes.forEach(p => {
        select.append(`<option value="${p.id}">${p.nombre} (${p.especie || '—'})</option>`);
      });
    } catch (err) {
      console.error('Error al cargar pacientes:', err);
      alert('No se pudieron cargar los pacientes.');
    }
  }

  async renderFichas() {
    const fichas = await this.model.getAll();
    this.view.render(fichas);
  }

  fillForm(ficha) {
    $('#ficha-index').val(ficha.id);
    $('#nombre-paciente').val(ficha.pacienteId);
    $('#nombre-medico').val(ficha.nombreMedico || '');
    $('#fecha-ficha').val(ficha.fecha || '');
    $('#diagnostico-ficha').val(ficha.sintomas || '');

    // Parsear observaciones -> tratamiento/costo
    const obs = ficha.observaciones || '';
    const matchTrat  = obs.match(/Tratamiento:\s*(.*?)\s*(\||$)/);
    const matchCosto = obs.match(/Costo:\s*([0-9]+(?:\.[0-9]+)?)/);

    $('#tratamiento-ficha').val(matchTrat ? matchTrat[1] : '');
    $('#costo-ficha').val(matchCosto ? matchCosto[1] : '');

    $('#btn-submit-ficha').text('Actualizar Ficha');
    $('#btn-cancel-edit').show();
    $('#module-ficha-paciente').get(0)?.scrollIntoView({ behavior: 'smooth' });
  }

  resetForm() {
    $('#form-ficha')[0].reset();
    $('#ficha-index').val('');
    $('#btn-submit-ficha').text('Añadir Ficha');
    $('#btn-cancel-edit').hide();
  }
}

export default FichaController;
