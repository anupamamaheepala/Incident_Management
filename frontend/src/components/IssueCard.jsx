import React, { useState } from "react";
import "../css/IssueCard.css";
import ReportIncidentModal from "./ReportIncidentModal"; // Import the modal component

const IssueCard = ({ title, issues, buttonText, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="card">
      <h3>{title}</h3>
      <ul>
        {issues.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ul>
      <div className="card-image">
        {image && <img src={image} alt={title} className="issue-image" />}
      </div>
      <button className="report-btn" onClick={openModal}>
        {buttonText}
      </button>
      {/* Include the modal */}
      <ReportIncidentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default IssueCard;
