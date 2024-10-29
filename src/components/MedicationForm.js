import React, { useState } from "react";
import { firestore as db } from "../firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const MedicationForm = () => {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [time, setTime] = useState("");

  const handleAddMedication = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "medications"), {
        name,
        dose,
        time
      });
      setName("");
      setDose("");
      setTime("");
      alert("Medicamento agregado correctamente");
    } catch (error) {
      console.error("Error al agregar medicamento: ", error);
    }
  };

  return (
    <form onSubmit={handleAddMedication}>
      <input
        type="text"
        placeholder="Nombre del medicamento"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dosis"
        value={dose}
        onChange={(e) => setDose(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Agregar Medicamento</button>
    </form>
  );
};

export default MedicationForm;
