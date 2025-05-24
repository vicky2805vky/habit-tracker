import { ErrorRequestHandler, RequestHandler } from "express";
import AppError from "../utils/AppError";
import { sendErrorResponse } from "../utils/sendErrorResponse";

export const errorRequestHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  sendErrorResponse(res, err);
};

export const wildCardRouteHandler: RequestHandler = (req, res) => {
  throw new AppError(
    "path not found error",
    `cannot ${req.method} ${req.path}`,
    404
  );
};
