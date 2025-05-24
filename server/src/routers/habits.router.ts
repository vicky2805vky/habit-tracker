import { Router } from "express";
import { authoriseUser } from "../middlewares/auth.middleware";
import { createHabit, getAllHabits } from "../controllers/habits.controller";

const habitsRouter = Router();

habitsRouter.use(authoriseUser);

habitsRouter.get("/create", createHabit);
habitsRouter.get("/get", getAllHabits);

export default habitsRouter;
