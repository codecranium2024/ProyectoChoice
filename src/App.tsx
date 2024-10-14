import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './components/WilfredoComp/Login';
import ListadoGeneral from './components/RomeoComp/Comunidad/ListadoGeneral';
import Panel from './components/RomeoComp/Panel/Panel';
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
  const [userRole, setUserRole] = useState('');

  const handleLoginSuccess = (name: string, role: string) => {
    setIsAuthenticated(true);
    setUserName(name);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setUserRole('');
  };

  return (
    <IonApp>
      <IonReactRouter>
        {!isAuthenticated ? (
          <IonRouterOutlet>
            <Route path="/" exact>
              <Login onLoginSuccess={handleLoginSuccess} />
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
              <Route path="/panel" exact={true}>
                <Panel />
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
                <RegistrarProyecto/>
              </Route>
              <Route path="/Mapa" exact={true}>
              <Mapa />
              </Route>
              <Route path="/Historial" exact={true}>
              <Historial />
              </Route>
              <Route path="/Reporte" exact={true}>
                <Reporte/>
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;