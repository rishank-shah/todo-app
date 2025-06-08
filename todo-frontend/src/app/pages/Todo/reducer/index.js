const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "SET_DATA":
      return {
        ...state,
        todos: action.payload.todos,
        totalTodos: action.payload.totalTodos,
        totalPages: action.payload.totalPages,
        loading: false,
        selectedTodoIds: [],
      };

    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                ...action.payload,
              }
            : todo
        ),
      };

    case "TOGGLE_SELECT": {
      const isSelected = state.selectedTodoIds.includes(action.payload.id);
      return {
        ...state,
        selectedTodoIds: isSelected
          ? state.selectedTodoIds.filter((id) => id !== action.payload.id)
          : [...state.selectedTodoIds, action.payload.id],
      };
    }

    case "TOGGLE_SELECT_ALL": {
      const isEverythingSelected =
        !!state.selectedTodoIds.length &&
        state.selectedTodoIds.length === state.todos.length;

      return {
        ...state,
        selectedTodoIds: !isEverythingSelected
          ? state.todos.map((i) => i.id)
          : [],
      };
    }

    case "BULK_UPDATE_SUCCESS":
      return {
        ...state,
        selectedTodoIds: [],
      };

    case "UPDATE_TODO_SEQUENCE": {
      const updated = [...state.todos];
      const [draggedItem] = updated.splice(action.payload.oldIndex, 1);
      updated.splice(action.payload.dropIndex, 0, draggedItem);

      return {
        ...state,
        todos: updated,
      };
    }

    case "ADD_SUBTASK":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                todoSubTasks: [
                  ...todo.todoSubTasks,
                  {
                    id: action.payload.id,
                    title: action.payload.title,
                    status: action.payload.status,
                    todoId: action.payload.todoId,
                  },
                ],
              }
            : todo
        ),
      };

    case "UPDATE_SUBTASK":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                todoSubTasks: todo.todoSubTasks.map((subTask) =>
                  subTask.id === action.payload.id
                    ? {
                        ...subTask,
                        ...action.payload,
                      }
                    : subTask
                ),
              }
            : todo
        ),
      };

    case "DELETE_SUBTASK":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                todoSubTasks: todo.todoSubTasks.filter(
                  (subTask) => subTask.id !== action.payload.id
                ),
              }
            : todo
        ),
      };

    default:
      return state;
  }
};

export default todoReducer;
