import { Request } from "express";
import { IUser } from "../models/user.model";
import AppError from "../utils/AppError";
import { isEmail, isStrongPassword } from "validator";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

const throwInvalidCredentialError = (description: string) => {
  throw new AppError(400, "invalid credentials", "bad request", description);
};

export const validateSignupData = async (req: Request<{}, {}, IUser>) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throwInvalidCredentialError(
      "username, email and password fields are required"
    );
  } else if (!/^[a-z A-Z]+$/.test(userName) || userName.length > 30) {
    throwInvalidCredentialError(
      "username must only contain letters and should not exceed the length of 30"
    );
  } else if (!isEmail(email)) {
    throwInvalidCredentialError("invalid email address");
  } else if (!isStrongPassword(password)) {
    throwInvalidCredentialError("please enter a strong password");
  }

  const doesUserExists = await User.findOne({ email });
  if (doesUserExists) {
    throwInvalidCredentialError("user with this email already exists");
  }
};

export const validateSigninData = async (req: Request<{}, {}, IUser>) => {
  const { email, password } = req.body;

  if (!email || !isEmail(email) || !password) {
    throwInvalidCredentialError("invalid email Id or password");
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throwInvalidCredentialError("invalid email Id or password");
    return;
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    throwInvalidCredentialError("invalid email Id or password");
  }

  req.user = existingUser;
};
