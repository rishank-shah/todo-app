import { useState } from "react";
import EditIcon from "../../../components/icons/EditIcon";
import DeleteIcon from "../../../components/icons/DeleteIcon";
import { useCategories } from "../providers";

export default function CategoryItem({ category }) {
  const { state, dispatch, deleteCategory, updateCategory } = useCategories();
  const [form, setForm] = useState({
    ...category,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isSelected = state.selectedCategoryIds.includes(category.id);

  return (
    <div style={styles.categoryItem}>
      <div style={styles.categoryItemContent}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() =>
            dispatch({
              type: "TOGGLE_SELECT",
              payload: {
                id: category.id,
              },
            })
          }
        />
        {category.isEditing ? (
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={form.displayName}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateCategory(category.id, {
                  displayName: form.displayName,
                  categoryName: form.categoryName,
                });
              }
            }}
            style={{ ...styles.input, flexGrow: 1 }}
            autoFocus
          />
        ) : (
          <span style={styles.categoryTitle}>{category.displayName}</span>
        )}
      </div>
      <div style={styles.categoryActions}>
        <button
          style={styles.iconButton}
          onClick={() => {
            dispatch({
              type: "UPDATE_CATEGORY",
              payload: {
                id: category.id,
                isEditing: !category.isEditing,
              },
            });
          }}
        >
          <EditIcon />
        </button>
        <button
          style={styles.iconButton}
          onClick={() => deleteCategory(category.id)}
        >
          <DeleteIcon />
        </button>
      </div>
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
  categoryItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e9ecef",
  },
  categoryItemContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexGrow: 1,
  },
  categoryTitle: {
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
