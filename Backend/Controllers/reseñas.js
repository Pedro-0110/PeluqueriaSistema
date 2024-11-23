const pool = require('../Config/conexionbd');

const obtenerReseñas = (req, res) => {
    const query = `SELECT * FROM Reseñas AS r
                   INNER JOIN Usuarios AS u ON r.usuario_id = u.usuario_id
                   INNER JOIN Profesionales AS p ON r.profesional_id = p.profesional_id
                   INNER JOIN Citas AS c ON r.cita_id = c.cita_id
                   order by r.fecha_reseña desc;`;

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener las reseñas");
        }
        res.status(200).json(result);
    });
};


const obtenerReseña = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Reseñas AS r
                   INNER JOIN Usuarios AS u ON r.usuario_id = u.usuario_id
                   INNER JOIN Profesionales AS p ON r.profesional_id = p.profesional_id
                   INNER JOIN Citas AS c ON r.cita_id = c.cita_id
                   WHERE r.resñna_id = ?;`;

    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener la reseña");
        }
        res.status(200).json(result);
    });
};


const crearReseña = (req, res) => {
    const { usuario_id, profesional_id, cita_id, comentario, puntuacion, fecha_resena } = req.body;
    const query = `INSERT INTO Reseñas (usuario_id, profesional_id, cita_id, comentario, puntuacion, fecha_resena) VALUES (?, ?, ?, ?, ?, ?);`;
    
    pool.query(query, [usuario_id, profesional_id, cita_id, comentario, puntuacion, fecha_resena], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear la reseña");
        }
        res.status(201).json({ message: "Reseña creada exitosamente", resenaId: result.insertId });
    });
};


const editarReseña = (req, res) => {
    const { id } = req.params;
    const { usuario_id, profesional_id, cita_id, comentario, puntuacion, fecha_resena } = req.body;
    const query = `UPDATE Reseñas SET usuario_id = ?, profesional_id = ?, cita_id = ?, comentario = ?, puntuacion = ?, fecha_resena = ? WHERE reseña_id = ?;`;
    
    pool.query(query, [usuario_id, profesional_id, cita_id, comentario, puntuacion, fecha_resena, id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al editar la reseña");
        }
        res.status(200).json({ message: "Reseña actualizada exitosamente" });
    });
};


const eliminarReseña = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Reseñas WHERE reseña_id = ?`;
    
    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al eliminar la reseña");
        }
        res.status(200).json({ message: "Reseña eliminada exitosamente" });
    });
};


const obtenerReseñasRealizadasAlProfesional = (req,res) =>{
    const {id} = req.params
    const query = `select * from Reseñas as r
                   inner join Usuarios as u
                   on r.usuario_id = u.usuario_id
                   inner join Profesionales as p
                   on r.profesional_id = p.profesional_id
                   where r.profesional_id = ?;`

    pool.query(query,[id],(error,result)=>{
        if(error){
            return res.status(500).send("Error al obtener las reseñas que le dejaron al profesional")
        }
        res.status(200).json(result)
    })
}


module.exports = {
    obtenerReseñas,
    obtenerReseña,
    crearReseña,
    editarReseña,
    eliminarReseña,
    obtenerReseñasRealizadasAlProfesional
};
