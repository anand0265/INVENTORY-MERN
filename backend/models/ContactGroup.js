const mongoose = require('mongoose')

const contactGroupSchema =new mongoose.Schema({
    Groupname:{
        type:String,
        required:true
    },
    note:{
        type:String
    }
})

module.exports=mongoose.model('contactGroup',contactGroupSchema);