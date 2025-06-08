import { useMemo, useState } from "react";
import { useCategories } from "../providers";
import ConfirmDialog from "../../../components/ConfirmationDialog";

export default function FilterControls() {
  const { state, dispatch, bulkCategoryDelete } = useCategories();

  const [showDialog, setShowDialog] = useState(false);

  const isSelectAll = useMemo(
    () =>
      state.categories.length &&
      state.categories.length === state.selectedCategoryIds.length,
    [state.categories, state.selectedCategoryIds]
  );

  return (
    <div style={styles.controlsContainer}>
      <input
        type="checkbox"
        checked={isSelectAll}
        onChange={() =>
          dispatch({
            type: "TOGGLE_SELECT_ALL",
          })
        }
      />
      <span style={styles.selectAll}> Select All</span>
      <button
        type="submit"
        style={{
          ...styles.button,
          ...(!isSelectAll
            ? {
                backgroundColor: "grey",
                cursor: "not-allowed",
              }
            : {}),
        }}
        onClick={() => setShowDialog(true)}
        disabled={!isSelectAll}
      >
        DELETE
      </button>
      {showDialog && (
        <ConfirmDialog
          title="Delete category"
          description={`You are about to delete all categories and all todos associated with them. If you proceed with this action IDFY TODO will permanently delete the categories and recovery is not possible.`}
          onSubmit={() => {
            bulkCategoryDelete();
            setShowDialog(false);
          }}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}

const styles = {
  controlsContainer: {
    padding: "16px",
  },
  selectAll: {
    marginRight: "8px",
  },
  button: {
    padding: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    backgroundColor: "red",
    color: "white",
  },
};
