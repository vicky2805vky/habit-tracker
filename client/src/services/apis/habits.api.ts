import type { SuccessResponse } from "@/constants/ResponseTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type HabitPayload = {
  _id: string;
  habitName: string;
  startDate: string;
};
export const getHabits = createAsyncThunk("habits/get", async (_, thunkApi) => {
  try {
    const res = await axios.get<SuccessResponse<HabitPayload[]>>(
      import.meta.env.VITE_SERVER_BASE_URL + "/habits",
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkApi.rejectWithValue(error.response?.data);
    return thunkApi.rejectWithValue(error);
  }
});
