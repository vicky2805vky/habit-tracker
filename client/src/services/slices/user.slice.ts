import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  signInUser,
  signOutUser,
  signUpUser,
} from "../apis/auth.api";
import { toast } from "sonner";

export type UserState = {
  userName: string;
  email: string;
} | null;

const initialState: UserState = null;

const userSlice = createSlice<UserState, {}, string, {}>({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (_, action) => {
        return {
          userName: action.payload.data.userName,
          email: action.payload.data.email,
        };
      })
      .addCase(signUpUser.fulfilled, (_, action) => {
        toast(action.payload.message);
        return {
          userName: action.payload.data.userName,
          email: action.payload.data.email,
        };
      })
      .addCase(signUpUser.rejected, (_, action) => {
        console.log(action.payload);
        toast(
          `${action.payload?.message}: ${action.payload?.error.description}`,
        );
      })
      .addCase(signOutUser.fulfilled, (_, action) => {
        toast(action.payload.message);
        return null;
      })
      .addCase(fetchUser.rejected, () => {
        toast("please login to continue");
      })
      .addCase(signInUser.fulfilled, (_, action) => {
        toast(action.payload.message);
        return {
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

export const {} = userSlice.actions;
