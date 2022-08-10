import { AUTH_ACTION_TYPES } from "./auth.types";

const INITIAL_STATE = {
  user: null,
  isPending: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_ACTION_TYPES.FETCH_USER_PENDING:
    case AUTH_ACTION_TYPES.REGISTER_USER_PENDING:
    case AUTH_ACTION_TYPES.LOGIN_USER_PENDING:
    case AUTH_ACTION_TYPES.LOGOUT_USER_PENDING:
      return { ...state, isPending: true };
    case AUTH_ACTION_TYPES.FETCH_USER_SUCCESS:
    case AUTH_ACTION_TYPES.REGISTER_USER_SUCCESS:
    case AUTH_ACTION_TYPES.LOGIN_USER_SUCCESS:
    case AUTH_ACTION_TYPES.LOGOUT_USER_SUCCESS:
      return { ...state, user: payload, isPending: false };
    case AUTH_ACTION_TYPES.FETCH_USER_FAILED:
    case AUTH_ACTION_TYPES.REGISTER_USER_FAILED:
    case AUTH_ACTION_TYPES.LOGIN_USER_FAILED:
    case AUTH_ACTION_TYPES.LOGOUT_USER_FAILED:
      return { ...state, error: payload, isPending: false };
    default:
      return state;
  }
};
