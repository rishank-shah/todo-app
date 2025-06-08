import axios from "axios";
import API from "../../../constants/api";

export const registerUser = async (payload) =>
  axios.post(API.REGISTER_USER, payload);
