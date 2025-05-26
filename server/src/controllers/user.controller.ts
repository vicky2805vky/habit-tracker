import { Request, Response } from "express";
import { validateUserUpdateData } from "../validators/user.validator";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { IUser } from "../models/user.model";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";

export const getUserProfile = (req: Request, res: Response) => {
  sendSuccessResponse(res, "data fetched successfully", req.user);
};

export const updateUserProfile = async (
  req: Request<{}, {}, IUser>,
  res: Response
) => {
  try {
    validateUserUpdateData(req);
    const { userName, password } = req.body;

    userName && (req.user.userName = userName);
    password && (req.user.password = password);

    await req.user.save();

    sendSuccessResponse(res, "data updated successfully", req.user);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
