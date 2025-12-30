const express = require('express');
const router = express.Router();
const {
  getProcedimentos,
  createProcedimento,
} = require('../controllers/procedimentoController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas precisam de autenticação
router.use(authMiddleware);

router.get('/', getProcedimentos);
router.post('/', createProcedimento);

module.exports = router;

