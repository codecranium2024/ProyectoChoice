import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonButton, IonIcon } from '@ionic/react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importa useParams
import './InformacionComunitaria.css';
import { home, people, person } from 'ionicons/icons';

// Componente para mostrar la tabla de proyectos técnicos
const VerComunidad: React.FC<{ nombreComunidad: string }> = ({ nombreComunidad }) => {
  const [proyectos, setProyectos] = useState([]);

  // Función para obtener los datos de los proyectos
  const fetchProyectos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/informacioncomunidades?comunidad=${nombreComunidad}`); // Modifica la URL para incluir el nombre de la comunidad
      setProyectos(response.data);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  };

  useEffect(() => {
    fetchProyectos(); // Llama a la función al montar el componente
  }, [nombreComunidad]);

  return (
    <IonList>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Proyecto</th>
            <th>Técnico</th>
            <th>Municipio</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{proyecto.NombreProyecto}</td>
              <td>{proyecto.NombreUsuario}</td>
              <td>{proyecto.NombreMunicipio}</td>
              <td>{proyecto.EstadoProyecto}</td>
              <td>
                <IonButton color="secondary">Acción</IonButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </IonList>
  );
};

const InformacionComunitaria: React.FC = () => {
  const { nombreComunidad } = useParams<{ nombreComunidad: string }>(); // Extrae el parámetro de la URL

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Información de la Comunidad: {nombreComunidad}</IonTitle> {/* Muestra el nombre de la comunidad */}
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

          <div className="info-container">
            <h2>Guatemala, Alta Verapaz</h2>
            <h3>Comunidad: {nombreComunidad}</h3>
            <div className="icons-container">
              <div className="icon-item">
                <IonIcon icon={person} style={{ fontSize: '30px' }} />
                <p>Habitantes</p>
                <h4>100</h4> {/* Puedes obtener esta información de la API también */}
              </div>
              <div className="icon-item">
                <IonIcon icon={people} style={{ fontSize: '30px' }} />
                <p>Familias</p>
                <h4>1200</h4> {/* Igual que arriba */}
              </div>
              <div className="icon-item">
                <IonIcon icon={home} style={{ fontSize: '30px' }} />
                <p>Casas</p>
                <h4>900</h4> {/* Igual que arriba */}
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de proyectos técnicos debajo */}
        <VerComunidad nombreComunidad={nombreComunidad} />
      </IonContent>
    </IonPage>
  );
};

export default InformacionComunitaria;
