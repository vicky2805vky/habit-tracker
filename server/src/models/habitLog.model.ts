import { HydratedDocument, Model, model, Schema } from "mongoose";
import { setDateToMidnight } from "../utils/setDateToMidnight";

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

habitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });

export const HabitLog = model("HabitLog", habitLogSchema);
export type HabitLogDoc = HydratedDocument<IHabitLog>;
