import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Historial.css';

const proyectosIniciales = [
  { id: 1, nombre: 'Proyecto A', responsable: 'Juan Pérez', estado: 'Finalizado' },
  { id: 2, nombre: 'Proyecto B', responsable: 'Ana Gómez', estado: 'Finalizado' },
  { id: 3, nombre: 'Proyecto C', responsable: 'Luis Martínez', estado: 'Finalizado' },
];

const ListadoProyectos: React.FC<{ proyectos: any[] }> = ({ proyectos }) => {
  const history = useHistory();

  const handleVerInformacion = (id: number) => {
    history.push(`/registrar-proyecto?id=${id}`);
  };

  return (
    <IonList>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Proyecto</th>
            <th>Responsable</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto: any) => (
            <tr key={proyecto.id}>
              <td>{proyecto.id}</td>
              <td>{proyecto.nombre}</td>
              <td>{proyecto.responsable}</td>
              <td>{proyecto.estado}</td>
              <td>
                <IonButton color="primary" size="small" onClick={() => handleVerInformacion(proyecto.id)}>
                  Ver Información
                </IonButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </IonList>
  );
};

const Historial: React.FC = () => {
  const [proyectos, setProyectos] = useState(proyectosIniciales.filter(p => p.estado === 'Finalizado'));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Historial de Proyectos Finalizados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ListadoProyectos proyectos={proyectos} />
      </IonContent>
    </IonPage>
  );
};

export default Historial;
