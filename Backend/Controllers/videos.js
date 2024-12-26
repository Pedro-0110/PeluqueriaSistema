const pool = require('../Config/conexionbd');

const obtenerVideos = (req, res) => {
    const query = `SELECT * FROM Videos AS v
                   INNER JOIN Profesionales AS p
                   ON v.profesional_id = p.profesional_id;`;

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener las Videos");
        }
        res.status(200).json(result);
    });
};


const obtenerVideo = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Videos AS v
                   INNER JOIN Profesionales AS p
                   ON v.profesional_id = p.profesional_id
                   WHERE v.video_id = ?;`;

    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al obtener el video");
        }
        res.status(200).json(result);
    });
};


const crearVideo = (req, res) => {
    const { profesional_id, url_video, descripcion_video, fecha_subida_video } = req.body;
    const query = `INSERT INTO Videos (profesional_id, url_video, descripcion_video) VALUES (?, ?, ?);`;
    
    pool.query(query, [profesional_id, url_video, descripcion_video], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al crear el video");
        }
        res.status(201).json({ message: "video ingresado exitosamente", videoId: result.insertId });
    });
};


const editarVideo = (req, res) => {
    const { id } = req.params;
    const { profesional_id, url_video, descripcion_video, fecha_subida_video } = req.body;
    const query = `UPDATE Videos SET profesional_id = ?, url_video = ?, descripcion_video = ? WHERE video_id = ?;`;
    
    pool.query(query, [profesional_id, url_video, descripcion_video, id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al editar el video");
        }
        res.status(200).json({ message: "Video actualizado exitosamente" });
    });
};


const eliminarVideo = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Videos WHERE video_id = ?;`;
    
    pool.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al eliminar el video");
        }
        res.status(200).json({ message: "Cideo eliminado exitosamente" });
    });
};


const obtenerVideosDelProfesional = (req,res) => {
    const {id} = req.params
    const query = `select * from Videos as v
                   inner join Profesionales as p
                   on v.profesional_id = p.profesional_id
                   where p.profesional_id = ?;`
                   
    pool.query(query, [id], (error,result)=>{
        if(error){
            return res.status(500).send("Error al obtener los Videos del profesional")
        }
        res.status(200).json(result)
    })
}



module.exports = {
    obtenerVideos,
    obtenerVideo,
    crearVideo,
    editarVideo,
    eliminarVideo,
    obtenerVideosDelProfesional
};
