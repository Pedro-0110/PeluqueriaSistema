const express = require('express')
const {obtenerUsuarios, obtenerUsuario, crearUsuario, editarUsuario, eliminarUsuario, obtenerAdministradores, obtenerAdministrador, buscarUsuarioPorPatrones} = require('../Controllers/usuarios')

const router = express.Router()

router.get('/usuarios',obtenerUsuarios)
router.get('/usuarios/:id',obtenerUsuarios)
router.post('/usuarios',crearUsuario)
router.put('/usuarios/:id',editarUsuario)
router.delete('/usuarios/:id',eliminarUsuario)
router.get('/usuarios/administradores',obtenerAdministradores)
router.get('/usuarios/administradores/:id',obtenerAdministrador)
router.get('/usuarios/busqueda/:nombre/:apellido',buscarUsuarioPorPatrones)

module.exports = router