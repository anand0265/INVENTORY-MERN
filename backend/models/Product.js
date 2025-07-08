const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  supplier: {
    type: String,
    default: '',
  },
  productCost: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productUnit: {
    type: String,
    required: true,
    enum: ['kg', 'pcs'],
  },
  description: {
    type: String,
    default: '',
  },
  availableStock: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
