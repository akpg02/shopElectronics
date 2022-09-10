import { axiosAuth, axiosPublic } from "../../utils/api/axios";
import { CATEGORY_ACTION_TYPES } from "./category.types";
import { toast } from "react-toastify";

export const fetchCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_PENDING });
    const { data } = await axiosAuth.get(`/category/${slug}`);
    dispatch({
      type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAILED,
      payload: error.response.data,
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_PENDING });
    const { data } = await axiosPublic.get("/categories");
    dispatch({
      type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
      payload: error.response.data,
    });
  }
};

export const removeCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_PENDING });
    const { data } = await axiosAuth.delete(`/category/${slug}`);
    dispatch({
      type: CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_SUCCESS,
      payload: data,
    });
    toast.success(`${data.name} successfully deleted.`);
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_FAILED,
      payload: error.response.data,
    });
    toast.error(`${error.response.data}`);
  }
};

export const updateCategory = (slug, category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_PENDING });
    const { data } = await axiosAuth.put(`/category/${slug}`, category);
    dispatch({
      type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
    toast.success(`${data.name} successfully updated.`);
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_FAILED,
      payload: error.response.data,
    });
    toast.error(`${error.response.data}`);
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ACTION_TYPES.CREATE_CATEGORY_PENDING });
    const { data } = await axiosAuth.post(`/category`, category);
    dispatch({
      type: CATEGORY_ACTION_TYPES.CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
    toast.success(`${data.name} successfully created.`);
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.CREATE_CATEGORY_FAILED,
      payload: error.response.data,
    });
    toast.error(`${error.response.data}`);
  }
};
