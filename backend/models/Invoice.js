



const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  Invoice_number: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  Invoice_date: {
    type: Date,
    required: true,
  },
  Due_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'Unpaid',
  },
  product: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      productName: String,
      quantity: Number,
      unitCost: Number,
      discount: Number,
      taxRate: Number,
    },
  ],
  service: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
      serviceName: String,
      quantity: Number,
      unitCost: Number,
      discount: Number,
      taxRate: Number,
    },
  ],
  note: {
    type: String,
  },
  grand_total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
