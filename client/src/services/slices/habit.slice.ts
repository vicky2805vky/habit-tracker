import { createSlice } from "@reduxjs/toolkit";
import {
  deleteHabit,
  getHabits,
  postHabit,
  updateHabit,
} from "../apis/habits.api";
import { toast } from "sonner";

export type HabitState = {
  habitId: string;
  habitName: string;
  startDate: string;
};

const initialState: HabitState[] = [];

const habitSlice = createSlice({
  name: "habitSlice",
  initialState,
  reducers: {
    clearHabits: () => [],
  },
  extraReducers(builder) {
    builder
      .addCase(getHabits.fulfilled, (_, action) => {
        return action.payload.data.map((habit) => {
          return {
            habitId: habit._id,
            habitName: habit.habitName,
            startDate: habit.startDate,
          };
        });
      })
      .addCase(postHabit.fulfilled, (state, action) => {
        const { _id, habitName, startDate } = action.payload.data;
        const newHabit = {
          habitId: _id,
          habitName,
          startDate,
        };
        state.push(newHabit);
        toast(action.payload.message);
      })
      .addCase(postHabit.rejected, (_, action) => {
        toast(
          `${action.payload?.message}: ${action.payload?.error.description || ""}`,
        );
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        const newHabits = state.map((habit) => {
          if (habit.habitId === action.payload.data._id)
            return {
              habitId: action.payload.data._id,
              habitName: action.payload.data.habitName,
              startDate: action.payload.data.startDate,
            };
          return habit;
        });
        toast(action.payload.message);
        return newHabits;
      })
      .addCase(updateHabit.rejected, (_, action) => {
        toast(
          `${action.payload?.message}: ${action.payload?.error.description || ""}`,
        );
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        toast("habit deleted successfully");
        return state.filter((habit) => habit.habitId !== action.payload);
      })
      .addCase(deleteHabit.rejected, (_, action) => {
        toast(
          `${action.payload?.message}: ${action.payload?.error.description || ""}`,
        );
      });
  },
});

export default habitSlice.reducer;
export const { clearHabits } = habitSlice.actions;
