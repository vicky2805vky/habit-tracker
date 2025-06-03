import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type appState = {
  theme: "light" | "dark";
  appDate: string;
};

const initialState: appState = {
  theme: "dark",
  appDate: new Date().toISOString().split("T")[0],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setAppDate: (state, action: PayloadAction<string>) => {
      state.appDate = action.payload;
    },
  },
});

export const { toggleTheme, setAppDate } = appSlice.actions;

export default appSlice.reducer;
