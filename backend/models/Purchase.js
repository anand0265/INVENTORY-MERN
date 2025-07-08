// const mongoose = require('mongoose');

// const purchaseSchema = new mongoose.Schema({
//     order_date:{type:Date},
//     supplier:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Supplier',
//         required:true
//     },
//     order_status:{type:String},
//     grand_total:{type:Number},
//     paid:{type:Number},
//     payment_status:{type:String},
//     product:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Product',
//         required:true
//     },
//     order_discount:{
//         type:Number
//     },
//     shipping_cost:{
//         type:Number
//     }


// })

// module.exports = mongoose.model('Purchase',purchaseSchema)


// const mongoose = require('mongoose');

// const purchaseSchema = new mongoose.Schema({
//   order_date: { type: Date, default: Date.now },
//   supplier: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Supplier',
//     required: true
//   },
//   order_status: { type: String },
//   grand_total: { type: Number },
//   paid: { type: Number },
//   payment_status: { type: String },
//   order_discount: { type: Number },
//   shipping_cost: { type: Number },
//   product: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//       quantity: Number,
//       unitCost: Number,
//       discount: Number,
//       taxRate: Number,
//       description: String
//     }
//   ]
// });

// module.exports = mongoose.model('Purchase', purchaseSchema);


// models/Purchase.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: String,
  quantity: Number,
  unitCost: Number,
  discount: Number,
  taxRate: Number
});

const purchaseSchema = new mongoose.Schema({
  brand:{type:String},
  size:{type:String},
  order_date: { type: Date, default: Date.now },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  order_status: { type: String },
  grand_total: { type: Number },
  paid: { type: Number },
  payment_status: { type: String },
  order_discount: { type: Number },
  shipping_cost: { type: Number },
  product: [productSchema]  // ✅ Array of embedded product objects
});

module.exports = mongoose.model('Purchase', purchaseSchema);
