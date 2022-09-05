import { CATEGORY_ACTION_TYPES } from "./category.types";

const INITIAL_STATE_CATEGORY = {
  category: null,
  categories: [],
  isPending: false,
  error: null,
};

export const categoryReducer = (
  state = INITIAL_STATE_CATEGORY,
  action = {}
) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORY_PENDING:
    case CATEGORY_ACTION_TYPES.CREATE_CATEGORY_PENDING:
    case CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_PENDING:
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_PENDING:
    case CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_PENDING:
      return {
        ...state,
        isPending: true,
        error: null,
        category: null,
        categories: [],
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS:
    case CATEGORY_ACTION_TYPES.CREATE_CATEGORY_SUCCESS:
    case CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_SUCCESS:
    case CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: { ...state.category, payload },
        isPending: false,
        error: null,
        categories: [],
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, payload],
        isPending: false,
        error: null,
        category: null,
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAILED:
    case CATEGORY_ACTION_TYPES.CREATE_CATEGORY_FAILED:
    case CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_FAILED:
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
    case CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_FAILED:
      return {
        ...state,
        error: payload,
        isPending: false,
        category: null,
        categories: null,
      };
    default:
      return state;
  }
};
