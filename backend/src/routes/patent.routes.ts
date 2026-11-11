import { Router } from "express";
import { getPatents } from "../controllers/patent.controller";

const router = Router();

/**
 * Route: GET /api/patents
 * Maps to getPatents controller function.
 */
router.get("/", getPatents);

export default router;
