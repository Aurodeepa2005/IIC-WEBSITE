import { Router, Request, Response } from "express";
import projectRoutes from "./project.routes";
import eventRoutes from "./event.routes";

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

/**
 * Resource routes
 */
router.use("/projects", projectRoutes);
router.use("/events", eventRoutes);

export default router;
