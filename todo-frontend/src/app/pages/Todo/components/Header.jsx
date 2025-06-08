export function Header() {
  return (
    <div style={styles.header}>
      <strong>What do you want to do today?</strong>
    </div>
  );
}

const styles = {
  header: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "35px",
  },
};
