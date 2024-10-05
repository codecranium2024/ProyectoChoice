const App: React.FC = () => {
  // Estado para manejar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función que se llamará cuando el login sea exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Establecer el estado como autenticado
  };

  return (
    <IonApp>
      <IonReactRouter>
        {!isAuthenticated ? (
          // Mostrar solo el login si no está autenticado
          <IonRouterOutlet>
            <Route path="/" exact>
              <Login onLoginSuccess={handleLoginSuccess} /> {/* Pasar la función como prop */}
            </Route>
            <Redirect to="/" />
          </IonRouterOutlet>
        ) : (
          // Mostrar el menú y rutas de la aplicación cuando el usuario está autenticado
          <IonSplitPane contentId="main">
            <Menu />
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
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;