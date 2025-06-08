import { useState } from "react";
import { useCategories } from "../providers";
import { useNavigate } from "react-router-dom";

const initialState = {
  displayName: "",
  categoryName: "",
};

export default function AddCategoryForm() {
  const navigate = useNavigate();

  const { addCategory } = useCategories();

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addCategory(form);

    setForm(initialState);
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div>
            <label htmlFor="displayName" style={styles.label}>
              Display Name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={form.displayName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Type..."
              required
            />
          </div>
          <div>
            <label htmlFor="categoryName" style={styles.label}>
              Category Name
            </label>
            <input
              id="categoryName"
              name="categoryName"
              type="text"
              value={form.categoryName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Type..."
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            style={{ ...styles.button, ...styles.submitButton }}
          >
            SUBMIT
          </button>
          <button
            type="button"
            onClick={() => setForm(initialState)}
            style={{ ...styles.button, ...styles.resetButton }}
          >
            RESET
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/todo");
            }}
            style={{ ...styles.button, ...styles.todoButton }}
          >
            Back to Todo
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: "24px",
    backgroundColor: "#fff",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    marginBottom: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  formGrid: {
    display: "grid",
    columnTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "4px",
    color: "#495057",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "white",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "white",
    marginRight: "8px",
  },
  resetButton: {
    backgroundColor: "#e9ecef",
    color: "#495057",
    marginRight: "8px",
  },
  todoButton: {
    backgroundColor: "#007bff",
    color: "white",
  },
};
