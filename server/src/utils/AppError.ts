class AppError extends Error {
  statusCode: number;
  description: string;
  constructor(
    statusCode: number,
    message: string,
    name: string,
    description: string
  ) {
    super(message);
    super.name = name;
    this.statusCode = statusCode;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
