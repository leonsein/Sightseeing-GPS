// src/components/Loading.js
import React, { useEffect } from 'react';
import './Loading.css'; // Asegúrate de que este archivo CSS existe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmbulance, faMapMarkerAlt, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Loading = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    // Redirige después de 3 segundos (3000 ms)
    const timer = setTimeout(() => {
      navigate('/login'); // Redirige a la ruta de inicio de sesión
    }, 1800);

    // Limpia el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      {/* Aquí está el icono de mapa */}
      <FontAwesomeIcon icon={faAmbulance} size="3x" className="loading-icon" />
      <h2>Cargando...</h2> {/* Puedes personalizar el texto que desees */}
    </div>
  );
};

export default Loading;
