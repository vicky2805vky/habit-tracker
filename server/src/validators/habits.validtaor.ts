import { isAlpha } from "validator";
import { Habit, IHabit } from "../models/habit.model";
import AppError from "../utils/AppError";
import { setDateToMidnight } from "../utils/setDateToMidnight";
import { checkIsUpdateAllowed } from "../utils/checkIsUpdateAllowed";
import { Request } from "express";
import { isValidObjectId } from "mongoose";

const throwInvalidDataError = (message: string) => {
  throw new AppError("invalid data error", message, 400);
};

export const validateCreateHabit = (habit: IHabit) => {
  const { habitName, startDate } = habit;
  validateHabitName(habitName);
  startDate && validateStartDate(startDate);
};

export const validateUpdateHabit = async (
  req: Request<{ id: string }, {}, IHabit>
) => {
  const ALLOWED_UPDATES = ["habitName", "startDate"];
  checkIsUpdateAllowed(ALLOWED_UPDATES, req.body);

  const habit = await validateHabitId(req.params.id);
  const { habitName, startDate } = req.body;

  if (!habitName && !startDate)
    throw new AppError(
      "invalid data error",
      "please provide some value to update the habit",
      400
    );

  if (habitName) {
    validateHabitName(habitName);
    habit.habitName = habitName;
  }
  if (startDate) {
    validateStartDate(startDate);
    habit.startDate = startDate;
  }
  return habit;
};

export const validateHabitId = async (habitId: string) => {
  if (!isValidObjectId(habitId))
    throw new AppError("habit not found", "can't find the provided habit", 404);

  const habit = await Habit.findById(habitId);

  if (!habit)
    throw new AppError("habit not found", "can't find the provided habit", 404);
  return habit;
};

const validateHabitName = (habitName: string) => {
  if (!habitName) {
    throwInvalidDataError("habitName is required");
  } else if (!habitName.length || habitName.length > 20) {
    throwInvalidDataError("habitName should be 1 - 20 characters long");
  } else if (!isAlpha(habitName)) {
    throwInvalidDataError("habitName should only contains alphabetic letter");
  }
};

const validateStartDate = (startDate: Date) => {
  const givenDate = new Date(startDate);

  const isValidDate = !isNaN(givenDate.getTime());
  !isValidDate &&
    throwInvalidDataError("the provided start date is not in a valid format");

  const today = setDateToMidnight(new Date());

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 7);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);

  if (givenDate < minDate || givenDate > maxDate) {
    throwInvalidDataError(
      `Start date must be within 7 days of today (${minDate.toDateString()} - ${maxDate.toDateString()})`
    );
  }
};
