const pool = require('../Config/conexionbd');

const obtenerCitas = (req, res) => {
    const query = `SELECT * FROM Citas AS c
                   INNER JOIN Usuarios AS u ON c.usuario_id = u.usuario_id
                   INNER JOIN Profesionales AS p ON c.profesional_id = p.profesional_id
                   INNER JOIN Servicios AS s ON c.servicio_id = s.servicio_id;`;
    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener las citas");
        }
        res.status(200).json(result);
    });
};

const obtenerCita = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Citas AS c
                   INNER JOIN Usuarios AS u ON c.usuario_id = u.usuario_id
                   INNER JOIN Profesionales AS p ON c.profesional_id = p.profesional_id
                   INNER JOIN Servicios AS s ON c.servicio_id = s.servicio_id
                   WHERE c.cita_id = ?;`;

    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener la cita");
        }
        res.status(200).json(result);
    });
};

const crearCita = (req, res) => {
    const { usuario_id, profesional_id, servicio_id, fecha_cita, estado } = req.body;
    const query = `INSERT INTO Citas (usuario_id, profesional_id, servicio_id, fecha_cita, estado) 
                   VALUES (?, ?, ?, ?, ?);`;

    pool.query(query, [usuario_id, profesional_id, servicio_id, fecha_cita, estado], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear la cita");
        }
        res.status(201).json({ message: "Cita creada exitosamente", citaId: result.insertId });
    });
};

const editarCita = (req, res) => {
    const { id } = req.params;
    const { usuario_id, profesional_id, servicio_id, fecha_cita, estado } = req.body;
    const query = `UPDATE Citas SET usuario_id = ?, profesional_id = ?, servicio_id = ?, fecha_cita = ?, estado = ? 
                   WHERE cita_id = ?;`;

    pool.query(query, [usuario_id, profesional_id, servicio_id, fecha_cita, estado, id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al editar la cita");
        }
        res.status(200).json({ message: "Cita actualizada exitosamente" });
    });
};

const eliminarCita = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Citas WHERE cita_id = ?`;

    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al eliminar la cita");
        }
        res.status(200).json({ message: "Cita eliminada exitosamente" });
    });
};

module.exports = {
    obtenerCitas,
    obtenerCita,
    crearCita,
    editarCita,
    eliminarCita
};