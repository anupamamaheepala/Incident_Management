import React, { useState } from "react";
import Modal from "react-modal";
import DeclineIncident from "../components/DeclineIncident";

// Set up the modal root
Modal.setAppElement("#root");

const AssignIncident = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const openDeclineModal = () => setIsDeclineOpen(true);
  const closeDeclineModal = () => setIsDeclineOpen(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      {/* Button to trigger the modal */}
      <button onClick={openModal} style={styles.button}>
      Action
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
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            border: "none",
          },
        }}
      >
        <div style={styles.modalContent}>
          <h2 style={styles.header}>Report Incident</h2>
          <div style={styles.buttons}>
            
            <button onClick={openDeclineModal}>
            <DeclineIncident isOpen = {isDeclineOpen} onclose = {closeDeclineModal} />
            </button>
            <button onClick={"closeModal"} style={styles.cancelButton}>
              Assign
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
    backgroundColor: "#4da8da",
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
    borderRadius: "5px",
    cursor: "pointer",
  },
  declineButton: {
    padding: "10px 20px",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AssignIncident;
