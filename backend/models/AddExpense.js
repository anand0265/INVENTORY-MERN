const mongoose = require('mongoose');

const addReExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  account: { type: String, required: true },
  expenseType: { type: String, required: true },
  rotation: { type: String, required: true },
  noOfRotation: { type: Number, required: true },
  amount: { type: String, required: true },
  payer: { type: String },
  paymentMethod: { type: String, required: true },
  reference: { type: String },
  note: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model("AddExpense", addReExpenseSchema);
