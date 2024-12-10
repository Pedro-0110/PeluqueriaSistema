const express = require('express')
const {obtenerHorariosDisponibles,obtenerHorarioDisponible,crearHorarioDisponible,editarHorarioDisponible,eliminarHorarioDisponible, obtenerHorarioDisponibleDelProfesional, obtenerHorariosDeAtencionDeTalDia} = require('../Controllers/horariosDisponibles')
const router = express.Router()

router.get('/horariosDisponibles',obtenerHorariosDisponibles)
router.get('/horariosDisponibles/:id',obtenerHorarioDisponible)
router.get('/horariosDisponibles/profesional/:id',obtenerHorarioDisponibleDelProfesional)
router.get('/horariosDisponibles/dia/:dia/profesional/:id',obtenerHorariosDeAtencionDeTalDia)
router.post('/horariosDisponibles',crearHorarioDisponible)
router.put('/horariosDisponibles/:id',editarHorarioDisponible)
router.delete('/horariosDisponibles/:id',eliminarHorarioDisponible)

module.exports = router