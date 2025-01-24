const connection = require('../Config/conexionbd');

const obtenerPromociones = (req, res) =>{
    const {profesional_id} = req.params;
    const query = `select * from Promociones where profesional_id = ?;`;
    connection.query(query,[profesional_id],(error,result)=>{
        if(error){
            return res.status(500).send('Error al obtener promociones');
        }
        res.status(200).json(result);
    })
}

const agregarPromocion = (req, res) =>{
    const {id_profesional, url_promocion} = req.body;
    const query = `insert into Promociones (url_promocion, profesional_id) values (?, ?);`;
    connection.query(query,[url_promocion, id_profesional],(error,result)=>{
        if(error){
            return res.status(500).send("Error al agregar promocion");
        }
        res.status(200).json(result);
    })
}

const eliminarPromocion = (req,res) =>{
    const {id_promocion, id_profesional} = req.params;
    const query = `delete from Promociones where id = ? and profesional_id = ?;`;
    connection.query(query,[id_promocion, id_profesional],(error,result)=>{
        if(error){
            return res.status(500).send('Error al eliminar promocion');
        }
        res.status(200).json(result);
    })
}

const editarMostrarPromociones = (req, res)=>{
    const {mostrar_promociones} = req.body;
    const query = `update ConfiguracionGlobal set mostrar_promociones = ?;`;
    connection.query(query,[mostrar_promociones], (error,result)=>{
        if(error){
            return res.status(500).send('Error al editar el estado de mostrar promociones');
        }
        res.status(200).json(result);
    })
}

const verificarSiMostrarPromociones = (req,res) =>{

    const query = `select mostrar_promociones from ConfiguracionGlobal limit 1;`;

    connection.query(query, (error, result) => {
        if (error) {
            console.error('Error al obtener configuración global:', error);
            return res.status(500).send('Error al obtener configuración global');
        }

        if (result.length === 0) {
            // Si no hay registros en la tabla
            return res.status(404).send('No se encontró la configuración global');
        }

        // Devolver solo el valor necesario
        res.status(200).json({ mostrarPromociones: result[0].mostrar_promociones });
    });

}

module.exports = {obtenerPromociones, agregarPromocion, eliminarPromocion, editarMostrarPromociones, verificarSiMostrarPromociones};