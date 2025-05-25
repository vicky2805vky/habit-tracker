import AppError from "./AppError";

export const checkIsUpdateAllowed = (
  allowedUpdates: string[],
  reqBody: Object
) => {
  const isUpdateAllowed = Object.keys(reqBody).every((field) =>
    allowedUpdates.includes(field)
  );
  if (!isUpdateAllowed) {
    throw new AppError(
      "invalid data error",
      "some provided fields are not valid",
      422
    );
  }
};
