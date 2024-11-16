const pool = require('../Config/conexionbd');

const obtenerCitas = (req, res) => {
    const query = `SELECT * FROM Citas AS c
                   INNER JOIN Usuarios AS u ON c.usuario_id = u.usuario_id
                   INNER JOIN Profesionales AS p ON c.profesional_id = p.profesional_id
                   INNER JOIN Servicios AS s ON c.servicio_id = s.servicio_id
                   order by c.fecha_cita desc
                   ;`;
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
    const { usuario_id, profesional_id, servicio_id, fecha_cita, estado_cita } = req.body;
    const query = `INSERT INTO Citas (usuario_id, profesional_id, servicio_id, fecha_cita, estado_cita) 
                   VALUES (?, ?, ?, ?, ?);`;

    pool.query(query, [usuario_id, profesional_id, servicio_id, fecha_cita, estado_cita], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear la cita");
        }
        res.status(201).json({ message: "Cita creada exitosamente", citaId: result.insertId });
    });
};

const editarCita = (req, res) => {
    const { id } = req.params;
    const { usuario_id, profesional_id, servicio_id, fecha_cita, estado_cita } = req.body;
    const query = `UPDATE Citas SET usuario_id = ?, profesional_id = ?, servicio_id = ?, fecha_cita = ?, estado_cita = ? 
                   WHERE cita_id = ?;`;

    pool.query(query, [usuario_id, profesional_id, servicio_id, fecha_cita, estado_cita, id], (error, result) => {
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

const cancelarCita = (req,res)=>{
    const{id} = req.params
    const query = `update Citas set estado_cita = 'Cancelada' where cita_id = ?;`
    pool.query(query,[id],(error,result)=>{
        if(error){
            console.error(error);
            return res.status(500).send("Error al cancelar la cita");
        }
        res.status(200).json({message: 'Cita cancelada correctamente!'})
    })
}

const confirmarCita = (req,res) =>{
    const {id} = req.params
    const query = `update Citas set estado_cita = 'Confirmada' where cita_id = ?;`
    pool.query(query,[id],(error,result)=>{
        if(error){
            console.log(error)
            return res.status(500).send("Error al confirmar la cita!")
        }
        res.status(200).json({message: 'Cita confirmada correctamente!'})
    })
}

const busquedaCitas = (req, res) =>{
    const {nombre_apellido} = req.params
    const valorNombreApellido = `%${nombre_apellido.toUpperCase()}%`
    const query = `select * from Citas as c
                   inner join Usuarios as u
                   on c.usuario_id = u.usuario_id
                   inner join Profesionales as p
                   on c.profesional_id = p.profesional_id
                   inner join Servicios as s
                   on c.servicio_id = s.servicio_id
                   where upper(p.nombre_profesional) like ?
                   or upper(p.apellido_profesional) like ?
                   or upper(u.nombre_usuario) like ?
                   or upper(u.apellido_usuario) like ?;`
    pool.query(query,[valorNombreApellido,valorNombreApellido,valorNombreApellido,valorNombreApellido],(error,result)=>{
                        if(error){
                            return res.status(500).send('Error al realizar la busqueda de Citas')
                        }
                        res.status(200).json(result)     
                    })}


module.exports = {
    obtenerCitas,
    obtenerCita,
    crearCita,
    editarCita,
    eliminarCita,
    cancelarCita,
    confirmarCita,
    busquedaCitas
};
