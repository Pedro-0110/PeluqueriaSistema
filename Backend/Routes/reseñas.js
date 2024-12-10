const express = require('express')
const {obtenerReseñas,obtenerReseña,crearReseña,editarReseña,eliminarReseña, obtenerReseñasRealizadasAlProfesional, verificarCantidadDeComentariosDelUsuario} = require('../Controllers/reseñas')
const router = express.Router()

router.get('/resenas',obtenerReseñas)
router.get('/resenas/:id',obtenerReseña)
router.get('/resenas/profesional/:id',obtenerReseñasRealizadasAlProfesional)
router.get('/resenas/profesional/:profesional_id/usuario/:usuario_id',verificarCantidadDeComentariosDelUsuario)
router.post('/resenas',crearReseña)
router.put('/resenas/:id',editarReseña)
router.delete('/resenas/:id',eliminarReseña)

module.exports = router