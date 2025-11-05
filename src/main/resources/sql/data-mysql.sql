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

INSERT INTO carrito_items (producto, cantidad, precio_unitario) VALUES
 ('Pipeta antipulgas', 2, 8900.00),
 ('Shampoo hipoalergénico', 1, 6200.00);
