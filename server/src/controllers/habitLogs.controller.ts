import { Request, Response } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import AppError from "../utils/AppError";
import { HabitLog } from "../models/habitLog.model";
import { validateModelId } from "../validators/validateModelId";
import { Habit } from "../models/habit.model";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";

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
    if (error.code === 11000)
      throw new AppError(
        400,
        "failed to log the habit",
        "bad request",
        "This habit is already logged today"
      );
    sendErrorResponse(res, error);
  }
};

export const getLog = async (req: Request<RequestParams>, res: Response) => {
  try {
    const { habitId } = req.params;
    await validateModelId(habitId, Habit);
    const habitLogs = await HabitLog.find({ habitId });
    sendSuccessResponse(res, "data fetched successfully", habitLogs);
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
