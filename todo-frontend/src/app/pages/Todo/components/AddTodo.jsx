import { useState } from "react";
import { useTodos } from "../providers";
import { useNavigate } from "react-router-dom";
import ToastHelper from "../../../helpers/toast";

const initialState = {
  title: "",
  categoryId: "",
};

export default function AddTodoForm() {
  const navigate = useNavigate();
  const { state, addTodo } = useTodos();

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.title) {
      ToastHelper.ErrorToast("Title is required");
      return false;
    }

    if (!form.categoryId) {
      ToastHelper.ErrorToast("Category is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const isAdded = await addTodo(form);
      if (isAdded) {
        setForm(initialState);
      }
    }
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div>
            <label htmlFor="title" style={styles.label}>
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              style={styles.input}
              placeholder="Learn coding"
              required
            />
          </div>
          <div>
            <label htmlFor="categoryId" style={styles.label}>
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value={""}>Please select a category</option>
              {state.categories.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.displayName}
                </option>
              ))}
            </select>
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
            onClick={() => {
              setForm(initialState);
            }}
            style={{ ...styles.button, ...styles.resetButton }}
          >
            RESET
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/category");
            }}
            style={{ ...styles.button, ...styles.categoryButton }}
          >
            Categories
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
  categoryButton: {
    backgroundColor: "#007bff",
    color: "white",
  },
};
