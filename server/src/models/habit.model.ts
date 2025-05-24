import { Date, HydratedDocument, Model, model, Schema } from "mongoose";

interface IHabit {
  userId: Schema.Types.ObjectId;
  habitName: String;
  startDate: Date;
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
      default: new Date(Date.now()),
    },
  },
  { timestamps: true }
);

export const Habit = model("Habit", habitSchema);
export type HabitDoc = HydratedDocument<IHabit>;
