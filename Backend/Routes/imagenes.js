const express = require('express')
const { obtenerImagenes, obtenerImagen, crearImagen, obtenerImagenesDelProfesional, obtenerCortesDelProfesional, obtenerTinturasDelProfesional, editarImagen, eliminarImagen } = require('../Controllers/imagenes')
const router = express.Router()

router.get('/imagenes/',obtenerImagenes)
router.get('/imagenes/:id',obtenerImagen)
router.get('/imagenes/profesional/:id',obtenerImagenesDelProfesional)
router.get('/imagenes/cortes/profesional/:id', obtenerCortesDelProfesional)
router.get('/imagenes/tinturas/profesional/:id',obtenerTinturasDelProfesional)
router.post('/imagenes/',crearImagen)
router.put('/imagenes/:id',editarImagen)
router.delete('/imagenes/:id',eliminarImagen)

module.exports = router