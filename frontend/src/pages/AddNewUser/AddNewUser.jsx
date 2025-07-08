import React, { useState } from 'react';
import './AddNewUser.css';
import Sidebar from '../../component/Sidebar/Sidebar';
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewUser = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    userRole: '',
    status: '',
    profilePicture: null
  });

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, profilePicture: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      userType,
      userRole,
      status,
      profilePicture
    } = formData;

    if (!name || !email || !password || !confirmPassword || !userType || !userRole || !status) {
      toast.error('Please fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('confirmPassword', confirmPassword);
    data.append('userType', userType);
    data.append('userRole', userRole);
    data.append('status', status);
    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }

    try {
      const res = await axios.post('https://inventory-mern-oh02.onrender.com/api/user/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        
      });

      toast.success(res.data.message || 'User created successfully');

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
        userRole: '',
        status: '',
        profilePicture: null
      });
      setImagePreview(null);

    } catch (error) {
      console.error('Axios Error:', error);

  if (error.response) {
    console.error('Backend Response:', error.response.data);
  } else if (error.request) {
    console.error('No response from server:', error.request);
  } else {
    console.error('Error setting up request:', error.message);
  }

  const backendError =
    error.response?.data?.error ||
    error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    'Something went wrong';

  toast.error(backendError);
    }
  };

  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} />
      <ToastContainer position="top-right" />
      <div className="add-user-layout">
        {sidebarVisible && <Sidebar />}
        <div className="add-user-container">
          <h2>CREATE USER</h2>
          <form className="add-user-form" onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>User Type</label>
              <select name="userType" value={formData.userType} onChange={handleChange} required>
                <option value="">Select One</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            <div className="form-group role-row">
              <div className="role-select">
                <label>User Role</label>
                <select name="userRole" value={formData.userRole} onChange={handleChange} required>
                  <option value="">Select Role</option>
                  <option value="Accountant">Accountant</option>
                  <option value="General Roles">General Roles</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Select One</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group file-upload">
              <label>Profile Picture</label>
              <div className="file-box">
                {imagePreview ? (
                  <div className="image-preview-wrapper">
                    <img src={imagePreview} alt="Preview" className="preview-img" />
                  </div>
                ) : (
                  <span>📤 Drag and drop a file here or click</span>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <button type="button" className="remove-btn" onClick={handleImageRemove}>
                    X
                  </button>
                )}
              </div>
            </div>

            <button type="submit" className="create-btn">Create User</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewUser;
