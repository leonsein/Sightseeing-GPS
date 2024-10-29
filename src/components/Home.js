import React, { useState, useEffect } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { firestore as db } from '../firebaseconfig'; // Asegúrate de que esto sea correcto
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig'; // Importa la autenticación de Firebase

const Home = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [dosis, setDosis] = useState('');
  const [horario, setHorario] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'medicamentos'), (snapshot) => {
      const meds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMedications(meds);
    });

    return () => unsubscribe();
  }, []);

  const addMedication = async (e) => {
    e.preventDefault();
    if (nombre && dosis && horario) {
      await addDoc(collection(db, 'medicamentos'), {
        nombre,
        dosis,
        horario,
      });
      setNombre('');
      setDosis('');
      setHorario('');
      setShowAddForm(false);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLogout = async () => {
    await auth.signOut(); // Usa auth para cerrar sesión
    navigate('/'); // Redirige a la ruta principal
  };

  return (
    <div className="container" style={{ backgroundColor: 'white' }}>
      <header className="header" style={{ backgroundColor: 'black', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">Logo aquí</div>
        <div className="logout-icon" onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
      </header>

      <main className="main-content">
        <h1>Mis Medicamentos</h1>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          <FontAwesomeIcon icon={faPlus} /> Agregar Medicamento
        </button>

        {showAddForm && (
          <form onSubmit={addMedication}>
            <input
              type="text"
              placeholder="Nombre del medicamento"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Dosis"
              value={dosis}
              onChange={(e) => setDosis(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Horario"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              required
            />
            <button type="submit">Agregar</button>
          </form>
        )}

        <h2>Lista de Medicamentos</h2>
        <ul>
          {medications.map((med) => (
            <li key={med.id}>
              {med.nombre} - {med.dosis} - {med.horario}
            </li>
          ))}
        </ul>

        <div>
          <h3>Notificaciones</h3>
          <button onClick={toggleNotifications}>
            {notificationsEnabled ? 'Desactivar Notificaciones' : 'Activar Notificaciones'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
