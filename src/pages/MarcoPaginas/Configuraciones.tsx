import react from 'react'
import {IonPage, IonIcon, IonButton, IonList, IonItem, IonLabel, IonToggle} from "@ionic/react";
import {moon} from 'ionicons/icons';
import './../../components/MarcoComp/style.css';
import './../../theme/variables.css';

export const Configuraciones = () => {
    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
    };
  return (
    <IonPage>
        <div className='PanelPrincipal'>
            <h1 className='TituloPagina'>Configuraciones</h1>
            <div className='PanelSecundario'> 
                <h2 className='TituloN2'>Interfaz</h2>
                <IonList className="ion-margin-top">
              <IonItem>
                <IonIcon slot="start" icon={moon} />
                <IonLabel>Activar modo oscuro</IonLabel>
                <IonToggle
                  slot="end"
                  name="darkMode"
                  onIonChange={toggleDarkModeHandler}
                  />
              </IonItem>
            </IonList>
            </div>
        </div>
    </IonPage>
  )
}
