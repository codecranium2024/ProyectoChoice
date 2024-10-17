import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonModal,
  IonInput,
  IonCheckbox,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem,
} from '@ionic/react';
import './AdministrarUsuarios.css';

// Interfaces para manejar usuarios, roles y especialidades
interface Usuario {
  idUsuario: number;
  Nombre: string;
  Apellido: string;
  Correo: string;
  Telefono: string;
  nombreRol: string;
  nombreEspecialidad: string;
}

interface Rol {
  idRol: number;
  Rol: string;
}

interface Especialidad {
  idEspecialidad: number;
  Especialidad: string;
}

const AdministrarUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [autoGeneratedUser, setAutoGeneratedUser] = useState('');
  const [autoGeneratedPassword, setAutoGeneratedPassword] = useState('');
  const [customPassword, setCustomPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Estados para la actualización de usuario
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [updateForm, setUpdateForm] = useState({
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: '',
    rolId: '',
    especialidadId: '',
  });
  const [resetPassword, setResetPassword] = useState(false); // Para el checkbox de resetear contraseña
  const [newGeneratedPassword, setNewGeneratedPassword] = useState(''); // Nueva contraseña generada

  // Estado para los campos de registro de usuario
  const [registerForm, setRegisterForm] = useState({
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: '',
    Usuario: '',
    Password: '',
    rolId: '',
    especialidadId: '',
  });

  // Estado para la eliminación de usuario
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [showConfirmDeleteAlert, setShowConfirmDeleteAlert] = useState(false);

  // Obtener usuarios, roles y especialidades al cargar el componente
  useEffect(() => {
    fetch('http://localhost:3000/usuarios')
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error('Error al obtener usuarios:', err));

    fetch('http://localhost:3000/roles')
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error('Error al obtener roles:', err));

    fetch('http://localhost:3000/especialidades')
      .then((res) => res.json())
      .then((data) => setEspecialidades(data))
      .catch((err) => console.error('Error al obtener especialidades:', err));
  }, []);

  // Función para generar una contraseña segura aleatoria
  const generatePassword = () => {
    const password =
      Math.random().toString(36).slice(-4) +
      Math.random().toString(36).toUpperCase().slice(-2) +
      Math.floor(Math.random() * 10) +
      '!@#$%^&*'.charAt(Math.floor(Math.random() * 8));
    setNewGeneratedPassword(password); // Guardar la nueva contraseña generada
    return password;
  };

  // Función para manejar la lógica de agregar usuario
  const handleRegisterUser = async () => {
    // Validar campos necesarios
    if (!registerForm.Nombre || !registerForm.Apellido || !registerForm.Correo || !registerForm.Telefono || !registerForm.rolId || !registerForm.especialidadId) {
      setAlertMessage('Por favor, llena todos los campos.');
      setShowSuccessAlert(true);
      return;
    }

    // Variables para almacenar usuario y contraseña generados
    let usuarioGenerado = registerForm.Usuario;
    let passwordGenerado = registerForm.Password;

    // Generar usuario y contraseña si no se ingresan manualmente
    if (!customPassword) {
      const generated = generatePassword();
      usuarioGenerado = `${registerForm.Nombre.slice(0, 2).toLowerCase()}${registerForm.Apellido.split(' ')[0].toLowerCase()}${registerForm.Telefono.slice(-3)}`;
      passwordGenerado = generated;
    }

    try {
      // Convertir rolId y especialidadId a números
      const numericRolId = parseInt(registerForm.rolId, 10);
      const numericEspecialidadId = parseInt(registerForm.especialidadId, 10);

      // Enviar datos al servidor
      const response = await fetch('http://localhost:3000/registrarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: registerForm.Nombre,
          apellido: registerForm.Apellido,
          correo: registerForm.Correo,
          telefono: registerForm.Telefono,
          usuario: usuarioGenerado,
          password: passwordGenerado,
          rolId: numericRolId,
          especialidadId: numericEspecialidadId,
        }),
      });

      if (response.ok) {
        setAlertMessage(`Usuario registrado con éxito:\nUsuario: ${usuarioGenerado}\nContraseña: ${passwordGenerado}`);
        setShowSuccessAlert(true);
        // Limpiar campos después de registrar el usuario
        setRegisterForm({
          Nombre: '',
          Apellido: '',
          Correo: '',
          Telefono: '',
          Usuario: '',
          Password: '',
          rolId: '',
          especialidadId: '',
        });
        // Refrescar la lista de usuarios
        fetch('http://localhost:3000/usuarios')
          .then((res) => res.json())
          .then((data) => setUsuarios(data))
          .catch((err) => console.error('Error al obtener usuarios:', err));
      } else {
        setAlertMessage('Error al registrar el usuario.');
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setAlertMessage('Error al registrar el usuario.');
      setShowSuccessAlert(true);
    }

    setShowRegisterModal(false);
  };

  // Función para manejar la lógica de eliminar usuario
  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(`http://localhost:3000/eliminarUsuario/${userToDelete}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setAlertMessage('Usuario eliminado con éxito');
          setShowSuccessAlert(true);
          // Refrescar la lista de usuarios
          fetch('http://localhost:3000/usuarios')
            .then((res) => res.json())
            .then((data) => setUsuarios(data))
            .catch((err) => console.error('Error al obtener usuarios:', err));
        } else {
          setAlertMessage('Error al eliminar el usuario.');
          setShowSuccessAlert(true);
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        setAlertMessage('Error al eliminar el usuario.');
        setShowSuccessAlert(true);
      }
    }
    setShowDeleteModal(false);
    setShowConfirmDeleteAlert(false);
  };

  // Función para manejar la selección de usuario para actualizar
  const handleSelectUserToUpdate = (userId: number) => {
    const selectedUser = usuarios.find((user) => user.idUsuario === userId);
    if (selectedUser) {
      setUpdateForm({
        Nombre: selectedUser.Nombre,
        Apellido: selectedUser.Apellido,
        Correo: selectedUser.Correo,
        Telefono: selectedUser.Telefono,
        rolId: roles.find((rol) => rol.Rol === selectedUser.nombreRol)?.idRol.toString() || '',
        especialidadId: especialidades.find((esp) => esp.Especialidad === selectedUser.nombreEspecialidad)?.idEspecialidad.toString() || '',
      });
      setSelectedUserId(userId);
      setShowUpdateModal(true);
    }
  };

  // Función para manejar la actualización del usuario
  const handleUpdateUser = async () => {
    if (selectedUserId) {
      // Generar nueva contraseña si el checkbox está marcado
      const password = resetPassword ? generatePassword() : null;

      try {
        const response = await fetch(`http://localhost:3000/actualizarUsuario/${selectedUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: updateForm.Nombre,
            apellido: updateForm.Apellido,
            correo: updateForm.Correo,
            telefono: updateForm.Telefono,
            rolId: parseInt(updateForm.rolId, 10),
            especialidadId: parseInt(updateForm.especialidadId, 10),
            password: password,
          }),
        });

        if (response.ok) {
          setAlertMessage(resetPassword ? `Usuario actualizado con éxito. Nueva contraseña: ${password}` : 'Usuario actualizado con éxito.');
          setShowSuccessAlert(true);
          // Refrescar la lista de usuarios
          fetch('http://localhost:3000/usuarios')
            .then((res) => res.json())
            .then((data) => setUsuarios(data))
            .catch((err) => console.error('Error al obtener usuarios:', err));
        } else {
          setAlertMessage('Error al actualizar el usuario.');
          setShowSuccessAlert(true);
        }
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        setAlertMessage('Error al actualizar el usuario.');
        setShowSuccessAlert(true);
      }

      setShowUpdateModal(false);
      setResetPassword(false); // Restablecer el checkbox
    }
  };

  // Actualiza el formulario de registro de usuario al escribir
  const handleInputChange = (e: CustomEvent, field: string) => {
    setRegisterForm({ ...registerForm, [field]: (e.target as HTMLInputElement).value });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Administrar Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Botones de acciones */}
        <div className="button-container">
          <IonButton color="primary" onClick={() => setShowRegisterModal(true)}>
            Agregar Usuario
          </IonButton>
          <IonButton color="warning" onClick={() => setShowModal(true)}>
            Editar Usuario
          </IonButton>
          <IonButton color="danger" onClick={() => setShowDeleteModal(true)}>
            Eliminar Usuario
          </IonButton>
        </div>

        {/* Tabla de usuarios */}
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <tr key={usuario.idUsuario}>
                  <td>{index + 1}</td>
                  <td>{usuario.Nombre}</td>
                  <td>{usuario.Apellido}</td>
                  <td>{usuario.Correo}</td>
                  <td>{usuario.Telefono}</td>
                  <td>{usuario.nombreRol}</td>
                  <td>{usuario.nombreEspecialidad}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No hay usuarios registrados</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Alerta personalizada */}
        <IonAlert
          isOpen={showSuccessAlert}
          onDidDismiss={() => setShowSuccessAlert(false)}
          header={'Operación Exitosa'}
          message={alertMessage}
          buttons={['Aceptar']}
        />

        {/* Modal para agregar usuario */}
        <IonModal isOpen={showRegisterModal} onDidDismiss={() => setShowRegisterModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Registrar Usuario</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form className="register-form">
              <IonInput placeholder="Nombre" value={registerForm.Nombre} onIonChange={(e) => handleInputChange(e, 'Nombre')} />
              <IonInput placeholder="Apellido" value={registerForm.Apellido} onIonChange={(e) => handleInputChange(e, 'Apellido')} />
              <IonInput placeholder="Correo" value={registerForm.Correo} onIonChange={(e) => handleInputChange(e, 'Correo')} />
              <IonInput placeholder="Teléfono" value={registerForm.Telefono} onIonChange={(e) => handleInputChange(e, 'Telefono')} />
              <IonLabel>Seleccione Rol</IonLabel>
              <IonSelect
                placeholder="Selecciona Rol"
                value={registerForm.rolId}
                onIonChange={(e) => setRegisterForm({ ...registerForm, rolId: e.detail.value })}
              >
                {roles.map((rol: Rol) => (
                  <IonSelectOption key={rol.idRol} value={rol.idRol}>
                    {rol.Rol}
                  </IonSelectOption>
                ))}
              </IonSelect>
              <IonLabel>Seleccione Especialidad</IonLabel>
              <IonSelect
                placeholder="Selecciona Especialidad"
                value={registerForm.especialidadId}
                onIonChange={(e) => setRegisterForm({ ...registerForm, especialidadId: e.detail.value })}
              >
                {especialidades.map((especialidad: Especialidad) => (
                  <IonSelectOption key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>
                    {especialidad.Especialidad}
                  </IonSelectOption>
                ))}
              </IonSelect>
              {/* Checkbox para decidir si usar una contraseña personalizada */}
              <IonItem>
                <IonLabel>Haz clic si deseas crear el usuario y la contraseña manualmente.</IonLabel>
                <IonLabel>De lo contrario generara uno de manera aleatoria.</IonLabel>
                <IonCheckbox checked={customPassword} onIonChange={() => setCustomPassword(!customPassword)} />
              </IonItem>
              {customPassword && (
                <>
                  <IonInput
                    placeholder="Usuario"
                    value={registerForm.Usuario}
                    onIonChange={(e) => handleInputChange(e, 'Usuario')}
                  />
                  <IonInput
                    placeholder="Contraseña"
                    type="password"
                    value={registerForm.Password}
                    onIonChange={(e) => handleInputChange(e, 'Password')}
                  />
                </>
              )}

              <IonButton color="primary" onClick={handleRegisterUser}>
                Guardar
              </IonButton>
              <IonButton color="medium" onClick={() => setShowRegisterModal(false)}>
                Cancelar
              </IonButton>
            </form>
          </IonContent>
        </IonModal>

        {/* Modal para seleccionar usuario a actualizar */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Seleccionar Usuario a Actualizar</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonLabel>Seleccione Usuario</IonLabel>
            <IonSelect onIonChange={(e) => handleSelectUserToUpdate(e.detail.value)}>
              {usuarios.map((usuario) => (
                <IonSelectOption key={usuario.idUsuario} value={usuario.idUsuario}>
                  {usuario.Nombre} {usuario.Apellido}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonContent>
        </IonModal>

        {/* Modal para actualizar usuario */}
        <IonModal isOpen={showUpdateModal} onDidDismiss={() => setShowUpdateModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Actualizar Usuario</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form className="update-form">
              <IonInput placeholder="Nombre" value={updateForm.Nombre} onIonChange={(e) => setUpdateForm({ ...updateForm, Nombre: e.detail.value! })} />
              <IonInput placeholder="Apellido" value={updateForm.Apellido} onIonChange={(e) => setUpdateForm({ ...updateForm, Apellido: e.detail.value! })} />
              <IonInput placeholder="Correo" value={updateForm.Correo} onIonChange={(e) => setUpdateForm({ ...updateForm, Correo: e.detail.value! })} />
              <IonInput placeholder="Teléfono" value={updateForm.Telefono} onIonChange={(e) => setUpdateForm({ ...updateForm, Telefono: e.detail.value! })} />
              <IonLabel>Seleccione Rol</IonLabel>
              <IonSelect
                placeholder="Selecciona Rol"
                value={updateForm.rolId}
                onIonChange={(e) => setUpdateForm({ ...updateForm, rolId: e.detail.value })}
              >
                {roles.map((rol: Rol) => (
                  <IonSelectOption key={rol.idRol} value={rol.idRol}>
                    {rol.Rol}
                  </IonSelectOption>
                ))}
              </IonSelect>
              <IonLabel>Seleccione Especialidad</IonLabel>
              <IonSelect
                placeholder="Selecciona Especialidad"
                value={updateForm.especialidadId}
                onIonChange={(e) => setUpdateForm({ ...updateForm, especialidadId: e.detail.value })}
              >
                {especialidades.map((especialidad: Especialidad) => (
                  <IonSelectOption key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>
                    {especialidad.Especialidad}
                  </IonSelectOption>
                ))}
              </IonSelect>

              {/* Checkbox para resetear contraseña */}
              <IonItem>
                <IonLabel>Resetear Contraseña</IonLabel>
                <IonCheckbox checked={resetPassword} onIonChange={() => setResetPassword(!resetPassword)} />
              </IonItem>

              <IonButton color="primary" onClick={handleUpdateUser}>
                Guardar Cambios
              </IonButton>
              <IonButton color="medium" onClick={() => setShowUpdateModal(false)}>
                Cancelar
              </IonButton>
            </form>
          </IonContent>
        </IonModal>

        {/* Modal para seleccionar usuario a eliminar */}
        <IonModal isOpen={showDeleteModal} onDidDismiss={() => setShowDeleteModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Seleccionar Usuario a Eliminar</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonLabel>Seleccione Usuario</IonLabel>
            <IonSelect
              placeholder="Selecciona Usuario"
              onIonChange={(e) => setUserToDelete(e.detail.value)}
            >
              {usuarios.map((usuario) => (
                <IonSelectOption key={usuario.idUsuario} value={usuario.idUsuario}>
                  {usuario.Nombre} {usuario.Apellido}
                </IonSelectOption>
              ))}
            </IonSelect>
            <IonButton color="danger" onClick={() => setShowConfirmDeleteAlert(true)}>
              Continuar
            </IonButton>
            <IonButton color="medium" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Confirmación de eliminación */}
        <IonAlert
          isOpen={showConfirmDeleteAlert}
          onDidDismiss={() => setShowConfirmDeleteAlert(false)}
          header={'Eliminar Usuario'}
          message={'¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'Aceptar',
              handler: handleDeleteUser,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdministrarUsuarios;
