const express = require('express');
const router = express.Router();
const { getMyInvoices } = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getMyInvoices);

module.exports = router;
