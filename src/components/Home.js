import React, { useEffect, useState } from 'react';
import './Home.css';
import MapComponent from './MapComponent'; 
import AddPlaceForm from './AddPlaceForm';
import { firestore } from '../firebaseconfig'; 
import { collection, getDocs, addDoc } from 'firebase/firestore';

const Home = () => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    const placesCollection = collection(firestore, 'lugares');
    const placesSnapshot = await getDocs(placesCollection);
    const placesList = placesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLocations(placesList);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleAddLocation = async (name, lat, lng, notes) => {
    try {
      const newPlace = {
        nombre: name,
        coordenadas: {
          lat: lat,
          lng: lng,
        },
        notas: notes,
      };

      await addDoc(collection(firestore, 'lugares'), newPlace);
      setLocations([...locations, newPlace]);
      console.log("Lugar agregado:", newPlace);
    } catch (error) {
      console.error("Error al agregar el lugar:", error);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">Mapa de Lugares Favoritos</h1>
        <p className="subtitle">Marca y registra tus lugares especiales</p>
      </header>

      <div className="main-content">
        <AddPlaceForm onAddLocation={handleAddLocation} className="place-form" />
        <MapComponent locations={locations} className="map" />
      </div>

      <footer className="footer">
        <p>© 2024 Mapa de Lugares Favoritos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
