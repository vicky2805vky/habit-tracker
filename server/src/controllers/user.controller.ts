import { Request, Response } from "express";
import { validateUserUpdateData } from "../validators/user.validator";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { AuthRequestBody } from "../constants/types";

export const getUserProfile = (req: Request, res: Response) => {
  res.json({
    message: "successfully fetched the user data",
    data: req.user,
  });
};

export const updateUserProfile = async (
  req: Request<{}, {}, AuthRequestBody>,
  res: Response
) => {
  try {
    validateUserUpdateData(req);
    const { userName, password } = req.body;
    userName && (req.user.userName = userName);
    password && (req.user.password = password);

    await req.user.save();

    res.json({
      message: "successfully updated the profile",
      data: req.user,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
