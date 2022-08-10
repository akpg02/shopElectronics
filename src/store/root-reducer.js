import { combineReducers } from "redux";

import { userReducer } from "./auth/auth.reducer";
import { categoryReducer } from "./category/category.reducer";

export const rootReducer = combineReducers({
  auth: userReducer,
  category: categoryReducer,
});
