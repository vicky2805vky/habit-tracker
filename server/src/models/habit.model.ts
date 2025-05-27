import { HydratedDocument, Model, model, Schema } from "mongoose";
import AppError from "../utils/AppError";

export interface IHabit {
  userId: Schema.Types.ObjectId;
  habitName: string;
  startDate?: Date;
}
type HabitModel = Model<IHabit>;
const habitSchema = new Schema<IHabit, HabitModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    habitName: {
      type: String,
      required: true,
      maxLength: 30,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);
habitSchema.index({ userId: 1, habitName: 1 }, { unique: true });

habitSchema.pre("save", async function (next) {
  const { habitName, userId } = this;
  const existingHabit = await Habit.findOne({ userId, habitName });
  if (existingHabit) {
    throw new AppError(
      400,
      "Failed to save the habit",
      "bad request",
      "a habit with this name already exists"
    );
  }
  next();
});

export const Habit = model("Habit", habitSchema);
export type HabitDoc = HydratedDocument<IHabit>;
