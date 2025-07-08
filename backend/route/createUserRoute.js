const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const createUser = require('../controller/createUsercontroller');


// Image storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadsUser/'); // Save to /uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// @route   POST /api/users/create
router.post('/create', upload.single('profilePicture'), createUser);

module.exports = router;
