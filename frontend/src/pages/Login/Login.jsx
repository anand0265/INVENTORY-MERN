
import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.jpg'; 
import Navbar from '../../component/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRadioClick = () => {
    setRemember((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://inventory-mern-oh02.onrender.com/api/users/login', {
        email,
        password,
      });

      toast.success(res.data.message || 'Login successful ✅');

      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);

     setTimeout(() => {
  navigate('/dashboard');
}, 2000);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Logo" className="login-logo" />
          <h5>Login To Your Account</h5>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="remember-me">
              <input
                type="radio"
                id="remember"
                name="remember"
                checked={remember}
                onClick={handleRadioClick}
                readOnly
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className="login-button">Login</button>

            <p className="forgot-password">
              {/* <Link to="/forgot">Forgot password?</Link> */}
              <Link to="/reset-password/:token">Reset password?</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
