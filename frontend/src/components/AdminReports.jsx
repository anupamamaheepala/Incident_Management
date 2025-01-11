import React, { useState, useEffect } from "react";
import { Table, Tag, Tooltip, Input } from "antd";
import axios from "axios";
import "../css/userProfile.css";

function AdminReports() {
  const [incidentData, setIncidentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/incidents/admin/incidents");
        setIncidentData(response.data);
        setFilteredData(response.data); // Initialize with all incidents
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = incidentData.filter((incident) =>
      incident.name.toLowerCase().includes(query) ||
      incident.email.toLowerCase().includes(query) ||
      incident.nic.toLowerCase().includes(query) ||
      incident.connectionNumber.toLowerCase().includes(query) ||
      incident.incidentType.toLowerCase().includes(query) ||
      incident.status.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
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
        if (status === "Not Assigned") {
          color = "blue";
        } else if (status === "Declined") {
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
          <h5>All Incident Reports</h5>
        </div>
        <div className="admin-search-bar-container">
          <Input
            placeholder="Search incidents..."
            value={searchQuery}
            onChange={handleSearch}
            className="admin-search-bar"
            allowClear
          />
        </div>
        <div style={{ width: "100%" }}>
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 5 }}
              rowKey="_id"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;
