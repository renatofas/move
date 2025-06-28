// client/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [datos, setDatos] = useState({ correo: '', contraseña: '', telefono: '', rut: '', tipo: 'pasajero' });

  const handleChange = e => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', datos);
      alert('Cuenta creada');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input name="correo" placeholder="Correo" onChange={handleChange} />
      <input name="contraseña" placeholder="Contraseña" type="password" onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <select name="tipo" onChange={handleChange}>
        <option value="pasajero">Pasajero</option>
        <option value="conductor">Conductor</option>
      </select>
      {datos.tipo === 'conductor' && (
        <input name="rut" placeholder="RUT" onChange={handleChange} />
      )}
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
