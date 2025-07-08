import React, { useState } from 'react';
import './AddTransfer.css';
import Navbar from '../../component/Navbar/Navbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTransfer = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const [formData, setFormData] = useState({
    accountFrom: '',
    accountTo: '',
    date: '',
    amount: '',
    paymentMethod: '',
    reference: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { accountFrom, accountTo, date, amount, paymentMethod } = formData;

  // Validation
  if (!accountFrom || !accountTo || !date || !amount || !paymentMethod) {
    toast.error('Please fill all required fields');
    return;
  }

  try {
    const res = await axios.post('https://inventory-mern-oh02.onrender.com/api/transfer/add', formData);
    toast.success('Transfer added successfully');

    // Clear form after 3 seconds
    setTimeout(() => {
      setFormData({
        accountFrom: '',
        accountTo: '',
        date: '',
        amount: '',
        paymentMethod: '',
        reference: '',
        note: '',
      });
      navigate('/add-transfer')
    }, 3000);
  } catch (error) {
    const msg = error.response?.data?.message || 'Something went wrong';
    toast.error(msg);
  }
};


  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} />
      <ToastContainer position="top-right" />
      <div className="contact-layout">
        {sidebarVisible && <Sidebar />}
        <div className="contact-wrapper">
          <h2>Add New Transfer</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-group">
                <label>Account From *</label>
                <select name="accountFrom" value={formData.accountFrom} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Test-1">Test-1</option>
                  <option value="Test-2">Test-2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Account To *</label>
                <select name="accountTo" value={formData.accountTo} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Test-1">Test-1</option>
                  <option value="Test-2">Test-2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Amount $ *</label>
                <input type="text" name="amount" value={formData.amount} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Payment Method *</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="">Select one</option>
                  <option value="Cash">Cash</option>
                  <option value="Paypal">Paypal</option>
                  <option value="Credit card">Credit card</option>
                  <option value="Stripe">Stripe</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Reference</label>
                <input type="text" name="reference" value={formData.reference} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Note</label>
                <textarea name="note" className="form-control" value={formData.note} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit">
                <i className="fas fa-save"></i> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTransfer;
