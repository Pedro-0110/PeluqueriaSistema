const pool = require("../Config/conexionbd");

const obtenerUsuarios = (req, res) => {
  const query = `select u.usuario_id, u.nombre_usuario, u.apellido_usuario, u.telefono_usuario, u.username_usuario, 
                 u.fecha_registro_usuario, r.nombre, u.password_usuario, r.nombre as rol, r.rol_id from Usuarios as u
                 inner join Roles as r
                 on u.rol_id = r.rol_id;`;

  pool.query(query, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al obtener usuarios");
    }
    res.status(200).json(result);
  });
};


const obtenerUsuario = (req, res) => {
  const { id } = req.params;
  const query = `select u.usuario_id, u.nombre_usuario, u.apellido_usuario, u.telefono_usuario, u.username_usuario, 
                 u.fecha_registro_usuario, r.nombre as rol from Usuarios as u
                 inner join Roles as r
                 on u.rol_id = r.rol_id
                 where u.usuario_id = ?;`;

  pool.query(query, [id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al obtener el usuario");
    }
    res.status(200).json(result);
  });
};


const crearUsuario = (req, res) => {
  const { nombre_usuario, apellido_usuario, telefono_usuario, username_usuario, password_usuario, rol_id} = req.body;
  const query = `insert into Usuarios (nombre_usuario, apellido_usuario, telefono_usuario, username_usuario, password_usuario, rol_id)
                 values (?, ?, ?, ?, ?, ?);`;

  pool.query(query, [nombre_usuario, apellido_usuario, telefono_usuario, username_usuario, password_usuario, rol_id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al crear el usuario");
    }
    res.status(201).json({ message: "Usuario creado exitosamente", usuarioId: result.insertId });
  });
};


const editarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, apellido_usuario, telefono_usuario, username_usuario, password_usuario, rol_id } = req.body;
  const query = `update Usuarios set nombre_usuario = ?, apellido_usuario = ?, telefono_usuario = ?, username_usuario = ?,
                 password_usuario = ?, rol_id = ? where usuario_id = ?`;

  pool.query(query, [nombre_usuario, apellido_usuario, telefono_usuario, username_usuario, password_usuario, rol_id, id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al editar el usuario");
    }
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  });
};


const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  const query = `delete from Usuarios where usuario_id = ?`;

  pool.query(query, [id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al eliminar el usuario");
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  });
};


const obtenerAdministradores = (req,res) =>{
  const query = `select * from Usuarios as u
                 inner join Roles as r
                 on u.rol_id = r.rol_id
                 where r.nombre_usuario = 'Administrador'
                 ;`

  pool.query(query,(error,result)=>{
    if (error) {
      console.error(error);
      return res.status(500).send("Error al obtener usuarios");
    }
    res.status(200).json(result);
  })
}


const obtenerAdministrador = (req,res) =>{
  const {id} = req.params
  const query = `select * from Usuarios as u
                 inner join Roles as r
                 on u.rol_id = r.rol_id
                 where r.nombre_usuario = 'Administrador' and u.usuario_id = ?
                 ;`

  pool.query(query,[id],(error,result)=>{
    if (error) {
      console.error(error);
      return res.status(500).send("Error al obtener usuarios");
    }
    res.status(200).json(result);
  })
}


const buscarUsuarioPorPatrones = (req, res) => {
  const { nombre, apellido } = req.params;

  // Construir patrones de búsqueda con los comodines
  const nombrePatron = `%${nombre.toUpperCase()}%`;
  const apellidoPatron = `%${apellido.toUpperCase()}%`;
  const query = `SELECT u.usuario_id, u.nombre_usuario, u.apellido_usuario, u.telefono_usuario, u.username_usuario, u.fecha_registro_usuario, r.nombre AS rol
                 FROM Usuarios AS u
                 INNER JOIN Roles AS r
                 ON u.rol_id = r.rol_id
                 WHERE BINARY upper(u.nombre_usuario) LIKE ? OR upper(u.apellido_usuario) LIKE ?;`;

  pool.query(query, [nombrePatron, apellidoPatron], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error al obtener usuarios");
    }
    res.status(200).json(result);
  });
};

const iniciarSesion = (req,res)=>{
  const {username_usuario, password_usuario} = req.body
  const query = `select count(*) as valor, u.usuario_id from Usuarios as u
                 inner join Roles as r
                 on u.rol_id = r.rol_id
                 where r.nombre = 'Cliente' and u.username_usuario = ? and u.password_usuario = ?;`
  pool.query(query,[username_usuario, password_usuario],(error,result)=>{
    if(error){
      return res.status(500).send("Error al obtener el usuario!")
    }
    res.status(200).json(result)
  })
}


const iniciarSesionAdministrador = (req,res)=>{
  const {username_usuario, password_usuario} = req.body
  const query = `select count(*) as valor, u.usuario_id, u.nombre_usuario, u.apellido_usuario, u.telefono_usuario from Usuarios as u
                 inner join Roles as r
                 on u.rol_id = r.rol_id
                 where r.nombre = 'Administrador' and u.username_usuario = ? and u.password_usuario = ?;`
  pool.query(query,[username_usuario, password_usuario],(error,result)=>{
    if(error){
      return res.status(500).send("Error al obtener el usuario!")
    }
    res.status(200).json(result)
  })
}


module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  obtenerAdministradores,
  obtenerAdministrador,
  buscarUsuarioPorPatrones,
  iniciarSesion,
  iniciarSesionAdministrador
};
