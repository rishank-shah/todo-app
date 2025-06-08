import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import todoReducer from "../reducer";
import * as todoService from "../services";
import ToastHelper from "../../../helpers/toast";
import { getCategoryList } from "../../Category/services";

const TodoContext = createContext();

const initialState = {
  todos: [],
  totalTodos: 0,
  loading: true,
  selectedTodoIds: [],
  categories: [],
  totalPages: 0,
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [bookmarkedFilter, setBookmarkedFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const fetchCategories = useCallback(async () => {
    const categories = await getCategoryList();

    dispatch({
      type: "SET_CATEGORIES",
      payload: categories,
    });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchData = useCallback(
    async (page = currentPage) => {
      dispatch({
        type: "SET_LOADING",
      });
      const response = await todoService.getTodoList({
        pageIndex: page,
        pageSize: itemsPerPage,
        searchKey: debouncedSearchTerm,
        status: statusFilter === "ALL" ? "" : statusFilter,
        bookmarked: bookmarkedFilter,
      });

      if (response.todos.length === 0 && response.totalTodos > 0 && page > 1) {
        setCurrentPage(page - 1);
      } else {
        dispatch({
          type: "SET_DATA",
          payload: response,
        });
      }
    },
    [
      currentPage,
      itemsPerPage,
      debouncedSearchTerm,
      statusFilter,
      dispatch,
      bookmarkedFilter,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (currentPage !== 1) setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter, bookmarkedFilter]);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const addTodo = async (todo = {}) => {
    try {
      await todoService.createTodo(todo);
      ToastHelper.SuccessToast("Todo created");
      if (currentPage === 1) {
        fetchData();
      } else {
        setCurrentPage(1);
      }
      return true;
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const updateTodo = async (id, todoData = {}) => {
    try {
      const todo = await todoService.updateTodo(id, todoData);
      ToastHelper.SuccessToast("Todo updated");

      dispatch({
        type: "UPDATE_TODO",
        payload: {
          ...todo,
          isEditing: false,
        },
      });

      if (bookmarkedFilter === true) {
        fetchData();
      }
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      ToastHelper.SuccessToast("Todo Deleted");
      await fetchData();
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const bulkUpdateStatus = async (status) => {
    try {
      await todoService.bulkUpdateTodoStatus({
        status,
        ids: state.selectedTodoIds,
      });
      ToastHelper.SuccessToast("Todos Updated");
      await fetchData();
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const updateTodoSequence = async (oldIndex, dropIndex) => {
    try {
      const todoId = state.todos[oldIndex].id;
      const newIndex = state.todos[dropIndex].sequence;

      await todoService.todoUpdateSequence(todoId, {
        newIndex,
      });

      dispatch({
        type: "UPDATE_TODO_SEQUENCE",
        payload: {
          id: todoId,
          oldIndex,
          dropIndex,
        },
      });
      ToastHelper.SuccessToast("Todo Sequence Updated");
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const addSubTask = async (subTaskData = {}) => {
    try {
      const subtask = await todoService.createSubTask(subTaskData);

      dispatch({
        type: "ADD_SUBTASK",
        payload: subtask,
      });

      ToastHelper.SuccessToast("Todo SubTask Added");
      return true;
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
    return false;
  };

  const updateSubTask = async (subTaskId, subTaskData = {}) => {
    try {
      const subtask = await todoService.updateSubTask(subTaskId, subTaskData);

      dispatch({
        type: "UPDATE_SUBTASK",
        payload: {
          ...subtask,
          isEditing: false,
        },
      });

      ToastHelper.SuccessToast("Todo SubTask Updated");
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const deleteSubTask = async (subTaskId, todoId) => {
    try {
      await todoService.deleteSubtask(subTaskId);

      dispatch({
        type: "DELETE_SUBTASK",
        payload: {
          id: subTaskId,
          todoId,
        },
      });

      ToastHelper.SuccessToast("Todo SubTask Deleted");
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const value = {
    state,
    addTodo,
    dispatch,
    deleteTodo,
    updateTodo,
    searchTerm,
    addSubTask,
    currentPage,
    statusFilter,
    itemsPerPage,
    updateSubTask,
    setSearchTerm,
    deleteSubTask,
    setCurrentPage,
    setStatusFilter,
    setItemsPerPage,
    bulkUpdateStatus,
    bookmarkedFilter,
    updateTodoSequence,
    setBookmarkedFilter,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => useContext(TodoContext);
