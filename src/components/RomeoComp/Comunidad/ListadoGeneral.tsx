import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem, IonButton, IonModal, IonInput, IonLabel, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import './ListadoGeneral.css';

// Define un tipo para las comunidades
interface Comunidad {
  id: number;
  nombrecomunidad: string; // Asegúrate de que este nombre coincide con el que usas en el resto del código
  municipio_id: string | null; // ID del municipio
  municipio?: string; // Esto es opcional para el nombre del municipio
}

const ListadoGeneral: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [comunidades, setComunidades] = useState<Comunidad[]>([]);
  const [municipios, setMunicipios] = useState<any[]>([]);
  const [selectedComunidad, setSelectedComunidad] = useState<number | null>(null);
  const [nombreComunidad, setNombreComunidad] = useState('');
  const [municipioId, setMunicipioId] = useState<string | null>(null);
  const [editComunidad, setEditComunidad] = useState<Comunidad | null>(null);

  // Función para obtener las comunidades desde el servidor
  // const fetchComunidades = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/listadocomunidades');
  //     const data = await response.json();
  //     setComunidades(data);
  //   } catch (error) {
  //     console.error('Error al obtener las comunidades:', error);
  //   }
  // };

  const fetchComunidades = async () => {
  try {
    const response = await fetch('http://localhost:3000/listadocomunidades');
    const data = await response.json();

    // Para cada comunidad, busca el municipio correspondiente
    const comunidadesConMunicipio = data.map((comunidad: Comunidad) => {
      const municipio = municipios.find(m => m.id === comunidad.municipio_id);
      return { ...comunidad, municipio: municipio ? municipio.nombremunicipio : '' };
    });

    setComunidades(comunidadesConMunicipio);
  } catch (error) {
    console.error('Error al obtener las comunidades:', error);
  }
};


  // Función para obtener los municipios desde el servidor
  const fetchMunicipios = async () => {
    try {
      const response = await fetch('http://localhost:3000/municipios');
      const data = await response.json();
      setMunicipios(data);
    } catch (error) {
      console.error('Error al obtener los municipios:', error);
    }
  };

  useEffect(() => {
    fetchComunidades();
    fetchMunicipios();  // Cargamos los municipios al iniciar
  }, []);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (id: number) => {
    const comunidadToEdit = comunidades.find(c => c.id === id);
    setEditComunidad(comunidadToEdit || null);
    setMunicipioId(comunidadToEdit?.municipio_id || null);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedComunidad(null);
    setNombreComunidad('');
    setMunicipioId(null);
    setEditComunidad(null);
  };

  const handleRegisterComunidad = async () => {
    const newComunidad: Omit<Comunidad, 'id'> = {
      nombrecomunidad: nombreComunidad,
      municipio_id: municipioId,
    };

    try {
      const response = await fetch('http://localhost:3000/listadocomunidad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComunidad),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la comunidad');
      }

      const result = await response.json();
      const municipio = municipios.find(m => m.id === municipioId);
      setComunidades([...comunidades, { id: result.id, ...newComunidad, municipio: municipio ? municipio.nombremunicipio : '' }]);
      closeModal();
    } catch (error) {
      console.error('Error al registrar la comunidad:', error);
    }
  };

  const handleDeleteComunidad = async () => {
    if (selectedComunidad) {
      try {
        const response = await fetch(`http://localhost:3000/listadocomunidad/${selectedComunidad}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la comunidad');
        }

        const updatedComunidades = comunidades.filter(comunidad => comunidad.id !== selectedComunidad);
        setComunidades(updatedComunidades);
        closeModal();
      } catch (error) {
        console.error('Error al eliminar la comunidad:', error);
      }
    }
  };

  const handleEditComunidad = async () => {
    if (editComunidad) {
      const updatedComunidad: Comunidad = {
        ...editComunidad,
        nombrecomunidad: editComunidad.nombrecomunidad,
        municipio_id: municipioId,
      };

      try {
        const response = await fetch(`http://localhost:3000/listadocomunidad/${editComunidad.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedComunidad),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar la comunidad');
        }

        const municipio = municipios.find(m => m.id === municipioId);
        const updatedComunidades = comunidades.map(comunidad => {
          if (comunidad.id === editComunidad.id) {
            return { ...comunidad, ...updatedComunidad, municipio: municipio ? municipio.nombremunicipio : '' };
          }
          return comunidad;
        });

        setComunidades(updatedComunidades);
        closeModal();
      } catch (error) {
        console.error('Error al editar la comunidad:', error);
      }
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

        <IonList>
          <table className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Comunidades</th>
                {/* <th>Municipio</th> */}
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {comunidades.map((comunidad: Comunidad) => (
                <tr key={comunidad.id}>
                  {/* <td>{comunidad.id}</td> */}
                  <td>{comunidad.nombrecomunidad}</td>
                  {/* <td>{comunidad.municipio}</td> */}
                  <td>
                    <IonButton color="warning" onClick={() => openEditModal(comunidad.id)}>Editar</IonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </IonList>

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
                  <IonInput 
                    type="text" 
                    placeholder="Nombre de la comunidad" 
                    value={nombreComunidad}
                    onIonChange={e => setNombreComunidad(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Municipio</IonLabel>
                  <IonSelect
                    value={municipioId || ''}
                    placeholder="Seleccionar Municipio"
                    onIonChange={e => setMunicipioId(e.detail.value)}
                  >
                    {municipios.map(m => (
                      <IonSelectOption key={m.id} value={m.id}>
                        {m.nombremunicipio}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleRegisterComunidad}>Guardar</IonButton>
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
                <IonLabel>Seleccionar Comunidad</IonLabel>
                <IonSelect
                  value={selectedComunidad}
                  placeholder="Seleccionar Comunidad"
                  onIonChange={e => setSelectedComunidad(e.detail.value)}
                >
                  {comunidades.map(comunidad => (
                    <IonSelectOption key={comunidad.id} value={comunidad.id}>
                      {comunidad.nombrecomunidad}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
            <IonRow>
              <IonCol>
                <IonButton expand="block" color="danger" onClick={handleDeleteComunidad}>Eliminar</IonButton>
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
                    placeholder="Nombre de la comunidad" 
                    value={editComunidad?.nombrecomunidad}
                    onIonChange={e => setNombreComunidad(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Municipio</IonLabel>
                  <IonSelect
                    value={municipioId || ''}
                    placeholder="Seleccionar Municipio"
                    onIonChange={e => setMunicipioId(e.detail.value)}
                  >
                    {municipios.map(m => (
                      <IonSelectOption key={m.id} value={m.id}>
                        {m.nombremunicipio}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonList>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleEditComunidad}>Actualizar</IonButton>
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
