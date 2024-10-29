import React, { useState } from 'react';
import './AddPlaceForm.css'; // Asegúrate de tener estilos apropiados

const AddPlaceForm = ({ onAddLocation }) => {
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertir lat y lng a números
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    // Validar que las coordenadas son números válidos
    if (isNaN(latitude) || isNaN(longitude)) {
      alert("Por favor, introduce coordenadas válidas.");
      return;
    }

    // Llamar a la función onAddLocation pasada como prop
    onAddLocation(name, latitude, longitude, notes);

    // Reiniciar el formulario
    setName('');
    setLat('');
    setLng('');
    setNotes('');
  };

  return (
    <div className="add-place-form">
      <h2>Añadir un Lugar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del Lugar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Latitud"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Longitud"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
        <textarea
          placeholder="Notas sobre el Lugar"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Añadir Lugar</button>
      </form>
    </div>
  );
};

export default AddPlaceForm;
