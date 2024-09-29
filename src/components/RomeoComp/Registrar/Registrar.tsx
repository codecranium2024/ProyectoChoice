import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonLabel, IonToolbar, IonTitle, IonList, IonItem } from '@ionic/react';
import { IonButton } from '@ionic/react';
import './Registrar.css'
// Define los componentes para cada subcategoría

const RegistrarMunicipios: React.FC = () => (
  <IonList>
    <IonItem></IonItem>
    {/* Agrega más elementos según sea necesario */}
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Departamento</th>
          <th>Municipio</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
      <tr>
          <td>1</td>
          <td>Alta Verapaz</td>
          <td>Chisec</td>

          <td>
          <IonButton color="warning">Editar</IonButton>
          </td>
        </tr>
      </table>

  </IonList>
);

const RegistrarComunidad: React.FC = () => (
  <IonList>
    <IonList>
    <IonItem></IonItem>
    {/* Agrega más elementos según sea necesario */}
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Municipio</th>
          <th>Habitantes</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
      <tr>
          <td>1</td>
          <td>Chisec</td>
          <td>100</td>

          <td>
          <IonButton color="warning">Editar</IonButton>
          </td>
        </tr>
      </table>

  </IonList>
  </IonList>
);

const RegistrarProyectos: React.FC = () => (
  <IonList>
  <IonItem>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Habitantes</th>
          <th>Técnico</th>
          <th>Municipio</th>
          <th>Etapa</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {/* Agrega aquí los datos de tus proyectos */}
        <tr>
          <td>1</td>
          <td>Proyecto Salud</td>
          <td>100</td>
          <td>Juan Pérez</td>
          <td>Municipio X</td>
          <td>En Progreso</td>
          <td>
          <IonButton color="warning">Editar</IonButton>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Proyecto Capacitacion</td>
          <td>200</td>
          <td>Ana García</td>
          <td>Municipio Y</td>
          <td>Finalizado</td>
          <td>
          {/* <IonButton color="danger">Eliminar</IonButton> */}
          <IonButton color="warning">Editar</IonButton>
          </td>
        </tr>

        <tr>
          <td>3</td>
          <td>Proyecto B</td>
          <td>200</td>
          <td>Ana García</td>
          <td>Municipio Y</td>
          <td>Finalizado</td>
          <td>
          <IonButton color="warning">Editar</IonButton>
          </td>
        </tr>

        <tr>
          <td>4</td>
          <td>Proyecto Capacitacion</td>
          <td>200</td>
          <td>Ana García</td>
          <td>Municipio Y</td>
          <td>Finalizado</td>
          <td>
          <IonButton color="warning">Editar</IonButton>
          </td>
        </tr>

        <tr>
          <td>5</td>
          <td>Proyecto B</td>
          <td>200</td>
          <td>Ana García</td>
          <td>Municipio Y</td>
          <td>Finalizado</td>
          <td>
          <IonButton color="warning">Editar</IonButton>
          </td>
        </tr>

        <tr>
          <td>6</td>
          <td>Proyecto B</td>
          <td>200</td>
          <td>Ana García</td>
          <td>Municipio Y</td>
          <td>Finalizado</td>
          <td>
          <IonButton color="warning">Editar</IonButton>
          </td>
        </tr>
        {/* Agrega más filas según sea necesario */}
      </tbody>
    </table>
  </IonItem>
</IonList>
);

const Registrar: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('Municipios');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
        <IonSegment value={selectedSegment} onIonChange={(e: { detail: { value: string; }; }) => setSelectedSegment(e.detail.value as string)}>
          <IonSegmentButton value="Proyectos">
            <IonLabel>Proyectos</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton value="Municipios">
            <IonLabel>Municipios</IonLabel>
          </IonSegmentButton>

          {/* <IonSegmentButton value="Comunidad">
            <IonLabel>Comunidad</IonLabel>
          </IonSegmentButton>
           */}
        </IonSegment>
      </IonHeader>
      <IonContent>
        {selectedSegment === 'Proyectos' && <RegistrarProyectos />}
        {selectedSegment === 'Municipios' && <RegistrarMunicipios />}
        {/* {selectedSegment === 'Comunidad' && <RegistrarComunidad />} */}
      </IonContent>
    </IonPage>
  );
};

export default Registrar;
