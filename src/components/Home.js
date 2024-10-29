import React, { useState, useEffect } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { firestore as db } from '../firebaseconfig';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


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
      await addDoc(collection(db, 'medicamentos'), { nombre, dosis, horario });
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
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className="container" style={{ backgroundColor: 'white' }}>
      <header className="header" style={{ backgroundColor: 'black', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white' }}>Logo aquí</div>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <a href="#enfermedades" style={{ color: 'white', textDecoration: 'none' }}>Enfermedades</a>
          <a href="#importancia" style={{ color: 'white', textDecoration: 'none' }}>Importancia de los medicamentos</a>
          <a href="#app" style={{ color: 'white', textDecoration: 'none' }}>App</a>
        </nav>
        <div className="logout-icon" onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
      </header>

      {/* Slider de imágenes */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
        style={{ width: '100%', height: '400px', marginBottom: '20px' }}
      >
        <SwiperSlide>
          <img src="https://source.unsplash.com/random/800x400?nature" alt="Slide 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://source.unsplash.com/random/800x400?city" alt="Slide 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://source.unsplash.com/random/800x400?technology" alt="Slide 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
      </Swiper>

      <main className="main-content">
        <section id="enfermedades" style={{ padding: '20px', animation: 'fadeIn 0.8s' }}>
          <h2>Enfermedades</h2>
          <p>Información sobre distintas enfermedades y sus síntomas.</p>
        </section>

        <section id="importancia" style={{ padding: '20px', animation: 'fadeIn 0.8s', animationDelay: '0.2s' }}>
          <h2>Importancia de los medicamentos</h2>
          <p>Explicación de la importancia de los medicamentos en el tratamiento de enfermedades.</p>
        </section>

        <section id="app" style={{ padding: '20px', animation: 'fadeIn 0.8s', animationDelay: '0.4s' }}>
          <h2>App</h2>
          <p>Descripción de la app y cómo puede ayudar a gestionar tus medicamentos.</p>
        </section>

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
