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
    mdIcon: statsChartSharp
  },
  {
    title: 'Comunidades',
    url: '/folder/Comunidades',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp
  },
  {
    title: 'Proyectos',
    url: '/folder/Proyectos',
    iosIcon: documentOutline,
    mdIcon: documentSharp
  },
  {
    title: 'Configuraciones',
    url: '/folder/Configuraciones',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <Logo/>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
