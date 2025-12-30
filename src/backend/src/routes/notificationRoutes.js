const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
} = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas precisam de autenticação
router.use(authMiddleware);

router.get('/', getNotifications);
router.put('/:notificationId/read', markAsRead);
router.delete('/:notificationId', deleteNotification);
router.delete('/', deleteAllNotifications);

module.exports = router;

