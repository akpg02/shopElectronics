import { PRODUCT_ACTION_TYPES } from "./product.types";

const INITIAL_STATE_PRODUCT = {
  product: null,
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
        product: null,
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
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        categories: payload,
        isPending: false,
        error: null,
        product: null,
      };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.CREATE_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_FAILED:
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_FAILED:
    case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        error: payload,
        isPending: false,
        product: null,
        products: null,
      };
    default:
      return state;
  }
};
