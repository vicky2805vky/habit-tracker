import { model, Schema } from "mongoose";

const habitLogSchema = new Schema({
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
