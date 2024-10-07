import React, { useState, useEffect } from 'react';
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonButton,
  IonGrid, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonAlert
} from '@ionic/react';
import './RegistrarUsuario.css';

const RegistrarUsuario: React.FC = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [roles, setRoles] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Obtener roles y especialidades al cargar el componente
  useEffect(() => {
    // Obtener roles
    fetch('http://localhost:3000/roles')
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error('Error fetching roles:', err));

    // Obtener especialidades
    fetch('http://localhost:3000/especialidades')
      .then(res => res.json())
      .then(data => setEspecialidades(data))
      .catch(err => console.error('Error fetching especialidades:', err));
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Crear el cuerpo de la solicitud con los datos del formulario
    const body = {
      nombre,
      apellido,
      correo,
      telefono,
      usuario,
      password,
      rolId: rol,
      especialidadId: especialidad
    };

    // Realizar una solicitud POST para registrar el usuario
    fetch('http://localhost:3000/registrarUsuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.ok) {
          setAlertMessage('Usuario registrado con éxito');
          setShowAlert(true);
          // Limpiar el formulario
          setNombre('');
          setApellido('');
          setCorreo('');
          setTelefono('');
          setUsuario('');
          setPassword('');
          setRol('');
          setEspecialidad('');
        } else {
          setAlertMessage('Error al registrar el usuario');
          setShowAlert(true);
        }
      })
      .catch(err => {
        console.error('Error al registrar usuario:', err);
        setAlertMessage('Error al conectar con el servidor');
        setShowAlert(true);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="page-content">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <IonLabel className="input-label">Nombre:</IonLabel>
                  <IonInput
                    className="input-field"
                    value={nombre}
                    onIonChange={e => setNombre(e.detail.value!)}
                    required
                  />
                  
                  <IonLabel className="input-label">Apellido:</IonLabel>
                  <IonInput
                    className="input-field"
                    value={apellido}
                    onIonChange={e => setApellido(e.detail.value!)}
                    required
                  />
                  
                  <IonLabel className="input-label">Correo:</IonLabel>
                  <IonInput
                    className="input-field"
                    value={correo}
                    onIonChange={e => setCorreo(e.detail.value!)}
                    type="email"
                    required
                  />
                  
                  <IonLabel className="input-label">Teléfono:</IonLabel>
                  <IonInput
                    className="input-field"
                    value={telefono}
                    onIonChange={e => setTelefono(e.detail.value!)}
                    required
                  />
                  
                  <IonLabel className="input-label">Usuario:</IonLabel>
                  <IonInput
                    className="input-field"
                    value={usuario}
                    onIonChange={e => setUsuario(e.detail.value!)}
                    required
                  />
                  
                  <IonLabel className="input-label">Contraseña:</IonLabel>
                  <IonInput
                    className="input-field"
                    value={password}
                    onIonChange={e => setPassword(e.detail.value!)}
                    type="password"
                    required
                  />
                  
                  <IonLabel className="input-label">Rol:</IonLabel>
                  <IonSelect
                    className="input-field"
                    value={rol}
                    onIonChange={e => setRol(e.detail.value!)}
                    placeholder="Seleccione un Rol"
                  >
                    {roles.map((rolItem: any) => (
                      <IonSelectOption key={rolItem.idRol} value={rolItem.idRol}>
                        {rolItem.Rol}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                  
                  <IonLabel className="input-label">Especialidad:</IonLabel>
                  <IonSelect
                    className="input-field"
                    value={especialidad}
                    onIonChange={e => setEspecialidad(e.detail.value!)}
                    placeholder="Seleccione una Especialidad"
                  >
                    {especialidades.map((espItem: any) => (
                      <IonSelectOption key={espItem.idEspecialidad} value={espItem.idEspecialidad}>
                        {espItem.Especialidad}
                      </IonSelectOption>
                    ))}
                  </IonSelect>

                  <div className="button-container">
                    <IonButton type="submit" className="button-save">Guardar</IonButton>
                    <IonButton type="button" className="button-cancel">Cancelar</IonButton>
                  </div>
                </form>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Registro de Usuario'}
          message={alertMessage}
          buttons={['Aceptar']}
        />
      </IonContent>
    </IonPage>
  );
};

export default RegistrarUsuario;
