const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountTitle:{type:String,required:true},
    OpeningDate:{type:String,required:true},
    accountNumber:{type:String},
    OpeningBalance:{type:String},
    note:{type:String}


},{
    timestamps:true
})

module.exports=mongoose.model("Account",AccountSchema);
