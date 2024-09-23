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
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { appsOutline, appsSharp, statsChartOutline, statsChartSharp, peopleOutline, peopleSharp, documentOutline, documentSharp, settingsOutline, settingsSharp} from 'ionicons/icons';
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
    url: '/folder/Panel',
    iosIcon: appsOutline,
    mdIcon: appsSharp
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
    url: '/Comunidad',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
    subPages: [
      { title: 'Comunidades', url: '/Comunidad' },
      { title: 'Listado General', url: '/ListadoGeneral' },
      { title: 'subtest3', url: '' },
      { title: 'Mapa', url: '' },
    ]
  },
  {
    title: 'Proyectos',
    url: '/folder/Proyectos',
    iosIcon: documentOutline,
    mdIcon: documentSharp,
    subPages: [
      { title: 'Visualizar', url: '' },
      { title: 'Comunidades', url: '/Comunidad' },
      { title: 'subtest3', url: '' },
      { title: 'Mapa', url: '' },
    ]
  },
  {
    title: 'Configuraciones',
    url: '/folder/Configuraciones',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
    subPages: [
      { title: 'Visualizar', url: '' },
      { title: 'Comun', url: '/Coidad' },
      { title: 'subtest3', url: '' },
      { title: 'Mapa', url: '' },
    ]
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  // Estado para controlar el submenú abierto
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // Función para alternar el submenú
  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <br />
        <IonNote>choice2024@hotmail.com</IonNote>
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
                  onClick={appPage.subPages ? () => toggleSubMenu(appPage.title) : undefined} // Manejador para alternar submenú
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
