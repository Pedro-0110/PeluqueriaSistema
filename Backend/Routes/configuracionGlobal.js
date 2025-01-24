const express = require('express');
const router = express.Router();

const {verificarSiMostrarPromociones, editarMostrarPromociones} = require('../Controllers/configuracionGlobal');

router.get('/configuracionGlobal', verificarSiMostrarPromociones);
router.put('/configuracionGlobal/', editarMostrarPromociones)

module.exports = router;