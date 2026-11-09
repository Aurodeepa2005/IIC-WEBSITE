import { Router } from "express";
import { getEvents } from "../controllers/event.controller";

const router = Router();

/**
 * Route: GET /api/events
 * Maps to getEvents controller function.
 */
router.get("/", getEvents);

export default router;
