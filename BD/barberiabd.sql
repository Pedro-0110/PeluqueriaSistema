create database BarberiaBD;
use BarberiaBD;
drop database BarberiaBD;

SET lc_time_names = 'es_ES';

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
    fecha_registro_profesional TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo_profesional BOOLEAN DEFAULT TRUE,
    imagen_profesional varchar(500) default 'sin agregar'
);

CREATE TABLE Usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(100) NOT NULL,
    apellido_usuario VARCHAR(100) NOT NULL,
    telefono_usuario VARCHAR(20),
    username_usuario VARCHAR(50) UNIQUE NOT NULL,
    password_usuario VARCHAR(255) NOT NULL, -- Almacenada como hash
    rol_id INT NOT NULL,
    fecha_registro_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id)
    on delete restrict
    on update cascade);

CREATE TABLE Servicios (
    servicio_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripcion_servicio TEXT,
    duracion_servicio INT NOT NULL, -- Duración en minutos
    precio_servicio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Profesionales_Servicios (
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    PRIMARY KEY (profesional_id, servicio_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
    on delete cascade);
    
CREATE TABLE Citas (
    cita_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha_cita DATETIME NOT NULL,
    estado_cita ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Completada') DEFAULT 'Pendiente',
    nota varchar(150) default 'sin agregar',
    fecha_realizada_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
    on delete restrict
    on update cascade
);

CREATE TABLE ConfiguracionGlobal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mostrar_promociones BOOLEAN DEFAULT FALSE
);

create table Promociones(
id int primary key auto_increment,
url_promocion varchar(500),
fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
profesional_id int,
foreign key (profesional_id) REFERENCES Profesionales(profesional_id)
);


CREATE TABLE HorariosDisponibles (
    horario_id INT PRIMARY KEY AUTO_INCREMENT,
    profesional_id INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
);

CREATE TABLE Imagenes (
    imagen_id INT PRIMARY KEY AUTO_INCREMENT,
    profesional_id INT,
    url_imagen VARCHAR(255) NOT NULL,
    descripcion_imagen TEXT,
    fecha_subida_imagen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
    on delete cascade 
    on update cascade
);

CREATE TABLE Videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    profesional_id INT,
    url_video VARCHAR(255) NOT NULL,
    descripcion_video TEXT,
    fecha_subida_video TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
    on delete cascade 
    on update cascade
);

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
