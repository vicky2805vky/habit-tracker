import { Router } from "express";
import { authoriseUser } from "../middlewares/auth.middleware";
import {
  createLog,
  deleteLog,
  getLog,
} from "../controllers/habitLogs.controller";

const habitLogRouter = Router({ mergeParams: true });

habitLogRouter.use(authoriseUser);

habitLogRouter.post("/:habitId/logs", createLog);
habitLogRouter.get("/:habitId/logs", getLog);
habitLogRouter.delete("/:habitId/logs/:id", deleteLog);

export default habitLogRouter;
