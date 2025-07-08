const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  accountFrom: {
    type: String,
    required: true,
  },
  accountTo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Paypal', 'Credit card', 'Stripe', 'Transfer'],
  },
  reference: {
    type: String,
  },
  note: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Transfer', transferSchema);
