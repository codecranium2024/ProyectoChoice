import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs';  // Asegúrate de instalar bcryptjs
import './Login.css';

// Asegúrate de recibir tres parámetros en onLoginSuccess: nombre de usuario, rol y contraseña encriptada
const Login: React.FC<{ onLoginSuccess: (name: string, role: string, hashedPassword: string) => void, onOfflineLogin: (name: string, password: string) => void }> = ({ onLoginSuccess, onOfflineLogin }) => {
  const history = useHistory();
  const [usuario, setUsuario] = useState(''); // Estado para el usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); // Mensaje de la alerta

  // Función para manejar el envío del formulario de login
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (navigator.onLine) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario, password }),
          credentials: 'include',
        });
    
        const data = await response.json();
    
        if (response.ok && data.success) {
          // Guardar las credenciales en localStorage para usarlas offline
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);
          
          // Verifica si hashedPassword se genera correctamente
          console.log('Contraseña encriptada:', hashedPassword);
  
          localStorage.setItem('userCredentials', JSON.stringify({ 
            username: usuario,  // Guarda el nombre de usuario
            hashedPassword 
          }));
          
          // Verifica si las credenciales se están guardando
          console.log('Credenciales guardadas:', localStorage.getItem('userCredentials'));
          console.log('Usuario ingresado:', usuario);
          
          // Llama a la función de éxito con el nombre de usuario, rol y contraseña encriptada
          onLoginSuccess(usuario, data.rol, hashedPassword);
          history.push('/panel');
        } else {
          setAlertMessage(data.message || 'Error al iniciar sesión');
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage('Error al conectar con el servidor');
        setShowAlert(true);
      }
    } else {
      // Caso de login offline
      handleOfflineLogin(usuario, password);
    }
  };

  // Función para manejar el login offline
  const handleOfflineLogin = (enteredUsername: string, enteredPassword: string) => {
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      const { username, hashedPassword } = JSON.parse(storedCredentials);

      // Verificar si los datos existen y no son undefined
      if (!hashedPassword) {
        console.error("Contraseña almacenada no encontrada");
        setAlertMessage('No se encontró la contraseña almacenada para el modo offline');
        setShowAlert(true);
        return;
      }

      // Verificar si el nombre completo coincide y la contraseña es correcta
      console.log('Usuario almacenado:', username);
      console.log('Usuario ingresado:', enteredUsername);

      if (username === enteredUsername) {
        const passwordMatches = bcrypt.compareSync(enteredPassword, hashedPassword);
        if (passwordMatches) {
          onLoginSuccess(username, 'offline-role', hashedPassword);  // Asignar el rol almacenado o uno básico
          console.log('Inicio de sesión offline exitoso');
          history.push('/panel');
        } else {
          setAlertMessage('Contraseña incorrecta para el modo offline');
          setShowAlert(true);
        }
      } else {
        setAlertMessage('Nombre de usuario incorrecto para el modo offline');
        setShowAlert(true);
      }
    } else {
      setAlertMessage('No hay credenciales almacenadas para el modo offline');
      setShowAlert(true);
    }
  };

  // Función para manejar el evento de "¿Olvidaste tu contraseña?"
  const handleForgotPassword = (event: React.MouseEvent) => {
    event.preventDefault();
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
                <h1 className='titulo'>Bienvenidos</h1>
              </div>
            </IonCol>

            <IonCol size="12" size-md="6" className="right-side">
              <div className="login-form">
                <h2 className="Login">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} autoComplete="off" style={{background: 'var(--ion-background-secondary)', boxShadow: 'none'}}>
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
                  <IonButton color="danger" className="login-button" type="submit">
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
