import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonButton, IonList } from '@ionic/react';
import './Visualizar.css';
import casa from '../../../img/casa.png';
import famili from '../../../img/familia.png'
import grupo from '../../../img/grupopersonas.png'

const VerComunidad: React.FC = () => (
  <IonList>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Proyecto</th>
          <th>Tecnico</th>
          <th>Municipio</th>
          <th>Etapa</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Salud</td>
          <td>Eleazar Pec</td>
          <td>Chisec</td>
          <td>Ejecucion</td>
          <td>
            <IonButton color="secondary">Ejecucion</IonButton>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Educacion</td>
          <td>Eleazar Pec</td>
          <td>Chisec</td>
          <td>Ejecucion</td>
          <td>
            <IonButton color="secondary">Ejecucion</IonButton>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Desarrollo Comunitario</td>
          <td>Eleazar Pec</td>
          <td>Chisec</td>
          <td>Ejecucion</td>
          <td>
            <IonButton color="secondary">Ejecucion</IonButton>
          </td>
        </tr>
      </tbody>
    </table>
  </IonList>
);

const Visualizar: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Informacion de las Comunidades</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="content-container">
          <div className="map-container">
            <iframe
              title="Mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12649.639621283484!2d-90.41301576696436!3d15.504676618056024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f60fcbfcb91c001%3A0x70a7bc383d62b66e!2sCoban!5e0!3m2!1sen!2sgt!4v1616183246899!5m2!1sen!2sgt"
              width="100%"
              height="300"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>

          {/* Información y gráficos a la derecha */}
          <div className="info-container">
            <h2>Comunidad San José</h2>
            <h3>Chicoj, Cobán,Alta verapaz</h3>

            <div className="icons-container">
              <div className="icon-item">
                <img src={grupo} alt="grupo personas" />
                <p>Habitantes</p>
                {/* cambiar el h4 por una variable para extraer los datos sql gay el que no lee esto */}
                <h4>100</h4>
              </div>
              <div className="icon-item">
                <img src={famili} alt="familia" />
                <p>Familias</p>
                <h4>1200</h4>
              </div>
              <div className="icon-item">
                <img src={casa} alt="casa" />
                <p>Casas</p>
                <h4>900</h4>
              </div>

            </div>
          </div>
        </div>

        {/* Tabla debajo */}
        <VerComunidad />
      </IonContent>
    </IonPage>
  );
};

export default Visualizar;
