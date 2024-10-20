-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS bdChoice;
USE bdChoice;

-- Crear la tabla tb_Rol
CREATE TABLE tb_Rol (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    Rol VARCHAR(25) NOT NULL
);

-- Crear la tabla tb_Especialidad
CREATE TABLE tb_Especialidad (
    idEspecialidad INT AUTO_INCREMENT PRIMARY KEY,
    Especialidad VARCHAR(30) NOT NULL
);

-- Crear la tabla tb_Usuario
CREATE TABLE tb_Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    Telefono VARCHAR(20),
    idRol INT,
    idEspecialidad INT,
    Usuario VARCHAR(100) NOT NULL UNIQUE,
    Password VARBINARY(255) NOT NULL, -- Campo para la contraseña encriptada
    FOREIGN KEY (idRol) REFERENCES tb_Rol(idRol),
    FOREIGN KEY (idEspecialidad) REFERENCES tb_Especialidad(idEspecialidad)
);

-- Definir la clave de encriptación (asegúrate de cambiar esta clave por una segura)
SET @encryption_key = 'y4$Dt#*?*';

-- Procedimiento para encriptar la contraseña
DELIMITER //
CREATE PROCEDURE encriptarPassword(IN userId INT, IN plainPassword VARCHAR(255))
BEGIN
    -- Actualiza el campo 'Password' en la tabla 'tb_Usuario' con la contraseña encriptada
    UPDATE tb_Usuario
    SET Password = AES_ENCRYPT(plainPassword, @encryption_key)
    WHERE idUsuario = userId;
END //
DELIMITER ;

-- Procedimiento para desencriptar la contraseña
DELIMITER //
CREATE PROCEDURE desencriptarPassword(IN userId INT, OUT decryptedPassword VARCHAR(255))
BEGIN
    -- Recupera y desencripta la contraseña de la tabla 'tb_Usuario'
    SELECT AES_DECRYPT(Password, @encryption_key)
    INTO decryptedPassword
    FROM tb_Usuario
    WHERE idUsuario = userId;
END //
DELIMITER ;

-- Procedimiento para insertar un usuario con una contraseña encriptada
DELIMITER //
CREATE PROCEDURE insertarUsuario(
    IN nombre VARCHAR(100),
    IN apellido VARCHAR(100),
    IN correo VARCHAR(100),
    IN telefono VARCHAR(20),
    IN rolId INT,
    IN especialidadId INT,
    IN usuario VARCHAR(100),
    IN plainPassword VARCHAR(255)
)
BEGIN
    -- Insertar el usuario sin la contraseña encriptada
    INSERT INTO tb_Usuario (Nombre, Apellido, Correo, Telefono, idRol, idEspecialidad, Usuario, Password)
    VALUES (nombre, apellido, correo, telefono, rolId, especialidadId, usuario, AES_ENCRYPT(plainPassword, @encryption_key));
END //
DELIMITER ;

-- Insertar rol
INSERT INTO tb_Rol (Rol) VALUES ('Administrador');

-- Insertar especialidades de ejemplo
INSERT INTO tb_Especialidad (Especialidad) VALUES ('Gerencia');

-- Insertar un usuario de ejemplo y encriptar su contraseña
CALL insertarUsuario(
    'Wilfredo',
    'Ac',
    'wacr1@miumg.edu.gt',
    '44186796',
    1,
    3,
    'wilfredoac22',
    '4418'
);

-- Seleccionar tb_Usuario
select * From tb_Usuario;

delete from tb_Usuario Where idUsuario = 20;

-- Para desencriptar la contraseña de un usuario (por ejemplo, el usuario con idUsuario = 1)
CALL desencriptarPassword(1, @mi_contrasena_desencriptada);
SELECT @mi_contraseña_desencriptada;

SELECT * from tb_Rol;

-- para desincriptar la contraseña de un usuario
SELECT CAST(AES_DECRYPT(Password, 'y4$Dt#*?*') AS CHAR) AS DecryptedPassword FROM tb_Usuario WHERE Usuario = 'wilfredoac22';

-- Crear la tabla tb_InfoGeneral
CREATE TABLE tb_Comunidad (
    idComunidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_comunidad VARCHAR(50) NOT NULL,
    presidente_cocode VARCHAR(50) NOT NULL,
    telefono_contacto1 VARCHAR(15) NOT NULL,
    otro_lider VARCHAR(50),
    telefono_contacto2 VARCHAR(15),
    tipo_transporte VARCHAR(75),
    numero_familias INT,
    numero_viviendas INT,
    numero_personas INT,
    certeza_juridica_tierra VARCHAR(150),
    conflictos_tierra VARCHAR(150) NULL,
    dimension_lotes VARCHAR(150),
    dimension_trabajadores VARCHAR(150),
    tierra_comunitaria VARCHAR(150),
    idiomas_comunidad VARCHAR(150),
    fuentes_empleo VARCHAR(150),
    recreacion_comunidad VARCHAR(150),
    potencial_turistico VARCHAR(150),
    tipo_edificios_publicos VARCHAR(150),
    hay_inseguridad TINYINT(1) DEFAULT 0,
    tipo_inseguridad VARCHAR(150) NULL,
    grupos_delincuenciales VARCHAR(150) NULL,
    personas_otro_lugar INT NULL,
    ocupacion_otro_lugar VARCHAR(150) NULL,
    personas_en_eeuu TINYINT(1) DEFAULT 0,
    cantidad_personas_eeuu INT NULL,
    menores_en_eeuu TINYINT(1) DEFAULT 0,
    edad_empieza_trabajar_hombres INT NULL,
    edad_empieza_trabajar_mujeres INT NULL,
    tipo_empleo VARCHAR(150) NULL,
    existen_jubilados TINYINT(1) DEFAULT 0,
    cantidad_jubilados INT NULL,
    institucion_jubilados VARCHAR(150) NULL,
    ocupaciones_tradicionales_mujeres VARCHAR(150),
    ocupaciones_tradicionales_hombres VARCHAR(150),
    idiomas_comunidad VARCHAR(150),
    fuentes_empleo VARCHAR(150),
    recreacion_comunidad VARCHAR(150),
    potencial_turistico VARCHAR(150),
    tipo_edificios_publicos VARCHAR(150),
    hay_inseguridad TINYINT(1) DEFAULT 0,
    tipo_inseguridad VARCHAR(150) NULL,
    grupos_delincuenciales VARCHAR(150) NULL,
    personas_otro_lugar INT NULL,
    ocupacion_otro_lugar VARCHAR(150) NULL,
    personas_en_eeuu TINYINT(1) DEFAULT 0,
    cantidad_personas_eeuu INT NULL,
    menores_en_eeuu TINYINT(1) DEFAULT 0,
    edad_empieza_trabajar_hombres INT NULL,
    edad_empieza_trabajar_mujeres INT NULL,
    tipo_empleo VARCHAR(150) NULL,
    existen_jubilados TINYINT(1) DEFAULT 0,
    cantidad_jubilados INT NULL,
    institucion_jubilados VARCHAR(150) NULL,
    ocupaciones_tradicionales_mujeres VARCHAR(150),
    ocupaciones_tradicionales_hombres VARCHAR(150)
);

SELECT * FROM tb_Comunidad;

ALTER TABLE tb_Comunidad 
MODIFY certeza_juridica_tierra VARCHAR(150);

---- se agregan los campos de municipio, aldea y su ubiciacion
ALTER TABLE tb_Comunidad
ADD COLUMN nombre_municipio VARCHAR(50) NOT NULL,
ADD COLUMN nombre_aldea VARCHAR(50) NOT NULL,
ADD COLUMN ubicacion_real VARCHAR(100) NOT NULL;

--- se agregan la seccion de servicios
ALTER TABLE tb_comunidad
ADD COLUMN energia_electrica BOOLEAN DEFAULT 0,
ADD COLUMN tipo_servicio VARCHAR(255),
ADD COLUMN calidad_servicio VARCHAR(255),
ADD COLUMN costos_servicio VARCHAR(255),
ADD COLUMN prestador_servicio VARCHAR(255),
ADD COLUMN familias_con_servicio INT,
ADD COLUMN senal_telefono BOOLEAN DEFAULT 0,
ADD COLUMN senal_internet BOOLEAN DEFAULT 0,
ADD COLUMN senal_tv BOOLEAN DEFAULT 0,
ADD COLUMN cable BOOLEAN DEFAULT 0,
ADD COLUMN prestador_servicios VARCHAR(255);


---------------------------------------------------
CREATE TABLE tb_categoriaPr (
    idCategoriaProyecto INT AUTO_INCREMENT PRIMARY KEY,
    Categoria VARCHAR(35) NOT NULL
);

CREATE TABLE tb_registrarpr (
    idRegistrarProyecto INT AUTO_INCREMENT PRIMARY KEY,
    idCategoriaProyecto INT NOT NULL,
    Nombreclatura VARCHAR(25) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    idUsuario INT NOT NULL,  
    idestado INT NOT NULL,  
    FechaInicio DATE NOT NULL,
    FechaFinalizacion DATE NOT NULL,
    FOREIGN KEY (idCategoriaProyecto) REFERENCES tb_categoriaPr(idCategoriaProyecto),
    FOREIGN KEY (idUsuario) REFERENCES tb_Usuario(idUsuario),
    FOREIGN KEY (idestado) REFERENCES tb_estadoP(idestado)
);

ALTER TABLE tb_registrarpr
ADD idComunidad INT;

ALTER TABLE tb_registrarpr
ADD CONSTRAINT fk_comunidad FOREIGN KEY (idComunidad) REFERENCES tb_Comunidad(idComunidad);


CREATE TABLE tb_estadoP (
    idestado INT AUTO_INCREMENT PRIMARY KEY,
    Estadoproyecto VARCHAR(30) NOT NULL
);

--------------------------------------------------
ALTER TABLE tb_registrarpr
ADD CONSTRAINT fk_registrarpr_categoria
FOREIGN KEY (idCategoriaProyecto) REFERENCES tb_categoriaPr(idCategoriaProyecto);

-------------------------------------------------------------------------------------------
--Departamentos y municipios
CREATE TABLE tb_departamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombredepartamento VARCHAR(50) NOT NULL
);

CREATE TABLE tb_municipio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombremunicipio VARCHAR(50) NOT NULL,
    departamento_id INT,
    FOREIGN KEY (departamento_id) REFERENCES tb_departamento(id) ON DELETE CASCADE
);
-- CREATE TABLE tb_listadocomunidad (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     nombrecomunidad VARCHAR(50) NOT NULL,
--     municipio_id INT,
--     FOREIGN KEY (municipio_id) REFERENCES tb_municipio(id) ON DELETE CASCADE
-- );

---------------------------------------------------------------------------------------------
