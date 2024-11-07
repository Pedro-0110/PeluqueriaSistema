const express = require('express')
const {obtenerHorariosDisponibles,obtenerHorarioDisponible,crearHorarioDisponible,editarHorarioDisponible,eliminarHorarioDisponible} = require('../Controllers/horariosDisponibles')
const router = express.Router()

router.get('/horariosDisponibles',obtenerHorariosDisponibles)
router.get('/horariosDisponibles/:id',obtenerHorarioDisponible)
router.post('/horariosDisponibles',crearHorarioDisponible)
router.put('/horariosDisponibles/:id',editarHorarioDisponible)
router.delete('/horariosDisponibles/:id',eliminarHorarioDisponible)

module.exports = router