



const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  Quotation_number: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  Quotation_date: {
    type: Date,
    required: true,
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

module.exports = mongoose.model('Quotation', quotationSchema);
