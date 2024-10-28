import React from 'react';
import './Panel.css';

function Example() {
  return (
    <>
      {/* Mensaje de Bienvenida */}
      <div className="bienvenida">
        <h2>Bienvenidos a Choice Humanitarian</h2>
        <p>
          CHOICE Humanitarian apoya los esfuerzos de personas de todo el mundo para reducir la pobreza mundial y construir comunidades autosuficientes y resilientes.
        </p>
      </div>

      {/* Video de YouTube */}
      <div className="video-container">
        <iframe
          width="760"
          height="315"
          src="https://www.youtube.com/embed/fvEPOEKzbHw?start=47"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default Example;
