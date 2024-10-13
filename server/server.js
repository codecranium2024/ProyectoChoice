// Importar módulos necesarios
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

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
    rejectUnauthorized: true,
  },
  insecureAuth: false
};

// Middleware para parsear JSON y permitir CORS
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:8100',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

testDBConnection();

// Endpoint para el login
app.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      `SELECT tb_Usuario.Nombre, tb_Usuario.Apellido, tb_Rol.Rol AS nombreRol 
       FROM tb_Usuario 
       INNER JOIN tb_Rol ON tb_Usuario.idRol = tb_Rol.idRol 
       WHERE tb_Usuario.Usuario = ?`, [usuario]
    );

    if (rows.length > 0) {
      const user = rows[0];
      const [decryptionRows] = await connection.execute(
        'SELECT CAST(AES_DECRYPT(Password, ?) AS CHAR) AS decryptedPassword FROM tb_Usuario WHERE Usuario = ?',
        ['y4$Dt#*?*', usuario]
      );

      const decryptedPassword = decryptionRows[0].decryptedPassword;

      if (decryptedPassword && decryptedPassword === password) {
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

  // Validación de entrada
  if (!nombre || !apellido || !correo || !telefono || !usuario || !password || !rolId || !especialidadId) {
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  // Convertir rolId y especialidadId a números
  const numericRolId = parseInt(rolId, 10);
  const numericEspecialidadId = parseInt(especialidadId, 10);

  // Validación adicional
  if (isNaN(numericRolId) || isNaN(numericEspecialidadId)) {
    return res.status(400).send('El rol y la especialidad deben ser números válidos.');
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Inserción de datos
    await connection.execute(
      `INSERT INTO tb_Usuario (Nombre, Apellido, Correo, Telefono, Usuario, Password, idRol, idEspecialidad) 
       VALUES (?, ?, ?, ?, ?, AES_ENCRYPT(?, 'y4$Dt#*?*'), ?, ?)`,
      [nombre, apellido, correo, telefono, usuario, password, numericRolId, numericEspecialidadId]
    );
    
    // Confirmación de éxito
    res.send('Usuario registrado con éxito');
    
    await connection.end();
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).send('Error al registrar usuario');
  }
});

// Endpoint para obtener usuarios con nombre de rol y especialidad
app.get('/usuarios', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    // Cambia la consulta para obtener los nombres de rol y especialidad
    const [rows] = await connection.execute(`
      SELECT 
        tb_Usuario.idUsuario, 
        tb_Usuario.Nombre, 
        tb_Usuario.Apellido, 
        tb_Usuario.Correo, 
        tb_Usuario.Telefono, 
        tb_Rol.Rol AS nombreRol, 
        tb_Especialidad.Especialidad AS nombreEspecialidad
      FROM tb_Usuario
      LEFT JOIN tb_Rol ON tb_Usuario.idRol = tb_Rol.idRol
      LEFT JOIN tb_Especialidad ON tb_Usuario.idEspecialidad = tb_Especialidad.idEspecialidad
    `);
    res.json(rows);
    await connection.end();
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).send('Error al obtener usuarios');
  }
});



// Endpoint para eliminar usuario
app.delete('/eliminarUsuario/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('DELETE FROM tb_Usuario WHERE idUsuario = ?', [idUsuario]);
    res.send('Usuario eliminado con éxito');
    await connection.end();
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).send('Error al eliminar usuario');
  }
});

// Endpoint para actualizar usuario
app.put('/actualizarUsuario/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;
  const { nombre, apellido, correo, telefono, rolId, especialidadId, password } = req.body;

  // Validación de entrada
  if (!nombre || !apellido || !correo || !telefono || !rolId || !especialidadId) {
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  // Convertir rolId y especialidadId a números
  const numericRolId = parseInt(rolId, 10);
  const numericEspecialidadId = parseInt(especialidadId, 10);

  // Validación adicional
  if (isNaN(numericRolId) || isNaN(numericEspecialidadId)) {
    return res.status(400).send('El rol y la especialidad deben ser números válidos.');
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Si se recibe una nueva contraseña, actualizarla también
    if (password) {
      await connection.execute(
        `UPDATE tb_Usuario 
         SET Nombre = ?, Apellido = ?, Correo = ?, Telefono = ?, idRol = ?, idEspecialidad = ?, Password = AES_ENCRYPT(?, 'y4$Dt#*?*')
         WHERE idUsuario = ?`,
        [nombre, apellido, correo, telefono, numericRolId, numericEspecialidadId, password, idUsuario]
      );
    } else {
      await connection.execute(
        `UPDATE tb_Usuario 
         SET Nombre = ?, Apellido = ?, Correo = ?, Telefono = ?, idRol = ?, idEspecialidad = ?
         WHERE idUsuario = ?`,
        [nombre, apellido, correo, telefono, numericRolId, numericEspecialidadId, idUsuario]
      );
    }

    // Confirmación de éxito
    res.send('Usuario actualizado con éxito');
    
    await connection.end();
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).send('Error al actualizar usuario');
  }
});

// Endpoint para agregar un nuevo rol
app.post('/agregarRol', async (req, res) => {
  const { Rol } = req.body;

  // Validación de entrada
  if (!Rol) {
    return res.status(400).send('El nombre del rol es obligatorio.');
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Inserción de datos
    await connection.execute(
      `INSERT INTO tb_Rol (Rol) VALUES (?)`,
      [Rol]
    );
    
    // Confirmación de éxito
    res.send('Rol agregado con éxito');
    
    await connection.end();
  } catch (err) {
    console.error('Error al agregar rol:', err);
    res.status(500).send('Error al agregar rol');
  }
});

// Endpoint para actualizar un rol
app.put('/actualizarRol/:idRol', async (req, res) => {
  const { idRol } = req.params;
  const { Rol } = req.body;

  // Validación de entrada
  if (!Rol) {
    return res.status(400).send('El nombre del rol es obligatorio.');
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Actualización de datos
    await connection.execute(
      `UPDATE tb_Rol SET Rol = ? WHERE idRol = ?`,
      [Rol, idRol]
    );
    
    // Confirmación de éxito
    res.send('Rol actualizado con éxito');
    
    await connection.end();
  } catch (err) {
    console.error('Error al actualizar rol:', err);
    res.status(500).send('Error al actualizar rol');
  }
});

// Endpoint para eliminar un rol
app.delete('/eliminarRol/:idRol', async (req, res) => {
  const { idRol } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('DELETE FROM tb_Rol WHERE idRol = ?', [idRol]);
    res.send('Rol eliminado con éxito');
    await connection.end();
  } catch (err) {
    console.error('Error al eliminar rol:', err);
    res.status(500).send('Error al eliminar rol');
  }
});

// Endpoint para agregar una nueva especialidad
app.post('/agregarEspecialidad', async (req, res) => {
  const { Especialidad } = req.body;

  // Validación de entrada
  if (!Especialidad) {
    return res.status(400).send('El nombre de la especialidad es obligatorio.');
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Inserción de datos
    await connection.execute(
      `INSERT INTO tb_Especialidad (Especialidad) VALUES (?)`,
      [Especialidad]
    );
    
    // Confirmación de éxito
    res.send('Especialidad agregada con éxito');
    
    await connection.end();
  } catch (err) {
    console.error('Error al agregar especialidad:', err);
    res.status(500).send('Error al agregar especialidad');
  }
});

// Endpoint para actualizar una especialidad
app.put('/actualizarEspecialidad/:idEspecialidad', async (req, res) => {
  const { idEspecialidad } = req.params;
  const { Especialidad } = req.body;

  // Validación de entrada
  if (!Especialidad) {
    return res.status(400).send('El nombre de la especialidad es obligatorio.');
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Actualización de datos
    await connection.execute(
      `UPDATE tb_Especialidad SET Especialidad = ? WHERE idEspecialidad = ?`,
      [Especialidad, idEspecialidad]
    );
    
    // Confirmación de éxito
    res.send('Especialidad actualizada con éxito');
    
    await connection.end();
  } catch (err) {
    console.error('Error al actualizar especialidad:', err);
    res.status(500).send('Error al actualizar especialidad');
  }
});

// Endpoint para eliminar una especialidad
app.delete('/eliminarEspecialidad/:idEspecialidad', async (req, res) => {
  const { idEspecialidad } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('DELETE FROM tb_Especialidad WHERE idEspecialidad = ?', [idEspecialidad]);
    res.send('Especialidad eliminada con éxito');
    await connection.end();
  } catch (err) {
    console.error('Error al eliminar especialidad:', err);
    res.status(500).send('Error al eliminar especialidad');
  }
});

// Endpoint para registrar una nueva comunidad
app.post('/comunidad', async (req, res) => {
  const {
    nombre_comunidad, nombre_municipio, nombre_aldea, ubicacion_real, presidente_cocode, telefono_contacto1, otro_lider, telefono_contacto2,
    tipo_transporte, numero_familias, numero_viviendas, numero_personas, certeza_juridica_tierra,
    conflictos_tierra, dimension_lotes, dimension_trabajadores, tierra_comunitaria, idiomas_comunidad,
    fuentes_empleo, recreacion_comunidad, potencial_turistico, tipo_edificios_publicos, hay_inseguridad,
    tipo_inseguridad, grupos_delincuenciales, personas_otro_lugar, ocupacion_otro_lugar, personas_en_eeuu,
    cantidad_personas_eeuu, menores_en_eeuu, edad_empieza_trabajar_hombres, edad_empieza_trabajar_mujeres,
    tipo_empleo, existen_jubilados, cantidad_jubilados, institucion_jubilados, ocupaciones_tradicionales_mujeres,
    ocupaciones_tradicionales_hombres
  } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const query = `
      INSERT INTO tb_Comunidad (
        nombre_comunidad, nombre_municipio, nombre_aldea, ubicacion_real, presidente_cocode, telefono_contacto1, otro_lider, telefono_contacto2, tipo_transporte,
        numero_familias, numero_viviendas, numero_personas, certeza_juridica_tierra, conflictos_tierra, dimension_lotes,
        dimension_trabajadores, tierra_comunitaria, idiomas_comunidad, fuentes_empleo, recreacion_comunidad, 
        potencial_turistico, tipo_edificios_publicos, hay_inseguridad, tipo_inseguridad, grupos_delincuenciales, 
        personas_otro_lugar, ocupacion_otro_lugar, personas_en_eeuu, cantidad_personas_eeuu, menores_en_eeuu, 
        edad_empieza_trabajar_hombres, edad_empieza_trabajar_mujeres, tipo_empleo, existen_jubilados, cantidad_jubilados, 
        institucion_jubilados, ocupaciones_tradicionales_mujeres, ocupaciones_tradicionales_hombres
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Ejecutar el query
    await connection.execute(query, [
      nombre_comunidad, nombre_municipio, nombre_aldea, ubicacion_real, presidente_cocode, telefono_contacto1, otro_lider || null, telefono_contacto2 || null,
      tipo_transporte || null, numero_familias || null, numero_viviendas || null, numero_personas || null,
      certeza_juridica_tierra || null, conflictos_tierra || null, dimension_lotes || null, dimension_trabajadores || null,
      tierra_comunitaria || null, idiomas_comunidad || null, fuentes_empleo || null, recreacion_comunidad || null,
      potencial_turistico || null, tipo_edificios_publicos || null, hay_inseguridad, tipo_inseguridad || null,
      grupos_delincuenciales || null, personas_otro_lugar || null, ocupacion_otro_lugar || null, personas_en_eeuu,
      cantidad_personas_eeuu || null, menores_en_eeuu, edad_empieza_trabajar_hombres || null, edad_empieza_trabajar_mujeres || null,
      tipo_empleo || null, existen_jubilados, cantidad_jubilados || null, institucion_jubilados || null,
      ocupaciones_tradicionales_mujeres || null, ocupaciones_tradicionales_hombres || null
    ]);

    res.status(200).send('Comunidad registrada con éxito');
    await connection.end();
  } catch (error) {
    console.error('Error al registrar comunidad:', error);
    res.status(500).send('Error al registrar comunidad');
  }
});






// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
