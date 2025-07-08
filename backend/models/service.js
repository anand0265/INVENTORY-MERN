const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    ServiceName:{
        type:String,
        required:true
    },
    ServiceCost:{
        type:String,
        required:true
    },
    Description:{
        type:String
    }
})

module.exports = mongoose.model('Service',serviceSchema)