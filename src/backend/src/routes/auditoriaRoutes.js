const express = require('express');
const router = express.Router();
const {
  getAuditoriaUsuario,
  getRegistrosSuspeitos,
} = require('../controllers/auditoriaController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota protegida - usuário vê sua própria auditoria
router.get('/usuario', authMiddleware, getAuditoriaUsuario);

// Rota para administradores (pode adicionar middleware de admin aqui)
router.get('/suspeitos', authMiddleware, getRegistrosSuspeitos);

module.exports = router;

