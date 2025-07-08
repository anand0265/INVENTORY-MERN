const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    profile_type:{type:String,required:true},
    company_name:{type:String,required:true},
    contact_name:{type:String,required:true},
    contact_phone:{type:String},
    contact_email:{type:String},
    country:{type:String},
    group:{type:String}
})

module.exports = mongoose.model('Client',clientSchema)