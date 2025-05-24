import { model, Schema } from "mongoose";

const habitSchema = new Schema(
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
