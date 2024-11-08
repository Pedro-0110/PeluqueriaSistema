create database BarberiaBD;
use BarberiaBD;

CREATE TABLE Roles (
    rol_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);
select * from Roles;
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

insert into Profesionales (nombre, apellido, especialidad, descripcion, fecha_ingreso, activo) values ("Rodrigo", "Meuli", "Barbero", "", "24-11-08", true); 
insert into Profesionales (nombre, apellido, especialidad, descripcion, fecha_ingreso, activo) values ("Nicolas", "Navarro", "Barbero", "", "24-11-08", true); 
insert into Profesionales (nombre, apellido, especialidad, descripcion, fecha_ingreso, activo) values ("Nahuel", "Navarro", "Perfilado", "", "24-11-08", true); 

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

insert into Usuarios (nombre, apellido, email, telefono, direccion, username, password, rol_id, fecha_registro) values ("Pedro","Cordoba","Pedrokpo01@gmail.com","4514232","pedrito","Laprida","123456789",1,"07/11/24");
select * from Usuarios;

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

insert into Galeria(profesional_id, url_imagen, descripcion, fecha_subida) values (2, "https://www.primor.eu/blog/wp-content/uploads/2024/03/PEINADOS-HOMBRE-ENTRADAS-1.jpg", "", "24/07/11") ;

select * from Galeria as g
inner join Profesionales as p 
on g.profesional_id = p.profesional_id;

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
