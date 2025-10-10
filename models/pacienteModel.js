// MODELO: Gestión de datos de pacientes
class PacienteModel {
    constructor() {
        this.pacientes = [
            { nombre: 'Rex', especie: 'Perro' },
            { nombre: 'Mishi', especie: 'Gato' },
            { nombre: 'Piolín', especie: 'Canario' }
        ];
    }

    // Obtener todos los pacientes
    getAll() {
        return this.pacientes;
    }

    // Añadir un nuevo paciente
    add(paciente) {
        this.pacientes.push(paciente);
    }

    // Eliminar un paciente por índice
    remove(index) {
        this.pacientes.splice(index, 1);
    }
}

export default PacienteModel;