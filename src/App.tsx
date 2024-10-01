import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

import Registrar from './components/RomeoComp/Registrar/Registrar';
import ListadoGeneral from './components/RomeoComp/Comunidad/ListadoGeneral';
import Visualizar from './components/RomeoComp/Proyecto/Visualizar';
import Panel from './components/RomeoComp/Panel/Panel';
import Comunidad from './components/RomeoComp/Comunidad/Comunidad1';
import VisualizarComunidades from './pages/MarcoPaginas/AgregarComunidad';
import { Configuraciones } from './pages/MarcoPaginas/Configuraciones';
import Departamentos from './components/RomeoComp/Region/Departamentos'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark Mode Styles (Optional) */
import '@ionic/react/css/palettes/dark.class.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/Panel" />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/listadogeneral" exact={true}>
              <ListadoGeneral />
            </Route>
            <Route path="/Visualizar" exact={true}>
              <Visualizar />
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
            <Route path="/Registrar" exact={true}>
              <Registrar />
            </Route>
            <Route path="/Departamentos" exact={true}>
              <Departamentos />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
