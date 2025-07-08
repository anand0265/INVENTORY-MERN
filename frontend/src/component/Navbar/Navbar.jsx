import React from 'react';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';



const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">Inventory</span>
        <FaBars className="menu-icon" onClick={onToggleSidebar} />
      </div>

    
      <div className="navbar-right">
         <FaUserCircle className="admin-icon" />
  <span className="admin-name">Admin</span>
      </div>
     
    </nav>
  );
};

export default Navbar;
