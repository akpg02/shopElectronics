import { PRODUCT_ACTION_TYPES } from "./product.types";

const INITIAL_STATE_PRODUCT = {
  product: { images: [] },
  products: [],
  isPending: false,
  error: null,
};

export const productReducer = (state = INITIAL_STATE_PRODUCT, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_PENDING:
    case PRODUCT_ACTION_TYPES.CREATE_PRODUCT_PENDING:
    case PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_PENDING:
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_PENDING:
    case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_PENDING:
      return {
        ...state,
        isPending: true,
        error: null,
        product: { ...state.product },
        products: [],
      };
    case PRODUCT_ACTION_TYPES.UPLOAD_CLOUDINARY_PENDING:
    case PRODUCT_ACTION_TYPES.REMOVE_CLOUDINARY_PENDING:
    case PRODUCT_ACTION_TYPES.UPDATE_CLOUDINARY_PENDING:
    case PRODUCT_ACTION_TYPES.RESET_CLOUDINARY_PENDING:
      return {
        ...state,
        isPending: true,
        error: null,
        product: { ...state.product },
        products: [],
      };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_SUCCESS:
    case PRODUCT_ACTION_TYPES.CREATE_PRODUCT_SUCCESS:
    case PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_SUCCESS:
    case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload,
        isPending: false,
        error: null,
        products: [],
      };
    case PRODUCT_ACTION_TYPES.UPLOAD_CLOUDINARY_SUCCESS:
      return {
        ...state,
        isPending: false,
        error: null,
        product: {
          ...state.product,
          images: [...state.product.images, payload],
        },
        products: [],
      };
    case PRODUCT_ACTION_TYPES.RESET_CLOUDINARY_SUCCESS:
      return {
        ...state,
        product: { images: [] },
        isPending: false,
        error: null,
        products: [],
      };
    case PRODUCT_ACTION_TYPES.UPDATE_CLOUDINARY_SUCCESS:
    case PRODUCT_ACTION_TYPES.REMOVE_CLOUDINARY_SUCCESS:
      return {
        ...state,
        isPending: false,
        error: null,
        product: {
          ...state.product,
          images: payload,
        },
        products: [],
      };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        isPending: false,
        error: null,
        product: { ...state.product },
      };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.CREATE_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_FAILED:
    case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.UPLOAD_CLOUDINARY_FAILED:
    case PRODUCT_ACTION_TYPES.REMOVE_CLOUDINARY_FAILED:
    case PRODUCT_ACTION_TYPES.UPDATE_CLOUDINARY_FAILED:
    case PRODUCT_ACTION_TYPES.RESET_CLOUDINARY_FAILED:
      return {
        ...state,
        error: payload,
        isPending: false,
        product: { ...state.product },
        products: [],
      };
    default:
      return state;
  }
};
