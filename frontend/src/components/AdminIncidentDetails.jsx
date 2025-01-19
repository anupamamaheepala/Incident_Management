import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Tooltip } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/admin.css";
import AdminHeader from '../components/AdminHeader'

function AdminIncidentDetails() {
  const { incidentType } = useParams();
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        console.log(`Fetching incidents for type: ${incidentType}`); // Debugging print
        const response = await axios.get(`http://localhost:5000/incidents/type/${incidentType}`);
        console.log("Fetched incidents:", response.data); // Debugging print
        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
  
    fetchIncidents();
  }, [incidentType]);
  

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/incidents/${id}`, { status });
      setIncidents((prevIncidents) =>
        prevIncidents.map((incident) =>
          incident._id === id ? { ...incident, status } : incident
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
      title: "Connection Number",
      dataIndex: "connectionNumber",
      key: "connectionNumber",
    },
    {
      title: "NIC",
      dataIndex: "nic",
      key: "nic",
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
      render: (status) => (
        <Tag color={status === "Pending" ? "orange" : status === "Completed" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={() => handleStatusChange(record._id, "Completed")}
          >
            Complete
          </Button>
          <Button type="primary" danger onClick={() => handleStatusChange(record._id, "Declined")}>
            Decline
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
    <AdminHeader/>
    <div className="admin-incident-details-container">
        
        <h2>Incidents for: {incidentType.replace(/([A-Z])/g, " $1")}</h2>
        <Table columns={columns} dataSource={incidents} rowKey="_id" pagination={{ pageSize: 5 }} />
    </div>
    </>
  );
}

export default AdminIncidentDetails;
