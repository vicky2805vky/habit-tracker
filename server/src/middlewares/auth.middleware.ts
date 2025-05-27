import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
import config from "../configs/dotenv.config";
import { Schema } from "mongoose";
import { User } from "../models/user.model";
import { sendErrorResponse } from "../utils/sendErrorResponse";

const throwUnauthorisedError = () => {
  throw new AppError(
    401,
    "authorization required",
    "unauthorized",
    "you are not allowed to do this action"
  );
};

export const authoriseUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) throwUnauthorisedError();

    const { userId } = jwt.verify(token, config.jwtSecretKey) as {
      userId: Schema.Types.ObjectId;
    };

    if (!userId) throwUnauthorisedError();
    const loggedInUser = await User.findById(userId);
    if (!loggedInUser)
      throw new AppError(
        404,
        "user not found",
        "not found",
        "failed to find the user"
      );

    req.user = loggedInUser;
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
