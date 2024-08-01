// eslint-disable-next-line no-unused-vars
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { authAPI } from "../redux/services/authApi";
import { userAPI } from "../redux/services/userApi";
import userReducer from "../redux/features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer
  },
  middleware: (getDefaultMiddleware)=>
  getDefaultMiddleware().concat([
    authAPI.middleware,
    userAPI.middleware
  ])
});