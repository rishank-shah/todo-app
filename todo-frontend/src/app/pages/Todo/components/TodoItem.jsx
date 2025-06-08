import { useState } from "react";
import { useTodos } from "../providers";
import STATUS from "../constants/status";
import EditIcon from "../../../components/icons/EditIcon";
import DeleteIcon from "../../../components/icons/DeleteIcon";
import HeartButton from "../../../components/buttons/HeartButton";
import ConfirmDialog from "../../../components/ConfirmationDialog";

const STATUS_COLOR_MAP = {
  in_progress: "white",
  complete: "#8cfc65",
  on_hold: "#e6fc57",
};

export default function TodoItem({ todo }) {
  const { state, dispatch, deleteTodo, updateTodo } = useTodos();

  const [form, setForm] = useState({
    ...todo,
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isSelected = state.selectedTodoIds.includes(todo.id);

  return (
    <div style={styles.todoItem}>
      <div style={styles.todoItemContent}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() =>
            dispatch({
              type: "TOGGLE_SELECT",
              payload: {
                id: todo.id,
              },
            })
          }
        />
        {todo.isEditing ? (
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTodo(todo.id, {
                  title: form.title,
                  status: form.status,
                  categoryId: form.categoryId,
                  bookmarked: form.bookmarked,
                });
              }
            }}
            style={{ ...styles.input, flexGrow: 1 }}
            autoFocus
          />
        ) : (
          <span
            style={{
              ...styles.todoTitle,
              display: "inline-block",
              backgroundColor: STATUS_COLOR_MAP[todo.status],
            }}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div style={styles.todoActions}>
        <select
          value={todo.status}
          onChange={(e) => {
            updateTodo(todo.id, {
              title: todo.title,
              categoryId: todo.categoryId,
              status: e.target.value,
              bookmarked: todo.bookmarked,
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
          onClick={() =>
            dispatch({
              type: "UPDATE_TODO",
              payload: {
                id: todo.id,
                isEditing: !todo.isEditing,
              },
            })
          }
        >
          <EditIcon />
        </button>
        <button
          style={styles.iconButton}
          onClick={() => {
            setShowDialog(true);
          }}
        >
          <DeleteIcon />
        </button>
        <div style={styles.iconButton}>
          <HeartButton
            onClick={() => {
              updateTodo(todo.id, {
                title: todo.title,
                status: todo.status,
                categoryId: todo.categoryId,
                bookmarked: !todo.bookmarked,
              });
            }}
            filled={todo.bookmarked}
          />
        </div>
      </div>
      {showDialog && (
        <ConfirmDialog
          title="Delete todo"
          description={`You are about to delete the todo '${todo.title}'. If you proceed with this action IDFY TODO will permanently delete the todo and recovery is not possible.`}
          onSubmit={() => {
            deleteTodo(todo.id);
            setShowDialog(false);
          }}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e9ecef",
  },
  todoItemContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexGrow: 1,
  },
  todoTitle: {
    flexGrow: 0,
  },
  todoActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statusSelect: {
    padding: "4px 8px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    fontSize: "12px",
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
};
