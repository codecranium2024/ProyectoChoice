import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [usuario, setUsuario] = useState(''); // Estado para el usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); // Mensaje de la alerta

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Evitar recargar la página
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.text();

      if (response.ok) {
        history.push('/panel'); // Redirige al panel si el login es exitoso
      } else {
        console.error('Error al iniciar sesión:', data); // Log para depuración
        setAlertMessage(data);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error); // Log para depuración
      setAlertMessage('Error al conectar con el servidor');
      setShowAlert(true);
    }
  };

  const handleForgotPassword = (event: React.MouseEvent) => {
    event.preventDefault(); // Evitar comportamiento predeterminado del enlace
    setShowAlert(true);
    setAlertMessage('Por favor comunicarse con un administrador');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <IonGrid className="login-grid">
          <IonRow className="ion-no-padding">
            {/* Sección izquierda con imagen y texto */}
            <IonCol size="12" size-md="6" className="left-side">
              <div className="welcome-text">
                {/* Imagen centrada y ajustada */}
                <img
                  src="/src/img/logo_text.png"
                  alt="Choice Humanitarian"
                  className="welcome-image"
                />
                <h1>Bienvenidos.</h1>
              </div>
            </IonCol>

            {/* Sección derecha con formulario */}
            <IonCol size="12" size-md="6" className="right-side">
              <div className="login-form">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                  <IonInput
                    type="text"
                    placeholder="Usuario"
                    className="login-input"
                    value={usuario}
                    onIonChange={(e) => setUsuario(e.detail.value!)}
                    required
                  />
                  <IonInput
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    required
                  />
                  <IonButton expand="block" color="danger" className="login-button" onClick={(e) => handleLogin(e)}>
                    Iniciar Sesión
                  </IonButton>
                  <div className="login-options">
                    <a href="#" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</a>
                  </div>
                </form>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Alerta para mostrar el mensaje */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Recuperar contraseña'}
          message={alertMessage}
          buttons={['Aceptar']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;