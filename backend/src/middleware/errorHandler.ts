import { Request, Response, NextFunction } from "express";

/**
 * Custom application error interface with optional HTTP status code.
 */
export interface AppError extends Error {
  statusCode?: number;
  status?: number;
}

/**
 * 404 Not Found middleware for unmatched routes.
 * Returns standard { "error": "Route not found" } with HTTP 404.
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: "Route not found"
  });
}

/**
 * Central error-handling middleware (must be registered LAST in the middleware chain).
 * Catches unhandled errors passed via next(error), logs the full error to the console,
 * and sends a safe JSON error response: { "error": "readable message" }.
 * Stack traces, Prisma errors, and database details are never sent to the client.
 */
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.statusCode || err.status || 500;

  // Log full error details on the server console for debugging
  console.error(`[Server Error] ${req.method} ${req.url} - Status ${statusCode}:`, err);

  // Never expose raw stack traces or internal server details on 500 errors
  const clientMessage =
    statusCode >= 500 ? "Internal server error" : (err.message || "An error occurred");

  res.status(statusCode).json({
    error: clientMessage
  });
}
