import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading'; // Asegúrate de tener la ruta correcta
import Login from './components/Login';
import Register from './components/REgister';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home'
import Logout from './components/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
