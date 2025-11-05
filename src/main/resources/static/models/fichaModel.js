// models/FichaModel.js
// MODELO: Gestión de fichas médicas (persistente en backend)
class FichaModel {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }

  // ==========================================
  // Obtener todas las fichas médicas
  // ==========================================
  async getAll() {
    const r = await fetch(`${this.baseUrl}/fichas`);
    return r.ok ? await r.json() : [];
  }

  // ==========================================
  // Añadir una nueva ficha médica
  // ==========================================
  async add(ficha) {
    // El backend usa campos: pacienteId, nombreMedico, fecha, sintomas, observaciones
    // Mapear campos del front al formato del backend
    const payload = {
      pacienteId: ficha.pacienteId ?? null, // si el front elige el paciente de un <select>
      nombreMedico: ficha.nombreMedico,
      fecha: ficha.fecha,
      sintomas: ficha.diagnostico,
      observaciones: `Tratamiento: ${ficha.tratamiento || ''} | Costo: ${ficha.costo || 0}`
    };

    const r = await fetch(`${this.baseUrl}/fichas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      throw new Error('No se pudo guardar la ficha médica');
    }

    return await r.json();
  }

  // ==========================================
  // Actualizar una ficha existente
  // ==========================================
  async update(id, ficha) {
    const payload = {
      pacienteId: ficha.pacienteId ?? null,
      nombreMedico: ficha.nombreMedico,
      fecha: ficha.fecha,
      sintomas: ficha.diagnostico,
      observaciones: `Tratamiento: ${ficha.tratamiento || ''} | Costo: ${ficha.costo || 0}`
    };

    const r = await fetch(`${this.baseUrl}/fichas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      throw new Error('No se pudo actualizar la ficha médica');
    }

    return await r.json();
  }

  // ==========================================
  // Eliminar una ficha por ID
  // ==========================================
  async remove(id) {
    const r = await fetch(`${this.baseUrl}/fichas/${id}`, { method: 'DELETE' });
    if (!r.ok) throw new Error('No se pudo eliminar la ficha');
    return true;
  }

  // ==========================================
  // Obtener lista de pacientes (para el <select>)
  // ==========================================
  async getPacientes() {
    const r = await fetch(`${this.baseUrl}/pacientes`);
    return r.ok ? await r.json() : [];
  }
}

export default FichaModel;
