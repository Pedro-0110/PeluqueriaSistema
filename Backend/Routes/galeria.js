const express = require('express')
const {obtenerGalerias, obtenerGaleria, crearGaleria, editarGaleria, eliminarGaleria, obtenerGaleriaDelProfesional, obtenerTinturasDelProfesional, obtenerCortesDelProfesional} = require('../Controllers/galeria')
const router = express.Router()

router.get('/galeria/',obtenerGalerias)
router.get('/galeria/:id',obtenerGaleria)
router.get('/galeria/profesional/:id',obtenerGaleriaDelProfesional)
router.get('/galeria/cortes/profesional/:id', obtenerCortesDelProfesional)
router.get('/galeria/tinturas/profesional/:id',obtenerTinturasDelProfesional)
router.post('/galeria',crearGaleria)
router.put('/galeria/:id',editarGaleria)
router.delete('/galeria/:id',eliminarGaleria)

module.exports = router