import { Date, HydratedDocument, Model, model, Schema } from "mongoose";

export interface IHabitLog {
  habitId: Schema.Types.ObjectId;
  Date: Date;
  completed: boolean;
}

type HabitLogModel = Model<IHabitLog>;

const habitLogSchema = new Schema<IHabitLog, HabitLogModel>({
  habitId: { type: Schema.Types.ObjectId, required: true },
  Date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const HabitLog = model("HabitLog", habitLogSchema);
export type HabitLogDoc = HydratedDocument<IHabitLog>;
