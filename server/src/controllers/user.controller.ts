import { Request, Response } from "express";
import { validateUserUpdateData } from "../validators/user.validator";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { IUser } from "../models/user.model";

export const getUserProfile = (req: Request, res: Response) => {
  res.json({
    status: "success",
    statusCode: 200,
    message: "data fetched successfully",
    data: req.user,
  });
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

    res.json({
      status: "success",
      statusCode: 200,
      message: "data updated successfully",
      data: req.user,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
