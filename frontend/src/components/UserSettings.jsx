import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, message, Upload, Modal, Button } from "antd";
import UserBasicInfo from "./UserBasicInfo";
import ChangePw from "./ChangePw";

function UserSettings() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:5000/auth/get-user/${userId}`)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          message.error("Failed to load user data.");
        });
    } else {
      message.error("User not logged in. Redirecting...");
      window.location.href = "/signin";
    }
  }, []);

  const handleSaveChanges = (updatedData) => {
    const userId = localStorage.getItem("user_id");
    setLoading(true);
    axios
      .put(`http://localhost:5000/auth/update-user/${userId}`, updatedData)
      .then(() => {
        setLoading(false);
        message.success("User details updated successfully!");
        window.location.href = "/userProfile"; // Redirect to user profile
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating user details:", error);
        message.error("Failed to update user details.");
      });
  };

  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem("user_id");
    try {
      await axios.delete(`http://localhost:5000/auth/delete-account/${userId}`); // Removed 'response'
      message.success("Account deleted successfully.");
      localStorage.removeItem("user_id");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      message.error("Error deleting account.");
    }
  };  
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleDeleteAccount();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container">
      <div className="genral-setting">
        <div className="Basic-info">
          <div className="setting-header">
            <h3 style={{ marginBottom: "20px" }}>Basic information</h3>
            <p style={{ marginBottom: "30px", color: "#637381" }}>
              Update some personal information. Your address will never be
              publicly available.
            </p>
            <UserBasicInfo user={user} onSave={handleSaveChanges} />
          </div>
        </div>
      </div>

      <div className="change-password">
        <div className="setting-header">
          <h4>Change Password</h4>
          <p>
            Update your password. We recommend using a strong password that you
            aren’t using elsewhere.
          </p>
        </div>
        <div className="change-password-form">
          <ChangePw />
        </div>

        <div className="pw-requirement">
          <h4>Password requirements</h4>
          <ul>
            <li>Minimum 8 characters long - the more, the better</li>
            <li>At least one lowercase character</li>
            <li>At least one uppercase character</li>
            <li>At least one number</li>
          </ul>
        </div>
      </div>

      <div className="delete-account-section">
        <Button type="primary" danger onClick={showModal}>
          Delete Account
        </Button>
        <Modal
          title="Confirm Account Deletion"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        </Modal>
      </div>
    </div>
  );
}

export default UserSettings;
