import React from "react";

const ConfirmDialog = ({ title, description, onSubmit, onCancel }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <div style={styles.header}>
          <span style={styles.icon}>⚠️</span>
          <h2>{title}</h2>
        </div>
        <p style={styles.description}>{description}</p>
        <div style={styles.actions}>
          <button style={styles.deleteButton} onClick={onSubmit}>
            Delete
          </button>
          <button style={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  box: {
    background: "#fff",
    padding: "20px 24px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },
  icon: {
    fontSize: "20px",
    color: "red",
    marginRight: "8px",
  },
  description: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    background: "none",
    color: "#555",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};
