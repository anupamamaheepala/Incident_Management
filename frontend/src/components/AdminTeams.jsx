import React, { useState, useEffect } from "react";
import { Table, Tag, Tooltip, Input, Card, Row, Col } from "antd";
import axios from "axios";
import "../css/admin.css";

const incidentTypes = [
  { title: "Billing and Payment Issues", description: "Handle billing discrepancies and payment concerns." },
  { title: "Service Interruptions", description: "Manage internet, call drops, and connectivity issues." },
  { title: "SIM Issues", description: "Assist with SIM activation, deactivation, and replacements." },
  { title: "Service Requests", description: "Handle requests for new connections, upgrades, and more." },
  { title: "Customer Portal Issues", description: "Resolve issues with login, features, and app functionalities." },
  { title: "Device Related Issues", description: "Support for faulty devices and router issues." },
];

function AdminTeams() {
    return (
        <div className="admin-teams-container">
            <div className="bg-image">
            <div className="new-header">
              <h5>All Teams</h5>
            </div>
            <div className="admin-cards-container">
              <Row gutter={[30, 30]}>
                {incidentTypes.map((type, index) => (
                  <Col xs={24} sm={12} md={12} key={index}>
                    <Card title={type.title} bordered={true} hoverable>
                      <p>{type.description}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            </div>
        </div>
      );
}

export default AdminTeams