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

habitsRouter.post("/create", createHabit);
habitsRouter.get("/get", getAllHabits);
habitsRouter.patch("/edit/:id", updateHabit);
habitsRouter.delete("/delete/:id", deleteHabit);

export default habitsRouter;
