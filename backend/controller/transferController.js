const Transfer = require('../models/transfer');

// Create Transfer
const createTransfer = async (req, res) => {
  try {
    const {
      accountFrom,
      accountTo,
      date,
      amount,
      paymentMethod,
      reference,
      note
    } = req.body;

    // Basic validation
    if (!accountFrom || !accountTo || !date || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newTransfer = new Transfer({
      accountFrom,
      accountTo,
      date,
      amount,
      paymentMethod,
      reference,
      note
    });

    await newTransfer.save();

    res.status(201).json({ message: 'Transfer added successfully', transfer: newTransfer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all transfers (optional)
const getAllTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ createdAt: -1 });
    res.status(200).json({ transfers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTransfer,
  getAllTransfers
};
