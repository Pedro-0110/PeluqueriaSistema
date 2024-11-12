const express = require('express')
const {obtenerReseñas,obtenerReseña,crearReseña,editarReseña,eliminarReseña} = require('../Controllers/reseñas')
const router = express.Router()

router.get('/resenas',obtenerReseñas)
router.get('/resenas/:id',obtenerReseña)
router.post('/resenas',crearReseña)
router.put('/resenas/:id',editarReseña)
router.delete('/resenas/:id',eliminarReseña)

module.exports = router