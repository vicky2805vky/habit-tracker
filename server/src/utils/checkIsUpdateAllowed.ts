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
      422,
      "failed to update",
      "unprocessable entity",
      "the request contains some invalid data"
    );
  }
};
