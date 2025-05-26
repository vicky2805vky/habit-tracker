import { Response } from "express";
import AppError from "./AppError";
import config from "../configs/dotenv.config";
import { JsonWebTokenError } from "jsonwebtoken";
import { ErrorResponse } from "../constants/types";

export const sendErrorResponse = (res: Response, err: any) => {
  let errorResponse: ErrorResponse = setErrorResponse(
    500,
    "unexpected error",
    "internal server error",
    "some unexpected error occured on the server"
  );
  errorResponse.status = "error";

  if (err instanceof AppError) {
    const { statusCode, message, name, description } = err;
    errorResponse = setErrorResponse(statusCode, name, message, description);
  } else if (err instanceof JsonWebTokenError) {
    errorResponse = setErrorResponse(
      401,
      "unauthorized",
      "authorization required",
      "you are not allowed to do this action"
    );
  }

  res.status(errorResponse.statusCode).json({
    ...errorResponse,
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
  console.log(err.message);
};

const setErrorResponse = (
  statusCode: number,
  name: string,
  message: string,
  description: string
): ErrorResponse => {
  return {
    status: "failed",
    statusCode,
    message,
    error: { name, description },
  };
};
