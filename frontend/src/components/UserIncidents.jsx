import React, { useState, useEffect } from "react";
import { Table, Tag, Tooltip  } from "antd";
import axios from "axios";
import "../css/userProfile.css";

const UserIncidents = () => {
  const [incidentData, setIncidentData] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const userId = localStorage.getItem("user_id"); // Get logged-in user ID
        const response = await axios.get(`http://localhost:5000/incidents/${userId}`);
        setIncidentData(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "NIC",
      dataIndex: "nic",
      key: "nic",
    },
    {
      title: "Connection Number",
      dataIndex: "connectionNumber",
      key: "connectionNumber",
    },
    {
      title: "Incident Type",
      dataIndex: "incidentType",
      key: "incidentType",
    },
    {
        title: "Incident Description",
        dataIndex: "description",
        key: "description",
        render: (text) => (
          <Tooltip title={text}>
            {text.length > 30 ? `${text.substring(0, 30)}...` : text}
          </Tooltip>
        ),
      },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "green";
        if (status === "Declined") {
          color = "red";
        } else if (status === "Pending") {
          color = "orange";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="admin-reports-container">
      <div className="bg-image">
        <div className="new-header">
          <h5>My Incident Reports</h5>
        </div>
        <div style={{ width: "100%" }}>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={incidentData}
              pagination={{ pageSize: 5 }}
              rowKey="_id"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIncidents;
