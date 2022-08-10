import axios from "axios";
import { getCurrentUser } from "../firebase/firebase.utils";

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const axiosAuth = axios.create({ baseURL: process.env.REACT_APP_API });

axiosAuth.interceptors.request.use(
  async (config) => {
    const user = await getCurrentUser();
    const { token } = await user.getIdTokenResult();
    config.headers.token = user ? token : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
