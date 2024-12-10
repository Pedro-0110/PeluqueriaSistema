const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const pool = require('../Config/conexionbd'); // Configuración de conexión a MySQL
const router = express.Router();

router.post('/register', [
    body('email_usuario').isEmail().withMessage('Debe ser un email válido'),
    body('password_usuario').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('username_usuario').not().isEmpty().withMessage('El nombre de usuario es obligatorio')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre_usuario, apellido_usuario, email_usuario, telefono_usuario, direccion_usuario, username_usuario, password_usuario, rol_id } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password_usuario, 10);

        // Insertar el nuevo usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO Usuarios (nombre_usuario, apellido_usuario, email_usuario, telefono_usuario, direccion_usuario, username_usuario, password_usuario, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre_usuario, apellido_usuario, email_usuario, telefono_usuario, direccion_usuario, username_usuario, hashedPassword, rol_id]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

module.exports = router;
