const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/Sendemail');
const crypto = require('crypto');




let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// SIGNUP
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

  
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};


// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      res.status(200).json({
        message: 'Login successful ✅',
        _id: user._id,
        email: user.email,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

//LOGOUT
const logoutUser = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.status(204).json({ message: 'Logged out successfully' });
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

  await user.save();

  const message = `
    <p>You requested a password reset</p>
    <p>Click <a href="${resetUrl}">here</a> to reset</p>
  `;

  await sendEmail(user.email, "Reset Password", message);
  res.status(200).json({ message: "Reset link sent to email" });
};

const resetPassword = async (req, res) => {
  const tokenHash = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.status(200).json({ message: "Password updated successfully" });
};

module.exports = {
    forgotPassword,
     resetPassword,
    registerUser,
  loginUser,
  logoutUser
};
