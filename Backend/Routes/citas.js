const express = require('express')
const {obtenerCitas, obtenerCita, crearCita, editarCita, eliminarCita, cancelarCita, confirmarCita, busquedaCitas, obtenerHistorialCitasCliente} = require('../Controllers/citas')
const router = express.Router()

router.get('/citas',obtenerCitas)
router.get('/citas/:id',obtenerCita)
router.get('/citas/busqueda/:nombre_apellido',busquedaCitas)
router.get('/citas/historial/:id',obtenerHistorialCitasCliente)
router.post('/citas',crearCita)
router.put('/citas/:id',editarCita)
router.put('/citas/cancelar/:id',cancelarCita)
router.put('/citas/confirmar/:id',confirmarCita)
router.delete('/citas/:id',eliminarCita)

module.exports = router