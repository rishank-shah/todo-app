import { Header } from "./components/Header";
import CategoryList from "./components/CategoryList";
import { CategoryProvider } from "./providers";
import FilterControls from "./components/FilterControls";
import AddCategoryForm from "./components/AddCategory";

function CategoryApp() {
  return (
    <div style={styles.container}>
      <Header />
      <AddCategoryForm />
      <FilterControls />
      <CategoryList />
    </div>
  );
}

export function Category() {
  return (
    <CategoryProvider>
      <CategoryApp />
    </CategoryProvider>
  );
}

const styles = {
  container: {
    maxWidth: "75%",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};
