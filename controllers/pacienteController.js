// CONTROLADOR: Manejo de eventos y lógica de aplicación
class PacienteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        // Navegación de módulos
        $('#navigation .nav-link').on('click', function(e) {
            e.preventDefault();
            const targetModule = $(this).data('module');
            $('.module').hide();
            $('#module-' + targetModule).fadeIn(300);
            $('#navigation .nav-link').removeClass('active');
            $(this).addClass('active');
        });

        // CTA Button navegación
        $('.cta-button').on('click', function(e) {
            e.preventDefault();
            const targetModule = $(this).data('module');
            if (targetModule) {
                $('.module').hide();
                $('#module-' + targetModule).fadeIn(300);
                $('#navigation .nav-link').removeClass('active');
                $('#navigation .nav-link[data-module="' + targetModule + '"]').addClass('active');
            }
        });

        // Forzar clic en el primer módulo
        $('#navigation .nav-link[data-module="inicio"]').addClass('active');

        // (CREATE) Manejar envío del formulario
        $('#form-paciente').on('submit', (e) => {
            e.preventDefault();
            const nombre = $('#nombre-paciente').val().trim();
            const especie = $('#especie-paciente').val().trim();

            if (nombre && especie) {
                this.model.add({ nombre, especie });
                this.view.render(this.model.getAll());
                $('#form-paciente')[0].reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });

        // (DELETE) Manejar clic en eliminar
        $('#lista-pacientes').on('click', '.btn-delete', (e) => {
            const pacienteIndex = $(e.target).data('id');
            this.model.remove(pacienteIndex);
            this.view.render(this.model.getAll());
        });

        // Renderizar inicial
        this.view.render(this.model.getAll());
    }
}

export default PacienteController;