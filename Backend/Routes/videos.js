const express = require('express')
const { obtenerVideos, obtenerVideo, obtenerVideosDelProfesional, crearVideo, editarVideo, eliminarVideo } = require('../Controllers/videos')
const router = express.Router()

router.get('/videos/',obtenerVideos)
router.get('/videos/:id',obtenerVideo)
router.get('/videos/profesional/:id',obtenerVideosDelProfesional)
router.post('/videos/',crearVideo)
router.put('/videos/:id',editarVideo)
router.delete('/videos/:id',eliminarVideo)

module.exports = router