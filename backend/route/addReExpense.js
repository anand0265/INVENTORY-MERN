const express = require('express');
const router = express.Router();

const {
  addReExpense,
  getAllReExpenses,
  deleteReExpense
} = require('../controller/addReExpensecontroller');

router.post('/add', addReExpense);
router.get('/', getAllReExpenses);
router.delete('/delete/:id', deleteReExpense);

module.exports = router;
