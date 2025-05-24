import { Request } from "express";
import { AuthRequestBody } from "../constants/types";
import AppError from "../utils/AppError";
import { isAlpha, isStrongPassword } from "validator";

export const validateUserUpdateData = (
  req: Request<{}, {}, AuthRequestBody>
) => {
  const ALLOWED_UPDATE_FIELDS = ["userName", "password"];
  const isUpdateValid = Object.keys(req.body).every((field) =>
    ALLOWED_UPDATE_FIELDS.includes(field)
  );
  if (!isUpdateValid)
    throw new AppError(
      "invalid update error",
      "you are trying to update fields that are not allowed",
      400
    );
  const { userName, password } = req.body;
  if (!userName && !password) {
    throw new AppError(
      "invalid update error",
      "please provide some data to update the user",
      400
    );
  }
  if (userName && (!isAlpha(userName) || userName.length > 30)) {
    throw new AppError(
      "invalid update error",
      "username should only contain letters and should not exceed 30 characters",
      400
    );
  }
  if (password && !isStrongPassword(password)) {
    throw new AppError(
      "invalid update error",
      "please enter a strong password",
      400
    );
  }
};
