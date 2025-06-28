// client/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [datos, setDatos] = useState({ correo: '', contraseña: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', datos);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('tipo', res.data.usuario.tipo);
      if (res.data.usuario.tipo === 'conductor') {
        navigate('/conductor');
      } else {
        navigate('/pasajero');
      }
    } catch (err) {
      alert('Error de login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="correo" placeholder="Correo" onChange={handleChange} />
      <input name="contraseña" placeholder="Contraseña" type="password" onChange={handleChange} />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;
