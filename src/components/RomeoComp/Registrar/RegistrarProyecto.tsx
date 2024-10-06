import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem, IonButton, IonModal, IonInput, IonLabel, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import './RegistrarP.css';

const proyectosIniciales = [
  { id: 1, nombre: 'Proyecto A', responsable: 'Juan Pérez', estado: 'En Ejecucion' },
  { id: 2, nombre: 'Proyecto B', responsable: 'Ana Gómez', estado: 'Finalizado' },
  { id: 3, nombre: 'Proyecto C', responsable: 'Luis Martínez', estado: 'Sin Aprobar' },
];

const RegistrarListadoProyectos: React.FC<{ onEdit: (id: number) => void, onDelete: (id: number) => void, proyectos: any[] }> = ({ onEdit, onDelete, proyectos }) => (
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
              <IonButton color="warning" onClick={() => onEdit(proyecto.id)}>Editar</IonButton>
              <IonButton color="danger" onClick={() => onDelete(proyecto.id)}>Eliminar</IonButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </IonList>
);

const RegistrarProyecto: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [proyectos, setProyectos] = useState(proyectosIniciales);
  const [estado, setEstado] = useState('');
  const [nombre, setNombre] = useState('');
  const [responsable, setResponsable] = useState('');
  const [editProyecto, setEditProyecto] = useState<{ id: number, nombre: string, responsable: string, estado: string } | null>(null);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const openEditModal = (id: number) => {
    const proyectoToEdit = proyectos.find(p => p.id === id);
    setEditProyecto(proyectoToEdit || null);
    setEstado(proyectoToEdit?.estado || '');
    setNombre(proyectoToEdit?.nombre || '');
    setResponsable(proyectoToEdit?.responsable || '');
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsEditModalOpen(false);
    setEstado('');
    setNombre('');
    setResponsable('');
    setEditProyecto(null);
  };

  const handleAddProyecto = () => {
    if (nombre && responsable && estado) {
      const newProyecto = {
        id: proyectos.length + 1,
        nombre,
        responsable,
        estado,
      };
      setProyectos([...proyectos, newProyecto]);
      closeModal();
    }
  };

  const handleEditProyecto = () => {
    if (editProyecto) {
      const updatedProyectos = proyectos.map(proyecto =>
        proyecto.id === editProyecto.id ? { ...editProyecto, nombre, responsable, estado } : proyecto
      );
      setProyectos(updatedProyectos);
      closeModal();
    }
  };

  const handleDeleteProyecto = (id: number) => {
    setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de Proyectos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonButton size="default" shape="round" onClick={openRegisterModal}>Registrar Proyecto</IonButton>
          </IonCol>
        </IonRow>

        <RegistrarListadoProyectos onEdit={openEditModal} onDelete={handleDeleteProyecto} proyectos={proyectos} />

        {/* Modal para registrar proyecto */}
        <IonModal isOpen={isRegisterModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Registrar Proyecto</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre del Proyecto</IonLabel>
                  <IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} placeholder="Nombre del proyecto"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Responsable</IonLabel>
                  <IonInput value={responsable} onIonChange={e => setResponsable(e.detail.value!)} placeholder="Nombre del responsable"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Estado</IonLabel>
                  <IonSelect value={estado} placeholder="Seleccionar Estado" onIonChange={e => setEstado(e.detail.value)}>
                    <IonSelectOption value="Sin Aprobar">Sin Aprobar</IonSelectOption>
                    <IonSelectOption value="En Ejecucion">En Ejecucion</IonSelectOption>
                    <IonSelectOption value="Finalizado">Finalizado</IonSelectOption>
                    <IonSelectOption value="Aprobado">Aprobado</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleAddProyecto}>Guardar</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="medium" onClick={closeModal}>Cancelar</IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonContent>
        </IonModal>

        {/* Modal para editar proyecto */}
        <IonModal isOpen={isEditModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Proyecto</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre del Proyecto</IonLabel>
                  <IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} placeholder="Nombre del proyecto" />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Responsable</IonLabel>
                  <IonInput value={responsable} onIonChange={e => setResponsable(e.detail.value!)} placeholder="Nombre del responsable" />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Estado</IonLabel>
                  <IonSelect value={estado} placeholder="Seleccionar Estado" onIonChange={e => setEstado(e.detail.value)}>
                    <IonSelectOption value="Sin Aprobar">Sin Aprobar</IonSelectOption>
                    <IonSelectOption value="En Ejecucion">En Ejecucion</IonSelectOption>
                    <IonSelectOption value="Finalizado">Finalizado</IonSelectOption>
                    <IonSelectOption value="Aprobado">Aprobado</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleEditProyecto}>Guardar Cambios</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="medium" onClick={closeModal}>Cancelar</IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default RegistrarProyecto;
