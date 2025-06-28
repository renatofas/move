// backend/models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  telefono: { type: String, required: true },
  rut: { type: String }, // solo para conductores
  tipo: { type: String, enum: ['conductor', 'pasajero'], required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
