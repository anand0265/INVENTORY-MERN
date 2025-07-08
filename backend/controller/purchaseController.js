// 

const Purchase = require('../models/Purchase');

const createPurchase = async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: 'Failed to create purchase' });
  }
};

const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate('supplier')
      .populate('product');
    if (!purchase) return res.status(404).json({ error: 'Purchase not found' });
    res.status(200).json(purchase);
  } catch (error) {
    console.error('Error fetching purchase:', error);
    res.status(500).json({ error: 'Failed to fetch purchase' });
  }
};


// ✅ Get all purchases
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('supplier')
      .populate('product');

    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching all purchases:', error);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};


module.exports = { createPurchase, getPurchaseById,getAllPurchases };