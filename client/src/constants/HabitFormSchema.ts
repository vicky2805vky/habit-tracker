import { z } from "zod";

export const habitSchema = z.object({
  habitName: z.string().nonempty("habit name is required"),
  startDate: z.string().date(),
});

export type HabitSchema = z.infer<typeof habitSchema>;
