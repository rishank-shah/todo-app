import { useState } from "react";
import { useTodos } from "../providers";
import STATUS from "../constants/status";
import EditIcon from "../../../components/icons/EditIcon";
import DeleteIcon from "../../../components/icons/DeleteIcon";

export default function SubTaskItem({ subTask }) {
  const { dispatch, updateSubTask, deleteSubTask } = useTodos();
  const [form, setForm] = useState({
    ...subTask,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.subTaskItem}>
      <div style={styles.subTaskItemContent}>
        {subTask.isEditing ? (
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateSubTask(subTask.id, {
                  title: form.title,
                  status: subTask.status,
                  todoId: form.todoId,
                });
              }
            }}
            style={{ ...styles.input, flexGrow: 1 }}
            autoFocus
          />
        ) : (
          <span style={styles.subTaskTitle}>{subTask.title}</span>
        )}
      </div>
      <div style={styles.categoryActions}>
        <select
          value={subTask.status}
          onChange={(e) => {
            updateSubTask(subTask.id, {
              title: subTask.title,
              status: e.target.value,
              todoId: subTask.todoId,
            });
          }}
          style={styles.statusSelect}
        >
          {STATUS.list.map((i) => (
            <option key={i.value} value={i.value}>
              {i.displayName}
            </option>
          ))}
        </select>
        <button
          style={styles.iconButton}
          onClick={() => {
            dispatch({
              type: "UPDATE_SUBTASK",
              payload: {
                id: subTask.id,
                todoId: subTask.todoId,
                isEditing: !subTask.isEditing,
              },
            });
          }}
        >
          <EditIcon />
        </button>
        <button
          style={styles.iconButton}
          onClick={() => deleteSubTask(subTask.id, subTask.todoId)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

const styles = {
  input: {
    padding: "8px 12px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  subTaskItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e9ecef",
  },
  subTaskItemContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexGrow: 1,
  },
  subTaskTitle: {
    flexGrow: 1,
  },
  categoryActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
};
