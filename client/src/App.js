// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import DashboardConductor from './pages/DashboardConductor';
import DashboardPasajero from './pages/DashboardPasajero';
import Layout from './components/Layout'; // <-- usamos Layout en lugar de solo Navbar

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Bienvenido a la app de viajes</h1>} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/conductor" element={<DashboardConductor />} />
          <Route path="/pasajero" element={<DashboardPasajero />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
