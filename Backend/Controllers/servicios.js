const pool = require('../Config/conexionbd');

const obtenerServicios = (req, res) => {
    const query = `SELECT * FROM Servicios;`;
    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener los servicios");
        }
        res.status(200).json(result);
    });
};

const obtenerServicio = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Servicios WHERE servicio_id = ?`;
    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener el servicio");
        }
        res.status(200).json(result);
    });
};

const crearServicio = (req, res) => {
    const { nombre, descripcion, duracion, precio } = req.body;
    const query = `INSERT INTO Servicios (nombre, descripcion, duracion, precio) VALUES (?, ?, ?, ?);`;
    pool.query(query, [nombre, descripcion, duracion, precio], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear el servicio");
        }
        res.status(201).json({ message: "Servicio creado exitosamente", servicioId: result.insertId });
    });
};

const editarServicio = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, duracion, precio } = req.body;
    const query = `UPDATE Servicios SET nombre = ?, descripcion = ?, duracion = ?, precio = ? WHERE servicio_id = ?`;
    pool.query(query, [nombre, descripcion, duracion, precio, id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al editar el servicio");
        }
        res.status(200).json({ message: "Servicio actualizado exitosamente" });
    });
};

const eliminarServicio = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Servicios WHERE servicio_id = ?`;
    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al eliminar el servicio");
        }
        res.status(200).json({ message: "Servicio eliminado exitosamente" });
    });
};

module.exports = {
    obtenerServicios,
    obtenerServicio,
    crearServicio,
    editarServicio,
    eliminarServicio
};
