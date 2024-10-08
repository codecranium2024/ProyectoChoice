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
      const apiKey = '87b0a1f0-85a0-11ef-8d8d-0242ac130003-87b0a27c-85a0-11ef-8d8d-0242ac13000';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        const weatherData = response.data;

        // Agregar marcador en el mapa
        new mapboxgl.Marker()
          .setLngLat([lon, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>Clima: ${weatherData.weather[0].description}</h3>
            <p>Temperatura: ${(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
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
