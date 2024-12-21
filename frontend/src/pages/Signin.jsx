import React from 'react';
import '../css/signin.css';
import { Divider, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Signin() {
  return (
    <>
      <Header />
      <div className="signin-container">
        <form className="signin-form">
          <h2 className="signin-title">Hi, Welcome Back</h2>
          <p className="signin-subtitle">Enter your credentials to continue</p>
          
          <div className="signin-form-group">
            <input 
              type="email" 
              id="signin-email" 
              placeholder="Email" 
              required 
              className="signin-input"
            />
          </div>
          <div className="signin-form-group">
            <input 
              type="password" 
              id="signin-password" 
              placeholder="Password" 
              required 
              className="signin-input"
            />
          </div>
          
          <div className="signin-options">
            <label className="signin-remember">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password" className="signin-forgot-password">
              Forgot Password
            </a>
          </div>
          
          <button type="submit" className="signin-btn">
            Login
          </button>
          
          <p className="signin-signup-link">
            Don’t have an account? <a href="/signup">Signup</a>
          </p>

          <div className="signin-divider">
                        <Divider>
                            <Typography variant="caption">
                                Or Login With
                            </Typography>
                        </Divider>
          </div>

          <div className="signin-social-buttons">
            <button type="button" className="signin-btn-facebook">
              Facebook
            </button>
            <button type="button" className="signin-btn-google">
              Google
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Signin;
