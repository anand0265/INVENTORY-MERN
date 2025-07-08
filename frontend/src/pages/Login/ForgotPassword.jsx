import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      toast.success('Reset link sent to your email');
    } catch (err) {
      toast.error(err.response.data.message || 'Error occurred');
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
