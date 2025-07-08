const express = require('express')

const router = express.Router()

const contactGroupController = require('../controller/contactGroupController')

router.post('/add',contactGroupController.createContactGroup)

router.get('/',contactGroupController.getContactGroup)

router.delete('/delete/:id' , contactGroupController.deleteContactGroup)

module.exports = router