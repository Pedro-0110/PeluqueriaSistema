const pool = require('../Config/conexionbd');

const obtenerHorariosDisponibles = (req, res) => {
    const query = `SELECT p.nombre_profesional, p.apellido_profesional, p.profesional_id, h.horario_id, h.hora_inicio, h.hora_fin, h.dia_semana FROM HorariosDisponibles AS h
                   INNER JOIN Profesionales AS p
                   ON h.profesional_id = p.profesional_id;`;

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener los horarios disponibles");
        }
        res.status(200).json(result);
    });
};



const crearHorarioDisponible = (req, res) => {
    const { profesional_id, dia_semana, hora_inicio, hora_fin } = req.body;
    const query = `INSERT INTO HorariosDisponibles (profesional_id, dia_semana, hora_inicio, hora_fin)
                   VALUES (?, ?, ?, ?);`;

    pool.query(query, [profesional_id, dia_semana, hora_inicio, hora_fin], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear el horario disponible");
        }
        res.status(201).json({ message: "Horario disponible creado exitosamente", horarioId: result.insertId });
    });
};


const editarHorarioDisponible = (req, res) => {
    const { id } = req.params;
    const { profesional_id, dia_semana, hora_inicio, hora_fin } = req.body;
    const query = `UPDATE HorariosDisponibles SET profesional_id = ?, dia_semana = ?, hora_inicio = ?, hora_fin = ? 
                   WHERE horario_id = ?;`;

    pool.query(query, [profesional_id, dia_semana, hora_inicio, hora_fin, id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al editar el horario disponible");
        }
        res.status(200).json({ message: "Horario disponible actualizado exitosamente" });
    });
};


const eliminarHorarioDisponible = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM HorariosDisponibles WHERE horario_id = ?`;

    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al eliminar el horario disponible");
        }
        res.status(200).json({ message: "Horario disponible eliminado exitosamente" });
    });
};


const obtenerHorarioDisponibleDelProfesional = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM HorariosDisponibles AS h
                   INNER JOIN Profesionales AS p
                   ON h.profesional_id = p.profesional_id
                   WHERE h.profesional_id = ?;`;

    pool.query(query, [id], (error, result) => {
        if (error) {
            return res.status(500).json('Error al obtener los horarios del profesional');
        }

        // Ordenar los días de la semana en orden lógico
        const ordenDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const horariosOrdenados = result.sort((a, b) => ordenDias.indexOf(a.dia_semana) - ordenDias.indexOf(b.dia_semana));

        res.status(200).json(horariosOrdenados);
    });
};


const obtenerHorariosDeAtencionDeTalDia = (req,res) =>{
    const {dia,id} = req.params
    const query = ` select h.hora_inicio, h.hora_fin from HorariosDisponibles as h
                   inner join Profesionales as p
                   on h.profesional_id = p.profesional_id
                   where h.profesional_id = ? and h.dia_semana = ?;`

    pool.query(query,[id, dia],(error,result)=>{
        if(error){
            return res.status(500).json('Error al obtener los horarios del profesional')
        }
        res.status(200).json(result)
    })
}


module.exports = {
    obtenerHorariosDisponibles,
    crearHorarioDisponible,
    editarHorarioDisponible,
    eliminarHorarioDisponible,
    obtenerHorarioDisponibleDelProfesional,
    obtenerHorariosDeAtencionDeTalDia
};
