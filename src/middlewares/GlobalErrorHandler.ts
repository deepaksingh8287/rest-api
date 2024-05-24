import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";

const globalErrorHandler=(err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message,
      errorStack: config.env == "development" ? err.stack : "",
    });
  }
  export default globalErrorHandler;