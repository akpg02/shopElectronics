import { axiosAuth, axiosPublic } from "../../utils/api/axios";
import { SUB_ACTION_TYPES } from "./sub.types";
import { toast } from "react-toastify";

export const fetchSub = (slug) => async (dispatch) => {
  try {
    dispatch({ type: SUB_ACTION_TYPES.FETCH_SUB_PENDING });
    const { data } = await axiosAuth.get(`/sub/${slug}`);
    dispatch({
      type: SUB_ACTION_TYPES.FETCH_SUB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_ACTION_TYPES.FETCH_SUB_FAILED,
      payload: error.response.data,
    });
  }
};

export const fetchSubs = () => async (dispatch) => {
  try {
    dispatch({ type: SUB_ACTION_TYPES.FETCH_SUBS_PENDING });
    const { data } = await axiosPublic.get("/subs");
    dispatch({
      type: SUB_ACTION_TYPES.FETCH_SUBS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_ACTION_TYPES.FETCH_SUBS_FAILED,
      payload: error.response.data,
    });
  }
};

export const fetchCategorySubs = (_id) => async (dispatch) => {
  console.log('')
  try {
    dispatch({ type: SUB_ACTION_TYPES.FETCH_SUBS_PENDING });
    const { data } = await axiosPublic.get(`/category/subs/${_id}`);
    dispatch({
      type: SUB_ACTION_TYPES.FETCH_SUBS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_ACTION_TYPES.FETCH_SUBS_FAILED,
      payload: error.response.data,
    });
  }
};

export const removeSub = (slug) => async (dispatch) => {
  try {
    dispatch({ type: SUB_ACTION_TYPES.REMOVE_SUB_PENDING });
    const { data } = await axiosAuth.delete(`/sub/${slug}`);
    dispatch({
      type: SUB_ACTION_TYPES.REMOVE_SUB_SUCCESS,
      payload: data,
    });
    toast.success(`${data.name} successfully deleted.`);
  } catch (error) {
    dispatch({
      type: SUB_ACTION_TYPES.REMOVE_SUB_FAILED,
      payload: error.response.data,
    });
    toast.error(`${error.response.data}`);
  }
};

export const updateSub = (slug, sub) => async (dispatch) => {
  try {
    dispatch({ type: SUB_ACTION_TYPES.UPDATE_SUB_PENDING });
    const { data } = await axiosAuth.put(`/sub/${slug}`, sub);
    dispatch({
      type: SUB_ACTION_TYPES.UPDATE_SUB_SUCCESS,
      payload: data,
    });
    toast.success(`${data.name} successfully updated.`);
  } catch (error) {
    dispatch({
      type: SUB_ACTION_TYPES.UPDATE_SUB_FAILED,
      payload: error.response.data,
    });
    toast.error(`${error.response.data}`);
  }
};

export const createSub = (sub) => async (dispatch) => {
  try {
    dispatch({ type: SUB_ACTION_TYPES.CREATE_SUB_PENDING });
    const { data } = await axiosAuth.post(`/sub`, sub);
    dispatch({
      type: SUB_ACTION_TYPES.CREATE_SUB_SUCCESS,
      payload: data,
    });
    toast.success(`${data.name} successfully created.`);
  } catch (error) {
    dispatch({
      type: SUB_ACTION_TYPES.CREATE_SUB_FAILED,
      payload: error.response.data,
    });
    toast.error(`${error.response.data}`);
  }
};
