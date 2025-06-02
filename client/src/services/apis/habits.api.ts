import type { ErrorResponse, SuccessResponse } from "@/constants/ResponseTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type HabitPayload = {
  _id: string;
  habitName: string;
  startDate: string;
};

type HabitReqBody = {
  habitName: string;
  startDate: string;
};

export const getHabits = createAsyncThunk("habits/get", async (_, thunkApi) => {
  try {
    const url = import.meta.env.VITE_SERVER_BASE_URL + "/habits";
    const res = await axios.get<SuccessResponse<HabitPayload[]>>(url, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkApi.rejectWithValue(error.response?.data);
    return thunkApi.rejectWithValue(error);
  }
});

export const postHabit = createAsyncThunk<
  SuccessResponse<HabitPayload>,
  HabitReqBody,
  { rejectValue: ErrorResponse }
>("habits/post", async (data, thunkApi) => {
  try {
    const url = import.meta.env.VITE_SERVER_BASE_URL + "/habits";
    const res = await axios.post<SuccessResponse<HabitPayload>>(url, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkApi.rejectWithValue(error.response?.data);
    return thunkApi.rejectWithValue(error as any);
  }
});

export const updateHabit = createAsyncThunk<
  SuccessResponse<HabitPayload>,
  Partial<HabitReqBody> & { id: string },
  { rejectValue: ErrorResponse }
>("habits/update", async (data, thunkApi) => {
  try {
    const url = import.meta.env.VITE_SERVER_BASE_URL + "/habits/" + data.id;
    const res = await axios.patch<SuccessResponse<HabitPayload>>(
      url,
      {
        habitName: data.habitName,
        startDate: data.startDate,
      },
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkApi.rejectWithValue(error.response?.data);
    return thunkApi.rejectWithValue(error as any);
  }
});

export const deleteHabit = createAsyncThunk<
  string,
  string,
  { rejectValue: ErrorResponse }
>("habits/delete", async (id, thunkApi) => {
  try {
    const url = import.meta.env.VITE_SERVER_BASE_URL + "/habits/" + id;
    await axios.delete(url, { withCredentials: true });
    return id;
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkApi.rejectWithValue(error.response?.data);
    return thunkApi.rejectWithValue(error as any);
  }
});
