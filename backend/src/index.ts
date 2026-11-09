import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

/**
 * Configure CORS to allow frontend communication
 */
app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

/**
 * Body parsing middleware with a 10kb body size limit
 */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/**
 * Basic request logger to assist during development and debugging
 */
app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});

/**
 * Mount all API routes under /api
 */
app.use("/api", apiRoutes);

/**
 * 404 handler for unknown routes (returns { "error": "Route not found" })
 */
app.use(notFoundHandler);

/**
 * Global centralized error handling middleware (registered LAST)
 */
app.use(errorHandler);

/**
 * Start the Express server
 */
app.listen(port, (): void => {
  console.log(`=========================================`);
  console.log(` IIC Backend Server running on port ${port}`);
  console.log(` Health check: http://localhost:${port}/api/health`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`=========================================`);
});

export default app;
