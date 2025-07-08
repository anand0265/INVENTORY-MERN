const express = require('express');
const { addProduct, getProducts, deleteProducts } = require('../controller/productController');
const router = express.Router();


// POST - Add product
router.post('/add',addProduct);

// GET - Fetch all products
router.get('/', getProducts);

// DELETE - Delete product 
router.delete('/delete/:id',deleteProducts)

module.exports = router;
