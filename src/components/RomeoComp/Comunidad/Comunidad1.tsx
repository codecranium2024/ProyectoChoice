// import React, { useState } from 'react';
import React from 'react';
import { IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonLabel, IonToolbar, IonTitle, IonList, IonItem } from '@ionic/react';
import { IonButton } from '@ionic/react';
import './Comunidad1.css'

const RegistrarComunidad: React.FC = ()=>(
    <IonList>
    <IonList>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre Tecnico</th>
          <th>Habitantes</th>
          <th>Lider</th>
          <th>Municipio</th>
          <th>Aldea</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
      <tr>
          <td>1</td>
          <td>Martin Choc</td>
          <td>100</td>
          <td>juan matalbatz</td>
          <td>Chisec</td>
          <td>Cubiquitz</td>
          <td>
          <IonButton color="warning" >Sin Aprobar</IonButton>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Martin Choc</td>
          <td>100</td>
          <td>juan matalbatz</td>
          <td>Chisec</td>
          <td>Cubiquitz</td>
          <td>
          <IonButton color="medium">Sin Asignar</IonButton>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Martin Choc</td>
          <td>100</td>
          <td>juan matalbatz</td>
          <td>Chisec</td>
          <td>Cubiquitz</td>
          <td>
          <IonButton color="secondary">En Ejecucion</IonButton>
          </td>
        </tr>
      </table>

  </IonList>
  </IonList>

);

const Comunidad: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
           <IonTitle>Comunidad</IonTitle>
          </IonToolbar> 
        </IonHeader>
        <IonContent>
          <RegistrarComunidad></RegistrarComunidad>
        </IonContent>
      </IonPage>
    );
  };

export default Comunidad;