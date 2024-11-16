const express = require('express')
const {obtenerCitas, obtenerCita, crearCita, editarCita, eliminarCita, cancelarCita, confirmarCita, busquedaCitas} = require('../Controllers/citas')
const router = express.Router()

router.get('/citas',obtenerCitas)
router.get('/citas/:id',obtenerCita)
router.post('/citas',crearCita)
router.put('/citas/:id',editarCita)
router.delete('/citas/:id',eliminarCita)
router.put('/citas/cancelar/:id',cancelarCita)
router.put('/citas/confirmar/:id',confirmarCita)
router.get('/citas/busqueda/:nombre_apellido',busquedaCitas)

module.exports = router