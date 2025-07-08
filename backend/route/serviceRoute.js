const express = require('express');
const { createService, getService, deleteService } = require('../controller/servicecontroller');

const router = express.Router();

router.post('/add',createService)

router.get('/',getService)

router.delete('/delete/:id',deleteService)

module.exports=router