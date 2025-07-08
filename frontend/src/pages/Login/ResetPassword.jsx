import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(err.response.data.message || 'Error resetting password');
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleReset}>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
