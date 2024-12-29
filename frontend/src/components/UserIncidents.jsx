

import React,{useState} from "react";
import { Input,Tag ,Table,Space} from "antd";
import { Icon } from "@iconify/react";
import profileImg from "../images/profileImg.png";
import "../css/userProfile.css";
import CancelIncident from "../components/CancelIncident";

const UserIncidents = () => {
const [isCancelOpen, setIsCanecelOpen] = useState(false);
const openCancelModal = () => setIsCanecelOpen(true);
const closeCancelModal = () => setIsCanecelOpen(false);

const dataSource = [
    {
      key: "1",
      customerID: "CUST001",
      customeName: "John Doe",
      nic: "991234567V",
      connectionNumber: "0771234567",
      incidentType: "Billing Issue",
      status: "Pending",
    },
    {
      key: "2",
      customerID: "CUST002",
      customeName: "Jane Smith",
      nic: "982345678V",
      connectionNumber: "0772345678",
      incidentType: "Service Interruption",
      status: "Pending",
    },
    {
      key: "3",
      customerID: "CUST003",
      customeName: "Michael Lee",
      nic: "973456789V",
      connectionNumber: "0773456789",
      incidentType: "SIM Issue",
      status: "Completed",
    },
    {
      key: "4",
      customerID: "CUST004",
      customeName: "Sarah Johnson",
      nic: "964567890V",
      connectionNumber: "0774567890",
      incidentType: "Device Issue",
      status: "Declined",
    },
  ];


const columns = [
    {
        title: "Incident ID",
        dataIndex: "customerID",
        key: "customerID",
    },
    {
        title: "Incident",
        dataIndex: "incident",
        key: "incident",
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
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                {record.status === "Pending" ? (
                    <>
                        <button
                            style={{
                                fontSize: "20px",
                                color: "#757171",
                                border: "none",
                                background: "transparent",
                            }}
                            onClick={openCancelModal}
                            
                        >
                            <CancelIncident isOpen = {isCancelOpen} onClose= {closeCancelModal} />
                            
                        </button>
                     
                    </>
                ) : (
                    <>
                        <button
                            disabled
                            style={{
                                fontSize: "20px",
                                color: "#9D9D9D",
                                border: "none",
                                background: "transparent",
                            }}
                        >
                            <Icon icon="icon-park-outline:correct" />
                        </button>
                        
                    </>
                )}
            </Space>
        ),
    },
];

  return (
    
    <div className="container">
      
      <div className="bg-image" >
                <div className="new-header">
                    <h5>My Incident Reports</h5>
                </div>
                <div style={{ width: "100%" }}>
                    <div className="table-container">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{ pageSize:5}}
                            // onChange={"handleTableChange"}
                        />
                    </div>
                </div>
            </div>
      
    </div>
  );
};
export default UserIncidents;
