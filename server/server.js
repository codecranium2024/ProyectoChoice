// Importar módulos necesarios
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Mover la importación de CORS aquí

// Configuración del servidor y puerto
const app = express();
const port = 3000;

// Habilitar CORS antes de cualquier otro middleware o ruta
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'choice.mysql.database.azure.com',
  user: 'adminchoice',
  password: 'y4$Dt#*?*',
  database: 'bdChoice',
  ssl: {
    rejectUnauthorized: true, // Asegura que la conexión sea segura
  },
  insecureAuth: false,
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL en Azure');
});

// Endpoint para el login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  // Consulta para verificar el usuario
  const query = 'SELECT * FROM tb_Usuario WHERE Usuario = ?';

  db.query(query, [usuario], (err, results) => {
    if (err) {
      return res.status(500).send('Error en el servidor');
    }

    if (results.length > 0) {
      const user = results[0];
      
      // Consulta para desencriptar la contraseña
      const decryptionQuery = 'SELECT AES_DECRYPT(Password, ?) AS decryptedPassword FROM tb_Usuario WHERE idUsuario = ?';

      db.query(decryptionQuery, ['y4$Dt#*?*', user.idUsuario], (err, decryptionResults) => {
        if (err) {
          return res.status(500).send('Error al desencriptar la contraseña');
        }

        const decryptedPassword = decryptionResults[0].decryptedPassword;

        // Asegúrate de comparar la contraseña correctamente
        if (decryptedPassword && decryptedPassword.toString() === password) {
          res.send('Inicio de sesión exitoso');
        } else {
          res.status(401).send('Contraseña incorrecta');
        }
      });
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  });
});

// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
