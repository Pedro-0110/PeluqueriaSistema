create database BarberiaBD;
use BarberiaBD;

CREATE TABLE Roles (
    rol_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO Roles (nombre) VALUES ('Administrador'), ('Cliente');

CREATE TABLE Profesionales (
    profesional_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    descripcion TEXT,
    fecha_ingreso DATE,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE Usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Almacenada como hash
    rol_id INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id)
);

CREATE TABLE Servicios (
    servicio_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    duracion INT NOT NULL, -- Duración en minutos
    precio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Profesionales_Servicios (
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    PRIMARY KEY (profesional_id, servicio_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
);

CREATE TABLE Citas (
    cita_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha_cita DATETIME NOT NULL,
    estado ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Completada') DEFAULT 'Pendiente',
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id)
);

CREATE TABLE HorariosDisponibles (
    horario_id INT PRIMARY KEY AUTO_INCREMENT,
    profesional_id INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
);

CREATE TABLE Galeria (
    imagen_id INT PRIMARY KEY AUTO_INCREMENT,
    profesional_id INT,
    url_imagen VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profesional_id) REFERENCES Profesionales(profesional_id)
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
);
