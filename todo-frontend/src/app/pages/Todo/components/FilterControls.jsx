import { useMemo, useState } from "react";
import SearchIcon from "../../../components/icons/SearchIcon";
import { useTodos } from "../providers";
import STATUS from "../constants/status";

export default function FilterControls() {
  const {
    state,
    dispatch,
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
    bulkUpdateStatus,
  } = useTodos();

  const [bulkAction, setBulkAction] = useState(STATUS.list[0].value);

  const isSelectAll = useMemo(
    () =>
      state.todos.length && state.todos.length === state.selectedTodoIds.length,
    [state.todos, state.selectedTodoIds]
  );

  return (
    <div style={styles.controlsContainer}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <SearchIcon />
      </div>
      <div style={styles.filtersFlex}>
        <div style={styles.bulkActions}>
          <input
            type="checkbox"
            id="selectAll"
            checked={isSelectAll}
            onChange={() => {
              dispatch({
                type: "TOGGLE_SELECT_ALL",
              });
            }}
          />
          <label htmlFor="selectAll" style={{ marginLeft: "4px" }}>
            Select All
          </label>
          <select
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            style={{
              ...styles.select,
              width: "auto",
              marginLeft: "8px",
              fontSize: "12px",
            }}
          >
            {STATUS.list.map((i) => (
              <option key={i.value} value={i.value}>
                {i.displayName}
              </option>
            ))}
          </select>
          <button
            onClick={() => bulkUpdateStatus(bulkAction)}
            style={{
              ...styles.button,
              ...styles.submitButton,
              padding: "4px 8px",
              fontSize: "12px",
            }}
          >
            Apply
          </button>
        </div>
        <div style={styles.radioGroup}>
          {[{ displayName: "All", value: "ALL" }, ...STATUS.list].map(
            ({ value, displayName }) => (
              <label
                key={value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="statusFilter"
                  value={value}
                  checked={statusFilter === value}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ marginRight: "4px" }}
                />
                {displayName}
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
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
  controlsContainer: {
    padding: "16px",
    backgroundColor: "#fff",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "16px",
  },
  searchInput: {
    width: "100%",
    padding: "8px 30px 8px 15px",
    borderRadius: "20px",
    border: "1px solid #ced4da",
    boxSizing: "border-box",
  },
  filtersFlex: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
  },
  bulkActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  radioGroup: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
};
