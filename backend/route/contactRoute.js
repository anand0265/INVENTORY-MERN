const express = require('express');
const router = express.Router();
const contactController = require('../controller/Contactcontroller');
const upload = require('../middleware/upload');

router.post('/add', upload.single('image'), contactController.createContact);

router.get('/',contactController.getContacts);

router.delete('/delete/:id',contactController.deleteContacts)

module.exports = router;
