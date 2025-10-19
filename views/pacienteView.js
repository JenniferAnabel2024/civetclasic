// VISTA: Renderizado de la interfaz de pacientes
class PacienteView {
    constructor() {
        this.listaPacientes = $('#lista-pacientes');
    }

    // Renderizar la lista de pacientes
    render(pacientes) {
        this.listaPacientes.empty(); // Limpiar la lista

        if (pacientes.length === 0) {
            this.listaPacientes.html('<div class="col-12"><p>No hay pacientes registrados. ¡Añade uno!</p></div>');
            return;
        }

        pacientes.forEach((paciente, index) => {
            const pacienteCardHtml = `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card card-paciente h-100">
                        <img src="images/${paciente.imagen}" class="card-img-top" alt="${paciente.nombre}" style="height: 300px; object-fit: contain; background: #000000;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${paciente.nombre}</h5>
                            <p class="card-text flex-grow-1">Especie: ${paciente.especie}</p>
                        </div>
                    </div>
                </div>
            `;
            this.listaPacientes.append(pacienteCardHtml);
        });
    }
}

export default PacienteView;