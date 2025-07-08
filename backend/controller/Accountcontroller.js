const Account = require('../models/Account');

// Create Account
const createAccount = async (req, res) => {
  try {
    const {
      accountTitle,
      OpeningDate,
      accountNumber,
      OpeningBalance,
      note
    } = req.body;

    if (!accountTitle || !OpeningBalance || !OpeningDate) {
      return res.status(400).send({
        message: "Provide all required fields",
      });
    }

    const account = new Account({
      accountTitle,
      OpeningDate,
      accountNumber,
      OpeningBalance,
      note
    });

    await account.save();

    res.status(201).send({
      message: "Account created successfully",
      account,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All Accounts
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).send({
      message: "Accounts fetched successfully",
      accounts,
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Account by ID
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Account.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({
        message: "Account not found",
      });
    }

    res.status(200).send({
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  deleteAccount,
};
