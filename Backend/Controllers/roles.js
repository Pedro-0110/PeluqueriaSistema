const pool = require('../Config/conexionbd')

const obtenerRoles = (req, res) =>{
    const query = `select * from Roles;`

    pool.query(query,(error,result) =>{
        if(error) throw error
        res.send(result)
    })
}

const obtenerRol = (req,res) =>{
    const {id} = req.params
    const query = `select * from Roles where rol_id = ?`
    
    pool.query(query,[id],(error,result) =>{
        if(error) throw error
        res.send(result)
    })
}

module.exports = {
    obtenerRoles,
    obtenerRol
}