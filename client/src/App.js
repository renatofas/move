// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import DashboardConductor from './pages/DashboardConductor';
import DashboardPasajero from './pages/DashboardPasajero';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/conductor" element={<DashboardConductor />} />
        <Route path="/pasajero" element={<DashboardPasajero />} />
      </Routes>
    </Router>
  );
}

export default App;
