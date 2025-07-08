const monngoose = require('mongoose');

const connectDB = async()=>{
    try {
         await monngoose.connect(process.env.MONGO_URI);
         console.log("Database Connection Successfully");
        
    } catch (error) {
        console.log("Database connection Error");
        
    }
   
}

module.exports = connectDB;