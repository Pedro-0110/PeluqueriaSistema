const express = require('express')
const {obtenerServicios, obtenerServicio, crearServicio, eliminarServicio, editarServicio, obtenerServiciosDelProfesional} = require('../Controllers/servicios')
const router = express.Router()

router.get('/servicios',obtenerServicios)
router.get('/servicios/:id',obtenerServicio)
router.get('/servicios/profesional/:id', obtenerServiciosDelProfesional)
router.post('/servicios',crearServicio)
router.put('/servicios/:id',editarServicio)
router.delete('/servicios/:id',eliminarServicio)

module.exports = router