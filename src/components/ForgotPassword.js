import React, { useState } from 'react';
import { auth } from '../firebaseconfig'; // Asegúrate de que esto sea correcto
import { sendPasswordResetEmail } from 'firebase/auth';
import './Login.css'; // Utiliza el mismo estilo que Login

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar el estado de carga
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Correo electrónico enviado, revisa tu bandeja de entrada.');
      setError(''); // Limpiar el error en caso de que hubiera uno
      setEmail(''); // Limpiar el campo de correo electrónico después de enviar
    } catch (err) {
      setError(err.message);
      setMessage(''); // Limpiar el mensaje en caso de que haya un error
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Recuperar Contraseña</h2>
        {error && <p className="login-error">{error}</p>}
        {message && <p className="login-success">{message}</p>}
        <form className="login-form" onSubmit={handleResetPassword}>
          <input
            type="email"
            className="login-input"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        <p className="login-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
          ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
