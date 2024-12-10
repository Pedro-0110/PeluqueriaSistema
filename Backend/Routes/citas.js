const express = require('express')
const {obtenerCitas, obtenerCita, crearCita, editarCita, eliminarCita, cancelarCita, confirmarCita, busquedaCitas, obtenerHistorialCitasCliente, obtenerCitasPendientes, obtenerCantidadDeCitasPendientes} = require('../Controllers/citas')
const router = express.Router()

router.get('/citas',obtenerCitas)
router.get('/citas/:id',obtenerCita)
router.get('/citas/busqueda/:nombre_apellido',busquedaCitas)
router.get('/citas/historial/:usuario_id/profesional/:profesional_id',obtenerHistorialCitasCliente)
router.get('/citas/pendientes/:fecha/profesional/:id',obtenerCitasPendientes)
router.get('/citas/pendientes/usuario/:usuario_id', obtenerCantidadDeCitasPendientes)
router.post('/citas',crearCita)
router.put('/citas/:id',editarCita)
router.put('/citas/cancelar/:id',cancelarCita)
router.put('/citas/confirmar/:cita_id/profesional/:profesional_id',confirmarCita)
router.delete('/citas/:id',eliminarCita)

module.exports = router