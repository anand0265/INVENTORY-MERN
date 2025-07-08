const express = require('express');
const router = express.Router();
const {
  createClient,
  getAllClients,
  deleteClient
} = require('../controller/clientController');

router.post('/add', createClient);
router.get('/', getAllClients);
router.delete('/delete/:id', deleteClient);

module.exports = router;
