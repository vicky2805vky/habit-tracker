import { createSlice } from "@reduxjs/toolkit";

type appState = {
  theme: "light" | "dark";
};

const initialState: appState = {
  theme: "dark",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme: (state, _) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = appSlice.actions;

export default appSlice.reducer;
