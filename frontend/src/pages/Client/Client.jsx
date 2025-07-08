import React, { useState, useEffect } from 'react';
import './Client.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Client = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const [formData, setFormData] = useState({
    profile_type: 'Company',
    company_name: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    country: '',
    group: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/client/add', formData);
      toast.success('Client added successfully!');
      setTimeout(() => navigate(-1), 2000); // go back after 2s
    } catch (error) {
      toast.error('Failed to add client');
      console.error(error);
    }
  };

  return (
    <div className="client-wrapper" style={{ position: 'fixed', top: 170, left: 350, background: 'red', width: 700, height: 300, zIndex: 9999 }}>
      <ToastContainer position="top-right" />
      <div className="client-box">
        <div className="client-header">
          <h2>Add Client</h2>
          <button className="close-btn" onClick={handleClose}>&times;</button>
        </div>

        <form className="client-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row">
            <div className="input-box">
              <label>Profile Type <span className="required">*</span></label>
              <select name="profile_type" value={formData.profile_type} onChange={handleChange} required>
                <option value="Company">Company</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
            <div className="input-box">
              <label>Company Name</label>
              <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="input-box">
              <label>Contact Name <span className="required">*</span></label>
              <input type="text" name="contact_name" value={formData.contact_name} onChange={handleChange} required />
            </div>
            <div className="input-box">
              <label>Contact Phone</label>
              <input type="text" name="contact_phone" value={formData.contact_phone} onChange={handleChange} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="row">
            <div className="input-box">
              <label>Contact Email <span className="required">*</span></label>
              <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} required />
            </div>
            <div className="input-box">
              <label>Country</label>
              <select name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="row">
            <div className="input-box group-box">
              <label>
                Group
                <button type="button" className="add-group-btn">+ Add New</button>
              </label>
              <select name="group" value={formData.group} onChange={handleChange}>
                <option value="">- Select Group -</option>
                <option value="Customer">Customer</option>
                <option value="Partner">Partner</option>
              </select>
            </div>
            <div className="input-box"></div>
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button type="submit" className="save-btn">💾 Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Client;
