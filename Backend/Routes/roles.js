const express = require('express')
const {obtenerRoles, obtenerRol} = require('../Controllers/roles')
const router = express.Router()

router.get("/roles",obtenerRoles)
router.get("/roles/:id",obtenerRol)

module.exports = router