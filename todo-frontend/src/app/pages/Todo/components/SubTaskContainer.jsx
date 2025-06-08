import AddSubTask from "./AddSubTask";
import SubTaskList from "./SubTaskList";

export default function SubTaskContainer({ todo }) {
  return (
    <div style={styles.addSubtaskContainer}>
      <SubTaskList todo={todo} />
      <AddSubTask todo={todo} />
    </div>
  );
}

const styles = {
  addSubtaskContainer: {
    display: "grid",
    alignItems: "center",
    marginTop: "10px",
    width: "100%",
    padding: "8px",
    borderTop: "1px dashed #e9ecef",
  },
};
