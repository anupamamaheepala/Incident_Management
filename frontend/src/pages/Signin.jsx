import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/signin.css";
import { GoogleLogin } from "react-google-login";
import { Divider, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/Context";

function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      const { user_id } = response.data;
      login(user_id);
      Swal.fire({
        position: "top",
        icon: "success",
        showConfirmButton: false,
        title: response.data.message,
        timer: 1500
      });
      navigate("/");
      // Handle successful login (e.g., store token or redirect)
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid email or password",
      });
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { tokenId } = response;
      await axios.post("http://localhost:5000/auth/google", { token: tokenId });

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  // Handle Google login failure
  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
    Swal.fire({
      icon: "error",
      title: "Google Login Failed",
      text: "Please try again later.",
    });
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
            {/* <button type="button" className="signin-btn-facebook">
              Facebook
            </button>
            <button type="button" className="signin-btn-google">
              Google
            </button> */}
            <GoogleLogin
              clientId="6623246348-05rh90iudbrog6a75f6us0hkom6bu2rt.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Signin;
