import API from "../../../constants/api";
import ApiHelper from "../../../helpers/api";

export const getCategoryList = async () => ApiHelper.get(API.CATEGORY_LIST);

export const getCategoryDetails = async (id) =>
  ApiHelper.get(API.CATEGORY_DETAIL.replace("ID", id));

export const createCategory = async (payload = {}) =>
  ApiHelper.post(API.CATEGORY_CREATE, payload);

export const updateCategory = async (id, payload = {}) =>
  ApiHelper.put(API.CATEGORY_UPDATE.replace("ID", id), payload);

export const deleteCategory = async (id) =>
  ApiHelper.delete(API.CATEGORY_DELETE.replace("ID", id));

export const bulkCategoryDelete = async (payload) =>
  ApiHelper.delete(API.CATEGORY_BULK_DELETE, payload);
