// MODELO: Gestión de datos de fichas médicas
class FichaModel {
    constructor() {
        this.fichas = [
            { nombrePaciente: 'Rex', nombreMedico: 'Dr. García', fecha: '2025-10-15', diagnostico: 'Gastroenteritis', tratamiento: 'Antibióticos y dieta blanda', costo: 150.00 },
            { nombrePaciente: 'Mishi', nombreMedico: 'Dra. López', fecha: '2025-10-10', diagnostico: 'Parasitosis', tratamiento: 'Desparasitante', costo: 80.00 },
            { nombrePaciente: 'Pepo', nombreMedico: 'Dr. Martínez', fecha: '2025-10-08', diagnostico: 'Infección urinaria', tratamiento: 'Antibióticos específicos', costo: 120.00 },
            { nombrePaciente: 'Whiskers', nombreMedico: 'Dra. Silva', fecha: '2025-10-05', diagnostico: 'Problemas dentales', tratamiento: 'Limpieza dental', costo: 200.00 },
            { nombrePaciente: 'Sponge', nombreMedico: 'Dr. Ruiz', fecha: '2025-10-03', diagnostico: 'Alergia cutánea', tratamiento: 'Antihistamínicos', costo: 90.00 },
            { nombrePaciente: 'Rex', nombreMedico: 'Dra. López', fecha: '2025-09-28', diagnostico: 'Vacunación anual', tratamiento: 'Vacuna antirrábica', costo: 50.00 },
            { nombrePaciente: 'Mishi', nombreMedico: 'Dr. García', fecha: '2025-09-25', diagnostico: 'Control rutinario', tratamiento: 'Examen general', costo: 70.00 },
            { nombrePaciente: 'Pepo', nombreMedico: 'Dra. Silva', fecha: '2025-09-20', diagnostico: 'Herida en pata', tratamiento: 'Curación y antibióticos', costo: 110.00 }
        ];
    }

    // Obtener todas las fichas
    getAll() {
        return this.fichas;
    }

    // Añadir una nueva ficha
    add(ficha) {
        this.fichas.push(ficha);
    }

    // Eliminar una ficha por índice
    remove(index) {
        this.fichas.splice(index, 1);
    }
}

export default FichaModel;