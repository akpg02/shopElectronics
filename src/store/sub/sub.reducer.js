import { SUB_ACTION_TYPES } from "./sub.types";

const INITIAL_STATE_SUB = {
  sub: null,
  subs: [],
  isPending: false,
  error: null,
};

export const subReducer = (state = INITIAL_STATE_SUB, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SUB_ACTION_TYPES.FETCH_SUB_PENDING:
    case SUB_ACTION_TYPES.CREATE_SUB_PENDING:
    case SUB_ACTION_TYPES.REMOVE_SUB_PENDING:
    case SUB_ACTION_TYPES.FETCH_SUBS_PENDING:
    case SUB_ACTION_TYPES.UPDATE_SUB_PENDING:
      return {
        ...state,
        isPending: true,
        error: null,
        sub: null,
        subs: [],
      };
    case SUB_ACTION_TYPES.FETCH_SUB_SUCCESS:
    case SUB_ACTION_TYPES.CREATE_SUB_SUCCESS:
    case SUB_ACTION_TYPES.REMOVE_SUB_SUCCESS:
    case SUB_ACTION_TYPES.UPDATE_SUB_SUCCESS:
      return {
        ...state,
        sub: payload,
        isPending: false,
        error: null,
        subs: [],
      };
    case SUB_ACTION_TYPES.FETCH_SUBS_SUCCESS:
      return {
        ...state,
        subs: payload,
        isPending: false,
        error: null,
        sub: null,
      };
    case SUB_ACTION_TYPES.FETCH_SUB_FAILED:
    case SUB_ACTION_TYPES.CREATE_SUB_FAILED:
    case SUB_ACTION_TYPES.REMOVE_SUB_FAILED:
    case SUB_ACTION_TYPES.FETCH_SUBS_FAILED:
    case SUB_ACTION_TYPES.UPDATE_SUB_FAILED:
      return {
        ...state,
        error: payload,
        isPending: false,
        sub: null,
        subs: [],
      };
    default:
      return state;
  }
};
