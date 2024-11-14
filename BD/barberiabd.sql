create database BarberiaBD;
use BarberiaBD;



CREATE TABLE Roles (
    rol_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

insert into Roles (nombre) values ('Administrador');
insert into Roles (nombre) values ('Cliente');

CREATE TABLE Profesionales (
    profesional_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_profesional VARCHAR(100) NOT NULL,
    apellido_profesional VARCHAR(100) NOT NULL,
    especialidad_profesional VARCHAR(100),
    descripcion_profesional TEXT,
    fecha_ingreso_profesional DATE,
    activo_profesional BOOLEAN DEFAULT TRUE
);

INSERT INTO Profesionales (nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional)
VALUES
('Juan', 'Pérez', 'Barbero', 'Especialista en cortes clásicos y modernos', '2023-01-15'),
('Lucía', 'Martínez', 'Colorista', 'Experta en técnicas de coloración avanzadas', '2022-03-22'),
('Carlos', 'Gómez', 'Estilista', 'Estilista con enfoque en moda actual', '2021-07-30'),
('Ana', 'López', 'Barbera', 'Barbera con experiencia en afeitados y cortes a navaja', '2020-11-05'),
('Pedro', 'Hernández', 'Masajista', 'Masajista terapéutico especializado en técnicas de relajación', '2021-09-17'),
('Sofía', 'Ramírez', 'Manicurista', 'Especialista en cuidado y diseño de uñas', '2023-05-08'),
('Diego', 'Fernández', 'Estilista', 'Estilista con enfoque en cortes y peinados personalizados', '2022-06-12'),
('María', 'García', 'Colorista', 'Colorista especializada en balayage y mechas', '2021-04-19'),
('Javier', 'Sánchez', 'Barbero', 'Experto en cortes y afeitados con navaja', '2023-02-25'),
('Carmen', 'Morales', 'Estilista', 'Estilista creativa con técnicas innovadoras', '2022-12-10');


CREATE TABLE Usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(100) NOT NULL,
    apellido_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(100) UNIQUE NOT NULL,
    telefono_usuario VARCHAR(20),
    direccion_usuario VARCHAR(255),
    username_usuario VARCHAR(50) UNIQUE NOT NULL,
    password_usuario VARCHAR(255) NOT NULL, -- Almacenada como hash
    rol_id INT NOT NULL,
    fecha_registro_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id)
    on delete restrict
    on update cascade
);

INSERT INTO Usuarios (nombre_usuario, apellido_usuario, email_usuario, telefono_usuario, direccion_usuario, username_usuario, password_usuario, rol_id)
VALUES
('Carlos', 'Pérez', 'carlos.perez@example.com', '1234567890', 'Calle Falsa 123', 'carlos_p', 'hashed_password_1', 1),
('Lucía', 'Martínez', 'lucia.martinez@example.com', '0987654321', 'Avenida Siempre Viva 456', 'lucia_m', 'hashed_password_2', 2),
('Juan', 'Gómez', 'juan.gomez@example.com', '1122334455', 'Boulevard Central 789', 'juan_g', 'hashed_password_3', 2),
('Ana', 'López', 'ana.lopez@example.com', '6677889900', 'Plaza Mayor 101', 'ana_l', 'hashed_password_4', 1),
('Pedro', 'Hernández', 'pedro.hernandez@example.com', '5566778899', 'Callejón Sin Salida 202', 'pedro_h', 'hashed_password_5', 2),
('Sofía', 'Ramírez', 'sofia.ramirez@example.com', '4433221100', 'Paseo de la Reforma 303', 'sofia_r', 'hashed_password_6', 2),
('Diego', 'Fernández', 'diego.fernandez@example.com', '1234432109', 'Avenida Las Palmas 404', 'diego_f', 'hashed_password_7', 2),
('María', 'García', 'maria.garcia@example.com', '9988776655', 'Paseo del Bosque 505', 'maria_g', 'hashed_password_8', 1),
('Javier', 'Sánchez', 'javier.sanchez@example.com', '5544332211', 'Colina Azul 606', 'javier_s', 'hashed_password_9', 2),
('Carmen', 'Morales', 'carmen.morales@example.com', '7766554433', 'Calle Principal 707', 'carmen_m', 'hashed_password_10', 2);


CREATE TABLE Servicios (
    servicio_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripcion_servicio TEXT,
    duracion_servicio INT NOT NULL, -- Duración en minutos
    precio_servicio DECIMAL(10, 2) NOT NULL
);

INSERT INTO Servicios (nombre_servicio, descripcion_servicio, duracion_servicio, precio_servicio)
VALUES
('Corte de Cabello', 'Corte de cabello personalizado según el estilo deseado.', 30, 15.00),
('Afeitado Clásico', 'Afeitado completo con navaja y productos de alta calidad.', 20, 10.00),
('Coloración de Cabello', 'Aplicación de color en el cabello, incluye productos de cuidado.', 90, 50.00),
('Tratamiento Capilar', 'Tratamiento intensivo para fortalecer y nutrir el cabello.', 45, 25.00),
('Manicura', 'Cuidado de uñas con limpieza, corte y esmaltado.', 30, 20.00),
('Pedicura', 'Tratamiento de cuidado para los pies, incluye exfoliación y esmaltado.', 45, 30.00),
('Depilación Facial', 'Depilación de cejas, bozo o zona facial deseada.', 15, 12.00),
('Masaje Relajante', 'Masaje completo para aliviar tensiones y reducir el estrés.', 60, 40.00),
('Peinado', 'Peinado para eventos especiales, incluye productos de fijación.', 45, 35.00),
('Maquillaje', 'Maquillaje completo para eventos, incluye asesoría de estilo.', 60, 50.00);


CREATE TABLE Profesionales_Servicios (
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    PRIMARY KEY (profesional_id, servicio_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
    on delete cascade
);

INSERT INTO Profesionales_Servicios (profesional_id, servicio_id)
VALUES
(1, 1),  -- Juan Pérez realiza Corte de Cabello
(1, 2),  -- Juan Pérez realiza Afeitado Clásico
(2, 3),  -- Lucía Martínez realiza Coloración de Cabello
(3, 1),  -- Carlos Gómez realiza Corte de Cabello
(3, 4),  -- Carlos Gómez realiza Tratamiento Capilar
(4, 2),  -- Ana López realiza Afeitado Clásico
(4, 7),  -- Ana López realiza Depilación Facial
(5, 8),  -- Pedro Hernández realiza Masaje Relajante
(6, 5),  -- Sofía Ramírez realiza Manicura
(6, 6),  -- Sofía Ramírez realiza Pedicura
(7, 9),  -- Diego Fernández realiza Peinado
(8, 3),  -- María García realiza Coloración de Cabello
(8, 4),  -- María García realiza Tratamiento Capilar
(9, 1),  -- Javier Sánchez realiza Corte de Cabello
(10, 10); -- Carmen Morales realiza Maquillaje



CREATE TABLE Citas (
    cita_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha_cita DATETIME NOT NULL,
    estado_cita ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Completada') DEFAULT 'Pendiente',
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
    on delete restrict
    on update cascade
);

INSERT INTO Citas (usuario_id, profesional_id, servicio_id, fecha_cita, estado_cita)
VALUES
(1, 1, 1, '2024-11-15 10:00:00', 'Confirmada'), -- Carlos Pérez reserva con Juan Pérez para Corte de Cabello
(2, 2, 3, '2024-11-16 14:00:00', 'Pendiente'),  -- Lucía Martínez reserva con Lucía Martínez para Coloración de Cabello
(3, 3, 1, '2024-11-17 09:30:00', 'Completada'), -- Juan Gómez reserva con Carlos Gómez para Corte de Cabello
(4, 4, 2, '2024-11-18 11:00:00', 'Cancelada'),  -- Ana López reserva con Ana López para Afeitado Clásico
(5, 5, 8, '2024-11-19 15:00:00', 'Confirmada'), -- Pedro Hernández reserva con Pedro Hernández para Masaje Relajante
(6, 6, 5, '2024-11-20 13:00:00', 'Pendiente'),  -- Sofía Ramírez reserva con Sofía Ramírez para Manicura
(7, 7, 9, '2024-11-21 16:30:00', 'Confirmada'), -- Diego Fernández reserva con Diego Fernández para Peinado
(8, 8, 4, '2024-11-22 12:00:00', 'Pendiente'),  -- María García reserva con María García para Tratamiento Capilar
(9, 9, 1, '2024-11-23 17:00:00', 'Completada'), -- Javier Sánchez reserva con Javier Sánchez para Corte de Cabello
(10, 10, 10, '2024-11-24 18:00:00', 'Confirmada'); -- Carmen Morales reserva con Carmen Morales para Maquillaje


CREATE TABLE HorariosDisponibles (
    horario_id INT PRIMARY KEY AUTO_INCREMENT,
    profesional_id INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
);

INSERT INTO HorariosDisponibles (profesional_id, dia_semana, hora_inicio, hora_fin)
VALUES
(1, 'Lunes', '09:00:00', '13:00:00'),       -- Juan Pérez disponible el lunes por la mañana
(1, 'Martes', '14:00:00', '18:00:00'),      -- Juan Pérez disponible el martes por la tarde
(2, 'Miércoles', '10:00:00', '14:00:00'),   -- Lucía Martínez disponible el miércoles por la mañana
(2, 'Viernes', '09:00:00', '12:00:00'),     -- Lucía Martínez disponible el viernes por la mañana
(3, 'Jueves', '15:00:00', '19:00:00'),      -- Carlos Gómez disponible el jueves por la tarde
(3, 'Sábado', '10:00:00', '14:00:00'),      -- Carlos Gómez disponible el sábado por la mañana
(4, 'Lunes', '08:00:00', '12:00:00'),       -- Ana López disponible el lunes por la mañana
(4, 'Martes', '15:00:00', '19:00:00'),      -- Ana López disponible el martes por la tarde
(5, 'Viernes', '14:00:00', '18:00:00'),     -- Pedro Hernández disponible el viernes por la tarde
(6, 'Sábado', '09:00:00', '13:00:00');      -- Sofía Ramírez disponible el sábado por la mañana


CREATE TABLE Galeria (
    imagen_id INT PRIMARY KEY AUTO_INCREMENT,
    profesional_id INT,
    url_imagen VARCHAR(255) NOT NULL,
    descripcion_imagen TEXT,
    fecha_subida_imagen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
    on delete cascade 
    on update cascade
);

CREATE TABLE Reseñas (
    reseña_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    profesional_id INT NOT NULL,
    cita_id INT NOT NULL,
    comentario TEXT,
    puntuacion INT CHECK(puntuacion BETWEEN 1 AND 5),
    fecha_reseña TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (cita_id) REFERENCES Citas(cita_id)
    on delete restrict
    on update cascade
);

INSERT INTO Reseñas (usuario_id, profesional_id, cita_id, comentario, puntuacion)
VALUES
(1, 1, 1, 'Excelente atención y profesionalismo. Quedé muy satisfecho con el servicio.', 5),
(2, 2, 2, 'El color quedó muy bien, pero el tiempo de espera fue largo.', 4),
(3, 3, 3, 'Muy contento con el corte. El profesional es muy detallista.', 5),
(4, 4, 4, 'El afeitado fue rápido y eficiente, pero esperaba algo más.', 3),
(5, 5, 5, 'Un masaje muy relajante, realmente lo recomiendo.', 5),
(6, 6, 6, 'Buen trabajo, pero el esmalte no duró tanto como esperaba.', 3),
(7, 7, 7, 'Peinado excelente, duró toda la noche del evento.', 5),
(8, 8, 8, 'El tratamiento dejó mi cabello suave y brillante. Muy recomendable.', 5),
(9, 9, 9, 'El corte fue decente, aunque no era exactamente lo que pedí.', 3),
(10, 10, 10, 'El maquillaje fue espectacular, pero tardaron más de lo esperado.', 4);

