import React from "react";
import {IonPage,IonHeader,IonTab,IonContent,IonTabBar,IonTabButton,IonTabs,IonToolbar,IonTitle,IonIcon,IonButton} from "@ionic/react";
import './../../components/MarcoComp/style.css';
import { playCircle, radio, library, search } from 'ionicons/icons';
import { useState } from "react";
/* Basic CSS for apps built with Ionic */

function AgregarComunidades() {
    let [Comunidad, setComunidad] = useState('Comunidad')
    return (

        <IonPage className="pg">

            <h1 className='TituloPagina'>Crear comunidad</h1>
            <IonContent>

      <IonTabs className="tabs">
      <IonTab tab="home">
        <div id="home-page">
            <div className="PanelSecundario">
                <h2 className="TituloN2">Información General</h2>
                    <h2 className="TituloN2">Nombre de la comunidad</h2>
                    <input onChange={e =>{setComunidad(e.target.value)}} type="text" className='TextBox'/><br/>
            </div>
        </div>
      </IonTab>
      <IonTab tab="radio">
        <div id="radio-page">
          <IonContent>
            <div className="example-content">Radio content</div>
          </IonContent>
        </div>
      </IonTab>
      <IonTab tab="library">
        <div id="library-page">
          <IonContent>
            <div className="example-content">Library content</div>
          </IonContent>
        </div>
      </IonTab>
      <IonTab tab="search">
        <div id="search-page">
          <IonContent>
            <div className="example-content">Search content</div>
          </IonContent>
        </div>
      </IonTab>

      <IonTabBar slot="top">
        <IonTabButton tab="home">
          <IonIcon icon={playCircle} />
          Listen Now
        </IonTabButton>
        <IonTabButton tab="radio">
          <IonIcon icon={radio} />
          Radio
        </IonTabButton>
        <IonTabButton tab="library">
          <IonIcon icon={library} />
          Library
        </IonTabButton>
        <IonTabButton tab="search">
          <IonIcon icon={search} />
          Search
        </IonTabButton>
      </IonTabBar>
    </IonTabs>    
            </IonContent>
            <IonButton className="BotonGuardar">Guardar</IonButton>
            
    </IonPage>
    );
  }
  export default AgregarComunidades;