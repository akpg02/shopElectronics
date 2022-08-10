import reduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { compose } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  reduxThunk,
].filter(Boolean);

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      middleWares,
    }).concat(middleWares),
  devTools:
    (process.env.NODE_ENV !== "production" &&
      window &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose,
});

export const persistor = persistStore(store);
