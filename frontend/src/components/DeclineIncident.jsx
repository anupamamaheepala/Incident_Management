import React, { useState } from "react";
import Modal from "react-modal";

// Set up the modal root
Modal.setAppElement("#root");

const DeclineIncident = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleDecline = () => {
    alert("Incident Declined!");
    closeModal();
  };

  return (
    <div>
      {/* Button to trigger the modal */}
      <button onClick={openModal} style={styles.actionButton}>
        Decline
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            maxWidth: "400px",
            height: "250px",
            margin: "auto",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <div style={styles.modalContent}>
          <div style={styles.iconWrapper}>
            <span style={styles.alertIcon}>⚠️</span>
          </div>
          <h2 style={styles.header}>Decline Incident</h2>
          <p style={styles.description}>
            Are you sure you want to Decline this Incident? This action cannot
            be undone.
          </p>
          <div style={styles.buttonGroup}>
            <button onClick={closeModal} style={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={handleDecline} style={styles.declineButton}>
              Decline
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  actionButton: {
    padding: "10px 20px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  modalContent: {
    textAlign: "center",
  },
  iconWrapper: {
    marginBottom: "15px",
  },
  alertIcon: {
    fontSize: "40px",
    color: "#FF4D4F",
  },
  header: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  cancelButton: {
    flex: "1",
    padding: "10px 15px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #d9d9d9",
    borderRadius: "6px",
    color: "#333",
    cursor: "pointer",
    fontWeight: "500",
  },
  declineButton: {
    flex: "1",
    padding: "10px 15px",
    backgroundColor: "#FF4D4F",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default DeclineIncident;
