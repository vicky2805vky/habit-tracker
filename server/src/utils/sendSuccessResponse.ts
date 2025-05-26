import { Response } from "express";

export const sendSuccessResponse = (
  res: Response,
  message: string,
  data: Object | null,
  statusCode = 200
) => {
  res.status(statusCode).json({
    status: "success",
    statusCode,
    message,
    data,
  });
};
