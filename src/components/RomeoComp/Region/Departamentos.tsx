import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonButton,
  IonModal,
  IonInput,
  IonLabel,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import axios from 'axios';
import './Departamento.css';

// Definir las interfaces
interface Municipio {
  id: number;
  nombremunicipio: string;
  departamento_id: number;
}

interface Departamento {
  id: number;
  nombredepartamento: string;
  municipios: Municipio[];
}

const RegistrarDepartamentos: React.FC<{ onEdit: (id: number) => void; departamentos: Departamento[] }> = ({ onEdit, departamentos }) => (
  <IonList>
    <table className="table">
      <thead>
        <tr>
          <th>Departamento</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {departamentos.map((dep: Departamento) => (
          <tr key={dep.id}>
            <td>{dep.nombredepartamento}</td>
            <td>
              <IonButton color="warning" onClick={() => onEdit(dep.id)}>Editar</IonButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </IonList>
);

const RegistrarMunicipios: React.FC<{ municipios: Municipio[]; onEdit: (id: number) => void }> = ({ municipios, onEdit }) => (
  <IonList>
    <table className="table">
      <thead>
        <tr>
          <th>Municipio</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {municipios.map((mun: Municipio) => (
          <tr key={mun.id}>
            <td>{mun.nombremunicipio}</td>
            <td>
              <IonButton color="warning" onClick={() => onEdit(mun.id)}>Editar</IonButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </IonList>
);

const Departamentos: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterMunicipioModalOpen, setIsRegisterMunicipioModalOpen] = useState(false);
  const [isEditMunicipioModalOpen, setIsEditMunicipioModalOpen] = useState(false);

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [editDept, setEditDept] = useState<{ id: number; nombredepartamento: string } | null>(null);
  const [editMunicipio, setEditMunicipio] = useState<{ id: number; nombremunicipio: string; departamento_id: number } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const departamentosResponse = await axios.get<Departamento[]>('http://localhost:3000/departamentos');
      const municipiosResponse = await axios.get<Municipio[]>('http://localhost:3000/municipios');
      setDepartamentos(departamentosResponse.data);
      setMunicipios(municipiosResponse.data);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsEditModalOpen(false);
    setIsRegisterMunicipioModalOpen(false);
    setIsEditMunicipioModalOpen(false);
    setSelectedDept(null);
    setEditDept(null);
    setEditMunicipio(null);
  };

  const handleRegisterDept = async () => {
    const nombreDepartamento = (document.getElementById('nombreDepartamento') as HTMLInputElement).value;
    if (nombreDepartamento) {
      try {
        await axios.post('http://localhost:3000/departamentos', { nombredepartamento: nombreDepartamento });
        closeModal();
        fetchData();  // Refrescar los datos después de la acción
      } catch (error) {
        // console.error('Error registrando departamento:', error);
      }
    }
  };

  const handleRegisterMunicipio = async () => {
    const nombreMunicipio = (document.getElementById('nombreMunicipio') as HTMLInputElement).value;
    if (nombreMunicipio && selectedDept) {
      try {
        await axios.post('http://localhost:3000/municipios', { nombremunicipio: nombreMunicipio, departamento_id: selectedDept });
        closeModal();
        fetchData();  // Refrescar los datos después de la acción
      } catch (error) {
        // console.error('Error registrando municipio:', error);
      }
    }
  };

  const openEditModal = (id: number) => {
    const deptToEdit = departamentos.find(d => d.id === id);
    if (deptToEdit) {
      setEditDept({ id: deptToEdit.id, nombredepartamento: deptToEdit.nombredepartamento });
    }
    setIsEditModalOpen(true);
  };

  const handleEditDept = async () => {
    if (editDept) {
      try {
        await axios.put(`http://localhost:3000/departamentos/${editDept.id}`, { nombredepartamento: editDept.nombredepartamento });
        closeModal();
        fetchData();  // Refrescar los datos después de la acción
      } catch (error) {
        // console.error('Error editando departamento:', error);
      }
    }
  };

  const openEditMunicipioModal = (id: number) => {
    const municipioToEdit = municipios.find(m => m.id === id);
    if (municipioToEdit) {
      setEditMunicipio({ 
        id: municipioToEdit.id, 
        nombremunicipio: municipioToEdit.nombremunicipio, 
        departamento_id: municipioToEdit.departamento_id });
    }
    setIsEditMunicipioModalOpen(true);
  };

  const handleEditMunicipio = async () => {
    if (editMunicipio) {
      try {
        await axios.put(`http://localhost:3000/municipios/${editMunicipio.id}`, { 
          nombremunicipio: editMunicipio.nombremunicipio,
          departamento_id: editMunicipio.departamento_id
        });
        closeModal();
        fetchData();  // Refrescar los datos después de la acción
      } catch (error) {
        // console.error('Error editando municipio:', error);
      }
    }else{
      
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Departamentos y Municipios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol>
            <IonButton expand="block" onClick={() => setIsRegisterModalOpen(true)}>Registrar Departamento</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" onClick={() => setIsRegisterMunicipioModalOpen(true)}>Registrar Municipio</IonButton>
          </IonCol>
        </IonRow>

        {/* Tabla de Departamentos */}
        <RegistrarDepartamentos onEdit={openEditModal} departamentos={departamentos} />

        {/* Tabla de Municipios */}
        <IonTitle style={{ marginTop: '20px' }}>Municipios</IonTitle>
        <RegistrarMunicipios municipios={municipios} onEdit={openEditMunicipioModal} />

        {/* Modal para registrar departamento */}
        <IonModal isOpen={isRegisterModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Registrar Departamento</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel>Nombre del Departamento</IonLabel>
                <IonInput id="nombreDepartamento" type="text" />
              </IonItem>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleRegisterDept}>Guardar</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="medium" onClick={closeModal}>Cancelar</IonButton>
                </IonCol>
              </IonRow>
            </IonList>
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
            <IonList>
              <IonItem>
                <IonLabel>Nombre del Municipio</IonLabel>
                <IonInput id="nombreMunicipio" type="text" />
              </IonItem>
              <IonItem>
                <IonLabel>Departamento</IonLabel>
                <IonSelect onIonChange={e => setSelectedDept(parseInt(e.detail.value))}>
                  {departamentos.map(dept => (
                    <IonSelectOption key={dept.id} value={dept.id}>
                      {dept.nombredepartamento}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleRegisterMunicipio}>Guardar</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="medium" onClick={closeModal}>Cancelar</IonButton>
                </IonCol>
              </IonRow>
            </IonList>
          </IonContent>
        </IonModal>

        {/* Modal para editar departamento */}
        {editDept && (
          <IonModal isOpen={isEditModalOpen} onDidDismiss={closeModal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Editar Departamento</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItem>
                  <IonLabel>Nombre del Departamento</IonLabel>
                  <IonInput value={editDept.nombredepartamento} onIonChange={e => setEditDept({ ...editDept, nombredepartamento: e.detail.value! })} />
                </IonItem>
                <IonRow>
                  <IonCol>
                    <IonButton expand="block" onClick={handleEditDept}>Guardar</IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton expand="block" color="medium" onClick={closeModal}>Cancelar</IonButton>
                  </IonCol>
                </IonRow>
              </IonList>
            </IonContent>
          </IonModal>
        )}

        {/* Modal para editar municipio */}
        {editMunicipio && (
          <IonModal isOpen={isEditMunicipioModalOpen} onDidDismiss={closeModal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Editar Municipio</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItem>
                  <IonLabel>Nombre del Municipio</IonLabel>
                  <IonInput value={editMunicipio.nombremunicipio} onIonChange={e => setEditMunicipio({ ...editMunicipio, nombremunicipio: e.detail.value! })} />
                </IonItem>
                <IonItem>
                  <IonLabel>Departamento</IonLabel>
                  <IonSelect value={editMunicipio.departamento_id} onIonChange={e => setEditMunicipio({ ...editMunicipio, departamento_id: parseInt(e.detail.value) })}>
                    {departamentos.map(dept => (
                      <IonSelectOption key={dept.id} value={dept.id}>
                        {dept.nombredepartamento}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonRow>
                  <IonCol>
                    <IonButton expand="block" onClick={handleEditMunicipio}>Guardar</IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton expand="block" color="medium" onClick={closeModal}>Cancelar</IonButton>
                  </IonCol>
                </IonRow>
              </IonList>
            </IonContent>
          </IonModal>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Departamentos;
