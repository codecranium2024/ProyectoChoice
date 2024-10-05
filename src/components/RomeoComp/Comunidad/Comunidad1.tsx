import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonButton, IonModal, IonInput, IonLabel, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import './Comunidad1.css';

const todasLasComunidades = [
  { id: 1, nombreTecnico: 'Martin Choc', comunidad: 'Cubiquitz', lider: 'juan matalbatz', habitantes: 100, municipio: 'Chisec', estado: 'Sin Aprobar' },
  { id: 2, nombreTecnico: 'Martin Choc', comunidad: 'Semococh', lider: 'juan matalbatz', habitantes: 100, municipio: 'Chisec', estado: 'En Ejecucion' },
  { id: 3, nombreTecnico: 'Martin Choc', comunidad: 'Salaquin', lider: 'juan matalbatz', habitantes: 100, municipio: 'Coban', estado: 'Sin Asignar' },
];

// Lista de municipios
const municipios = ['Chisec', 'Coban', 'Raxruhá', 'Fray Bartolomé', 'San Pedro Carchá'];

// Lista de estados
const estados = ['Sin Aprobar', 'En Ejecucion', 'Finalizado', 'Sin Asignar'];

const RegistrarComunidad: React.FC<{ onEdit: (comunidad: any) => void, comunidades: any[], cargarMasDatos: () => void }> = ({ onEdit, comunidades, cargarMasDatos }) => {
  return (
    <IonList>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Técnico</th>
            <th>Comunidad</th>
            <th>Líder</th>
            <th>Habitantes</th>
            <th>Municipio</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {comunidades.map((comunidad) => (
            <tr key={comunidad.id}>
              <td>{comunidad.id}</td>
              <td>{comunidad.nombreTecnico}</td>
              <td>{comunidad.comunidad}</td>
              <td>{comunidad.lider}</td>
              <td>{comunidad.habitantes}</td>
              <td>{comunidad.municipio}</td>
              <td>{comunidad.estado}</td>
              <td>
                <IonButton color="warning" onClick={() => onEdit(comunidad)}>Editar</IonButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Scroll Infinito */}
      <IonInfiniteScroll threshold="100px" onIonInfinite={(e) => cargarMasDatos(e)}>
        <IonInfiniteScrollContent loadingText="Cargando más datos..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonList>
  );
};

const Comunidad: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComunidad, setSelectedComunidad] = useState<any>(null);
  const [comunidades, setComunidades] = useState(todasLasComunidades.slice(0, 5)); // Mostrar las primeras 5 inicialmente
  const [hasMoreData, setHasMoreData] = useState(true);

  const openEditModal = (comunidad: any) => {
    setSelectedComunidad(comunidad);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedComunidad(null);
  };

  const handleSave = () => {
    console.log('Comunidad guardada:', selectedComunidad);
    closeEditModal();
  };

  const cargarMasDatos = (event: any) => {
    setTimeout(() => {
      const nuevasComunidades = todasLasComunidades.slice(comunidades.length, comunidades.length + 5);
      if (nuevasComunidades.length > 0) {
        setComunidades([...comunidades, ...nuevasComunidades]);
      } else {
        setHasMoreData(false); // Si no hay más datos, deshabilitamos el scroll infinito
      }
      event.target.complete(); // Finalizamos el evento de scroll infinito
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Técnico / Comunidad</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RegistrarComunidad onEdit={openEditModal} comunidades={comunidades} cargarMasDatos={cargarMasDatos} />

        {/* Modal para editar la comunidad */}
        <IonModal isOpen={isModalOpen} onDidDismiss={closeEditModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Comunidad</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedComunidad && (
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre Técnico</IonLabel>
                  <IonInput
                    value={selectedComunidad.nombreTecnico}
                    onIonChange={(e) => setSelectedComunidad({ ...selectedComunidad, nombreTecnico: e.detail.value! })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Comunidad</IonLabel>
                  <IonInput
                    value={selectedComunidad.comunidad}
                    onIonChange={(e) => setSelectedComunidad({ ...selectedComunidad, comunidad: e.detail.value! })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Líder</IonLabel>
                  <IonInput
                    value={selectedComunidad.lider}
                    onIonChange={(e) => setSelectedComunidad({ ...selectedComunidad, lider: e.detail.value! })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Habitantes</IonLabel>
                  <IonInput
                    type="number"
                    value={selectedComunidad.habitantes}
                    onIonChange={(e) => setSelectedComunidad({ ...selectedComunidad, habitantes: parseInt(e.detail.value!, 10) })}
                  />
                </IonItem>

                {/* Selector para el Municipio */}
                <IonItem>
                  <IonLabel position="stacked">Municipio</IonLabel>
                  <IonSelect
                    value={selectedComunidad.municipio}
                    placeholder="Selecciona un Municipio"
                    onIonChange={(e) => setSelectedComunidad({ ...selectedComunidad, municipio: e.detail.value })}
                  >
                    {municipios.map((municipio, index) => (
                      <IonSelectOption key={index} value={municipio}>
                        {municipio}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                {/* Selector para el Estado */}
                <IonItem>
                  <IonLabel position="stacked">Estado</IonLabel>
                  <IonSelect
                    value={selectedComunidad.estado}
                    placeholder="Selecciona un Estado"
                    onIonChange={(e) => setSelectedComunidad({ ...selectedComunidad, estado: e.detail.value })}
                  >
                    {estados.map((estado, index) => (
                      <IonSelectOption key={index} value={estado}>
                        {estado}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonList>
            )}

            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={handleSave}>Guardar</IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" color="medium" onClick={closeEditModal}>Cancelar</IonButton>
              </IonCol>
            </IonRow>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Comunidad;
