import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/signup.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match",
      });
      return;
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      Swal.fire({
        position: "top",
        icon: "success",
        showConfirmButton: false,
        title: response.data.message,
        timer: 1500
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
      navigate("/signin");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Signup failed",
      });
    }
  };

  const handleGoogleSuccess = async (response) => {
    console.log("Google login response:", response);
    const tokenId = response.tokenId;
    try {
      await axios.post("http://localhost:5000/auth/google", { token: tokenId });
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Signup Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Signup Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Signup Failed:", error);
    Swal.fire({
      icon: "error",
      title: "Google Signup Failed",
      text:
        error?.error === "popup_closed_by_user"
          ? "You closed the login popup. Please try again."
          : "Something went wrong. Please try again later.",
    });
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup-title">Sign up</h2>
          <p className="signup-subtitle">Enter your credentials to continue</p>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.server && <p className="error-message">{errors.server}</p>}

          <div className="signup-form-row">
            <div className="signup-form-group">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup-form-group">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-form-row">
            <div className="signup-form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup-form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-form-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <span className="signup-error">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="signup-form-group terms">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">
              I agree to all the <span style={{ color: "#ff8682" }}>Terms</span> and{" "}
              <span style={{ color: "#ff8682" }}>Privacy Policies</span>
            </label>
            {errors.terms && <span className="signup-error">{errors.terms}</span>}
          </div>

          <button type="submit" className="signup-btn-create-account">
            Create Account
          </button>

          <p className="signup-signin-link">
            Already have an account? <a href="/signin">Login</a>
          </p>

          <div className="signup-divider">
                         <Divider>
                             <Typography variant="caption">
                                 Or Login With
                             </Typography>
                         </Divider>
           </div>
          
           <div className="signup-social-buttons-con">
             {/* <button type="button" className="signup-btn-facebook-login">
               Facebook Account
             </button>
             <button type="button" className="signup-btn-google-login">
               Google Account
             </button> */}
             <GoogleLogin
              clientId="6623246348-05rh90iudbrog6a75f6us0hkom6bu2rt.apps.googleusercontent.com"
              buttonText="Sign Up with Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
              scope="openid email profile"
            />
           </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
