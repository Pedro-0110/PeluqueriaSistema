const {agregarPromocion, obtenerPromociones, eliminarPromocion, editarMostrarPromociones, verificarSiMostrarPromociones} = require('../Controllers/promociones');
const express = require('express');
const router = express.Router();

router.get('/promociones/:profesional_id',obtenerPromociones);
router.get('/promociones/estado',verificarSiMostrarPromociones);
router.post('/promociones/',agregarPromocion);
router.put('/promociones/',editarMostrarPromociones);
router.delete('/promociones/:id_promocion/:id_profesional', eliminarPromocion);

module.exports = router;