import React from 'react';
import '../css/header.css';
import logo from '../images/SLTlogo.jpg'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav-menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/userProfile/UserIncidents">Incidents</a></li>
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
