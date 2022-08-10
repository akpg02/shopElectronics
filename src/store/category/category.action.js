import { axiosAuth, axiosPublic } from "../../utils/api/axios";
import { CATEGORY_ACTION_TYPES } from "./category.types";

export const fetchCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_PENDING });
    const { data } = await axiosPublic.get(`/category/${slug}`);
    dispatch({
      type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAILED,
      payload: error.message,
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
      payload: error.message,
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
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_FAILED,
      payload: error.message,
    });
  }
};

export const updateCategory = (slug, category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_PENDINGs });
    const { data } = await axiosAuth.put(`/category/${slug}`, category);
    dispatch({
      type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_FAILED,
      payload: error.message,
    });
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
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTION_TYPES.CREATE_CATEGORY_FAILED,
      payload: error.message,
    });
  }
};