class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // mark the error as operational
    this.isOperational = true;

    // capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
