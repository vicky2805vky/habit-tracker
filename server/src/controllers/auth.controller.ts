import { Request, RequestHandler, Response } from "express";
import { IUser } from "../models/user.model";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import {
  validateSigninData,
  validateSignupData,
} from "../validators/auth.validator";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../configs/dotenv.config";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";

export const signUpUser = async (
  req: Request<{}, {}, IUser>,
  res: Response
) => {
  try {
    await validateSignupData(req);

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, config.jwtSecretKey, {
      expiresIn: "7 days",
    });

    res.cookie("token", token);
    sendSuccessResponse(res, "account created successfully", user, 201);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const signInUser = async (
  req: Request<{}, {}, IUser>,
  res: Response
) => {
  try {
    await validateSigninData(req);
    const token = jwt.sign({ userId: req.user._id }, config.jwtSecretKey, {
      expiresIn: "7 days",
    });
    res.cookie("token", token);
    sendSuccessResponse(res, "successfully signed in to the account", req.user);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const signOutUser: RequestHandler = (req, res) => {
  res.cookie("token", "", { expires: new Date(Date.now()) });
  sendSuccessResponse(res, "successfully signed out from the account", null);
};
