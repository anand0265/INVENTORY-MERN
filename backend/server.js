const express=require('express')

const app=express();
const dotenv = require('dotenv');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
const allowedOrigins = [
  'http://localhost:5173',
  'https://inventory-mern-oh02.onrender.com/', // ✅ your actual frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // ✅ required for cookies/JWT headers
}));
const connectionDB = require('./db/db')

app.get('/',(req,res)=>{
    try {
        res.send("Hello World")
    } catch (error) {
        console.log(error)
    }
    
})


const path = require('path');

// Static folder to access uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploadsUser', express.static(path.join(__dirname, 'uploadsUser')));




app.use('/api/users',require('./route/userRoute'))
app.use('/api/contacts',require('./route/contactRoute'));
app.use('/api/supplier',require('./route/supplierRoute'))
app.use('/api/account',require('./route/accountRoute'))
app.use('/api/re-income',require('./route/addReIncome'))
app.use('/api/re-expense',require('./route/addReExpense'))
app.use('/api/user', require('./route/createUserRoute'));
app.use('/api/products', require('./route/productRoute'));
app.use('/api/contact/group',require('./route/contactGroupRoute'))
app.use('/api/service',require('./route/serviceRoute'))
app.use('/api/purchase',require('./route/purchaseRoute'))
app.use('/api/invoice',require('./route/InvoiceRoute'))
app.use('/api/client',require('./route/clientRoute'))
app.use('/api/quotation',require('./route/quotationRoute'))
app.use('/api/transfer',require('./route/transferRoute'))



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

connectionDB();
