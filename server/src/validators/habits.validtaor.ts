import { Habit, IHabit } from "../models/habit.model";
import AppError from "../utils/AppError";
import { setDateToMidnight } from "../utils/setDateToMidnight";
import { checkIsUpdateAllowed } from "../utils/checkIsUpdateAllowed";
import { Request } from "express";
import { validateModelId } from "./validateModelId";

const throwInvalidDataError = (description: string) => {
  throw new AppError(400, "invalid request data", "bad request", description);
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

  const habit = await validateModelId(req.params.id, Habit);
  const { habitName, startDate } = req.body;

  if (!habitName && !startDate)
    throwInvalidDataError("please provide some data to update");

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

const validateHabitName = (habitName: string) => {
  if (!habitName) {
    throwInvalidDataError("habitName is required");
  } else if (habitName.length > 50) {
    throwInvalidDataError("habitName should be 1 - 50 characters long");
  } else if (!habitName.match(/[a-z A-Z]/)) {
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
