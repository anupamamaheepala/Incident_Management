import React from "react";
import Modal from "react-modal";
import "../css/reportIncident.css"; // Add a CSS file for custom styles

Modal.setAppElement("#root");

const ReportIncidentModal = ({ isOpen, onClose }) => {
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
      <form className="report-form">
        <div className="form-row">
          <label>Customer ID</label>
          <input
            className="form-input"
            type="text"
            name="customerId"
            value="1"
            readOnly
          />
        </div>
        <div className="form-row">
          <label>Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="eg:-hasi"
            
          />
        </div>
        <div className="form-row">
          <label>Connection Number</label>
          <input
            className="form-input"
            type="text"
            name="connectionNumber"
            placeholder="eg:-0712536984"
            
          />
        </div>
        <div className="form-row">
          <label>NIC</label>
          <input
            className="form-input"
            type="text"
            name="nic"
            placeholder="eg:-199875836v"
            
          />
        </div>
        <div className="form-row">
          <label>Incident Type</label>
          <select className="form-input" name="incidentType" value="Billing and payment">
            <option value="Billing and payment">Billing and Payment</option>
            <option value="Service interruption">Service Interruption</option>
            <option value="SIM issue">SIM Issue</option>
            <option value="Service Requests">Service Requests</option>
            <option value="Customer Portal Issue">Customer portal Issue</option>
            <option value="Device Related Issue">Device Related Issue</option>
          </select>
        </div>
        <div className="form-row">
          <label>Incident Description</label>
          <textarea
            className="form-input"
            name="description"
            placeholder="Enter a brief description of the incident" 
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
