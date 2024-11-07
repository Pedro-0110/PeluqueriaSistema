const pool = require('../Config/conexionbd');

const obtenerProfesionales = (req, res) => {
    const query = "SELECT * FROM Profesionales;";
    pool.query(query, (error, result) => {
        if (error) {
            console.error("Error obteniendo profesionales:", error);
            return res.status(500).send({ error: "Error al obtener profesionales" });
        }
        res.send(result);
    });
};

const obtenerProfesional = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM Profesionales WHERE profesional_id = ?";
    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error("Error obteniendo profesional:", error);
            return res.status(500).send({ error: "Error al obtener el profesional" });
        }
        res.send(result);
    });
};

const crearProfesional = (req, res) => {
    const { nombre, apellido, especialidad, descripcion, fecha_ingreso, activo } = req.body;
    if (!nombre || !apellido || !especialidad || !descripcion || !fecha_ingreso || activo == null) {
        return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
    
    const query = "INSERT INTO Profesionales (nombre, apellido, especialidad, descripcion, fecha_ingreso, activo) VALUES (?, ?, ?, ?, ?, ?);";
    pool.query(query, [nombre, apellido, especialidad, descripcion, fecha_ingreso, activo], (error, result) => {
        if (error) {
            console.error("Error creando profesional:", error);
            return res.status(500).send({ error: "Error al crear el profesional" });
        }
        res.send({ message: "Profesional creado exitosamente", result });
    });
};

const editarProfesional = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, especialidad, descripcion, fecha_ingreso, activo } = req.body;
    if (!nombre || !apellido || !especialidad || !descripcion || !fecha_ingreso || activo == null) {
        return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
    
    const query = "UPDATE Profesionales SET nombre = ?, apellido = ?, especialidad = ?, descripcion = ?, fecha_ingreso = ?, activo = ? WHERE profesional_id = ?;";
    pool.query(query, [nombre, apellido, especialidad, descripcion, fecha_ingreso, activo, id], (error, result) => {
        if (error) {
            console.error("Error editando profesional:", error);
            return res.status(500).send({ error: "Error al editar el profesional" });
        }
        res.send({ message: "Profesional actualizado exitosamente", result });
    });
};

const eliminarProfesional = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Profesionales WHERE profesional_id = ?";
    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error("Error eliminando profesional:", error);
            return res.status(500).send({ error: "Error al eliminar el profesional" });
        }
        res.send({ message: "Profesional eliminado exitosamente", result });
    });
};

module.exports = {
    obtenerProfesionales,
    obtenerProfesional,
    crearProfesional,
    editarProfesional,
    eliminarProfesional
};

 