import { ErrorRequestHandler, RequestHandler } from "express";
import AppError from "../utils/AppError";
import { sendErrorResponse } from "../utils/sendErrorResponse";

export const errorRequestHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof AppError) {
    sendErrorResponse(res, err);
  } else {
    res.status(500).json({
      name: "internal server error",
      message: `unexpected error occured: ${err.message}`,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
};

export const wildCardRouteHandler: RequestHandler = (req, res) => {
  throw new AppError(
    "path not found error",
    `cannot ${req.method} ${req.path}`,
    404
  );
};
