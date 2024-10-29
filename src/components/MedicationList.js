import React from "react";

const MedicationList = ({ medications }) => {
  return (
    <div>
      <h2>Mis Medicamentos</h2>
      <ul>
        {medications.map((med) => (
          <li key={med.id}>
            <p><strong>Nombre:</strong> {med.name}</p>
            <p><strong>Dosis:</strong> {med.dose}</p>
            <p><strong>Hora:</strong> {med.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationList;
