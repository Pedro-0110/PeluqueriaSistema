const express = require('express')
const {obtenerServicios, obtenerServicio, crearServicio, eliminarServicio, editarServicio} = require('../Controllers/servicios')
const router = express.Router()

router.get('/servicios',obtenerServicios)
router.get('/servicios/:id',obtenerServicio)
router.post('/servicios',crearServicio)
router.put('/servicios/:id',editarServicio)
router.delete('/servicios/:id',eliminarServicio)

module.exports = router