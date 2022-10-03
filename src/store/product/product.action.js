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

export const resetCloudinary = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.RESET_CLOUDINARY_PENDING });
    dispatch({ type: PRODUCT_ACTION_TYPES.RESET_CLOUDINARY_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.RESET_CLOUDINARY_FAILED,
      payload: error,
    });
  }
};

export const updateCloudinary = (public_id, images) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.UPDATE_CLOUDINARY_PENDING });
    const filteredImages = images.filter(
      (image) => image.public_id !== public_id
    );
    dispatch({
      type: PRODUCT_ACTION_TYPES.UPDATE_CLOUDINARY_SUCCESS,
      payload: filteredImages,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.UPDATE_CLOUDINARY_FAILED,
      payload: error,
    });
  }
};

export const uploadToCloudinary = (uri) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.UPLOAD_CLOUDINARY_PENDING });
    const { data } = await axiosAuth.post("/uploadimages", { image: uri });
    dispatch({
      type: PRODUCT_ACTION_TYPES.UPLOAD_CLOUDINARY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.UPLOAD_CLOUDINARY_FAILED,
      payload: error.response.data,
    });
    toast.error(`image(s) upload failed; ${error.response.data}`);
  }
};

export const removeFromCloudinary = (public_id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.REMOVE_CLOUDINARY_PENDING });
    const { data } = await axiosAuth.post("/removeimage", { public_id });
    dispatch({
      type: PRODUCT_ACTION_TYPES.REMOVE_CLOUDINARY_SUCCESS,
      payload: data,
    });
    toast.success(`image successfully deleted`);
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.REMOVE_CLOUDINARY_FAILED,
      payload: error.response.data,
    });
    toast.error(`image deletion failed`);
  }
};
