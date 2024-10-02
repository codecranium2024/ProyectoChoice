import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem, IonButton, IonModal, IonInput, IonLabel, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import './Registrar.css';

const RegistrarProyectos: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    { id: 1, nombre: 'Proyecto Salud', habitantes: 100, tecnico: 'Juan Pérez', municipio: 'Municipio X', etapa: 'En Progreso' },
    { id: 2, nombre: 'Proyecto Capacitación', habitantes: 200, tecnico: 'Ana García', municipio: 'Municipio Y', etapa: 'Finalizado' },
    // otros proyectos...
  ];

  const municipios = ['Municipio X', 'Municipio Y', 'Municipio Z'];
  const etapas = ['En Progreso', 'Finalizado', 'Planificación'];

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleSave = () => {
    console.log('Proyecto guardado:', selectedProject);
    setModalOpen(false);
  };

  return (
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
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.nombre}</td>
                <td>{project.habitantes}</td>
                <td>{project.tecnico}</td>
                <td>{project.municipio}</td>
                <td>{project.etapa}</td>
                <td>
                  <IonButton color="warning" onClick={() => handleEdit(project)}>Editar</IonButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </IonItem>

      {/* Modal para editar el proyecto */}
      <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar Proyecto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedProject && (
            <form>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput value={selectedProject.nombre} onIonChange={e => setSelectedProject({ ...selectedProject, nombre: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Habitantes</IonLabel>
                <IonInput type="number" value={selectedProject.habitantes} onIonChange={e => setSelectedProject({ ...selectedProject, habitantes: Number(e.detail.value!) })} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Técnico</IonLabel>
                <IonInput value={selectedProject.tecnico} onIonChange={e => setSelectedProject({ ...selectedProject, tecnico: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Municipio</IonLabel>
                <IonSelect value={selectedProject.municipio} onIonChange={e => setSelectedProject({ ...selectedProject, municipio: e.detail.value })}>
                  {municipios.map((municipio, index) => (
                    <IonSelectOption key={index} value={municipio}>{municipio}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Etapa</IonLabel>
                <IonSelect value={selectedProject.etapa} onIonChange={e => setSelectedProject({ ...selectedProject, etapa: e.detail.value })}>
                  {etapas.map((etapa, index) => (
                    <IonSelectOption key={index} value={etapa}>{etapa}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              {/* Fila con los botones "Guardar Cambios" y "Cerrar" */}
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleSave}>Guardar Cambios</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="medium" onClick={() => setModalOpen(false)}>Cerrar</IonButton>
                </IonCol>
              </IonRow>
            </form>
          )}
        </IonContent>
      </IonModal>
    </IonList>
  );
};

const Registrar: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('Municipios');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Proyectos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {selectedSegment === 'Proyectos' && <RegistrarProyectos />}
      </IonContent>
    </IonPage>
  );
};

export default Registrar;
