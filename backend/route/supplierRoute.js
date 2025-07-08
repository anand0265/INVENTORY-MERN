const express = require('express');


const router = express.Router();
const multer = require('multer');
const { createSupplier, getSupplier, deleteSupplier } = require('../controller/Suppliercontroller');
const upload = multer();

router.post('/add',upload.none(),createSupplier)

router.get('/',getSupplier)

router.delete('/delete/:id',deleteSupplier)

module.exports=router;