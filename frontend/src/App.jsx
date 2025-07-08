import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import './pages/Purchase/Purchase.css';


import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import ResetPassword from './pages/Login/ResetPassword';

import Dashboard from './pages/Dashboard/Dashboard';
import AddNewUser from './pages/AddNewUser/AddNewUser';

import Contact from './pages/Contact/Contact';
import ContactList from './pages/Contact/ContactList';
import ContactGroup from './pages/Contact/ContactGroup';
import ContactGroupList from './pages/Contact/ContactGroupList';

import AddSupplier from './pages/AddSupplier/AddSupplier';
import SupplierList from './pages/AddSupplier/SupplierList';

import AddAccount from './pages/AddAccount/AddAccount';

import AddReIncome from './pages/ReTransaction/AddReIncome';
import AddReExpense from './pages/ReTransaction/AddReExpense';

import AddProduct from './pages/Product/AddProduct';
import ProductList from './pages/Product/ProductList';

import Service from './pages/Service/Service';
import ServiceList from './pages/Service/ServiceList';

import Purchase from './pages/Purchase/Purchase';
import AddPurchase from './pages/Purchase/AddPurchase';
import PurchaseReceipt from './pages/Purchase/PurchaseReceipt';

import CreateInvoice from './pages/Invoice/CreateInvoice';
import Client from './pages/Client/Client';
import InvoiceList from './pages/Invoice/InvoiceList';
import InvoiceReceipt from './pages/Invoice/InvoiceReceipt';
import Quotation from './pages/Quatation/Quotation';
import QuotationReceipt from './pages/Quatation/QuotationReceipt';
import QuotationList from './pages/Quatation/QuotationList'
import AccountList from './pages/AddAccount/AccountList'
import AddTransfer from './pages/Transaction/AddTransfer'
import IncomeList from './pages/ReTransaction/IncomeList'
import ExpenseList from './pages/ReTransaction/ExpenseList'
import IncomeLists from './pages/Transaction/IncomeList'
import Addincome from './pages/Transaction/Addincome'
import ExpenseLists from './pages/Transaction/ExpenseList'
import Addexpense from './pages/Transaction/Addexpense';
import IncomeCalendar from './pages/Transaction/IncomeCalendar';
import ExpenseCalendar from './pages/Transaction/ExpenseCalendar';
import Page from './component/Page/Page';
 
const App = () => {
  const location = useLocation();
  const state = location.state;
  const background = state?.background;

  return (
    <>
    {/* <InvoiceReceipt/> */}
    {/* <Page/> */}
    
      {/* Main Routes */}
      <Routes location={background || location}>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-new-user" element={<AddNewUser />} />

        <Route path="/add-contact" element={<Contact />} />
        <Route path="/contact-list" element={<ContactList />} />
        <Route path="/contact-group-list" element={<ContactGroupList />} />

        <Route path="/add/supplier" element={<AddSupplier />} />
        <Route path="/supplier-list" element={<SupplierList />} />

        <Route path="/add-account" element={<AddAccount />} />
        

        <Route path="/products" element={<ProductList />} />
        <Route path="/service-list" element={<ServiceList />} />

        <Route path="/purchase" element={<Purchase />} />
        <Route path="/add/purchase" element={<AddPurchase />} />
        <Route path="/purchase-receipt/:id" element={<PurchaseReceipt />} />

        <Route path='/invoice-list' element={<InvoiceList/>} />
        <Route path="/create/invoice" element={<CreateInvoice />} />
        <Route path="/invoice-receipt/:id" element={<InvoiceReceipt />} />

        <Route path='/create/quotation' element={<Quotation/>} />
        <Route path="/quotation-receipt/:id" element={<QuotationReceipt />} />
        <Route path='/quotation-list' element={<QuotationList />} />

        <Route path='/account-list' element={<AccountList/>} />

        <Route path='/add-transfer' element={<AddTransfer/>}/>

        <Route path='/income-list' element={<IncomeList/>}/>
        <Route path="/add-income" element={<AddReIncome />} />

        <Route path="/add-expense" element={<AddReExpense />} />
        <Route path='/expense-list' element={<ExpenseList/>} />
        
        {/* Transaction folder route */}
        <Route path='/incomes-list' element={<IncomeLists/>}/>
        <Route path='/add-incomes' element={<Addincome/>}/>
        <Route path='/expenses-list' element={<ExpenseLists/>}/>
        <Route path='/add-expenses' element={<Addexpense/>}/>
        <Route path='/income-calender' element={<IncomeCalendar/>}/>
        <Route path='/expense-calender' element={<ExpenseCalendar/>}/>
        
      </Routes>

      {/* Modal Routes */}
      {background && (
        <Routes>
          
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/contact/group" element={<ContactGroup />} />
          <Route path="/service/add" element={<Service />} />
          <Route path="/client/add" element={<Client />} />
        </Routes>
      )}
    </>
  );
};

export default App;
