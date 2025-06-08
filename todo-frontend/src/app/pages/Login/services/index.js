import axios from "axios";
import API from "../../../constants/api";

export const loginUser = async (payload) => axios.post(API.LOGIN_USER, payload);
