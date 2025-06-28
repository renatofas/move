// client/src/pages/DashboardPasajero.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPasajero() {
  const [viajes, setViajes] = useState([]);
  const [viajesUnidos, setViajesUnidos] = useState([]);
  const token = localStorage.getItem('token');
  const userId = parseJwt(token)?.id;

  const cargarViajes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/viajes', {
        headers: { Authorization: token }
      });
      setViajes(res.data);
      const unidos = res.data.filter(v => v.pasajeros.includes(userId));
      setViajesUnidos(unidos.map(v => v._id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarViajes();
  }, []);

  const unirse = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/viajes/unirse/${id}`, {}, {
        headers: { Authorization: token }
      });
      alert('Te uniste al viaje');
      cargarViajes();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error al unirse');
    }
  };

  const contactoWhatsApp = (telefono) => {
    return `https://wa.me/+56${telefono}`;
  };

  return (
    <div>
      <h2>Viajes disponibles</h2>
      <ul>
        {viajes.map(v => (
          <li key={v._id}>
            <b>{v.destino}</b> | {new Date(v.horaSalida).toLocaleString()} | ${v.precio} | Cupos: {v.cuposDisponibles}
            <br />
            {viajesUnidos.includes(v._id) ? (
              <a href={contactoWhatsApp(v.conductor.telefono)} target="_blank" rel="noopener noreferrer">
                Contactar conductor por WhatsApp
              </a>
            ) : (
              <button disabled={v.cuposDisponibles === 0} onClick={() => unirse(v._id)}>
                Unirse al viaje
              </button>
            )}
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

export default DashboardPasajero;
