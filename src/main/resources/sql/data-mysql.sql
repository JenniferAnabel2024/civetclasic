USE civet;

INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES
 ('Collar reforzado', 'Collar de nylon para perros medianos', 4500.00, 'collar.jpg'),
 ('Shampoo hipoalergénico', 'Suave para piel sensible', 6200.00, 'shampoo.jpg'),
 ('Pipeta antipulgas', 'Protección 30 días', 8900.00, 'pipeta.jpg');

INSERT INTO pacientes (nombre, especie, imagen) VALUES
 ('Rex', 'Canino', 'perro.jpg'),
 ('Mishi', 'Felino', 'gato.jpg');

INSERT INTO fichas (paciente_id, nombre_medico, fecha, sintomas, observaciones) VALUES
 ((SELECT id FROM pacientes WHERE nombre='Rex'), 'Dra. Gómez', '2025-10-10', 'Tos ocasional', 'Vacunas al día'),
 ((SELECT id FROM pacientes WHERE nombre='Mishi'), 'Dr. Pérez', '2025-10-15', 'Apatía', 'Control en 15 días');

INSERT INTO medicos (nombre, matricula, especialidad, email, telefono, activo) VALUES
 ('Dra. Ana Gómez', 'MP12345', 'Medicina General Veterinaria', 'ana.gomez@civet.com', '261-555-0101', 1),
 ('Dr. Carlos Pérez', 'MP67890', 'Cirugía Veterinaria', 'carlos.perez@civet.com', '261-555-0202', 1),
 ('Dra. Laura Martínez', 'MP54321', 'Dermatología Veterinaria', 'laura.martinez@civet.com', '261-555-0303', 1);

INSERT INTO turnos (fecha_hora, motivo, paciente_id, medico_id) VALUES
 ('2025-12-15 09:00:00', 'Consulta general y vacunación', (SELECT id FROM pacientes WHERE nombre='Rex'), (SELECT id FROM medicos WHERE nombre='Dra. Ana Gómez')),
 ('2025-12-16 14:30:00', 'Control dermatológico', (SELECT id FROM pacientes WHERE nombre='Mishi'), (SELECT id FROM medicos WHERE nombre='Dra. Laura Martínez'));
