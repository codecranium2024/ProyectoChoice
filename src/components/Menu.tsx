import React, { useState } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import {
  chevronDownOutline, chevronDownSharp, peopleCircleOutline, peopleCircleSharp,
  appsOutline, appsSharp, statsChartOutline, statsChartSharp, peopleOutline, peopleSharp,
  documentOutline, documentSharp, settingsOutline, settingsSharp, albumsOutline, albumsSharp,
  addOutline, addSharp,
  locateOutline,
  locateSharp
} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import './Menu.css';
import { Logo } from './MarcoComp/Logo';

interface AppPage {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  subPages?: { title: string; url: string }[];
}

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
    title: 'Reportes',
    url: '/folder/Reportes',
    iosIcon: statsChartOutline,
    mdIcon: statsChartSharp,
    subPages: [
      { title: 'Visualizar', url: '' },
      { title: 'C', url: '/Com' },
      { title: 'subtest3', url: '' },
      { title: 'Mapa', url: '' },
    ]
  },
  {
    title: 'Comunidades',
    url: '/Comunidades',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
    subPages: [
      { title: 'Comunidades', url: '/Comunidad' },
      { title: 'Listado General', url: '/ListadoGeneral' },
      { title: 'Agregar', url: '/AgregarComunidades' },
      { title: 'Registrar', url: '/Registrar' },
      { title: 'Mapa', url: '' },
    ]
  },
  {
    title: 'Proyectos',
    url: '/folder/Proyectos',
    iosIcon: documentOutline,
    mdIcon: documentSharp,
    subPages: [
      { title: 'Registrar Proyecto', url: '/RegistrarProyecto' },
      { title: 'Visualizar', url: '/Visualizar' },
      { title: 'Comunidades', url: '/Comunidad' },
      { title: 'Mapa', url: '' },
    ]
  },
  { title: 'Regiones'
    , url: '/Regiones',
    iosIcon: locateOutline,
    mdIcon: locateSharp,
    subPages:[
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

interface HideSubMenu {
  [key: string]: boolean;
}

const Menu: React.FC = () => {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [subMenu, setSubMenu] = useState<HideSubMenu>({});

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <br />
        <IonList id="inbox-list">
          <Logo />

          {/* Mapeo del menú principal y submenús */}
          {appPages.map((appPage, index) => (
            <div key={index}>
              <IonMenuToggle autoHide={false}>
                <IonItem
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
                      <IonItem
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
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
