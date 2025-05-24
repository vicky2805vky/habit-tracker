import { Request, RequestHandler, Response } from "express";
import { AuthRequestBody } from "../constants/types";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import {
  validateSigninData,
  validateSignupData,
} from "../validators/auth.validator";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../configs/dotenv.config";

export const signUpUser = async (
  req: Request<{}, {}, AuthRequestBody>,
  res: Response
) => {
  try {
    validateSignupData(req);

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, config.jwtSecretKey);

    res
      .status(201)
      .cookie("token", token, { expires: new Date(Date.now() + 24 * 3600 * 7) })
      .json({
        message: "account created successfully",
        data: user,
      });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const signInUser = async (
  req: Request<{}, {}, AuthRequestBody>,
  res: Response
) => {
  try {
    await validateSigninData(req);
    const token = jwt.sign({ userId: req.user._id }, config.jwtSecretKey);
    res
      .cookie("token", token, { expires: new Date(Date.now() + 3600 * 24 * 7) })
      .json({
        message: "successfully signed in to the account",
        data: req.user,
      });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const signOutUser: RequestHandler = (req, res) => {
  res.cookie("token", "", { expires: new Date(Date.now()) }).json({
    message: "successfully signed out from the account",
  });
};
