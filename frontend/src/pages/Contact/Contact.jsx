import React, { useState } from 'react';
import './Contact.css';
import Sidebar from '../../component/Sidebar/Sidebar';
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    profileType: '',
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    country: '',
    group: '',
    city: '',
    state: '',
    zip: '',
    address: '',
    remarks: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    loginName: '',
    loginEmail: '',
    loginPassword: '',
    confirmPassword: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileType || !formData.contactName || !formData.contactEmail) {
      toast.error('Please fill all required fields.');
      return;
    }

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });
      if (imageFile) payload.append('image', imageFile);
      payload.append('loginEnabled', loginEnabled);

      const response = await axios.post('http://localhost:5000/api/contacts/add', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Contact saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const [imageFile, setImageFile] = useState(null);
  const [loginEnabled, setLoginEnabled] = useState(false);
  const handleLoginCheckboxChange = (e) => setLoginEnabled(e.target.checked);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="contact-layout">
        {sidebarVisible && <Sidebar />}
        <div className="contact-wrapper">
          <h2>Add New Contact</h2>
          <form className="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-section">
              <div className="form-group">
                <label>Profile Type *</label>
                <select name="profileType" value={formData.profileType} onChange={handleChange}>
                  <option value="">-- Select Profile Type --</option>
                  <option value="Company">Company</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Enter company name" />
              </div>
              <div className="form-group">
                <label>Contact Name *</label>
                <input name="contactName" value={formData.contactName} onChange={handleChange} type="text" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label>Contact Email *</label>
                <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" placeholder="Email Address" />
              </div>
              <div className="form-group">
                <label>Contact Phone</label>
                <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} type="text" placeholder="Phone Number" />
              </div>
              <div className="form-group">
                <label>Country</label>
                <select name="country" value={formData.country} onChange={handleChange}>
                  <option value="">-- Select Country --</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                </select>
              </div>
              <div className="form-group">
                <label>Group</label>
                <input name="group" value={formData.group} onChange={handleChange} type="text" placeholder="Group" />
              </div>
              <div className="form-group">
                <label>City</label>
                <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="City" />
              </div>
              <div className="form-group">
                <label>State</label>
                <input name="state" value={formData.state} onChange={handleChange} type="text" placeholder="State" />
              </div>
              <div className="form-group">
                <label>Zip</label>
                <input name="zip" value={formData.zip} onChange={handleChange} type="text" placeholder="Zip Code" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address"></textarea>
              </div>
              <div className="form-group">
                <label>Remarks</label>
                <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks"></textarea>
              </div>
              <div className="form-group">
                <label>Facebook</label>
                <input name="facebook" value={formData.facebook} onChange={handleChange} type="text" placeholder="Facebook profile link" />
              </div>
              <div className="form-group">
                <label>Twitter</label>
                <input name="twitter" value={formData.twitter} onChange={handleChange} type="text" placeholder="Twitter handle" />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input name="linkedin" value={formData.linkedin} onChange={handleChange} type="text" placeholder="LinkedIn profile link" />
              </div>
            </div>

            <div className="sidebar-section">
              <div className="form-group file-upload">
                <label>Contact Image</label>
                <div className="file-box">
                  {imagePreview ? (
                    <div className="image-preview-wrapper">
                      <img src={imagePreview} alt="Preview" className="preview-img" />
                    </div>
                  ) : (
                    <span>📤 Drag and drop a file here or click</span>
                  )}
                  <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                  {imagePreview && (
                    <button type="button" className="remove-btn" onClick={handleImageRemove}>X</button>
                  )}
                </div>
              </div>

              <div className="login-details">
                <label>
                  <input
                    type="checkbox"
                    checked={loginEnabled}
                    onChange={handleLoginCheckboxChange}
                  /> Login Details
                </label>
                <div className="form-group">
                  <label>Name</label>
                  <input name="loginName" value={formData.loginName} onChange={handleChange} type="text" disabled={!loginEnabled} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="loginEmail" value={formData.loginEmail} onChange={handleChange} type="email" disabled={!loginEnabled} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="loginPassword" value={formData.loginPassword} onChange={handleChange} type="password" disabled={!loginEnabled} />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" disabled={!loginEnabled} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} disabled={!loginEnabled}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit"><i className="fas fa-save"></i> Save Contact</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
