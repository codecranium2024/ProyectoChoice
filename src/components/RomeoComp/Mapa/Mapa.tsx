import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import './Mapa.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tZW8xODgiLCJhIjoiY20yMHJ1Mm95MGt2ZTJ4cHB2M3d6cXN6YSJ9.gWCrNAy7ApqbrSohUCOYfA';

const Mapa = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // ID del contenedor en el HTML
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-90.28896, 15.81311], // Coordenadas de chisec, Alta Verapaz
      zoom: 10
    });

    const getWeatherData = async (lat: number, lon: number) => {
      const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'TuAplicacion/1.0' // Cambia 'TuAplicacion' por el nombre de tu aplicación
          }
        });
        const weatherData = response.data;

        // Agregar marcador en el mapa
        new mapboxgl.Marker()
          .setLngLat([lon, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>Clima: ${weatherData.properties.timeseries[0].data.next_1_hours.summary.symbol_code}</h3>
            <p>Temperatura: ${weatherData.properties.timeseries[0].data.instant.details.air_temperature.toFixed(2)}°C</p>
          `))
          .addTo(map);
      } catch (error) {
        console.error('Error al obtener datos del clima:', error);
      }
    };

    // Llamar a la función con las coordenadas de chisec
    getWeatherData(15.8131, -90.28896); // chisec, Alta Verapaz

    return () => map.remove(); // Limpieza al desmontar el componente
  }, []);

  return (
    <div className="map-container">
      <div id="map" style={{ width: '100%', height: '80vh' }}></div> {/* Ajusta el height aquí */}
    </div>
  );
};

export default Mapa;
