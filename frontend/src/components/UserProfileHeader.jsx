import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/header.css';
import logo from '../images/SLTlogo.jpg'
import profileImg from "../images/profileImg.png";
import  Link from "antd/es/typography/Link";
<img src={profileImg} alt="Logo" />;

const UserProfileHeader = () => {

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:5000/auth/get-user/${userId}`)
        .then((response) => {
          setFirstName(response.data.user.first_name);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

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
      <div className="auth-buttons-pic">
        <Link href="/userProfile">
        <img
                    alt="profileImg"
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight:"220px"
                      
                    }}
                    src={profileImg}
                  />
        
        </Link>
      
      </div>
      {firstName && (
          <span className="user-firstname">{firstName}</span>
        )}
    </header>
    
  );
};

export default UserProfileHeader;
