import React, { useEffect } from 'react';
import { auth } from '../firebaseconfig'; // Asegúrate de que la configuración de Firebase sea correcta
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate(); // Para redirigir después de cerrar sesión

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth); // Cerrar sesión
        navigate('/'); // Redirigir a la página de inicio
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
      }
    };

    handleLogout(); // Llama a la función para cerrar sesión
  }, [navigate]);

  return (
    <div>
      <h2>Cerrando sesión...</h2>
      {/* Puedes mostrar un spinner o un mensaje mientras se procesa el cierre de sesión */}
    </div>
  );
};

export default Logout;
