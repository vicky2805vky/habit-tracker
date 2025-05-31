import type {
  ExtendedFormFields,
  FormFields,
} from "@/constants/AuthFormSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ErrorResponse, SuccessResponse } from "@/constants/ResponseTypes";

type UserPayload = {
  userName: string;
  email: string;
};

export const signUpUser = createAsyncThunk<
  SuccessResponse<UserPayload>,
  ExtendedFormFields,
  { rejectValue: ErrorResponse }
>("auth/sign-up", async (data: ExtendedFormFields, thunkApi) => {
  try {
    console.log(data);
    const url = import.meta.env.VITE_SERVER_BASE_URL + "/auth/signup";
    const res = await axios.post<SuccessResponse<UserPayload>>(url, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const signInUser = createAsyncThunk<
  SuccessResponse<UserPayload>,
  FormFields,
  { rejectValue: ErrorResponse }
>("auth/sign-in", async (data: FormFields, thunkApi) => {
  try {
    const url = import.meta.env.VITE_SERVER_BASE_URL + "/auth/signin";
    const res = await axios.post<SuccessResponse<UserPayload>>(url, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const signOutUser = createAsyncThunk(
  "auth/sign-out",
  async (_, thunkApi) => {
    try {
      const url = import.meta.env.VITE_SERVER_BASE_URL + "/auth/signout";
      const res = await axios.post<SuccessResponse<null>>(url, null, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkApi.rejectWithValue(error.response?.data);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchUser = createAsyncThunk<
  SuccessResponse<UserPayload>,
  void,
  { rejectValue: ErrorResponse }
>("user/get", async (_, thunkApi) => {
  try {
    const url = import.meta.env.VITE_SERVER_BASE_URL + "/user/profile";
    const res = await axios.get<SuccessResponse<UserPayload>>(url, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});
