const mongoose = require('mongoose');

const createuserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['Admin', 'Staff'], required: true },
  userRole: { type: String, enum: ['Accountant', 'General Roles', 'Manager'], required: true },
  status: { type: String, enum: ['Active', 'Inactive'], required: true },
  profilePicture: { type: String }, // image path
}, {
  timestamps: true
});

module.exports = mongoose.model('CreateUser', createuserSchema);
