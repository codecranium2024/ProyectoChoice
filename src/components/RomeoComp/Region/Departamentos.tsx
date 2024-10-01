import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem, IonButton, IonModal, IonInput, IonLabel, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
// import './Departamentos.css';
import '../Comunidad/ListadoGeneral.css'
const departamentosIniciales = [
  { id: 1, departamento: 'Alta Verapaz', municipio: 'Chisec' },
  { id: 2, departamento: 'Baja Verapaz', municipio: 'Salamá' },
  { id: 3, departamento: 'Quiché', municipio: 'Santa Cruz' },
];

const RegistrarDepartamentos: React.FC<{ onEdit: (id: number) => void, departamentos: any[] }> = ({ onEdit, departamentos }) => (
  <IonList>
    <table className="table">
      <thead>
        <tr>
          <th>ID Departamento</th>
          <th>Departamento</th>
          <th>Municipio</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {departamentos.map((dep: any) => (
          <tr key={dep.id}>
            <td>{dep.id}</td>
            <td>{dep.departamento}</td>
            <td>{dep.municipio}</td>
            <td>
              <IonButton color="warning" onClick={() => onEdit(dep.id)}>Editar</IonButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </IonList>
);

const Departamentos: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterMunicipioModalOpen, setIsRegisterMunicipioModalOpen] = useState(false);
  const [isDeleteMunicipioModalOpen, setIsDeleteMunicipioModalOpen] = useState(false);

  const [departamentos, setDepartamentos] = useState(departamentosIniciales);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [municipio, setMunicipio] = useState('');
  const [editDept, setEditDept] = useState<{ id: number, departamento: string, municipio: string } | null>(null);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openRegisterMunicipioModal = () => {
    setIsRegisterMunicipioModalOpen(true);
  };

  const openDeleteMunicipioModal = () => {
    setIsDeleteMunicipioModalOpen(true);
  };

  const openEditModal = (id: number) => {
    const deptToEdit = departamentos.find(d => d.id === id);
    setEditDept(deptToEdit || null);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setIsRegisterMunicipioModalOpen(false);
    setIsDeleteMunicipioModalOpen(false);
    setSelectedDept(null);
    setMunicipio('');
    setEditDept(null);
  };

  const handleEditDept = () => {
    if (editDept) {
      const updatedDepartamentos = departamentos.map(departamento => {
        if (departamento.id === editDept.id) {
          return { ...departamento, departamento: editDept.departamento, municipio };
        }
        return departamento;
      });
      setDepartamentos(updatedDepartamentos);
      closeModal();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Departamentos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonButton expand="block" size="default" fill="solid" onClick={openRegisterModal}>Registrar Departamento</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" size="default" fill="solid" color="danger" onClick={openDeleteModal}>Eliminar Departamento</IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton expand="block" size="default" fill="solid" onClick={openRegisterMunicipioModal}>Registrar Municipio</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" size="default" fill="solid" color="danger" onClick={openDeleteMunicipioModal}>Eliminar Municipio</IonButton>
          </IonCol>
        </IonRow>

        <RegistrarDepartamentos onEdit={openEditModal} departamentos={departamentos} />

        {/* Modal para registrar departamento */}
        <IonModal isOpen={isRegisterModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Registrar Departamento</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre del Departamento</IonLabel>
                  <IonInput type="text" placeholder="Nombre del departamento"></IonInput>
                </IonItem>
                {/* <IonItem>
                  <IonLabel position="stacked">Municipio</IonLabel>
                  <IonInput type="text" placeholder="Nombre del municipio"></IonInput>
                </IonItem> */}
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

        {/* Modal para eliminar departamento */}
        <IonModal isOpen={isDeleteModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Eliminar Departamento</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Seleccionar Departamento</IonLabel>
                <IonSelect
                  value={selectedDept}
                  placeholder="Seleccionar Departamento"
                  onIonChange={e => setSelectedDept(e.detail.value)}
                >
                  {departamentos.map(departamento => (
                    <IonSelectOption key={departamento.id} value={departamento.departamento}>
                      {departamento.departamento}
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

        {/* Modal para registrar municipio */}
        <IonModal isOpen={isRegisterMunicipioModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Registrar Municipio</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre del Municipio</IonLabel>
                  <IonInput type="text" placeholder="Nombre del municipio"></IonInput>
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

        {/* Modal para eliminar municipio */}
        <IonModal isOpen={isDeleteMunicipioModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Eliminar Municipio</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Seleccionar Municipio</IonLabel>
                <IonSelect
                  value={municipio}
                  placeholder="Seleccionar Municipio"
                  onIonChange={e => setMunicipio(e.detail.value)}
                >
                  {departamentos.map(departamento => (
                    <IonSelectOption key={departamento.id} value={departamento.municipio}>
                      {departamento.municipio}
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

        {/* Modal para editar departamento */}
        <IonModal isOpen={isEditModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Departamento</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre del Departamento</IonLabel>
                  <IonInput
                    type="text"
                    value={editDept?.departamento || ''}
                    placeholder="Nombre del departamento"
                    onIonChange={e => setEditDept({ ...editDept!, departamento: e.detail.value! })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Municipio</IonLabel>
                  <IonSelect
                    value={municipio}
                    placeholder="Seleccionar Municipio"
                    onIonChange={e => setMunicipio(e.detail.value)}
                  >
                    <IonSelectOption value="Chisec">Chisec</IonSelectOption>
                    <IonSelectOption value="Salamá">Salamá</IonSelectOption>
                    <IonSelectOption value="Santa Cruz">Santa Cruz</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleEditDept}>Guardar Cambios</IonButton>
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

export default Departamentos;
