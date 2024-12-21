// import React from 'react';
// import '../css/signin.css';
// import { Divider, Typography } from '@mui/material';
// import Footer from '../components/Footer';
// import Header from '../components/Header';

// function Signin() {
//   return (
//     <>
//       <Header />
//       <div className="signin-container">
//         <form className="signin-form">
//           <h2 className="signin-title">Hi, Welcome Back</h2>
//           <p className="signin-subtitle">Enter your credentials to continue</p>
          
//           <div className="signin-form-group">
//             <input 
//               type="email" 
//               id="signin-email" 
//               placeholder="Email" 
//               required 
//               className="signin-input"
//             />
//           </div>
//           <div className="signin-form-group">
//             <input 
//               type="password" 
//               id="signin-password" 
//               placeholder="Password" 
//               required 
//               className="signin-input"
//             />
//           </div>
          
//           <div className="signin-options">
//             <label className="signin-remember">
//               <input type="checkbox" /> Remember me
//             </label>
//             <a href="/forgot-password" className="signin-forgot-password">
//               Forgot Password
//             </a>
//           </div>
          
//           <button type="submit" className="signin-btn">
//             Login
//           </button>
          
//           <p className="signin-signup-link">
//             Don’t have an account? <a href="/signup">Signup</a>
//           </p>

//           <div className="signin-divider">
//                         <Divider>
//                             <Typography variant="caption">
//                                 Or Login With
//                             </Typography>
//                         </Divider>
//           </div>

//           <div className="signin-social-buttons">
//             <button type="button" className="signin-btn-facebook">
//               Facebook
//             </button>
//             <button type="button" className="signin-btn-google">
//               Google
//             </button>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Signin;



import React, { useState } from "react";
import axios from "axios";
import "../css/signin.css";
import { Divider, Typography } from '@mui/material';
import Footer from "../components/Footer";
import Header from "../components/Header";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/auth/signin", {
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage(response.data.message);
      // Handle successful login (e.g., store token or redirect)
    } catch (error) {
      setErrors({ server: error.response?.data?.message || "Login failed" });
    }
  };

  return (
    <>
      <Header />
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2 className="signin-title">Hi, Welcome Back</h2>
          <p className="signin-subtitle">Enter your credentials to continue</p>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.server && <p className="error-message">{errors.server}</p>}

          <div className="signin-form-group">
            <input
              type="email"
              id="signin-email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="signin-input"
            />
          </div>
          <div className="signin-form-group">
            <input
              type="password"
              id="signin-password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="signin-input"
            />
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
