const pool = require('../Config/conexionbd');

const obtenerImagenes = (req, res) => {
    const query = `SELECT i.url_imagen, i.descripcion_imagen, p.nombre_profesional, p.apellido_profesional, i.fecha_subida_imagen, i.imagen_id, p.profesional_id FROM Imagenes AS i
                   INNER JOIN Profesionales AS p
                   ON i.profesional_id = p.profesional_id;`;

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener las imagenes");
        }
        res.status(200).json(result);
    });
};


const obtenerImagen = (req, res) => {
    const { id } = req.params;
    const query = `SELECT i.url_imagen, p.nombre_profesional, p.apellido_profesional FROM Imagenes AS i
                   INNER JOIN Profesionales AS p
                   ON i.profesional_id = p.profesional_id
                   WHERE i.imagen_id = ?;`;

    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener la imagen");
        }
        res.status(200).json(result);
    });
};


const crearImagen = (req, res) => {
    const { profesional_id, url_imagen, descripcion_imagen, fecha_subida_imagen } = req.body;
    const query = `INSERT INTO Imagenes (profesional_id, url_imagen, descripcion_imagen) VALUES (?, ?, ?);`;
    
    pool.query(query, [profesional_id, url_imagen, descripcion_imagen], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear la imagen");
        }
        res.status(201).json({ message: "Imagen ingresada exitosamente", imagenId: result.insertId });
    });
};


const editarImagen = (req, res) => {
    const { id } = req.params;
    const { profesional_id, url_imagen, descripcion_imagen, fecha_subida_imagen } = req.body;
    const query = `UPDATE Imagenes SET profesional_id = ?, url_imagen = ?, descripcion_imagen = ? WHERE imagen_id = ?;`;
    
    pool.query(query, [profesional_id, url_imagen, descripcion_imagen,  id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al editar la imagen");
        }
        res.status(200).json({ message: "Imagen actualizada exitosamente" });
    });
};


const eliminarImagen = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Imagenes WHERE imagen_id = ?;`;
    
    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al eliminar la imagen");
        }
        res.status(200).json({ message: "Imagen eliminada exitosamente" });
    });
};


const obtenerImagenesDelProfesional = (req,res) => {
    const {id} = req.params
    const query = `select * from Imagenes as i
                   inner join Profesionales as p
                   on i.profesional_id = p.profesional_id
                   where p.profesional_id = ?;`
                   
    pool.query(query, [id], (error,result)=>{
        if(error){
            return res.status(500).send("Error al obtener las imagenes del profesional")
        }
        res.status(200).json(result)
    })
}

const obtenerTinturasDelProfesional = (req,res) =>{
    const {id} = req.params
    const query = `select * from Imagenes as i
                   inner join Profesionales as p
                   on i.profesional_id = p.profesional_id
                   where p.profesional_id = ? and (i.descripcion_imagen like '%tintura%' or i.descripcion_imagen like '%Tintura%')
                   order by i.fecha_subida_imagen desc;`
    pool.query(query,[id],(error,result)=>{
        if(error){
            return res.status(500).send("Error al obtener las tinturas del profesional")
        }
        res.status(200).json(result)
    })
}

const obtenerCortesDelProfesional = (req,res) =>{
    const {id} = req.params
    const query = `select * from Imagenes as i
                   inner join Profesionales as p
                   on i.profesional_id = p.profesional_id
                   where p.profesional_id = ? and (i.descripcion_imagen like '%corte%' or i.descripcion_imagen like '%Corte%')
                   order by i.fecha_subida_imagen desc;`
    pool.query(query,[id],(error,result)=>{
        if(error){
            return res.status(500).send("Error al obtener las tinturas del profesional")
        }
        res.status(200).json(result)
    })
}


module.exports = {
    obtenerImagenes,
    obtenerImagen,
    crearImagen,
    editarImagen,
    eliminarImagen,
    obtenerImagenesDelProfesional,
    obtenerCortesDelProfesional,
    obtenerTinturasDelProfesional
};
