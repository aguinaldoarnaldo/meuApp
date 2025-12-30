const express = require('express');
const router = express.Router();
const {
  generateQRCode,
  validateQRCode,
  invalidateQRCode,
  getQRCodeHistory,
} = require('../controllers/qrcodeController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas que precisam de autenticação de usuário
router.post('/generate', authMiddleware, generateQRCode);
router.post('/invalidate', authMiddleware, invalidateQRCode);
router.get('/history', authMiddleware, getQRCodeHistory);

// Rota pública para validação (será chamada pela clínica/farmácia)
router.post('/validate', validateQRCode);

module.exports = router;

