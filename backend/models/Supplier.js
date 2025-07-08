const { default: mongoose } = require('mongoose');
const mongooose = require('mongoose')

const SupplierSchema =new mongooose.Schema({
  supplierName:{type:String },
  companyName:{type:String},
  vatNumber:{type:String},
 email: { type: String, unique: true },
phone: {
  type: String,
  required: true,
  validate: {
    validator: function (v) {
      return /^\d{10}$/.test(v);  // regex: only 10 digits
    },
    message: props => `${props.value} is not a valid 10-digit phone number!`
  }
},
address:{type:String},
  country: { type: String },
  city:{type:String},
  state:{type:String},
  postalCode: {
  type: String,
  required: true,
  validate: {
    validator: function (v) {
      return /^\d{6}$/.test(v); // only 6 digits
    },
    message: props => `${props.value} is not a valid 6-digit postal code!`
  }
}
},{
    timestamps:true,
})

module.exports = mongoose.model('Supplier',SupplierSchema);