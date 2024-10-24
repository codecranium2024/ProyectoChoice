import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButton,
  IonSpinner,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Historial.css';

interface Proyecto {
  idRegistrarProyecto: number;
  Categoria: string;
  Nombreclatura: string;
  Nombre: string;
  Responsable: string;
  FechaInicio: string;
  Estado: string;
  FechaFinalizacion: string;
}

const Historial: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  // Formateo de la fecha
  const formatFecha = (fecha: string) => {
    return fecha.split('T')[0]; // Se queda solo con la parte 'YYYY-MM-DD'
  };

  // Obtener los proyectos finalizados
  const fetchProyectos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/historial');
      setProyectos(response.data); // Guardar todos los proyectos finalizados directamente
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
      setError('Error al obtener los proyectos. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProyectos(); // Ejecuta la función cuando el componente se monta
  }, []);

  // Manejo de redirección para ver la información de un proyecto
  const handleViewInfo = (proyecto: Proyecto) => {
    history.push(`/proyecto/${proyecto.idRegistrarProyecto}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de Proyectos Finalizados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <IonSpinner name="crescent" />
            <p>Cargando proyectos...</p>
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
                  <th>Categoría</th>
                  <th>Nomenclatura</th>
                  <th>Nombre</th>
                  <th>Responsable</th>
                  <th>Estado</th>
                  <th style={{ width: '150px' }}>Fecha Inicio</th>
                  <th>Fecha Finalización</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proyectos
                  .filter((proyecto) => proyecto.Estado.toLowerCase() === 'finalizado') // Filtrando solo los finalizados
                  .map((proyecto) => (
                    <tr key={proyecto.idRegistrarProyecto}>
                      <td>{proyecto.Categoria}</td>
                      <td>{proyecto.Nombreclatura}</td>
                      <td>{proyecto.Nombre}</td>
                      <td>{proyecto.Responsable}</td>
                      <td>{proyecto.Estado}</td>
                      <td style={{ width: '150px' }}>{formatFecha(proyecto.FechaInicio)}</td>
                      <td>{formatFecha(proyecto.FechaFinalizacion)}</td>
                      <td>
                        <IonButton color="primary" size="small" onClick={() => handleViewInfo(proyecto)}>
                          Ver
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

export default Historial;
