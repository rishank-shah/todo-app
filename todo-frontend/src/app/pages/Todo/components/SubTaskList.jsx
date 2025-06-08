import SubTaskItem from "./SubTaskItem";

export default function SubTaskList({ todo }) {
  if (todo.todoSubTasks.length === 0) {
    return <></>;
  }

  return (
    <div style={styles.subTaskListContainer}>
      {todo.todoSubTasks.map((subTask) => (
        <SubTaskItem key={subTask.id} subTask={subTask} />
      ))}
    </div>
  );
}

const styles = {
  subTaskListContainer: {
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    overflow: "hidden",
    width: "50%",
  },
};
