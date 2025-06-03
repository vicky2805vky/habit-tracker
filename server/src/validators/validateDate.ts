import AppError from "../utils/AppError";

export const validateDate = (dateString: string) => {
  const date = new Date(dateString);
  if (!date || isNaN(date.getTime()))
    throw new AppError(
      400,
      "invalid date",
      "bad request",
      "the given Date is not valid"
    );
  return date;
};
