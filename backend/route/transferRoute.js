const express = require('express');
const router = express.Router();
const { createTransfer, getAllTransfers } = require('../controller/transferController');

router.post('/add', createTransfer);
router.get('/', getAllTransfers);

module.exports = router;
