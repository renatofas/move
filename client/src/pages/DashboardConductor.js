// client/src/pages/DashboardConductor.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardConductor() {
  const [viajes, setViajes] = useState([]);
  const [form, setForm] = useState({
    destino: '',
    cuposDisponibles: '',
    precio: '',
    horaSalida: ''
  });

  const token = localStorage.getItem('token');

  const cargarViajes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/viajes', {
        headers: { Authorization: token }
      });
      const viajesDelConductor = res.data.filter(v => v.conductor._id === parseJwt(token).id);
      setViajes(viajesDelConductor);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarViajes();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/viajes', form, {
        headers: { Authorization: token }
      });
      setForm({ destino: '', cuposDisponibles: '', precio: '', horaSalida: '' });
      cargarViajes();
    } catch (err) {
      alert('Error al crear viaje');
    }
  };

  const eliminarViaje = async (id) => {
    if (!window.confirm('¿Eliminar este viaje?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/viajes/${id}`, {
        headers: { Authorization: token }
      });
      cargarViajes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Panel del Conductor</h2>
      <form onSubmit={handleSubmit}>
        <input name="destino" placeholder="Destino" value={form.destino} onChange={handleChange} />
        <input name="cuposDisponibles" placeholder="Cupos" type="number" value={form.cuposDisponibles} onChange={handleChange} />
        <input name="precio" placeholder="Precio" type="number" value={form.precio} onChange={handleChange} />
        <input name="horaSalida" type="datetime-local" value={form.horaSalida} onChange={handleChange} />
        <button type="submit">Crear viaje</button>
      </form>

      <h3>Mis viajes</h3>
      <ul>
        {viajes.map(v => (
          <li key={v._id}>
            <b>{v.destino}</b> | {v.horaSalida} | ${v.precio} | Cupos: {v.cuposDisponibles}
            <button onClick={() => eliminarViaje(v._id)}>Eliminar</button>
            {/* Podrías agregar edición aquí también */}
          </li>
        ))}
      </ul>
    </div>
  );
}

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export default DashboardConductor;
