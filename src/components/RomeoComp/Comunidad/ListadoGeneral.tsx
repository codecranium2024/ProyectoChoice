import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem, IonButton, IonModal, IonInput, IonLabel, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import './ListadoGeneral.css';

const comunidadesIniciales = [
  { id: 1, nombre: 'Cubiquitz', habitantes: 100, municipio: 'Chisec' },
  { id: 2, nombre: 'San Juan', habitantes: 200, municipio: 'Coban' },
  { id: 3, nombre: 'Rock a Tzack', habitantes: 300, municipio: 'Coban' },
];

const RegistrarListadoGeneral: React.FC<{ onEdit: (id: number) => void, comunidades: any[] }> = ({ onEdit, comunidades }) => (
  <IonList>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Comunidades</th>
          <th>Habitantes</th>
          <th>Municipio</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {comunidades.map((comunidad: any) => (
          <tr key={comunidad.id}>
            <td>{comunidad.id}</td>
            <td>{comunidad.nombre}</td>
            <td>{comunidad.habitantes}</td>
            <td>{comunidad.municipio}</td>
            <td>
              <IonButton color="warning" onClick={() => onEdit(comunidad.id)}>Editar</IonButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </IonList>
);

const ListadoGeneral: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [comunidades, setComunidades] = useState(comunidadesIniciales);
  const [selectedComunidad, setSelectedComunidad] = useState<string | null>(null);
  const [municipio, setMunicipio] = useState('');
  const [editComunidad, setEditComunidad] = useState<{ id: number, nombre: string, habitantes: number, municipio: string } | null>(null);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (id: number) => {
    const comunidadToEdit = comunidades.find(c => c.id === id);
    setEditComunidad(comunidadToEdit || null);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedComunidad(null);
    setMunicipio('');
    setEditComunidad(null);
  };

  const loadMoreComunidades = () => {
    const nuevasComunidades = [
      { id: comunidades.length + 1, nombre: `Nueva Comunidad ${comunidades.length + 1}`, habitantes: 400, municipio: 'Chamelco' },
      { id: comunidades.length + 2, nombre: `Nueva Comunidad ${comunidades.length + 2}`, habitantes: 500, municipio: 'Carcha' }
    ];
    setComunidades([...comunidades, ...nuevasComunidades]);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight) {
      loadMoreComunidades();
    }
  };

  const handleEditComunidad = () => {
    if (editComunidad) {
      const updatedComunidades = comunidades.map(comunidad => {
        if (comunidad.id === editComunidad.id) {
          return { ...comunidad, nombre: editComunidad.nombre, habitantes: editComunidad.habitantes, municipio };
        }
        return comunidad;
      });
      setComunidades(updatedComunidades);
      closeModal();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listado General</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonButton expand="block" size="default" fill="solid" onClick={openRegisterModal}>Registrar Comunidad</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" size="default" fill="solid" color="danger" onClick={openDeleteModal}>Eliminar Comunidad</IonButton>
          </IonCol>
        </IonRow>

        <div className="scrollable-container" onScroll={handleScroll}>
          <RegistrarListadoGeneral onEdit={openEditModal} comunidades={comunidades} />
        </div>

        {/* Modal para registrar comunidad */}
        <IonModal isOpen={isRegisterModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Registrar Comunidad</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre de la Comunidad</IonLabel>
                  <IonInput type="text" placeholder="Nombre de la comunidad"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Número de Habitantes</IonLabel>
                  <IonInput type="number" placeholder="Número de habitantes"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Municipio</IonLabel>
                  <IonSelect
                    value={municipio}
                    placeholder="Seleccionar Municipio"
                    onIonChange={e => setMunicipio(e.detail.value)}
                  >
                    <IonSelectOption value="coban">Coban</IonSelectOption>
                    <IonSelectOption value="chamelco">Chamelco</IonSelectOption>
                    <IonSelectOption value="carcha">Carcha</IonSelectOption>
                    <IonSelectOption value="chisec">Chisec</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={closeModal}>Guardar</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="medium" onClick={closeModal}>Cancelar</IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonContent>
        </IonModal>

        {/* Modal para eliminar comunidad con selección */}
        <IonModal isOpen={isDeleteModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Eliminar Comunidad</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Seleccionar Comunidad</IonLabel>
                <IonSelect
                  value={selectedComunidad}
                  placeholder="Seleccionar Comunidad"
                  onIonChange={e => setSelectedComunidad(e.detail.value)}
                >
                  {comunidades.map(comunidad => (
                    <IonSelectOption key={comunidad.id} value={comunidad.nombre}>
                      {comunidad.nombre}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
            <IonRow>
              <IonCol>
                <IonButton expand="block" color="danger" onClick={closeModal}>Eliminar</IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" color="medium" onClick={closeModal}>Cancelar</IonButton>
              </IonCol>
            </IonRow>
          </IonContent>
        </IonModal>

        {/* Modal para editar comunidad */}
        <IonModal isOpen={isEditModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Comunidad</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre de la Comunidad</IonLabel>
                  <IonInput
                    type="text"
                    value={editComunidad?.nombre || ''}
                    placeholder="Nombre de la comunidad"
                    onIonChange={e => setEditComunidad({ ...editComunidad!, nombre: e.detail.value! })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Número de Habitantes</IonLabel>
                  <IonInput
                    type="number"
                    value={editComunidad?.habitantes || ''}
                    placeholder="Número de habitantes"
                    onIonChange={e => setEditComunidad({ ...editComunidad!, habitantes: Number(e.detail.value!) })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Municipio</IonLabel>
                  <IonSelect
                    value={municipio}
                    placeholder="Seleccionar Municipio"
                    onIonChange={e => setMunicipio(e.detail.value)}
                  >
                    <IonSelectOption value="coban">Coban</IonSelectOption>
                    <IonSelectOption value="chamelco">Chamelco</IonSelectOption>
                    <IonSelectOption value="carcha">Carcha</IonSelectOption>
                    <IonSelectOption value="chisec">Chisec</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleEditComunidad}>Guardar Cambios</IonButton>
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

export default ListadoGeneral;
