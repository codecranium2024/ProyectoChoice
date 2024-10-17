import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonList,
  IonButton,
  IonModal,
  IonInput,
  IonLabel,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonItem,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Historial.css';

interface Proyecto {
  id: number;
  Categoria: string;
  nombreclatura: string;
  nombre: string;
  responsable: string;
  fechainicio: string;
  estado: string;
  fechaFinal: string;
}

const proyectosIniciales: Proyecto[] = [
  { id: 1, Categoria: 'Salud', nombreclatura: 'SC', nombre: 'Proyecto A', responsable: 'Juan Pérez', fechainicio: '2024-01-01', estado: 'Finalizado', fechaFinal: '2024-06-30' },
  { id: 2, Categoria: 'Economía', nombreclatura: 'EC', nombre: 'Proyecto B', responsable: 'Ana Gómez', fechainicio: '2024-02-15', estado: 'Finalizado', fechaFinal: '2024-08-15' },
  { id: 3, Categoria: 'Educación', nombreclatura: 'ED', nombre: 'Proyecto C', responsable: 'Luis Martínez', fechainicio: '2024-03-01', estado: 'Finalizado', fechaFinal: '2024-09-01' },
];

const Historial: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>(proyectosIniciales);
  const history = useHistory();

  const handleViewInfo = (proyecto: Proyecto) => {
    // Aquí puedes dirigir al usuario a un nuevo formulario o página con la información del proyecto
    history.push(`/proyecto/${proyecto.id}`); // Ajusta la ruta según tu aplicación
  };

  const formatFecha = (fecha: string) => {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  };

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
                <th>ID</th>
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
                <tr key={proyecto.id}>
                  <td>{proyecto.id}</td>
                  <td>{proyecto.Categoria}</td>
                  <td>{proyecto.nombreclatura}</td>
                  <td>{proyecto.nombre}</td>
                  <td>{proyecto.responsable}</td>
                  <td>{proyecto.estado}</td>
                  <td>{formatFecha(proyecto.fechainicio)}</td>
                  <td>{formatFecha(proyecto.fechaFinal)}</td>
                  <td>
                    <IonButton color="primary" size="small" onClick={() => handleViewInfo(proyecto)}>
                      Información Completa
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
