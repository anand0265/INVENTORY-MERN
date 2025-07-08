const User = require('../models/createUser');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      userType,
      userRole,
      status
    } = req.body;

    if (!name || !email || !password || !confirmPassword || !userType || !userRole || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePicture = req.file ? req.file.filename : '';

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      userRole,
      status,
      profilePicture
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports =  createUser ;
