const AddIncome = require('../models/AddIncome');

// POST - Add Repeating Income
const addReIncome = async (req, res) => {
  try {
    const {
      date,
      account,
      incomeType,
      rotation,
      noOfRotation,
      amount,
      payer,
      paymentMethod,
      reference,
      note
    } = req.body;

    if (!date || !account || !incomeType || !rotation || !noOfRotation || !amount || !paymentMethod) {
      return res.status(400).send({ message: "Please provide required fields" });
    }

    const addincome = new AddIncome({
      date,
      account,
      incomeType,
      rotation,
      noOfRotation,
      amount,
      payer,
      paymentMethod,
      reference,
      note
    });

    await addincome.save();

    res.status(201).send({ message: "Repeating Income Added Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

// GET - Get All Repeating Incomes
const getAllReIncomes = async (req, res) => {
  try {
    const incomes = await AddIncome.find().sort({ date: -1 }); // Optional: latest first
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch incomes", error: error.message });
  }
};

// DELETE - Delete a Repeating Income by ID
const deleteReIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AddIncome.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Income not found" });
    }
    res.status(200).send({ message: "Income deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  addReIncome,
  getAllReIncomes,
  deleteReIncome
};
