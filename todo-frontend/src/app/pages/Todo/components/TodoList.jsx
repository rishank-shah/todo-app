import { useTodos } from "../providers";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { state, updateTodoSequence } = useTodos();

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, dropIndex) => {
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    if (dragIndex === dropIndex) return;

    await updateTodoSequence(dragIndex, dropIndex);
  };

  if (state.todos.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        No tasks found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div style={styles.todoListContainer}>
      {state.todos.map((todo, index) => (
        <div
          key={todo.id}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  todoListContainer: {
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    overflow: "hidden",
  },
};
