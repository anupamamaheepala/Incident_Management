// import React, { useState } from "react";
// import { Table, Tag, Space } from "antd";
// import { Icon } from "@iconify/react";
// import "../css/userProfile.css";
// import AssignIncident from "../components/AssignIncident";

// function AdminReports() {
//   const [isAssignOpen, setIsAssignOpen] = useState(false);
//   const openAssignModal = () => setIsAssignOpen(true);
//   const closeAssignModal = () => setIsAssignOpen(false);

//   // Dummy data for the table
//   const dataSource = [
//     {
//       key: "1",
//       customerID: "CUST001",
//       customeName: "John Doe",
//       nic: "991234567V",
//       connectionNumber: "0771234567",
//       incidentType: "Billing Issue",
//       status: "Not Assigned",
//     },
//     {
//       key: "2",
//       customerID: "CUST002",
//       customeName: "Jane Smith",
//       nic: "982345678V",
//       connectionNumber: "0772345678",
//       incidentType: "Service Interruption",
//       status: "Assigned",
//     },
//     {
//       key: "3",
//       customerID: "CUST003",
//       customeName: "Michael Lee",
//       nic: "973456789V",
//       connectionNumber: "0773456789",
//       incidentType: "SIM Issue",
//       status: "Completed",
//     },
//     {
//       key: "4",
//       customerID: "CUST004",
//       customeName: "Sarah Johnson",
//       nic: "964567890V",
//       connectionNumber: "0774567890",
//       incidentType: "Device Issue",
//       status: "Declined",
//     },
//   ];

//   const columns = [
//     {
//       title: "User ID",
//       dataIndex: "customerID",
//       key: "customerID",
//     },
//     {
//       title: "Name",
//       dataIndex: "customeName",
//       key: "customeName",
//     },
//     {
//       title: "NIC",
//       dataIndex: "nic",
//       key: "nic",
//     },
//     {
//       title: "Connection Number",
//       dataIndex: "connectionNumber",
//       key: "connectionNumber",
//     },
//     {
//       title: "Incident Type",
//       dataIndex: "incidentType",
//       key: "incidentType",
//     },
//     {
//       title: "Status",
//       key: "status",
//       dataIndex: "status",
//       render: (status) => {
//         let color = "green";
//         if (status === "Not Assigned") {
//           color = "orange";
//         } else if (status === "Declined") {
//           color = "red";
//         } else if (status === "Assigned") {
//           color = "blue";
//         }
//         return <Tag color={color}>{status}</Tag>;
//       },
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           {record.status === "Not Assigned" ? (
//             // Enable button for "Not Assigned" status
//             <>
//               <button onClick={openAssignModal}></button>
//               {/* Decline Modal */}
//               <AssignIncident
//                 isOpen={isAssignOpen}
//                 onClose={closeAssignModal}
//               />
//             </>
//           ) : (
//             // Disable button for other statuses
//             <>
//               <button
//                 disabled
//                 style={{
//                   fontSize: "20px",
//                   color: "#9D9D9D",
//                   border: "none",
//                   background: "transparent",
//                 }}
//               >
//                 <Icon icon="icon-park-outline:correct" />
//               </button>
//             </>
//           )}
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="container">
//       <div className="bg-image">
//         <div className="new-header">
//           <h5>Customer Reports</h5>
//         </div>
//         <div style={{ width: "100%" }}>
//           <div className="table-container">
//             <Table
//               columns={columns}
//               dataSource={dataSource} // Dummy data
//               pagination={{ pageSize: 5 }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminReports;


import React, { useState, useEffect } from "react";
import { Table, Tag, Tooltip } from "antd";
import axios from "axios";
import "../css/userProfile.css";

function AdminReports() {
  const [incidentData, setIncidentData] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/incidents/admin/incidents");
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
    <div className="container">
      <div className="bg-image">
        <div className="new-header">
          <h5>All Incident Reports</h5>
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
}

export default AdminReports;
