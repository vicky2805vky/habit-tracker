import { HydratedDocument, Model, model, Schema } from "mongoose";
import { setDateToMidnight } from "../utils/setDateToMidnight";
import AppError from "../utils/AppError";

export interface IHabitLog {
  habitId: Schema.Types.ObjectId;
  date: Date;
  completed: boolean;
}

type HabitLogModel = Model<IHabitLog>;

const habitLogSchema = new Schema<IHabitLog, HabitLogModel>({
  habitId: { type: Schema.Types.ObjectId, required: true },
  date: {
    type: Date,
    required: true,
    default: () => {
      return new Date().setHours(0, 0, 0, 0);
    },
  },
  completed: {
    type: Boolean,
    default: true,
  },
});

habitLogSchema.index({ date: 1, habitId: 1 });

habitLogSchema.pre("save", async function (next) {
  const { date, habitId } = this;
  const existingHabit = await HabitLog.findOne({ habitId, date });
  if (existingHabit) {
    throw new AppError(
      400,
      "Failed to log the habit",
      "bad request",
      "this habit was already logged today"
    );
  }
  next();
});

export const HabitLog = model("HabitLog", habitLogSchema);
export type HabitLogDoc = HydratedDocument<IHabitLog>;
