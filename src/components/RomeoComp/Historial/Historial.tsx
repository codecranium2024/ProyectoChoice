import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButton,
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
  const history = useHistory();

  const handleViewInfo = (proyecto: Proyecto) => {
    // Redirige al usuario a un nuevo formulario o página con la información del proyecto
    history.push(`/proyecto/${proyecto.idRegistrarProyecto}`); // Ajusta la ruta según tu aplicación
  };

  // Función para obtener solo la parte de la fecha en formato YYYY/MM/DD
  const formatFecha = (fecha: string) => {
    return fecha.split('T')[0]; // Obtiene la parte de la fecha antes de la 'T'
  };

  // Obtener proyectos desde la API
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/historial'); // Ajusta la URL según sea necesario
        setProyectos(response.data);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    };

    fetchProyectos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de Proyectos Finalizados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Tabla de Proyectos con Scroll Horizontal */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Categoría</th>
                <th>Nomenclatura</th>
                <th>Nombre</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Finalización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.idRegistrarProyecto}>
                  {/* <td>{proyecto.idRegistrarProyecto}</td> */}
                  <td>{proyecto.Categoria}</td>
                  <td>{proyecto.Nombreclatura}</td>
                  <td>{proyecto.Nombre}</td>
                  <td>{proyecto.Responsable}</td>
                  <td>{proyecto.Estado}</td>
                  <td>{formatFecha(proyecto.FechaInicio)}</td>
                  <td>{formatFecha(proyecto.FechaFinalizacion)}</td>
                  <td>
                    <IonButton color="primary" size="small" onClick={() => handleViewInfo(proyecto)}>
                      Ver Datos
                    </IonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Historial;
