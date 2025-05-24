import { Request } from "express";
import { IUser } from "../models/user.model";
import AppError from "../utils/AppError";
import { isAlpha, isEmail, isStrongPassword } from "validator";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

export const validateSignupData = (req: Request<{}, {}, IUser>) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new AppError(
      "invalid credentials error",
      "userName, email and password fields are required",
      400
    );
  } else if (!isAlpha(userName) || userName.length > 30) {
    throw new AppError(
      "invalid credentials error",
      "username must only contain letters and should not exceed the length of 30",
      400
    );
  } else if (!isEmail(email)) {
    throw new AppError(
      "invalid credentials error",
      "invalid email address",
      400
    );
  } else if (!isStrongPassword(password)) {
    throw new AppError(
      "invalid credentials error",
      "please enter a strong password",
      400
    );
  }
};

export const validateSigninData = async (req: Request<{}, {}, IUser>) => {
  const { email, password } = req.body;

  const throwInvalidCredentialError = () => {
    throw new AppError(
      "invalid credentials error",
      "some of the provided credentials are not valid",
      400
    );
  };

  if (!email || !isEmail(email) || !password) {
    throwInvalidCredentialError();
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throwInvalidCredentialError();
    return;
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    throwInvalidCredentialError();
  }

  req.user = existingUser;
};
