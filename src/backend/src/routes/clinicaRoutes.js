const express = require('express');
const router = express.Router();
const {
  getClinicas,
  getClinicaById,
  createClinica,
} = require('../controllers/clinicaController');

// Rotas públicas (podem ser protegidas no futuro se necessário)
router.get('/', getClinicas);
router.get('/:id', getClinicaById);
router.post('/', createClinica); // Pode adicionar middleware de admin aqui

module.exports = router;

