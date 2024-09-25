import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem } from '@ionic/react';
import { IonButton } from '@ionic/react';
import './ListadoGeneral.css'

const RegistrarListadoGeneral: React.FC = () => (
  <IonList>
    <IonList>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Comunidades</th>
            <th>Habitantes</th>
            <th>Municipio</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cubiquitz</td>
            <td>100</td>
            <td>Chisec</td>  
            <td>
              <IonButton color="warning">Editar</IonButton>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>San Juan</td>
            <td>200</td>   
            <td>Coban</td>
            <td>
              <IonButton color="medium">Editar</IonButton>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>rock a tzack</td>
            <td>300</td>
            <td>Coban</td>
            <td>
              <IonButton color="secondary">Editar</IonButton>
            </td>
          </tr>
        </tbody>
      </table>
    </IonList>
  </IonList>
);

const ListadoGeneral: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listado General</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RegistrarListadoGeneral />
      </IonContent>
    </IonPage>
  );
};

export default ListadoGeneral;
