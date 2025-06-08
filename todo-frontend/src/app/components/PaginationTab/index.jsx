import { useMemo } from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  pageOptions = [3, 5, 10],
}) {
  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <div style={styles.paginationContainer}>
      <div>
        <label htmlFor="itemsPerPage" style={{ marginRight: "8px" }}>
          Records Per Page
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          style={{ ...styles.select, width: "auto" }}
        >
          {pageOptions.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          style={styles.pageButton}
        >
          &lt;&lt;
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.pageButton}
        >
          &lt;
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            style={{
              ...styles.pageButton,
              ...(currentPage === number ? styles.activePageButton : {}),
            }}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={styles.pageButton}
        >
          &gt;
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={styles.pageButton}
        >
          &gt;&gt;
        </button>
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
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    marginTop: "16px",
  },
  pageButton: {
    padding: "8px 12px",
    margin: "0 2px",
    border: "1px solid #dee2e6",
    background: "white",
    cursor: "pointer",
  },
  activePageButton: {
    backgroundColor: "#007bff",
    color: "white",
    borderColor: "#007bff",
  },
};
