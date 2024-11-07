const express = require('express')
const {obtenerCitas, obtenerCita, crearCita, editarCita, eliminarCita} = require('../Controllers/citas')
const router = express.Router()

router.get('/citas',obtenerCitas)
router.get('/citas/:id',obtenerCita)
router.post('/citas',crearCita)
router.put('/citas/:id',editarCita)
router.delete('/citas/:id',eliminarCita)

module.exports = router