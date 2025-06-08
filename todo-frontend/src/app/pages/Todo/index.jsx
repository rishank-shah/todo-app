import React from "react";
import TodoList from "./components/TodoList";
import { Header } from "./components/Header";
import AddTodoForm from "./components/AddTodo";
import { TodoProvider, useTodos } from "./providers";
import FilterControls from "./components/FilterControls";
import Pagination from "../../components/PaginationTab";
import BookmarkIcon from "../../components/icons/BookmarkIcon";

function TodoApp() {
  const {
    state,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    bookmarkedFilter,
    setBookmarkedFilter,
  } = useTodos();

  const toggleBookmarkFilter = () => {
    setBookmarkedFilter((i) => {
      if (i === "ALL") {
        return true;
      }
      return "ALL";
    });
  };

  return (
    <div style={styles.container}>
      <Header />
      <AddTodoForm />
      <FilterControls />
      <TodoList />
      <div style={styles.gridBookmarkPagination}>
        <div onClick={toggleBookmarkFilter}>
          <BookmarkIcon
            filled={bookmarkedFilter === true}
            color="red"
            size={30}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={state.totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}

export function Todo() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
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
  gridBookmarkPagination: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "center",
    gap: "12px",
  },
};
