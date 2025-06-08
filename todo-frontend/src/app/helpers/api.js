import axios from "axios";
import _get from "lodash/get";
import ToastHelper from "./toast";
import { handleLogoutUser } from "./auth";
import { API_BASE_URL } from "../config";

class Api {
  constructor() {
    const service = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return _get(response, "data.result", {});
  }

  handleError = (error) => {
    if (error.response.status === 401) {
      ToastHelper.ErrorToast("Something went wrong. Please login again.");
      handleLogoutUser();
      return;
    }
    const errorMessages = _get(error, "response.data.errors", []);
    const errMessage = errorMessages.length
      ? errorMessages.map((e) => e.msg).join(", ")
      : "Something went wrong";
    throw new Error(errMessage);
  };

  setupInterceptors = (fn) => {
    this.service.interceptors.request.use(fn);
  };

  updateHeaders = (customHeaders) => {
    Object.entries(customHeaders).forEach(([key, val]) => {
      this.service.defaults.headers.common[key] = val;
    });
  };

  get = (path, payload) =>
    this.service.request({
      method: "GET",
      url: path,
      responseType: "json",
      params: payload,
    });

  post = (path, payload) =>
    this.service.request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
    });

  put = (path, payload) =>
    this.service.request({
      method: "PUT",
      url: path,
      responseType: "json",
      data: payload,
    });

  delete = (path, payload) =>
    this.service.request({
      method: "DELETE",
      url: path,
      responseType: "json",
      data: payload,
    });
}

const ApiHelper = new Api();

export default ApiHelper;
