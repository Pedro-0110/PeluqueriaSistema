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
    const { profesional_id, url_imagen, descripcion_imagen, fecha_subida_imagen } = req.body;
    const query = `INSERT INTO Galeria (profesional_id, url_imagen, descripcion_imagen, fecha_subida_imagen) VALUES (?, ?, ?, ?);`;
    
    pool.query(query, [profesional_id, url_imagen, descripcion_imagen, fecha_subida_imagen], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear la galería");
        }
        res.status(201).json({ message: "Galería creada exitosamente", galeriaId: result.insertId });
    });
};


const editarGaleria = (req, res) => {
    const { id } = req.params;
    const { profesional_id, url_imagen, descripcion_imagen, fecha_subida_imagen } = req.body;
    const query = `UPDATE Galeria SET profesional_id = ?, url_imagen = ?, descripcion_imagen = ?, fecha_subida_imagen = ? WHERE imagen_id = ?;`;
    
    pool.query(query, [profesional_id, url_imagen, descripcion_imagen, fecha_subida_imagen, id], (error, result) => {
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


const obtenerGaleriaDelProfesional = (req,res) => {
    const {id} = req.params
    const query = `select * from Galeria as g
                   inner join Profesionales as p
                   on g.profesional_id = p.profesional_id
                   where p.profesional_id = ?;`
                   
    pool.query(query, [id], (error,result)=>{
        if(error){
            return res.status(500).send("Error al obtener la galeria del profesional")
        }
        res.status(200).json(result)
    })
}

const obtenerTinturasDelProfesional = (req,res) =>{
    const {id} = req.params
    const query = `select * from Galeria as g
                   inner join Profesionales as p
                   on g.profesional_id = p.profesional_id
                   where p.profesional_id = ? and (g.descripcion_imagen like '%tintura%' or g.descripcion_imagen like '%Tintura%');`
    pool.query(query,[id],(error,result)=>{
        if(error){
            return res.status(500).send("Error al obtener las tinturas del profesional")
        }
        res.status(200).json(result)
    })
}

const obtenerCortesDelProfesional = (req,res) =>{
    const {id} = req.params
    const query = `select * from Galeria as g
                   inner join Profesionales as p
                   on g.profesional_id = p.profesional_id
                   where p.profesional_id = ? and (g.descripcion_imagen like '%corte%' or g.descripcion_imagen like '%Corte%');`
    pool.query(query,[id],(error,result)=>{
        if(error){
            return res.status(500).send("Error al obtener las tinturas del profesional")
        }
        res.status(200).json(result)
    })
}


module.exports = {
    obtenerGalerias,
    obtenerGaleria,
    crearGaleria,
    editarGaleria,
    eliminarGaleria,
    obtenerGaleriaDelProfesional,
    obtenerCortesDelProfesional,
    obtenerTinturasDelProfesional
};
