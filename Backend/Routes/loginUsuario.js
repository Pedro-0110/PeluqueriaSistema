const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../Config/conexionbd'); // Configuración de conexión a MySQL
const router = express.Router();

const SECRET = 'tu_secreto'; // Usa una variable de entorno en producción

router.post('/login', async (req, res) => {
    const { username_usuario, password_usuario } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const [user] = await pool.query('SELECT * FROM Usuarios WHERE username_usuario = ?', [username_usuario]);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña ingresada con el hash almacenado
        const isMatch = await bcrypt.compare(password_usuario, user.password_usuario);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user.usuario_id, rol_id: user.rol_id }, SECRET, { expiresIn: '1h' });

        res.json({ token, rol_id: user.rol_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;

