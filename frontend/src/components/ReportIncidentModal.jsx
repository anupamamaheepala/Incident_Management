// import React, { useState } from "react";
// import Modal from "react-modal";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "../css/reportIncident.css";

// Modal.setAppElement("#root");

// const ReportIncidentModal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     connectionNumber: "",
//     nic: "",
//     incidentType: "Billing and payment",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userId = localStorage.getItem("user_id"); // Get the logged-in user ID
//       const response = await axios.post("http://localhost:5000/incidents/report", {
//         ...formData,
//         userId,
//         status: "Pending", // Default status
//       });

//       if (response.status === 201) {
//         Swal.fire({
//           icon: "success",
//           title: "Incident Reported Successfully",
//           showConfirmButton: true,
//         });
//         onClose(); // Close the modal
//       }
//     } catch (error) {
//       console.error("Error reporting incident:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Report Incident",
//         text: error.response?.data?.message || "An error occurred",
//       });
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Report Incident"
//       style={{
//         overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
//         content: {
//           width: "500px",
//           height: "fit-content",
//           margin: "auto",
//           borderRadius: "15px",
//           padding: "20px",
//         },
//       }}
//     >
//       <div className="modal-header">
//         <h2>Report Incident</h2>
//         <button className="close-button" onClick={onClose}>
//           ✖
//         </button>
//       </div>
//       <form className="report-form" onSubmit={handleSubmit}>
        
//         <div className="form-row">
//           <label>Name</label>
//           <input
//             className="form-input"
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required            
//           />
//         </div>
//         <div className="form-row">
//           <label>Email</label>
//           <input
//             className="form-input"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-row">
//           <label>Connection Number</label>
//           <input
//             className="form-input"
//             type="text"
//             name="connectionNumber"
//             placeholder="land line number"
//             value={formData.connectionNumber}
//             onChange={handleChange}
//             required            
//           />
//         </div>
//         <div className="form-row">
//           <label>NIC</label>
//           <input
//             className="form-input"
//             type="text"
//             name="nic"
//             value={formData.nic}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-row">
//           <label>Incident Type</label>
//           <select className="form-input"
//             name="incidentType"
//             value={formData.incidentType}
//             onChange={handleChange}>
//             <option value="Billing and payment">Billing and Payment</option>
//             <option value="Service interruption">Service Interruption</option>
//             <option value="SIM issue">SIM Issue</option>
//             <option value="Service Requests">Service Requests</option>
//             <option value="Customer Portal Issue">Customer portal Issue</option>
//             <option value="Device Related Issue">Device Related Issue</option>
//           </select>
//         </div>
//         <div className="form-row">
//           <label>Incident Description</label>
//           <textarea
//             className="form-input"
//             name="description"
//             placeholder="Enter a brief description of the incident"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button className="submit-button" type="submit">
//           Report
//         </button>
//       </form>
//     </Modal>
//   );
// };

// export default ReportIncidentModal;


import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/reportIncident.css";

Modal.setAppElement("#root");

const ReportIncidentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    connectionNumber: "",
    nic: "",
    incidentType: "Billing and payment",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("user_id"); // Get the logged-in user ID
      const dateTime = new Date().toISOString(); // Get the current date and time in ISO format
      const response = await axios.post("http://localhost:5000/incidents/report", {
        ...formData,
        userId,
        status: "Pending", // Default status
        dateTime, // Add the date and time
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Incident Reported Successfully",
          showConfirmButton: true,
        });
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error reporting incident:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Report Incident",
        text: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Report Incident"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        content: {
          width: "500px",
          height: "fit-content",
          margin: "auto",
          borderRadius: "15px",
          padding: "20px",
        },
      }}
    >
      <div className="modal-header">
        <h2>Report Incident</h2>
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
      </div>
      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Connection Number</label>
          <input
            className="form-input"
            type="text"
            name="connectionNumber"
            placeholder="Landline number"
            value={formData.connectionNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>NIC</label>
          <input
            className="form-input"
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Incident Type</label>
          <select
            className="form-input"
            name="incidentType"
            value={formData.incidentType}
            onChange={handleChange}
          >
            <option value="Billing and payment">Billing and Payment</option>
            <option value="Service interruption">Service Interruption</option>
            <option value="SIM issue">SIM Issue</option>
            <option value="Service Requests">Service Requests</option>
            <option value="Customer Portal Issue">Customer Portal Issue</option>
            <option value="Device Related Issue">Device Related Issue</option>
          </select>
        </div>
        <div className="form-row">
          <label>Incident Description</label>
          <textarea
            className="form-input"
            name="description"
            placeholder="Enter a brief description of the incident"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Report
        </button>
      </form>
    </Modal>
  );
};

export default ReportIncidentModal;
