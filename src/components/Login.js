import React, { useState } from 'react';
import { auth } from '../firebaseconfig'; // Asegúrate de que esto sea correcto
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Asegúrate de tener este icono instalado
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Login.css'; // Utiliza el mismo estilo que Register

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirige al usuario a la página de inicio después de iniciar sesión correctamente
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirige al usuario a la página de inicio después de iniciar sesión correctamente
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <p className="login-error">{error}</p>}
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        {/* Botón para iniciar sesión con Google */}
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <FontAwesomeIcon icon={faGoogle} className="google-icon" />
          Iniciar sesión con Google
        </button>
        {/* Leyenda de olvidaste tu contraseña */}
        <p className="forgot-password">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </p>
        <p className="login-footer">
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
