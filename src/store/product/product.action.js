import { axiosAuth, axiosPublic } from "../../utils/api/axios";
import { PRODUCT_ACTION_TYPES } from "./product.types";
import { toast } from "react-toastify";

export const fetchProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_PENDING });
    const { data } = await axiosAuth.get(`/product/${slug}`);
    dispatch({
      type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.FETCH_CATEGORIES_PENDING });
    const { data } = await axiosPublic.get("/categories");
    dispatch({
      type: PRODUCT_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const removeProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_PENDING });
    const { data } = await axiosAuth.delete(`/product/${slug}`);
    dispatch({
      type: PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_SUCCESS,
      payload: data,
    });
    toast.success(`${data.title} successfully deleted.`);
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_FAILED,
      payload: error.response.data.error,
    });
    toast.error(`${error.response.data.error}`);
  }
};

export const updateProduct = (slug, product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_PENDING });
    const { data } = await axiosAuth.put(`/product/${slug}`, product);
    dispatch({
      type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
    toast.success(`${data.title} successfully updated.`);
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_FAILED,
      payload: error.response.data.error,
    });
    toast.error(`${error.response.data.error}`);
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.CREATE_PRODUCT_PENDING });
    const { data } = await axiosAuth.post(`/product`, product);
    dispatch({
      type: PRODUCT_ACTION_TYPES.CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
    toast.success(`${data.title} successfully created.`);
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.CREATE_PRODUCT_FAILED,
      payload: error.response.data.error,
    });
    toast.error(`${error.response.data.error}`);
  }
};
