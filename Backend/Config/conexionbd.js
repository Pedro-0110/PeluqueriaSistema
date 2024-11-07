const mysql = require("mysql2");

// Configuración del pool de conexiones
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root", // Usuario de la base de datos
  password: "root", // Contraseña del usuario
  database: "BarberiaBD", // Nombre de la base de datos a la que te conectarás
  port: 3306 // Puerto de MySQL (opcional, 3306 por defecto)
});

// Verificar la conexión inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos");
    connection.release(); // Libera la conexión para que esté disponible en el pool
  }
});

// Manejo de errores de conexión
pool.on('error', (err) => {
  console.error("Error en la conexión a MySQL:", err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
    console.log("Reconectando a MySQL...");
    handleReconnect(); // Función para restablecer el pool si ocurre un error fatal
  }
});

function handleReconnect() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error reconectando a MySQL:", err);
      setTimeout(handleReconnect, 2000); // Reintenta reconectar después de 2 segundos
    } else if (connection) {
      connection.release();
      console.log("Reconexión a MySQL exitosa.");
    }
  });
}

module.exports = pool;
