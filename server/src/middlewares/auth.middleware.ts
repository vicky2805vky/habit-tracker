import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
import config from "../configs/dotenv.config";
import { Schema } from "mongoose";
import { User } from "../models/user.model";
import { sendErrorResponse } from "../utils/sendErrorResponse";

const throwUnauthorisedError = () => {
  throw new AppError(
    "unauthorised request error",
    "the user is not authorised for doing this action",
    401
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
      throw new AppError("404 not found error", "could not find the user", 404);
    req.user = loggedInUser;
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
