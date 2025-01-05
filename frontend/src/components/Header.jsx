import React from 'react';
import '../css/header.css';
import Swal from "sweetalert2";
import logo from '../images/SLTlogo.jpg'

const Header = () => {

  const handleProtectedNavigation = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "You should sign in before continuing",
      showConfirmButton: true,
    });
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav-menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/incidents" onClick={handleProtectedNavigation}>Incidents</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="signin"> <a href="/signin">Sign In</a></button>
        <button className="signup"> <a href="/signup">Sign Up</a></button>
      </div>
      
    </header>
    
  );
};

export default Header;
