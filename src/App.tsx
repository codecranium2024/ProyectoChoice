import React, { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './components/WilfredoComp/Login';
import ListadoGeneral from './components/RomeoComp/Comunidad/ListadoGeneral';
import Comunidad from './components/RomeoComp/Comunidad/Comunidad1';
import VisualizarComunidades from './pages/MarcoPaginas/AgregarComunidad';
import { Configuraciones } from './pages/MarcoPaginas/Configuraciones';
import Departamentos from './components/RomeoComp/Region/Departamentos';
import InformacionComunitaria from './components/RomeoComp/Proyecto/InformacionComunitaria';
import RegistrarProyecto from './components/RomeoComp/Registrar/RegistrarProyecto';
import Mapa from './components/RomeoComp/Mapa/Mapa';
import AdministrarUsuarios from './components/WilfredoComp/AdministrarUsuarios';
import AdministrarRE from './components/WilfredoComp/AdministrarRE';
import Historial from './components/RomeoComp/Historial/Historial';
import Reporte from './components/RomeoComp/Reportes/Reporte';
import bcrypt from 'bcryptjs';

/* Importaciones CSS de Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');

  // Verificar si hay credenciales almacenadas al cargar la aplicación
  useEffect(() => {
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      const { username, password, role } = JSON.parse(storedCredentials);
      setIsAuthenticated(true);
      setUserName(username);
      setUserPassword(password);
      setUserRole(role);
    }
  }, []);

  const handleLoginSuccess = (usuario: string, role: string, hashedPassword: string) => {
    setIsAuthenticated(true);
    setUserName(usuario);  // Almacenar el nombre de usuario (no el nombre completo)
    setUserRole(role);     // Almacenar el rol
  
    // Guardar también la contraseña encriptada en localStorage
    const credentials = { username: usuario, hashedPassword, role };
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    console.log('Credenciales guardadas localmente:', credentials);
  };

  const handleOfflineLogin = (name: string, password: string) => {
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      const { username, hashedPassword } = JSON.parse(storedCredentials);
      
      if (!hashedPassword) {
        console.error("Contraseña almacenada no encontrada");
        return;
      }
  
      // Verificar si el nombre de usuario coincide y la contraseña es correcta
      if (username === name && bcrypt.compareSync(password, hashedPassword)) {
        setIsAuthenticated(true);
        setUserName(username);
        console.log('Inicio de sesión offline exitoso.');
      } else {
        console.log('Error en el inicio de sesión offline.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setUserPassword('');
    setUserRole('');
    // localStorage.removeItem('userCredentials');  // Eliminar esta línea para no borrar las credenciales almacenadas offline
    console.log('Sesión cerrada, pero las credenciales permanecen guardadas para el modo offline');
  };

  return (
    <IonApp>
      <IonReactRouter>
        {!isAuthenticated ? (
          <IonRouterOutlet>
            <Route path="/" exact>
              <Login 
                onLoginSuccess={handleLoginSuccess} 
                onOfflineLogin={handleOfflineLogin}  // Pasar la función para login offline
              />
            </Route>
            <Redirect to="/" />
          </IonRouterOutlet>
        ) : (
          <IonSplitPane contentId="main">
            <Menu userName={userName} userRole={userRole} onLogout={handleLogout} />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/panel" />
              </Route>
              <Route path="/folder/:name" exact={true}>
                <Page />
              </Route>
              <Route path="/listadogeneral" exact={true}>
                <ListadoGeneral />
              </Route>
              <Route path="/InformacionComunitaria" exact={true}>
                <InformacionComunitaria />
              </Route>
              <Route path="/comunidad" exact={true}>
                <Comunidad />
              </Route>
              <Route path="/AgregarComunidades" exact={true}>
                <VisualizarComunidades />
              </Route>
              <Route path="/Configuraciones" exact={true}>
                <Configuraciones />
              </Route>
              <Route path="/Departamentos" exact={true}>
                <Departamentos />
              </Route>
              <Route path="/AdministrarUsuarios" exact={true}>
                <AdministrarUsuarios />
              </Route>
              <Route path="/roles-especialidades" exact={true}>
                <AdministrarRE />
              </Route>
              <Route path="/RegistrarProyecto" exact={true}>
                <RegistrarProyecto />
              </Route>
              <Route path="/Mapa" exact={true}>
                <Mapa />
              </Route>
              <Route path="/Historial" exact={true}>
                <Historial />
              </Route>
              <Route path="/Reporte" exact={true}>
                <Reporte />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
