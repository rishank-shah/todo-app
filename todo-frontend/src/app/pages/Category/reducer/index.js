const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "SET_DATA":
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };

    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        loading: false,
      };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id
            ? {
                ...category,
                ...action.payload,
              }
            : category
        ),
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload.id
        ),
        selectedCategoryIds: state.selectedCategoryIds.filter(
          (i) => i !== action.payload.id
        ),
      };

    case "BULK_DELETE_CATEGORIES":
      return {
        ...state,
        categories: [],
        selectedCategoryIds: [],
        loading: false,
      };

    case "TOGGLE_SELECT": {
      const isSelected = state.selectedCategoryIds.includes(action.payload.id);

      return {
        ...state,
        selectedCategoryIds: isSelected
          ? state.selectedCategoryIds.filter((id) => id !== action.payload.id)
          : [...state.selectedCategoryIds, action.payload.id],
      };
    }

    case "TOGGLE_SELECT_ALL": {
      const isEverythingSelected =
        !!state.selectedCategoryIds.length &&
        state.selectedCategoryIds.length === state.categories.length;

      return {
        ...state,
        selectedCategoryIds: !isEverythingSelected
          ? state.categories.map((i) => i.id)
          : [],
      };
    }

    default:
      return state;
  }
};

export default categoryReducer;
