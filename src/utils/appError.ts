 class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // 标记为已知的业务错误
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;