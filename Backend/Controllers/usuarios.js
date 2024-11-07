const pool = require("../Config/conexionbd");

const obtenerUsuarios = (req, res) => {
  const query = `select u.usuario_id, u.nombre, u.apellido, u.email, u.telefono, u.direccion, u.username, 
                 u.fecha_registro, r.nombre as rol from Usuarios as u
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
  const query = `select u.usuario_id, u.nombre, u.apellido, u.email, u.telefono, u.direccion, u.username, 
                 u.fecha_registro, r.nombre as rol from Usuarios as u
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
  const { nombre, apellido, email, telefono, direccion, username, password, rol_id, fecha_registro } = req.body;
  const query = `insert into Usuarios (nombre, apellido, email, telefono, direccion, username, password, rol_id, fecha_registro)
                 values (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  pool.query(query, [nombre, apellido, email, telefono, direccion, username, password, rol_id, fecha_registro], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al crear el usuario");
    }
    res.status(201).json({ message: "Usuario creado exitosamente", usuarioId: result.insertId });
  });
};

const editarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, direccion, username, password, rol_id, fecha_registro } = req.body;
  const query = `update Usuarios set nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ?, username = ?,
                 password = ?, rol_id = ?, fecha_registro = ? where usuario_id = ?`;

  pool.query(query, [nombre, apellido, email, telefono, direccion, username, password, rol_id, fecha_registro, id], (error, result) => {
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

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
};