import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import * as categoryServices from "../services";
import ToastHelper from "../../../helpers/toast";
import categoryReducer from "../reducer";

const CategoryContext = createContext();

const initialState = {
  categories: [],
  loading: true,
  selectedCategoryIds: [],
};

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const fetchData = useCallback(async () => {
    dispatch({
      type: "SET_LOADING",
    });

    const response = await categoryServices.getCategoryList();

    dispatch({
      type: "SET_DATA",
      payload: response,
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addCategory = async (categoryData = {}) => {
    try {
      const category = await categoryServices.createCategory(categoryData);
      ToastHelper.SuccessToast("Category created");

      dispatch({
        type: "ADD_CATEGORY",
        payload: {
          id: category.id,
          displayName: category.displayName,
          categoryName: category.categoryName,
        },
      });
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const updateCategory = async (id, categoryData = {}) => {
    try {
      const category = await categoryServices.updateCategory(id, categoryData);
      ToastHelper.SuccessToast("Category updated");

      dispatch({
        type: "UPDATE_CATEGORY",
        payload: {
          id: category.id,
          displayName: category.displayName,
          categoryName: category.categoryName,
          isEditing: false,
        },
      });
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryServices.deleteCategory(id);
      ToastHelper.SuccessToast("Category Delete");

      dispatch({
        type: "DELETE_CATEGORY",
        payload: {
          id,
        },
      });
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const bulkCategoryDelete = async () => {
    try {
      await categoryServices.bulkCategoryDelete({
        ids: state.selectedCategoryIds,
      });
      ToastHelper.SuccessToast("All Categories Deleted");

      dispatch({
        type: "BULK_DELETE_CATEGORIES",
      });
    } catch (err) {
      ToastHelper.ErrorToast(err.message);
    }
  };

  const value = {
    state,
    dispatch,
    addCategory,
    updateCategory,
    deleteCategory,
    bulkCategoryDelete,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
