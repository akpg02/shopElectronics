import { combineReducers } from "redux";

import { userReducer } from "./auth/auth.reducer";
import { categoryReducer } from "./category/category.reducer";
import { subReducer } from "./sub/sub.reducer";

export const rootReducer = combineReducers({
  auth: userReducer,
  category: categoryReducer,
  sub: subReducer,
});
