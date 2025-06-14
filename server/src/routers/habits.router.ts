import { Router } from "express";
import { authoriseUser } from "../middlewares/auth.middleware";
import {
  createHabit,
  getAllHabits,
  updateHabit,
  deleteHabit,
} from "../controllers/habits.controller";

const habitsRouter = Router();

habitsRouter.use(authoriseUser);

habitsRouter.post("/", createHabit);
habitsRouter.get("/", getAllHabits);
habitsRouter.patch("/:id", updateHabit);
habitsRouter.delete("/:id", deleteHabit);

export default habitsRouter;
