// MODELO: Gestión de datos de pacientes (conectado al backend Spring Boot)
class PacienteModel {
  constructor(baseUrl = 'http://localhost:8080/api') {
    this.baseUrl = baseUrl;
  }

  // ===============================
  // Obtener todos los pacientes
  // ===============================
  async getAll() {
    try {
      const response = await fetch(`${this.baseUrl}/pacientes`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error('❌ Error al obtener pacientes:', err);
      return [];
    }
  }

  // ===============================
  // Obtener un paciente por ID
  // ===============================
  async getById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/pacientes/${id}`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) throw new Error(`Paciente no encontrado (ID ${id})`);
      return await response.json();
    } catch (err) {
      console.error('❌ Error al obtener paciente:', err);
      return null;
    }
  }

  // ===============================
  // Crear un nuevo paciente
  // ===============================
  async add(paciente) {
    try {
      const response = await fetch(`${this.baseUrl}/pacientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente),
      });

      // Aceptamos tanto 200 como 201 (depende de la config del backend)
      if (![200, 201].includes(response.status)) {
        const msg = await response.text();
        throw new Error(`Error al crear paciente: ${msg}`);
      }

      return await response.json();
    } catch (err) {
      console.error('❌ Error al crear paciente:', err);
      throw err;
    }
  }

  // ===============================
  // Actualizar un paciente existente
  // ===============================
  async update(id, paciente) {
    try {
      const response = await fetch(`${this.baseUrl}/pacientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Error al actualizar paciente: ${msg}`);
      }

      return await response.json();
    } catch (err) {
      console.error('❌ Error al actualizar paciente:', err);
      throw err;
    }
  }

  // ===============================
  // Eliminar un paciente por ID
  // ===============================
  async remove(id) {
    try {
      const response = await fetch(`${this.baseUrl}/pacientes/${id}`, {
        method: 'DELETE',
      });

      if (![200, 204].includes(response.status)) {
        const msg = await response.text();
        throw new Error(`Error al eliminar paciente: ${msg}`);
      }

      return true;
    } catch (err) {
      console.error('❌ Error al eliminar paciente:', err);
      throw err;
    }
  }
}

export default PacienteModel;
