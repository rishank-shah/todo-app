import { API_BASE_URL } from "../config";

export default {
  // auth
  LOGIN_USER: `${API_BASE_URL}/v1/user/login`,
  REGISTER_USER: `${API_BASE_URL}/v1/user/register`,
  REFRESH_USER_TOKEN: `${API_BASE_URL}/v1/user/token`,

  // category
  CATEGORY_LIST: "/v1/categories/list",
  CATEGORY_DETAIL: "/v1/categories/detail/ID",
  CATEGORY_CREATE: "/v1/categories/create",
  CATEGORY_UPDATE: "/v1/categories/update/ID",
  CATEGORY_DELETE: "/v1/categories/ID",
  CATEGORY_BULK_DELETE: "/v1/categories/bulkDelete",

  // todo
  TODO_LIST: "/v1/todo/list",
  TODO_LIST_ALL: "/v1/todo/list/all",
  TODO_DETAIL: "/v1/todo/detail/ID",
  TODO_CREATE: "/v1/todo/create",
  TODO_UPDATE: "/v1/todo/update/ID",
  TODO_DELETE: "/v1/todo/ID",
  TODO_UPDATE_SEQUENCE: "/v1/todo/updateSequence/ID",
  TODO_BOOKMARK_LIST: "/v1/todo/bookmark/list",
  TODO_SUBTASK_CREATE: "/v1/todo/subtask/create",
  TODO_SUBTASK_UPDATE: "/v1/todo/subtask/update/ID",
  TODO_SUBTASK_DELETE: "/v1/todo/subtask/ID",
  TODO_BULK_UPDATE_STATUS: "/v1/todo/bulkUpdateStatus",
};
