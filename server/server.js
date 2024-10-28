// Importar módulos necesarios
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// Configuración del servidor y puerto
const app = express();
const port = 3000;
app.use(express.json())


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
// Endpoint para el login
app.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      `SELECT tb_Usuario.Nombre, tb_Usuario.Apellido, tb_Usuario.Usuario, tb_Rol.Rol AS nombreRol 
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
        // Devolver el nombre, rol y el usuario para almacenar correctamente en el frontend
        res.json({ success: true, nombre: `${user.Nombre} ${user.Apellido}`, rol: user.nombreRol, usuario: user.Usuario });
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
app.post('/comunidadr', async (req, res) => {
  const {
    nombre_comunidad, nombre_municipio, nombre_aldea, ubicacion_real, presidente_cocode, telefono_contacto1, otro_lider, telefono_contacto2,
    tipo_transporte, numero_familias, numero_viviendas, numero_personas, certeza_juridica_tierra,
    conflictos_tierra, dimension_lotes, dimension_trabajadores, tierra_comunitaria, idiomas_comunidad,
    fuentes_empleo, recreacion_comunidad, potencial_turistico, tipo_edificios_publicos, hay_inseguridad,
    tipo_inseguridad, grupos_delincuenciales, personas_otro_lugar, ocupacion_otro_lugar, personas_en_eeuu,
    cantidad_personas_eeuu, menores_en_eeuu, edad_empieza_trabajar_hombres, edad_empieza_trabajar_mujeres,
    tipo_empleo, existen_jubilados, cantidad_jubilados, institucion_jubilados, ocupaciones_tradicionales_mujeres,
    ocupaciones_tradicionales_hombres,
    //registrar el modulo de servicios
    energia_electrica,tipo_servicio,calidad_servicio,costos_servicio,prestador_servicio,familias_con_servicio,senal_telefono,senal_internet,senal_tv,cable,prestador_servicios,
    //registrar el modulo de educacion
    instituciones_educativas, edificios_educativos, constructor_edificios, materiales_construccion, dueno_terreno, deseo_preparacion, limitantes_estudio, personas_carrera_medio_hombres,
    personas_carrera_medio_mujeres, personas_concluyeron_medio, personas_universidad_hombres, personas_universidad_mujeres, abandono_estudios,
    carreras_nivel_medio, carreras_universidad,
    //seccion de agua y saneamiento
    agua_entubada,pozo,agua_lluvia,rio,laguna,estanque,compra_agua,inodoro_lavable,letrina,pozo_ventilado,campo_excretas,manejo_basura,tipo_basura,fuente_energia_lenia,fuente_energia_gas,
    fuente_energia_carbon,fuente_energia_otros,estufa_ahorradora,estufa_gas,polleton,suelo_cocina,capacitaciones_saneamiento,detalle_capacitaciones,
    //seccion de educacion
    pollo_congelado,pollo_criollo,cerdo,ress,carne_monte,pescado,maiz,frijol,verduras,legumbres,pastas,sopas,arroz,papa,malanga,camote,yuca,otro_tuberculo,puesto_salud,frecuencia_doctor,hay_enfermero,
    centro_convergencia,uso_centro_convergencia,emergencia,tipos_emergencias,vacunas_ninos,frecuencia_vacunacion,mayores_60,personas_capacidades_diferentes,personas_abandono,ninos_0a5,ninos_6a10,ninos_11a15,
    ninos_16a18,recien_nacidos,ninos_muertos,ninos_desnutridos,mujeres_embarazadas,embarazos_al_anio,tipo_enfermedades,num_comadronas,num_promotores_salud,num_curanderos,botiquin_comunitario,jardines_medicinales,
    venta_medicina,venta_bebidas_alcoholicas,num_puntos_venta_bebidas,tipos_bebidas_alcoholicas,consumo_tabaco,otros_consumo,
    //seccion de mapa de actores
    maga,fodes,mides,sesan,llega_policia,comites,religion,ongList,actors,
    //seccion de agricultura
    agricultura,comercializacion_productos,terreno_propio,terreno_prestado,terreno_arrendado,costo_arrendamiento,periodo_arrendamiento,momento_siembra,plagas_enfermedades,meses_plagas,cultivos_anteriores,razon_no_siembra,nuevos_cultivos,sistemas_productivos,
    acciones_sequia,acciones_lluvia,perdida_cosechas,ano_perdida_cosechas,causa_perdida_cosechas,capacitaciones_agricultura ,tipo_capacitacion,organizacion_capacitacion,actividad_sin_siembra,uso_pesticidas ,uso_insecticidas,
    uso_herbicidas,uso_fungicidas,uso_fertilizantes,uso_otros,
    //seccion de pecuarias
    pecuarias,alimento_animales,planes_profilacticos,enfermedades_animales,meses_enfermedad,capacitaciones_animales , tipo_capacitacion_animales,
    //seccion de ecologia
    bosque_comunitario,dimensiones_bosque,especies_arboles,especies_plantas ,incentivos_forestales,bosques_potenciales,viveros,reforestado,area_reforestada,impulsor_reforestacion,dueno_tierra_bosque,duenos_motosierras,tala_para_cultivar,rozas_quemas,incendios_forestales,razon_incendios,
    area_incendio,fecha_incendio,fuentes_agua,num_nacimientos,dueno_tierra_fuentes,acciones_conservacion_agua,num_pozos,num_rios,num_lagunas,otras_fuentes_agua,proyecto_medio_ambiental,acciones_proyecto,acciones_conservacion_ambiente,animales_silvestres,animales_por_temporada,plantas_extintas,
    plantas_dificiles,desastre_natural ,ano_desastre,tipo_desastre,respuesta_desastre,colred,otras_instituciones,amenaza_desastre

  } = req.body;

  console.log("Datos recibidos en el servidor:", req.body);

  // Asegurar que ningún campo sea undefined; si lo es, convertirlo a null
  const safeValues = [
    nombre_comunidad|| null, nombre_municipio|| null, nombre_aldea || null, ubicacion_real|| null, presidente_cocode|| null, telefono_contacto1|| null, 
    otro_lider || null, telefono_contacto2 || null, tipo_transporte || null, numero_familias || null, numero_viviendas || null, numero_personas || null,
    certeza_juridica_tierra || null, conflictos_tierra || null, dimension_lotes || null, dimension_trabajadores || null, tierra_comunitaria || null, 
    idiomas_comunidad || null, fuentes_empleo || null, recreacion_comunidad || null, potencial_turistico || null, tipo_edificios_publicos || null, 
    hay_inseguridad || null, tipo_inseguridad || null, grupos_delincuenciales || null, personas_otro_lugar || null, ocupacion_otro_lugar || null, 
    personas_en_eeuu || null, cantidad_personas_eeuu || null, menores_en_eeuu || null, edad_empieza_trabajar_hombres || null, 
    edad_empieza_trabajar_mujeres || null, tipo_empleo || null, existen_jubilados || null, cantidad_jubilados || null, institucion_jubilados || null, 
    ocupaciones_tradicionales_mujeres || null, ocupaciones_tradicionales_hombres || null, energia_electrica || null,tipo_servicio || null,
    calidad_servicio || null,costos_servicio || null,prestador_servicio || null,familias_con_servicio || null,senal_telefono || null,senal_internet || null,
    senal_tv || null,cable || null,prestador_servicios || null, instituciones_educativas || null, edificios_educativos || null, constructor_edificios|| null, 
    materiales_construccion || null, dueno_terreno|| null, deseo_preparacion|| null, limitantes_estudio|| null, personas_carrera_medio_hombres|| null,
    personas_carrera_medio_mujeres|| null, personas_concluyeron_medio|| null, personas_universidad_hombres|| null, personas_universidad_mujeres|| null, abandono_estudios|| null,
    carreras_nivel_medio|| null, carreras_universidad|| null, agua_entubada|| null,pozo|| null,agua_lluvia|| null,rio,laguna|| null,estanque|| null,compra_agua,inodoro_lavable|| null,
    letrina,pozo_ventilado|| null,campo_excretas|| null,manejo_basura|| null,tipo_basura|| null,fuente_energia_lenia|| null,fuente_energia_gas|| null,
    fuente_energia_carbon|| null,fuente_energia_otros|| null,estufa_ahorradora|| null,estufa_gas|| null,polleton|| null,suelo_cocina|| null,capacitaciones_saneamiento|| null,
    detalle_capacitaciones|| null, pollo_congelado|| null,pollo_criollo|| null,cerdo|| null,ress|| null,carne_monte|| null,pescado|| null,maiz|| null,frijol|| null,verduras|| null,legumbres|| null,pastas|| null,sopas|| null,
    arroz|| null,papa|| null,malanga|| null,camote|| null,yuca|| null,otro_tuberculo|| null,puesto_salud|| null,frecuencia_doctor|| null,hay_enfermero|| null,
    centro_convergencia|| null,uso_centro_convergencia|| null,emergencia|| null,tipos_emergencias|| null,vacunas_ninos|| null,frecuencia_vacunacion|| null,mayores_60|| null,personas_capacidades_diferentes|| null,personas_abandono|| null,
    ninos_0a5|| null,ninos_6a10|| null,ninos_11a15|| null,
    ninos_16a18|| null,recien_nacidos|| null,ninos_muertos|| null,ninos_desnutridos|| null,mujeres_embarazadas|| null,embarazos_al_anio|| null,tipo_enfermedades|| null,num_comadronas|| null,num_promotores_salud|| null,num_curanderos|| null,
    botiquin_comunitario|| null,jardines_medicinales|| null,
    venta_medicina|| null,venta_bebidas_alcoholicas|| null,num_puntos_venta_bebidas|| null,tipos_bebidas_alcoholicas|| null,consumo_tabaco|| null,otros_consumo|| null,
    maga|| null,fodes|| null,mides|| null,sesan|| null,llega_policia|| null,comites|| null,religion|| null,ongList|| null,actors|| null,
    agricultura|| null,comercializacion_productos|| null,terreno_propio|| null,terreno_prestado|| null,terreno_arrendado|| null,costo_arrendamiento|| null,periodo_arrendamiento|| null,momento_siembra|| null,plagas_enfermedades|| null,meses_plagas|| null,
    cultivos_anteriores|| null,razon_no_siembra|| null,nuevos_cultivos|| null,sistemas_productivos|| null,
    acciones_sequia|| null,acciones_lluvia|| null,perdida_cosechas|| null,ano_perdida_cosechas|| null,causa_perdida_cosechas|| null,capacitaciones_agricultura|| null ,tipo_capacitacion|| null,organizacion_capacitacion|| null,actividad_sin_siembra|| null,
    uso_pesticidas|| null ,uso_insecticidas|| null,
    uso_herbicidas|| null,uso_fungicidas|| null,uso_fertilizantes|| null,uso_otros|| null,
    pecuarias|| null,alimento_animales|| null,planes_profilacticos|| null,enfermedades_animales|| null,meses_enfermedad|| null,capacitaciones_animales|| null , tipo_capacitacion_animales|| null,
    bosque_comunitario|| null,dimensiones_bosque|| null,especies_arboles|| null,especies_plantas|| null ,incentivos_forestales|| null,bosques_potenciales|| null,viveros|| null,reforestado,area_reforestada|| null,impulsor_reforestacion|| null,dueno_tierra_bosque|| null,duenos_motosierras|| null,tala_para_cultivar|| null,rozas_quemas|| null,incendios_forestales|| null,razon_incendios|| null,
    area_incendio|| null,fecha_incendio|| null,fuentes_agua|| null,num_nacimientos|| null,dueno_tierra_fuentes|| null,acciones_conservacion_agua|| null,num_pozos|| null,num_rios|| null,num_lagunas|| null,otras_fuentes_agua|| null,proyecto_medio_ambiental|| null,acciones_proyecto|| null,acciones_conservacion_ambiente|| null,animales_silvestres|| null,animales_por_temporada|| null,plantas_extintas|| null,
    plantas_dificiles|| null,desastre_natural|| null ,ano_desastre|| null,tipo_desastre|| null,respuesta_desastre|| null,colred|| null,otras_instituciones|| null,amenaza_desastre|| null

  ];

  // Validación adicional para verificar si algún campo es undefined
  safeValues.forEach((value, index) => {
    if (value === undefined) {
      console.log(`Campo en la posición ${index} está undefined`);
    }
  });

  // Validación general para asegurar que no haya undefined
  if (safeValues.includes(undefined)) {
    return res.status(400).send('Error: Uno o más campos contienen un valor no válido');
  }

  console.log("Valores seguros que se enviarán a la base de datos:", safeValues);

  try {
    const connection = await mysql.createConnection(dbConfig);

    const query = `
        INSERT INTO tb_Comunidad (
        nombre_comunidad, nombre_municipio, nombre_aldea, ubicacion_real, presidente_cocode, telefono_contacto1, otro_lider, telefono_contacto2,
        tipo_transporte, numero_familias, numero_viviendas, numero_personas, certeza_juridica_tierra,
        conflictos_tierra, dimension_lotes, dimension_trabajadores, tierra_comunitaria, idiomas_comunidad,
        fuentes_empleo, recreacion_comunidad, potencial_turistico, tipo_edificios_publicos, hay_inseguridad,
        tipo_inseguridad, grupos_delincuenciales, personas_otro_lugar, ocupacion_otro_lugar, personas_en_eeuu,
        cantidad_personas_eeuu, menores_en_eeuu, edad_empieza_trabajar_hombres, edad_empieza_trabajar_mujeres,
        tipo_empleo, existen_jubilados, cantidad_jubilados, institucion_jubilados, ocupaciones_tradicionales_mujeres,
        ocupaciones_tradicionales_hombres,
        energia_electrica,tipo_servicio,calidad_servicio,costos_servicio,prestador_servicio,familias_con_servicio,
        senal_telefono,senal_internet,senal_tv,cable,prestador_servicios,
        instituciones_educativas, edificios_educativos, constructor_edificios, materiales_construccion, dueno_terreno, deseo_preparacion, limitantes_estudio, personas_carrera_medio_hombres,
        personas_carrera_medio_mujeres, personas_concluyeron_medio, personas_universidad_hombres, personas_universidad_mujeres, abandono_estudios,
        carreras_nivel_medio, carreras_universidad,
        agua_entubada,pozo,agua_lluvia,rio,laguna,estanque,compra_agua,inodoro_lavable,letrina,pozo_ventilado,campo_excretas,manejo_basura,tipo_basura,fuente_energia_lenia,fuente_energia_gas,
        fuente_energia_carbon,fuente_energia_otros,estufa_ahorradora,estufa_gas,polleton,suelo_cocina,capacitaciones_saneamiento,detalle_capacitaciones,
        pollo_congelado,pollo_criollo,cerdo,ress,carne_monte,pescado,maiz,frijol,verduras,legumbres,pastas,sopas,arroz,papa,malanga,camote,yuca,otro_tuberculo,puesto_salud,frecuencia_doctor,hay_enfermero,
    centro_convergencia,uso_centro_convergencia,emergencia,tipos_emergencias,vacunas_ninos,frecuencia_vacunacion,mayores_60,personas_capacidades_diferentes,personas_abandono,ninos_0a5,ninos_6a10,ninos_11a15,
    ninos_16a18,recien_nacidos,ninos_muertos,ninos_desnutridos,mujeres_embarazadas,embarazos_al_anio,tipo_enfermedades,num_comadronas,num_promotores_salud,num_curanderos,botiquin_comunitario,jardines_medicinales,
    venta_medicina,venta_bebidas_alcoholicas,num_puntos_venta_bebidas,tipos_bebidas_alcoholicas,consumo_tabaco,otros_consumo,
    maga,fodes,mides,sesan,llega_policia,comites,religion,ongList,actors,
    agricultura,comercializacion_productos,terreno_propio,terreno_prestado,terreno_arrendado,costo_arrendamiento,periodo_arrendamiento,momento_siembra,plagas_enfermedades,meses_plagas,cultivos_anteriores,razon_no_siembra,nuevos_cultivos,sistemas_productivos,
    acciones_sequia,acciones_lluvia,perdida_cosechas,ano_perdida_cosechas,causa_perdida_cosechas,capacitaciones_agricultura ,tipo_capacitacion,organizacion_capacitacion,actividad_sin_siembra,uso_pesticidas ,uso_insecticidas,
    uso_herbicidas,uso_fungicidas,uso_fertilizantes,uso_otros,
    pecuarias,alimento_animales,planes_profilacticos,enfermedades_animales,meses_enfermedad,capacitaciones_animales , tipo_capacitacion_animales,
    bosque_comunitario,dimensiones_bosque,especies_arboles,especies_plantas ,incentivos_forestales,bosques_potenciales,viveros,reforestado,area_reforestada,impulsor_reforestacion,dueno_tierra_bosque,duenos_motosierras,tala_para_cultivar,rozas_quemas,incendios_forestales,razon_incendios,
    area_incendio,fecha_incendio,fuentes_agua,num_nacimientos,dueno_tierra_fuentes,acciones_conservacion_agua,num_pozos,num_rios,num_lagunas,otras_fuentes_agua,proyecto_medio_ambiental,acciones_proyecto,acciones_conservacion_ambiente,animales_silvestres,animales_por_temporada,plantas_extintas,
    plantas_dificiles,desastre_natural ,ano_desastre,tipo_desastre,respuesta_desastre,colred,otras_instituciones,amenaza_desastre
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    // Ejecutar el query con los valores seguros
    await connection.execute(query, safeValues);

    res.status(200).send('Comunidad registrada con éxito');
    await connection.end();
  } catch (error) {
    console.error('Error al registrar comunidad:', error);
    res.status(500).send('Error al registrar comunidad: ' + error.message);
  }
});

// ------------------------------------------------------------------
// Registrar un nuevo proyecto 
app.get('/categorias', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT idCategoriaProyecto, Categoria FROM tb_categoriaPr');
    res.json(rows);
    await connection.end();
  } catch (err) {
    console.error('Error al obtener categorías:', err);
    res.status(500).send('Error al obtener categorías');
  }
});

app.get('/estados', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT idestado, Estadoproyecto FROM tb_estadop');
    res.json(rows);
    await connection.end();
  } catch (err) {
    console.error('Error al obtener estados de proyecto:', err);
    res.status(500).send('Error al obtener estados de proyecto');
  }
});

app.get('/responsables', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT idUsuario, Nombre FROM tb_usuario');
    res.json(rows);
    await connection.end();
  } catch (err) {
    console.error('Error al obtener nombres de usuarios:', err);
    res.status(500).send('Error al obtener nombres de usuarios');
  }
});

app.post('/RegistrarProyecto', async (req, res) => {
  const { 
    idCategoriaProyecto, 
    Nombreclatura, 
    Nombre, 
    idUsuario, 
    idestado, 
    FechaInicio, 
    FechaFinalizacion, 
    idComunidad // Asegúrate de que este campo se envía en la solicitud
  } = req.body;

  // Consulta SQL para insertar el nuevo registro
  const sql = `
      INSERT INTO tb_registrarpr (
          idCategoriaProyecto, Nombreclatura, Nombre, idUsuario, idestado, FechaInicio, FechaFinalizacion, idComunidad
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  let connection;

  try {
      // Crear una conexión única
      connection = await mysql.createConnection(dbConfig);
      
      // Ejecutar la consulta
      const [result] = await connection.execute(sql, [idCategoriaProyecto, Nombreclatura, Nombre, idUsuario, idestado, FechaInicio, FechaFinalizacion, idComunidad]);
      
      res.status(201).json({ message: 'Registro creado exitosamente', id: result.insertId });
  } catch (err) {
      console.error('Error al insertar el registro:', err.message);
      res.status(500).json({ error: 'Error al insertar el registro', details: err.message });
  } finally {
      // Cerrar la conexión si existe
      if (connection) {
          await connection.end();
      }
  }
});

app.put('/proyectos/:id', async (req, res) => {
  const { id } = req.params; // Obtener el ID del proyecto desde los parámetros de la ruta
  const {
    Nombreclatura,
    Nombre,
    FechaInicio,
    FechaFinalizacion,
    idCategoriaProyecto, // Asegúrate de que envías idCategoriaProyecto en lugar de Categoria
    idUsuario, // Asegúrate de que envías idUsuario en lugar de Responsable
    idestado, // Asegúrate de que envías idestado en lugar de Estado
    idComunidad // Si es necesario
  } = req.body; // Obtener los nuevos datos del cuerpo de la solicitud

  // Crear el array de updates y values
  const updates = [];
  const values = [];

  if (Nombreclatura !== undefined) {
    updates.push('Nombreclatura = ?');
    values.push(Nombreclatura);
  }
  if (Nombre !== undefined) {
    updates.push('Nombre = ?');
    values.push(Nombre);
  }
  if (FechaInicio !== undefined) {
    const fechaInicioFormatted = new Date(FechaInicio).toISOString().split('T')[0];
    updates.push('FechaInicio = ?');
    values.push(fechaInicioFormatted);
  }
  if (FechaFinalizacion !== undefined) {
    const fechaFinalizacionFormatted = new Date(FechaFinalizacion).toISOString().split('T')[0];
    updates.push('FechaFinalizacion = ?');
    values.push(fechaFinalizacionFormatted);
  }
  if (idCategoriaProyecto !== undefined) {
    updates.push('idCategoriaProyecto = ?');
    values.push(idCategoriaProyecto);
  }
  if (idUsuario !== undefined) {
    updates.push('idUsuario = ?');
    values.push(idUsuario);
  }
  if (idestado !== undefined) {
    updates.push('idestado = ?');
    values.push(idestado);
  }
  if (idComunidad !== undefined) {
    updates.push('idComunidad = ?');
    values.push(idComunidad);
  }

  // Asegúrate de que al menos un campo ha sido proporcionado para actualizar
  if (updates.length === 0) {
    return res.status(400).send('No se proporcionaron campos para actualizar');
  }

  // Agregar el ID al final de los valores para la cláusula WHERE
  values.push(id);

  // Crear la consulta SQL
  const query = `
    UPDATE tb_registrarpr 
    SET ${updates.join(', ')} 
    WHERE idRegistrarProyecto = ?;
  `;

  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);

    // Ejecutar la consulta
    const [result] = await connection.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.status(200).json({ message: 'Proyecto actualizado con éxito.' });
  } catch (err) {
    console.error('Error al actualizar el proyecto:', err.message);
    res.status(500).json({ error: 'Error al actualizar el proyecto', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});

app.get('/comunidades', async (req, res) => {
  const sql = 'SELECT idComunidad, nombre_comunidad FROM tb_comunidad';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutar la consulta
    const [rows] = await connection.execute(sql);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los nombres de la comunidad:', err.message);
    res.status(500).json({ error: 'Error al obtener los comunidades', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});

app.get('/proyectos', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = `
      SELECT 
        r.idRegistrarProyecto, 
        r.Nombreclatura, 
        r.Nombre, 
        r.FechaInicio, 
        r.FechaFinalizacion, 
        c.categoria AS Categoria, 
        u.Nombre AS Responsable, 
        e.estadoproyecto AS Estado,
        co.nombre_comunidad AS Comunidad,
        r.idComunidad  -- Añadir esta línea para incluir idComunidad
      FROM 
        tb_registrarpr r
      JOIN 
        tb_categoriaPr c ON r.idCategoriaProyecto = c.idCategoriaProyecto
      JOIN 
        tb_usuario u ON r.idUsuario = u.idUsuario
      JOIN 
        tb_estadop e ON r.idestado = e.idestado
      LEFT JOIN 
        tb_Comunidad co ON r.idComunidad = co.idComunidad;
    `;
    const [rows] = await connection.execute(query);
    res.json(rows);
    await connection.end();
  } catch (err) {
    console.error('Error al obtener proyectos:', err);
    res.status(500).send('Error al obtener proyectos');
  }
});

app.get('/historial', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = `
      SELECT 
        r.idRegistrarProyecto, 
        r.Nombreclatura, 
        r.Nombre, 
        r.FechaInicio, 
        r.FechaFinalizacion, 
        c.categoria AS Categoria, 
        u.Nombre AS Responsable, 
        e.estadoproyecto AS Estado,
        co.nombre_comunidad AS Comunidad,
        r.idComunidad  -- Añadir esta línea para incluir idComunidad
      FROM 
        tb_registrarpr r
      JOIN 
        tb_categoriaPr c ON r.idCategoriaProyecto = c.idCategoriaProyecto
      JOIN 
        tb_usuario u ON r.idUsuario = u.idUsuario
      JOIN 
        tb_estadop e ON r.idestado = e.idestado
      LEFT JOIN 
        tb_Comunidad co ON r.idComunidad = co.idComunidad
      WHERE 
        r.idestado = 2;  -- Filtrar solo proyectos finalizados
    `;
    const [rows] = await connection.execute(query);
    res.json(rows);
    await connection.end();
  } catch (err) {
    console.error('Error al obtener historial de proyectos:', err);
    res.status(500).send('Error al obtener historial de proyectos');
  }
});



//Departamentos y municipios
app.post('/departamentos', async (req, res) => {
  const { nombredepartamento } = req.body;

  if (!nombredepartamento) {
    return res.status(400).json({ error: 'El nombre del departamento es requerido' });
  }

  const sql = 'INSERT INTO tb_departamento (nombredepartamento) VALUES (?)';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutar la consulta
    const [result] = await connection.execute(sql, [nombredepartamento]);

    res.status(201).json({ message: 'Departamento registrado con éxito', id: result.insertId });
  } catch (err) {
    console.error('Error al registrar el departamento:', err.message);
    res.status(500).json({ error: 'Error al registrar el departamento', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});

app.post('/municipios', async (req, res) => {
  const { nombremunicipio, departamento_id } = req.body;

  if (!nombremunicipio || !departamento_id) {
    return res.status(400).json({ error: 'El nombre del municipio y el departamento_id son requeridos' });
  }

  const sql = 'INSERT INTO tb_municipio (nombremunicipio, departamento_id) VALUES (?, ?)';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);

    // Ejecutar la consulta
    const [result] = await connection.execute(sql, [nombremunicipio, departamento_id]);

    res.status(201).json({ message: 'Municipio registrado con éxito', id: result.insertId });
  } catch (err) {
    console.error('Error al registrar el municipio:', err.message);
    res.status(500).json({ error: 'Error al registrar el municipio', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});

// Obtener todos los departamentos
app.get('/departamentos', async (req, res) => {
  const sql = 'SELECT * FROM tb_departamento';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutar la consulta
    const [rows] = await connection.execute(sql);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los departamentos:', err.message);
    res.status(500).json({ error: 'Error al obtener los departamentos', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});

// Obtener todos los municipios
app.get('/municipios', async (req, res) => {
  const sql = 'SELECT * FROM tb_municipio';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutar la consulta
    const [rows] = await connection.execute(sql);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los municipios:', err.message);
    res.status(500).json({ error: 'Error al obtener los municipios', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});

// Actualizar un departamento por ID
app.put('/departamentos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombredepartamento } = req.body;
  const sql = 'UPDATE tb_departamento SET nombredepartamento = ? WHERE id = ?';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutar la consulta
    const [result] = await connection.execute(sql, [nombredepartamento, id]);

    // Verificar si se actualizó algún registro
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    res.status(200).json({ message: 'Departamento actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar el departamento:', err.message);
    res.status(500).json({ error: 'Error al actualizar el departamento', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});
// Actualizar un municipio por ID
app.put('/municipios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombremunicipio, departamento_id } = req.body;
  const sql = 'UPDATE tb_municipio SET nombremunicipio = ?, departamento_id = ? WHERE id = ?';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutar la consulta
    const [result] = await connection.execute(sql, [nombremunicipio, departamento_id, id]);

    // Verificar si se actualizó algún registro
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }

    res.status(200).json({ message: 'Municipio actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar el municipio:', err.message);
    res.status(500).json({ error: 'Error al actualizar el municipio', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});
//Endpoint Eliminar registros
app.delete('/departamentos/:id', async (req, res) => {
  const { id } = req.params;  // Obtener el ID de los parámetros de la URL

  const sql = 'DELETE FROM tb_departamento WHERE id = ?';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);

    // Ejecutar la consulta
    const [result] = await connection.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    res.status(200).json({ message: 'Departamento eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar el departamento:', err.message);
    res.status(500).json({ error: 'Error al eliminar el departamento', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});
app.delete('/municipios/:id', async (req, res) => {
  const { id } = req.params;  // Obtener el ID de los parámetros de la URL

  const sql = 'DELETE FROM tb_municipio WHERE id = ?';
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);

    // Ejecutar la consulta
    const [result] = await connection.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }

    res.status(200).json({ message: 'Municipio eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar el municipio:', err.message);
    res.status(500).json({ error: 'Error al eliminar el municipio', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});
//tecnico/comunidad es para la comunidad1
app.get('/tecnicocomunidad', async (req, res) => {
  // Consulta SQL para obtener las comunidades asociadas a usuarios con idRol = 5
  const sql = `
    SELECT 
      c.nombre_comunidad,
      c.presidente_cocode,
      c.numero_personas,
      c.nombre_municipio,
      u.Nombre AS nombre_usuario
    FROM 
      tb_comunidad AS c
    JOIN 
      tb_usuario AS u ON c.idUsuario = u.idUsuario
    WHERE 
      u.idRol = 5;
  `;
  
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutar la consulta
    const [rows] = await connection.execute(sql);

    // Enviar los datos obtenidos como respuesta
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los datos de facilitadores:', err.message);
    res.status(500).json({ error: 'Error al obtener los datos', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});
//para modulo donde estan los mapasp
// app.get('/informacioncomunidades', async (req, res) => {
//   // Consulta SQL para obtener los proyectos asociados a usuarios con idRol = 5
//   const sql = `
//     SELECT 
//       r.Nombre AS NombreProyecto, 
//       u.Nombre AS NombreUsuario, 
//       c.nombre_comunidad AS NombreComunidad,  -- Agregado: nombre de la comunidad
//       c.nombre_municipio AS NombreMunicipio, 
//       c.numero_personas AS NumeroPersonas,
//       c.numero_familias AS NumeroFamilias,
//       c.numero_viviendas AS NumeroViviendas,
//       c.presidente_cocode AS PresidenteCocode,  -- Agregado: presidente de la comunidad
//       e.Estadoproyecto AS EstadoProyecto 
//     FROM 
//       tb_registrarpr AS r
//     JOIN 
//       tb_comunidad AS c ON r.idComunidad = c.idComunidad
//     JOIN 
//       tb_estadoP AS e ON r.idestado = e.idestado
//     JOIN 
//       tb_Usuario AS u ON r.idUsuario = u.idUsuario
//     WHERE 
//       u.idRol = 5; -- Filtrar solo los usuarios con rol Técnico (idRol = 5);
//   `;
//   let connection;

//   try {
//     // Crear una conexión única
//     connection = await mysql.createConnection(dbConfig);
    
//     // Ejecutar la consulta
//     const [rows] = await connection.execute(sql);

//     // Enviar los datos obtenidos como respuesta
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error al obtener los datos de proyectos técnicos:', err.message);
//     res.status(500).json({ error: 'Error al obtener los datos', details: err.message });
//   } finally {
//     // Cerrar la conexión si existe
//     if (connection) {
//       await connection.end();
//     }
//   }
// });

app.get('/informacioncomunidades', async (req, res) => {
  // Consulta SQL para obtener los proyectos asociados a usuarios con idRol = 5
  const sql = `
    SELECT 
      r.Nombre AS NombreProyecto, 
      u.Nombre AS NombreUsuario, 
      c.nombre_comunidad AS NombreComunidad,  -- Agregado: nombre de la comunidad
      c.nombre_municipio AS NombreMunicipio, 
      c.numero_personas AS NumeroPersonas,
      c.numero_familias AS NumeroFamilias,
      c.numero_viviendas AS NumeroViviendas,
      c.presidente_cocode AS PresidenteCocode,  -- Agregado: presidente de la comunidad
      e.Estadoproyecto AS EstadoProyecto 
    FROM 
      tb_registrarpr AS r
    JOIN 
      tb_comunidad AS c ON r.idComunidad = c.idComunidad
    JOIN 
      tb_estadoP AS e ON r.idestado = e.idestado
    JOIN 
      tb_Usuario AS u ON r.idUsuario = u.idUsuario
    WHERE 
      u.idRol = 5; -- Filtrar solo los usuarios con rol Técnico (idRol = 5)
  `;
  
  let connection;

  try {
    // Crear una conexión única
    connection = await mysql.createConnection(dbConfig);
    
    // Ejecutar la consulta
    const [rows] = await connection.execute(sql);

    // Enviar los datos obtenidos como respuesta
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los datos de proyectos técnicos:', err.message);
    res.status(500).json({ error: 'Error al obtener los datos', details: err.message });
  } finally {
    // Cerrar la conexión si existe
    if (connection) {
      await connection.end();
    }
  }
});






app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
