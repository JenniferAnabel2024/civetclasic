// MODELO: Gestión de datos de pacientes
class PacienteModel {
    constructor() {
        this.pacientes = [
            { nombre: 'Rex', especie: 'Canino', imagen: 'perro.jpg' },
            { nombre: 'Mishi', especie: 'Felino', imagen: 'gato.jpg' },
            { nombre: 'Pepo', especie: 'Felino', imagen: 'gatobebe.jpg' },
            { nombre: 'Whiskers', especie: 'Felino', imagen: 'gato2.jpg' },
            { nombre: 'Sponge', especie: 'Canino', imagen: 'perroesponjoso.jpg' }
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