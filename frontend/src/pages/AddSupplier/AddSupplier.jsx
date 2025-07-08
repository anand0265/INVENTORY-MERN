import React, { useState } from 'react';
import './AddSupplier.css';
import Navbar from '../../component/Navbar/Navbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSupplier = () => {
  const usenavigate = useNavigate();
  const [formData, setFormData] = useState({
    supplierName: '',
    companyName: '',
    vatNumber: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const buttonClik = () => {
   const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ''
    );

    if (allFieldsFilled) {
      console.log('Form submitted:', formData);
      setTimeout(()=>{
usenavigate('/supplier-list'); 
      },3000)
      
    } else {
      alert('Please fill all fields');
    }
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.supplierName ||
      !formData.companyName ||
      !formData.vatNumber ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.country ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      toast.error('Please provide all fields');
      return;
    }

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      const response = await axios.post(
        'https://inventory-mern-oh02.onrender.com/api/supplier/add',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success('Supplier Added Successfully');
    } catch (error) {
      const backendError =
    error.response?.data?.error || 
    error.response?.data?.message || 
    error.response?.data?.error?.phone?.message || 
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
          <h2>Add New Supplier</h2>
          <form className="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-section">
              <div className="form-group">
                <label>Supplier Name *</label>
                <input
                  type="text"
                  name="supplierName"
                  placeholder="Enter supplier name"
                  onChange={handleChange}
                  value={formData.supplierName}
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  onChange={handleChange}
                  value={formData.companyName}
                />
              </div>
              <div className="form-group">
                <label>Vat Number</label>
                <input
                  type="text"
                  name="vatNumber"
                  placeholder="Enter Vat Number"
                  onChange={handleChange}
                  value={formData.vatNumber}
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <select
                  name="country"
                  onChange={handleChange}
                  value={formData.country}
                >
                  <option value="">-- Select Country --</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Brazil</option>
                  <option>Canada</option>
                  <option>Japan</option>
                  <option>South Africa</option>
                  <option>United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  onChange={handleChange}
                  value={formData.city}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="Enter State"
                  onChange={handleChange}
                  value={formData.state}
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Enter Postal code"
                  onChange={handleChange}
                  value={formData.postalCode}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" onClick={buttonClik}>
                <i className="fas fa-save"></i> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSupplier;
