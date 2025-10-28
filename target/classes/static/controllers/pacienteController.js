// CONTROLADOR: Manejo de eventos y lógica de aplicación (con backend)
class PacienteController {
  constructor(model, view) {
    this.model = model; // PacienteModel conectado a /api/pacientes
    this.view = view;
    this.init();
  }

  init() {
    // Navegación de módulos
    $('#navigation .nav-link').on('click', async (e) => {
      e.preventDefault();
      const targetModule = $(e.currentTarget).data('module');
      $('.module').hide();
      $('#module-' + targetModule).fadeIn(300);
      $('#navigation .nav-link').removeClass('active');
      $(e.currentTarget).addClass('active');

      if (targetModule === 'pacientes') {
        await this.render(); // refresca al entrar
      }
    });

    // CTA Button navegación
    $('.cta-button').on('click', async (e) => {
      e.preventDefault();
      const targetModule = $(e.currentTarget).data('module');
      if (!targetModule) return;
      $('.module').hide();
      $('#module-' + targetModule).fadeIn(300);
      $('#navigation .nav-link').removeClass('active');
      $(`#navigation .nav-link[data-module="${targetModule}"]`).addClass('active');

      if (targetModule === 'pacientes') {
        await this.render();
      }
    });

    // Forzar estado de inicio
    $('#navigation .nav-link[data-module="inicio"]').addClass('active');

    // (CREATE) Manejar envío del formulario
    $('#form-paciente').on('submit', async (e) => {
      e.preventDefault();

      const nombre = $('#pac-nombre').val()?.trim();
      const especie = $('#pac-especie').val()?.trim();
      const imagen = $('#pac-imagen').val()?.trim() || '';

      if (!nombre || !especie) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      try {
        await this.model.add({ nombre, especie, imagen });
        $('#form-paciente')[0].reset();
        await this.render();
      } catch (err) {
        console.error(err);
        alert('Error al crear el paciente.');
      }
    });

    // (DELETE) Manejar clic en eliminar (usa ID real del backend)
    $('#lista-pacientes').on('click', '.btn-delete', async (e) => {
      const id = $(e.currentTarget).data('id');
      if (!id) return;
      if (!confirm('¿Deseas eliminar este paciente?')) return;

      try {
        await this.model.remove(id);
        await this.render();
      } catch (err) {
        console.error(err);
        alert('Error al eliminar el paciente.');
      }
    });

    // Render inicial
    this.render();
  }

  // Renderizar listado desde backend
  async render() {
    try {
      const pacientes = await this.model.getAll();
      this.view.render(pacientes);
    } catch (err) {
      console.error('Error al obtener pacientes:', err);
    }
  }
}

export default PacienteController;
