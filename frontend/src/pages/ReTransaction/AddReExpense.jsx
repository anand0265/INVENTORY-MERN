import React, { useState } from 'react';
import './AddReExpense.css';
import Sidebar from '../../component/Sidebar/Sidebar';
import Navbar from '../../component/Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AddReExpense = () => {
  const [formData, setFormData] = useState({
    date: '',
    account: '',
    expenseType: '',
    rotation: '',
    noOfRotation: '',
    amount: '',
    payer: '',
    paymentMethod: '',
    reference: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('🔍 Submit clicked:', formData);

  try {
    const payload = { ...formData };
    console.log(' Sending payload:', payload);

    const response = await axios.post(
      'http://localhost:5000/api/re-expense/add',
      payload,
      
    );

    console.log('✅ Response:', response);
    toast.success('Expense Added Successfully');
  } catch (error) {
    console.error(' Axios Error:', error);
    const backendError =
      error.response?.data?.error ||
      error.response?.data?.message ||
      JSON.stringify(error.response?.data) ||
      'Something went wrong';

    toast.error(backendError);
  }
};


  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} />
      <ToastContainer position="top-right" />
      <div className="contact-layout">
        {sidebarVisible && <Sidebar />}
        <div className="contact-wrapper">
          <h4>Add Repeating Expense</h4>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-section">
              {/* Form Inputs */}
              <div className="form-group">
                <label>Date <span>*</span></label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Account <span>*</span></label>
                <input
                  type="text"
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Expense Type <span>*</span></label>
                <select name="expenseType" value={formData.expenseType} onChange={handleChange}>
                  <option value="">Select one</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Electric Bill">Electric Bill</option>
                  <option value="Office Rent">Office Rent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Rotation <span>*</span></label>
                <select name="rotation" value={formData.rotation} onChange={handleChange}>
                  <option value="">Select Rotation</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi Weekly">Bi Weekly</option>
                  <option value="Everyday">Everyday</option>
                  <option value="Every 30 days">Every 30 days</option>
                  <option value="Every 2 Month">Every 2 Month</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Every 6 Month">Every 6 Month</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number Of Rotation <span>*</span></label>
                <input
                  type="number"
                  name="noOfRotation"
                  value={formData.noOfRotation}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Amount $ <span>*</span></label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Payer</label>
                <select name="payer" value={formData.payer} onChange={handleChange}>
                  <option value="">Select one</option>
                  <option value="Jhon Doe">Jhon Doe</option>
                  <option value="HOST-1">HOST-1</option>
                  <option value="Rajib">Rajib</option>
                  <option value="Saurabh Patil">Saurabh Patil</option>
                </select>
              </div>

              <div className="form-group">
                <label>Payment Method <span>*</span></label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="">Select one</option>
                  <option value="Cash">Cash</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bkash">Bkash</option>
                  <option value="Stripe">Stripe</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Pix">Pix</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reference</label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Note</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit">
                <i className="fas fa-save"></i> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddReExpense;
