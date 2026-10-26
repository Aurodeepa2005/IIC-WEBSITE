import { Router, Request, Response } from "express";

const router = Router();

/**
 * Health check endpoint.
 * Returns server operational status, current uptime, and server timestamp.
 * Route: GET /api/health
 */
router.get("/health", (req: Request, res: Response): void => {
  res.status(200).json({
    status: "ok",
    service: "iic-backend",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

export default router;

