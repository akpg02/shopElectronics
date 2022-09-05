import { axiosAuth } from "../../utils/api/axios";
import { AUTH_ACTION_TYPES } from "./auth.types";
import { toast } from "react-toastify";

export const fetchUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_ACTION_TYPES.FETCH_USER_PENDING });
    const { data } = await axiosAuth.post("/current-user");
    // add token to user object
    const updatedUser = { ...data, token };
    dispatch({
      type: AUTH_ACTION_TYPES.FETCH_USER_SUCCESS,
      payload: updatedUser,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ACTION_TYPES.FETCH_USER_FAILED,
      payload: error.message,
    });
  }
};

export const fetchAdmin = (token) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_ACTION_TYPES.FETCH_ADMIN_PENDING });
    const { data } = await axiosAuth.post("/current-admin");
    // add token to user object
    const updatedUser = { ...data, token };
    dispatch({
      type: AUTH_ACTION_TYPES.FETCH_ADMIN_SUCCESS,
      payload: updatedUser,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ACTION_TYPES.FETCH_ADMIN_FAILED,
      payload: error.message,
    });
  }
};

export const registerUser = (token, userObj) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_ACTION_TYPES.REGISTER_USER_PENDING });
    const { data } = await axiosAuth.post("/create-or-update-user", userObj);
    // add token to user object
    const updatedUser = { ...data, token };
    dispatch({
      type: AUTH_ACTION_TYPES.REGISTER_USER_SUCCESS,
      payload: updatedUser,
    });
    toast.success("You have successfully registered.");
  } catch (error) {
    dispatch({
      type: AUTH_ACTION_TYPES.REGISTER_USER_FAILED,
      payload: error.response.data,
    });
    toast.error(error.response.data);
  }
};

export const loginUser = (token, emailObj) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_ACTION_TYPES.LOGIN_USER_PENDING });
    const { data } = await axiosAuth.post("/create-or-update-user", emailObj);
    // add token to data object
    const updatedUser = { ...data, token };
    dispatch({
      type: AUTH_ACTION_TYPES.LOGIN_USER_SUCCESS,
      payload: updatedUser,
    });
    toast.success("Login successful");
  } catch (error) {
    dispatch({
      type: AUTH_ACTION_TYPES.LOGIN_USER_FAILED,
      payload: error.response.data,
    });
    toast.error(error.response.data);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: AUTH_ACTION_TYPES.LOGOUT_USER_PENDING });
    dispatch({ type: AUTH_ACTION_TYPES.LOGOUT_USER_SUCCESS, payload: null });
  } catch (error) {
    dispatch({
      type: AUTH_ACTION_TYPES.LOGOUT_USER_FAILED,
      payload: error.response.data,
    });
  }
};
