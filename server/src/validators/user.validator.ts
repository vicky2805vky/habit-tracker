import { Request } from "express";
import { IUser } from "../models/user.model";
import AppError from "../utils/AppError";
import { isAlpha, isStrongPassword } from "validator";
import { checkIsUpdateAllowed } from "../utils/checkIsUpdateAllowed";

const throwInvalidUpdateError = (description: string) => {
  throw new AppError(400, "failed to update", "bad request", description);
};

export const validateUserUpdateData = (req: Request<{}, {}, IUser>) => {
  const ALLOWED_UPDATE_FIELDS = ["userName", "password"];
  checkIsUpdateAllowed(ALLOWED_UPDATE_FIELDS, req.body);

  const { userName, password } = req.body;
  if (!userName && !password) {
    throwInvalidUpdateError("provide some data to update the user");
  }
  if (userName && (!isAlpha(userName) || userName.length > 30)) {
    throwInvalidUpdateError(
      "username should only contain letters and should not exceed 30 characters"
    );
  }
  if (password && !isStrongPassword(password)) {
    throwInvalidUpdateError("please enter a strong password");
  }
};
