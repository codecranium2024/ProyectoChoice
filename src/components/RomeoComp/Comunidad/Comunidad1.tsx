import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonAlert,
  IonButton, // Importa IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Importa useHistory
import axios from 'axios';
import './Comunidad1.css';

interface Comunidad {
  nombre_comunidad: string;
  presidente_cocode: string;
  numero_personas: number;
  nombre_municipio: string;
  nombre_usuario: string;
}

const Comunidad1: React.FC = () => {
  const [comunidades, setComunidades] = useState<Comunidad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory(); // Inicializa useHistory

  useEffect(() => {
    const fetchComunidades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tecnicocomunidad'); // Asegúrate de que la URL sea correcta
        setComunidades(response.data);
      } catch (error) {
        console.error('Error al obtener las comunidades:', error);
        setError('Error al obtener las comunidades. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchComunidades();
  }, []);

  // Función para manejar la navegación
  const handleViewInfo = (nombreComunidad: string) => {
    // history.push(`/InformacionComunitaria/${nombreComunidad}`);
     history.push(`/InformacionComunitaria`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Comunidades</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <IonSpinner name="crescent" />
            <p>Cargando comunidades...</p>
          </div>
        ) : error ? (
          <IonAlert
            isOpen={true}
            onDidDismiss={() => setError(null)}
            header={'Error'}
            message={error}
            buttons={['Aceptar']}
          />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Comunidad</th>
                  <th>Líder comunitario</th>
                  <th>Habitantes</th>
                  <th>Municipio</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {comunidades.map((comunidad, index) => (
                  <tr key={index}>
                    <td>{comunidad.nombre_comunidad}</td>
                    <td>{comunidad.presidente_cocode}</td>
                    <td>{comunidad.numero_personas}</td>
                    <td>{comunidad.nombre_municipio}</td>
                    <td>
                      <IonButton color="primary" onClick={() => handleViewInfo(comunidad.nombre_comunidad)}>
                        Ver más
                      </IonButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Comunidad1;
