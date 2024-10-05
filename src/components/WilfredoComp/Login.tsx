import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

// Asegúrate de recibir la prop `onLoginSuccess`
const Login: React.FC<{ onLoginSuccess: (name: string, role: string) => void }> = ({ onLoginSuccess }) => {
  const history = useHistory();
  const [usuario, setUsuario] = useState(''); // Estado para el usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); // Mensaje de la alerta

  // Función para manejar el envío del formulario de login
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Evitar recargar la página
    
    console.log('Usuario:', usuario);
    console.log('Contraseña:', password);
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, password }),
        credentials: 'include',
      });
  
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Si la respuesta no es JSON
        data = await response.text();
        console.error('Respuesta no es JSON:', data);
        setAlertMessage('Respuesta del servidor no válida');
        setShowAlert(true);
        return;
      }
  
      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        onLoginSuccess(data.usuario, data.rol); // Llamar a la función de autenticación exitosa con nombre y rol
        history.push('/panel'); // Redirige al panel si el login es exitoso
      } else {
        console.error('Error al iniciar sesión:', data.message);
        setAlertMessage(data.message);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setAlertMessage('Error al conectar con el servidor');
      setShowAlert(true);
    }
  };
  
  

  // Función para manejar el evento de "¿Olvidaste tu contraseña?"
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
            <IonCol size="12" size-md="6" className="left-side">
              <div className="welcome-text">
                <img
                  src="/src/img/logo_text.png"
                  alt="Choice Humanitarian"
                  className="welcome-image"
                />
                <h1>Bienvenidos.</h1>
              </div>
            </IonCol>

            <IonCol size="12" size-md="6" className="right-side">
              <div className="login-form">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin} autoComplete="off">
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
                  <IonButton expand="block" color="danger" className="login-button" type="submit">
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
