import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/app.slice";
import userReducer from "./slices/user.slice";
import habitReducer from "./slices/habit.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    habits: habitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
