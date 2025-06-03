import { Request, Response } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { HabitLog } from "../models/habitLog.model";
import { validateModelId } from "../validators/validateModelId";
import { Habit } from "../models/habit.model";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";
import AppError from "../utils/AppError";
import { setDateToMidnight } from "../utils/setDateToMidnight";

export type RequestParams = {
  habitId: string;
  id: string;
};

export const createLog = async (req: Request<RequestParams>, res: Response) => {
  try {
    const { habitId } = req.params;
    await validateModelId(habitId, Habit);
    const log = new HabitLog({
      habitId,
    });
    await log.save();
    sendSuccessResponse(res, "log created successfully", log, 201);
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
};

export const getLog = async (
  req: Request<RequestParams, {}, {}, { date: string }>,
  res: Response
) => {
  try {
    const { habitId } = req.params;
    const { date } = req.query;
    if (!date || isNaN(new Date(date).getTime()))
      throw new AppError(
        400,
        "invalid date",
        "bad request",
        "the given Date is not valid"
      );

    const { habitName, _id, startDate } = await validateModelId(habitId, Habit);

    const formattedDate = setDateToMidnight(new Date(date));
    const habitLog = await HabitLog.findOne({ habitId, date: formattedDate });
    const habitWithStatus = {
      _id,
      habitName,
      startDate,
      completed: habitLog ? true : false,
    };
    sendSuccessResponse(res, "data fetched successfully", habitWithStatus);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
export const deleteLog = async (req: Request<RequestParams>, res: Response) => {
  try {
    const { habitId, id } = req.params;
    await validateModelId(habitId, Habit);
    await validateModelId(id, HabitLog);
    const habitLog = await HabitLog.findOneAndDelete({ habitId, _id: id });
    sendSuccessResponse(res, "data deleted successfully", habitLog);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
