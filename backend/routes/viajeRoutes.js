// backend/routes/viajeRoutes.js
const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, viajeController.crearViaje);
router.get('/', auth, viajeController.obtenerViajes);
router.put('/:id', auth, viajeController.editarViaje);
router.delete('/:id', auth, viajeController.eliminarViaje);
router.post('/unirse/:id', auth, viajeController.unirseAViaje);

module.exports = router;
