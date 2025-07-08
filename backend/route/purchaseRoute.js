const express = require('express')
const { createPurchase, getPurchaseById, getAllPurchases } = require('../controller/purchaseController')

const router = express.Router()

router.post('/create',createPurchase)

router.get('/:id',getPurchaseById)

router.get('/',getAllPurchases)



module.exports = router