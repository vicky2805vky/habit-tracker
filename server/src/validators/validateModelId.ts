import { isValidObjectId, Model } from "mongoose";
import AppError from "../utils/AppError";
import { HydratedDocument } from "mongoose";

const throwNotfoundError: () => never = () => {
  throw new AppError(
    404,
    "data not found",
    "not found",
    "can not find the data relevant to the provided information"
  );
};

export const validateModelId = async <T>(
  id: string,
  Model: Model<T>
): Promise<HydratedDocument<T>> => {
  if (!isValidObjectId(id)) throwNotfoundError();

  const model = await Model.findById(id);
  if (!model) {
    throwNotfoundError();
  }

  return model;
};
