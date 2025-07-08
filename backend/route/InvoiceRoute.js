


const express = require('express');
const {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
} = require('../controller/Invoicecontroller');

const router = express.Router();

router.post('/add', createInvoice);
router.get('/:id', getInvoiceById);
router.get('/', getAllInvoices);

module.exports = router;
