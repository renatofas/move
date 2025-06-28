// backend/controllers/authController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { correo, contraseña, telefono, rut, tipo } = req.body;
  try {
    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ msg: 'Correo ya registrado' });

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({
      correo, contraseña: hash, telefono, rut: tipo === 'conductor' ? rut : undefined, tipo
    });
    await nuevoUsuario.save();
    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, usuario });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
};
