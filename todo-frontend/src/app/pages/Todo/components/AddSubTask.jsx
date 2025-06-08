import { useState } from "react";
import STATUS from "../constants/status";
import { useTodos } from "../providers";

const initialState = {
  title: "",
  status: STATUS.list[0].value,
};

export default function AddSubTaskForm({ todo }) {
  const { addSubTask } = useTodos();

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <input
        name="title"
        type="text"
        placeholder="Enter subtask title"
        value={form.title}
        onChange={handleChange}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            const isSubTaskAdded = await addSubTask({
              ...form,
              todoId: todo.id,
            });
            if (isSubTaskAdded) {
              setForm(initialState);
            }
          }
        }}
        style={styles.input}
        autoFocus
      />
      <button style={styles.resetButton} onClick={() => setForm(initialState)}>
        Reset
      </button>
    </div>
  );
}

const styles = {
  input: {
    width: "50%",
    padding: "8px 12px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  resetButton: {
    padding: "8px 12px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginLeft: "8px",
  },
  addButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginLeft: "8px",
  },
};
