import { Response } from "express";
import AppError from "./AppError";
import config from "../configs/dotenv.config";

export const sendErrorResponse = (res: Response, err: any) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      ...(config.nodeEnv === "development" && { stack: err.stack }),
    });
  } else {
    res.status(500).json({
      error: "internal server error",
      message: "unexpected error occured in the server: " + err.message,
      ...(config.nodeEnv === "development" && { stack: err.stack }),
    });
  }
};
