import { useCategories } from "../providers";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
  const { state } = useCategories();

  if (state.categories.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        No categories found. Add one.
      </p>
    );
  }
  return (
    <div style={styles.categoryListContainer}>
      {state.categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

const styles = {
  categoryListContainer: {
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    overflow: "hidden",
  },
};
