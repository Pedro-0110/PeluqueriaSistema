
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const bcrypt = require('bcryptjs');
const pool = require('./Config/conexionbd.js'); // Conexión a MySQL

const profesionales = require('./Routes/profesionales')
const usuarios = require('./Routes/usuarios')
const servicios = require('./Routes/servicios.js')
const citas = require('./Routes/citas.js')
const horariosDisponibles = require('./Routes/horariosDisponibles.js')
const imagenes = require('./Routes/imagenes.js')
const reseñas = require('./Routes/reseñas.js')
const roles = require('./Routes/roles.js')
const videos = require('./Routes/videos.js')
const promociones = require('./Routes/promociones.js')
const configuracionGlobal = require('./Routes/configuracionGlobal.js');
const serviciosProfesional = require('./Routes/profesionales_servicios.js');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(session({
    secret: 'mi_secreto', // Cambia esto en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a `true` si usas HTTPS
}));


// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { username_usuario, password_usuario } = req.body;

    try {
        const [user] = await pool.query('SELECT * FROM Usuarios WHERE username_usuario = ?', [username_usuario]);
        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const isMatch = await bcrypt.compare(password_usuario, user.password_usuario);
        if (!isMatch) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Guardar información del usuario en la sesión
        req.session.userId = user.usuario_id;
        req.session.username = user.username_usuario;

        res.json({ message: 'Login exitoso', user: { id: user.usuario_id, username: user.username_usuario } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta protegida (ejemplo)
app.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'No autenticado' });
    }
    res.json({ message: `Bienvenido, ${req.session.username}` });
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.json({ message: 'Sesión cerrada' });
    });
});

app.use('/',profesionales)
app.use('/',usuarios)
app.use('/',servicios)
app.use('/',citas)
app.use('/',horariosDisponibles)
app.use('/',imagenes)
app.use('/',reseñas)
app.use('/',roles)
app.use('/',videos)
app.use('/',promociones);
app.use('/',configuracionGlobal)
app.use('/',serviciosProfesional)

app.listen(8000,()=> console.log('Escuchando en el puerto 8000'))

