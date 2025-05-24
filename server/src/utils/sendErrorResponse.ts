import { Response } from "express";
import AppError from "./AppError";
import config from "../configs/dotenv.config";

export const sendErrorResponse = (res: Response, err: AppError) => {
  res.status(err.statusCode || 500).json({
    error: err.name,
    message: err.message,
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
};
