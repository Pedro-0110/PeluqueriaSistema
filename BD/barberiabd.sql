create database BarberiaBD;
use BarberiaBD;
drop database BarberiaBD;

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
    activo_profesional BOOLEAN DEFAULT TRUE,
    imagen_profesional varchar(500) default 'sin agregar'
);

insert into Profesionales (nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional, activo_profesional) values('Nicolas', 'Navarro', 'Barbero', 'Detalles', '24-12-9', 1);
insert into Profesionales (nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional, activo_profesional) values('Nahuel', 'Navarro', 'Barbero', 'Detalles', '24-12-9', 1);

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
    on update cascade);
    
    -- Insertar usuario administrador (rol_id = 1)
INSERT INTO Usuarios (nombre_usuario, apellido_usuario, email_usuario, telefono_usuario, direccion_usuario, username_usuario, password_usuario, rol_id)
VALUES('Admin', 'Principal', 'admin@example.com', '123456789', 'Calle Ficticia 123', 'admin', 'hashed_password_admin', 1);
INSERT INTO Usuarios (nombre_usuario, apellido_usuario, email_usuario, telefono_usuario, direccion_usuario, username_usuario, password_usuario, rol_id)
VALUES('Nicolas', 'Pomares', 'nico@example.com', '123456789', 'Calle Ficticia 123', 'client1e', 'hashed_password_admin', 2),
('Rodrigo', 'Sandrus', 'rodrigo@example.com', '123456789', 'Calle Ficticia 123', 'cliente2', 'hashed_password_admin', 2),
('Pedro', 'Cordoba', 'pedro@example.com', '123456789', 'Calle Ficticia 123', 'cliente3', 'hashed_password_admin', 2),
('Nahuel', 'Rodriguez', 'nahuel@example.com', '123456789', 'Calle Ficticia 123', 'cliente4', 'hashed_password_admin', 2),
('Jonathan', 'Cordoba', 'jonathan@example.com', '123456789', 'Calle Ficticia 123', 'cliente5', 'hashed_password_admin', 2),
('Gonzalo', 'Manzone', 'gonzalo@example.com', '123456789', 'Calle Ficticia 123', 'cliente6', 'hashed_password_admin', 2),
('Henry', 'Chinaski', 'henry@example.com', '123456789', 'Calle Ficticia 123', 'cliente7', 'hashed_password_admin', 2);


CREATE TABLE Servicios (
    servicio_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripcion_servicio TEXT,
    duracion_servicio INT NOT NULL, -- Duración en minutos
    precio_servicio DECIMAL(10, 2) NOT NULL
);

insert into Servicios (nombre_servicio, descripcion_servicio, duracion_servicio, precio_servicio) values ('Tintura', 'Coloracion', 120, 10000),('Corte de cabello', '', 120, 10000);

CREATE TABLE Profesionales_Servicios (
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    PRIMARY KEY (profesional_id, servicio_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
    on delete cascade);
    
    insert into Profesionales_Servicios (profesional_id,servicio_id) values (1,1);
    insert into Profesionales_Servicios (profesional_id,servicio_id) values (1,2);

CREATE TABLE Citas (
    cita_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha_cita DATETIME NOT NULL,
    estado_cita ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Completada') DEFAULT 'Pendiente',
    nota varchar(150) default 'sin agregar',
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
    on delete restrict
    on update cascade
);

-- En caso de consultar una fecha en un tipo de dato datetime debo ser explicito que estoy buscando un date ya que sino tomara el time como 00:00
select dayname(fecha_cita), time(fecha_cita) 
from Citas as c 
inner join Profesionales as p
on c.profesional_id = p.profesional_id 
inner join Servicios as s 
on c.servicio_id = s.servicio_id
 where estado_cita = 'Pendiente' and date(fecha_cita) = '25-11-24' and p.profesional_id = 1;
 
 select dayname(fecha_cita) as dia, time(fecha_cita) as hora 
                        from Citas as c 
                        inner join Profesionales as p
                        on c.profesional_id = p.profesional_id 
                        inner join Servicios as s 
                        on c.servicio_id = s.servicio_id
                        where estado_cita = 'Pendiente' and date(fecha_cita) = '17-11-24' and p.profesional_id = 1;
 
 select h.hora_inicio, h.hora_fin from HorariosDisponibles as h
                   inner join Profesionales as p
                   on h.profesional_id = p.profesional_id
                   where h.profesional_id = 1 and h.dia_semana = 'Lunes';

select dia_semana, hora_inicio, hora_fin from HorariosDisponibles as h
inner join Profesionales as p
on h.profesional_id = p.profesional_id
where p.profesional_id = 1;

SET lc_time_names = 'es_ES';

CREATE TABLE HorariosDisponibles (
    horario_id INT PRIMARY KEY AUTO_INCREMENT,
    profesional_id INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
);

-- Inserción de horarios para el profesional con ID 1
INSERT INTO HorariosDisponibles (profesional_id, dia_semana, hora_inicio, hora_fin)
VALUES
    (1, 'Lunes', '09:00:00', '13:00:00'),
    (1, 'Lunes', '17:00:00', '22:00:00'),
    (1, 'Martes', '09:00:00', '13:00:00'),
    (1, 'Martes', '17:00:00', '22:00:00'),
    (1, 'Miércoles', '09:00:00', '13:00:00'),
    (1, 'Miércoles', '17:00:00', '22:00:00'),
    (1, 'Jueves', '09:00:00', '13:00:00'),
    (1, 'Jueves', '17:00:00', '22:00:00'),
    (1, 'Viernes', '09:00:00', '13:00:00'),
    (1, 'Viernes', '17:00:00', '22:00:00'),
    (1, 'Sábado', '09:00:00', '13:00:00'),
    (1, 'Sábado', '17:00:00', '22:00:00');

-- Inserción de horarios para el profesional con ID 2
INSERT INTO HorariosDisponibles (profesional_id, dia_semana, hora_inicio, hora_fin)
VALUES
    (2, 'Lunes', '09:00:00', '13:00:00'),
    (2, 'Lunes', '17:00:00', '22:00:00'),
    (2, 'Martes', '09:00:00', '13:00:00'),
    (2, 'Martes', '17:00:00', '22:00:00'),
    (2, 'Miércoles', '09:00:00', '13:00:00'),
    (2, 'Miércoles', '17:00:00', '22:00:00'),
    (2, 'Jueves', '09:00:00', '13:00:00'),
    (2, 'Jueves', '17:00:00', '22:00:00'),
    (2, 'Viernes', '09:00:00', '13:00:00'),
    (2, 'Viernes', '17:00:00', '22:00:00'),
    (2, 'Sábado', '09:00:00', '13:00:00'),
    (2, 'Sábado', '17:00:00', '22:00:00');


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

insert into Galeria (profesional_id, url_imagen, descripcion_imagen) values 
(1, 'https://i.imgur.com/e79xA9m.jpeg', 'Tintura'),
(1, 'https://i.imgur.com/krBNfaJ.jpeg', 'Tintura'),
(1, 'https://i.imgur.com/ZS3Alyr.jpeg', 'Tintura'),
(1, 'https://i.imgur.com/dzIwruK.jpeg', 'Tintura'),
(1, 'https://i.imgur.com/tVrCVud.jpeg', 'Tintura'),
(1, 'https://i.imgur.com/gRrb5Er.jpeg', 'Tintura'),
(1, 'https://i.imgur.com/13nptTS.jpeg', 'Corte'),
(1, 'https://i.imgur.com/RvLXzg4.jpeg', 'Corte'),
(1, 'https://i.imgur.com/wM7tS41.jpeg', 'Corte'),
(1, 'https://i.imgur.com/U3Gn5MF.jpeg', 'Corte'),
(1, 'https://i.imgur.com/0egwas3.jpeg', 'Corte'),
( 1, 'https://i.imgur.com/8jDAwHH.jpeg', 'Corte'),
(1, 'https://i.imgur.com/B6qUVbS.jpeg', 'Corte'),
(1, 'https://i.imgur.com/8j7hMoO.jpeg', 'Corte');


CREATE TABLE Reseñas (
    reseña_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    profesional_id INT NOT NULL,
    comentario TEXT,
    puntuacion INT CHECK(puntuacion BETWEEN 1 AND 5),
    fecha_reseña TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
    on delete restrict
    on update cascade
);

SELECT DISTINCT h.hora_inicio, h.hora_fin
FROM HorariosDisponibles h
LEFT JOIN Citas c
  ON h.profesional_id = c.profesional_id
  AND DATE(c.fecha_cita) = '2024-12-02' -- Cambia por la fecha deseada
  AND TIME(c.fecha_cita) BETWEEN h.hora_inicio AND h.hora_fin
  AND c.estado_cita = 'Pendiente' -- Solo consideramos las citas pendientes
WHERE h.profesional_id = 1 -- ID del profesional
  AND h.dia_semana = DAYNAME('2024-12-02') -- Obtiene el día en texto como 'Lunes', 'Martes', etc.
  AND c.cita_id IS NULL; -- Excluye horarios ocupados por citas pendientes

update Citas as c set estado_cita = 'Confirmada', nota = "" where cita_id = 2 and profesional_id = 1;

select * from Reseñas;

-- Consulta para verificar que el usuario solo haya dejado como maximo un comentario por profesional
select count(usuario_id) from Reseñas
where profesional_id = 1 and usuario_id = 12;

select * from Usuarios;

select count(estado_cita) as cantidadCitasPendientes from Citas where estado_cita = 'Pendiente' and usuario_id = 4;

