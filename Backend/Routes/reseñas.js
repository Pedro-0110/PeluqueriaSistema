const express = require('express')
const {obtenerReseñas,obtenerReseña,crearReseña,editarReseña,eliminarReseña} = require('../Controllers/reseñas')
const router = express.Router()

router.get('/reseñas',obtenerReseñas)
router.get('/reseñas/:id',obtenerReseña)
router.post('/reseñas',crearReseña)
router.put('/reseñas/:id',editarReseña)
router.delete('/reseñas/:id',eliminarReseña)

module.exports = router