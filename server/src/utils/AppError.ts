class AppError extends Error {
  statusCode: number;
  constructor(name: string, message: string, statusCode: number) {
    super(message);
    super.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
