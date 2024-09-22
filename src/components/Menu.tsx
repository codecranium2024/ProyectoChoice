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
  IonItemGroup,
  IonItemDivider,
  IonRouterLink
} from '@ionic/react';
import { useState } from 'react';
import { chevronDownOutline, chevronDownSharp, peopleCircleOutline, peopleCircleSharp } from 'ionicons/icons';
import { Route, useLocation } from 'react-router-dom';
import { appsOutline, appsSharp, statsChartOutline, statsChartSharp, peopleOutline, peopleSharp, documentOutline, documentSharp, settingsOutline, settingsSharp, albumsOutline, albumsSharp, addOutline, addSharp} from 'ionicons/icons';
import './Menu.css';
import { Logo } from './MarcoComp/Logo';
/*
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
    url: './../pages/MarcoPaginas/VisualizarComunidad',
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
  const [subMenu, setSubMenu] = useState<HideSubMenu>({} as HideSubMenu);
*/
interface HideSubMenu {
  [key: string]: boolean;
}

const Menu: React.FC = () => {
  const [subMenu, setSubMenu] = useState<HideSubMenu>({});

  function toggleSubMenu(sport: string) {
    setSubMenu((value) => {
      return { ...value, [sport]: !value[sport] };
    });
  }

  {/*-- Menu lateral --*/}
  return (
    <IonMenu menuId="find-events-menu" side="start" contentId="main-content">
      {/*-- Encabezado del menu lateral --*/}
      <IonHeader>
          <Logo/>
      </IonHeader>
      <IonContent className="ion-no-padding">
        {/*-- Estructura de las pestañas principales y las secundarias --*/}
        <IonItemGroup>
          {/*-- Pestaña principal --*/}
          <IonItemDivider onClick={() => toggleSubMenu('Panel')}>
            {/*-- Icono lado izquierdo --*/}
            <IonIcon slot="start" ios={appsOutline} md={appsSharp} />
            {/*-- Icono lado --*/}
            <IonIcon slot="end" color="medium" ios={chevronDownOutline} md={chevronDownSharp} />
            {/*-- Texto de la pestaña principal --*/}
            <IonLabel>Panel</IonLabel>
          </IonItemDivider>
          {/*-- Pestañas secundarias --*/}
          <IonMenuToggle hidden={subMenu['Panel']} autoHide={false}>
            <IonItem lines="full" detail={true}>
              <IonIcon slot="start" ios={peopleCircleOutline} md={peopleCircleSharp} />
              <IonLabel>Pick-ups</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonItemGroup>

        {/*-- Reportes --*/}
        <IonItemGroup>
          {/*-- Pestaña principal --*/}
          <IonItemDivider onClick={() => toggleSubMenu('Reportes')}>
            {/*-- Icono lado izquierdo --*/}
            <IonIcon slot="start" ios={statsChartOutline} md={statsChartSharp} />
            {/*-- Icono lado --*/}
            <IonIcon slot="end" color="medium" ios={chevronDownOutline} md={chevronDownSharp} />
            {/*-- Texto de la pestaña principal --*/}
            <IonLabel>Reportes</IonLabel>
          </IonItemDivider>
          {/*-- Pestañas secundarias --*/}
          <IonMenuToggle hidden={subMenu['Reportes']} autoHide={false}>
            <IonItem lines="full" detail={true}>
              <IonIcon slot="start" ios={peopleCircleOutline} md={peopleCircleSharp} />
              <IonLabel>Sub1</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonItemGroup>

        {/*-- Comunidades --*/}
        <IonItemGroup>
          {/*-- Pestaña principal --*/}
          <IonItemDivider onClick={() => toggleSubMenu('Comunidades')}>
            {/*-- Icono lado izquierdo --*/}
            <IonIcon slot="start" ios={peopleOutline} md={peopleSharp} />
            {/*-- Icono lado --*/}
            <IonIcon slot="end" color="medium" ios={chevronDownOutline} md={chevronDownSharp} />
            {/*-- Texto de la pestaña principal --*/}
            <IonLabel>Comunidades</IonLabel>
          </IonItemDivider>
          {/*-- Pestañas secundarias --*/}
          <IonMenuToggle hidden={subMenu['Comunidades']} autoHide={false}>
            <IonItem lines="full" detail={true}>
              <IonIcon slot="start" ios={albumsOutline} md={albumsSharp} />
              <IonLabel>Visualizar</IonLabel>
            </IonItem>
            <IonItem lines="full" detail={true}>
              <IonIcon slot="start" ios={addOutline} md={addSharp} />
              <IonLabel>Agregar</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonItemGroup>

        {/*-- Proyectos --*/}
        <IonItemGroup>
          {/*-- Pestaña principal --*/}
          <IonItemDivider onClick={() => toggleSubMenu('Proyectos')}>
            {/*-- Icono lado izquierdo --*/}
            <IonIcon slot="start" ios={documentOutline} md={documentSharp} />
            {/*-- Icono lado --*/}
            <IonIcon slot="end" color="medium" ios={chevronDownOutline} md={chevronDownSharp} />
            {/*-- Texto de la pestaña principal --*/}
            <IonLabel>Proyectos</IonLabel>
          </IonItemDivider>
          {/*-- Pestañas secundarias --*/}
          <IonMenuToggle hidden={subMenu['Proyectos']} autoHide={false}>
            <IonItem lines="full" detail={true}>
              <IonIcon slot="start" ios={peopleOutline} md={peopleSharp} />
              <IonLabel>Sub1</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonItemGroup>


        {/*-- Configuraciones --*/}
        <IonItemGroup>
          {/*-- Pestaña principal --*/}
          <IonItemDivider onClick={() => toggleSubMenu('Configuraciones')}>
            {/*-- Icono lado izquierdo --*/}
            <IonIcon slot="start" ios={settingsOutline} md={settingsSharp} />
            {/*-- Icono lado --*/}
            <IonIcon slot="end" color="medium" ios={chevronDownOutline} md={chevronDownSharp} />
            {/*-- Texto de la pestaña principal --*/}
            <IonLabel>Configuraciones</IonLabel>
          </IonItemDivider>
          {/*-- Pestañas secundarias --*/}
          <IonMenuToggle hidden={subMenu['Configuraciones']} autoHide={false}>
            <IonItem lines="full" detail={true}>
              <IonIcon slot="start" ios={peopleCircleOutline} md={peopleCircleSharp} />
              <IonLabel>Sub1</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonItemGroup>

      </IonContent>
    </IonMenu>
  );
};
export default Menu;
