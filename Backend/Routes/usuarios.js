const express = require('express')
const {obtenerUsuarios, obtenerUsuario, crearUsuario, editarUsuario, eliminarUsuario} = require('../Controllers/usuarios')

const router = express.Router()

router.get('/usuarios',obtenerUsuarios)
router.get('/usuarios/:id',obtenerUsuarios)
router.post('/usuarios',crearUsuario)
router.put('/usuarios/:id',editarUsuario)
router.delete('/usuarios/:id',eliminarUsuario)

module.exports = router