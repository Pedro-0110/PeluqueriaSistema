const pool = require('../Config/conexionbd');

const obtenerGalerias = (req, res) => {
    const query = `SELECT * FROM Galeria AS g
                   INNER JOIN Profesionales AS p
                   ON g.profesional_id = p.profesional_id;`;

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener las galerías");
        }
        res.status(200).json(result);
    });
};

const obtenerGaleria = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Galeria AS g
                   INNER JOIN Profesionales AS p
                   ON g.profesional_id = p.profesional_id
                   WHERE g.imagen_id = ?;`;

    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener la galería");
        }
        res.status(200).json(result);
    });
};

const crearGaleria = (req, res) => {
    const { profesional_id, url_imagen, descripcion, fecha_subida } = req.body;
    const query = `INSERT INTO Galeria (profesional_id, url_imagen, descripcion, fecha_subida) VALUES (?, ?, ?, ?);`;
    
    pool.query(query, [profesional_id, url_imagen, descripcion, fecha_subida], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear la galería");
        }
        res.status(201).json({ message: "Galería creada exitosamente", galeriaId: result.insertId });
    });
};

const editarGaleria = (req, res) => {
    const { id } = req.params;
    const { profesional_id, url_imagen, descripcion, fecha_subida } = req.body;
    const query = `UPDATE Galeria SET profesional_id = ?, url_imagen = ?, descripcion = ?, fecha_subida = ? WHERE imagen_id = ?;`;
    
    pool.query(query, [profesional_id, url_imagen, descripcion, fecha_subida, id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al editar la galería");
        }
        res.status(200).json({ message: "Galería actualizada exitosamente" });
    });
};

const eliminarGaleria = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Galeria WHERE imagen_id = ?;`;
    
    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al eliminar la galería");
        }
        res.status(200).json({ message: "Galería eliminada exitosamente" });
    });
};

module.exports = {
    obtenerGalerias,
    obtenerGaleria,
    crearGaleria,
    editarGaleria,
    eliminarGaleria
};
