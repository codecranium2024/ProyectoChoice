//supuestemante deberia de arreglarse
import React, { useState } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonButton
} from '@ionic/react';
import {
  peopleCircleOutline,
  appsOutline, appsSharp, statsChartOutline, statsChartSharp, peopleOutline, peopleSharp,
  documentOutline, documentSharp, settingsOutline, settingsSharp, locateOutline, locateSharp, logOut,
  peopleOutline as usersOutline, peopleSharp as usersSharp
} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import './Menu.css';
import { Logo } from './MarcoComp/Logo';

// Props del componente para manejar la información del usuario y la función de logout
interface MenuProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

interface AppPage {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  subPages?: { title: string; url: string }[];
}

// Configuración de páginas para el menú, con "Roles y Especialidades" combinados en un solo submenú
const appPages: AppPage[] = [
  {
    title: 'Panel',
    url: '/Panel',
    iosIcon: appsOutline,
    mdIcon: appsSharp,
    subPages: [
      { title: 'Panel', url: 'Panel' },
    ]
  },
  {
    title: 'Proyectos',
    url: '/Proyectos',
    iosIcon: documentOutline,
    mdIcon: documentSharp,
    subPages: [
      { title: 'Registrar Proyecto', url: '/RegistrarProyecto' },
      // { title: 'Informacion Comunitaria', url: '/InformacionComunitaria' },
      { title: 'Historial Proyectos', url: '/Historial' },
      { title: 'Mapa', url: '/Mapa' },
    ]
  },
  {
    title: 'Comunidades',
    url: '/Comunidades',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
    subPages: [
      { title: 'Comunidades', url: '/Comunidad' },
      // { title: 'Listado General', url: '/ListadoGeneral' },
      { title: 'Agregar', url: '/AgregarComunidades' },
    ]
  },
  {
    title: 'Reporte',
    url: '/Reportes por cada componete',
    iosIcon: statsChartOutline,
    mdIcon: statsChartSharp,
    subPages: [
      { title: 'Reportes', url: '/Reporte' },
    ]
  },
  {
    title: 'Usuarios',
    url: '/Usuarios',
    iosIcon: usersOutline,
    mdIcon: usersSharp,
    subPages: [
      { title: 'Administrar Usuarios', url: '/AdministrarUsuarios' },
      { title: 'Roles y Especialidades', url: '/roles-especialidades' }, // URL corregida
    ]
  },
  {
    title: 'Regiones',
    url: '/Regiones',
    iosIcon: locateOutline,
    mdIcon: locateSharp,
    subPages: [
      { title: 'Departamentos', url: '/Departamentos' },
    ]
  },
  {
    title: 'Configuraciones',
    url: '/Configuraciones',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
];

const Menu: React.FC<MenuProps> = ({ userName, userRole, onLogout }) => {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <br />
        <IonList id="inbox-list">
          {/* Logo del menú */}
          <Logo />

          {/* Mapeo del menú principal y submenús */}
          {appPages.map((appPage, index) => (
            <div key={index}>
              <IonMenuToggle autoHide={false}>
                <IonItem style={{background: 'var(--ion-background-color)'}}
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  onClick={appPage.subPages ? () => toggleSubMenu(appPage.title) : undefined}
                >
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>

              {/* Verifica si la página tiene subpáginas y si su submenú debe mostrarse */}
              {appPage.subPages && openSubMenu === appPage.title && (
                <IonList className="subpage-list">
                  {appPage.subPages.map((subPage, subIndex) => (
                    <IonMenuToggle key={subIndex} autoHide={false}>
                      <IonItem style={{background: 'var(--ion-background-secondary)'}}
                        className={location.pathname === subPage.url ? 'selected' : ''}
                        routerLink={subPage.url}
                        routerDirection="none"
                        lines="none"
                        detail={false}
                      >
                        <IonLabel className="subpage-label">{subPage.title}</IonLabel>
                      </IonItem>
                    </IonMenuToggle>
                  ))}
                </IonList>
              )}
            </div>
          ))}
        </IonList>

        {/* Información del usuario y  se agrega el botón de cerrar sesión */}
        <IonList >
          <IonItem lines="none" style={{background: 'var(--ion-background-color)'}}>
            <IonIcon slot="start" icon={peopleCircleOutline} />
            <IonLabel>
              <h3>{userName}</h3>
              <p>{userRole}</p>
            </IonLabel>
          </IonItem>
          <IonButton expand="block" fill="clear" color="danger" onClick={onLogout}>
            <IonIcon slot="start" icon={logOut} />
            Cerrar Sesión
          </IonButton>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;