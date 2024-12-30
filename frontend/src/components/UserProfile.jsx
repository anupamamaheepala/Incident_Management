import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Tag } from "antd";
import Link from "antd/es/typography/Link";
import profileImg from "../images/profileImg.png";
import "../css/userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:5000/auth/get-user/${userId}`)
        .then((response) => setUser(response.data.user))
        .catch((error) => console.error("Error fetching user:", error));
    } else {
      navigate("/signin"); // Redirect to signin if user is not logged in
    }
  }, [navigate]);

  const handleEditProfile = () => {
    navigate("/userProfile/UserSettings");
  };

  return (
    <div className="container">
      <div className="bg-image">
        <div className="profile-info">
          <img
            alt="Profile"
            style={{
              marginTop: "5px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
            }}
            src={profileImg}
          />
          <div className="btn-container">
            <button
              className="btn btn-primary edit"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </div>
          <h2>
            {user.first_name || "First Name"} {user.last_name || "Last Name"}
          </h2>
          <p>
            <strong>Email:</strong>{" "}
            <span>
              <a href={`mailto:${user.email || ""}`}>{user.email || "N/A"}</a>
            </span>
          </p>
        </div>
      </div>

      <div className="banner_for_update_details">
        {!user.first_name && !user.last_name && (
          <div className="banner">
            <Tag className="tag" color="red">
              Please fill out all required fields. Click
              <Link href="/userProfile/UserSettings"> here </Link>
              to update your info.
            </Tag>
          </div>
        )}
      </div>

      <div
        className="add_user_details_container_right"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          marginBottom: "40px",
        }}
      >
        {/* First Name and Last Name */}
        <div style={{ display: "flex", marginTop: "15px" }}>
          <div style={{ marginRight: "8px", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "3px", fontSize: "12px" }}>
                First Name
              </span>
              <Input
                size="large"
                style={{ width: "340px", marginRight: "40px" }}
                value={user.first_name || ""}
                readOnly
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "3px", fontSize: "12px" }}>
                Last Name
              </span>
              <Input
                size="large"
                style={{ width: "340px", marginRight: "40px" }}
                value={user.last_name || ""}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Email and Phone */}
        <div style={{ display: "flex", marginTop: "20px" }}>
          <div style={{ marginRight: "8px", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "3px", fontSize: "12px" }}>Email</span>
              <Input
                size="large"
                style={{ width: "340px", marginRight: "40px" }}
                value={user.email || ""}
                readOnly
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "3px", fontSize: "12px" }}>
                Phone Number
              </span>
              <Input
                size="large"
                style={{ width: "340px", marginRight: "40px" }}
                value={user.phone || ""}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* NIC and Address */}
        <div style={{ display: "flex", marginTop: "20px" }}>
          <div style={{ marginRight: "8px", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "3px", fontSize: "12px" }}>NIC</span>
              <Input
                size="large"
                style={{ width: "340px", marginRight: "40px" }}
                value={user.nic || ""}
                readOnly
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "3px", fontSize: "12px" }}>
                Address
              </span>
              <Input
                size="large"
                style={{ width: "340px", marginRight: "40px" }}
                value={user.address || ""}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Province and Postal Code */}
        <div style={{ display: "flex", marginTop: "20px" }}>
          <div style={{ marginRight: "8px", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "3px", fontSize: "12px" }}>
                Province
              </span>
              <Input
                size="large"
                style={{ width: "340px", marginRight: "40px" }}
                value={user.province || ""}
                readOnly
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ marginBottom: "3px", fontSize: "12px" }}>
                Postal Code
              </span>
              <Input
                size="large"
                style={{ width: "340px", marginRight: "40px" }}
                value={user.postalCode || ""}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
