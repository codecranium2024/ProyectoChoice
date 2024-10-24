import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import './Mapa.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tZW8xODgiLCJhIjoiY20yMHJ1Mm95MGt2ZTJ4cHB2M3d6cXN6YSJ9.gWCrNAy7ApqbrSohUCOYfA';

interface Comunidad {
  nombre: string;
  proyectos: string;
  coordenadas: {
    lng: number;
    lat: number;
  };
}

const Mapa = () => {
  const [comunidades, setComunidades] = useState<Comunidad[]>([]); // Definir el tipo del estado

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // ID del contenedor en el HTML
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-90.28896, 15.81311], // Coordenadas de Chisec, Alta Verapaz
      zoom: 10
    });

    // Evento de clic en el mapa
    map.on('click', async (e) => {
      const { lng, lat } = e.lngLat;

      // Pedir al usuario el nombre de la comunidad y sus proyectos
      const nombreComunidad = prompt("Ingrese el nombre de la comunidad:");
      const proyectos = prompt("Ingrese los proyectos de la comunidad:");

      if (nombreComunidad && proyectos) {
        // Guardar la comunidad en el estado
        setComunidades((prevComunidades) => [
          ...prevComunidades,
          { nombre: nombreComunidad, proyectos, coordenadas: { lng, lat } }
        ]);

        // Agregar marcador en el mapa
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>${nombreComunidad}</h3>
            <p>Proyectos: ${proyectos}</p>
          `))
          .addTo(map);

        // Aquí puedes hacer una solicitud para guardar los datos en una base de datos
        try {
          await axios.post('/api/comunidades', { nombre: nombreComunidad, proyectos, coordenadas: { lng, lat } });
          console.log('Comunidad guardada con éxito');
        } catch (error) {
          console.error('Error al guardar la comunidad:', error);
        }
      }
    });

    return () => map.remove(); // Limpieza al desmontar el componente
  }, []);

  return (
    <div className="map-container">
      <div id="map" style={{ width: '100%', height: '80vh' }}></div> {/* Ajusta el height aquí */}

      {/* Tabla para mostrar las comunidades */}
      <table>
        <thead>
          <tr>
            <th>Nombre de la Comunidad</th>
            <th>Proyectos</th>
            <th>Coordenadas</th>
          </tr>
        </thead>
        <tbody>
          {comunidades.map((comunidad, index) => (
            <tr key={index}>
              <td>{comunidad.nombre}</td>
              <td>{comunidad.proyectos}</td>
              <td>{`Lat: ${comunidad.coordenadas.lat}, Lng: ${comunidad.coordenadas.lng}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mapa;
