import { HydratedDocument, Model, model, Schema } from "mongoose";

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

export const Habit = model("Habit", habitSchema);
export type HabitDoc = HydratedDocument<IHabit>;
