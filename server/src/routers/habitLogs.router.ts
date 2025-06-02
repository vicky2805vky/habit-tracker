import { Router } from "express";
import { authoriseUser } from "../middlewares/auth.middleware";
import {
  createLog,
  deleteLog,
  getLog,
} from "../controllers/habitLogs.controller";

const habitLogRouter = Router({ mergeParams: true });

habitLogRouter.use(authoriseUser);

habitLogRouter.post("/", createLog);
habitLogRouter.get("/", getLog);
habitLogRouter.delete("/:id", deleteLog);

export default habitLogRouter;
