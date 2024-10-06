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
app.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Consulta para verificar el usuario y obtener el nombre completo y el rol
    const [rows] = await connection.execute(
      `SELECT tb_Usuario.Nombre, tb_Usuario.Apellido, tb_Rol.Rol AS nombreRol 
       FROM tb_Usuario 
       INNER JOIN tb_Rol ON tb_Usuario.idRol = tb_Rol.idRol 
       WHERE tb_Usuario.Usuario = ?`, [usuario]);

    if (rows.length > 0) {
      const user = rows[0];
      const [decryptionRows] = await connection.execute(
        'SELECT CAST(AES_DECRYPT(Password, ?) AS CHAR) AS decryptedPassword FROM tb_Usuario WHERE Usuario = ?',
        ['y4$Dt#*?*', usuario]
      );

      const decryptedPassword = decryptionRows[0].decryptedPassword;

      if (decryptedPassword && decryptedPassword === password) {
        // Devuelve el nombre completo del usuario y el rol
        res.json({ success: true, nombre: `${user.Nombre} ${user.Apellido}`, rol: user.nombreRol });
      } else {
        res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    await connection.end();
  } catch (err) {
    console.error('Error al conectar o consultar la base de datos:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Endpoint para obtener roles
app.get('/roles', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM tb_Rol');
    res.json(rows);
    await connection.end();
  } catch (err) {
    console.error('Error al obtener roles:', err);
    res.status(500).send('Error al obtener roles');
  }
});

// Endpoint para obtener especialidades
app.get('/especialidades', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM tb_Especialidad');
    res.json(rows);
    await connection.end();
  } catch (err) {
    console.error('Error al obtener especialidades:', err);
    res.status(500).send('Error al obtener especialidades');
  }
});

// Endpoint para registrar usuario
app.post('/registrarUsuario', async (req, res) => {
  const { nombre, apellido, correo, telefono, usuario, password, rolId, especialidadId } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      `INSERT INTO tb_Usuario (Nombre, Apellido, Correo, Telefono, Usuario, Password, idRol, idEspecialidad) 
       VALUES (?, ?, ?, ?, ?, AES_ENCRYPT(?, 'y4$Dt#*?*'), ?, ?)`,
      [nombre, apellido, correo, telefono, usuario, password, rolId, especialidadId]
    );
    res.send('Usuario registrado con éxito');
    await connection.end();
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).send('Error al registrar usuario');
  }
});


// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
