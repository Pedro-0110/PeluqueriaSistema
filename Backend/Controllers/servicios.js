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
    const { nombre_servicio, descripcion_servicio, duracion_servicio, precio_servicio } = req.body;
    const query = `INSERT INTO Servicios (nombre_servicio, descripcion_servicio, duracion_servicio, precio_servicio) VALUES (?, ?, ?, ?);`;

    pool.query(query, [nombre_servicio, descripcion_servicio, duracion_servicio, precio_servicio], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear el servicio");
        }
        res.status(201).json({ message: "Servicio creado exitosamente", servicioId: result.insertId });
    });
};


const editarServicio = (req, res) => {
    const { id } = req.params;
    const { nombre_servicio, descripcion_servicio, duracion_servicio, precio_servicio } = req.body;
    const query = `UPDATE Servicios SET nombre_servicio = ?, descripcion_servicio = ?, duracion_servicio = ?, precio_servicio = ? WHERE servicio_id = ?`;

    pool.query(query, [nombre_servicio, descripcion_servicio, duracion_servicio, precio_servicio, id], (error, result) => {
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


const obtenerServiciosDelProfesional = (req, res) =>{
    const {id} = req.params
    const query = `select * from Profesionales_Servicios as ps
                   inner join Profesionales as p
                   on ps.profesional_id = p.profesional_id
                   inner join Servicios as s
                   on ps.servicio_id = s.servicio_id
                   where ps.profesional_id = ?;`

    pool.query(query,[id],(error,result)=>{
        if(error){
            return res.status(500).send('Error al obtener los servicios del profesional!')
        }
        res.status(200).json(result)
    })
}


module.exports = {
    obtenerServicios,
    obtenerServicio,
    crearServicio,
    editarServicio,
    eliminarServicio,
    obtenerServiciosDelProfesional
};
