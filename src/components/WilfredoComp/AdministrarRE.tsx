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
  IonItem,
} from '@ionic/react';
import './AdministrarUsuarios.css'; // Usar el mismo archivo CSS que AdministrarUsuarios

// Interfaces para manejar roles y especialidades
interface Rol {
  idRol: number;
  Rol: string;
}

interface Especialidad {
  idEspecialidad: number;
  Especialidad: string;
}

const AdministrarDatos: React.FC = () => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  // Estados para Roles
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleForm, setRoleForm] = useState<{ idRol: number | null; Rol: string }>({ idRol: null, Rol: '' });
  const [showConfirmDeleteRoleAlert, setShowConfirmDeleteRoleAlert] = useState(false);

  // Estados para Especialidades
  const [showEspecialidadModal, setShowEspecialidadModal] = useState(false);
  const [especialidadForm, setEspecialidadForm] = useState<{ idEspecialidad: number | null; Especialidad: string }>({ idEspecialidad: null, Especialidad: '' });
  const [showConfirmDeleteEspecialidadAlert, setShowConfirmDeleteEspecialidadAlert] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Obtener roles y especialidades al cargar el componente
  useEffect(() => {
    fetch('http://localhost:3000/roles')
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error('Error al obtener roles:', err));

    fetch('http://localhost:3000/especialidades')
      .then((res) => res.json())
      .then((data) => setEspecialidades(data))
      .catch((err) => console.error('Error al obtener especialidades:', err));
  }, []);

  // Funciones para manejar Roles
  const handleSaveRole = async () => {
    if (!roleForm.Rol) {
      setAlertMessage('Por favor, llena todos los campos.');
      setShowSuccessAlert(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/${roleForm.idRol ? `actualizarRol/${roleForm.idRol}` : 'agregarRol'}`, {
        method: roleForm.idRol ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Rol: roleForm.Rol }),
      });

      if (response.ok) {
        setAlertMessage('Operación con rol exitosa.');
        setShowSuccessAlert(true);
        // Refrescar la lista de roles
        fetch('http://localhost:3000/roles')
          .then((res) => res.json())
          .then((data) => setRoles(data))
          .catch((err) => console.error('Error al obtener roles:', err));
      } else {
        setAlertMessage('Error al guardar el rol.');
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error('Error al guardar el rol:', error);
      setAlertMessage('Error al guardar el rol.');
      setShowSuccessAlert(true);
    }

    setShowRoleModal(false);
  };

  const handleDeleteRole = async (idRol: number) => {
    try {
      const response = await fetch(`http://localhost:3000/eliminarRol/${idRol}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAlertMessage('Rol eliminado con éxito.');
        setShowSuccessAlert(true);
        // Refrescar la lista de roles
        fetch('http://localhost:3000/roles')
          .then((res) => res.json())
          .then((data) => setRoles(data))
          .catch((err) => console.error('Error al obtener roles:', err));
      } else {
        setAlertMessage('Error al eliminar el rol.');
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      setAlertMessage('Error al eliminar el rol.');
      setShowSuccessAlert(true);
    }
  };

  // Funciones para manejar Especialidades
  const handleSaveEspecialidad = async () => {
    if (!especialidadForm.Especialidad) {
      setAlertMessage('Por favor, llena todos los campos.');
      setShowSuccessAlert(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/${especialidadForm.idEspecialidad ? `actualizarEspecialidad/${especialidadForm.idEspecialidad}` : 'agregarEspecialidad'}`, {
        method: especialidadForm.idEspecialidad ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Especialidad: especialidadForm.Especialidad }),
      });

      if (response.ok) {
        setAlertMessage('Operación con especialidad exitosa.');
        setShowSuccessAlert(true);
        // Refrescar la lista de especialidades
        fetch('http://localhost:3000/especialidades')
          .then((res) => res.json())
          .then((data) => setEspecialidades(data))
          .catch((err) => console.error('Error al obtener especialidades:', err));
      } else {
        setAlertMessage('Error al guardar la especialidad.');
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error('Error al guardar la especialidad:', error);
      setAlertMessage('Error al guardar la especialidad.');
      setShowSuccessAlert(true);
    }

    setShowEspecialidadModal(false);
  };

  const handleDeleteEspecialidad = async (idEspecialidad: number) => {
    try {
      const response = await fetch(`http://localhost:3000/eliminarEspecialidad/${idEspecialidad}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAlertMessage('Especialidad eliminada con éxito.');
        setShowSuccessAlert(true);
        // Refrescar la lista de especialidades
        fetch('http://localhost:3000/especialidades')
          .then((res) => res.json())
          .then((data) => setEspecialidades(data))
          .catch((err) => console.error('Error al obtener especialidades:', err));
      } else {
        setAlertMessage('Error al eliminar la especialidad.');
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error('Error al eliminar la especialidad:', error);
      setAlertMessage('Error al eliminar la especialidad.');
      setShowSuccessAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Administrar Roles y Especialidades</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Botones de acciones para Roles */}
        <div className="button-container">
          <IonButton
            color="primary"
            onClick={() => {
              setRoleForm({ idRol: null, Rol: '' }); // Limpia el formulario
              setShowRoleModal(true); // Abre el modal
            }}
          >
            Agregar Rol
          </IonButton>
          <IonButton
            color="primary"
            onClick={() => {
              setEspecialidadForm({ idEspecialidad: null, Especialidad: '' }); // Limpia el formulario
              setShowEspecialidadModal(true); // Abre el modal
            }}
          >
            Agregar Especialidad
          </IonButton>
        </div>

        {/* Tabla de roles */}
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((rol, index) => (
                <tr key={rol.idRol}>
                  <td>{index + 1}</td>
                  <td>{rol.Rol}</td>
                  <td>
                    <IonButton
                      color="warning"
                      onClick={() => {
                        setRoleForm({ idRol: rol.idRol, Rol: rol.Rol });
                        setShowRoleModal(true); // Abre el modal
                      }}
                    >
                      Actualizar
                    </IonButton>
                    <IonButton color="danger" onClick={() => handleDeleteRole(rol.idRol)}>
                      Eliminar
                    </IonButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No hay roles registrados</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Tabla de especialidades */}
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.length > 0 ? (
              especialidades.map((esp, index) => (
                <tr key={esp.idEspecialidad}>
                  <td>{index + 1}</td>
                  <td>{esp.Especialidad}</td>
                  <td>
                    <IonButton
                      color="warning"
                      onClick={() => {
                        setEspecialidadForm({ idEspecialidad: esp.idEspecialidad, Especialidad: esp.Especialidad });
                        setShowEspecialidadModal(true); // Abre el modal
                      }}
                    >
                      Actualizar
                    </IonButton>
                    <IonButton color="danger" onClick={() => handleDeleteEspecialidad(esp.idEspecialidad)}>
                      Eliminar
                    </IonButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No hay especialidades registradas</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal para agregar/actualizar Rol */}
        <IonModal
          isOpen={showRoleModal}
          onDidDismiss={() => {
            setShowRoleModal(false);
            setRoleForm({ idRol: null, Rol: '' }); // Limpia el formulario
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>{roleForm.idRol ? 'Actualizar Rol' : 'Agregar Rol'}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonInput
                placeholder="Nombre del Rol"
                value={roleForm.Rol}
                onIonChange={(e) => setRoleForm({ ...roleForm, Rol: e.detail.value! })}
              />
            </IonItem>
            <IonButton color="primary" onClick={handleSaveRole}>
              Guardar
            </IonButton>
            <IonButton color="medium" onClick={() => setShowRoleModal(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Modal para agregar/actualizar Especialidad */}
        <IonModal
          isOpen={showEspecialidadModal}
          onDidDismiss={() => {
            setShowEspecialidadModal(false);
            setEspecialidadForm({ idEspecialidad: null, Especialidad: '' }); // Limpia el formulario
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>{especialidadForm.idEspecialidad ? 'Actualizar Especialidad' : 'Agregar Especialidad'}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonInput
                placeholder="Nombre de la Especialidad"
                value={especialidadForm.Especialidad}
                onIonChange={(e) => setEspecialidadForm({ ...especialidadForm, Especialidad: e.detail.value! })}
              />
            </IonItem>
            <IonButton color="primary" onClick={handleSaveEspecialidad}>
              Guardar
            </IonButton>
            <IonButton color="medium" onClick={() => setShowEspecialidadModal(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Alerta de éxito */}
        <IonAlert
          isOpen={showSuccessAlert}
          onDidDismiss={() => setShowSuccessAlert(false)}
          header={'Operación Exitosa'}
          message={alertMessage}
          buttons={['Aceptar']}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdministrarDatos;
