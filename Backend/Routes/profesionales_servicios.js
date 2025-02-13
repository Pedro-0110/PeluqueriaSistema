const {obtenerServiciosDelProfesional, relacionarServicioProfesional, quitarRelacionServicioProfesional} = require('../Controllers/profesionales_servicios');
const express = require('express');
const router = express.Router();

router.get('/serviciosProfesional',obtenerServiciosDelProfesional);
router.post('/serviciosProfesional/',relacionarServicioProfesional);
router.delete('/serviciosProfesional/:profesional_id/:servicio_id', quitarRelacionServicioProfesional)

module.exports = router;