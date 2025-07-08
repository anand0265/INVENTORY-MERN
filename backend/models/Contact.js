const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  profileType: { type: String, enum: ['Company', 'Individual'], required: true },
  companyName: { type: String },
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  country: { type: String },
  group: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  address: { type: String },
  remarks: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
  imageUrl: { type: String },

  // Optional login fields
  loginEnabled: { type: Boolean, default: false },
  loginName: { type: String },
  loginEmail: { type: String },
  loginPassword: { type: String }, // Store hashed password
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
