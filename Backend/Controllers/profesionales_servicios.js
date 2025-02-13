const { query } = require('express');
const connection = require('../Config/conexionbd');

const obtenerServiciosDelProfesional = (req,res)=>{
    const query = ` select p.nombre_profesional, p.apellido_profesional, s.nombre_servicio, ps.profesional_id, ps.servicio_id from Profesionales_Servicios as ps
                    inner join Profesionales as p
                    on ps.profesional_id = p.profesional_id
                    inner join Servicios as s
                    on ps.servicio_id = s.servicio_id;`;

    connection.query(query,(error,result) =>{
        if(error){
            return res.status(500).send('Error al obtener los servicios del profesional');
        }
        res.status(200).json(result);
    })
}

const relacionarServicioProfesional = (req,res) =>{
    const {servicio_id, profesional_id} = req.body;
    const query = `insert into Profesionales_Servicios(profesional_id, servicio_id) values (?,?);`;
    connection.query(query,[profesional_id, servicio_id],(error,result)=>{
        if(error){
            return res.status(500).send('Error al relacionar servicio y profesional')
        }
        res.status(200).json(result);
    })
}


const quitarRelacionServicioProfesional = (req,res)=>{
    const {servicio_id, profesional_id} = req.params;
    const query = ` delete from Profesionales_Servicios where profesional_id = ? and servicio_id = ?;`;
    connection.query(query,[profesional_id, servicio_id], (error,result) =>{
        if(error){
            return res.status(500).send('Error al quitar relacion')
        }
        res.status(200).json(result);
    })
}

module.exports = {obtenerServiciosDelProfesional, relacionarServicioProfesional,quitarRelacionServicioProfesional}