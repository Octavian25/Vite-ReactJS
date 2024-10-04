// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./utility/redux-auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
