import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  signInUser,
  signOutUser,
  signUpUser,
} from "../apis/auth.api";
import { toast } from "sonner";

export type UserState = {
  user: {
    userName: string;
    email: string;
  } | null;
};

const initialState: UserState = { user: null };

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = {
          userName: action.payload.data.userName,
          email: action.payload.data.email,
        };
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        toast(action.payload.message);
        state.user = {
          userName: action.payload.data.userName,
          email: action.payload.data.email,
        };
      })
      .addCase(signUpUser.rejected, (_, action) => {
        toast(
          `${action.payload?.message}: ${action.payload?.error.description}`,
        );
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        toast(action.payload.message);
        state.user = null;
      })
      .addCase(fetchUser.rejected, () => {
        toast("please login to continue");
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        toast(action.payload.message);
        state.user = {
          userName: action.payload.data.userName,
          email: action.payload.data.email,
        };
      })
      .addCase(signInUser.rejected, (_, action) => {
        toast(
          `${action.payload?.message}: ${action.payload?.error.description}`,
        );
      });
  },
});

export default userSlice.reducer;

export const { removeUser } = userSlice.actions;
