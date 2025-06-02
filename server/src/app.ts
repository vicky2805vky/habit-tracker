import express from "express";
import cors from "cors";
import {
  errorRequestHandler,
  wildCardRouteHandler,
} from "./middlewares/error.middleware";
import { CORS_OPTIONS } from "./constants/constants";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.router";
import userRouter from "./routers/user.router";
import habitsRouter from "./routers/habits.router";
import habitLogRouter from "./routers/habitLogs.router";

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/habits", habitsRouter);
app.use("/habits/:habitId/logs", habitLogRouter);

app.use(wildCardRouteHandler);
app.use(errorRequestHandler);

export default app;
