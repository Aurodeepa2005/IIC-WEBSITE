import { Request, Response, NextFunction } from "express";

/**
 * Custom application error interface with optional HTTP status code
 */
export interface AppError extends Error {
  statusCode?: number;
}

/**
 * Global error-handling middleware for Express.
 * Catches unhandled errors passed via next(err), logs them,
 * and sends a consistent JSON error response to the client.
 */
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error details for server-side debugging
  console.error(`[Error] ${req.method} ${req.url} - Status: ${statusCode} - ${message}`);
  if (statusCode === 500 && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      statusCode: statusCode
    }
  });
}

