import React, { useState } from 'react';
import { auth } from '../firebaseconfig'; // Asegúrate de que esto sea correcto
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Importar para Firestore
import { firestore as db } from '../firebaseconfig'; // Asegúrate de que esto sea correcto
import './Login.css'; // Utiliza el mismo estilo que Login

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Para mostrar mensajes de éxito
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Crear el usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Obtener la información del usuario

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        nombre: firstName,
        apellidos: lastName,
        email: email,
      });

      // Mostrar mensaje de éxito
      setMessage('Usuario registrado con éxito');
      setError(''); // Limpiar el error

      // Limpiar los campos del formulario
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
      setMessage(''); // Limpiar mensaje de éxito en caso de error
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Registrarse</h2>
        {error && <p className="login-error">{error}</p>}
        {message && <p className="login-success">{message}</p>} {/* Mostrar mensaje de éxito */}
        <form className="login-form" onSubmit={handleRegister}>
          <input
            type="text"
            className="login-input"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="login-input"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Registrarse</button>
        </form>
        <p className="login-footer">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
