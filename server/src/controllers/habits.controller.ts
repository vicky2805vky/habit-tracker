import { Request, Response } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { Habit, IHabit } from "../models/habit.model";
import {
  validateCreateHabit,
  validateHabitId,
  validateUpdateHabit,
} from "../validators/habits.validtaor";

export const createHabit = async (
  req: Request<{}, {}, IHabit>,
  res: Response
) => {
  try {
    validateCreateHabit(req.body);
    const habit = new Habit({
      habitName: req.body.habitName,
      userId: req.user._id,
      ...(req.body.startDate && { startDate: new Date(req.body.startDate) }),
    });

    await habit.save();

    res.status(201).json({
      message: "new habit created successfully",
      data: habit,
    });
  } catch (error) {
    sendErrorResponse(res, error);
    error;
  }
};

export const getAllHabits = async (req: Request, res: Response) => {
  try {
    const allHabits = await Habit.find({ userId: req.user._id });
    res.json({
      message: "habits fetched successfully",
      data: allHabits,
    });
  } catch (error) {
    sendErrorResponse;
    error;
  }
};

export const updateHabit = async (
  req: Request<{ id: string }, {}, IHabit>,
  res: Response
) => {
  try {
    const habit = await validateUpdateHabit(req);
    habit.save();
    res.json({
      message: "habit updated successfully",
      body: habit,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const habit = await validateHabitId(req.params.id);

    const deletedHabit = await Habit.findByIdAndDelete(habit._id);
    res.json({ message: "habit deleted successfully", data: habit });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
