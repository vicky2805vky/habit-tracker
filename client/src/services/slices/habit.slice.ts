import { createSlice } from "@reduxjs/toolkit";
import { getHabits } from "../apis/habits.api";

export type HabitState = {
  habitId: string;
  habitName: string;
  startDate: string;
};

const initialState: HabitState[] = [];

const habitSlice = createSlice({
  name: "habitSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getHabits.fulfilled, (_, action) => {
      return action.payload.data.map((habit) => {
        return {
          habitId: habit._id,
          habitName: habit.habitName,
          startDate: habit.startDate,
        };
      });
    });
  },
});

export default habitSlice.reducer;
