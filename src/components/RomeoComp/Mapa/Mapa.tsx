import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, Circle, useJsApiLoader } from '@react-google-maps/api';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonModal, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const initialCenter = {
  lat: 15.81311,
  lng: -90.32776770398708
};

interface Community {
  idComunidad: number;
  nombre_comunidad: string;
  lat?: number; // Agregar latitud opcional
  lng?: number; // Agregar longitud opcional
}

const Mapa: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA0acS-c4RSsRMSS82MFhGeKSjH3VaNlIA"
  });

  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(null);
  const [newCommunityCoords, setNewCommunityCoords] = useState<{ lat: number, lng: number } | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [zoom, setZoom] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isLocationFound, setIsLocationFound] = useState(false);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat !== undefined && lng !== undefined) {
      setNewCommunityCoords({ lat, lng });
    }
  }, []);

  const handleMarkerClick = () => {
    if (currentPosition) {
      setNewCommunityCoords(currentPosition);
      setIsModalOpen(true);
    }
  };

  const handleAddCommunity = async () => {
    if (selectedCommunityId && newCommunityCoords) {
      try {
        const response = await axios.post('http://localhost:3000/mapacomunidad', {
          comunidad_id: selectedCommunityId,
          latitud: newCommunityCoords.lat,
          longitud: newCommunityCoords.lng
        });

        if (response.status === 201) {
          setAlertMessage("Ubicación guardada con éxito!");
          setCommunities([...communities, { idComunidad: response.data.id, nombre_comunidad: selectedCommunityId.toString(), lat: newCommunityCoords.lat, lng: newCommunityCoords.lng }]);
          setSelectedCommunityId(null);
          setNewCommunityCoords(null);
          setIsModalOpen(false);
        }
      } catch (error: any) {
        console.error("Error al guardar la comunidad:", error);
        setAlertMessage("Error al guardar la comunidad: " + (error.response?.data?.error || "Error desconocido"));
      }
    } else {
      setAlertMessage("Por favor, selecciona una comunidad y coordenadas.");
    }
  };

  const startTracking = async () => {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setZoom(18);
      setIsLocationFound(true);
    } catch (error: any) {
      console.error("Error al obtener la posición:", error.message);
    }
  };

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/comunidades'); // Asegúrate de usar la URL correcta
        console.log("Respuesta de comunidades:", response.data); // Verifica la respuesta
        if (Array.isArray(response.data)) {
          setCommunities(response.data);
        } else {
          console.error("Respuesta inesperada:", response.data);
          setAlertMessage("Error al obtener el listado de comunidades.");
        }
      } catch (error) {
        console.error("Error al obtener las comunidades:", error);
        setAlertMessage("No se pudo conectar con el servidor.");
      }
    };

    fetchCommunities();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa de Comunidades</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentPosition || initialCenter}
            zoom={zoom}
            onClick={handleMapClick}
          >
            {currentPosition && (
              <>
                <Marker
                  position={currentPosition}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    scaledSize: new google.maps.Size(30, 30)
                  }}
                  onClick={handleMarkerClick}
                />
                <Circle
                  center={currentPosition}
                  radius={45}
                  options={{
                    strokeColor: '#4285F4',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#4285F4',
                    fillOpacity: 0.35,
                  }}
                />
              </>
            )}
            {communities.map(community => (
              community.lat !== undefined && community.lng !== undefined && (
                <Marker
                  key={community.idComunidad}
                  position={{ lat: community.lat || 0, lng: community.lng || 0 }} // Asegúrate de manejar la lat/lng correctamente
                />
              )
            ))}
          </GoogleMap>
        ) : <div>Cargando Mapa...</div>}

        <IonButton onClick={startTracking}>Iniciar Seguimiento</IonButton>
        {isLocationFound && newCommunityCoords && (
          <>
            <IonItem>
              <IonLabel>
                Coordenadas seleccionadas: {newCommunityCoords.lat.toFixed(6)}, {newCommunityCoords.lng.toFixed(6)}
              </IonLabel>
            </IonItem>
            <IonButton onClick={() => setIsModalOpen(true)}>Guardar Ubicación</IonButton>
          </>
        )}

        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Guardar Comunidad</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel position="floating">Seleccionar Comunidad</IonLabel>
              <IonSelect value={selectedCommunityId} onIonChange={(e) => {
                console.log("Comunidad seleccionada:", e.detail.value);
                setSelectedCommunityId(e.detail.value);
              }}>
                {communities.map(community => (
                  <IonSelectOption key={community.idComunidad} value={community.idComunidad}>
                    {community.nombre_comunidad}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonButton expand="full" onClick={handleAddCommunity}>Guardar</IonButton>
            <IonButton expand="full" color="light" onClick={() => setIsModalOpen(false)}>Cancelar</IonButton>
          </IonContent>
        </IonModal>

        {alertMessage && (
          <IonAlert
            isOpen={!!alertMessage}
            onDidDismiss={() => setAlertMessage(null)}
            header="Confirmación"
            message={alertMessage}
            buttons={['OK']}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Mapa;
