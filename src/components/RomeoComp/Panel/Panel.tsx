import React from 'react';
import { IonAlert, IonButton, IonIcon } from '@ionic/react';
import { heart, people, hammer, star } from 'ionicons/icons';
import './Panel.css';

function Example() {
  return (
    <>
      {/* Botón Proyecto 1 */}
      <IonButton id="alert-proyecto1">
        Proyecto 1
        <IonIcon slot="end" icon={heart}></IonIcon>
      </IonButton>
      <IonAlert
        trigger="alert-proyecto1"
        header="Proyecto 1 - Info Personal"
        buttons={['OK']}
        inputs={[
          {
            placeholder: 'Name',
          },
          {
            placeholder: 'Nickname (max 8 characters)',
            attributes: {
              maxlength: 8,
            },
          },
          {
            type: 'number',
            placeholder: 'Age',
            min: 1,
            max: 100,
          },
          {
            type: 'textarea',
            placeholder: 'A little about yourself',
          },
        ]}
      ></IonAlert>

      {/* Botón Proyecto 2 */}
      <IonButton id="alert-proyecto2">
        Proyecto 2
        <IonIcon slot="end" icon={people}></IonIcon>
      </IonButton>
      <IonAlert
        trigger="alert-proyecto2"
        header="Proyecto 2 - Detalles de Comunidad"
        buttons={['OK']}
        inputs={[
          {
            placeholder: 'Comunidad',
          },
          {
            placeholder: 'Municipio',
          },
          {
            type: 'number',
            placeholder: 'Habitantes',
            min: 1,
            max: 10000,
          },
        ]}
      ></IonAlert>

      {/* Botón Proyecto 3 */}
      <IonButton id="alert-proyecto3">
        Proyecto 3
        <IonIcon slot="end" icon={hammer}></IonIcon>
      </IonButton>
      <IonAlert
        trigger="alert-proyecto3"
        header="Proyecto 3 - Información Técnica"
        buttons={['OK']}
        inputs={[
          {
            placeholder: 'Nombre del Técnico',
          },
          {
            type: 'textarea',
            placeholder: 'Descripción del Proyecto',
          },
          {
            type: 'date',
            placeholder: 'Fecha de inicio',
          },
        ]}
      ></IonAlert>

      {/* Botón Proyecto 4 */}
      <IonButton id="alert-proyecto4">
        Proyecto 4
        <IonIcon slot="end" icon={star}></IonIcon>
      </IonButton>
      <IonAlert
        trigger="alert-proyecto4"
        header="Proyecto 4 - Estado del Proyecto"
        buttons={['OK']}
        inputs={[
          {
            type: 'radio',
            label: 'En progreso',
            value: 'progreso',
            checked: true,
          },
          {
            type: 'radio',
            label: 'Completado',
            value: 'completado',
          },
          {
            type: 'radio',
            label: 'Pendiente',
            value: 'pendiente',
          },
        ]}
      ></IonAlert>
    </>
  );
}

export default Example;
