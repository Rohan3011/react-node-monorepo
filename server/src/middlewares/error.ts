import { NextFunction, Request, Response } from "express";
import Status from "@/utils/http-status-code";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(res.statusCode ?? Status.INTERNAL_SERVER_ERROR);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

export default errorHandler;
