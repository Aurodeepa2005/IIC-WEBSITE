import { Router } from "express";
import { submitContactMessage } from "../controllers/contact.controller";
import { contactRateLimiter } from "../middleware/rateLimiter";

const router = Router();

/**
 * Route: POST /api/contact
 * Maps to submitContactMessage controller function protected by contactRateLimiter.
 */
router.post("/", contactRateLimiter, submitContactMessage);

export default router;
