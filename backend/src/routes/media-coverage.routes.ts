import { Router } from "express";
import { getMediaCoverage } from "../controllers/media-coverage.controller";

const router = Router();

/**
 * Route: GET /api/media-coverage
 * Maps to getMediaCoverage controller function.
 */
router.get("/", getMediaCoverage);

export default router;
