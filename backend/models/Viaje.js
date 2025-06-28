const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema({
  conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  destino: { type: String, required: true },
  cuposDisponibles: { type: Number, required: true },
  precio: { type: Number, required: true },
  horaSalida: { type: Date, required: true },
  pasajeros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});

module.exports = mongoose.model('Viaje', viajeSchema);
