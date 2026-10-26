import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

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
 * Body parsing middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
 * 404 handler for any undefined route
 */
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.method} ${req.originalUrl} not found`,
      statusCode: 404
    }
  });
});

/**
 * Global centralized error handling middleware
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

