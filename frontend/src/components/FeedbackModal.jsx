import React from "react";
import Modal from "react-modal";
import "../css/FeedbackModal.css"; // Add CSS for styling

Modal.setAppElement("#root");

const FeedbackModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Feedback"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        content: {
          width: "600px",
          height: "fit-content",
          margin: "auto",
          borderRadius: "15px",
          padding: "20px",
        },
      }}
    >
      <div className="modal-header">
        <h2>Feedback</h2>
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
      </div>
      <form className="feedback-form">
        <table className="feedback-table">
          <thead>
            <tr>
              <th></th>
              <th>Very Satisfied</th>
              <th>Satisfied</th>
              <th>Neutral</th>
              <th>Unsatisfied</th>
              <th>Very Unsatisfied</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>How satisfied are you with our product?</td>
              <td><input type="radio" name="product" value="very-satisfied" /></td>
              <td><input type="radio" name="product" value="satisfied" /></td>
              <td><input type="radio" name="product" value="neutral" /></td>
              <td><input type="radio" name="product" value="unsatisfied" /></td>
              <td><input type="radio" name="product" value="very-unsatisfied" /></td>
            </tr>
            <tr>
              <td>How satisfied are you with our service?</td>
              <td><input type="radio" name="service" value="very-satisfied" /></td>
              <td><input type="radio" name="service" value="satisfied" /></td>
              <td><input type="radio" name="service" value="neutral" /></td>
              <td><input type="radio" name="service" value="unsatisfied" /></td>
              <td><input type="radio" name="service" value="very-unsatisfied" /></td>
            </tr>
            <tr>
              <td>How satisfied are you with our team?</td>
              <td><input type="radio" name="team" value="very-satisfied" /></td>
              <td><input type="radio" name="team" value="satisfied" /></td>
              <td><input type="radio" name="team" value="neutral" /></td>
              <td><input type="radio" name="team" value="unsatisfied" /></td>
              <td><input type="radio" name="team" value="very-unsatisfied" /></td>
            </tr>
          </tbody>
        </table>
        <div className="form-row">
          <label>What are the suggestions for improvement?</label>
          <textarea
            className="form-input"
            name="suggestions"
            placeholder="Enter your suggestions here..."
          ></textarea>
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default FeedbackModal;
