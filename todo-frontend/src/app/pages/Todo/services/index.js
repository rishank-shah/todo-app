import API from "../../../constants/api";
import ApiHelper from "../../../helpers/api";

export const getTodoList = async (payload = {}) =>
  ApiHelper.post(API.TODO_LIST, payload);

export const getTodoListAll = async () => ApiHelper.get(API.TODO_LIST_ALL);

export const getTodoDetails = async (id) =>
  ApiHelper.get(API.TODO_DETAIL.replace("ID", id));

export const createTodo = async (payload = {}) =>
  ApiHelper.post(API.TODO_CREATE, payload);

export const updateTodo = async (id, payload = {}) =>
  ApiHelper.put(API.TODO_UPDATE.replace("ID", id), payload);

export const deleteTodo = async (id) =>
  ApiHelper.delete(API.TODO_DELETE.replace("ID", id));

export const todoUpdateSequence = async (id, payload = {}) =>
  ApiHelper.put(API.TODO_UPDATE_SEQUENCE.replace("ID", id), payload);

export const getBookmarkTodoList = async () =>
  ApiHelper.get(API.TODO_BOOKMARK_LIST);

export const createSubTask = async (payload = {}) =>
  ApiHelper.post(API.TODO_SUBTASK_CREATE, payload);

export const updateSubTask = async (id, payload = {}) =>
  ApiHelper.put(API.TODO_SUBTASK_UPDATE.replace("ID", id), payload);

export const deleteSubtask = async (id) =>
  ApiHelper.delete(API.TODO_SUBTASK_DELETE.replace("ID", id));

export const bulkUpdateTodoStatus = async (payload) =>
  ApiHelper.put(API.TODO_BULK_UPDATE_STATUS, payload);
