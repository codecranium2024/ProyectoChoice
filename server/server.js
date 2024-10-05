// Importar módulos necesarios
const express = require('express');
const mysql = require('mysql2/promise'); // Usar la versión con soporte de promesas
const cors = require('cors'); // Permitir solicitudes desde tu frontend

// Configuración del servidor y puerto
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: 'choice.mysql.database.azure.com',
  user: 'adminchoice',
  password: 'y4$Dt#*?*',
  database: 'bdChoice',
  ssl: {
    rejectUnauthorized: true, // Asegura que la conexión sea segura
  },
  insecureAuth: false
};

// Middleware para parsear JSON y permitir CORS
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:8100',
  methods: ['GET', 'POST'],
  credentials: true
};
app.use(cors(corsOptions));

// Middleware para evitar el almacenamiento en caché
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Verificar la conexión a la base de datos al iniciar el servidor
async function testDBConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conectado a la base de datos MySQL en Azure');
    await connection.end();
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
}

testDBConnection(); // Llamar a la función para verificar la conexión

// Endpoint para el login
// Endpoint para el login
// Endpoint para el login
app.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  console.log('Datos recibidos:', usuario, password); // Log para depuración

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión establecida con la base de datos.');
    
    // Consulta para verificar el usuario
    const [rows] = await connection.execute('SELECT * FROM tb_Usuario WHERE Usuario = ?', [usuario]);
    console.log('Resultado de la consulta de usuario:', rows);

    if (rows.length > 0) {
      const user = rows[0];
      const [decryptionRows] = await connection.execute(
        'SELECT CAST(AES_DECRYPT(Password, ?) AS CHAR) AS decryptedPassword FROM tb_Usuario WHERE idUsuario = ?',
        ['y4$Dt#*?*', user.idUsuario]
      );

      console.log('Resultado de la desencriptación:', decryptionRows);

      const decryptedPassword = decryptionRows[0].decryptedPassword;

      if (decryptedPassword && decryptedPassword === password) {
        console.log('Inicio de sesión exitoso');
        // Respuesta en formato JSON
        res.json({ message: 'Inicio de sesión exitoso', usuario: user.Usuario, rol: user.idRol });
      } else {
        console.log('Contraseña incorrecta');
        // Respuesta de error en formato JSON
        res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } else {
      console.log('Usuario no encontrado');
      // Respuesta de error en formato JSON
      res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await connection.end();
  } catch (err) {
    console.error('Error al conectar o consultar la base de datos:', err);
    // Respuesta de error en formato JSON
    res.status(500).json({ message: 'Error en el servidor' });
  }
});



// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
