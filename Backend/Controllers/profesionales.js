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
    const { nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional, activo_profesional } = req.body;
    if (!nombre_profesional || !apellido_profesional || !especialidad_profesional || !descripcion_profesional || !fecha_ingreso_profesional || activo_profesional == null) {
        return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
    
    const query = "INSERT INTO Profesionales (nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional, activo_profesional) VALUES (?, ?, ?, ?, ?, ?);";
    pool.query(query, [nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional, activo_profesional], (error, result) => {
        if (error) {
            console.error("Error creando profesional:", error);
            return res.status(500).send({ error: "Error al crear el profesional" });
        }
        res.send({ message: "Profesional creado exitosamente", result });
    });
};

const editarProfesional = (req, res) => {
    const { id } = req.params;
    const { nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional, activo_profesional } = req.body;
    if (!nombre_profesional || !apellido_profesional || !especialidad_profesional || !descripcion_profesional || !fecha_ingreso_profesional || activo_profesional == null) {
        return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
    
    const query = "UPDATE Profesionales SET nombre_profesional = ?, apellido_profesional = ?, especialidad_profesional = ?, descripcion_profesional = ?, fecha_ingreso_profesional = ?, activo_profesional = ? WHERE profesional_id = ?;";
    pool.query(query, [nombre_profesional, apellido_profesional, especialidad_profesional, descripcion_profesional, fecha_ingreso_profesional, activo_profesional, id], (error, result) => {
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

const obtenerNombreIDProfesionales = (req,res) =>{
    const query = `select nombre_profesional, apellido_profesional, profesional_id from Profesionales;`
    pool.query(query,(error,result)=>{
        if (error) {
            console.error("Error obteniendo profesionales:", error);
            return res.status(500).send({ error: "Error al obtener profesionales" });
        }
        res.send(result);
    })
}

module.exports = {
    obtenerProfesionales,
    obtenerProfesional,
    crearProfesional,
    editarProfesional,
    eliminarProfesional,
    obtenerNombreIDProfesionales
};

 