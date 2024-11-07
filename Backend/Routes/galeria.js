const express = require('express')
const {obtenerGalerias, obtenerGaleria, crearGaleria, editarGaleria, eliminarGaleria} = require('../Controllers/galeria')
const router = express.Router()

router.get('/galeria/',obtenerGalerias)
router.get('/galeria/:id',obtenerGaleria)
router.post('/galeria',crearGaleria)
router.put('/galeria/:id',editarGaleria)
router.delete('/galeria/:id',eliminarGaleria)

module.exports = router