


const express = require('express');
const { createQuotation, getQuotationById, getAllQuotations } = require('../controller/quotationcontroller');

const router = express.Router();

router.post('/add', createQuotation);
router.get('/:id', getQuotationById);
router.get('/', getAllQuotations);

module.exports = router;
