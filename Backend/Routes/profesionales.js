const express = require ('express')
const {obtenerNombreIDProfesionales,obtenerProfesionales,obtenerProfesional,crearProfesional,editarProfesional,eliminarProfesional} = require('../Controllers/profesionales')
const router = express.Router()

router.get('/profesionales/nombres',obtenerNombreIDProfesionales)
router.get('/profesionales',obtenerProfesionales)
router.get('/profesionales/:id', obtenerProfesional)
router.post('/profesionales', crearProfesional)
router.put('/profesionales/:id',editarProfesional)
router.delete('/profesionales/:id',eliminarProfesional)

module.exports = router