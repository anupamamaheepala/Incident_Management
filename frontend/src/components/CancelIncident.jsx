import React, { useState } from "react";
import Modal from "react-modal";

// Set up the modal root
Modal.setAppElement("#root");

const CancelIncident = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleDecline = () => {
    alert("Incident canceled!");
    closeModal();
  };

  return (
    <div>
      {/* Button to trigger the modal */}
      <button onClick={openModal} style={styles.button}>
        Cancel Incident
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
            borderRadius: "8px",
            border: "none",
          },
        }}
      >
        <div style={styles.modalContent}>
          <div style={styles.icon}>
            <span style={styles.alertIcon}>⚠️</span>
          </div>
          <h2 style={styles.header}>Cancel Incident</h2>
          <p style={styles.text}>
            Are you sure you want to cancel this Incident? This action cannot be undone.
          </p>
          <div style={styles.buttons}>
            <button onClick={closeModal} style={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={handleDecline} style={styles.okButton}>
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modalContent: {
    textAlign: "center",
  },
  icon: {
    marginBottom: "20px",
  },
  alertIcon: {
    fontSize: "30px",
    color: "#FF6347",
  },
  header: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  text: {
    marginBottom: "20px",
    fontSize: "16px",
    color: "#555",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    width : "100px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  okButton: {
    padding: "10px 20px",
    backgroundColor: "#FF6347",
    width : "100px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CancelIncident;
