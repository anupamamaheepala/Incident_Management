// import React, { useState, useEffect } from "react";
// import { Table, Tag, Tooltip, Input, Card, Row, Col } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../css/admin.css";

// const incidentTypes = [
//   { title: "Billing and Payment Issues", type: "Billing and payment" },
//   { title: "Service Interruptions", type: "Service interruption" },
//   { title: "SIM Issues", type: "SIM issue" },
//   { title: "Service Requests", type: "Service Requests" },
//   { title: "Customer Portal Issues", type: "Customer Portal Issue" },
//   { title: "Device Related Issues", type: "Device Related Issue" },
// ];

// function AdminTeams() {
//   const navigate = useNavigate();

//   const handleCardClick = (type) => {
//     navigate(`/admin/incidents/${type}`);
//   };

//   return (
//     <div className="admin-teams-container">
//       <div className="bg-image">
//         <div className="new-header">
//           <h5>All Teams</h5>
//         </div>
//         <div className="admin-cards-container">
//           <Row gutter={[20, 20]}>
//             {incidentTypes.map((type, index) => (
//               <Col xs={24} sm={12} md={12} key={index}>
//                 <Card
//                   title={type.title}
//                   bordered
//                   hoverable
//                   onClick={() => handleCardClick(type.type)}
//                 >
//                   <p>Click to view incidents under this type.</p>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminTeams;

import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
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
  const [statusCounts, setStatusCounts] = useState({});

  // Normalize type names to ensure key consistency
  const normalizeType = (type) => type.toLowerCase().replace(/ /g, "");

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/incidents/status-counts");
        console.log("Fetched status counts:", response.data); // Debugging
        // Normalize the keys from the response to match frontend usage
        const normalizedCounts = {};
        for (const [key, value] of Object.entries(response.data)) {
          normalizedCounts[normalizeType(key)] = value;
        }
        setStatusCounts(normalizedCounts);
      } catch (error) {
        console.error("Error fetching status counts:", error);
      }
    };

    fetchStatusCounts();
  }, []);

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
                  <div style={{ textAlign: "left" }}>
                    <p>Pending = {statusCounts[normalizeType(type.type)]?.Pending || 0}</p>
                    <p>Completed = {statusCounts[normalizeType(type.type)]?.Completed || 0}</p>
                    <p>Declined = {statusCounts[normalizeType(type.type)]?.Declined || 0}</p>
                  </div>
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


