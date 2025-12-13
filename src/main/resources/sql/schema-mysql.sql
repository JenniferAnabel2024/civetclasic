CREATE DATABASE IF NOT EXISTS civet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE civet;

DROP TABLE IF EXISTS turnos;
DROP TABLE IF EXISTS fichas;
DROP TABLE IF EXISTS medicos;
DROP TABLE IF EXISTS carrito_items;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS pacientes;

CREATE TABLE productos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(1000),
  precio DECIMAL(12,2),
  imagen VARCHAR(255)
);

CREATE TABLE pacientes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  especie VARCHAR(100),
  imagen VARCHAR(255)
);

CREATE TABLE medicos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  matricula VARCHAR(100),
  especialidad VARCHAR(255),
  email VARCHAR(255),
  telefono VARCHAR(50),
  activo INT DEFAULT 1,
  created_at DATETIME
);

CREATE TABLE turnos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  fecha_hora DATETIME NOT NULL,
  motivo VARCHAR(1000),
  paciente_id BIGINT,
  medico_id BIGINT,
  CONSTRAINT fk_turno_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_turno_medico FOREIGN KEY (medico_id) REFERENCES medicos(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE fichas (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  paciente_id BIGINT NOT NULL,
  nombre_medico VARCHAR(255),
  fecha DATE,
  sintomas VARCHAR(1000),
  observaciones VARCHAR(2000),
  CONSTRAINT fk_ficha_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE carrito_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  producto VARCHAR(255),
  cantidad INT,
  precio_unitario DECIMAL(12,2)
);
