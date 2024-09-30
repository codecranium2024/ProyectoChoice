import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem, IonButton, IonModal, IonInput, IonLabel, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import './ListadoGeneral.css';

const RegistrarListadoGeneral: React.FC<{ onEdit: (id: number) => void }> = ({ onEdit }) => (
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
        <tr>
          <td>1</td>
          <td>Cubiquitz</td>
          <td>100</td>
          <td>Chisec</td>
          <td>
            <IonButton color="warning" onClick={() => onEdit(1)}>Editar</IonButton>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>San Juan</td>
          <td>200</td>
          <td>Coban</td>
          <td>
            <IonButton color="medium" onClick={() => onEdit(2)}>Editar</IonButton>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Rock a Tzack</td>
          <td>300</td>
          <td>Coban</td>
          <td>
            <IonButton color="secondary" onClick={() => onEdit(3)}>Editar</IonButton>
          </td>
        </tr>
      </tbody>
    </table>
  </IonList>
);

const ListadoGeneral: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [municipio, setMunicipio] = useState('');

  const openModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setMunicipio(''); // Resetea el estado del municipio al cerrar el modal
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listado General</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RegistrarListadoGeneral onEdit={openModal} />

        {/* Modal para editar, registrar o eliminar */}
        <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedId ? 'Editar Comunidad' : 'Registrar Comunidad'}</IonTitle>
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
                  <IonButton expand="block" color="danger" onClick={closeModal}>Eliminar</IonButton>
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
