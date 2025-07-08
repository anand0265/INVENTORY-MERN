

const express = require('express');
const router = express.Router();

const {
  addReIncome,
  getAllReIncomes,
  deleteReIncome
} = require('../controller/addReIncomecontroller');

router.post('/add', addReIncome);
router.get('/', getAllReIncomes);
router.delete('/delete/:id', deleteReIncome);

module.exports = router;
