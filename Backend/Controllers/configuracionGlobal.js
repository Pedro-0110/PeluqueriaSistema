const connection = require('../Config/conexionbd');

const verificarSiMostrarPromociones = (req, res)=>{
    const query = `select * from ConfiguracionGlobal;`;
    connection.query(query,(error,result)=>{
        if(error){
            return res.status(500).send('Error al verificar configuracion global');
        }
        res.status(200).json(result);
    })
}

const editarMostrarPromociones = (req, res) =>{
    let {mostrar_promociones} = req.body;
    mostrar_promociones = mostrar_promociones === true || mostrar_promociones === "true" || mostrar_promociones === 1 ? 1 : 0;
    const query = `update ConfiguracionGlobal set mostrar_promociones = ?;`;
    connection.query(query,[mostrar_promociones],(error, result)=>{
        if(error){
            return res.status(500).send('Error al editar la configuracion global');
        }
        res.status(204);
    })
}

module.exports = {verificarSiMostrarPromociones, editarMostrarPromociones};