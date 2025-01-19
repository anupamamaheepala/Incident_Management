import React, { useState, useEffect } from "react";
import { Table, Tag, Tooltip, Input, Card, Row, Col } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/admin.css";

const incidentTypes = [
  { title: "Billing and Payment Issues", type: "Billing and payment" },
  { title: "Service Interruptions", type: "Service interruption" },
  { title: "SIM Issues", type: "SIM issue" },
  { title: "Service Requests", type: "Service Requests" },
  { title: "Customer Portal Issues", type: "Customer Portal Issue" },
  { title: "Device Related Issues", type: "Device Related Issue" },
];

function AdminTeams() {
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    navigate(`/admin/incidents/${type}`);
  };

  return (
    <div className="admin-teams-container">
      <div className="bg-image">
        <div className="new-header">
          <h5>All Teams</h5>
        </div>
        <div className="admin-cards-container">
          <Row gutter={[20, 20]}>
            {incidentTypes.map((type, index) => (
              <Col xs={24} sm={12} md={12} key={index}>
                <Card
                  title={type.title}
                  bordered
                  hoverable
                  onClick={() => handleCardClick(type.type)}
                >
                  <p>Click to view incidents under this type.</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default AdminTeams;