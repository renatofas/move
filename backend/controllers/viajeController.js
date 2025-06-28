// backend/controllers/viajeController.js
const Viaje = require('../models/Viaje');
const Usuario = require('../models/Usuario');

// Crear un nuevo viaje
exports.crearViaje = async (req, res) => {
  const { destino, cuposDisponibles, precio, horaSalida } = req.body;
  const conductorId = req.userId;

  try {
    const viaje = new Viaje({ conductor: conductorId, destino, cuposDisponibles, precio, horaSalida });
    await viaje.save();
    res.status(201).json(viaje);
  } catch (err) {
    res.status(500).json({ msg: 'Error al crear el viaje', error: err.message });
  }
};

// Obtener todos los viajes disponibles (no pasados)
exports.obtenerViajes = async (req, res) => {
  const ahora = new Date();
  try {
    const viajes = await Viaje.find({ horaSalida: { $gt: ahora } })
      .populate('conductor', 'correo telefono');
    res.json(viajes);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener los viajes', error: err.message });
  }
};

// Editar viaje
exports.editarViaje = async (req, res) => {
  const { id } = req.params;
  const { destino, cuposDisponibles, precio, horaSalida } = req.body;

  try {
    const viaje = await Viaje.findByIdAndUpdate(id, { destino, cuposDisponibles, precio, horaSalida }, { new: true });
    res.json(viaje);
  } catch (err) {
    res.status(500).json({ msg: 'Error al editar el viaje', error: err.message });
  }
};

// Eliminar viaje
exports.eliminarViaje = async (req, res) => {
  try {
    await Viaje.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Viaje eliminado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar el viaje', error: err.message });
  }
};

// Pasajero se une al viaje
exports.unirseAViaje = async (req, res) => {
  const viajeId = req.params.id;
  const pasajeroId = req.userId;

  try {
    const viaje = await Viaje.findById(viajeId);

    if (!viaje || viaje.cuposDisponibles <= 0)
      return res.status(400).json({ msg: 'No hay cupos disponibles o viaje no encontrado' });

    if (viaje.pasajeros.includes(pasajeroId))
      return res.status(400).json({ msg: 'Ya estás en este viaje' });

    viaje.pasajeros.push(pasajeroId);
    viaje.cuposDisponibles -= 1;
    await viaje.save();

    res.json({ msg: 'Te uniste al viaje', viaje });
  } catch (err) {
    res.status(500).json({ msg: 'Error al unirse al viaje', error: err.message });
  }
};
