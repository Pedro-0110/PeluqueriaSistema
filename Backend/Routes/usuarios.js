const express = require('express')
const {obtenerUsuarios, obtenerUsuario, crearUsuario, editarUsuario, eliminarUsuario, obtenerAdministradores, obtenerAdministrador, buscarUsuarioPorPatrones, iniciarSesion, iniciarSesionAdministrador} = require('../Controllers/usuarios')

const router = express.Router()

router.get('/usuarios/',obtenerUsuarios)
router.get('/usuarios/:id',obtenerUsuario)
router.get('/usuarios/administradores',obtenerAdministradores)
router.get('/usuarios/administradores/:id',obtenerAdministrador)
router.get('/usuarios/busqueda/:nombre/:apellido',buscarUsuarioPorPatrones)
router.post('/usuarios/',crearUsuario)
router.post('/usuarios/sesion/',iniciarSesion)
router.post('/usuarios/sesionadmin/',iniciarSesionAdministrador)
router.put('/usuarios/:id',editarUsuario)
router.delete('/usuarios/:id',eliminarUsuario)

module.exports = router