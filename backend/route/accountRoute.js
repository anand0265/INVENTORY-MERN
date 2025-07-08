const express = require('express');
const { createAccount, getAllAccounts, deleteAccount } = require('../controller/Accountcontroller');


const router = express.Router();

router.post('/add',createAccount)
router.get('/',getAllAccounts)
router.delete('/delete/:id',deleteAccount)

module.exports=router