const AddExpense = require('../models/AddExpense');

// POST - Add Repeating Expense
const addReExpense = async (req, res) => {
  try {
    const {
      date,
      account,
      expenseType,
      rotation,
      noOfRotation,
      amount,
      payer,
      paymentMethod,
      reference,
      note
    } = req.body;

    if (!date || !account || !expenseType || !rotation || !noOfRotation || !amount || !paymentMethod) {
      return res.status(400).send({ message: "Please provide all required fields" });
    }

    const newExpense = new AddExpense({
      date,
      account,
      expenseType,
      rotation,
      noOfRotation,
      amount,
      payer,
      paymentMethod,
      reference,
      note
    });

    await newExpense.save();

    res.status(201).send({ message: "Repeating Expense Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

// GET - Fetch All Repeating Expenses
const getAllReExpenses = async (req, res) => {
  try {
    const expenses = await AddExpense.find().sort({ date: -1 }); // Latest first
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching expenses", error: error.message });
  }
};

// DELETE - Delete Repeating Expense by ID
const deleteReExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AddExpense.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send({ message: "Expense not found" });
    }

    res.status(200).send({ message: "Repeating Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  addReExpense,
  getAllReExpenses,
  deleteReExpense
};
